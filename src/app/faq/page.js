"use client";
import React from 'react';
import InfoPage from '@/components/InfoPage';

export default function FAQ() {
  return (
    <InfoPage title="Journal & FAQ">
      <div className="space-y-12">
        <div className="space-y-4">
          <h3>1. How do I care for my Kridha Luxe selections?</h3>
          <p>Every piece is a work of art. To maintain its brilliance, we recommend avoiding contact with perfumes, hairsprays, and moisture. Store your selection in the velvet-lined Kridha Luxe box provided.</p>
        </div>

        <div className="space-y-4">
          <h3>2. Are the pieces suitable for sensitive skin?</h3>
          <p>Our boutique collections are crafted from premium alloys and are nickel-free, designed for comfort and sophistication. For those with exceptional sensitivities, we recommend a consultation with our concierge.</p>
        </div>

        <div className="space-y-4">
          <h3>3. What is the Bespoke experience?</h3>
          <p>While we offer curated seasonal collections, we are exploring bespoke services for our distinguished clients. Stay connected with our boutique for upcoming private unveilings.</p>
        </div>

        <div className="space-y-4">
          <h3>4. Secure Acquisition & Payment</h3>
          <p>All acquisitions through our digital boutique are secured with industry-leading encryption. We exclusively accept digital payments to ensure a seamless and contactless journey.</p>
        </div>

        <div className="space-y-4">
          <h3>5. Order Adjustments</h3>
          <p>Due to the boutique nature of our processing, adjustments can only be facilitated within 4 hours of your commission. Once refined and dispatched, the selection is final.</p>
        </div>
      </div>
    </InfoPage>
  );
}
