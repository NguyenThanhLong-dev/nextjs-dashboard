'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { CustomerField, InvoiceForm } from '@/app/lib/data';
import type { State } from '@/app/lib/actions';

type Action = (prevState: State, formData: FormData) => Promise<State>;

const inputClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900';

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default function Form({
  customers,
  invoice,
  action,
  submitLabel,
}: {
  customers: CustomerField[];
  invoice?: InvoiceForm;
  action: Action;
  submitLabel: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="rounded-md bg-gray-50 p-6">
      <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium text-gray-900">
          Choose customer
        </label>
        <select
          id="customer"
          name="customerId"
          className={inputClass}
          defaultValue={invoice?.customer_id ?? ''}
          aria-describedby="customer-error"
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <FieldErrors id="customer-error" errors={state.errors?.customerId} />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900">
          Amount (USD)
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder="Enter USD amount"
          defaultValue={invoice?.amount}
          className={inputClass}
          aria-describedby="amount-error"
        />
        <FieldErrors id="amount-error" errors={state.errors?.amount} />
      </div>

      <fieldset className="mb-4">
        <legend className="mb-2 block text-sm font-medium text-gray-900">
          Set the invoice status
        </legend>
        <div className="flex gap-6 text-sm text-gray-900" aria-describedby="status-error">
          <label htmlFor="pending" className="flex items-center gap-2">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              defaultChecked={invoice?.status === 'pending'}
            />
            Pending
          </label>
          <label htmlFor="paid" className="flex items-center gap-2">
            <input
              id="paid"
              name="status"
              type="radio"
              value="paid"
              defaultChecked={invoice?.status === 'paid'}
            />
            Paid
          </label>
        </div>
        <FieldErrors id="status-error" errors={state.errors?.status} />
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {state.message && <p className="mb-4 text-sm text-red-500">{state.message}</p>}
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}