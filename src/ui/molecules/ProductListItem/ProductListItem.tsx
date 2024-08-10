import { ProductListItemFragment } from '@/gql/graphql';
import { ProductListItemDescription } from '@/ui/atoms/ProductListItemDescription';
import { ProductListItemImage } from '@/ui/atoms/ProductListItemImage';
import Link from 'next/link';
import { UrlObject } from 'url';
export const ProductListItem = ({ product }: { product: ProductListItemFragment }) => {

  const href: UrlObject = { pathname: `/product/${product.id}` };

  return (
    <li className='w-80 h-80 flex justify-center items-center border border-b border-gray-200 rounded-lg hover:border-gray-600 transition duration-200'>
      <Link href={href} className='p-5'>
        <article>
          {product.images[0] && <ProductListItemImage src={product.images[0].url} alt={product.name} />}
          <ProductListItemDescription product={product} />
        </article>
      </Link>
    </li>
  );
};
