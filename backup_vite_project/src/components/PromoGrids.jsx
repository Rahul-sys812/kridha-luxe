import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PromoGrids() {
  return (
    <section className="py-24 bg-brand-gray/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex justify-center">
          
          {/* Shop for Her */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative h-[600px] w-full max-w-5xl rounded-[50px] overflow-hidden bg-white shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" 
              alt="Shop for Her" 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent"></div>
            <div className="absolute bottom-16 left-16 space-y-6">
              <span className="text-[14px] font-bold uppercase tracking-[0.5em] text-white/80">The Muse Collection</span>
              <h3 className="text-5xl md:text-7xl font-display text-white uppercase tracking-tighter leading-none">
                Elevate <span className="italic font-light text-brand-orange">Her</span> Style
              </h3>
              <p className="text-white/60 font-sans text-sm tracking-widest max-w-md">Discover the art of artificial elegance with our most coveted seasonal selections.</p>
              <Link to="/collections?gender=her" className="inline-block bg-brand-orange text-white px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-charcoal transition-all transform hover:-translate-y-2 shadow-2xl">
                Explore The Edit
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
