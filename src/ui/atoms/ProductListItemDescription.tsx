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
    <div>
      <p>Nazwa: {name}</p>
      {categories[0] && <p>Kategoria: {categories[0].name}</p>}
      <p>Cena: {formmatMoney(price)}</p>
    </div>
  );
};
