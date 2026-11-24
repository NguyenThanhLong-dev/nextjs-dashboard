import { Suspense } from 'react';
import Form from '@/app/ui/invoices/form';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { updateInvoice } from '@/app/lib/actions';
import { lusitana } from '@/app/ui/fonts';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-2xl`}>Edit Invoice</h1>
      <Suspense fallback={<div className="h-80 animate-pulse rounded-md bg-gray-100" />}>
        <EditForm params={params} />
      </Suspense>
    </main>
  );
}

async function EditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
  const updateInvoiceWithId = updateInvoice.bind(null, id);

  return (
    <Form
      customers={customers}
      invoice={invoice}
      action={updateInvoiceWithId}
      submitLabel="Save Changes"
    />
  );
}
