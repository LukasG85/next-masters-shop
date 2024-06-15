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
  // className?: string;
  // activeClassName?: string;
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
      className={clsx(`text-blue-400 hover:text-blue-600`, {
        underline: isActive,
      })}
      aria-current={isActive}
    >
      {children}
    </Link>
  );
};
