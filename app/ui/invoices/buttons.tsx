import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
    >
      Create Invoice
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-900 hover:bg-gray-100"
    >
      Edit
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button
        type="submit"
        className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
      >
        <span className="sr-only">Delete invoice</span>
        Delete
      </button>
    </form>
  );
}