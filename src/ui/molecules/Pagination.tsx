import { ActiveLink } from '../atoms/ActiveLink';

export const Pagination = ({ numberOfPages }: { numberOfPages: number }) => {
  const pages = new Array(numberOfPages).fill(0);
  return (
    <nav aria-label='Page navigation example'>
      <ul className='mt-2 flex justify-center space-x-6'>
        {pages.map((_, idx) => (
          <li key={idx}>
            <ActiveLink href={idx === 0 ? `/products` : `/products/${idx + 1}`}>
              {idx + 1}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
