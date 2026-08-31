import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyDownloadToken } from '@/lib/orders';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Thiếu token xác thực. Quyền truy cập bị từ chối.', { status: 401 });
    }

    // 1. Verify token
    const email = verifyDownloadToken(token);
    if (!email) {
      return new NextResponse('Token không hợp lệ hoặc đã hết hạn (chỉ hoạt động trong vòng 365 ngày). Vui lòng liên hệ hỗ trợ.', { status: 403 });
    }

    // 2. Locate the secure PDF file
    const filePath = path.join(process.cwd(), 'private', 'So_Tay_50_Su_Co_In_Pad_VNPIS_Final.pdf');

    if (!fs.existsSync(filePath)) {
      console.error(`Ebook file not found at: ${filePath}`);
      return new NextResponse('Tệp tài liệu Ebook không tìm thấy trên máy chủ. Vui lòng liên hệ ban kỹ thuật.', { status: 444 });
    }

    // 3. Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // 4. Return file with proper headers to download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="So_Tay_50_Su_Co_In_Pad_VNPIS_Final.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Ebook download error:', error);
    return new NextResponse('Có lỗi xảy ra khi tải sách. Vui lòng thử lại sau.', { status: 500 });
  }
}
