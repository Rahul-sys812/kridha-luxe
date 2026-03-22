import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
const logo = "/images/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-brand-charcoal pt-32 pb-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Info */}
          <div className="space-y-10">
            <Link to="/" className="inline-block transition-transform duration-700 hover:scale-110">
              <img src={logo} alt="Kridha Luxe" className="h-24 md:h-32 w-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="text-gray-400 text-sm font-sans font-light leading-relaxed max-w-xs uppercase tracking-wider">
              Crafting stories of elegance and timeless beauty through our curated collection of haute artificial jewellery.
            </p>
            <div className="flex items-center space-x-8">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all duration-500 hover:scale-110 group">
                <Facebook className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all duration-500 hover:scale-110 group">
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all duration-500 hover:scale-110 group">
                <Twitter className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-[12px] font-bold mb-10 uppercase tracking-[0.4em] text-brand-charcoal font-display">
              The Boutique
            </h3>
            <ul className="space-y-5">
              <li><Link to="/" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Home</Link></li>
              <li><Link to="/collections" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Collections</Link></li>
              <li><Link to="/gifting" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">The Gift Edit</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Our Heritage</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Contact</Link></li>
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h3 className="text-[12px] font-bold mb-10 uppercase tracking-[0.4em] text-brand-charcoal font-display">
              Concierge
            </h3>
            <ul className="space-y-5">
              <li><Link to="/shipping" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Returns & Care</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Journal / FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">Privacy Boutique</Link></li>
            </ul>
          </div>

          {/* Connection */}
          <div className="space-y-10">
            <h3 className="text-[12px] font-bold mb-10 uppercase tracking-[0.4em] text-brand-charcoal font-display">
              Connect
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-gray group-hover:bg-brand-orange/10 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                </div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Cyber Hub, New Delhi</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-gray group-hover:bg-brand-orange/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                </div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">+91 7906034247</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-gray group-hover:bg-brand-orange/10 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-orange" />
                </div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest lowercase tracking-widest">kridhastore@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Kridha Luxe Boutiques. All rights reserved.
          </p>

          <button 
            onClick={scrollToTop}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full border border-gray-50 shadow-sm hover:shadow-md transition-all group"
          >
            <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-brand-orange transition-colors" strokeWidth={1.5} />
          </button>

          <div className="flex items-center space-x-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-[9px] font-black tracking-[0.4em] text-brand-charcoal">VISA</span>
             <span className="text-[9px] font-black tracking-[0.4em] text-brand-charcoal">AMEX</span>
             <span className="text-[9px] font-black tracking-[0.4em] text-brand-charcoal">GPAY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

