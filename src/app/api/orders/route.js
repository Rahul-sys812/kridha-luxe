import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    const body = await req.json();
    const { items, shippingAddress, subtotal, tax, shippingCost, total,
            razorpayOrderId, razorpayPaymentId,
            shiprocketOrderId, shiprocketShipmentId, awbCode, trackingUrl } = body;

    const order = await Order.create({
      user: user?._id || null,
      guestEmail: shippingAddress.email,
      items,
      shippingAddress,
      subtotal,
      tax,
      shippingCost,
      total,
      razorpayOrderId,
      razorpayPaymentId,
      isPaid: true,
      paidAt: new Date(),
      shiprocketOrderId,
      shiprocketShipmentId,
      awbCode,
      trackingUrl,
      status: 'paid',
    });

    return NextResponse.json({ orderId: order._id, success: true }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}
