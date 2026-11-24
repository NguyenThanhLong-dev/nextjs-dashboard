import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const invoices = await fetchLatestInvoices();

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <h2 className="mb-4 text-xl font-semibold">Latest Invoices</h2>
      <ul className="divide-y bg-white">
        {invoices.map((inv) => (
          <li key={inv.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{inv.customers.name}</p>
              <p className="text-sm text-gray-500">{inv.customers.email}</p>
            </div>
            <p className="font-medium">${(inv.amount / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}