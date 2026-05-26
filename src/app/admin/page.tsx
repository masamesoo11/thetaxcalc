import { Metadata } from 'next';
import { AdminGate } from '@/components/finance/admin-gate';
import { AdminDashboard } from '@/components/finance/admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | TaxYield.io',
  description: 'TaxYield.io admin dashboard for managing blog posts, ads, and site settings.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <AdminGate>
        <AdminDashboard />
      </AdminGate>
    </div>
  );
}
