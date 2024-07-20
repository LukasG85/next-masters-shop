import React from 'react';
import { ProductListItem } from '../molecules/ProductListItem';
import { ProductListItemFragment } from '@/gql/graphql';

export const ProductList = async ({ products }: { products: ProductListItemFragment[] }) => {

  return (
    <ul className='flex flex-wrap justify-center gap-4'>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
