import { ProductType } from '@/types';
import { ProductListItemDescription } from '@/ui/atoms/ProductListItemDescription';
import { ProductListItemImage } from '@/ui/atoms/ProductListItemImage';
import Link from 'next/link';

export const ProductListItem = ({ product }: { product: ProductType }) => {
  return (
    <li className='w-52'>
      <Link href={`/products/${product.id}`}>
        <article>
          <ProductListItemImage src={product.image} alt={product.name} />
          <ProductListItemDescription product={product} />
        </article>
      </Link>
    </li>
  );
};
