const domain = "aussiemobo.myshopify.com";
const storefrontAccessToken = "c70ab6ce0a3a07639aa1e7bd048a1fb3";

const query = `
  query GetProducts {
    products(first: 2500) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

async function test() {
  try {
    const result = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await result.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
