"use client";
import React from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence mode="wait">
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-cream/30">
              <h2 className="text-lg font-serif font-bold uppercase tracking-widest flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                Boutique Bag ({cartItems.length})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-brand-cream rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-brand-charcoal" />
              </button>
            </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6 animate__animated animate__fadeIn">
              <ShoppingBag className="w-20 h-20 opacity-10" />
              <p className="text-xs uppercase tracking-[0.2em] font-medium">Your boutique bag is empty.</p>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/collections');
                }}
                className="text-brand-gold text-[10px] font-bold uppercase tracking-widest border-b border-brand-gold pb-1 hover:tracking-[0.2em] transition-all"
              >
                Start Discovering
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item, index) => (
                <div key={item._id || item.id} className="flex gap-6 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative w-24 h-24 bg-brand-cream/30 rounded-sm overflow-hidden flex-shrink-0 border border-brand-cream">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif font-bold text-xs uppercase tracking-wider line-clamp-2 leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-gray-300 hover:text-brand-gold transition-colors ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-brand-gold font-bold text-[11px] mt-2 tracking-wider">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-100 rounded-sm bg-brand-cream/20">
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          className="px-2 py-1.5 hover:text-brand-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-[11px] font-bold text-brand-charcoal">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className="px-2 py-1.5 hover:text-brand-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 border-t border-gray-100 space-y-6 bg-brand-cream/10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Subtotal</span>
              <span className="text-lg font-serif font-bold tracking-wider text-brand-charcoal">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest font-medium">Shipping & taxes calculated at checkout</p>
            <button 
              onClick={handleCheckout}
              className="w-full luxury-btn animate__animated animate__pulse animate__infinite animate__slow"
            >
              PROCEED TO SECURE CHECKOUT
            </button>
          </div>
        )}
      </motion.div>
      </>
      )}
    </AnimatePresence>
  );
}
