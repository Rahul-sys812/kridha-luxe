"use client";
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { MapPin, Phone, Mail, Send, Navigation } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

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
      setStatus('Message Delivered Successfully');
      e.target.reset();
      recaptchaRef.current.reset();
    }, 1500);
  };

  return (
    <div className="bg-brand-cream/20 min-h-screen pt-40 pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
        {/* Header */}
        <div className="text-center mb-20 space-y-6 animate__animated animate__fadeInDown">
          <span className="uppercase text-brand-gold tracking-[0.5em] font-bold text-[10px]">
            The Boutique Concierge
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-light text-brand-charcoal uppercase tracking-tighter">
            Connect With <span className="italic font-bold text-brand-gold">Us</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Contact Form */}
          <div className="space-y-12 animate__animated animate__fadeInLeft">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-brand-charcoal uppercase tracking-wider">Leave a Message</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed">Our concierge team is at your availability for any inquiries.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-colors">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Given Name</label>
                  <input required type="text" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal text-xs font-medium tracking-widest placeholder:text-gray-200 uppercase" placeholder="First Name" />
                </div>
                <div className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-colors">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Surname</label>
                  <input required type="text" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal text-xs font-medium tracking-widest placeholder:text-gray-200 uppercase" placeholder="Last Name" />
                </div>
              </div>
              
              <div className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-colors">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Email Correspondence</label>
                <input required type="email" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal text-xs font-medium tracking-widest placeholder:text-gray-200" placeholder="jane.doe@luxury.com" />
              </div>

              <div className="space-y-3 border-b border-brand-cream pb-3 focus-within:border-brand-gold transition-colors">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Your Inquiry</label>
                <textarea required rows="3" className="w-full bg-transparent py-2 focus:outline-none text-brand-charcoal text-xs font-medium tracking-widest placeholder:text-gray-200 resize-none uppercase" placeholder="Tell us more about your requirements..."></textarea>
              </div>

              <div className="pt-4 opacity-80 hover:opacity-100 transition-opacity">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                />
              </div>

              <button 
                type="submit" 
                className="luxury-btn w-full md:w-auto"
              >
                {status === 'Sending...' ? 'DELIVERING...' : 'SEND MESSAGE'}
              </button>
              {status && <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mt-6 animate__animated animate__pulse italic">{status}</p>}
            </form>
          </div>

          {/* Map & Info */}
          <div className="space-y-16 animate__animated animate__fadeInRight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 group">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal">Boutique</h3>
                </div>
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] leading-relaxed uppercase group-hover:text-brand-charcoal transition-colors">Cyber Hub, 4th Floor<br/>Sector 24, New Delhi<br/>India 110001</p>
              </div>
              <div className="space-y-4 group">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal">Assistance</h3>
                </div>
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] leading-relaxed uppercase group-hover:text-brand-charcoal transition-colors">+91 7906034247<br/>kridhastore@gmail.com</p>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden shadow-2xl h-[450px] border border-brand-cream relative group animate__animated animate__zoomIn">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.91924553535!2d77.12658405!3d28.663185599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1654152861234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="absolute inset-0 grayscale contrast-125 opacity-7 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2.5s]"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
