const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@vnpis.com',
    pass: 'lejochkwtxpxrefu',
  },
});

async function sendNotification(subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: '"VNPIS AI Assistant" <info@vnpis.com>',
      to: 'tamluu253@gmail.com',
      cc: 'info@vnpis.com',
      subject: subject,
      html: htmlContent,
    });
    console.log('SUCCESS: Email sent with messageId =', info.messageId);
  } catch (err) {
    console.error('ERROR sending email:', err);
  }
}

sendNotification(
  '[VNPIS AI Bot] Xác Nhận Kênh Nhận Email Thông Báo Duyệt Bài Viết',
  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background-color: #ffffff;">
    <div style="background-color: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 20px; color: #f97316;">VNPIS AI ASSISTANT — THÔNG BÁO TỰ ĐỘNG</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Xác nhận thiết lập kênh nhận thông báo duyệt bài viết</p>
    </div>

    <p style="font-size: 15px; color: #334155; line-height: 1.6;">
      Kính gửi Anh/Chị Quản trị hệ thống VNPIS,
    </p>

    <p style="font-size: 15px; color: #334155; line-height: 1.6;">
      Trợ lý AI Antigravity đã kết nối thành công với hệ thống Email Google Workspace của công ty (<strong>info@vnpis.com</strong>).
    </p>

    <p style="font-size: 15px; color: #334155; line-height: 1.6;">
      Mỗi khi có <strong>Lịch trình bài viết mới</strong> hoặc <strong>Bản thảo bài viết SEO mới</strong> cần Anh/Chị phê duyệt cho 3 website (<code>vnpis.com</code>, <code>inanvnpis.com</code>, <code>cuuhodauin.com</code>), hệ thống sẽ tự động gửi email thông báo trực tiếp đến hộp thư này (<strong>tamluu253@gmail.com</strong> &amp; <strong>info@vnpis.com</strong>).
    </p>

    <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 16px; margin: 20px 0; font-size: 14px; color: #15803d; border-radius: 4px;">
      <strong>Cam kết quy trình:</strong> Toàn bộ bài viết sẽ nằm ở dạng bản thảo (Draft) và chỉ được xuất bản live sau khi nhận được sự đồng ý phê duyệt từ Anh/Chị.
    </div>

    <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 24px;">
      Email thông báo từ trợ lý AI Antigravity — Hệ thống VNPIS Master Workspace.
    </div>
  </div>
  `
);
