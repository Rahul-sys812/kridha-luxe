"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import logoImg from '@/images/logo.png';

const logo = logoImg.src;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-brand-charcoal pt-32 pb-16 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Info */}
          <div className="space-y-10 animate__animated animate__fadeInLeft">
            <Link href="/" className="inline-block transition-transform duration-700 hover:scale-110">
              <img src={logo} alt="Kridha Luxe" className="h-20 md:h-28 w-auto object-contain mix-blend-multiply transition-all duration-500 hover:rotate-2" />
            </Link>
            <p className="text-gray-400 text-[11px] font-sans font-medium leading-relaxed max-w-xs uppercase tracking-[0.2em]">
              Crafting stories of elegance and timeless beauty through our curated collection of haute artificial jewellery.
            </p>
            <div className="flex items-center space-x-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all duration-500 hover:scale-110 group">
                  <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
                </a>
              ))}
            </div>
            
            <div className="pt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-brand-charcoal">Join Our Newsletter</h4>
              <div className="flex items-center max-w-xs border-b border-gray-200 pb-2 focus-within:border-brand-gold transition-colors">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-[11px] outline-none placeholder:text-gray-300" 
                />
                <button className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors pl-4">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Boutique */}
          <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-[11px] font-bold mb-10 uppercase tracking-[0.5em] text-brand-charcoal font-serif">
              The Boutique
            </h3>
            <ul className="space-y-5">
              {[
                { name: 'Home', href: '/' },
                { name: 'Collections', href: '/collections' },
                { name: 'The Gift Edit', href: '/gifting' },
                { name: 'Our Heritage', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-gold transition-colors text-[10px] font-bold uppercase tracking-[0.25em] relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-[11px] font-bold mb-10 uppercase tracking-[0.5em] text-brand-charcoal font-serif">
              Concierge
            </h3>
            <ul className="space-y-5">
              {[
                { name: 'Shipping Policy', href: '/shipping' },
                { name: 'Returns & Care', href: '/returns' },
                { name: 'Journal / FAQ', href: '/faq' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Privacy Boutique', href: '/privacy' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-gold transition-colors text-[10px] font-bold uppercase tracking-[0.25em] relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection */}
          <div className="space-y-10 animate__animated animate__fadeInRight" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-[11px] font-bold mb-10 uppercase tracking-[0.5em] text-brand-charcoal font-serif">
              Connect
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream group-hover:bg-brand-gold/10 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-charcoal transition-colors">Cyber Hub, New Delhi</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream group-hover:bg-brand-gold/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-charcoal transition-colors">+91 7906034247</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream group-hover:bg-brand-gold/10 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-charcoal transition-colors lowercase">kridhastore@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative">
          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} Kridha Luxe Boutiques. All rights reserved.
          </p>

          <button 
            onClick={scrollToTop}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
          </button>

          <div className="flex items-center space-x-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             {['VISA', 'AMEX', 'GPAY', 'APPLE PAY'].map((pay) => (
               <span key={pay} className="text-[8px] font-black tracking-[0.5em] text-brand-charcoal">{pay}</span>
             ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
