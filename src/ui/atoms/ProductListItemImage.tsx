import Image from 'next/image';

export const ProductListItemImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <div>
      <Image src={src} alt={alt} width={100} height={100} />
    </div>
  );
};
