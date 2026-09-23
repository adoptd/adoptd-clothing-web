import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Airtable from 'airtable';
import { insertOrderPostgres } from '@/lib/vercel-postgres';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      // In development / initial testing without webhook secret
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const customerEmail = paymentIntent.receipt_email || paymentIntent.customer_details?.email || 'customer@example.com';
    const customerName = paymentIntent.shipping?.name || paymentIntent.customer_details?.name || 'Customer';
    const totalAmount = paymentIntent.amount / 100;
    const shippingAddress = paymentIntent.shipping?.address || {};

    // 1. PRIMARY: Write order directly to Airtable 'Orders' table for the website manager
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
        await base('Orders').create([
          {
            fields: {
              'Order Number': orderNumber,
              'Customer Name': customerName,
              'Customer Email': customerEmail,
              'Total Amount (£)': totalAmount,
              'Items Purchased': paymentIntent.metadata?.itemsDescription || `${paymentIntent.metadata?.itemCount || 1} items`,
              'Shipping Address': [
                shippingAddress.line1,
                shippingAddress.line2,
                shippingAddress.city,
                shippingAddress.postal_code,
                shippingAddress.country,
              ].filter(Boolean).join(', '),
              'Fulfillment Status': 'Unfulfilled',
              'Stripe Payment ID': paymentIntent.id,
            },
          },
        ]);
        console.log(`[Airtable] Successfully created order record: ${orderNumber}`);
      } catch (airtableErr) {
        console.error('[Airtable] Error creating order record:', airtableErr);
      }
    }

    // 2. SECONDARY: Mirror order into Vercel Postgres
    if (process.env.POSTGRES_URL) {
      try {
        await insertOrderPostgres({
          orderNumber,
          customerName,
          customerEmail,
          totalAmount,
          items: [{ metadata: paymentIntent.metadata }],
          shippingAddress,
          stripePaymentId: paymentIntent.id,
        });
        console.log(`[Vercel Postgres] Successfully mirrored order: ${orderNumber}`);
      } catch (pgErr) {
        console.error('[Vercel Postgres] Error mirroring order:', pgErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
