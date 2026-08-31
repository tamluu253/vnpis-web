import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createOrder } from '@/lib/orders';

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
    const body = await request.json();
    const { name, phone, email, company } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Họ tên, số điện thoại và email là bắt buộc.' },
        { status: 400 }
      );
    }

    // 1. Create order
    const order = createOrder({
      name,
      phone,
      email,
      company: company || ''
    });

    const timeStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // 2. Generate VietQR payment URL
    // Bank ID: VCB (Vietcombank)
    // Account Number: 0371000428484
    // Amount: 50000
    // Description: EBOOK <orderId> (e.g. EBOOK EBK-260831-1002)
    const encodedDescription = encodeURIComponent(`EBOOK ${order.orderId}`);
    const qrUrl = `https://img.vietqr.io/image/VCB-0371000428484-print.png?amount=50000&addInfo=${encodedDescription}&accountName=LUU%20TRONG%20TAM`;

    console.log('=== ĐƠN HÀNG EBOOK MỚI KHỞI TẠO ===');
    console.log(`- Đơn hàng: ${order.orderId}`);
    console.log(`- Khách hàng: ${order.name}`);
    console.log(`- Điện thoại: ${order.phone}`);
    console.log(`- Email: ${order.email}`);
    console.log(`- Công ty: ${order.company}`);
    console.log(`- Số tiền: 50,000 VND`);
    console.log(`- Trạng thái: PENDING`);
    console.log('====================================');

    // 3. Send email notification to info@vnpis.com
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; color: #f97316;">VNPIS EBOOK - ĐĂNG KÝ MỚI (PENDING)</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Thời gian: ${timeStr}</p>
        </div>

        <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">
          Hệ thống vừa nhận được yêu cầu đăng ký mua Sổ Tay 50 Sự Cố In Pad. Đơn hàng đang chờ thanh toán:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; width: 150px; background-color: #f8fafc;">Mã Đơn Hàng:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold; font-size: 15px;">${order.orderId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Họ và Tên:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold; font-size: 15px;">${order.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Số Điện Thoại / Zalo:</td>
            <td style="padding: 10px; color: #2563eb; font-weight: bold; font-size: 15px;">${order.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Email Nhận Sách:</td>
            <td style="padding: 10px; color: #0f172a;">${order.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Công ty / Xưởng:</td>
            <td style="padding: 10px; color: #0f172a;">${order.company || 'Cá nhân'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #475569; background-color: #f8fafc;">Giá trị đơn hàng:</td>
            <td style="padding: 10px; color: #f97316; font-weight: bold;">50.000đ</td>
          </tr>
        </table>

        <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #1e3a8a;">
          <strong>Trạng thái:</strong> Chờ thanh toán chuyển khoản qua VietQR. Khi khách chuyển khoản đúng cú pháp <strong>EBOOK ${order.orderId}</strong>, hệ thống sẽ tự động giao file PDF.
        </div>

        <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          Email này được gửi tự động từ hệ thống VNPIS Ebook.
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: '"VNPIS Ebook Sales" <info@vnpis.com>',
        to: 'info@vnpis.com',
        cc: 'tamluu253@gmail.com',
        subject: `[Ebook Order Pending] ${order.orderId} - ${order.name}`,
        html: adminEmailHtml,
      });
    } catch (mailErr) {
      console.error('Failed to send admin order notification:', mailErr);
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      amount: order.amount,
      qrUrl,
      order
    });
  } catch (error: any) {
    console.error('Ebook order creation error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
