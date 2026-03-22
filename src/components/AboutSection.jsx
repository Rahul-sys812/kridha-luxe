"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import aboutImg from '@/images/hero-section.jpeg'; // Reusing hero image or another luxury image placeholder

export default function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden luxury-border">
              <img 
                src={aboutImg.src} 
                alt="About Kridha Luxe" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[3s] scale-105 hover:scale-100"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-cream -z-10 hidden md:block"></div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8 animate__animated animate__fadeInRight">
            <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-brand-gold block">
              Our Heritage
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-charcoal uppercase tracking-tighter leading-tight">
              A Legacy of <span className="italic font-bold text-brand-gold">Craftsmanship</span>
            </h2>
            <p className="text-[14px] text-brand-charcoal font-medium leading-relaxed uppercase tracking-wider">
              Kridha Luxe was born from a passion for bringing high-end, artisanal jewellery to the modern consumer without the exorbitant marking charges. We believe elegance is an everyday affair.
            </p>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              Every piece in our collection is meticulously crafted by master artisans using premium 925 sterling silver, dipped in rhodium or 18k gold to ensure it lasts a lifetime. Whether you are looking for a statement necklace or subtle everyday earrings, our boutique is designed to inspire your personal style.
            </p>
            <div className="pt-6">
              <Link 
                href="/about"
                className="inline-flex items-center gap-3 text-brand-charcoal font-bold uppercase tracking-[0.3em] pb-3 border-b-2 border-brand-charcoal hover:text-brand-gold hover:border-brand-gold transition-all group"
              >
                Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
