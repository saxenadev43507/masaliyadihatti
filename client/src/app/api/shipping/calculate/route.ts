import { NextRequest, NextResponse } from 'next/server';

const AUSPOST_API_BASE = 'https://digitalapi.auspost.com.au/postage/parcel/domestic';
const STORE_POSTCODE = process.env.STORE_POSTCODE || '3000'; // Melbourne default

// Default parcel dimensions for spice packets (cm)
const DEFAULT_LENGTH = 22;
const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 12;

// Placeholder keys that should be rejected
const INVALID_KEYS = ['your-auspost-api-key-here', '', 'test', 'demo'];

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.AUSPOST_API_KEY;

    // Strict API key validation — no dummy/placeholder keys allowed
    if (!apiKey || INVALID_KEYS.includes(apiKey.trim().toLowerCase())) {
      return NextResponse.json(
        { error: 'Australia Post API key is not configured. Please add a valid API key in .env.local' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { toPostcode, weight } = body;

    // Validate postcode (Australian postcodes are 4 digits)
    if (!toPostcode || !/^\d{4}$/.test(toPostcode)) {
      return NextResponse.json(
        { error: 'Please enter a valid 4-digit Australian postcode' },
        { status: 400 }
      );
    }

    // Validate weight
    if (!weight || weight <= 0) {
      return NextResponse.json(
        { error: 'Invalid parcel weight' },
        { status: 400 }
      );
    }

    // AusPost max weight is 22kg per parcel
    const clampedWeight = Math.min(weight, 22);

    // Step 1: Get available services for this route + weight
    const serviceUrl = new URL(`${AUSPOST_API_BASE}/service.json`);
    serviceUrl.searchParams.set('from_postcode', STORE_POSTCODE);
    serviceUrl.searchParams.set('to_postcode', toPostcode);
    serviceUrl.searchParams.set('length', DEFAULT_LENGTH.toString());
    serviceUrl.searchParams.set('width', DEFAULT_WIDTH.toString());
    serviceUrl.searchParams.set('height', DEFAULT_HEIGHT.toString());
    serviceUrl.searchParams.set('weight', clampedWeight.toString());

    console.log('[AusPost] Fetching services:', serviceUrl.toString());

    const serviceResponse = await fetch(serviceUrl.toString(), {
      method: 'GET',
      headers: {
        'AUTH-KEY': apiKey,
      },
    });

    if (!serviceResponse.ok) {
      const errorText = await serviceResponse.text();
      console.error('[AusPost] Service API error:', serviceResponse.status, errorText);

      if (serviceResponse.status === 403) {
        return NextResponse.json(
          { error: 'Australia Post API authentication failed. Your API key may be invalid or expired.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Unable to fetch shipping rates from Australia Post. Please try again later.' },
        { status: 502 }
      );
    }

    const serviceData = await serviceResponse.json();

    // Parse the services from AusPost response
    const services = serviceData?.services?.service;
    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { error: 'No shipping services available for this postcode' },
        { status: 404 }
      );
    }

    // Step 2: Get calculated price for EACH service from the calculate endpoint
    // ONLY use the calculate endpoint's total_cost — never fallback to service listing price
    const shippingOptions = await Promise.all(
      services.map(async (svc: { code: string; name: string; price: string; max_extra_cover: number }) => {
        try {
          const calcUrl = new URL(`${AUSPOST_API_BASE}/calculate.json`);
          calcUrl.searchParams.set('from_postcode', STORE_POSTCODE);
          calcUrl.searchParams.set('to_postcode', toPostcode);
          calcUrl.searchParams.set('length', DEFAULT_LENGTH.toString());
          calcUrl.searchParams.set('width', DEFAULT_WIDTH.toString());
          calcUrl.searchParams.set('height', DEFAULT_HEIGHT.toString());
          calcUrl.searchParams.set('weight', clampedWeight.toString());
          calcUrl.searchParams.set('service_code', svc.code);

          console.log('[AusPost] Calculating price for:', svc.code);

          const calcResponse = await fetch(calcUrl.toString(), {
            method: 'GET',
            headers: {
              'AUTH-KEY': apiKey,
            },
          });

          if (!calcResponse.ok) {
            console.error('[AusPost] Calculate failed for', svc.code, ':', calcResponse.status);
            return null;
          }

          const calcData = await calcResponse.json();
          const result = calcData?.postage_result;

          // STRICT: Only return if we got a real total_cost from the calculate endpoint
          if (!result || !result.total_cost) {
            console.error('[AusPost] No total_cost in response for', svc.code);
            return null;
          }

          return {
            code: svc.code,
            name: result.service || svc.name,
            price: parseFloat(result.total_cost),
            deliveryTime: result.delivery_time || 'Estimated delivery varies',
          };
        } catch (err) {
          console.error('[AusPost] Error calculating price for', svc.code, ':', err);
          return null;
        }
      })
    );

    // Filter out failed lookups and sort by price (cheapest first)
    const validOptions = shippingOptions
      .filter((opt): opt is NonNullable<typeof opt> => opt !== null && !isNaN(opt.price) && opt.price > 0)
      .sort((a, b) => a.price - b.price);

    if (validOptions.length === 0) {
      return NextResponse.json(
        { error: 'Unable to calculate shipping cost. Australia Post did not return pricing for this route.' },
        { status: 404 }
      );
    }

    console.log('[AusPost] Returning', validOptions.length, 'shipping options');

    return NextResponse.json({
      services: validOptions,
      fromPostcode: STORE_POSTCODE,
      toPostcode,
      weight: clampedWeight,
    });
  } catch (error) {
    console.error('[AusPost] Shipping calculation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
