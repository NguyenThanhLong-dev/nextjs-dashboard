'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>

        <label htmlFor="email" className="mb-2 mt-5 block text-xs font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
        />

        <label htmlFor="password" className="mb-2 mt-5 block text-xs font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
          className="w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
        />

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          aria-disabled={isPending}
          className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Log in
        </button>

        <div aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}