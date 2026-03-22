"use client";
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function StoreLocator() {
  return (
    <section className="bg-brand-cream/10 py-32 overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        <div className="text-center mb-20 space-y-6 animate__animated animate__fadeIn">
          <span className="uppercase text-brand-gold tracking-[0.5em] font-bold text-[10px]">
            The Experience
          </span>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-brand-charcoal uppercase tracking-tighter">
            Our <span className="italic font-bold text-brand-gold">Boutique</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
        </div>

        <div className="relative h-[550px] lg:h-[650px] overflow-hidden group border border-brand-cream shadow-2xl rounded-sm animate__animated animate__zoomIn">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.91924553535!2d77.12658405!3d28.663185599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1654152861234!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Kridha Luxe Boutique Location"
            className="absolute inset-0 grayscale contrast-125 brightness-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-[2.5s] ease-out"
          ></iframe>
          
          <div className="absolute bottom-10 left-10 md:w-[380px] bg-white/95 backdrop-blur-md p-10 rounded-sm shadow-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 space-y-8 animate__animated animate__fadeInUp group-hover:animate-none">
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-bold text-brand-charcoal uppercase tracking-wider">Kridha Flagship</h3>
              <p className="text-gray-400 text-[11px] font-medium leading-relaxed tracking-widest uppercase">
                Cyber Hub, Galleria Market<br/>
                Ground Floor, Unit 12<br/>
                New Delhi, India 110001
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-brand-cream pt-6">
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">At Your Service</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">10:00 — 20:30</span>
            </div>

            <button className="w-full luxury-btn flex items-center justify-center gap-3">
              <Navigation className="w-3.5 h-3.5" /> GET DIRECTIONS
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
