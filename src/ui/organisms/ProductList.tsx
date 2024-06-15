import React from 'react';
import { ProductListItem } from '../molecules/ProductListItem';
import { getProducts } from '@/app/api/getProducts';

export const ProductList = async () => {
  const products = await getProducts();

  return (
    <ul className='flex flex-wrap justify-center gap-4'>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
