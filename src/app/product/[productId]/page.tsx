import { executeGraphQl } from '@/app/api/graphqlApi';
import { ProductGetItemDocument } from '@/gql/graphql';
import { formmatMoney } from '@/utils/formatMoney';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/ui/atoms/AddToCartButton';
import { addToCart, getOrCreateCart } from '@/app/api/cart';
import { revalidateTag } from 'next/cache';

export const generateMetadata = async ({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> => {
  const { product } = await executeGraphQl({
    query: ProductGetItemDocument, variables: {
      id: params.productId
    }
  });

  return {
    title: `${product ? product.name : ''}`,
    description: `${product ? product.description : ''}`,
    openGraph: {
      title: `${product ? product.name : ''}`,
      description: `${product ? product.description : ''}`,
      images: [`${product ? product.images[0] : ''}`],
    },
  };
};

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {


  const { product } = await executeGraphQl({
    query: ProductGetItemDocument, variables: {
      id: params.productId
    }
  });

  if (!product) {
    return notFound()
  }

  async function addToCartAction() {
    "use server";
    const cart = await getOrCreateCart();
    await addToCart(cart.id, params.productId);
    revalidateTag("cart")
  }


  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
      {
        product.images[0] &&
        <div className='flex flex-col gap-6 lg:w-2/4'>
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            width={400}
            height={400}
          />
        </div>
      }
      <div className='flex flex-col gap-4 lg:w-2/4'>
        <div>
          {product.categories[0] &&
            <span className=' text-violet-600 font-semibold'>
              {product.categories[0].name}
            </span>
          }
          <h1 className='text-3xl font-bold'>{product.name}</h1>
        </div>
        <p className='text-gray-700'>{product.description}</p>
        <h6 className='text-2xl font-semibold'>
          {formmatMoney(product.price)}
        </h6>
        <div className='flex flex-row items-center gap-12'>
          <div className='flex flex-row items-center'>
            <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl'>
              -
            </button>
            <span className='py-4 px-6 rounded-lg'>amount</span>
            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'>
              +
            </button>
          </div>

          <form action={addToCartAction}>
            <AddToCartButton />
          </form>

        </div>
      </div>
    </div>
  );
}