import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Security Keys do not match');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create boutique account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white flex items-center justify-center px-4 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-orange opacity-[0.03] rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-charcoal opacity-[0.02] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-md w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gray mb-4">
            <UserPlus className="w-6 h-6 text-brand-orange" strokeWidth={1} />
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
            Kridha Luxe Membership
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-charcoal uppercase tracking-tighter leading-none">
            Join the <br /> Circle
          </h2>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto opacity-30"></div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50/50 backdrop-blur-sm text-red-500 p-4 rounded-[24px] text-[11px] font-bold uppercase tracking-widest text-center border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="space-y-6">
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[24px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" 
                placeholder="Jane Doe" 
              />
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">Electronic Mail</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[24px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" 
                placeholder="name@portal.com" 
              />
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">Security Key</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[24px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" 
                placeholder="••••••••" 
              />
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">Confirm Security Key</label>
              <input 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-brand-gray/50 border-b border-gray-100 px-6 py-4 rounded-[24px] text-brand-charcoal font-sans font-light focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-500" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-18 bg-brand-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-brand-orange transition-all duration-700 shadow-2xl hover:shadow-brand-orange/20 disabled:opacity-50 group"
          >
            {loading ? 'Registering...' : 'Create Boutique Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </form>

        <div className="text-center pt-8 border-t border-gray-50">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Already have portal access?{' '}
            <Link to="/login" className="text-brand-orange hover:text-brand-charcoal transition-colors ml-2">
               Sign In
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

