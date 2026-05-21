import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingCost, shippingService, shippingPostcode, customerEmail, subtotal } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (shippingCost === undefined || shippingCost === null) {
      return NextResponse.json({ error: 'Please calculate shipping before checkout' }, { status: 400 });
    }

    if (!customerEmail) {
      return NextResponse.json({ error: 'Please sign in to proceed with checkout' }, { status: 400 });
    }

    // Build line items for Stripe Checkout
    const lineItems: {
      price_data: {
        currency: string;
        product_data: {
          name: string;
          description?: string;
          images?: string[];
        };
        unit_amount: number;
      };
      quantity: number;
    }[] = items.map((item: { title: string; brand: string; price: string; quantity: number; image?: string; weight?: number }) => {
      // Parse price from string like "$6.99 AUD"
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      const unitAmountCents = Math.round(priceNum * 100); // Stripe uses cents

      return {
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.title,
            description: `${item.brand} • ${((item.weight || 0.1) * 1000).toFixed(0)}g`,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: unitAmountCents,
        },
        quantity: item.quantity,
      };
    });

    // Add shipping as a line item
    if (shippingCost > 0) {
      const shippingCents = Math.round(shippingCost * 100);
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: {
            name: `Shipping — ${shippingService || 'Australia Post'}`,
            description: `Delivery to ${shippingPostcode || 'your address'} via Australia Post`,
          },
          unit_amount: shippingCents,
        },
        quantity: 1,
      });
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        items: JSON.stringify(items.map((item: { id: number; title: string; quantity: number; price: string }) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        }))),
        subtotal: subtotal?.toString() || '0',
        shippingCost: shippingCost.toString(),
        shippingService: shippingService || '',
        shippingPostcode: shippingPostcode || '',
        customerEmail: customerEmail,
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Stripe] Checkout session error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add valid API keys.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
