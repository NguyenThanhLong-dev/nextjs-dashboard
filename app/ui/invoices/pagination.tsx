'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const base = 'rounded-md border px-4 py-2 text-sm';
  const disabled = `${base} pointer-events-none border-gray-200 text-gray-400`;
  const enabled = `${base} border-gray-300 text-gray-900 hover:bg-gray-100`;

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Link
        href={createPageURL(currentPage - 1)}
        className={currentPage <= 1 ? disabled : enabled}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageURL(currentPage + 1)}
        className={currentPage >= totalPages ? disabled : enabled}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}