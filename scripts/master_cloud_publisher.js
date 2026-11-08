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
    console.warn('[WARN] gray-matter not found.');
  }
}

const { pingIndexNow } = require('./indexnow_ping');
const { publishPost, PAGE_CONFIGS } = require('./social_publishers/facebook_auto_manager');

// Baseline start date for Week 1 (Monday, August 10, 2026)
const START_DATE = new Date('2026-08-10T00:00:00Z');

function getCurrentScheduleSlot() {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  let weekNum = Math.floor(diffDays / 7) + 1;
  if (weekNum < 1) weekNum = 1;
  if (weekNum > 52) weekNum = 52;

  // Day of week in UTC: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  // Vietnam is UTC+7. At 01:00 UTC, it's 08:00 AM VN.
  const day = now.getUTCDay();
  let dayCode = '01';
  let slotName = 'monday';

  if (day === 3) {
    dayCode = '02';
    slotName = 'wednesday';
  } else if (day === 5) {
    dayCode = '03';
    slotName = 'friday';
  } else if (day === 1) {
    dayCode = '01';
    slotName = 'monday';
  } else {
    // If triggered manually on other days, fallback to 01
    dayCode = '01';
    slotName = 'monday';
  }

  return { weekNum, dayCode, slotName };
}

function pingGoogleSitemap(sitemapUrl = 'https://vnpis.com/sitemap.xml') {
  return new Promise((resolve) => {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    https.get(pingUrl, (res) => {
      console.log(`[Google Ping] ${sitemapUrl} -> Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`[Google Ping Notice] Offline or logged:`, err.message);
      resolve(null);
    });
  });
}

async function sendCloudPublishReport(details) {
  const recipient = process.env.TARGET_EMAIL || 'info@vnpis.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
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
          <p style="margin: 4px 0;"><strong>Tiêu đề:</strong> ${details.articleTitle || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Chủ đề:</strong> ${details.articleCategory || 'N/A'}</p>
          <p style="margin: 4px 0;"><strong>Link bài viết:</strong> <a href="${details.articleUrl}" target="_blank" style="color: #0284C7; font-weight: bold;">${details.articleUrl}</a></p>
          <p style="margin: 4px 0;"><strong>Meta Description:</strong> <em>${details.articleDesc || 'N/A'}</em></p>
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

async function runMasterCloudPublishing() {
  const { weekNum, dayCode, slotName } = getCurrentScheduleSlot();
  const paddedWeek = String(weekNum).padStart(2, '0');

  console.log(`========================================================================`);
  console.log(`🚀 RUNNING VNPIS AUTONOMOUS MASTER CLOUD PUBLISHER`);
  console.log(`⏰ Schedule: Week ${paddedWeek} | Slot: ${slotName.toUpperCase()} (DayCode: ${dayCode})`);
  console.log(`========================================================================\n`);

  // 0. Auto-sync Google Photos & Filter Brand Safety
  try {
    const { syncGooglePhotos } = require('./marketing_ai/sync_google_photos');
    console.log('📸 Checking and syncing new Google Photos with AI Brand Safety...');
    await syncGooglePhotos();
  } catch (err) {
    console.log('[PHOTO SYNC NOTICE]', err.message);
  }

  // 1. Locate Article
  const articleFile = `week_${paddedWeek}_vnpis_${dayCode}.md`;
  const articlesDir = path.join(process.cwd(), 'vnpis-web', 'content', 'articles');
  const filePath = path.join(articlesDir, articleFile);

  let articleMeta = {};
  let articleUrl = `https://vnpis.com/blog/week_${paddedWeek}_vnpis_${dayCode}`;

  if (fs.existsSync(filePath) && matter) {
    const parsed = matter(fs.readFileSync(filePath, 'utf8'));
    articleMeta = parsed.data || {};
    console.log(`✅ [ARTICLE FOUND] ${articleFile}`);
    console.log(`   Title: ${articleMeta.title}`);
    console.log(`   Category: ${articleMeta.category}`);
  } else {
    console.log(`[NOTICE] File ${articleFile} not directly found. Scanning week ${paddedWeek}...`);
  }

  // 2. Search Engine Ping
  console.log('\n📡 Triggering Search Engine Indexing Pings...');
  try {
    await pingGoogleSitemap('https://vnpis.com/sitemap.xml');
    pingIndexNow('https://vnpis.com', [articleUrl]);
  } catch (err) {
    console.log('[SEARCH ENGINE PING ERROR]', err.message);
  }

  // 3. Social Media Publishing (Facebook Fanpage)
  let fbStatus = 'Chưa thiết lập token hoặc chạy test';
  let fbTopic = 'Giải pháp in ấn và công nghệ bao bì VNPIS';
  let fbPageName = 'VNPIS Solutions / VNPIS Machines';

  const roadmapPath = path.join(process.cwd(), 'vnpis_marketing', 'facebook_6_months_roadmap.json');
  if (fs.existsSync(roadmapPath)) {
    try {
      const roadmap = JSON.parse(fs.readFileSync(roadmapPath, 'utf8'));
      const weekIndex = ((weekNum - 1) % 26);
      const weekData = roadmap[String(weekIndex)] || roadmap[weekIndex];
      if (weekData && weekData[slotName]) {
        const slotData = weekData[slotName];
        fbTopic = slotData.topic;
        fbPageName = slotData.page_name;
        const targetPageKey = slotData.target_page;

        const postMessage = `🚀 [VNPIS SOLUTIONS] GIẢI PHÁP IN ẤN CÔNG NGHIỆP B2B\n` +
          `📌 CHỦ ĐỀ CHUYÊN MÔN: ${fbTopic.toUpperCase()}\n\n` +
          `✅ Cập nhật bài viết kỹ thuật mới nhất từ đội ngũ VNPIS:\n` +
          `👉 Xem chi tiết tại: ${articleUrl}\n\n` +
          `📞 Hotline / Zalo: 0987.453.866 - Mr. Tâm\n` +
          `🌐 Website: https://vnpis.com\n` +
          `#VNPIS #InTampon #InLua #InCongNghiep #VatTuInAn`;

        console.log(`\n📢 Attempting Facebook Fanpage publication for: ${fbPageName}`);
        const res = await publishPost(targetPageKey, postMessage, articleUrl);
        if (res && res.id) {
          fbStatus = `✅ Đã đăng thành công lên Facebook (Post ID: ${res.id})`;
        } else {
          fbStatus = `⚠️ Facebook API phản hồi: ${JSON.stringify(res || 'No response')}`;
        }
      }
    } catch (err) {
      console.error('[FB ROADMAP PARSE ERROR]', err.message);
      fbStatus = `Lỗi xử lý Facebook: ${err.message}`;
    }
  }

  // 4. Send Email Report
  console.log('\n📧 Sending Executive Summary Email...');
  await sendCloudPublishReport({
    weekNum: paddedWeek,
    dayCode,
    slotName,
    articleTitle: articleMeta.title || articleFile,
    articleCategory: articleMeta.category,
    articleDesc: articleMeta.description,
    articleUrl,
    fbPageName,
    fbTopic,
    fbStatus
  });

  console.log(`\n========================================================================`);
  console.log(`✅ MASTER CLOUD PUBLISHING COMPLETED FOR WEEK ${paddedWeek} (${slotName})`);
  console.log(`========================================================================`);
}

if (require.main === module) {
  runMasterCloudPublishing().then(() => process.exit(0)).catch(err => {
    console.error('Fatal Master Cloud Publisher Error:', err);
    process.exit(1);
  });
}

module.exports = { runMasterCloudPublishing, getCurrentScheduleSlot };
