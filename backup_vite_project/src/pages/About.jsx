import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-orange">
              Our Heritage
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
              The Essence of <br /> Kridha Luxe
            </h1>
            <div className="w-12 h-[1px] bg-brand-orange opacity-50"></div>
            
            <p className="text-lg text-gray-400 font-sans font-light leading-relaxed max-w-lg">
              Born from a passion for refined aesthetics, Kridha Luxe curates accessories that don't just complement your style—they define it. We believe in the power of fine details and the poetry of modern craftsmanship.
            </p>

            <div className="grid grid-cols-2 gap-10 pt-8 border-t border-gray-50">
              <div className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Artisanal Curation</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Hand-selected pieces from the world's finest artisans.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Luxe Experience</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">A concierge-level journey from collection to delivery.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-brand-gray rounded-[60px] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" 
                 alt="Luxury Jewelry" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
               />
            </div>
            {/* Decorative Card */}
            <div className="absolute -bottom-10 -left-10 bg-brand-charcoal text-white p-10 rounded-[32px] shadow-2xl space-y-4 max-w-xs hidden md:block">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] italic text-brand-orange">"Elegance is not being noticed, but being remembered."</h4>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Kridha Luxe Philosophy</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
