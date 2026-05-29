'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We couldn&apos;t load the blog content. This might be a temporary issue.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
