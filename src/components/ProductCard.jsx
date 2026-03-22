"use client";
import React, { useState } from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {
  const [isHovered, setIsHovered] = useState(false);
  const productId = product._id || product.id;
  const isWishlisted = wishlist?.some(item => (item._id || item.id) === productId);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group relative flex flex-col bg-white p-2 md:p-4 hover:shadow-xl transition-shadow duration-300 rounded-lg border border-transparent hover:border-gray-50 opacity-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-brand-cream/30 mb-6 shadow-sm group-hover:shadow-md transition-all duration-300 rounded-md">
        <Link href={`/product/${productId}`} className="block h-full">
          <AnimatePresence mode="wait">
            <motion.img 
              layoutId={`product-image-${productId}`}
              key={isHovered ? 'hover' : 'normal'}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={isHovered ? (product.image2 || product.image) : product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </Link>
        
        {/* Wishlist Icon */}
        <button 
          onClick={() => toggleWishlist?.(product)}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-500 shadow-md transform ${
            isWishlisted ? 'bg-brand-gold text-white scale-110' : 'bg-white/90 text-brand-charcoal hover:bg-white hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={1.5} />
        </button>

        {/* Ribbons */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {product.isBestseller && (
             <span className="bg-brand-charcoal text-white text-[8px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-[0.2em] shadow-lg animate__animated animate__fadeInLeft">Bestseller</span>
           )}
           {product.isNew && (
             <span className="bg-brand-gold text-white text-[8px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-[0.2em] shadow-lg animate__animated animate__fadeInLeft animate__delay-1s">New Arrival</span>
           )}
        </div>

        {/* Quick View / Add Button Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <button 
                onClick={() => addToCart(product)}
                className="w-full bg-brand-charcoal text-white text-[9px] font-bold uppercase tracking-[0.3em] py-3 hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
            </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 flex-1 px-1 text-center">
        <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'fill-current' : ''}`} />
            ))}
            <span className="text-[9px] font-bold text-gray-400 ml-1">4.0</span>
        </div>
        <Link href={`/product/${productId}`}>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-charcoal line-clamp-1 group-hover:text-brand-gold transition-colors font-serif">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-col items-center">
           <div className="flex items-center gap-3">
              <span className="text-[16px] font-bold text-brand-charcoal tracking-wider">₹{product.price.toLocaleString()}</span>
              <span className="text-[12px] text-gray-300 line-through font-medium">₹{Math.round(product.price * 1.5).toLocaleString()}</span>
           </div>
           <span className="text-[9px] font-bold uppercase text-brand-gold tracking-[0.2em] mt-1 opacity-80">
             Limited Edition
           </span>
        </div>
      </div>
    </div>
  );
}
