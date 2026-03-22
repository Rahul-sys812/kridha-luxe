"use client";
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import heroImage from '@/images/hero-section.jpeg';
import MagneticButton from './MagneticButton';

export default function HeroBanner() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Staggered Text Reveal
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(textRef1.current, 
        { y: '100%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.2, delay: 0.2 }
      ).fromTo(textRef2.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2 },
        "-=0.9" // Staggered overlap
      );

    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-[500px] md:h-[600px] lg:h-[800px] flex flex-col justify-center overflow-hidden bg-brand-cream">
      {/* Background */}
      <div className="absolute inset-0 animate__animated animate__zoomIn animate__slower overflow-hidden">
        <img 
          src={heroImage.src}
          alt="Luxury Jewelry Banner" 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05] transition-transform duration-10000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-brand-charcoal/5"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Content Overlay — grows to fill available space */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 md:px-6 lg:px-12 py-12">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-brand-charcoal uppercase tracking-tighter leading-[0.9] drop-shadow-sm flex flex-col items-center">
                <span className="overflow-hidden inline-block pb-2">
                   <span ref={textRef1} className="inline-block transform translate-y-full opacity-0">Timeless</span>
                </span>
                <span className="overflow-hidden inline-block">
                   <span ref={textRef2} className="italic font-bold text-brand-gold inline-block transform translate-y-full opacity-0">Splendor</span>
                </span>
              </h1>
            </div>

            {/* Action Buttons with Magnetic Hover */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full animate__animated animate__fadeInUp animate__delay-1s">
              <MagneticButton>
                <Link 
                  href="/collections"
                  className="group relative h-14 md:h-16 px-8 md:px-12 bg-brand-charcoal text-white overflow-hidden transition-all duration-700 flex items-center justify-center w-full sm:w-auto min-w-[200px]"
                >
                  <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Shop Collection</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <button className="h-14 md:h-16 px-8 md:px-10 border border-brand-charcoal/20 backdrop-blur-sm flex items-center justify-center gap-3 md:gap-4 text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-700 group text-[10px] font-bold w-full sm:w-auto min-w-[160px]">
                  <div className="w-9 h-9 rounded-full border border-brand-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500 shrink-0">
                    <Play className="w-3 h-3 text-brand-gold group-hover:text-white fill-current ml-0.5" />
                  </div>
                  <span className="uppercase tracking-[0.3em] whitespace-nowrap">The Film</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats — sits naturally at the bottom, never overlaps */}
      <div className="relative z-10 pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 flex justify-center gap-8 md:gap-24">
          {[
            { label: 'Artisanal', value: 'Crafted' },
            { label: '0% Making', value: 'Charges' },
            { label: 'Anti-Tarnish', value: 'Finish' }
          ].map((stat, i) => (
            <div 
              key={i}
              className="text-center group cursor-default animate__animated animate__fadeInUp"
              style={{ animationDelay: `${2.5 + (i * 0.2)}s` }}
            >
              <span className="block text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-brand-gold transition-colors">{stat.label}</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal mt-1">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
