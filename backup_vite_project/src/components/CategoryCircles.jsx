import React from 'react';
import { motion } from 'framer-motion';
import { useFilter } from '../context/FilterContext';

export default function CategoryCircles() {
  const { setActiveCategory, setSearchQuery } = useFilter();
  const categories = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535633302703-b03039bf1025?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Gifts', image: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'All', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  const handleCategoryClick = (name) => {
    setActiveCategory(name);
    setSearchQuery(''); // Clear search when picking a category
    // Smooth scroll to product grid if on home page
    const grid = document.getElementById('product-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-center gap-6 md:gap-12 overflow-x-auto pb-8 no-scrollbar">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 flex-shrink-0 group cursor-pointer"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-orange transition-all duration-500 shadow-md transform group-hover:scale-110">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                {/* Decorative Ring */}
                <div className="absolute -inset-2 rounded-full border border-brand-orange/0 group-hover:border-brand-orange/20 transition-all duration-700"></div>
              </div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal group-hover:text-brand-orange transition-colors">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
