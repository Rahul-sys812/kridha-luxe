"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, MapPin, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFilter } from '../context/FilterContext';
import { menuCategoryNames } from '../data/categories';
import logoImg from '@/images/logo.png';

const logo = logoImg.src;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { userInfo, logout, wishlist } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery, setActiveCategory } = useFilter();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveCategory('All');
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 animate__animated animate__fadeInDown">
      {/* Announcement Bar */}
      <div className="bg-brand-charcoal text-white py-2 overflow-hidden border-b border-white/10 relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap"
        >
          <p className="text-[10px] md:text-[12px] font-light italic uppercase tracking-[0.3em] px-4">
            ✨ Limited Edition: Get 0% Making Charges on Silver Jewellery | Complimentary Boutique Delivery on all orders above ₹999 ✨
          </p>
          <p className="text-[10px] md:text-[12px] font-light italic uppercase tracking-[0.3em] px-4">
            ✨ Limited Edition: Get 0% Making Charges on Silver Jewellery | Complimentary Boutique Delivery on all orders above ₹999 ✨
          </p>
          <p className="text-[10px] md:text-[12px] font-light italic uppercase tracking-[0.3em] px-4">
            ✨ Limited Edition: Get 0% Making Charges on Silver Jewellery | Complimentary Boutique Delivery on all orders above ₹999 ✨
          </p>
        </motion.div>
      </div>

      <header className={`transition-all duration-700 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-gray-100 py-1.5 shadow-lg' : 'bg-transparent border-transparent py-3'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          
          {/* Main Single-Row Header */}
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-brand-charcoal p-1" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/" className="flex-shrink-0 transition-transform duration-500 hover:scale-105">
                <img src={logo} alt="Kridha Luxe" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* Center: Category Menu (Desktop) */}
            <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
              <Link href="/collections?isTrending=true" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] transition-all text-brand-gold relative group">
                Trending
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-gold transition-all duration-300"></span>
              </Link>
              <Link href="/collections?isNew=true" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-gold text-brand-charcoal relative group">
                New
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              {menuCategoryNames.slice(0, 4).map((cat) => (
                <Link 
                  key={cat} 
                  href={`/collections?category=${cat}`}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-gold relative group ${pathname.includes(cat) ? 'text-brand-gold' : 'text-brand-charcoal'}`}
                >
                  {cat}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link href="/gifting" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-gold text-brand-charcoal relative group">
                Gifts
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right: Search & Icons */}
            <div className="flex items-center gap-4 md:gap-6 justify-end shrink-0">
              
              {/* Compact Search */}
              <div className="hidden lg:flex items-center relative group w-8 transition-all duration-500 overflow-hidden hover:w-48 xl:hover:w-56 border-b border-transparent hover:border-brand-gold/50 cursor-pointer">
                <Search className="w-4 h-4 text-brand-charcoal absolute left-0 top-1/2 -translate-y-1/2 group-hover:text-brand-gold transition-colors z-10" strokeWidth={1.5} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..." 
                  className="w-full bg-transparent pl-7 pr-2 py-1.5 text-[10px] uppercase font-bold tracking-widest text-brand-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-500 placeholder:text-gray-300 focus:outline-none"
                />
              </div>

              {/* Mobile Search Toggle */}
              <div className="lg:hidden relative">
                <Search className="w-5 h-5 text-brand-charcoal" strokeWidth={1.5} onClick={() => {
                   const input = prompt("Search elegantly:");
                   if(input) {
                     setSearchQuery(input);
                     setActiveCategory('All');
                     if (pathname !== '/') router.push('/');
                   }
                }} />
              </div>

              {/* Store Locator */}
              <Link href="/stores" className="hidden lg:flex flex-col items-center group text-brand-charcoal hover:text-brand-gold transition-all">
                <Store className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
              </Link>

              {/* User Account */}
              <div className="hidden lg:flex relative group/user flex-col items-center cursor-pointer">
                <Link href={mounted && userInfo ? "/profile" : "/login"} className="flex flex-col items-center group text-brand-charcoal hover:text-brand-gold transition-all">
                  <User className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                </Link>
                {mounted && userInfo && (
                  <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 z-50">
                    <div className="bg-white shadow-xl border border-gray-50 p-4 w-32 text-left space-y-3">
                      <Link href="/profile" className="block text-[9px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left text-[9px] font-bold uppercase tracking-widest text-brand-gold">Logout</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="flex flex-col items-center group text-brand-charcoal hover:text-brand-gold transition-all relative">
                <Heart className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                {mounted && wishlist?.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate__animated animate__heartBeat animate__infinite">{wishlist.length}</span>}
              </Link>

              {/* Cart */}
              <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center group text-brand-charcoal hover:text-brand-gold transition-all relative">
                <ShoppingBag className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                {mounted && cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-brand-charcoal text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Truly outside of the animated wrapper to avoid containing block issues */}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 bg-white z-[70] lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              <div className="flex items-center justify-between">
                <img src={logo} alt="Kridha Luxe" className="h-10 w-auto" />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-brand-cream rounded-full"><X className="w-5 h-5 text-brand-charcoal" /></button>
              </div>
              <div className="space-y-6">
                 {menuCategoryNames.map((cat, index) => (
                   <Link 
                    key={cat} 
                    href={`/collections?category=${cat}`} 
                    onClick={() => handleCategoryClick(cat)} 
                    className="block text-2xl font-serif uppercase tracking-tight text-brand-charcoal hover:text-brand-gold transition-colors"
                   >
                    {cat}
                   </Link>
                 ))}
                 <div className="pt-8 border-t border-gray-100 flex flex-col gap-6">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
                       <User className="w-4 h-4" /> Login / Register
                    </Link>
                    <Link href="/stores" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
                       <Store className="w-4 h-4" /> Our Stores
                    </Link>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
