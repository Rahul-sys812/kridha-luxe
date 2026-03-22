import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const product = products.find(item => String(item.id) === String(id));

    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    console.error('[GET /api/products/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
