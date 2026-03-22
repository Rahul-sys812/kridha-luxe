import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import fs from 'fs';
import path from 'path';

const FILE_CATEGORY_MAP = {
  'products_rings.json':      'Rings',
  'products_earrings.json':   'Earrings',
  'products_necklaces.json':  'Necklaces',
  'products_bracelets.json':  'Bracelets',
  'products_pendants.json':   'Pendants',
  'products_hair.json':       'Hair Accessories',
  'products_nose.json':       'Nose Pins',
  'products_nose2.json':      'Nose Pins',
  'products_coins.json':      'Coins',
  'products_coins2.json':     'Coins',
  'products_desi.json':       'Ethnic',
  'products_ethnic.json':     'Ethnic',
  'products_gifts.json':      'Gifts',
  'products_gifts2.json':     'Gifts',
};

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function GET() {
  try {
    await connectDB();

    const existing = await Product.countDocuments();
    if (existing > 0) {
      return NextResponse.json({ message: `Already seeded — ${existing} products in DB` });
    }

    const root = process.cwd();
    let allDocs = [];
    const seen = new Set();

    for (const [filename, category] of Object.entries(FILE_CATEGORY_MAP)) {
      const filePath = path.join(root, filename);
      if (!fs.existsSync(filePath)) continue;

      let raw;
      try {
        raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        continue;
      }

      const items = Array.isArray(raw) ? raw : (raw.products || []);

      for (const p of items) {
        const legacyId = String(p.id || '');
        if (legacyId && seen.has(legacyId)) continue;
        if (legacyId) seen.add(legacyId);

        const price = parseFloat(p.price || p.variants?.[0]?.price || 0);
        const comparePrice = parseFloat(p.compare_at_price || p.variants?.[0]?.compare_at_price || 0);
        const allImages = (p.images || []).map(img => img.src || img).filter(Boolean);
        const image = p.featured_image || allImages[0] || '';
        const image2 = allImages[1] || '';
        const stock = p.variants?.[0]?.inventory_quantity ?? 100;

        allDocs.push({
          name: p.title || p.name || 'Unnamed',
          price,
          comparePrice,
          image,
          image2,
          images: allImages,
          category,
          description: stripHtml(p.description || p.body_html || ''),
          sku: p.variants?.[0]?.sku || p.sku || '',
          stock: stock < 0 ? 0 : stock,
          isNew: false,
          isBestseller: false,
          isActive: p.available !== false,
          weight: p.variants?.[0]?.weight || 0.05,
          legacyId,
        });
      }
    }

    await Product.insertMany(allDocs);
    return NextResponse.json({ message: `✓ Seeded ${allDocs.length} products`, count: allDocs.length });
  } catch (err) {
    console.error('[seed]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
