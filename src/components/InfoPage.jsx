"use client";
import React from 'react';
import Breadcrumb from './Breadcrumb';

export default function InfoPage({ title, breadcrumbLabel, children }) {
  return (
    <div className="bg-brand-cream/10 min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-6xl">
        <div className="space-y-20 animate__animated animate__fadeIn">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel || title }]} />

          {/* Header Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold animate__animated animate__fadeInDown">
              Concierge Services
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-none">
              {title}
            </h1>
            <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto"></div>
          </div>
          
          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-4 space-y-8 animate__animated animate__fadeInLeft">
              <div className="p-10 bg-white border border-brand-cream rounded-sm space-y-8 sticky top-32 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal border-l-2 border-brand-gold pl-4 italic">Boutique Assistance</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-loose">
                  Our boutique concierge team is at your immediate availability to assist with any inquiries regarding our collections, bespoke requests, or the care of your Kridha Luxe pieces.
                </p>
                <div className="space-y-5 pt-6 border-t border-brand-cream">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Live Concierge</span>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[11px] font-bold text-brand-gold tracking-widest">+91 7906034247</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">Available 10:00 — 20:30 IST</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 animate__animated animate__fadeInRight">
              <div className="luxury-prose">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .luxury-prose h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1A1A1A;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .luxury-prose p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          line-height: 2;
          color: #666;
          margin-bottom: 1.5rem;
        }
        .luxury-prose ul {
          list-style: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #666;
        }
        .luxury-prose li {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
