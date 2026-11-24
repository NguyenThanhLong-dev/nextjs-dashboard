import { Suspense } from 'react';
import Form from '@/app/ui/invoices/form';
import { fetchCustomers } from '@/app/lib/data';
import { createInvoice } from '@/app/lib/actions';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-2xl`}>Create Invoice</h1>
      <Suspense fallback={<div className="h-80 animate-pulse rounded-md bg-gray-100" />}>
        <CreateForm />
      </Suspense>
    </main>
  );
}

async function CreateForm() {
  const customers = await fetchCustomers();
  return <Form customers={customers} action={createInvoice} submitLabel="Create Invoice" />;
}