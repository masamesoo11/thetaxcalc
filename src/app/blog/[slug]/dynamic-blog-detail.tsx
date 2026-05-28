'use client';

import dynamic from 'next/dynamic';

const BlogDetailClient = dynamic(
  () => import('./blog-detail-client').then((m) => ({ default: m.BlogDetailClient })),
  { ssr: false }
);

export function DynamicBlogDetail({ slug }: { slug: string }) {
  return <BlogDetailClient slug={slug} />;
}
