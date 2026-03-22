"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "Is your jewellery really anti-tarnish?",
      a: "Yes! Every piece from Kridha Luxe is treated with a premium anti-tarnish coating to ensure it retains its incredible brilliance, even with everyday wear."
    },
    {
      q: "Do you charge any making fees?",
      a: "Absolutely not. We believe luxury should be transparent. You only pay for the materials and design, with strictly 0% making charges on all our silver collections."
    },
    {
      q: "How does the warranty work?",
      a: "We provide a comprehensive 6-month warranty covering any manufacturing defects. Simply bring it back or contact our concierge, and we will replace or repair it free of charge."
    },
    {
      q: "What is your return policy?",
      a: "We offer a hassle-free 30-day return policy. If you're not completely mesmerized by your piece, you can return it for a full refund or exchange."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-32 lg:self-start">
            <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-brand-gold block">
              Inquiries
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal uppercase tracking-tighter">
              Common <span className="italic font-bold text-brand-gold">Questions</span>
            </h2>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
              Find answers to Frequently Asked Questions. If you need further assistance, our boutique concierge is always available.
            </p>
          </div>

          <div className="w-full lg:w-2/3 space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border border-gray-50 rounded-lg p-6 md:p-8 cursor-pointer transition-all duration-300 ${open === idx ? 'bg-brand-cream/20 shadow-sm border-brand-gold/20' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setOpen(open === idx ? -1 : idx)}
              >
                <div className="flex justify-between items-center group">
                  <h3 className={`text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] transition-colors ${open === idx ? 'text-brand-gold' : 'text-brand-charcoal group-hover:text-brand-gold'}`}>
                    {faq.q}
                  </h3>
                  {open === idx ? (
                    <ChevronUp className="w-5 h-5 text-brand-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-gold shrink-0 transition-colors" />
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${open === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
