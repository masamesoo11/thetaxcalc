export const runtime = 'edge';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { SITE_URL } from '@/lib/site-config';
import {
  getCompareConfig,
} from '@/lib/compare-config';
import { DynamicComparePage } from './dynamic-compare-page';

// ─── Per-Page Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ states: string }>;
}): Promise<Metadata> {
  const { states } = await params;
  const config = getCompareConfig(states);

  if (!config) {
    return { title: 'Comparison Not Found | TheTaxCalc' };
  }

  const baseUrl = SITE_URL;
  const canonicalPath = `/compare/${states}`;

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
    authors: [{ name: 'TheTaxCalc' }],
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        'en-US': `${baseUrl}${canonicalPath}`,
        'x-default': `${baseUrl}${canonicalPath}`,
      },
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
    },
  };
}

// ─── Server Component Page ───────────────────────────────────────────────────

export default async function CompareStatesPage({
  params,
}: {
  params: Promise<{ states: string }>;
}) {
  const { states } = await params;
  const config = getCompareConfig(states);

  if (!config) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        <a href="/compare" className="hover:text-foreground transition-colors">Comparisons</a>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        <span className="text-foreground font-medium">{config.state1.name} vs {config.state2.name}</span>
      </nav>

      {/* Client Component handles all rendering */}
      <DynamicComparePage states={states} />
    </div>
  );
}
