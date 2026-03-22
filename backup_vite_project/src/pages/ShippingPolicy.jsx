import React from 'react';
import InfoPage from './InfoPage';

export default function ShippingPolicy() {
  return (
    <InfoPage title="Concierge: Shipping">
      <p>Every Kridha Luxe creation is handled with utmost care. Our shipping process reflects our commitment to excellence and ensures your boutique selection arrives in pristine condition.</p>
      
      <h3>Boutique Processing Time</h3>
      <p>All bespoke orders and boutique selections are processed within 1-2 business days. We prioritize care over haste to ensure perfection.</p>
      <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
      
      <h3>Shipping Rates & Delivery Estimates</h3>
      <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
      <ul>
        <li><strong>Standard Shipping:</strong> ₹50 (3-5 business days)</li>
        <li><strong>Express Shipping:</strong> ₹100 (1-2 business days)</li>
        <li><strong>Free Shipping:</strong> Available on all orders over ₹999.</li>
      </ul>
      <p>Delivery delays can occasionally occur due to unforeseen circumstances or courier partner issues.</p>
      
      <h3>Shipment Confirmation & Order Tracking</h3>
      <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
    </InfoPage>
  );
}
