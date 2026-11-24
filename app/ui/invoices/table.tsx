import { fetchFilteredInvoices } from '@/app/lib/data';
import { UpdateInvoice, DeleteInvoice } from './buttons';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-gray-50 p-2">
      <table className="min-w-full text-left text-sm text-gray-900">
        <thead className="text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b last:border-none">
              <td className="px-4 py-3">{inv.customers.name}</td>
              <td className="px-4 py-3">{inv.customers.email}</td>
              <td className="px-4 py-3">${(inv.amount / 100).toFixed(2)}</td>
              <td className="px-4 py-3">{inv.date}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    inv.status === 'paid'
                      ? 'rounded-full bg-green-500 px-2 py-1 text-xs text-white'
                      : 'rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700'
                  }
                >
                  {inv.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <UpdateInvoice id={inv.id} />
                  <DeleteInvoice id={inv.id} />
                </div>
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No invoices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}