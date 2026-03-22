"use client";
import React from 'react';
import { ShieldCheck, ArrowRightLeft, Gem, Sparkles } from 'lucide-react';

export default function BrandStory() {
  const promises = [
    {
      icon: <Gem className="w-8 h-8 text-brand-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />,
      title: "Pure High Quality Silver",
      desc: "Each piece is crafted with the highest quality materials for enduring beauty."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />,
      title: "Anti-Tarnish Coating",
      desc: "Rhodium plating ensures your jewellery stays brilliant for years to come."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />,
      title: "6 Month Warranty",
      desc: "We stand behind the quality of every piece with a comprehensive warranty."
    },
    {
      icon: <ArrowRightLeft className="w-8 h-8 text-brand-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />,
      title: "30-Day Returns",
      desc: "Shop with confidence with our hassle-free return policy."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-b border-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-brand-gold block">
            The Kridha Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-charcoal uppercase tracking-tighter">
            Why Choose <span className="italic font-bold text-brand-gold">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {promises.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-6 group">
              <div className="relative w-20 h-20 bg-brand-cream/50 rounded-full group-hover:bg-brand-cream transition-colors duration-500 flex items-center justify-center">
                <div className="absolute inset-0 border border-brand-gold/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                {item.icon}
              </div>
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-[12px] text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
