import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DynamicBlogDetail } from './dynamic-blog-detail';
import { SITE_URL } from '@/lib/site-config';

// ─── Static params: blog slugs are discovered at build time via API ──────────

// We use a fixed set of "known" blog slugs for static generation.
// New blog posts will be rendered on-demand via the edge fallback.
// This keeps the Worker bundle small by not importing db directly.

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const dynamicParams = true; // allow on-demand rendering for new slugs

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch metadata from the API route instead of importing db directly
  let post: { title: string; excerpt: string | null; metaTitle: string | null; metaDesc: string | null; tags: string; createdAt: string | null; updatedAt: string | null } | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) {
        post = data;
      }
    }
  } catch {
    // API not available
  }

  if (!post) {
    return { title: 'Post Not Found | TheTaxCalc' };
  }

  const metaTitle = post.metaTitle || `${post.title} | TheTaxCalc`;
  const metaDesc = post.metaDesc || post.excerpt || `Read ${post.title} on TheTaxCalc — expert tax guides and financial tips.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: post.tags ? post.tags.split(',').map((t) => t.trim()) : [],
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
      languages: {
        'en-US': `${SITE_URL}/blog/${slug}`,
        'x-default': `${SITE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'TheTaxCalc',
      type: 'article',
      publishedTime: post.createdAt || undefined,
      modifiedTime: post.updatedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch post data from API to check if it exists and is published
  let post: { title: string; published: boolean; excerpt: string | null; tags: string; createdAt: string | null; updatedAt: string | null } | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) {
        post = data;
      }
    }
  } catch {
    // API not available
  }

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
    keywords: post.tags || '',
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span className="text-muted-foreground/50">/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="truncate text-foreground font-medium max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* Client Component handles all content rendering */}
      <DynamicBlogDetail slug={slug} />
    </div>
  );
}
