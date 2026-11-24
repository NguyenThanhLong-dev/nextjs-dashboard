import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] p-4">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}