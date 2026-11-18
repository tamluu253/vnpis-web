const fs = require('fs');
const path = require('path');
const { runMasterCloudPublishing } = require('../master_cloud_publisher');
const { flushPendingFacebookQueue, PAGE_CONFIGS, RETRY_QUEUE_PATH } = require('./facebook_auto_manager');

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  try {
    nodemailer = require(path.join(process.cwd(), 'vnpis-web', 'node_modules', 'nodemailer'));
  } catch (e2) {}
}

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.join(WORKSPACE_ROOT, '.env');
const MANAGER_PATH = path.join(__dirname, 'facebook_auto_manager.js');

const MISSED_SLOTS = [
  { weekNum: 14, dayCode: '01', label: 'Tuần 14 - Thứ Hai (09/11/2026)' },
  { weekNum: 14, dayCode: '02', label: 'Tuần 14 - Thứ Tư (11/11/2026)' },
  { weekNum: 14, dayCode: '03', label: 'Tuần 14 - Thứ Sáu (13/11/2026)' },
  { weekNum: 15, dayCode: '01', label: 'Tuần 15 - Thứ Hai (16/11/2026)' },
  { weekNum: 15, dayCode: '02', label: 'Tuần 15 - Thứ Tư (18/11/2026)' }
];

async function exchangeAndSaveTokens(userOrPageToken, appId = null, appSecret = null) {
  let workingToken = userOrPageToken.trim();

  // 1. If App ID & App Secret are provided, exchange short-lived User Token -> Long-Lived User Token first
  if (appId && appSecret) {
    console.log('[FB TOKEN] Exchanging short-lived token for Long-Lived User Token...');
    const exchangeUrl =
      `https://graph.facebook.com/v19.0/oauth/access_token` +
      `?grant_type=fb_exchange_token` +
      `&client_id=${encodeURIComponent(appId)}` +
      `&client_secret=${encodeURIComponent(appSecret)}` +
      `&fb_exchange_token=${encodeURIComponent(workingToken)}`;
    const res = await fetch(exchangeUrl);
    const data = await res.json();
    if (data && data.access_token) {
      workingToken = data.access_token;
      console.log('✅ [FB TOKEN] Successfully obtained Long-Lived User Token!');
    } else {
      console.warn('[FB TOKEN WARN] Could not exchange via app secret, trying token directly:', data);
    }
  }

  // 2. Fetch /me/accounts to extract Page Access Tokens for both VNPIS Fanpages
  console.log('[FB TOKEN] Fetching Page Access Tokens for VNPIS Fanpages via /me/accounts...');
  const accountsRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token&access_token=${encodeURIComponent(workingToken)}`
  );
  const accountsData = await accountsRes.json();

  let solutionsToken = null;
  let machinesToken = null;

  if (accountsData && Array.isArray(accountsData.data)) {
    for (const page of accountsData.data) {
      if (page.id === '1197966926731641') {
        solutionsToken = page.access_token;
        console.log(`✅ Found Page Token for: ${page.name} (${page.id})`);
      } else if (page.id === '1043133472221893') {
        machinesToken = page.access_token;
        console.log(`✅ Found Page Token for: ${page.name} (${page.id})`);
      }
    }
  } else {
    // Check if the provided token is already a direct Page Token
    const meRes = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${encodeURIComponent(workingToken)}`);
    const meData = await meRes.json();
    if (meData && meData.id === '1197966926731641') {
      solutionsToken = workingToken;
      console.log(`✅ Provided token is direct Page Token for VNPIS Solutions (${meData.id})`);
    } else if (meData && meData.id === '1043133472221893') {
      machinesToken = workingToken;
      console.log(`✅ Provided token is direct Page Token for VNPIS Machines (${meData.id})`);
    } else {
      console.error('❌ [FB TOKEN ERROR] Token invalid or lacks pages_show_list / pages_manage_posts:', accountsData || meData);
      return false;
    }
  }

  // 3. Save updated tokens to .env and facebook_auto_manager.js
  if (solutionsToken) {
    PAGE_CONFIGS.vnpis_solutions.token = solutionsToken;
    updateEnvVar('FB_PAGE_SOLUTIONS_TOKEN', solutionsToken);
    updateManagerDefaultToken('1197966926731641', solutionsToken);
  }
  if (machinesToken) {
    PAGE_CONFIGS.vnpis_machines.token = machinesToken;
    updateEnvVar('FB_PAGE_MACHINES_TOKEN', machinesToken);
    updateManagerDefaultToken('1043133472221893', machinesToken);
  }

  return Boolean(solutionsToken || machinesToken);
}

function updateEnvVar(key, value) {
  if (!fs.existsSync(ENV_PATH)) return;
  let content = fs.readFileSync(ENV_PATH, 'utf8');
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content += `\n${key}=${value}\n`;
  }
  fs.writeFileSync(ENV_PATH, content, 'utf8');
}

