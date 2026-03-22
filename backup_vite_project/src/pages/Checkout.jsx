import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    address: '', city: '', state: '', zip: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000); // Simulate network delay
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-xl"
        >
          <div className="w-24 h-24 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-orange" strokeWidth={1} />
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-orange">Acquisition Complete</span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">Thank You <br /> For Ordering</h1>
          <p className="text-gray-400 font-sans font-light text-lg leading-relaxed italic">
            "Every Kridha Luxe piece is a promise of elegance. Your selection is being prepared with artisanal care by our boutique team."
          </p>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto opacity-30"></div>
          <button 
            onClick={() => navigate('/')}
            className="h-16 px-12 bg-brand-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-orange transition-all duration-700 shadow-2xl"
          >
            Return to the Gallery
          </button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center space-y-8 px-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Empty Portfolio</span>
        <h2 className="text-4xl font-display font-medium text-brand-charcoal uppercase tracking-tighter text-center">Your Collection <br /> is Currently Empty</h2>
        <button 
          onClick={() => navigate('/collections')} 
          className="h-14 px-10 bg-brand-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-orange transition-all duration-500"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const tax = Math.round(cartTotal * 0.18); // 18% GST estimate
  const shipping = cartTotal > 999 ? 0 : 99; // Free shipping logic
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl">
        
        <div className="mb-20 space-y-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Boutique
          </button>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
            Checkout
          </h1>
          <div className="w-12 h-[1px] bg-brand-orange opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Shipping Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-16"
          >
            <section className="space-y-10">
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange">01</span>
                 <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Concierge Delivery Details</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handleRazorpayPayment} className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" placeholder="Jane" />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" placeholder="Doe" />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Electronic Mail</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Contact Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2 relative group md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Destination Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" placeholder="123 Fashion Street, Apt 4B" />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">City</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">State / Province</label>
                  <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" />
                </div>
                <div className="space-y-2 relative group md:col-span-2 lg:col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Postal Code</label>
                  <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[20px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" />
                </div>
              </form>
            </section>
            
            <section className="space-y-10">
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange">02</span>
                 <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Secure Vault Acquisition</h2>
              </div>
              <div className="p-8 bg-brand-gray rounded-[32px] border border-gray-50 flex flex-col md:flex-row items-center gap-8 group hover:bg-white hover:shadow-xl transition-all duration-700">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6 text-brand-orange" strokeWidth={1} />
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                   <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">Razorpay Premium Gateway</h3>
                   <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">Encrypted processing via Cards, UPI, NetBanking or Digital Wallets.</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-black opacity-10 group-hover:opacity-100 group-hover:text-brand-orange transition-all duration-700" strokeWidth={1} />
              </div>
            </section>
          </motion.div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-charcoal p-10 rounded-[48px] shadow-2xl sticky top-40 space-y-10"
            >
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Your Selection</h2>

              <div className="space-y-8 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar-luxe">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-6 items-center group">
                    <div className="w-20 h-20 bg-white/5 rounded-[24px] overflow-hidden flex-shrink-0 border border-white/10 p-1 group-hover:border-brand-orange transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-[20px]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-[12px] font-bold text-brand-orange font-display">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-10 border-t border-white/5">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Portfolio Total</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Acquisition Tax (18%)</span>
                  <span className="text-white">₹{tax}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Boutique Delivery</span>
                  <span className={shipping === 0 ? "text-brand-orange" : "text-white"}>
                    {shipping === 0 ? "COMPLIMENTARY" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-10 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Investment Total</span>
                <div className="text-right">
                   <div className="text-4xl font-display font-medium text-brand-orange">₹{finalTotal}</div>
                   <div className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mt-2">All Duties Included</div>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full h-18 bg-brand-orange text-white rounded-full text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white hover:text-brand-charcoal transition-all duration-700 shadow-2xl disabled:opacity-50 group mt-4"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    Confirm Acquisition
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-500" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

