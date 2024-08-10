import Image from 'next/image';

export const ProductListItemImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <div className='flex justify-center aline-center'>
      <Image src={src} alt={alt} width={200} height={200} />
    </div>
  );
};
