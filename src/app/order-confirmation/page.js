"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Package, Truck, ExternalLink, Copy } from 'lucide-react';

function OrderConfirmationContent() {
  const params = useSearchParams();
  const router = useRouter();

  const paymentId = params.get('paymentId') || '';
  const awbCode = params.get('awb') || '';
  const trackingUrl = params.get('tracking') || '';
  const orderId = params.get('orderId') || '';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-brand-cream/20 flex items-center justify-center px-4 py-32">
      <div className="max-w-2xl w-full space-y-12 animate__animated animate__fadeIn text-center">

        {/* Success Icon */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border border-brand-cream animate__animated animate__zoomIn">
            <CheckCircle2 className="w-10 h-10 text-brand-gold" strokeWidth={1} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">
            Order Confirmed
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-brand-charcoal uppercase tracking-tighter leading-none">
            Thank You <br />
            <span className="italic font-bold">For Choosing Us</span>
          </h1>
          <p className="text-gray-400 text-[11px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-md">
            Your selection is being prepared with artisanal care. We will notify you once it departs our sanctuary.
          </p>
          <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto"></div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-brand-cream rounded-sm shadow-sm p-8 space-y-6 text-left">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal border-b border-brand-cream pb-4">
            Order Details
          </h2>

          {paymentId && (
            <div className="flex items-center justify-between group">
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Payment ID</span>
                <span className="text-[11px] font-bold text-brand-charcoal tracking-wider mt-1 block">{paymentId}</span>
              </div>
              <button
                onClick={() => copyToClipboard(paymentId)}
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}

          {orderId && (
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Order ID</span>
                <span className="text-[11px] font-bold text-brand-charcoal tracking-wider mt-1 block">{orderId}</span>
              </div>
              <button
                onClick={() => copyToClipboard(orderId)}
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}

          {awbCode && (
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">AWB / Tracking Number</span>
                <span className="text-[11px] font-bold text-brand-gold tracking-wider mt-1 block">{awbCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(awbCode)}
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tracking & Shipment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-cream rounded-sm p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-cream/50 rounded-full flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Dispatch</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal mt-1">1–2 Business Days</span>
            </div>
          </div>
          <div className="bg-white border border-brand-cream rounded-sm p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-cream/50 rounded-full flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Delivery</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal mt-1">3–5 Business Days</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {trackingUrl && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn flex items-center gap-3"
            >
              <Truck className="w-4 h-4" /> Track Shipment
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button
            onClick={() => router.push('/')}
            className="luxury-btn-outline"
          >
            Return to Gallery
          </button>
        </div>

      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brand-gold animate-pulse text-[10px] font-bold uppercase tracking-[0.5em]">Loading...</div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
