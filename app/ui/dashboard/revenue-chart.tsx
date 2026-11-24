import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const max = Math.max(...revenue.map((r) => r.revenue));

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <h2 className="mb-4 text-xl font-semibold">Recent Revenue</h2>
      <div className="flex h-48 items-end gap-2">
        {revenue.map((r) => (
          <div key={r.month} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-blue-300"
              style={{ height: `${(r.revenue / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500">{r.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}