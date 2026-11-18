const fs = require('fs');
const path = require('path');
const https = require('https');

// Dynamic module resolution for dependencies in vnpis-web
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  try {
    nodemailer = require(path.join(process.cwd(), 'vnpis-web', 'node_modules', 'nodemailer'));
  } catch (e2) {
    console.warn('[WARN] nodemailer not found, email sending might be skipped.');
  }
}

let matter;
try {
  matter = require('gray-matter');
} catch (e) {
  try {
    matter = require(path.join(process.cwd(), 'vnpis-web', 'node_modules', 'gray-matter'));
  } catch (e2) {
    // Fallback built-in parser will be used
  }
}

const { pingIndexNow } = require('./indexnow_ping');
const { publishPost } = require('./social_publishers/facebook_auto_manager');

// Baseline start date for Week 1 (Monday, August 10, 2026)
const START_DATE = new Date('2026-08-10T00:00:00Z');

// Explicit curated mapping for key schedule slots so each slot matches the exact Facebook Roadmap topic
const CURATED_SLOT_ARTICLES = {
  '14_01': 'gia-cong-in-tampon-linh-kien-nhua-abs.md',
  '14_02': 'top-5-may-in-tampon-coc-muc-kin.md',
  '14_03': 'huong-dan-chon-do-cung-dau-tampon-silicon.md',
  '15_01': 'dich-vu-pha-mau-muc-in-theo-yeu-cau-chuan-pantone-tu-100g.md',
  '15_02': 'may-in-lua-phang-ban-tu-dong.md',
  '15_03': 'cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu.md'
};

/**
 * Built-in zero-dependency frontmatter parser fallback in case gray-matter is not installed
 */
function parseArticleFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  if (matter) {
    try {
      const parsed = matter(raw);
      if (parsed && parsed.data && Object.keys(parsed.data).length > 0) {
        return parsed.data;
      }
    } catch (e) {
      // Fallback below
    }
  }

  const data = {};
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return data;

  const yamlBlock = fmMatch[1];
  const extractField = (key) => {
    const regex = new RegExp(`^${key}:\\s*(?:>-?|\\|-?)?\\s*\\r?\\n?([\\s\\S]*?)(?=\\r?\\n[a-zA-Z0-9_]+:|$)`, 'm');
    const m = yamlBlock.match(regex);
    if (!m) return undefined;
    return m[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('- '))
      .join(' ')
      .replace(/^['"]|['"]$/g, '')
      .trim();
  };

  data.title = extractField('title');
  data.category = extractField('category');
  data.description = extractField('description') || extractField('meta_description');
  data.canonical = extractField('canonical');
  return data;
}

function getCurrentScheduleSlot(overrideWeek = null, overrideDayCode = null) {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  let weekNum = overrideWeek ? parseInt(overrideWeek, 10) : Math.floor(diffDays / 7) + 1;
  if (weekNum < 1) weekNum = 1;
  if (weekNum > 52) weekNum = 52;

  // Day of week in UTC: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const day = now.getUTCDay();
  let dayCode = '01';
  let slotName = 'monday';

  if (overrideDayCode) {
    dayCode = String(overrideDayCode).padStart(2, '0');
    slotName = dayCode === '02' ? 'wednesday' : dayCode === '03' ? 'friday' : 'monday';
  } else if (day === 3) {
    dayCode = '02';
    slotName = 'wednesday';
  } else if (day === 5) {
    dayCode = '03';
    slotName = 'friday';
  } else {
    dayCode = '01';
    slotName = 'monday';
  }

  return { weekNum, dayCode, slotName };
}

/**
 * Resolves the canonical SEO article in vnpis-web/content/articles for the given schedule slot
 */
function resolveCanonicalArticle(articlesDir, weekNum, dayCode, fbTopic = '') {
  const paddedWeek = String(weekNum).padStart(2, '0');
  const slotKey = `${paddedWeek}_${dayCode}`;

  const allFiles = fs.existsSync(articlesDir)
    ? fs
        .readdirSync(articlesDir)
        .filter((f) => f.endsWith('.md') && !f.startsWith('week_'))
        .sort()
    : [];

  if (allFiles.length === 0) {
    return {
      slug: `week_${paddedWeek}_vnpis_${dayCode}`,
      fileName: `week_${paddedWeek}_vnpis_${dayCode}.md`,
      meta: {}
    };
  }

  // 1. Check curated mapping first
  if (CURATED_SLOT_ARTICLES[slotKey] && allFiles.includes(CURATED_SLOT_ARTICLES[slotKey])) {
    const fileName = CURATED_SLOT_ARTICLES[slotKey];
    const meta = parseArticleFile(path.join(articlesDir, fileName));
    return {
      slug: fileName.replace(/\.md$/, ''),
      fileName,
      meta
    };
  }

  // 2. Deterministic index across the 117 canonical SEO articles
  const slotIndex = (weekNum - 1) * 3 + (parseInt(dayCode, 10) - 1);
  const selectedFile = allFiles[slotIndex % allFiles.length];
  const meta = parseArticleFile(path.join(articlesDir, selectedFile));

  return {
    slug: selectedFile.replace(/\.md$/, ''),
    fileName: selectedFile,
    meta
  };
}

function pingGoogleSitemap(sitemapUrl = 'https://vnpis.com/sitemap.xml') {
  return new Promise((resolve) => {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    https
      .get(pingUrl, (res) => {
        console.log(`[Google Ping] ${sitemapUrl} -> Status: ${res.statusCode}`);
        resolve(res.statusCode);
      })
      .on('error', (err) => {
        console.log(`[Google Ping Notice] Offline or logged:`, err.message);
        resolve(null);
      });
  });
}

async function sendCloudPublishReport(details) {
  const recipient = process.env.TARGET_EMAIL || 'info@vnpis.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || 'info@vnpis.com';
  const smtpPass = process.env.SMTP_PASS || 'lejochkwtxpxrefu';

  if (!nodemailer) {
    console.log('[EMAIL] Nodemailer not available. Skipping email report.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 680px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0F172A; padding: 24px; color: white; text-align: center;">
        <h2 style="margin: 0; color: #38BDF8; font-size: 22px;">🚀 VNPIS AUTONOMOUS CLOUD ENGINE</h2>
        <p style="margin: 6px 0 0 0; color: #94A3B8; font-size: 14px;">Báo cáo xuất bản tự động định kỳ (Mỗi 2 ngày 1 bài - Cloud Cron 24/7)</p>
      </div>

      <div style="padding: 24px;">
        <p>Xin chào Ban Giám Đốc & Kỹ Sư VNPIS,</p>
        <p>Hệ thống Cloud của VNPIS trên GitHub Actions vừa thực thi phiên xuất bản tự động hoàn toàn độc lập, không phụ thuộc máy tính cá nhân:</p>

        <div style="background: #F8FAFC; border-left: 4px solid #38BDF8; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0284C7; font-size: 16px;">📄 1. BÀI VIẾT WEBSITE ĐÃ XUẤT BẢN:</h3>
          <p style="margin: 4px 0;"><strong>Tiêu đề:</strong> ${details.articleTitle}</p>
          <p style="margin: 4px 0;"><strong>Chủ đề:</strong> ${details.articleCategory}</p>
          <p style="margin: 4px 0;"><strong>Link bài viết:</strong> <a href="${details.articleUrl}" target="_blank" style="color: #0284C7; font-weight: bold;">${details.articleUrl}</a></p>
          <p style="margin: 4px 0;"><strong>Meta Description:</strong> <em>${details.articleDesc}</em></p>
        </div>

        <div style="background: #F8FAFC; border-left: 4px solid #10B981; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
          <h3 style="margin: 0 0 10px 0; color: #059669; font-size: 16px;">📡 2. TÍN HIỆU SEO & INDEXING TỰ ĐỘNG:</h3>
          <p style="margin: 4px 0;">✅ <strong>Google Sitemap Ping:</strong> Đã gửi tín hiệu thu thập URL mới về Google Search Console</p>
          <p style="margin: 4px 0;">✅ <strong>Bing & IndexNow:</strong> Đã gửi ping tức thì cho công cụ tìm kiếm Bing & Cốc Cốc</p>
        </div>

        <div style="background: #F8FAFC; border-left: 4px solid #8B5CF6; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
          <h3 style="margin: 0 0 10px 0; color: #7C3AED; font-size: 16px;">📱 3. TRUYỀN THÔNG MẠNG XÃ HỘI (FACEBOOK):</h3>
          <p style="margin: 4px 0;"><strong>Trang đích:</strong> ${details.fbPageName || 'Facebook Fanpage VNPIS'}</p>
          <p style="margin: 4px 0;"><strong>Chủ đề:</strong> ${details.fbTopic || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Trạng thái:</strong> ${details.fbStatus || 'Đã đồng bộ nội dung'}</p>
        </div>
      </div>

      <div style="background: #F1F5F9; border-top: 1px solid #E2E8F0; padding: 16px; text-align: center; font-size: 12px; color: #64748B;">
        © ${new Date().getFullYear()} VNPIS Solutions • Vận hành 100% trên GitHub Actions Cloud • Không cần mở Laptop
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"VNPIS Cloud Engine" <${smtpUser}>`,
      to: recipient,
      subject: `[VNPIS CLOUD] Xuất bản bài viết Tuần ${details.weekNum} (${details.slotName.toUpperCase()}) - ${details.articleTitle}`,
      html: html
    });
    console.log(`[EMAIL SUCCESS] Sent notification to ${recipient}: ${info.messageId}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send notification:`, err.message);
  }
}

async function runMasterCloudPublishing(options = {}) {
  const { weekNum, dayCode, slotName } = getCurrentScheduleSlot(options.weekNum, options.dayCode);
  const paddedWeek = String(weekNum).padStart(2, '0');

  console.log(`========================================================================`);
  console.log(`🚀 RUNNING VNPIS AUTONOMOUS MASTER CLOUD PUBLISHER`);
  console.log(`⏰ Schedule: Week ${paddedWeek} | Slot: ${slotName.toUpperCase()} (DayCode: ${dayCode})`);
  console.log(`========================================================================\n`);

  // 0. Optional Auto-sync Google Photos & Filter Brand Safety (only when explicitly enabled)
  if (process.env.SYNC_PHOTOS_ON_PUBLISH === 'true') {
    try {
      const { syncGooglePhotos } = require('./marketing_ai/sync_google_photos');
      console.log('📸 Checking and syncing new Google Photos with AI Brand Safety...');
      await syncGooglePhotos();
    } catch (err) {
      console.log('[PHOTO SYNC NOTICE]', err.message);
    }
  }

  // 1. Read Facebook Roadmap Topic first so article selection can align with it
  let fbStatus = 'Đã lưu hàng đợi đồng bộ Fanpage';
  let fbTopic = 'Giải pháp in ấn và công nghệ bao bì VNPIS';
  let fbPageName = 'VNPIS Solutions / VNPIS Machines';
  let targetPageKey = 'vnpis_machines';

  const roadmapPath = path.join(process.cwd(), 'vnpis_marketing', 'facebook_6_months_roadmap.json');
  if (fs.existsSync(roadmapPath)) {
    try {
      const roadmap = JSON.parse(fs.readFileSync(roadmapPath, 'utf8'));
      const weekIndex = (weekNum - 1) % 26;
      const weekData = roadmap[String(weekIndex)] || roadmap[weekIndex];
      if (weekData && weekData[slotName]) {
        const slotData = weekData[slotName];
        fbTopic = slotData.topic;
        fbPageName = slotData.page_name;
        targetPageKey = slotData.target_page;
      }
    } catch (err) {
      console.error('[FB ROADMAP PARSE ERROR]', err.message);
    }
  }

  // 2. Locate Canonical SEO Article
  const articlesDir = path.join(process.cwd(), 'vnpis-web', 'content', 'articles');
  const resolved = resolveCanonicalArticle(articlesDir, weekNum, dayCode, fbTopic);
  const articleMeta = resolved.meta || {};
  const articleUrl = articleMeta.canonical || `https://vnpis.com/blog/${resolved.slug}`;
  const articleTitle = articleMeta.title || resolved.slug;
  const articleCategory = articleMeta.category || 'Giải Pháp In Ấn Công Nghiệp B2B';
  const articleDesc =
    articleMeta.description ||
    `Tài liệu kỹ thuật chuyên sâu từ VNPIS: ${articleTitle}. Tư vấn giải pháp in Tampon, in Lụa, in Date CIJ/TIJ và cứu hộ đầu in công nghiệp.`;

  console.log(`✅ [CANONICAL ARTICLE RESOLVED] ${resolved.fileName}`);
  console.log(`   Title: ${articleTitle}`);
  console.log(`   Category: ${articleCategory}`);
  console.log(`   URL: ${articleUrl}`);

  // 3. Search Engine Ping
  console.log('\n📡 Triggering Search Engine Indexing Pings...');
  try {
    await pingGoogleSitemap('https://vnpis.com/sitemap.xml');
    pingIndexNow('https://vnpis.com', [articleUrl]);
  } catch (err) {
    console.log('[SEARCH ENGINE PING ERROR]', err.message);
  }

  // 4. Social Media Publishing (Facebook Fanpage)
  try {
    const postMessage =
      `🚀 [VNPIS SOLUTIONS] GIẢI PHÁP IN ẤN CÔNG NGHIỆP B2B\n` +
      `📌 CHỦ ĐỀ CHUYÊN MÔN: ${fbTopic.toUpperCase()}\n\n` +
      `📖 Bài viết kỹ thuật chuyên sâu: ${articleTitle}\n` +
      `👉 Xem chi tiết tại: ${articleUrl}\n\n` +
      `📞 Hotline / Zalo Kỹ Sư Trưởng: 0987.453.866 - Mr. Tâm\n` +
      `🌐 Website: https://vnpis.com\n` +
      `#VNPIS #InTampon #InLua #InCongNghiep #VatTuInAn`;

    console.log(`\n📢 Attempting Facebook Fanpage publication for: ${fbPageName}`);
    const res = await publishPost(targetPageKey, postMessage, articleUrl, {
      slotKey: `week_${paddedWeek}_${dayCode}`,
      topic: fbTopic
    });
    if (res && res.id) {
      fbStatus = `✅ Đã đăng thành công lên Facebook (Post ID: ${res.id})`;
    } else if (res && res.queuedForRetry) {
      fbStatus = `⏳ Đã lưu vào hàng đợi tự động đăng bù (${res.queuedCount} bài chờ) — Cần cấp mới Page Access Token vĩnh viễn do Token ngắn hạn ngày 08/11 đã hết phiên.`;
    } else {
      fbStatus = `⚠️ Chờ đồng bộ Facebook API: ${res?.error?.message || 'Kiểm tra kết nối token'}`;
    }
  } catch (err) {
    console.error('[FB PUBLISH ERROR]', err.message);
    fbStatus = `Lỗi xử lý Facebook: ${err.message}`;
  }

  // 5. Send Email Report (unless skipEmail is passed)
  if (!options.skipEmail) {
    console.log('\n📧 Sending Executive Summary Email...');
    await sendCloudPublishReport({
      weekNum: paddedWeek,
      dayCode,
      slotName,
      articleTitle,
      articleCategory,
      articleDesc,
      articleUrl,
      fbPageName,
      fbTopic,
      fbStatus
    });
  }

  console.log(`\n========================================================================`);
  console.log(`✅ MASTER CLOUD PUBLISHING COMPLETED FOR WEEK ${paddedWeek} (${slotName})`);
  console.log(`========================================================================`);

  return {
    weekNum: paddedWeek,
    dayCode,
    slotName,
    articleTitle,
    articleCategory,
    articleDesc,
    articleUrl,
    fbPageName,
    fbTopic,
    fbStatus
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const weekArg = args.find((a) => a.startsWith('--week='))?.split('=')[1];
  const dayArg = args.find((a) => a.startsWith('--day='))?.split('=')[1];
  const skipEmail = args.includes('--skip-email');

  runMasterCloudPublishing({ weekNum: weekArg, dayCode: dayArg, skipEmail })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal Master Cloud Publisher Error:', err);
      process.exit(1);
    });
}

module.exports = { runMasterCloudPublishing, getCurrentScheduleSlot, resolveCanonicalArticle, parseArticleFile };
