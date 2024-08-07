'use client'

import { ActiveLink } from '../../atoms/ActiveLink';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
type CustomRoute = '/' | '/products' | '/products/t-shirts' | '/products/hoodies' | '/products/accessories';


type LinkType = {
  name: string;
  href: CustomRoute;
  id: number;
};

export const links: LinkType[] = [
  { name: 'Products', href: '/products', id: 1 },
  { name: 'T-Shirt', href: '/products/t-shirts', id: 2 },
  { name: 'Hoodies', href: '/products/hoodies', id: 3 },
  { name: 'Accessories', href: '/products/accessories', id: 4 },
];

type NavigationProps = {
  cartCount: number
}


export const Navigation = ({cartCount}: NavigationProps) => {
  return (
  <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
        <h3 className="font-bold text-2xl"><Link href='/'>Next Shop</Link></h3>
      <input type="checkbox" id="check" />

      <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">

      <div className='flex flex-col md:flex-row items-center gap-4'>
        {links.map((link) => (
          <ActiveLink exact key={link.id} href={link.href}>
            {link.name}
          </ActiveLink>
        ))}

          <Link href='/cart' className='group flex items-center p2'>
            <ShoppingCart className="h-6 w-6 flex-shrink-0" aria-hidden='true' />
            <span className="ml-2 text-sm font-medium">{cartCount}</span>
            <span className="sr-only">items in cart, view bag</span>
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </div>
      <label htmlFor="check" className="close-menu">X</label>
      </span>
      <label htmlFor="check" className="open-menu">Menu</label>
    </div>
  </nav>
  );
};




