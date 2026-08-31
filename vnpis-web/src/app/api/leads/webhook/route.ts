import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure Google Workspace SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'info@vnpis.com',
    pass: 'lejochkwtxpxrefu',
  },
});

export async function POST(request: Request) {
  try {
    let body: Record<string, string> = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        body[key] = value.toString();
      });
    } else {
      try {
        body = await request.json();
      } catch (e) {
        // fallback to empty body if parsing fails
      }
    }

    // Extracting fields from lead form
    const name = body.full_name || body.name || 'Khách hàng ẩn danh';
    const phone = body.phone_zalo || body.phone || 'Chưa cung cấp';
    const company = body.company_name || body.company || 'Cá nhân / Chưa rõ';
    const serviceInterest = body.service_interest || 'Cứu hộ / Tư vấn kỹ thuật';
    const equipmentModel = body.equipment_model || 'Chưa cung cấp thông tin';
    const projectNotes = body.project_notes || body.message || 'Không có ghi chú thêm';
    const sourceDomain = body.source_domain || 'vnpis.com';
    const articleTitle = body.article_title || 'Bài viết kỹ thuật';
    const canonicalUrl = body.canonical_url || '';

    const timeStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    console.log('=== LEAD MỚI TỪ WEBHOOK BÀI VIẾT ===');
    console.log(`- Thời gian: ${timeStr}`);
    console.log(`- Nguồn: ${sourceDomain}`);
    console.log(`- Bài viết: ${articleTitle}`);
    console.log(`- Họ và tên: ${name}`);
    console.log(`- Số điện thoại: ${phone}`);
    console.log(`- Công ty: ${company}`);
    console.log(`- Dịch vụ quan tâm: ${serviceInterest}`);
    console.log(`- Thiết bị / Vật liệu: ${equipmentModel}`);
    console.log(`- Ghi chú: ${projectNotes}`);
    console.log('====================================');

    // Create premium HTML email template
    const htmlEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; color: #f97316;">VNPIS B2B WEB LEAD - BÀI VIẾT BLOG</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Thời gian: ${timeStr}</p>
        </div>

        <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">
          Hệ thống vừa nhận được thông tin đăng ký tư vấn/khảo sát của khách hàng qua form bài viết:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; width: 150px; background-color: #f8fafc;">Họ và Tên:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold; font-size: 16px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Số Điện Thoại / Zalo:</td>
            <td style="padding: 10px; color: #2563eb; font-weight: bold; font-size: 16px;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Công ty / Xưởng:</td>
            <td style="padding: 10px; color: #0f172a;">${company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Dịch Vụ Quan Tâm:</td>
            <td style="padding: 10px; color: #f97316; font-weight: bold;">${serviceInterest}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Model / Vật Liệu:</td>
            <td style="padding: 10px; color: #0f172a;">${equipmentModel}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Bài Viết Nguồn:</td>
            <td style="padding: 10px; color: #0f172a; font-size: 13px;">
              <a href="${canonicalUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: bold;">${articleTitle}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Nhu Cầu Chi Tiết:</td>
            <td style="padding: 10px; color: #0f172a; line-height: 1.5;">${projectNotes}</td>
          </tr>
        </table>

        <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #c2410c;">
          <strong>Hành động tiếp theo:</strong> Vui lòng liên hệ lại khách hàng ngay qua Zalo/SĐT: <strong>${phone}</strong> để tư vấn kịp thời.
        </div>

        <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          Email này được gửi tự động từ hệ thống Webhook VNPIS.
        </div>
      </div>
    `;

    // Send mail to info@vnpis.com and CC tamluu253@gmail.com
    await transporter.sendMail({
      from: '"VNPIS Lead webhook" <info@vnpis.com>',
      to: 'info@vnpis.com',
      cc: 'tamluu253@gmail.com',
      subject: `[VNPIS Article Lead] ${name} - ${phone} (${company})`,
      html: htmlEmail,
    });

    console.log('Email sent successfully via webhook SMTP!');

    // Redirect fallback link
    const redirectUrl = canonicalUrl || '/blog';

    const formattedMessage = `Xin chào VNPIS, tôi là ${name} (${company} - SĐT: ${phone}). Tôi vừa gửi yêu cầu từ bài viết "${articleTitle}" và đang cần tư vấn gấp: ${projectNotes}`;
    const zaloTamUrl = `https://zalo.me/0987453866`;
    const whatsappTamUrl = `https://wa.me/84987453866?text=${encodeURIComponent(formattedMessage)}`;

    // Render beautiful Dark Theme Success Thank You Page
    const thankYouHtml = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VNPIS - Đăng Ký Thành Công</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            font-family: 'Outfit', sans-serif;
            background-color: #0b0f19;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px;
            max-width: 550px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            animation: fadeIn 0.6s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .icon-container {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
            animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          @keyframes scaleUp {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            margin: 0 0 12px;
            background: linear-gradient(to right, #ffffff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p {
            color: #94a3b8;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 24px;
          }
          .user-name {
            color: #f97316;
            font-weight: 600;
          }
          .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.08);
            margin: 24px 0;
          }
          .cta-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #38bdf8;
            margin-bottom: 16px;
          }
          .buttons-grid {
            display: grid;
            grid-template-cols: 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }
          @media (min-width: 480px) {
            .buttons-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 14px;
          }
          .btn-zalo {
            background: #2563eb;
            color: #ffffff;
          }
          .btn-zalo:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          .btn-whatsapp {
            background: #10b981;
            color: #ffffff;
          }
          .btn-whatsapp:hover {
            background: #059669;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          .redirect-text {
            font-size: 13px;
            color: #64748b;
          }
          .redirect-link {
            color: #f97316;
            text-decoration: none;
            font-weight: 600;
          }
          .redirect-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon-container">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1>Đăng Ký Thành Công!</h1>
          <p>Chào <span class="user-name">${name}</span>, yêu cầu của bạn về bài viết <br/><strong>"${articleTitle}"</strong> đã được tiếp nhận thành công.</p>
          
          <div class="divider"></div>
          
          <div class="cta-title">Hỗ trợ nhanh trong 5 phút</div>
          <div class="buttons-grid">
            <a href="${zaloTamUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-zalo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Chat Zalo Kỹ Sư Trưởng
            </a>
            <a href="${whatsappTamUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Chat WhatsApp
            </a>
          </div>
          
          <div class="redirect-text">
            Bạn sẽ tự động quay trở lại bài viết sau <span id="countdown" style="font-weight: bold; color: #f97316;">5</span> giây.<br/>
            Nếu không tự chuyển hướng, vui lòng bấm <a href="${redirectUrl}" class="redirect-link">tại đây</a>.
          </div>
        </div>

        <script>
          let seconds = 5;
          const countdownEl = document.getElementById('countdown');
          const timer = setInterval(() => {
            seconds--;
            countdownEl.textContent = seconds;
            if (seconds <= 0) {
              clearInterval(timer);
              window.location.href = "${redirectUrl}";
            }
          }, 1000);
        </script>
      </body>
      </html>
    `;

    return new NextResponse(thankYouHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ success: false, error: 'Có lỗi xảy ra khi xử lý webhook' }, { status: 500 });
  }
}
