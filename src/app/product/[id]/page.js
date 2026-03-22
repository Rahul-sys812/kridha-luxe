"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setProduct(data);
          setMainImage(data.image || '');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="aspect-[3/4] skeleton-silver rounded-sm" />
            <div className="space-y-6 pt-10">
              <div className="h-4 skeleton-silver rounded w-1/4" />
              <div className="h-12 skeleton-silver rounded w-3/4" />
              <div className="h-8 skeleton-silver rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 pt-40 px-6">
        <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center animate__animated animate__pulse animate__infinite">
          <ShoppingBag className="w-10 h-10 text-brand-gold opacity-30" />
        </div>
        <h2 className="text-xl font-serif font-bold uppercase tracking-widest text-brand-charcoal text-center">Boutique item not found</h2>
        <button 
          onClick={() => router.push('/collections')} 
          className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] border-b border-brand-gold pb-1 hover:tracking-[0.5em] transition-all"
        >
          Return to Gallery
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/collections' },
          { label: product.name }
        ]} />
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-brand-gold transition-all mb-12 group animate__animated animate__fadeInLeft"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-3 transform group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Product Media */}
          <div className="space-y-8 animate__animated animate__fadeIn">
            <div className="aspect-[3/4] bg-brand-cream/20 rounded-sm overflow-hidden shadow-2xl relative group border border-brand-cream p-2">
              <AnimatePresence mode="wait">
                <motion.img 
                  layoutId={mainImage === product.image ? `product-image-${id}` : undefined}
                  key={mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {product.isNew && (
                <span className="absolute top-8 left-8 bg-brand-gold text-white text-[9px] font-bold px-4 py-2 uppercase tracking-[0.3em] shadow-lg animate__animated animate__fadeInLeft">
                  New Arrival
                </span>
              )}

              <button className="absolute top-8 right-8 p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-xl">
                <Heart className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Thumbnail Gallery (if multiple images exists) */}
            {(product.image2 || product.image) && (
               <div className="flex gap-4 animate__animated animate__fadeInUp animate__delay-1s">
                  {[product.image, product.image2].filter(Boolean).map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`w-24 h-24 bg-brand-cream/30 border-2 rounded-sm cursor-pointer overflow-hidden transition-all duration-500 ${mainImage === img ? 'border-brand-gold shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img src={img} alt={`${product.name} view ${idx+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-12 animate__animated animate__fadeInUp">
            
            {/* Header: Name, Price, Category */}
            <div className="space-y-6 pb-10 border-b border-brand-cream">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold block">{product.category}</span>
                <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-charcoal uppercase tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-brand-charcoal tracking-wider font-sans">₹{product.price.toLocaleString()}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mt-1">Free Pan-India Delivery</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center text-yellow-500 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Boutique Rating • 4.9</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal border-l-2 border-brand-gold pl-4">Product Details</h3>
               <p className="text-gray-500 font-sans font-medium leading-relaxed text-sm md:text-base uppercase tracking-widest">
                {product.description || 'Pinterest Inspired, Anti-Tarnish Finish, 18k Gold Plated, Stainless Steel. This exquisite piece is designed for the modern woman who values timeless elegance and artisanal craftsmanship.'}
              </p>
            </div>

            {/* Configuration & Actions */}
            <div className="space-y-10 pt-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8">
                {/* Quantity Controller */}
                <div className="flex items-center justify-between border border-brand-cream rounded-sm h-14 w-full sm:w-44 px-4 bg-brand-cream/5">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm text-brand-charcoal tracking-widest">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Main Action Button */}
                <button 
                  onClick={handleAddToCart}
                  className="luxury-btn flex-1 h-14 flex items-center justify-center gap-4 group"
                >
                  <ShoppingBag className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                  ACQUIRE THIS PIECE
                </button>
              </div>

              {/* USP Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-6 p-6 bg-brand-cream/10 border border-brand-cream rounded-sm group hover:border-brand-gold/30 transition-all duration-700">
                    <Truck className="w-5 h-5 text-brand-gold" />
                    <div>
                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-charcoal">Express Shipping</h4>
                        <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">2-4 Business Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-brand-cream/10 border border-brand-cream rounded-sm group hover:border-brand-gold/30 transition-all duration-700">
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                    <div>
                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-charcoal">Luxe Guarantee</h4>
                        <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">Authentic Craftsmanship</p>
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
