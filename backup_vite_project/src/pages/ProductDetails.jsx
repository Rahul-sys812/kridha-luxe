import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pt-40">
        <h2 className="text-2xl font-display font-medium uppercase text-brand-charcoal">Product not found.</h2>
        <button 
          onClick={() => navigate('/collections')} 
          className="text-brand-orange text-[11px] font-bold uppercase tracking-widest hover:underline"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-orange transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" strokeWidth={1.2} />
          Back to collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">
          
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="aspect-[3/4] bg-brand-gray rounded-[48px] overflow-hidden shadow-2xl relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform transition-transform duration-[2s] group-hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-bold px-5 py-2 uppercase tracking-[0.2em] rounded-full shadow-sm">
                  New Arrival
                </span>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-12"
          >
            
            {/* Title & Price */}
            <div className="space-y-6 pb-12 border-b border-gray-50">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange">{product.category}</span>
                <h1 className="text-4xl md:text-6xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
                  {product.name}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-brand-charcoal">₹{product.price}</span>
                <div className="flex items-center text-yellow-400 space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest ml-3">42 Reviews</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
               <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Description</h3>
               <p className="text-gray-400 font-sans font-light leading-relaxed text-base md:text-lg">
                {product.description || 'Premium quality artificial jewellery crafted for the perfect everyday look. This piece features our signature high-shine finish and skin-friendly alloy components.'}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-8 pt-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-gray-100 rounded-full h-16 w-full sm:w-48 px-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-300 hover:text-brand-orange transition-colors font-bold text-xl"
                  >
                    —
                  </button>
                  <span className="font-bold text-lg text-brand-charcoal">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-300 hover:text-brand-orange transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 h-16 bg-brand-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-orange transition-all duration-500 shadow-xl hover:shadow-brand-orange/20 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bag
                </button>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
              <div className="flex items-start space-x-4 p-8 bg-brand-gray rounded-[32px] group hover:bg-white border border-transparent hover:border-gray-50 transition-all duration-500 shadow-sm">
                <Truck className="w-6 h-6 text-brand-orange" strokeWidth={1.2} />
                <div className="space-y-1">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-brand-charcoal">Free Shipping</h4>
                  <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest">Orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-8 bg-brand-gray rounded-[32px] group hover:bg-white border border-transparent hover:border-gray-50 transition-all duration-500 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-brand-orange" strokeWidth={1.2} />
                <div className="space-y-1">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-brand-charcoal">Secure Checkout</h4>
                  <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest">Verified Payment Gateway</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
