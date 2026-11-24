'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from './supabase';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  customerId: z.string().min(1, { message: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { message: 'Please select an invoice status.' }),
});

function validate(formData: FormData) {
  const parsed = FormSchema.safeParse({
    customerId: formData.get('customerId') ?? '',
    amount: formData.get('amount') ?? '',
    status: formData.get('status') ?? '',
  });

  if (parsed.success) return { data: parsed.data };

  const errors: NonNullable<State['errors']> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof typeof errors;
    (errors[key] ??= []).push(issue.message);
  }
  return { errors };
}

export async function createInvoice(prevState: State, formData: FormData): Promise<State> {
  const result = validate(formData);
  if (!result.data) {
    return { errors: result.errors, message: 'Missing or invalid fields. Failed to create invoice.' };
  }

  const { customerId, amount, status } = result.data;
  const { error } = await supabase.from('invoices').insert({
    customer_id: customerId,
    amount: Math.round(amount * 100), // lưu bằng cents
    status,
    date: new Date().toISOString().split('T')[0],
  });

  if (error) return { message: 'Database error: failed to create invoice.' };

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const result = validate(formData);
  if (!result.data) {
    return { errors: result.errors, message: 'Missing or invalid fields. Failed to update invoice.' };
  }

  const { customerId, amount, status } = result.data;
  const { error } = await supabase
    .from('invoices')
    .update({
      customer_id: customerId,
      amount: Math.round(amount * 100),
      status,
    })
    .eq('id', id);

  if (error) return { message: 'Database error: failed to update invoice.' };

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase.from('invoices').delete().eq('id', id);
  if (error) throw new Error('Failed to delete invoice.');
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}