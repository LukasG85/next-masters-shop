import { Pagination } from '@/ui/molecules/Pagination';
import { ProductList } from '@/ui/organisms/ProductList';

export default async function Products() {
  return (
    <div>
      <ProductList />
      <Pagination numberOfPages={10} />
    </div>
  );
}