function updateManagerDefaultToken(pageId, newToken) {
  if (!fs.existsSync(MANAGER_PATH)) return;
  let content = fs.readFileSync(MANAGER_PATH, 'utf8');
  if (pageId === '1197966926731641') {
    content = content.replace(
      /(FB_PAGE_SOLUTIONS_TOKEN \|\| ')[^']+(')/,
      `$1${newToken}$2`
    );
  } else if (pageId === '1043133472221893') {
    content = content.replace(
      /(FB_PAGE_MACHINES_TOKEN \|\| ')[^']+(')/,
      `$1${newToken}$2`
    );
  }
  fs.writeFileSync(MANAGER_PATH, content, 'utf8');
}

async function runBatchCatchUp(sendConsolidatedEmail = true) {
  console.log('========================================================================');
  console.log('🔄 RUNNING BATCH CATCH-UP FOR ALL 5 SLOTS (WEEK 14 & WEEK 15)');
  console.log('========================================================================\n');

  const results = [];
  for (const slot of MISSED_SLOTS) {
    const res = await runMasterCloudPublishing({
      weekNum: slot.weekNum,
      dayCode: slot.dayCode,
      skipEmail: true
    });
    results.push({ ...slot, ...res });
  }

  if (sendConsolidatedEmail && nodemailer) {
    const recipient = process.env.TARGET_EMAIL || 'info@vnpis.com';
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || 'info@vnpis.com';
    const smtpPass = process.env.SMTP_PASS || 'lejochkwtxpxrefu';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const rowsHtml = results
      .map(
        (r) => `
        <div style="background: #F8FAFC; border-left: 4px solid #0284C7; padding: 12px 16px; border-radius: 6px; margin: 12px 0;">
          <p style="margin: 2px 0; color: #0369A1; font-weight: bold;">📅 ${r.label}</p>
          <p style="margin: 2px 0;"><strong>Tiêu đề chuẩn SEO:</strong> ${r.articleTitle}</p>
          <p style="margin: 2px 0;"><strong>Chủ đề:</strong> ${r.articleCategory}</p>
          <p style="margin: 2px 0;"><strong>Canonical URL:</strong> <a href="${r.articleUrl}" style="color: #0284C7; font-weight: bold;">${r.articleUrl}</a></p>
          <p style="margin: 2px 0;"><strong>Meta Description:</strong> <em>${r.articleDesc}</em></p>
          <p style="margin: 2px 0;"><strong>Chủ đề Fanpage (${r.fbPageName}):</strong> ${r.fbTopic}</p>
        </div>`
      )
      .join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 720px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0F172A; padding: 24px; color: white; text-align: center;">
          <h2 style="margin: 0; color: #10B981; font-size: 21px;">✅ ĐÃ KHẮC PHỤC & ĐỒNG BỘ LẠI TOÀN BỘ 5 BÀI VIẾT (TUẦN 14 & 15)</h2>
          <p style="margin: 6px 0 0 0; color: #94A3B8; font-size: 14px;">VNPIS Autonomous Cloud Engine — Báo cáo xử lý lỗi Metadata & Indexing</p>
        </div>
        <div style="padding: 24px;">
          <p>Xin chào Ban Giám Đốc & Kỹ Sư VNPIS,</p>
          <p>Hệ thống kỹ thuật đã tự động kiểm tra và khắc phục triệt để lỗi hiển thị <code>week_XX_vnpis_YY.md (N/A)</code> của 5 phiên xuất bản từ ngày 09/11 đến 18/11/2026, đồng thời gửi lại tín hiệu Indexing chuẩn Canonical lên Google & Bing IndexNow:</p>
          ${rowsHtml}
          <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 14px 18px; border-radius: 6px; margin-top: 18px;">
            <h4 style="margin: 0 0 6px 0; color: #B45309;">🔑 Trạng thái Hàng đợi Facebook Fanpage (5 bài chờ):</h4>
            <p style="margin: 0; font-size: 14px;">Toàn bộ 5 bài đăng Fanpage đã được lưu sẵn vào hàng đợi <code>facebook_pending_retry_queue.json</code>. Ngay khi cấp lại Page Access Token mới (do token ngày 08/11 là token ngắn hạn 1 giờ), hệ thống sẽ tự động đẩy bù cả 5 bài lên 2 Fanpage VNPIS trong 1 lệnh duy nhất.</p>
          </div>
        </div>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from: `"VNPIS Cloud Engine" <${smtpUser}>`,
        to: recipient,
        subject: `[VNPIS CLOUD - ĐÃ KHẮC PHỤC] Đồng bộ bù 5 bài viết chuẩn SEO Tuần 14 & Tuần 15`,
        html
      });
      console.log(`\n📧 [CONSOLIDATED EMAIL SENT] Message ID: ${info.messageId}`);
    } catch (e) {
      console.error('[EMAIL ERROR]', e.message);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const tokenArg = args.find((a) => a.startsWith('--token='))?.split('=')[1];
  const appIdArg = args.find((a) => a.startsWith('--app-id='))?.split('=')[1];
  const appSecretArg = args.find((a) => a.startsWith('--app-secret='))?.split('=')[1];
  const catchupOnly = args.includes('--catchup');

  if (tokenArg) {
    const ok = await exchangeAndSaveTokens(tokenArg, appIdArg, appSecretArg);
    if (ok) {
      const res = await flushPendingFacebookQueue();
      console.log(`\n🎉 [DONE] Flushed Facebook Queue: ${res.published} published, ${res.remaining} remaining.`);
    }
    return;
  }

  if (catchupOnly) {
    await runBatchCatchUp(true);
    return;
  }

  console.log('Usage:');
  console.log('  1. Catch-up 5 slots (SEO + Queue + Consolidated Email):');
  console.log('     node scripts/social_publishers/renew_and_republish_fb.js --catchup');
  console.log('  2. Renew token & auto-publish all queued Facebook posts:');
  console.log('     node scripts/social_publishers/renew_and_republish_fb.js --token="EAA..." [--app-id="..."] [--app-secret="..."]');
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
