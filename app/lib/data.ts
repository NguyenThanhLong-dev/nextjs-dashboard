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