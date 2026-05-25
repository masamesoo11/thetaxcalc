'use client';

interface AdSlotProps {
  position?: 'after-results' | 'after-form' | 'mid-content';
  className?: string;
}

export function AdSlot({ position = 'after-results', className = '' }: AdSlotProps) {
  return (
    <div
      className={`financial-insights-node my-6 overflow-hidden rounded-xl border border-dashed border-border/50 bg-muted/20 ${className}`}
      data-ad-position={position}
    >
      <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          Financial Insights
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground/40">
          Relevant financial offers &amp; tools
        </p>
      </div>
    </div>
  );
}
