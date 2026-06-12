'use client';

import Link from 'next/link';
import { ArrowRightLeft, ArrowRight, Badge } from 'lucide-react';
import { Badge as UIBadge } from '@/components/ui/badge';
import { trackScenarioCTAClick } from '@/lib/analytics';

interface ScenarioCTABannerProps {
  /** Calculator type / component key for analytics tracking */
  calculatorType: string;
  /** Optional state name for contextual label, e.g. "Illinois" */
  stateName?: string;
}

/**
 * Scenario Comparison CTA Banner — shown above ALL calculator forms.
 * Links to the 3 dedicated comparison landing pages for SEO juice.
 * Replaces the need to add ScenarioComparison inside every individual calculator.
 */
export function ScenarioCTABanner({ calculatorType, stateName }: ScenarioCTABannerProps) {
  return (
    <div className="mb-4 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
            <ArrowRightLeft className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                Compare Tax Scenarios
              </h3>
              <UIBadge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400 px-1.5 py-0">
                New
              </UIBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compare up to 4 scenarios side-by-side — different states, 401(k), or job offers
            </p>
          </div>
        </div>
        <Link
          href="/salary-comparison-calculator"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/25 transition-colors shrink-0"
          onClick={() => trackScenarioCTAClick(calculatorType)}
        >
          Start Comparing
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-blue-500/10">
        <Link
          href="/job-offer-comparison-calculator"
          className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[11px] font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
          onClick={() => trackScenarioCTAClick(`${calculatorType}-job-offer-link`)}
        >
          <ArrowRightLeft className="h-3 w-3" />
          Job Offer Comparison
        </Link>
        <Link
          href="/salary-comparison-calculator"
          className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[11px] font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
          onClick={() => trackScenarioCTAClick(`${calculatorType}-salary-link`)}
        >
          Salary by State
        </Link>
        <Link
          href="/paycheck-difference-calculator"
          className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[11px] font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
          onClick={() => trackScenarioCTAClick(`${calculatorType}-paycheck-link`)}
        >
          Paycheck Difference
        </Link>
      </div>
    </div>
  );
}
