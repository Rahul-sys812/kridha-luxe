import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gifting() {
  const headerRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gift-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 85%",
        }
      });
    }, productsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      
      {/* Hero Section */}
      <section ref={headerRef} className="container mx-auto px-4 md:px-6 lg:px-12 text-center mb-28">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-orange/5 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-brand-orange" strokeWidth={1.2} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
            Gifts <span className="italic font-light">that sparkle</span>
          </h1>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-sans font-light leading-relaxed">
            Beautifully curated collections or personalized surprises. Discover the perfect gesture for the people who make life beautiful.
          </p>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto mt-10"></div>
        </motion.div>
      </section>

      {/* Gifting Products Showcase */}
      <section ref={productsRef} className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {[1, 2, 3].map((item) => (
            <div key={item} className="gift-card group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden rounded-[32px] bg-brand-gray mb-8 group-hover:shadow-2xl transition-all duration-700 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1606760227146-1c541dd317aa' : item === 2 ? '1549465220-1a8b9238cd48' : '1589810620703-a309e74d12c1'}?auto=format&fit=crop&q=80&w=800`} 
                  alt="Gift Box" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">Curated Set</span>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <h3 className="text-2xl font-display font-medium text-brand-charcoal uppercase tracking-tight">Luxury Bundle {item}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans font-light line-clamp-2">Our signature collection presented in a premium velvet-lined keepsake box.</p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Starting from</span>
                    <span className="text-xl font-bold text-brand-charcoal">₹1,999</span>
                  </div>
                  <button className="h-12 w-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-500 shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
