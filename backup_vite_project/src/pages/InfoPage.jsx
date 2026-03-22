import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InfoPage({ title, children }) {
  // Always scroll to top when mounting a text-heavy info page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-20"
        >
          {/* Header Section */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-orange">
              Concierge Services
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
              {title}
            </h1>
            <div className="w-12 h-[1px] bg-brand-orange mx-auto opacity-50"></div>
          </div>
          
          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-4 space-y-8">
              <div className="p-10 bg-brand-gray rounded-[48px] space-y-6 sticky top-40">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Need Assistance?</h3>
                <p className="text-[11px] text-gray-400 font-light uppercase tracking-widest leading-relaxed">
                  Our boutique concierge team is available to assist you with any questions regarding your selection, shipping, or care for your Kridha Luxe pieces.
                </p>
                <div className="space-y-4 pt-4 border-t border-gray-100">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Live Concierge</span>
                   </div>
                   <p className="text-[10px] text-gray-400 uppercase tracking-widest">+91 7906034247</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-xl prose-gray max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-brand-charcoal prose-p:text-gray-400 prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-li:text-gray-400 prose-li:font-light prose-strong:text-brand-charcoal prose-strong:font-bold">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

