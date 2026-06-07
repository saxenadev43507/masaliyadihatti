const domain = "aussiemobo.myshopify.com";
const storefrontAccessToken = "c70ab6ce0a3a07639aa1e7bd048a1fb3";

const query = `
  query GetProducts($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

async function shopifyFetch({ query, variables = {} }) {
  const result = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  return await result.json();
}

async function test() {
  try {
    let allProducts = [];
    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage && allProducts.length < 2500) {
      console.log(`Fetching page... Current count: ${allProducts.length}`);
      const response = await shopifyFetch({
        query,
        variables: cursor ? { cursor } : {}
      });

      if (response.errors) {
        console.error("API Errors:", response.errors);
        break;
      }

      const products = response.data?.products;
      if (!products) {
        console.error("No products data returned:", response);
        break;
      }

      const edges = products.edges || [];
      allProducts = [...allProducts, ...edges];
      console.log(`Fetched ${edges.length} products on this page.`);

      hasNextPage = products.pageInfo?.hasNextPage || false;
      if (edges.length > 0) {
        cursor = edges[edges.length - 1].cursor;
      } else {
        hasNextPage = false;
      }
    }

    console.log(`\nTotal products successfully loaded: ${allProducts.length}`);
    if (allProducts.length > 0) {
      console.log("First product:", allProducts[0].node.title);
      console.log("Last product:", allProducts[allProducts.length - 1].node.title);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
