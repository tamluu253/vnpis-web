import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, company, message, pageTitle } = body;

    // Log the consultation request in server console
    console.log('=== KHÁCH HÀNG ĐĂNG KÝ TƯ VẤN ===');
    console.log(`- Thời gian: ${new Date().toLocaleString('vi-VN')}`);
    console.log(`- Trang: ${pageTitle || 'Chung'}`);
    console.log(`- Họ và tên: ${name}`);
    console.log(`- Số điện thoại: ${phone}`);
    console.log(`- Công ty / Xưởng: ${company}`);
    console.log(`- Nhu cầu: ${message}`);
    console.log('===================================');

    // Optionally send to Formspree or Email API if endpoint is set
    try {
      await fetch('https://formspree.io/f/mrbgzqvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          company,
          message,
          pageTitle,
          _replyto: 'info@vnpis.com',
          _subject: `[VNPIS Web Lead] Khách hàng ${name} - ${phone} đăng ký tư vấn`
        })
      });
    } catch (e) {
      // Ignore background email send failure to keep UX fast
    }

    return NextResponse.json({ success: true, message: 'Đã tiếp nhận yêu cầu tư vấn' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Có lỗi xảy ra' }, { status: 500 });
  }
}
