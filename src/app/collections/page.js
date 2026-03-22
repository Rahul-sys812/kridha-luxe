"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useFilter } from '@/context/FilterContext';
import { categoryNames } from '@/data/categories';
import ProductCard from '@/components/ProductCard';

export default function Collections() {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useFilter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = categoryNames;

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'All') params.set('category', activeCategory);
    if (searchQuery) params.set('search', searchQuery);
    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory, searchQuery]);

  const filteredProducts = products;

  return (
    <div className="bg-brand-cream/10 min-h-screen pt-40 pb-32">
      {/* Page Header */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 mb-20 animate__animated animate__fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-brand-cream">
           <div className="space-y-4">
              <span className="uppercase text-brand-gold tracking-[0.5em] font-bold text-[10px] block">
                The Boutique Gallery
              </span>
              <h1 className="text-5xl md:text-8xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-[0.9]">
                The <span className="italic font-bold text-brand-gold">Collection</span>
              </h1>
           </div>
           <p className="text-gray-400 max-w-sm text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
             From minimalist everyday essentials to artisanal statement pieces designed for your most memorable moments.
           </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Filters & Search */}
        <div className="mb-16 space-y-4 animate__animated animate__fadeInUp">

          {/* Search — full width */}
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gems..."
              className="w-full bg-white border border-brand-cream focus:border-brand-gold/40 pl-11 pr-11 py-3.5 text-[10px] font-bold tracking-[0.2em] text-brand-charcoal transition-all placeholder:text-gray-300 focus:outline-none rounded-sm shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills — scrollable row, no wrap */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-brand-cream/10 to-transparent md:hidden" />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between pt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-300 border-b border-brand-cream pb-4">
            <span>{filteredProducts.length} masterpieces found</span>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sort by Relevance</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-brand-cream/60 rounded-sm" />
                  <div className="h-3 bg-brand-cream/60 rounded w-3/4" />
                  <div className="h-3 bg-brand-cream/40 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-8 animate__animated animate__fadeIn">
              <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-brand-gold opacity-30" />
              </div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">The gallery has no matching pieces</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] border-b border-brand-gold pb-1 hover:tracking-[0.6em] transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
