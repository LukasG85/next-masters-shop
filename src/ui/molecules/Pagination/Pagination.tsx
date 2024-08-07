'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { ActiveLink } from '../../atoms/ActiveLink';
import { Route } from 'next';
import Link from 'next/link';

export const Pagination = ({ numberOfPages }: { numberOfPages: number | null }) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const pages = new Array(numberOfPages).fill(0);

  if (pages.length <= 1) {
    return
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='mt-4 flex justify-center gap-2'>
        {pages.map((_, idx) => (
          <li key={idx}>
            <Link className='w-8 h-8 flex items-center justify-center border border-b border-gray-200 rounded-lg hover:border-gray-600 transition duration-200' href={`${pathName}?page=${idx + 1}` as Route}>
              {idx + 1}
            </Link>
          </li>
        ))}
      </ul> 
    </nav>
  );
};
