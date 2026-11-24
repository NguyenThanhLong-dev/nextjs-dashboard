import { supabase } from './supabase';

export type Revenue = { month: string; revenue: number };

export type LatestInvoice = {
  id: string;
  amount: number;
  customers: { name: string; email: string; image_url: string | null };
};

export async function fetchRevenue(): Promise<Revenue[]> {
  const { data, error } = await supabase.from('revenue').select('*');
  if (error) throw new Error('Failed to fetch revenue');
  const order = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return data.sort((a, b) => order.indexOf(a.month) - order.indexOf(b.month));
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select('id, amount, customers(name, email, image_url)')
    .order('date', { ascending: false })
    .limit(5);
  if (error) throw new Error('Failed to fetch latest invoices');
  return data as unknown as LatestInvoice[];
}
export const ITEMS_PER_PAGE = 6;

export type InvoiceRow = {
  id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
  customers: { name: string; email: string };
};

// bỏ ký tự làm hỏng cú pháp filter của Supabase
function cleanQuery(q: string) {
  return q.replace(/[,()%*\\]/g, '').trim();
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoiceRow[]> {
  const q = cleanQuery(query);
  const from = (currentPage - 1) * ITEMS_PER_PAGE;

  let req = supabase
    .from('invoices')
    .select('id, amount, status, date, customers!inner(name, email)')
    .order('date', { ascending: false })
    .range(from, from + ITEMS_PER_PAGE - 1);

  if (q) {
    req = req.or(`name.ilike.%${q}%,email.ilike.%${q}%`, {
      referencedTable: 'customers',
    });
  }

  const { data, error } = await req;
  if (error) throw new Error('Failed to fetch invoices');
  return data as unknown as InvoiceRow[];
}

export async function fetchInvoicesPages(query: string): Promise<number> {
  const q = cleanQuery(query);

  let req = supabase
    .from('invoices')
    .select('id, customers!inner(name, email)', { count: 'exact', head: true });

  if (q) {
    req = req.or(`name.ilike.%${q}%,email.ilike.%${q}%`, {
      referencedTable: 'customers',
    });
  }

  const { count, error } = await req;
  if (error) throw new Error('Failed to fetch invoice count');
  return Math.max(1, Math.ceil((count ?? 0) / ITEMS_PER_PAGE));
}