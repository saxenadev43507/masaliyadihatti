import { NextRequest, NextResponse } from 'next/server';
import { getShopifyProducts, createShopifyCheckout } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingCost, shippingService, customerEmail } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (shippingCost === undefined || shippingCost === null) {
      return NextResponse.json({ error: 'Please calculate shipping before checkout' }, { status: 400 });
    }

    // Retrieve active Shopify products list to map/resolve variant IDs if missing
    let shopifyProducts: any[] = [];
    try {
      shopifyProducts = await getShopifyProducts();
    } catch (err) {
      console.error('[Shopify API] Failed to pre-fetch products for checkout resolution:', err);
    }

    // Build the line items list with resolved variant IDs
    const lineItems: { variantId: string; quantity: number }[] = [];

    for (const item of items) {
      let variantId = item.variantId;

      // Failsafe: If variantId is missing, resolve it dynamically by matching product title
      if (!variantId && shopifyProducts.length > 0) {
        const matched = shopifyProducts.find(
          (sp) => sp.title.toLowerCase().trim() === item.title.toLowerCase().trim()
        );
        if (matched) {
          variantId = matched.variantId;
          console.log(`[Shopify API] Resolved missing variant ID for "${item.title}" -> ${variantId}`);
        }
      }

      // If we still don't have a variant ID, use a default fallback or warn
      if (!variantId) {
        console.warn(`[Shopify API] Could not find Shopify variant ID for product: "${item.title}". Check if seeded on Shopify.`);
        
        // Failsafe: Try to match any product with same vendor/brand as fallback if available
        const brandFallback = shopifyProducts.find(
          (sp) => sp.brand.toLowerCase() === item.brand.toLowerCase()
        );
        if (brandFallback) {
          variantId = brandFallback.variantId;
          console.log(`[Shopify API] Using brand fallback variant for "${item.title}" -> "${brandFallback.title}" (${variantId})`);
        }
      }

      if (variantId) {
        lineItems.push({
          variantId: variantId,
          quantity: item.quantity,
        });
      } else {
        return NextResponse.json(
          { error: `The product "${item.title}" is not available in Shopify yet. Please configure it in your Shopify Admin.` },
          { status: 400 }
        );
      }
    }

    console.log('[Shopify API] Creating checkout for line items:', lineItems);

    // Call Shopify Storefront API to create cart & checkout session URL
    const checkoutUrl = await createShopifyCheckout(lineItems);

    if (checkoutUrl) {
      return NextResponse.json({ url: checkoutUrl });
    } else {
      return NextResponse.json(
        { error: 'Failed to create Shopify checkout session. Verify your variant IDs in Shopify Admin.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Shopify Checkout] Session creation error:', error);
    return NextResponse.json(
      { error: 'An error occurred during checkout setup. Please try again.' },
      { status: 500 }
    );
  }
}
