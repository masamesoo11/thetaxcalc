'use client';

import { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AdSlotData {
  id: string;
  name: string;
  position: string;
  adType: string;
  adCode: string;
  isActive: boolean;
}

interface AdSlotProps {
  position?: 'after-results' | 'after-form' | 'mid-content' | 'header-banner' | 'sidebar' | 'footer-banner';
  className?: string;
}

export function AdSlot({ position = 'after-results', className = '' }: AdSlotProps) {
  const impressedRef = useRef(false);

  // Fetch active ad for this position
  const { data: ads } = useQuery<AdSlotData[]>({
    queryKey: ['ads', 'active'],
    queryFn: async () => {
      const res = await fetch('/api/ads?active=true');
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const ad = ads?.find((a) => a.position === position && a.isActive);

  // Track impression once per mount
  useEffect(() => {
    if (ad && !impressedRef.current) {
      impressedRef.current = true;
      fetch(`/api/ads/${ad.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incrementImpressions: true }),
      }).catch(() => {});
    }
  }, [ad]);

  // If there's a custom ad code from DB, render it
  if (ad?.adCode) {
    return (
      <div
        className={`my-6 overflow-hidden rounded-xl border border-border/30 glass-card ${className}`}
        data-ad-position={position}
        dangerouslySetInnerHTML={{ __html: ad.adCode }}
      />
    );
  }

  // Default placeholder
  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border border-dashed border-border/30 glass-card hover-lift ${className}`}
      data-ad-position={position}
    >
      <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/40">
          Financial Insights
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground/25">
          Relevant financial offers &amp; tools
        </p>
        <div className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>
    </div>
  );
}
