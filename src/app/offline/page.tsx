import type { Metadata } from 'next';
import Link from 'next/link';
import { WifiOff, Home, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'You are offline — TheTaxCalc',
  description: 'You are currently offline. Reconnect to use TheTaxCalc free 2026 tax calculators.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border/30 bg-card/60 p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
          <WifiOff className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">You&rsquo;re offline</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          It looks like your internet connection dropped. TheTaxCalc needs the network to
          load calculator pages — your connection will return automatically, and any page
          you visited recently may still work.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            Back to homepage
          </Link>
          {/* Empty-action form: submitting reloads the current page — no client JS needed. */}
          <form action="" className="flex w-full">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              Try again
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
