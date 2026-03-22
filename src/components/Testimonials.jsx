"use client";
import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Ananya Sharma",
      role: "Verified Buyer",
      text: "The quality of the silver is simply unmatched. The anti-tarnish finish really works, and the packaging was so luxurious!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Verified Buyer",
      text: "I bought a necklace for my anniversary, and it looks like a high-end designer piece. The customer service is brilliant.",
      rating: 5
    },
    {
      name: "Sneha Reddy",
      role: "Verified Buyer",
      text: "Zero making charges is such a game changer. I've completely switched to Kridha Luxe for my everyday office wear jewelry.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-brand-cream/30 border-t border-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-brand-gold block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal uppercase tracking-tighter">
            Words of <span className="italic font-bold text-brand-gold">Adoration</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-500 relative group border border-transparent hover:border-brand-gold/20">
              <Quote className="w-10 h-10 text-brand-cream absolute top-6 right-6 group-hover:text-brand-gold/10 transition-colors" />
              <div className="flex items-center gap-1 text-brand-gold mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[13px] text-brand-charcoal font-medium leading-relaxed italic mb-8 min-h-[80px]">
                "{review.text}"
              </p>
              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">{review.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
