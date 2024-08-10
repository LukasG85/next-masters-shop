'use client';
import Link from 'next/link';
import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import type { Route } from 'next';

type ActiveLinkProps<T extends string> = {
  href: Route<T>;
  children: ReactNode;
  exact?: boolean;
};

export const ActiveLink = <T extends string>({
  href,
  children,
  exact,
}: ActiveLinkProps<T>) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(`text-black-400 hover:text-black-600 `, {
        underline: isActive,
      })}
      aria-current={isActive}
    >
      {children}
    </Link>
  );
};
