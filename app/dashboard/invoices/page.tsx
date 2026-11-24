import { Suspense } from 'react';
import Search from '@/app/ui/search';
import InvoicesTable from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

type SearchParams = Promise<{ query?: string; page?: string }>;

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-4 text-2xl`}>Invoices</h1>
      <Suspense>
        <Search placeholder="Search by customer name or email..." />
      </Suspense>
      <Suspense fallback={<div className="mt-6 h-64 animate-pulse rounded-lg bg-gray-100" />}>
        <InvoicesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function InvoicesContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <InvoicesTable query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}