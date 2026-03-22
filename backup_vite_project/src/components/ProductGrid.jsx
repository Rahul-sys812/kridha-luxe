import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Eye, Heart, Star, Search, Filter, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { products as mockProducts } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

import { useFilter } from '../context/FilterContext';

export default function ProductGrid() {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useFilter();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useAuth();

  const categories = ['All', 'Rings', 'Pendants', 'Earrings', 'Bracelets', 'Necklaces', 'Hair Accessories', 'Gifts'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setProducts(data);
        }
      } catch (error) {
        console.log("Backend offline, using mock data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <section className="py-24 bg-white" id="product-grid">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[14px] font-bold uppercase tracking-[0.4em] text-brand-orange"
          >
            The Best Sellers
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter">
            Timeless <span className="italic font-light text-gray-400">Treasures</span>
          </h2>
          <div className="w-20 h-[2px] bg-brand-orange mx-auto opacity-50"></div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-lg scale-105' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gems..."
              className="w-full bg-brand-gray/30 border border-transparent focus:border-brand-orange/20 focus:bg-white px-12 py-3.5 rounded-full text-sm font-sans font-medium text-brand-charcoal transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-orange/5"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-orange transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-brand-gray/50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No matching treasures found</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="text-brand-orange text-[10px] font-bold uppercase tracking-widest border-b border-brand-orange pb-1"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All */}
        <div className="mt-28 text-center uppercase tracking-[0.5em] text-[11px] font-bold">
           <Link to="/collections" className="text-brand-charcoal hover:text-brand-orange transition-colors border-b-2 border-brand-orange/10 pb-2">
             Explore All Collections
           </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist?.some(item => item.id === product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] bg-brand-gray mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
        <Link to={`/product/${product.id}`} className="block h-full">
          <AnimatePresence mode="wait">
            <motion.img 
              key={isHovered ? 'hover' : 'normal'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              src={isHovered ? (product.image2 || product.image) : product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </Link>
        
        {/* Wishlist Icon */}
        <button 
          onClick={() => toggleWishlist?.(product)}
          className={`absolute top-5 right-5 p-3 rounded-full transition-all duration-500 shadow-lg transform ${
            isWishlisted ? 'bg-brand-orange text-white scale-110' : 'bg-white/95 text-brand-charcoal hover:bg-white hover:scale-110'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
        </button>

        {/* Ribbons */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
           {product.isBestseller && (
             <span className="bg-brand-charcoal text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">Bestseller</span>
           )}
           {product.isNew && (
             <span className="bg-white/95 text-brand-orange text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-brand-orange/10">New Arrival</span>
           )}
        </div>

        {/* Giva-style Rating */}
        <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg border border-white">
           <Star className="w-3 h-3 text-yellow-500 fill-current" />
           <span className="text-[11px] font-black text-brand-charcoal">4.8</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4 flex-1 px-4 text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[15px] font-bold uppercase tracking-[0.1em] text-brand-charcoal line-clamp-1 group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-4">
              <span className="text-[18px] font-black text-brand-charcoal">₹{product.price}</span>
              <span className="text-[14px] text-gray-400 line-through font-medium">₹{Math.round(product.price * 1.5)}</span>
           </div>
           {/* Offer Tag */}
           <motion.span 
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="text-[10px] font-black uppercase text-brand-orange tracking-[0.2em] mt-2"
           >
             Limited Boutique Offer
           </motion.span>
        </div>
      </div>

      {/* Add to Cart Pill Button */}
      <div className="mt-8 px-2">
         <button 
           onClick={() => addToCart(product)}
           className="w-full h-16 bg-brand-charcoal text-white rounded-full text-[13px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-orange transition-all duration-500 shadow-2xl group/btn transform hover:-translate-y-1 active:scale-95"
         >
           <ShoppingBag className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
           Add to Cart
         </button>
      </div>
    </motion.div>
  );
}

