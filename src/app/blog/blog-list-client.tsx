'use client';

import { useRouter } from 'next/navigation';
import { BlogList } from '@/components/finance/blog-list';

export function BlogListClient() {
  const router = useRouter();

  const handleNavigate = (hash: string) => {
    // Convert hash-based blog navigation to proper routes
    if (hash.startsWith('blog/')) {
      const slug = hash.slice(5);
      router.push(`/blog/${slug}`);
    } else if (hash === 'blog') {
      router.push('/blog');
    } else {
      // Calculator navigation — convert hash key to slug
      router.push(`/${hash}`);
    }
  };

  return <BlogList onNavigate={handleNavigate} />;
}
