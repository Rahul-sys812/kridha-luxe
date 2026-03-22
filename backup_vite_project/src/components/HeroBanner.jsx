import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-[#fafafa]">
      {/* Background with subtle animation */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Jewelry Banner" 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-brand-charcoal/10"></div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full"
      />

      {/* Content Overlay */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.5em] text-brand-orange drop-shadow-sm">
              The 2026 Boutique Collection
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-[1.1]">
               Fine <span className="italic font-light">Elegance</span> <br />
               Every Day
            </h1>
            <p className="text-lg md:text-xl text-brand-charcoal/80 font-sans font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              Discover artisanal silver and diamond pieces designed to bring out your everyday charm. Handcrafted for the modern muse.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/collections"
              className="group relative h-16 px-12 bg-brand-orange text-white rounded-full flex items-center justify-center gap-4 hover:shadow-[0_20px_40px_-10px_rgba(242,101,34,0.4)] transition-all duration-700 overflow-hidden"
            >
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">Explore Collections</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-brand-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            </Link>

            <button className="h-16 px-10 border border-brand-charcoal/20 backdrop-blur-md rounded-full flex items-center justify-center gap-4 text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-700 group">
              <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">The Film</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Stats/Badges (Giva Style) */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
         <div className="container mx-auto px-4 md:px-6 lg:px-12 flex justify-center gap-10 md:gap-20">
            {[
              { label: 'Artisanal', value: 'Crafted' },
              { label: '0% Making', value: 'Charges' },
              { label: 'Life-time', value: 'Plating' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + (i * 0.2) }}
                className="text-center group cursor-default"
              >
                <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-brand-orange transition-colors">{stat.label}</span>
                <span className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal">{stat.value}</span>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}

