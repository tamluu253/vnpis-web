const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { publishPost, PAGE_CONFIGS } = require('./facebook_auto_manager');

// Base Start Date: Monday, November 9, 2026
const BASE_START_DATE = new Date('2026-11-09T00:00:00+07:00');

// SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@vnpis.com',
    pass: process.env.SMTP_PASS || 'lejochkwtxpxrefu',
  },
});

function getScheduleForNow() {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - BASE_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  let weekNum = Math.floor(diffDays / 7) + 1;
  if (weekNum < 1) weekNum = 1;
  if (weekNum > 26) weekNum = ((weekNum - 1) % 26) + 1;

  const dayOfWeek = now.getDay(); // 1 = Mon, 3 = Wed, 5 = Fri
  let slot = 'monday';
  if (dayOfWeek === 3) slot = 'wednesday';
  else if (dayOfWeek === 5) slot = 'friday';
  else if (dayOfWeek === 1) slot = 'monday';

  return { weekNum, slot };
}

function generatePostContent(topic, targetPageKey) {
  const isSolutions = targetPageKey === 'vnpis_solutions';
  const website = isSolutions ? 'https://inanvnpis.com' : 'https://vnpis.com';
  
  return `🚀 [VNPIS SOLUTIONS] GIẢI PHÁP IN ẤN CÔNG NGHIỆP B2B
📌 CHỦ ĐỀ CHUYÊN MÔN: ${topic.toUpperCase()}

Kính gửi Quý Khách hàng và Đối tác sản xuất,

Trong môi trường gia công in ấn và sản xuất công nghiệp, chất lượng từng chi tiết in quyết định trực tiếp đến giá trị thương hiệu và sự hài lòng của đối tác. VNPIS tự hào mang đến giải pháp toàn diện:

✅ Năng lực kỹ thuật chuẩn xác:
  • Kiểm soát chất lượng nghiêm ngặt: Kiểm tra độ bám dính băng keo 3M, cào xước vật lý và kiểm tra độ bền cồn 90°.
  • Công nghệ tiên tiến: Thiết bị hiện đại, căn chỉnh đồ gá CNC chính xác từng milimet, dung sai tiệm cận tuyệt đối.
  • Đa dạng chất liệu: Nhựa khó bám (PP, PE, POM), ABS, PC, Acrylic, Thủy tinh, Kim loại và May mặc.

✅ Dịch vụ & Hỗ trợ tận xưởng:
  • Tư vấn đúng giải pháp - Tiết kiệm chi phí đầu tư và chi phí phế phẩm.
  • Hỗ trợ làm mẫu thử nghiệm (test proofing) trước khi sản xuất hàng loạt.
  • Giao hàng nhanh chóng trên toàn quốc kèm hướng dẫn kỹ thuật chi tiết.

👉 Liên hệ ngay với đội ngũ kỹ thuật VNPIS để nhận mẫu in thử và báo giá tối ưu nhất!

---
📞 Hotline / Zalo Kỹ Sư Trưởng: 0987.453.866 - Mr. Tâm
🌐 Website chính thức: ${website}
🏢 Hệ thống xưởng sản xuất VNPIS:
📍 Xưởng 1: 62 Trần Thị Nơi, Phường Chánh Hưng, TP.HCM
📍 Xưởng 2: Số 18, Đường Số 4, KDC Đại Phúc Green Villas, Bình Hưng, Bình Chánh, TP.HCM

#VNPIS #InTampon #InLua #InCongNghiep #PhaMucPantone #VatTuInAn #MayInDate #B2BPrinting`;
}

