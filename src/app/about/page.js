"use client";
import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '@/images/Mystinium Elegant Pearl and Pink Tulip Stud Earrings/1.png';

export default function About() {
  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate__animated animate__fadeInLeft">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">
              Our Heritage
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-[0.9]">
              The Essence of <br /> <span className="italic font-bold text-brand-gold">Kridha Luxe</span>
            </h1>
            <div className="w-16 h-[1px] bg-brand-gold/40"></div>
            
            <p className="text-[13px] md:text-[15px] text-gray-500 font-sans font-medium uppercase tracking-[0.15em] leading-relaxed max-w-lg">
              Born from a passion for refined aesthetics, Kridha Luxe curates accessories that don't just complement your style—they define it. We believe in the power of fine details and the poetry of modern craftsmanship.
            </p>

            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-brand-cream">
              <div className="space-y-3 animate__animated animate__fadeInUp animate__delay-1s">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Artisanal Curation</h3>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-loose">Hand-selected pieces from the world's most renowned artisans.</p>
              </div>
              <div className="space-y-3 animate__animated animate__fadeInUp animate__delay-1s">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Luxe Experience</h3>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-loose">A concierge-level journey from collection discovery to doorstep delivery.</p>
              </div>
            </div>
          </div>

          <div className="relative animate__animated animate__zoomIn">
            <div className="aspect-[4/5] bg-white rounded-sm overflow-hidden p-3 shadow-2xl border border-brand-cream">
               <img 
                 src={aboutImage.src} 
                 alt="Luxury Jewelry" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
               />
            </div>
            {/* Decorative Card */}
            <div className="absolute -bottom-10 -right-10 bg-brand-charcoal text-white p-10 rounded-sm shadow-2xl space-y-4 max-w-xs hidden md:block animate__animated animate__fadeInRight animate__delay-1s">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] italic text-brand-gold leading-relaxed">"Elegance is not being noticed, but being remembered."</h4>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">— The Kridha Philosophy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
