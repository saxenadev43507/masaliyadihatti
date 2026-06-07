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
  compareAtPrice?: string;
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
      products(first: 250) {
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
                  compareAtPrice {
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
    const compareAtPriceAmount = variant?.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : 0;
    
    // Map Shopify's structure back to the Next.js visual state
    return {
      id: node.id,
      title: node.title,
      brand: node.vendor || 'Masaliya',
      category: node.productType || 'All Products',
      price: `$${priceAmount.toFixed(2)} AUD`,
      compareAtPrice: compareAtPriceAmount > priceAmount ? `$${compareAtPriceAmount.toFixed(2)} AUD` : undefined,
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

export interface ShopifyRecipe {
  title: string;
  slug: string;
  category: string;
  time: string;
  serves: string;
  difficulty: string;
  desc: string;
  image: string;
  spices: string[];
  handle: string;
  contentHtml?: string;
}

export async function getShopifyRecipes(): Promise<ShopifyRecipe[]> {
  const query = `
    query GetRecipes {
      articles(first: 50) {
        edges {
          node {
            id
            title
            handle
            content
            contentHtml
            excerpt
            image {
              url
            }
            tags
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    if (!response || !response.data || !response.data.articles) {
      console.warn('[Shopify Recipes] No articles found or API error.');
      return [];
    }

    const edges = response.data.articles.edges;
    return edges.map((edge: any) => {
      const node = edge.node;
      const tags = node.tags || [];

      // Parse custom tags like "time:45 min", "serves:4", "difficulty:Easy", "spices:A,B"
      let time = "30 min";
      let serves = "4";
      let difficulty = "Easy";
      let category = "quick";
      let spices: string[] = [];

      tags.forEach((tag: string) => {
        const lowerTag = tag.toLowerCase().trim();
        if (lowerTag.startsWith('time:')) {
          time = tag.substring(5).trim();
        } else if (lowerTag.startsWith('serves:')) {
          serves = tag.substring(7).trim();
        } else if (lowerTag.startsWith('difficulty:')) {
          difficulty = tag.substring(11).trim();
        } else if (lowerTag.startsWith('category:')) {
          category = tag.substring(9).trim();
        } else if (lowerTag.startsWith('spices:')) {
          spices = tag.substring(7).split(',').map(s => s.trim());
        }
      });

      // If category wasn't set explicitly via tag, try to infer it from the title
      if (!tags.some((t: string) => t.toLowerCase().startsWith('category:'))) {
        const titleLower = node.title.toLowerCase();
        if (titleLower.includes('biryani') || titleLower.includes('rice')) {
          category = 'biryani';
        } else if (titleLower.includes('kabab') || titleLower.includes('tikka') || titleLower.includes('grill')) {
          category = 'grills';
        } else if (titleLower.includes('chaat') || titleLower.includes('street') || titleLower.includes('pav')) {
          category = 'street';
        } else if (titleLower.includes('sambar') || (titleLower.includes('curry') && titleLower.includes('south'))) {
          category = 'south-indian';
        } else if (titleLower.includes('chole') || titleLower.includes('dal') || titleLower.includes('chicken') || titleLower.includes('mutton')) {
          category = 'north-indian';
        }
      }

      return {
        title: node.title,
        slug: category, // match categories tabs slug
        category: category,
        time,
        serves,
        difficulty,
        desc: node.excerpt || node.content.substring(0, 150) + "...",
        image: node.image?.url || 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&bg=80',
        spices: spices.length > 0 ? spices : ["Shahi Garam Masala"],
        handle: node.handle,
        contentHtml: node.contentHtml,
      };
    });
  } catch (error) {
    console.error('[Shopify Recipes] Error parsing articles:', error);
    return [];
  }
}

export async function getShopifyRecipeByHandle(handle: string): Promise<ShopifyRecipe | null> {
  const query = `
    query GetRecipe {
      articles(first: 50) {
        edges {
          node {
            id
            title
            handle
            content
            contentHtml
            excerpt
            image {
              url
            }
            tags
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    if (!response || !response.data || !response.data.articles) {
      return null;
    }

    const edges = response.data.articles.edges;
    const match = edges.find((edge: any) => edge.node.handle === handle);
    if (!match) return null;

    const node = match.node;
    const tags = node.tags || [];

    let time = "30 min";
    let serves = "4";
    let difficulty = "Easy";
    let category = "quick";
    let spices: string[] = [];

    tags.forEach((tag: string) => {
      const lowerTag = tag.toLowerCase().trim();
      if (lowerTag.startsWith('time:')) {
        time = tag.substring(5).trim();
      } else if (lowerTag.startsWith('serves:')) {
        serves = tag.substring(7).trim();
      } else if (lowerTag.startsWith('difficulty:')) {
        difficulty = tag.substring(11).trim();
      } else if (lowerTag.startsWith('category:')) {
        category = tag.substring(9).trim();
      } else if (lowerTag.startsWith('spices:')) {
        spices = tag.substring(7).split(',').map(s => s.trim());
      }
    });

    return {
      title: node.title,
      slug: category,
      category: category,
      time,
      serves,
      difficulty,
      desc: node.excerpt || node.content.substring(0, 150) + "...",
      image: node.image?.url || 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&bg=80',
      spices: spices.length > 0 ? spices : ["Shahi Garam Masala"],
      handle: node.handle,
      contentHtml: node.contentHtml,
    };
  } catch (error) {
    console.error('[Shopify Recipes] Error fetching recipe by handle:', error);
    return null;
  }
}

export interface ShopifyTheme {
  activeTheme: string;
  primaryColor?: string;
  accentColor?: string;
  festivalName?: string;
}

export async function getShopifyTheme(): Promise<ShopifyTheme | null> {
  const query = `
    query GetTheme {
      metaobjects(type: "storefront_theme", first: 1) {
        edges {
          node {
            fields {
              key
              value
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    if (!response || !response.data || !response.data.metaobjects) {
      return null;
    }

    const edges = response.data.metaobjects.edges;
    if (edges.length === 0) return null;

    const fields = edges[0].node.fields || [];
    const activeThemeField = fields.find((f: any) => f.key === 'active_theme');
    const primaryColorField = fields.find((f: any) => f.key === 'primary_color');
    const accentColorField = fields.find((f: any) => f.key === 'accent_color');
    const festivalNameField = fields.find((f: any) => f.key === 'festival_name');

    return {
      activeTheme: activeThemeField?.value || 'default',
      primaryColor: primaryColorField?.value || '',
      accentColor: accentColorField?.value || '',
      festivalName: festivalNameField?.value || '',
    };
  } catch (error) {
    console.error('[Shopify Theme] Error fetching storefront theme:', error);
    return null;
  }
}



