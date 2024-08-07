import { executeGraphQl } from "@/app/api/graphqlApi";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

const PAGE_SIZE = 3

export default async function CategoryProductPage({ params, searchParams }: { params: { category: string }, searchParams: { page: string } }) {

    const skip = (Number(searchParams.page) - 1) * PAGE_SIZE;

    const { products, productsConnection } = await executeGraphQl({
        query: ProductsGetByCategorySlugDocument, variables: {
            slug: params.category,
            skip: skip,
            pageSize: PAGE_SIZE
        }
    });


    const numberOfPages = productsConnection.pageInfo.pageSize ? Math.ceil(productsConnection.pageInfo.pageSize / PAGE_SIZE) : 0


    return (<div className='mt-40'>
        <ProductList products={products} />
        <Pagination numberOfPages={numberOfPages} />
    </div>)
}