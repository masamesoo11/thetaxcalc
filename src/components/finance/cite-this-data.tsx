'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Quote, Copy, Check, BarChart3 } from 'lucide-react';

interface CiteThisDataProps {
  /** Title of the study/page being cited, e.g. "2026 State Tax Burden Rankings" */
  studyTitle: string;
  /** Short description used inside the citation sentence. */
  description: string;
}

/**
 * Citation box for original research pages — gives journalists, bloggers,
 * and students a ready-to-paste citation (earning the site attribution
 * links) and points developers at the free embeddable widgets instead of
 * scraping.
 */
export function CiteThisData({ studyTitle, description }: CiteThisDataProps) {
  const [copied, setCopied] = useState(false);

  const citation = `TheTaxCalc Editorial Team (${new Date().getFullYear()}). ${studyTitle}: ${description}. TheTaxCalc.com. Retrieved from https://thetaxcalc.com/research`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable — the citation text remains selectable
      setCopied(false);
    }
  };

  return (
    <aside
      aria-label="Cite this data"
      className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <Quote className="h-4 w-4 text-emerald-700" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Cite this data</h2>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Journalist, blogger or student? Our research is free to cite with attribution. Copy the citation
        below — or embed the live calculator instead of scraping the table.
      </p>
      <div className="mt-3 flex items-start gap-2 rounded-lg border border-border/30 bg-card/70 p-3">
        <p className="min-w-0 flex-1 font-mono text-xs leading-relaxed text-foreground select-all">
          {citation}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Citation copied' : 'Copy citation to clipboard'}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/40 text-muted-foreground transition-colors hover:border-emerald-500/40 hover:text-emerald-700"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <Link
        href="/widgets"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-800"
      >
        <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
        Embed our free widgets on your site
      </Link>
    </aside>
  );
}
