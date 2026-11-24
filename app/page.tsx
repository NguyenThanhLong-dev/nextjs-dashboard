import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`${lusitana.className} text-3xl md:text-4xl`}>Acme Dashboard</h1>
      <Link href="/dashboard" className="mt-4 w-fit rounded-lg bg-blue-500 px-6 py-3 text-white">
        Vào Dashboard
      </Link>
    </main>
  );
}