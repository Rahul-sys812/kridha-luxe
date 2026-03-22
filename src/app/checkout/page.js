"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft, ArrowRight, CreditCard, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { userInfo } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: userInfo?.name?.split(' ')[0] || '',
    lastName: userInfo?.name?.split(' ')[1] || '',
    email: userInfo?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const tax = Math.round(cartTotal * 0.18);
  const shipping = cartTotal > 999 ? 0 : 99;
  const finalTotal = cartTotal + tax + shipping;

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Payment gateway failed to load.');

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal, receipt: `rcpt_${Date.now()}` }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Could not initiate payment.');

      await new Promise((resolve, reject) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Kridha Luxe',
          description: 'Boutique Jewellery Order',
          image: '/images/logo.png',
          order_id: orderData.orderId,
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: '#C5A059' },
          handler: async (response) => {
            try {
              const verifyRes = await fetch('/api/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response),
              });
              const verifyData = await verifyRes.json();
              if (!verifyData.verified) throw new Error('Payment verification failed.');

              const shipRes = await fetch('/api/shiprocket/create-shipment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  order: { formData, cartItems, finalTotal },
                  paymentId: response.razorpay_payment_id,
                }),
              });
              const shipData = await shipRes.json();

              // Save order to MongoDB
              const token = localStorage.getItem('kridha_token');
              await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                  items: cartItems.map(item => ({
                    product: item._id || null,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                    sku: item.sku || '',
                  })),
                  shippingAddress: formData,
                  subtotal: cartTotal,
                  tax,
                  shippingCost: shipping,
                  total: finalTotal,
                  razorpayOrderId: orderData.orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  shiprocketOrderId: shipData.orderId || '',
                  awbCode: shipData.awbCode || '',
                  trackingUrl: shipData.trackingUrl || '',
                }),
              });

              clearCart();
              const params = new URLSearchParams({
                paymentId: response.razorpay_payment_id,
                orderId: shipData.orderId || '',
                awb: shipData.awbCode || '',
                tracking: shipData.trackingUrl || '',
              });
              router.push(`/order-confirmation?${params.toString()}`);
              resolve();
            } catch (err) {
              reject(err);
            }
          },
          modal: { ondismiss: () => reject(new Error('Payment cancelled.')) },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (resp) =>
          reject(new Error(resp.error?.description || 'Payment failed.'))
        );
        rzp.open();
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center space-y-10 px-4 animate__animated animate__fadeIn">
        <div className="w-20 h-20 bg-brand-cream/50 rounded-full flex items-center justify-center opacity-30">
          <ShoppingBag className="w-10 h-10 text-brand-gold" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Empty Portfolio</span>
        <h2 className="text-4xl font-serif font-light text-brand-charcoal uppercase tracking-tighter text-center">
          Your Collection <br /> is Currently Empty
        </h2>
        <button onClick={() => router.push('/collections')} className="luxury-btn">
          Explore Collections
        </button>
      </div>
    );
  }

  const fields1 = [
    { name: 'firstName', label: 'Given Name', placeholder: 'Jane', type: 'text' },
    { name: 'lastName', label: 'Family Name', placeholder: 'Doe', type: 'text' },
    { name: 'email', label: 'Electronic Mail', placeholder: 'jane@boutique.com', type: 'email' },
    { name: 'phone', label: 'Contact Phone', placeholder: '+91 00000 00000', type: 'tel' },
  ];
  const fields2 = [
    { name: 'city', label: 'City', placeholder: 'New Delhi' },
    { name: 'state', label: 'State', placeholder: 'Delhi' },
    { name: 'zip', label: 'Postal Registry', placeholder: '110001' },
  ];

  return (
    <div className="bg-brand-cream/10 min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl">

        <div className="mb-16 space-y-6 animate__animated animate__fadeInLeft">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Collections', href: '/collections' }, { label: 'Checkout' }]} />
          <button onClick={() => router.back()} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-brand-gold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Boutique
          </button>
          <h1 className="text-4xl md:text-7xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-none">
            Checkout <br />
            <span className="italic font-bold text-brand-gold opacity-50 text-3xl md:text-5xl">Registry</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold/40"></div>
        </div>

        {error && (
          <div className="mb-10 flex items-center gap-4 bg-red-50 border border-red-100 text-red-500 px-6 py-4 rounded-sm animate__animated animate__shakeX">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-7 space-y-20 animate__animated animate__fadeIn">
            <section className="space-y-12">
              <div className="flex items-center gap-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold">I</span>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal">Delivery Credentials</h2>
              </div>
              <form id="checkout-form" onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {fields1.map((f) => (
                  <div key={f.name} className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-all duration-500">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 ml-1">{f.label}</label>
                    <input required name={f.name} type={f.type} value={formData[f.name]} onChange={handleInputChange} placeholder={f.placeholder}
                      className="w-full bg-transparent text-brand-charcoal text-xs font-bold tracking-widest placeholder:text-gray-200 uppercase focus:outline-none" />
                  </div>
                ))}
                <div className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-all duration-500 md:col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 ml-1">Full Destination</label>
                  <input required name="address" type="text" value={formData.address} onChange={handleInputChange} placeholder="Suite 4B, Emerald Gardens"
                    className="w-full bg-transparent text-brand-charcoal text-xs font-bold tracking-widest placeholder:text-gray-200 uppercase focus:outline-none" />
                </div>
                {fields2.map((f) => (
                  <div key={f.name} className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-all duration-500">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 ml-1">{f.label}</label>
                    <input required name={f.name} type="text" value={formData[f.name]} onChange={handleInputChange} placeholder={f.placeholder}
                      className="w-full bg-transparent text-brand-charcoal text-xs font-bold tracking-widest placeholder:text-gray-200 uppercase focus:outline-none" />
                  </div>
                ))}
              </form>
            </section>

            <section className="space-y-8 pb-10 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="flex items-center gap-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold">II</span>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal">Secure Vault Procurement</h2>
              </div>
              <div className="p-8 bg-white border border-brand-cream flex flex-col md:flex-row items-center gap-8 rounded-sm shadow-sm">
                <div className="w-14 h-14 bg-brand-cream/30 rounded-full flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-brand-gold" strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">Razorpay — All Methods Accepted</h3>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">UPI · Credit & Debit Cards · Net Banking · Wallets</p>
                </div>
                <ShieldCheck className="w-6 h-6 text-brand-gold opacity-40" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 animate__animated animate__fadeInRight">
            <div className="bg-brand-charcoal p-10 rounded-sm shadow-2xl sticky top-32 space-y-10 border border-brand-gold/10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50 border-b border-white/10 pb-6">Order Manifest</h2>
              <div className="space-y-8 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center group">
                    <div className="w-20 h-20 bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-white/10 p-1 group-hover:border-brand-gold transition-colors duration-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">× {item.quantity}</p>
                    </div>
                    <div className="text-[11px] font-bold text-brand-gold tracking-widest shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-10 border-t border-white/10">
                {[
                  { label: 'Subtotal', value: `₹${cartTotal.toLocaleString()}`, gold: false },
                  { label: 'GST (18%)', value: `₹${tax.toLocaleString()}`, gold: false },
                  { label: 'Delivery', value: shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`, gold: shipping === 0 },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em]">
                    <span className="text-gray-500">{row.label}</span>
                    <span className={row.gold ? 'text-brand-gold' : 'text-white'}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end pt-10 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Total</span>
                <div className="text-right">
                  <div className="text-4xl font-serif font-bold text-brand-gold tracking-wider">₹{finalTotal.toLocaleString()}</div>
                  <div className="text-[8px] text-gray-500 uppercase tracking-[0.3em] mt-2 italic">Incl. all taxes</div>
                </div>
              </div>
              <button form="checkout-form" type="submit" disabled={isProcessing}
                className="luxury-btn w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed">
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Pay ₹{finalTotal.toLocaleString()} <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
              <div className="flex items-center justify-center gap-3 pt-4 opacity-30">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white">SSL Encrypted · Powered by Razorpay</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
