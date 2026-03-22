// Run: node scripts/seed.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set in .env.local'); process.exit(1); }

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, comparePrice: Number,
  image: String, image2: String, images: [String],
  category: String, description: String,
  sku: String, stock: { type: Number, default: 100 },
  isNew: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  weight: { type: Number, default: 0.05 },
  legacyId: String,
}, { timestamps: true, suppressReservedKeysWarning: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// filename → category name mapping
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

function parseFile(filename, category) {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping ${filename} (not found)`);
    return [];
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  // Support both { products: [...] } and plain array
  const items = Array.isArray(raw) ? raw : (raw.products || []);

  return items.map(p => {
    const price = parseFloat(p.price || p.variants?.[0]?.price || 0);
    const comparePrice = parseFloat(p.compare_at_price || p.variants?.[0]?.compare_at_price || 0);
    const allImages = (p.images || []).map(img => img.src || img).filter(Boolean);
    const image = p.featured_image || allImages[0] || '';
    const image2 = allImages[1] || '';
    const description = stripHtml(p.description || p.body_html || '');
    const stock = p.variants?.[0]?.inventory_quantity ?? 100;

    return {
      name: p.title || p.name || 'Unnamed',
      price,
      comparePrice,
      image,
      image2,
      images: allImages,
      category,
      description,
      sku: p.variants?.[0]?.sku || p.sku || '',
      stock: stock < 0 ? 0 : stock,
      isNew: false,
      isBestseller: false,
      isActive: p.available !== false,
      weight: p.variants?.[0]?.weight || 0.05,
      legacyId: String(p.id || ''),
    };
  });
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✓ Connected to MongoDB');

  let allProducts = [];
  for (const [filename, category] of Object.entries(FILE_CATEGORY_MAP)) {
    const items = parseFile(filename, category);
    console.log(`  ${filename}: ${items.length} products (${category})`);
    allProducts = allProducts.concat(items);
  }

  // Deduplicate by legacyId
  const seen = new Set();
  const unique = allProducts.filter(p => {
    if (!p.legacyId) return true;
    if (seen.has(p.legacyId)) return false;
    seen.add(p.legacyId);
    return true;
  });

  console.log(`\nTotal unique products: ${unique.length}`);
  console.log('Clearing existing products...');
  await Product.deleteMany({});

  console.log('Inserting products...');
  await Product.insertMany(unique);
  console.log(`✓ Seeded ${unique.length} products successfully!\n`);

  // Print category breakdown
  const cats = {};
  unique.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
  Object.entries(cats).forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seed failed:', err.message); process.exit(1); });
