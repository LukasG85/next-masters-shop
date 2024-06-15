import { formmatMoney } from '@/utils/formatMoney';

type Product = {
  product: {
    category: string;
    name: string;
    price: number;
  };
};

export const ProductListItemDescription = ({
  product: { category, name, price },
}: Product) => {
  return (
    <div>
      <p>Nazwa: {name}</p>
      <p>Kategoria: {category}</p>
      <p>Cena: {formmatMoney(price)}</p>
    </div>
  );
};
