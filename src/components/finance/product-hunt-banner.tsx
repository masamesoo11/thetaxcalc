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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate mount-time reveal: the banner must stay hidden during SSR/hydration (dismissed starts true) and can only be shown after mount, reading localStorage
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  if (dismissed) return null;

  return (
    <div className="relative z-[200] bg-[#0c0a09] text-[#f5f5f4]">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-sm font-medium">
          <Rocket className="h-4 w-4 shrink-0 text-[#c9a961]" />
          <span>
            We&apos;re live on <strong className="text-[#c9a961]">Product Hunt</strong>! Support us with an upvote 🚀
          </span>
          <a
            href={PH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#c9a961] to-[#b08d3e] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0c0a09] transition-all hover:from-[#d4b673] hover:to-[#c9a961] hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M13.602 8.426l-2.5-4.33a1 1 0 00-1.732 0L4.28 12.868a1 1 0 00.866 1.5h5.004l-2.5 4.33a1 1 0 001.732 1l5.22-9.042a1 1 0 00-.866-1.5H8.736l2.5-4.33 2.366 4.1z"/>
            </svg>
            Vote Now
          </a>
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#a8a29e] hover:text-[#f5f5f4] hover:bg-white/10 transition-all"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
