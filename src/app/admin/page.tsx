'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy-load admin components to avoid OOM during compilation.
// We use a mounted check to ensure client-side rendering works.
const AdminGate = dynamic(() => import('@/components/finance/admin-gate').then(m => ({ default: m.AdminGate })), { ssr: false });
const AdminDashboard = dynamic(() => import('@/components/finance/admin-dashboard').then(m => ({ default: m.AdminDashboard })), { ssr: false });

const emptySubscribe = () => () => {};

export default function AdminPage() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <AdminGate>
        <AdminDashboard />
      </AdminGate>
    </div>
  );
}
