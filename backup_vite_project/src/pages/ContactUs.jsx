import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactUs() {
  const recaptchaRef = useRef(null);
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert("Please verify you are human!");
      return;
    }
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message Sent Successfully!');
      e.target.reset();
      recaptchaRef.current.reset();
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase text-brand-orange tracking-[0.3em] font-bold text-[10px]"
          >
            We're here for you
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-display font-medium text-brand-charcoal uppercase tracking-tighter"
          >
            Contact <span className="italic font-light">Us</span>
          </motion.h1>
          <div className="w-12 h-[1px] bg-brand-orange mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-medium text-brand-charcoal uppercase">Send a message</h2>
              <p className="text-gray-400 text-sm font-light">Fill out the form below and we'll get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 border-b border-gray-100 pb-2 focus-within:border-brand-orange transition-colors">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                  <input required type="text" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal font-medium placeholder:text-gray-200" placeholder="Jane" />
                </div>
                <div className="space-y-2 border-b border-gray-100 pb-2 focus-within:border-brand-orange transition-colors">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                  <input required type="text" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal font-medium placeholder:text-gray-200" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2 border-b border-gray-100 pb-2 focus-within:border-brand-orange transition-colors">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                <input required type="email" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal font-medium placeholder:text-gray-200" placeholder="jane@example.com" />
              </div>

              <div className="space-y-2 border-b border-gray-100 pb-2 focus-within:border-brand-orange transition-colors">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                <textarea required rows="3" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal font-medium placeholder:text-gray-200 resize-none" placeholder="Tell us more about your inquiry"></textarea>
              </div>

              <div className="pt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                />
              </div>

              <button 
                type="submit" 
                className="px-16 py-4 bg-brand-charcoal text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-brand-orange transition-all duration-500 shadow-lg hover:shadow-brand-orange/20"
              >
                {status === 'Sending...' ? 'Sending...' : 'Submit Message'}
              </button>
              {status && <p className="text-sm font-medium text-brand-orange mt-4 italic">{status}</p>}
            </form>
          </motion.div>

          {/* Map & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Location</h3>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Cyber Hub, 4th Floor<br/>Sector 24, New Delhi<br/>India 110001</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal">Support</h3>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed">+91 7906034247<br/>kridhastore@gmail.com</p>
              </div>
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl h-[450px] border border-gray-50 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.91924553535!2d77.12658405!3d28.663185599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1654152861234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="absolute inset-0 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[2s]"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
