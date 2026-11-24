import { Suspense } from 'react';
import Link from 'next/link';
import { signOut } from '@/auth';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-50 px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-2 flex h-20 items-end rounded-md bg-blue-600 p-4 text-white md:h-40"
      >
        <span className="text-xl font-bold">Acme</span>
      </Link>
      <div className="flex grow flex-row gap-2 md:flex-col">
        <Suspense fallback={<div className="h-12 w-full rounded-md bg-gray-50" />}>
          <NavLinks />
        </Suspense>

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-12 w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}