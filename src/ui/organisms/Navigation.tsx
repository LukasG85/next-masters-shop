import { type Route } from 'next';
import { ActiveLink } from '../atoms/ActiveLink';

type CustomRoute = '/' | '/products' | '/products/t-shirts' | '/products/hoodies' | '/products/accessories';


type LinkType = {
  name: string;
  href: CustomRoute;
  id: number;
};

const links: LinkType[] = [
  { name: 'Home', href: '/', id: 1 },
  { name: 'Products', href: '/products', id: 2 },
  { name: 'T-Shirt', href: '/products/t-shirts', id: 3 },
  { name: 'Hoodies', href: '/products/hoodies', id: 4 },
  { name: 'Accessories', href: '/products/accessories', id: 5 },
];

export const Navigation = () => {
  return (
    <nav>
      <ul className='mt-2 flex justify-center space-x-6'>
        {links.map((link) => (
          <ActiveLink exact key={link.id} href={link.href}>
            {link.name}
          </ActiveLink>
        ))}
      </ul>
    </nav>
  );
};
