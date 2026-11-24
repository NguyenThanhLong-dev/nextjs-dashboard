'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Invoices', href: '/dashboard/invoices' },
  { name: 'Customers', href: '/dashboard/customers' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-12 items-center gap-2 rounded-md p-3 text-sm font-medium',
            {
              'bg-sky-100 text-blue-600': pathname === link.href,
              'bg-gray-50 hover:bg-sky-100 hover:text-blue-600': pathname !== link.href,
            },
          )}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </>
  );
}
