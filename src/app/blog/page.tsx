import { Metadata } from 'next';
import { Breadcrumb } from '@/components/finance/breadcrumb';
import { DynamicBlogList } from './dynamic-blog-list';
import { SITE_URL } from '@/lib/site-config';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Tax Blog — Guides, Tips & News | TheTaxCalc',
  description:
    'Expert tax guides, state-by-state comparisons, and financial tips to help you keep more of your money. Updated for 2026 tax laws.',
  keywords: [
    'tax blog', 'tax tips', 'tax guide', 'tax news',
    'state tax comparison', 'tax planning', 'financial tips',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'en-US': `${SITE_URL}/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'TheTaxCalc Blog — Expert Tax Guides & Tips',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips for 2026.',
    url: `${SITE_URL}/blog`,
    siteName: 'TheTaxCalc',
    type: 'website',
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TheTaxCalc Blog',
    description: 'Expert tax guides, state-by-state comparisons, and financial tips from TheTaxCalc.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Blog' }]} />

      {/* H1 & Intro */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Let&apos;s Talk <span className="text-emerald-400">Taxes</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Look, taxes are confusing. We&apos;ve stared at our own pay stubs and thought &ldquo;wait, they
          took <em>how</em> much?&rdquo; That&apos;s exactly why we write these articles — to make sense of the
          stuff the IRS makes complicated on purpose. State income tax got you down? Wondering if
          you&apos;d save a fortune by moving to Florida or Texas? We break it all down without the
          jargon. Updated for 2026, because yeah, the rules keep changing.
        </p>
      </div>

      {/* Client Component handles all post listing and filtering */}
      <DynamicBlogList />
    </div>
  );
}
