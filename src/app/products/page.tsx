import { Pagination } from '@/ui/molecules/Pagination/Pagination';
import { ProductList } from '@/ui/organisms/ProductList/ProductList';
import { executeGraphQl } from '@/app/api/graphqlApi';
import { ProductsGetListDocument } from '@/gql/graphql';
import { Banner } from '@/ui/organisms/Banner';

const PAGE_SIZE = 3


export default async function Products({ searchParams }: { searchParams: { page: string } }) {

  const skip = (Number(searchParams.page) - 1) * PAGE_SIZE;


  const { products, productsConnection } = await executeGraphQl({
    query: ProductsGetListDocument, variables: {
      skip: skip,
      pageSize: PAGE_SIZE
    },
    next: {
      revalidate: 15
    }
  });

  const numberOfPages = productsConnection.pageInfo.pageSize ? Math.ceil(productsConnection.pageInfo.pageSize / PAGE_SIZE) : 0


  return (
    <div className='mt-40'>
      <ProductList products={products} />
      <Pagination numberOfPages={numberOfPages} />
    </div>
  );
}
