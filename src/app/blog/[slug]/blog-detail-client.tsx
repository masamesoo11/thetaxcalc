'use client';

import { useRouter } from 'next/navigation';
import { BlogDetail } from '@/components/finance/blog-detail';

export function BlogDetailClient({ slug }: { slug: string }) {
  const router = useRouter();

  const handleNavigate = (hash: string) => {
    if (hash.startsWith('blog/')) {
      const blogSlug = hash.slice(5);
      router.push(`/blog/${blogSlug}`);
    } else if (hash === 'blog') {
      router.push('/blog');
    } else {
      router.push(`/${hash}`);
    }
  };

  return <BlogDetail slug={slug} onNavigate={handleNavigate} />;
}
