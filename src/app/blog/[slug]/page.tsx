export const runtime = 'edge';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { DynamicBlogDetail } from './dynamic-blog-detail';
import { SITE_URL } from '@/lib/site-config';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let post;
  try {
    post = await db.post.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, metaTitle: true, metaDesc: true, tags: true, createdAt: true, updatedAt: true },
    });
  } catch {
    return { title: 'Post Not Found | TheTaxCalc' };
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
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [`${SITE_URL}/opengraph-image`],
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

  let post;
  try {
    post = await db.post.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, category: true, featured: true, tags: true, createdAt: true, updatedAt: true, published: true },
    });
  } catch {
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
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
