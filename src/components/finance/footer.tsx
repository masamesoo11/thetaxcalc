'use client';

import { DollarSign } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white">
              <DollarSign className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              TaxYield<span className="text-emerald-400">.io</span>
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} TaxYield.io — Precision paycheck &amp; mortgage calculators.
            All calculations are estimates for informational purposes only and should not replace
            professional tax advice. Tax laws change; always verify with the IRS and your state
            revenue department.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>2026 Tax Data</span>
            <span>•</span>
            <span>Secure &amp; Private</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
