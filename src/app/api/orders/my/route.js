import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { getAuthUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    await connectDB();
    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (err) {
    console.error('[GET /api/orders/my]', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
