'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { ActiveLink } from '../atoms/ActiveLink';
import { Route } from 'next';

export const Pagination = ({ numberOfPages }: { numberOfPages: number | null }) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const pages = new Array(numberOfPages).fill(0);

  if (pages.length <= 1) {
    return
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='mt-2 flex justify-center space-x-6'>
        {pages.map((_, idx) => (
          <li key={idx}>
            <ActiveLink href={`${pathName}?page=${idx + 1}` as Route}>
              {idx + 1}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
