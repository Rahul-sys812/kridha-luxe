const fs = require('fs');
const path = require('path');

function cleanHtml(text) {
    if (!text) return "";
    return text.replace(/<[^>]*>?/gm, '').trim();
}

const categoryMap = {
    'products_rings.json': 'Rings',
    'products_earrings.json': 'Earrings',
    'products_necklaces.json': 'Necklaces',
    'products_bracelets.json': 'Bracelets',
    'products_hair.json': 'Hair Accessories',
    'products_gifts.json': 'Gifts',
    'products_desi.json': 'Pendants',
    'products_ethnic.json': 'Pendants'
};

const allProducts = [];
const seenIds = new Set();
let idCounter = 1;

Object.entries(categoryMap).forEach(([filename, category]) => {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (data.products && Array.isArray(data.products)) {
                data.products.forEach(p => {
                    if (seenIds.has(p.id)) return;
                    if (!p.variants || p.variants.length === 0) return;

                    const price = parseInt(p.variants[0].price);
                    const images = p.images || [];
                    const img1 = images.length > 0 ? images[0].src : "";
                    const img2 = images.length > 1 ? images[1].src : img1;

                    allProducts.push({
                        id: idCounter++,
                        name: p.title,
                        price: price,
                        image: img1,
                        image2: img2,
                        category: category,
                        isNew: p.title.toLowerCase().includes('new') || p.title.toLowerCase().includes('latest'),
                        isBestseller: p.title.toLowerCase().includes('best'),
                        description: cleanHtml(p.body_html || "")
                    });
                    seenIds.add(p.id);
                });
            }
        } catch (e) {
            console.error(`Error processing ${filename}: ${e.message}`);
        }
    }
});

const content = `// Product Data Extracted from KB Jewels
export const products = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/data/products.js'), content);
console.log(`Successfully processed ${allProducts.length} products.`);
