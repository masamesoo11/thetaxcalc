'use client';

import { useState, useEffect } from 'react';
import { X, Rocket } from 'lucide-react';

const PH_URL = 'https://www.producthunt.com/products/thetaxcalc?launch=thetaxcalc';
const STORAGE_KEY = 'ph-banner-dismissed';

export function ProductHuntBanner() {
  const [dismissed, setDismissed] = useState(true); // Start hidden for SSR hydration

  useEffect(() => {
    // Only show if not previously dismissed
    const wasDismissed = localStorage.getItem(STORAGE_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  if (dismissed) return null;

  return (
    <div className="relative z-[200] bg-gradient-to-r from-[#DA552F] via-[#FF6154] to-[#DA552F] text-white">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-sm font-medium">
          <Rocket className="h-4 w-4 shrink-0 animate-pulse" />
          <span>
            We&apos;re live on <strong>Product Hunt</strong>! Support us with an upvote 🚀
          </span>
          <a
            href={PH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-white/30 transition-all hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M13.602 8.426l-2.5-4.33a1 1 0 00-1.732 0L4.28 12.868a1 1 0 00.866 1.5h5.004l-2.5 4.33a1 1 0 001.732 1l5.22-9.042a1 1 0 00-.866-1.5H8.736l2.5-4.33 2.366 4.1z"/>
            </svg>
            Vote Now
          </a>
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
