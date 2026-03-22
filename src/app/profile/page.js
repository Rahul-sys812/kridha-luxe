"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, User, LogOut, ShoppingBag } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function Profile() {
  const { userInfo, logout, authFetch } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) { router.push('/login'); return; }
    authFetch('/api/orders/my')
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userInfo]);

  const handleLogout = () => { logout(); router.push('/'); };

  if (!userInfo) return null;

  return (
    <div className="bg-brand-cream/10 min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-4xl">

        {/* Header */}
        <div className="mb-16 space-y-4 animate__animated animate__fadeIn">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Profile' }]} />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">My Account</span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-brand-charcoal uppercase tracking-tighter">
            {userInfo.name}
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold/40" />
        </div>

        {/* User Info Card */}
        <div className="bg-white border border-brand-cream rounded-sm p-8 mb-12 flex items-center justify-between shadow-sm animate__animated animate__fadeInUp">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-brand-cream/50 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-charcoal">{userInfo.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{userInfo.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>

        {/* Orders */}
        <div className="space-y-6 animate__animated animate__fadeInUp">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-charcoal border-b border-brand-cream pb-4">
            Order History
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-brand-cream/40 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center space-y-6">
              <div className="w-16 h-16 bg-brand-cream/50 rounded-full flex items-center justify-center mx-auto opacity-40">
                <ShoppingBag className="w-7 h-7 text-brand-gold" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">No orders yet</p>
              <button onClick={() => router.push('/collections')} className="luxury-btn">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="bg-white border border-brand-cream rounded-sm p-6 shadow-sm hover:border-brand-gold/30 transition-all duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                        order.status === 'shipped' ? 'bg-blue-50 text-blue-600' :
                        order.status === 'paid' ? 'bg-brand-cream text-brand-gold' :
                        'bg-gray-50 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-[11px] font-bold text-brand-charcoal mt-2">₹{order.total?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-sm border border-brand-cream" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 hidden sm:block">{item.name}</span>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest self-center">+{order.items.length - 3} more</span>
                    )}
                  </div>
                  {order.trackingUrl && (
                    <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:underline">
                      <Package className="w-3 h-3" /> Track Shipment
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
