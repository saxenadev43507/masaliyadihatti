const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  try {
    const result = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 } // Cache for 60 seconds (Next.js 13+ fetch cache)
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error('[Shopify] API error response:', result.status, errorText);
      return null;
    }

    return await result.json();
  } catch (error) {
    console.error('[Shopify] Error fetching from Shopify:', error);
    return null;
  }
}

export interface ShopifyProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: string;
  weight: number;
  rating: number;
  tags: string[];
  image: string;
  desc: string;
  variantId: string;
  handle: string;
}

export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            vendor
            productType
            description
            tags
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                  weight
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  if (!response || !response.data || !response.data.products) {
    console.warn('[Shopify] Failed to fetch products or empty response, using fallback.');
    return [];
  }

  const productsData = response.data.products.edges;

  return productsData.map((edge: any) => {
    const node = edge.node;
    const variant = node.variants?.edges?.[0]?.node;
    const priceAmount = parseFloat(variant?.price?.amount || '0');
    
    // Map Shopify's structure back to the Next.js visual state
    return {
      id: node.id,
      title: node.title,
      brand: node.vendor || 'Masaliya',
      category: node.productType || 'All Products',
      price: `$${priceAmount.toFixed(2)} AUD`,
      weight: variant?.weight || 0.1, // weight in kg
      rating: parseFloat((Math.random() * (5.0 - 4.6) + 4.6).toFixed(1)), // Fallback rating between 4.6 and 5.0
      tags: node.tags || [],
      image: node.images?.edges?.[0]?.node?.url || '',
      desc: node.description || '',
      variantId: variant?.id || '',
      handle: node.handle || '',
    };
  });
}

/**
 * Creates a Shopify Cart and returns a checkout URL
 */
export async function createShopifyCheckout(items: { variantId: string; quantity: number }[]): Promise<string | null> {
  // If variantId is not available, try checkout permalink using a general shopify cart query
  // Filter out any items without a variantId
  const validItems = items.filter(item => item.variantId && item.variantId.trim() !== '');

  if (validItems.length === 0) {
    console.error('[Shopify] No valid variant IDs in checkout request');
    return null;
  }

  const query = `
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    lines: validItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    })),
  };

  const response = await shopifyFetch({ query, variables });

  if (response?.data?.cartCreate?.cart?.checkoutUrl) {
    return response.data.cartCreate.cart.checkoutUrl;
  }

  if (response?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('[Shopify] Cart create errors:', response.data.cartCreate.userErrors);
  }

  return null;
}

export interface ShopifyBanner {
  imageUrl: string;
  title: string;
}

export async function getShopifyBanners(): Promise<ShopifyBanner[]> {
  const query = `
    query GetBanners {
      metaobjects(type: "new_image", first: 10) {
        edges {
          node {
            id
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    if (!response || !response.data || !response.data.metaobjects) {
      console.warn('[Shopify Banners] No metaobjects found or API error.');
      return [];
    }

    const edges = response.data.metaobjects.edges;
    return edges.map((edge: any) => {
      const node = edge.node;
      const fields = node.fields || [];

      // Find the banner image field (handle could be banner_imag or banner_image)
      const bannerImagField = fields.find((f: any) => f.key === 'banner_imag' || f.key === 'banner_image');
      const newField = fields.find((f: any) => f.key === 'new');

      const imageUrl = bannerImagField?.reference?.image?.url || '';
      const title = newField?.value || '';

      return {
        imageUrl,
        title,
      };
    }).filter((b: ShopifyBanner) => b.imageUrl !== ''); // Only return banners that have a valid uploaded image
  } catch (error) {
    console.error('[Shopify Banners] Error parsing custom banners:', error);
    return [];
  }
}

