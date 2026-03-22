"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import promoHer from '@/images/Jon Richard Gold Plated Brushed and Pave Flower Stud Earrings/1.png';
import promoArrivals from '@/images/Half Pearl Blooms/1.png';

export default function PromoGrids() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Shop for Her - Main Promo */}
          <div 
            className="group relative h-[500px] w-full bg-brand-cream border border-gray-50 overflow-hidden animate__animated animate__fadeInLeft"
          >
            <Image 
              src={promoHer} 
              alt="Shop for Her" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[4s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/70 block">The Muse Edit</span>
              <h3 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-[0.9]">
                Elevate <span className="italic font-bold text-brand-gold">Her</span> Style
              </h3>
              <p className="text-white/50 font-sans text-[10px] uppercase tracking-widest max-w-xs transition-all group-hover:text-white/80">Discover artisanal elegance in our most coveted seasonal selections.</p>
              <Link href="/collections" className="inline-flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white pb-2 hover:text-brand-gold hover:border-brand-gold hover:tracking-[0.4em] transition-all duration-500 mt-4 group/link">
                Explore The Edit <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* New Arrivals - Secondary Promo */}
          <div 
            className="group relative h-[500px] w-full bg-brand-cream border border-gray-50 overflow-hidden animate__animated animate__fadeInRight"
          >
            <Image 
              src={promoArrivals} 
              alt="New Arrivals" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[4s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/70 block">New Arrivals</span>
              <h3 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-[0.9]">
                Pure <span className="italic font-bold text-brand-gold">Brilliance</span>
              </h3>
              <p className="text-white/50 font-sans text-[10px] uppercase tracking-widest max-w-xs transition-all group-hover:text-white/80">Be the first to wear our latest handcrafted silver masterpieces.</p>
              <Link href="/collections?isNew=true" className="inline-flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white pb-2 hover:text-brand-gold hover:border-brand-gold hover:tracking-[0.4em] transition-all duration-500 mt-4 group/link">
                View Arrivals <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
