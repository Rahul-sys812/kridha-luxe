"use client";
import React from 'react';
import { useFilter } from '../context/FilterContext';
import { categoryData } from '../data/categories';
export default function CategoryCircles() {
  const { setActiveCategory, setSearchQuery } = useFilter();

  const handleCategoryClick = (name) => {
    setActiveCategory(name);
    setSearchQuery('');
    const grid = document.getElementById('product-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-brand-cream/10 overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-center gap-8 md:gap-16 overflow-x-auto pb-10 no-scrollbar">
          {categoryData.map((cat, i) => (
            <div
              key={cat.name}
              className="flex flex-col items-center gap-5 flex-shrink-0 group cursor-pointer animate__animated animate__zoomIn"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-brand-cream bg-white p-1 ring-1 ring-brand-gold/20 group-hover:ring-brand-gold transition-all duration-700 shadow-sm transform group-hover:scale-110">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -inset-2 rounded-full border border-brand-gold/0 group-hover:border-brand-gold/10 group-hover:animate-spin transition-all duration-1000" style={{ animationDuration: '8s' }}></div>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-brand-gold transition-all group-hover:tracking-[0.5em]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
