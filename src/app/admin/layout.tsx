import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | TheTaxCalc',
  description: 'Internal admin dashboard for TheTaxCalc.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
