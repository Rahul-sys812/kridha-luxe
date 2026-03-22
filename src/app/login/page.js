"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, User, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const redirect = searchParams.get('redirect') || '/';

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err.message || 'The credentials provided do not match our records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-brand-cream/20 flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-md w-full space-y-12 relative z-10 animate__animated animate__fadeIn">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-4 border border-brand-cream animate__animated animate__zoomIn">
            <User className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold animate__animated animate__fadeInDown">
            Member Sanctuary
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-none">
            Welcome <br /> <span className="italic font-bold">Back</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto"></div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-center border border-red-100 animate__animated animate__shakeX">
            {error}
          </div>
        )}

        <form className="space-y-8" onSubmit={submitHandler}>
          <div className="space-y-10">
            <div className="relative group border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-all duration-500">
              <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 ml-1 mb-2 block">Electronic Mail</label>
              <div className="flex items-center gap-4">
                  <User className="w-4 h-4 text-gray-300 group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-brand-charcoal font-sans font-medium focus:outline-none text-xs uppercase tracking-widest placeholder:text-gray-200" 
                    placeholder="name@boutique.com" 
                  />
              </div>
            </div>
            
            <div className="relative group border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-all duration-500">
              <div className="flex justify-between items-center ml-1 mb-2">
                 <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Security Key</label>
                 <a href="#" className="text-[8px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors">Forgot Key?</a>
              </div>
              <div className="flex items-center gap-4">
                  <Lock className="w-4 h-4 text-gray-300 group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-brand-charcoal font-sans font-medium focus:outline-none text-xs tracking-[0.5em] placeholder:text-gray-200" 
                    placeholder="••••••••" 
                  />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-2 animate__animated animate__fadeIn">
            <input 
              id="remember-me" 
              type="checkbox" 
              className="w-4 h-4 rounded-sm border-brand-cream text-brand-gold focus:ring-brand-gold transition-all cursor-pointer bg-white" 
            />
            <label htmlFor="remember-me" className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 cursor-pointer hover:text-brand-gold transition-colors">
              Remember Presence
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="luxury-btn w-full h-14 flex items-center justify-center gap-4 group disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER THE BOUTIQUE'}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
          </button>
        </form>

        <div className="text-center pt-10 border-t border-brand-cream">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            NOT YET A MEMBER OF OUR CIRCLE?{' '}
            <Link href="/signup" className="text-brand-gold hover:text-brand-charcoal transition-all ml-2 underline underline-offset-4">
               REQUEST ACCOUNT
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
        <div className="text-brand-gold animate-pulse text-[10px] font-bold uppercase tracking-[0.5em]">Loading Sanctuary...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
