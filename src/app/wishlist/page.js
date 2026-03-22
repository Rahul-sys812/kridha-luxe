"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useAuth();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-brand-cream/20 pt-16 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-brand-charcoal uppercase tracking-tighter">
            Your <span className="italic font-bold text-brand-gold">Wishlist</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
        </div>

        {wishlist && wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
            {wishlist.map(product => (
              <ProductCard 
                key={product.id || product._id} 
                product={product} 
                addToCart={addToCart} 
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white shadow-sm border border-gray-50 rounded-lg max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto bg-brand-cream/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-brand-charcoal">Your Wishlist is Empty</h2>
            <p className="text-gray-400 text-sm font-medium tracking-wide">Save your favorite luxury pieces here to easily find them later.</p>
            <div className="pt-4">
              <Link href="/collections" className="inline-block bg-brand-charcoal text-white text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-4 hover:bg-brand-gold transition-colors shadow-lg hover:shadow-xl">
                Discover Masterpieces
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
