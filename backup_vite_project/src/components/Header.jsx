import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, MapPin, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFilter } from '../context/FilterContext';
const logo = "/images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userInfo, logout, wishlist } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery, setActiveCategory } = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveCategory('All'); // Reset category when searching globally
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery(''); // Clear search when picking a category
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const categories = [
    'Rings', 'Pendants', 'Earrings', 'Bracelets', 'Necklaces', 'Nose Pins', 'Silver Coins', 'Gifts'
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-brand-charcoal text-white py-2 text-center overflow-hidden">
        <motion.p 
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className="text-[12px] font-bold uppercase tracking-[0.3em] whitespace-nowrap"
        >
          ✨ Limited Edition: Get 0% Making Charges on Silver Jewellery | Complimentary Boutique Delivery on all orders above ₹999 ✨
        </motion.p>
      </div>

      <header className={`transition-all duration-500 bg-white border-b border-gray-100 ${scrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          {/* Main Header Row */}
          <div className="flex items-center justify-between gap-8">
            
            {/* Left: Logo & Store Locator */}
            <div className="flex items-center gap-6 flex-1 justify-start">
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="Kridha Luxe" className="h-14 md:h-20 w-auto object-contain" />
              </Link>
              <div className="hidden xl:flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors cursor-pointer group">
                <MapPin className="w-4 h-4" />
                <div className="text-[9px] font-bold uppercase tracking-widest leading-tight">
                  <span className="block text-gray-300">Deliver to</span>
                  Update Pincode
                </div>
              </div>
            </div>

            {/* Center: Large Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search 'Diamond Rings'..." 
                  className="w-full bg-brand-gray/50 border border-transparent focus:border-brand-orange/20 focus:bg-white px-14 py-3 rounded-full text-xs font-sans font-medium text-brand-charcoal transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-orange/5"
                />
              </div>
            </div>

            {/* Right: Icons with Labels */}
            <div className="flex items-center gap-4 md:gap-8 flex-1 justify-end">
              <Link to="/stores" className="hidden sm:flex flex-col items-center gap-1 group text-brand-charcoal hover:text-brand-orange transition-all">
                <Store className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Stores</span>
              </Link>

              <div className="relative group/user flex flex-col items-center gap-1 cursor-pointer">
                <Link to={userInfo ? "/profile" : "/login"} className="flex flex-col items-center gap-1 group text-brand-charcoal hover:text-brand-orange transition-all">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{userInfo ? userInfo.name.split(' ')[0] : 'Account'}</span>
                </Link>
                {userInfo && (
                  <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300">
                    <div className="bg-white shadow-2xl rounded-2xl border border-gray-50 p-4 w-40 text-left space-y-3">
                      <Link to="/profile" className="block text-[9px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-orange">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left text-[9px] font-bold uppercase tracking-widest text-brand-orange">Logout</button>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/wishlist" className="flex flex-col items-center gap-1 group text-brand-charcoal hover:text-brand-orange transition-all relative">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Wishlist</span>
                {wishlist?.length > 0 && <span className="absolute -top-1 right-0 bg-brand-orange text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlist.length}</span>}
              </Link>

              <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 group text-brand-charcoal hover:text-brand-orange transition-all relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                {cartCount > 0 && <span className="absolute -top-1 right-0 bg-brand-charcoal text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>

              <button className="lg:hidden text-brand-charcoal" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Row 2: Category Menu (Desktop) */}
          <div className="hidden lg:flex items-center justify-center gap-10 mt-6 pt-4 border-t border-gray-50">
            {categories.map((cat) => (
              <NavLink 
                key={cat} 
                to={`/collections?category=${cat}`}
                onClick={() => handleCategoryClick(cat)}
                className={({ isActive }) => 
                  `text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-orange relative group pb-2 ${isActive ? 'text-brand-orange' : 'text-brand-charcoal'}`
                }
              >
                {cat}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 bg-white z-[60] lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              <div className="flex items-center justify-between">
                <img src={logo} alt="Kridha Luxe" className="h-10 w-auto" />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-brand-gray rounded-full"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                 {categories.map((cat) => (
                   <Link key={cat} to={`/collections?category=${cat}`} onClick={() => handleCategoryClick(cat)} className="block text-2xl font-display uppercase tracking-tighter text-brand-charcoal">{cat}</Link>
                 ))}
                 <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">Login / Register</Link>
                    <Link to="/stores" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">Our Stores</Link>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
