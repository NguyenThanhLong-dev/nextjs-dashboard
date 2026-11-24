'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, DocumentDuplicateIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
  'flex h-12 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start',
  pathname === link.href
    ? 'bg-sky-100 text-blue-600'
    : 'bg-gray-100 text-gray-900 hover:bg-sky-100 hover:text-blue-600',
)}
          >
            <Icon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}