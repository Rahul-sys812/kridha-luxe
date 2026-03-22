import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isNew = searchParams.get('isNew');
    const isBestseller = searchParams.get('isBestseller');
    const limit = parseInt(searchParams.get('limit') || '0', 10);

    let result = products;

    if (category && category !== 'All') {
      result = result.filter(product => product.category === category);
    }

    if (isNew === 'true') {
      result = result.filter(product => product.isNew);
    }

    if (isBestseller === 'true') {
      result = result.filter(product => product.isBestseller);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(product => (
        product.name.toLowerCase().includes(q) ||
        (product.description || '').toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      ));
    }

    if (limit > 0) {
      result = result.slice(0, limit);
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
