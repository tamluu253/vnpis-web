import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { findOrderById, updateOrderStatus, generateDownloadToken } from '@/lib/orders';

export const dynamic = 'force-dynamic';

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

// Helper to extract Order ID from bank remark (handles typos, spaces, missing hyphens)
function extractOrderId(remark: string): string | null {
  if (!remark) return null;

  // Case 1: Match standard format EBK-YYMMDD-XXXX (e.g. EBK-260831-1002)
  const match1 = remark.match(/EBK-\d{6}-\d{4}/i);
  if (match1) return match1[0].toUpperCase();

  // Case 2: Match no-hyphen format EBK2608311002
  const match2 = remark.match(/EBK\d{10}/i);
  if (match2) {
    const raw = match2[0].toUpperCase(); // EBK2608311002
    return `EBK-${raw.slice(3, 9)}-${raw.slice(9)}`;
  }

  // Case 3: Match space-separated EBK 260831 1002
  const match3 = remark.match(/EBK\s*(\d{6})\s*(\d{4})/i);
  if (match3) {
    return `EBK-${match3[1]}-${match3[2]}`.toUpperCase();
  }

  // Case 4: General search by stripping all non-alphanumeric characters
  const cleanRemark = remark.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const matchClean = cleanRemark.match(/EBK\d{10}/);
  if (matchClean) {
    const raw = matchClean[0];
    return `EBK-${raw.slice(3, 9)}-${raw.slice(9)}`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[CASSO VNPIS POS WEBHOOK RECEIVED]:', JSON.stringify(body, null, 2));

    const transList = Array.isArray(body.data) ? body.data : (Array.isArray(body) ? body : [body]);

    const processed = [];

    for (const t of transList) {
      const remark = t.description || t.remark || '';
      const amount = t.amount || 0;
      const tid = t.tid || t.id || `MB-${Date.now()}`;
      const transDate = t.when || new Date().toLocaleString('vi-VN');

      console.log(`[Processing Trans]: ID=${tid}, Amount=${amount}, Remark="${remark}"`);

      // 1. Try to find Order ID in remark
      const orderId = extractOrderId(remark);
      let orderProcessed = false;
      let orderDetails = null;

      if (orderId) {
        console.log(`Matched Order ID: ${orderId}`);
        const order = await findOrderById(orderId);

        if (order) {
          orderDetails = order;
          // Check if order is PENDING and payment amount is correct (50,000 VND)
          // We allow minor margin, >= 49,000 to catch any minor bank fee errors
          if (order.status === 'PENDING' && amount >= 49000) {
            console.log(`Activating delivery for Order: ${orderId}, Email: ${order.email}`);
            
            // A. Update status
            await updateOrderStatus(orderId, 'COMPLETED');
            
            // B. Generate secure token
            const token = generateDownloadToken(order.email);
            const downloadUrl = `https://vnpis.com/api/ebook/download?token=${token}`;
            const zaloSupportUrl = `https://zalo.me/g/vnpis-support`;
            const zaloTamUrl = `https://zalo.me/0987453866`;

            // C. Construct customer email (HTML & Text)
            const customerEmailHtml = `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; background-color: #ffffff; color: #1e293b;">
                <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 24px;">
                  <span style="font-size: 28px; font-weight: 800; color: #0284c7; letter-spacing: -0.5px;">VNPIS<span style="color: #f97316;">.COM</span></span>
                  <div style="font-size: 13px; color: #64748b; margin-top: 4px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Hệ Thống Bàn Giao Tự Động</div>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #334155;">
                  Chào anh/chị <strong>${order.name}</strong>,
                </p>
                
                <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
                  Cảm ơn anh/chị đã đăng ký tài liệu kỹ thuật từ Hệ sinh thái In ấn Công nghiệp VNPIS. Hệ thống đã xác nhận thanh toán thành công cho đơn hàng <strong>#${orderId}</strong>.
                </p>

                <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
                  <h3 style="margin: 0 0 12px 0; color: #0369a1; font-size: 16px; font-weight: 700;">📥 TÀI LIỆU CỦA ANH/CHỊ ĐÃ SẴN SÀNG</h3>
                  <p style="font-size: 13px; color: #0369a1; margin: 0 0 20px 0;">Sổ Tay Xử Lý 50 Sự Cố In Pad Thực Chiến (File PDF chất lượng cao, 54 trang)</p>
                  
                  <a href="${downloadUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25); transition: all 0.2s ease;">
                    Tải Sổ Tay PDF Ngay
                  </a>
                </div>

                <p style="font-size: 13px; color: #64748b; font-style: italic; margin-bottom: 28px; line-height: 1.5; text-align: center;">
                  *(Vui lòng lưu file về điện thoại hoặc máy tính để tiện tra cứu trực tiếp khi đứng máy tại nhà xưởng. Link tải có giá trị sử dụng trong vòng 1 năm).*
                </p>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-bottom: 28px;">
                  <h4 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px;">🎁 Quà tặng kỹ thuật đi kèm:</h4>
                  <p style="font-size: 14px; line-height: 1.5; color: #334155; margin: 0 0 16px 0;">
                    Anh/chị được đặc cách tham gia nhóm Zalo <strong>"Giải Đáp Kỹ Thuật In Pad VNPIS"</strong> để gửi hình ảnh sự cố trực tiếp và nhận tư vấn giải pháp từ các kỹ sư trưởng của chúng tôi:
                  </p>
                  <a href="${zaloSupportUrl}" target="_blank" style="display: inline-flex; align-items: center; color: #0255a5; font-weight: 700; text-decoration: none; font-size: 14px; border: 1px solid #0255a5; padding: 8px 16px; border-radius: 6px;">
                    <img src="https://vnpis.com/images/zalo-icon.svg" width="16" height="16" style="margin-right: 8px; vertical-align: middle;" onerror="this.style.display='none'" />
                    Tham Gia Nhóm Hỗ Trợ Zalo
                  </a>
                </div>

                <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 16px; border-radius: 4px; font-size: 14px; color: #c2410c; margin-bottom: 28px; line-height: 1.6;">
                  <strong>Hỗ trợ kỹ thuật khẩn cấp:</strong> Mọi thắc mắc trong quá trình vận hành máy móc hoặc pha mực in, anh/chị có thể liên hệ trực tiếp hotline/Zalo Kỹ Sư Trưởng Mr. Tâm: <a href="${zaloTamUrl}" style="font-weight: bold; color: #ea580c; text-decoration: none;">0987 453 866</a> để được xử lý ngay lập tức.
                </div>

                <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 24px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                  <strong>CÔNG TY TNHH VNPIS - GIẢI PHÁP IN ẤN CÔNG NGHIỆP TOÀN DIỆN</strong><br/>
                  Địa chỉ: 18 Đường số 4, KDC Đại Phúc Green Villas, Bình Hưng, Bình Chánh, TP.HCM<br/>
                  Email: info@vnpis.com | Hotline: 0987 453 866 | Website: vnpis.com
                </div>
              </div>
            `;

            // D. Send Ebook email to client
            await transporter.sendMail({
              from: '"VNPIS Ebook Delivery" <info@vnpis.com>',
              to: order.email,
              subject: `[VNPIS] Bàn giao Link tải Sổ Tay 50 Sự Cố In Pad Thực Chiến (Đơn hàng #${orderId})`,
              html: customerEmailHtml,
            });

            console.log(`Ebook delivered successfully to ${order.email}`);

            // E. Send confirmation email to VNPIS Admin
            const adminNotifyHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
                <div style="background-color: #10b981; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="margin: 0; font-size: 18px;">VNPIS EBOOK - THANH TOÁN THÀNH CÔNG</h2>
                  <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Giao file tự động thành công | Mã đơn: ${orderId}</p>
                </div>

                <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">
                  Đơn hàng Ebook đã được thanh toán tự động thành công và hệ thống đã gửi link tải Ebook qua email cho khách hàng.
                </p>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569; width: 150px;">Mã Đơn Hàng:</td><td style="padding: 8px; color: #0f172a; font-weight: bold;">${orderId}</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569;">Họ và Tên:</td><td style="padding: 8px; color: #0f172a;">${order.name}</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569;">Số Điện Thoại:</td><td style="padding: 8px; color: #2563eb; font-weight: bold;">${order.phone}</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569;">Email Nhận Sách:</td><td style="padding: 8px; color: #0f172a;">${order.email}</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569;">Công ty:</td><td style="padding: 8px; color: #0f172a;">${order.company || 'Cá nhân'}</td></tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px; font-weight: bold; color: #475569;">Số Tiền Nhận:</td><td style="padding: 8px; color: #10b981; font-weight: bold;">${amount.toLocaleString('vi-VN')} đ</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Mã GD MB:</td><td style="padding: 8px; color: #64748b;">${tid}</td></tr>
                </table>

                <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                  Hệ thống email tự động VNPIS Ebook.
                </div>
              </div>
            `;

            await transporter.sendMail({
              from: '"VNPIS Ebook Auto" <info@vnpis.com>',
              to: 'info@vnpis.com',
              cc: 'tamluu253@gmail.com',
              subject: `[Ebook Paid & Delivered] ${orderId} - ${order.name} - ${amount.toLocaleString('vi-VN')} đ`,
              html: adminNotifyHtml,
            });

            orderProcessed = true;
          } else {
            console.log(`Order matched but skip. Status=${order.status}, Amount=${amount} (Expected >= 190000)`);
          }
        } else {
          console.warn(`Order matched ${orderId} but not found in Database!`);
        }
      }

      processed.push({
        id: tid,
        transDate,
        amount,
        remark,
        bankSubAccId: t.bank_sub_acc_id || t.subAccId || '0371000428484',
        orderId,
        orderProcessed,
        customerEmail: orderDetails ? (orderDetails as any).email : null
      });
    }

    return NextResponse.json({
      error: 0,
      message: 'Casso Webhook verified and processed successfully',
      clientId: '647acefd-abfe-4508-807f-b35551e9ab41',
      processedCount: processed.length,
      data: processed,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Casso Webhook processing error:', err);
    return NextResponse.json({ error: 1, message: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ACTIVE_REALTIME',
    clientId: '647acefd-abfe-4508-807f-b35551e9ab41',
    accountNumber: '0371000428484',
    accountName: 'Lưu Trọng Tâm',
    bankName: 'Vietcombank',
    webhookEndpoint: 'https://vnpis.com/api/mbbank/webhook',
    cassoIntegrationStatus: 'VERIFIED_CONNECTED'
  });
}
