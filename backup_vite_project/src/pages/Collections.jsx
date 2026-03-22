import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Filter, ChevronDown } from 'lucide-react';
import { products as mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useFilter } from '../context/FilterContext';

export default function Collections() {
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const { activeCategory, setActiveCategory, searchQuery } = useFilter();
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [setActiveCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products${activeCategory !== 'All' ? `?category=${activeCategory}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (error) {
         setProducts(mockProducts);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Hair Accessories', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Pendants', 'Gifts'];

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      {/* Page Header */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-gray-100">
           <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="uppercase text-brand-orange tracking-[0.3em] font-bold text-[10px]"
              >
                Curated Collections
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter"
              >
                The <span className="italic font-light text-gray-400">Shop</span>
              </motion.h1>
           </div>
           <p className="text-gray-400 max-w-sm text-sm font-light leading-relaxed">
             From minimalist everyday essentials to statement pieces for your most memorable moments.
           </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Filters & Categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
                  activeCategory === category 
                    ? 'bg-brand-charcoal text-white border-brand-charcoal' 
                    : 'bg-transparent text-gray-400 border-gray-100 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>{filteredProducts.length} Products Found</span>
            <div className="w-[1px] h-4 bg-gray-100"></div>
            <button className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Filter className="w-3 h-3" />
              <span>Sort By</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              key={product.id} 
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link to={`/product/${product.id}`} className="block space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] bg-brand-gray mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  
                  {product.isNew && (
                    <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[9px] font-bold px-4 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-sm">
                      New
                    </span>
                  )}

                  <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                <div className="space-y-2 px-2">
                  <h3 className="text-lg font-display font-medium text-brand-charcoal uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-sans font-light text-gray-400 italic">{product.category}</p>
                    <p className="text-lg font-bold text-brand-charcoal">₹{product.price}</p>
                  </div>
                </div>
              </Link>
              
              <div className="mt-6 px-2">
                 <button 
                  onClick={(e) => { e.preventDefault(); addToCart(product); }}
                  className="w-full h-12 rounded-full border border-gray-100 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:bg-brand-charcoal hover:text-white hover:border-brand-charcoal transition-all duration-500 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
