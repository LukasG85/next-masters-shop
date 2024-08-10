import { ProductListItemFragment } from '@/gql/graphql';
import { formmatMoney } from '@/utils/formatMoney';

type Product = {
  product: {
    category: string;
    name: string;
    price: number;
  };
};

export const ProductListItemDescription = ({
  product,
}: { product: ProductListItemFragment }) => {

  const { name, categories, price } = product
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='font-medium text-base'>Name: {name}</p>
      {categories[0] && <p className='font-medium text-sm'>Category: {categories[0].name}</p>}
      <p className='font-medium text-sm'>Price: {formmatMoney(price)}</p>
    </div>
  );
};
