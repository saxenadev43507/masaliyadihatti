import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Use service role key for webhook (no user auth context)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.arrayBuffer();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        Buffer.from(body),
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('[Stripe Webhook] Signature verification failed:', err);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    console.log('[Stripe Webhook] Received event:', event.type);

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log('[Stripe Webhook] Payment successful for session:', session.id);

      // Extract order data from session metadata
      const metadata = session.metadata || {};
      let orderItems = [];
      try {
        orderItems = JSON.parse(metadata.items || '[]');
      } catch {
        orderItems = [];
      }

      // Save order to Supabase
      const orderData = {
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === 'string' 
          ? session.payment_intent 
          : session.payment_intent?.toString() || null,
        customer_email: session.customer_email || metadata.customerEmail || '',
        items: orderItems,
        subtotal: parseFloat(metadata.subtotal || '0'),
        shipping_cost: parseFloat(metadata.shippingCost || '0'),
        shipping_service: metadata.shippingService || '',
        shipping_postcode: metadata.shippingPostcode || '',
        total: (session.amount_total || 0) / 100, // Convert cents to dollars
        currency: session.currency || 'aud',
        status: 'paid',
      };

      console.log('[Stripe Webhook] Saving order:', orderData);

      const { error: dbError } = await supabaseAdmin
        .from('orders')
        .insert(orderData);

      if (dbError) {
        console.error('[Stripe Webhook] Failed to save order:', dbError);
        // Still return 200 to Stripe so it doesn't retry
      } else {
        console.log('[Stripe Webhook] Order saved successfully');
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
