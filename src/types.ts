export type ProductType = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
};

export type ProductsType = {
  products: ProductType[];
};
