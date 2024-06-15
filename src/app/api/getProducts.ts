export async function getProducts(take = 20, offset = 1) {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${take}${offset}`,
    {
      method: 'POST',
      body: JSON.stringify({
        query: /* GraphQL */ `
          query Collections {
            products {
              id
              name
              slug
              price
              images {
                url
              }
            }
          }
        `,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res) {
    throw new Error('Failed to fetch products');
  }

  const productsResponse = await res.json();
  console.log(productsResponse);

  return productsResponse;
}
