import { getProduct } from '@/app/api/getProduct';
import { formmatMoney } from '@/utils/formatMoney';
import type { Metadata } from 'next';
import Image from 'next/image';

export const generateMetadata = async ({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> => {
  const product = await getProduct(params.productId);

  return {
    title: `${product.name}`,
    description: `${product.description}`,
    openGraph: {
      title: `${product.name}`,
      description: `${product.description}`,
      images: [product.image],
    },
  };
};

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
        />
      </div>
      <div className='flex flex-col gap-4 lg:w-2/4'>
        <div>
          <span className=' text-violet-600 font-semibold'>
            {product.category}
          </span>
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
          <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
