'use client';

import dynamic from 'next/dynamic';

const BlogListClient = dynamic(
  () => import('./blog-list-client').then((m) => ({ default: m.BlogListClient })),
  { ssr: false }
);

export function DynamicBlogList() {
  return <BlogListClient />;
}
