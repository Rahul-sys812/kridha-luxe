import json
import os
import re

def clean_html(text):
    if not text:
        return ""
    # Remove HTML tags
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text).strip()

def process_file(filename, category):
    if not os.path.exists(filename):
        return []
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if 'products' not in data:
                return []
            
            processed = []
            for p in data['products']:
                # Skip if no variants or price
                if not p.get('variants'):
                    continue
                
                price = float(p['variants'][0]['price'])
                
                # Get images
                images = p.get('images', [])
                img1 = images[0]['src'] if len(images) > 0 else ""
                img2 = images[1]['src'] if len(images) > 1 else img1
                
                processed.append({
                    "id": p['id'],
                    "name": p['title'],
                    "price": int(price),
                    "image": img1,
                    "image2": img2,
                    "category": category,
                    "isNew": "new" in p['title'].lower() or "latest" in p['title'].lower(),
                    "isBestseller": "best" in p['title'].lower(),
                    "description": clean_html(p.get('body_html', ''))
                })
            return processed
    except Exception as e:
        print(f"Error processing {filename}: {e}")
        return []

all_products = []

# Mapping files to categories
category_map = {
    'products_rings.json': 'Rings',
    'products_earrings.json': 'Earrings',
    'products_necklaces.json': 'Necklaces',
    'products_bracelets.json': 'Bracelets',
    'products_hair.json': 'Hair Accessories',
    'products_gifts.json': 'Gifts',
    'products_desi.json': 'Pendants', # Using desi-apsara for pendants as shared content
    'products_ethnic.json': 'Pendants'
}

seen_ids = set()

for filename, category in category_map.items():
    products = process_file(filename, category)
    for p in products:
        if p['id'] not in seen_ids:
            all_products.append(p)
            seen_ids.add(p['id'])

# Sort and give fresh IDs if needed, or keep original? 
# User's products.js used 1, 2, 3...
for i, p in enumerate(all_products):
    p['id'] = i + 1

# Export to products.js format
content = "export const products = " + json.dumps(all_products, indent=2) + ";"

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write("// Product Data Extracted from KB Jewels\n")
    f.write(content)

print(f"Successfully processed {len(all_products)} products.")
