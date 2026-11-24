import { Suspense } from 'react';import Link from 'next/link';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-50 px-3 py-4 md:px-2">
      <Link href="/" className="mb-2 flex h-20 items-end rounded-md bg-blue-600 p-4 text-white md:h-40">
        <span className="text-xl font-bold">Acme</span>
      </Link>
      <div className="flex grow flex-row gap-2 md:flex-col">
      <Suspense fallback={<div className="h-12 w-full rounded-md bg-gray-50" />}>
  <NavLinks />
</Suspense>
      </div>
    </div>
  );
}