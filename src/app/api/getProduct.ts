export async function getProduct(id: string) {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`,
    {
      method: 'POST',
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ProductGetBySlug {
            product {
              name
              slug
              price
              description
              images {
                url
              }
              categories {
                name
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

  const productResponse = await res.json();
  console.log(productResponse);

  return productResponse;
}
