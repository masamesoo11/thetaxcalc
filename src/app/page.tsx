import { Metadata } from 'next';
import { SITE_URL, SITE_HOME_URL } from '@/lib/site-config';
import SEOAuditDashboard from '@/components/seo-audit-dashboard';

// ─── Home Page Metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'SEO Audit Report — thetaxcalc.com',
  description:
    'Comprehensive SEO audit and analysis for thetaxcalc.com — search visibility, technical issues, keyword analysis, competitor comparison, and action plan.',
  alternates: {
    canonical: SITE_HOME_URL,
  },
  openGraph: {
    title: 'SEO Audit: thetaxcalc.com',
    description:
      'Comprehensive SEO audit and analysis for thetaxcalc.com — search visibility, technical issues, keyword analysis, and action plan.',
    url: SITE_HOME_URL,
    siteName: 'TheTaxCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'SEO Audit: thetaxcalc.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Audit: thetaxcalc.com',
    description:
      'Comprehensive SEO audit and analysis for thetaxcalc.com — search visibility, technical issues, keyword analysis, and action plan.',
    images: [`${SITE_URL}/opengraph-image.png`],
  },
};

// ─── Page Component ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return <SEOAuditDashboard />;
}
