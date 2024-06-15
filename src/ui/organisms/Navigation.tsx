import { type Route } from 'next';
import { ActiveLink } from '../atoms/ActiveLink';

type LinkType = {
  name: string;
  href: Route;
  id: number;
};

const links: LinkType[] = [
  { name: 'Home', href: '/', id: 1 },
  { name: 'Products', href: '/products', id: 2 },
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
