const nodemailer = require('c:/Users/TL/.gemini/antigravity/scratch/vnpis_projects/vnpis-web/node_modules/nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@vnpis.com',
    pass: 'lejochkwtxpxrefu',
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: 'info@vnpis.com',
      to: 'info@vnpis.com',
      subject: '🧪 [KÍCH HOẠT HỆ THỐNG] Lộ trình đăng bài Fanpage VNPIS 6 Tháng Tự Động',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0F172A; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0; color: #38BDF8;">VNPIS MARKETING CLOUD AUTOMATION</h2>
            <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 14px;">Hệ thống xuất bản tự động Fanpage &amp; Báo cáo Email</p>
          </div>
          <div style="padding: 24px;">
            <p>Kính gửi <strong>Mr. Tâm</strong>,</p>
            <p>Hệ thống tự động hóa đăng bài 6 tháng liên tục cho 2 Fanpage của VNPIS đã được kích hoạt thành công trên máy chủ đám mây.</p>
            <ul style="background: #F8FAFC; padding: 15px 20px 15px 35px; border-radius: 6px; border-left: 4px solid #38BDF8;">
              <li><strong>Tần suất đăng:</strong> Mỗi 2 ngày (Thứ 2, Thứ 4, Thứ 6) lúc 08:30 sáng.</li>
              <li><strong>Phạm vi:</strong> Fanpage Xưởng In Gia Công &amp; Fanpage Thiết Bị Máy In.</li>
              <li><strong>Cơ chế:</strong> Chạy 24/7 trên Cloud (GitHub Actions Cron), hoàn toàn độc lập với máy tính/laptop cá nhân.</li>
              <li><strong>Thông báo:</strong> Mỗi khi xuất bản bài viết thành công lên Facebook, hệ thống sẽ tự động gửi email báo cáo chi tiết về hòm thư này.</li>
            </ul>
            <p style="margin-top: 20px; font-size: 13px; color: #64748B;">Thời gian kiểm tra: ${new Date().toLocaleString('vi-VN')}</p>
          </div>
          <div style="background: #F1F5F9; padding: 12px; text-align: center; font-size: 12px; color: #64748B;">
            © 2026 VNPIS Solutions - Giải pháp &amp; Thiết bị in ấn công nghiệp toàn diện
          </div>
        </div>
      `
    });
    console.log('EMAIL SENT SUCCESSFULLY! Message ID:', info.messageId);
  } catch (err) {
    console.error('EMAIL FAILED:', err);
  }
}

main();
