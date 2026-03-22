"use client";
import React, { useEffect, useRef } from 'react';
import { Gift, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import giftMuse from '@/images/Autumn Earrings for Women Maple Leaf Earrings/1.png';
import giftKeepsake from '@/images/Cubic Zirconia Bow Earrings/1.png';
import giftCelestial from '@/images/Western Korean Bow Zircon Stone Stud Earrings/1.png';

export default function Gifting() {
  return (
    <div className="bg-brand-cream/10 min-h-screen pt-40 pb-24 overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 text-center mb-32 animate__animated animate__fadeIn">
        <div className="space-y-8">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border border-brand-cream animate__animated animate__zoomIn">
              <Gift className="w-8 h-8 text-brand-gold" strokeWidth={1} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-none animate__animated animate__fadeInDown">
            Gifts <br /> <span className="italic font-bold text-brand-gold">That Sparkle</span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            Beautifully curated collections or personalized surprises. <br />
            Discover the perfect gesture for the people who make life beautiful.
          </p>
          <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto mt-12"></div>
        </div>
      </section>

      {/* Gifting Products Showcase */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {[
            { id: 1, title: 'The Muse Bundle', price: '1,999', image: giftMuse },
            { id: 2, title: 'Artisanal Keepsake', price: '2,499', image: giftKeepsake },
            { id: 3, title: 'Celestial Selection', price: '3,299', image: giftCelestial }
          ].map((item, idx) => (
            <div 
                key={item.id} 
                className="group cursor-pointer animate__animated animate__fadeInUp bg-white p-4 luxury-border"
                style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-brand-cream/30 mb-8 rounded-sm shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={item.image.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 bg-brand-gold text-white text-[8px] font-bold px-4 py-2 uppercase tracking-[0.2em] shadow-lg">
                  Curated Set
                </div>
              </div>
              
              <div className="space-y-4 px-2 text-center">
                <h3 className="text-xl font-serif font-bold text-brand-charcoal uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] leading-relaxed line-clamp-2">Our signature collection presented in a premium velvet-lined keepsake box.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-brand-cream mt-6">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-gray-300 font-bold">Investment</span>
                    <span className="text-lg font-bold text-brand-charcoal tracking-widest font-sans">₹{item.price}</span>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-brand-cream flex items-center justify-center hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-500 group/btn">
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
