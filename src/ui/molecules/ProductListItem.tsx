// import { ProductType } from '@/types';
import { ProductListItemFragment } from '@/gql/graphql';
import { ProductListItemDescription } from '@/ui/atoms/ProductListItemDescription';
import { ProductListItemImage } from '@/ui/atoms/ProductListItemImage';
import Link from 'next/link';
import { UrlObject } from 'url';
export const ProductListItem = ({ product }: { product: ProductListItemFragment }) => {

  const href: UrlObject = { pathname: `/product/${product.id}` };

  return (
    <li className='w-52'>
      <Link href={href}>
        <article>
          {product.images[0] && <ProductListItemImage src={product.images[0].url} alt={product.name} />}
          <ProductListItemDescription product={product} />
        </article>
      </Link>
    </li>
  );
};
