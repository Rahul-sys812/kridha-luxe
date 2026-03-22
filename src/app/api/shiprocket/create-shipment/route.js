import { NextResponse } from 'next/server';

const SHIPROCKET_API = 'https://apiv2.shiprocket.in/v1/external';

async function getShiprocketToken() {
  const res = await fetch(`${SHIPROCKET_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Shiprocket auth failed');
  return data.token;
}

export async function POST(req) {
  try {
    const { order, paymentId } = await req.json();
    const { formData, cartItems, finalTotal } = order;

    const token = await getShiprocketToken();

    // Build order items for Shiprocket
    const orderItems = cartItems.map((item) => ({
      name: item.name,
      sku: item.sku || `SKU-${item.id}`,
      units: item.quantity,
      selling_price: item.price,
      discount: 0,
      tax: 18,
      hsn: 7113, // HSN code for jewellery
    }));

    const shipmentPayload = {
      order_id: `KL-${paymentId.slice(-8).toUpperCase()}`,
      order_date: new Date().toISOString().split('T')[0],
      pickup_location: 'Primary',
      channel_id: '',
      comment: 'Kridha Luxe Boutique Order',
      billing_customer_name: formData.firstName,
      billing_last_name: formData.lastName,
      billing_address: formData.address,
      billing_city: formData.city,
      billing_pincode: formData.zip,
      billing_state: formData.state,
      billing_country: 'India',
      billing_email: formData.email,
      billing_phone: formData.phone,
      shipping_is_billing: true,
      order_items: orderItems,
      payment_method: 'Prepaid',
      sub_total: finalTotal,
      length: 15,
      breadth: 10,
      height: 5,
      weight: 0.5,
    };

    const shipRes = await fetch(`${SHIPROCKET_API}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipmentPayload),
    });

    const shipData = await shipRes.json();

    if (!shipRes.ok) {
      console.error('[Shiprocket create-shipment]', shipData);
      return NextResponse.json({ error: shipData.message || 'Shipment creation failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      shipmentId: shipData.shipment_id,
      orderId: shipData.order_id,
      awbCode: shipData.awb_code || null,
      trackingUrl: shipData.awb_code
        ? `https://shiprocket.co/tracking/${shipData.awb_code}`
        : null,
    });
  } catch (err) {
    console.error('[Shiprocket create-shipment]', err);
    return NextResponse.json({ error: err.message || 'Shipment failed' }, { status: 500 });
  }
}
