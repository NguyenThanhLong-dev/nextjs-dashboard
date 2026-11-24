
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const max = Math.max(
    0,
    ...revenue.map((r) => Number(r.revenue) || 0)
  );

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Revenue
      </h2>

      {revenue.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-gray-500">
          No revenue data available.
        </div>
      ) : (
        <div className="flex h-48 items-end gap-2">
          {revenue.map((r) => {
            const value = Number(r.revenue) || 0;
            const height =
              max > 0 ? (value / max) * 100 : 0;

            return (
              <div
                key={r.month}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
              >
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t bg-blue-300"
                    style={{ height: `${height}%` }}
                    title={`${r.month}: ${value}`}
                  />
                </div>

                <span className="text-xs text-gray-500">
                  {r.month}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
