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

    // Send email directly to info@vnpis.com via FormSubmit AJAX service
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@vnpis.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[VNPIS Web Lead] Khách hàng ${name} (${phone}) - ${company}`,
          _template: 'table',
          _captcha: 'false',
          'Họ và tên': name,
          'Số điện thoại': phone,
          'Tên công ty / Xưởng': company,
          'Mô tả nhu cầu': message || 'Tư vấn báo giá máy',
          'Trang đăng ký': pageTitle || 'Website VNPIS'
        })
      });
      const resData = await response.json();
      console.log('FormSubmit Result:', resData);
    } catch (e) {
      console.error('Email dispatch error:', e);
    }

    return NextResponse.json({ success: true, message: 'Đã tiếp nhận yêu cầu tư vấn' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Có lỗi xảy ra' }, { status: 500 });
  }
}
