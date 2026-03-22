import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function StoreLocator() {
  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        <div className="text-center mb-24 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="uppercase text-brand-orange tracking-[0.3em] font-bold text-[10px]"
          >
            Visit Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter"
          >
            Our <span className="italic font-light">Boutique</span>
          </motion.h2>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto mt-10"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[550px] lg:h-[650px] rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 group"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.91924553535!2d77.12658405!3d28.663185599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1654152861234!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Kridha Luxe Location"
            className="absolute inset-0 grayscale contrast-110 group-hover:grayscale-0 transition-all duration-[2s] ease-out"
          ></iframe>
          
          <div className="absolute bottom-10 left-10 right-10 md:right-auto md:w-[400px] bg-white/90 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-medium text-brand-charcoal uppercase tracking-tight">Kridha Flagship</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">Cyber Hub, Galleria Market<br/>Ground Floor, Unit 12<br/>New Delhi, India 110001</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Store Open</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">10:00 AM — 08:30 PM</span>
            </div>

            <button className="w-full py-4 bg-brand-charcoal text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-orange transition-all duration-500">
              Get Directions
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
