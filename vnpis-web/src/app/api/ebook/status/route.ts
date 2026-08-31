import { NextResponse } from 'next/server';
import { findOrderById } from '@/lib/orders';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Thiếu mã đơn hàng.' }, { status: 400 });
    }

    const order = await findOrderById(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng.' }, { status: 404 });
    }

    const responseData: any = {
      orderId: order.orderId,
      status: order.status,
      email: order.email
    };

    if (order.status === 'COMPLETED') {
      const { generateDownloadToken } = require('@/lib/orders');
      responseData.token = generateDownloadToken(order.email);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: 'Có lỗi xảy ra.' }, { status: 500 });
  }
}
