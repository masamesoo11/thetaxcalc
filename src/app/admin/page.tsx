'use client';

import dynamic from 'next/dynamic';

// Lazy-load admin components entirely on the client side.
// The admin page requires authentication and is entirely client-rendered.
// Using dynamic() with ssr:false for each component to avoid OOM during
// server-side compilation of the heavy admin dashboard.
const AdminGate = dynamic(() => import('@/components/finance/admin-gate').then(m => ({ default: m.AdminGate })), { ssr: false });
const AdminDashboard = dynamic(() => import('@/components/finance/admin-dashboard').then(m => ({ default: m.AdminDashboard })), { ssr: false });

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <AdminGate>
        <AdminDashboard />
      </AdminGate>
    </div>
  );
}
