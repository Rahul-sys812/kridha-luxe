"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFilter } from '../context/FilterContext';
import ProductCard from './ProductCard';
import { categoryNames } from '../data/categories';

export default function ProductGrid() {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useFilter();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <section className="py-24 bg-brand-cream/20" id="product-grid">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-brand-gold animate__animated animate__fadeIn">
            Boutique Highlights
          </span>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-brand-charcoal uppercase tracking-tighter animate__animated animate__fadeInUp">
            Exquisite <span className="italic font-bold text-brand-gold">Masterpieces</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto animate__animated animate__zoomIn"></div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-16 space-y-4 animate__animated animate__fadeIn">
          {/* Search Input — full width on mobile */}
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="w-full bg-white border border-gray-100 focus:border-brand-gold/40 pl-11 pr-11 py-3.5 text-[11px] font-medium tracking-widest text-brand-charcoal transition-all placeholder:text-gray-300 focus:outline-none rounded-sm shadow-sm"
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

          {/* Category Pills — horizontal scroll, no wrap, no overflow */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-6 py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'border-brand-charcoal text-brand-charcoal'
                      : 'border-transparent text-gray-400 hover:text-brand-gold hover:border-brand-gold/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Fade hint on right edge */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-brand-cream/20 to-transparent md:hidden" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[500px]">
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
            <div className="py-32 text-center space-y-6">
              <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto opacity-50">
                <Search className="w-8 h-8 text-brand-gold" />
              </div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">The boutique has no pieces matching your request</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="text-brand-gold text-[10px] font-bold uppercase tracking-widest border-b border-brand-gold pb-1 hover:tracking-[0.4em] transition-all"
              >
                Discover All Pieces
              </button>
            </div>
          )}
        </div>

        {/* Explore All Link */}
        <div className="mt-32 text-center animate__animated animate__fadeInUp">
           <Link href="/collections" className="text-brand-charcoal text-[11px] font-bold uppercase tracking-[0.5em] hover:text-brand-gold transition-all pb-3 border-b border-brand-gold/20 hover:border-brand-gold hover:tracking-[0.6em]">
             View Entire Gallery
           </Link>
        </div>
      </div>
    </section>
  );
}