async function sendEmailReport(targetPageName, topic, postContent, postUrl) {
  const recipient = 'info@vnpis.com';
  console.log(`[EMAIL] Sending report to ${recipient}...`);

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #0F172A; padding: 22px; color: white; text-align: center;">
        <h2 style="margin: 0; color: #38BDF8; font-size: 20px;">VNPIS AUTONOMOUS MARKETING ENGINE</h2>
        <p style="margin: 6px 0 0 0; color: #94A3B8; font-size: 13px;">Báo cáo bài đăng Fanpage tự động (Mỗi 2 ngày)</p>
      </div>

      <div style="padding: 24px;">
        <p>Kính gửi <strong>Mr. Tâm</strong>,</p>
        <p>Hệ thống tự động hóa VNPIS vừa xuất bản thành công một bài viết mới lên Facebook Fanpage theo đúng lộ trình 6 tháng:</p>

        <div style="background: #F8FAFC; border-left: 4px solid #38BDF8; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
          <p style="margin: 4px 0;"><strong>Trang đăng tải:</strong> <span style="color: #0284C7; font-weight: bold;">${targetPageName}</span></p>
          <p style="margin: 4px 0;"><strong>Chủ đề:</strong> ${topic}</p>
          <p style="margin: 4px 0;"><strong>Thời gian đăng:</strong> ${new Date().toLocaleString('vi-VN')}</p>
          ${postUrl ? `<p style="margin: 6px 0;"><a href="${postUrl}" target="_blank" style="display: inline-block; background: #0284C7; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">👉 Bấm để xem bài viết trên Facebook</a></p>` : ''}
        </div>

        <h4 style="margin-bottom: 8px; color: #334155;">Nội dung bài đăng:</h4>
        <div style="background: #F1F5F9; padding: 16px; border-radius: 6px; font-size: 13px; white-space: pre-wrap; max-height: 300px; overflow-y: auto; color: #334155; border: 1px solid #CBD5E1;">${postContent}</div>
      </div>

      <div style="background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 14px; text-align: center; font-size: 12px; color: #64748B;">
        © ${new Date().getFullYear()} VNPIS Solutions - Hệ thống vận hành tự động 24/7 trên Cloud
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"VNPIS Marketing Automation" <info@vnpis.com>',
      to: recipient,
      subject: `[VNPIS Fanpage Alert] Đã đăng bài mới: ${topic.slice(0, 50)}...`,
      html: html
    });
    console.log(`[EMAIL SUCCESS] Report sent! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`[EMAIL ERROR]`, err);
  }
}

async function runAutoPublishPipeline(forceSlot = null) {
  console.log(`========================================================================`);
  console.log(`🚀 RUNNING VNPIS 6-MONTH CLOUD AUTO-PUBLISH PIPELINE`);
  console.log(`========================================================================`);

  const roadmapPath = path.join(process.cwd(), 'vnpis_marketing', 'facebook_6_months_roadmap.json');
  if (!fs.existsSync(roadmapPath)) {
    console.error('[ERROR] Roadmap file not found!');
    process.exit(1);
  }

  const roadmap = JSON.parse(fs.readFileSync(roadmapPath, 'utf8'));
  const schedule = getScheduleForNow();
  const weekNum = schedule.weekNum;
  const slot = forceSlot || schedule.slot;

  const currentWeekPlan = roadmap.find(w => w.week === weekNum) || roadmap[0];
  const postInfo = currentWeekPlan[slot] || currentWeekPlan.monday;

  console.log(`[SCHEDULE] Week: ${weekNum} / 26 | Slot: ${slot.toUpperCase()}`);
  console.log(`[TARGET PAGE] ${postInfo.page_name} (${postInfo.target_page})`);
  console.log(`[TOPIC] ${postInfo.topic}`);

  const postContent = generatePostContent(postInfo.topic, postInfo.target_page);
  const websiteLink = postInfo.target_page === 'vnpis_solutions' ? 'https://inanvnpis.com' : 'https://vnpis.com';

  // 1. Publish to Facebook
  const publishResult = await publishPost(postInfo.target_page, postContent, websiteLink);

  let postUrl = null;
  if (publishResult && publishResult.id) {
    postUrl = `https://www.facebook.com/${publishResult.id}`;
  }

  // 2. Send Email Alert
  await sendEmailReport(postInfo.page_name, postInfo.topic, postContent, postUrl);

  // 3. Log History
  const historyPath = path.join(process.cwd(), 'vnpis_marketing', 'facebook_publish_history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try { history = JSON.parse(fs.readFileSync(historyPath, 'utf8')); } catch(e) {}
  }

  history.push({
    timestamp: new Date().toISOString(),
    week: weekNum,
    slot: slot,
    page_key: postInfo.target_page,
    page_name: postInfo.page_name,
    topic: postInfo.topic,
    fb_post_id: publishResult ? publishResult.id : null,
    fb_url: postUrl
  });

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
  console.log(`[SUCCESS] Pipeline execution finished! Total published: ${history.length}`);
}

if (require.main === module) {
  const forceSlot = process.argv[2] ? process.argv[2].replace('--', '') : null;
  runAutoPublishPipeline(forceSlot).then(() => process.exit(0)).catch(err => {
    console.error('Fatal Pipeline Error:', err);
    process.exit(1);
  });
}

module.exports = { runAutoPublishPipeline, getScheduleForNow };
