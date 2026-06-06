'use client';

import { useState } from 'react';
import { Quote, Check, Link as LinkIcon } from 'lucide-react';

interface CiteButtonProps {
  title: string;
  /** The section anchor id, e.g. "federal-tax-brackets" */
  sectionId?: string;
}

function buildCitation(title: string): string {
  return `TheTaxCalc. (2026). ${title}. Retrieved from https://thetaxcalc.com/resources`;
}

export function CiteButton({ title, sectionId }: CiteButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCite = async () => {
    const citation = buildCitation(title);
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — do nothing
    }
  };

  const handleCopyLink = async () => {
    const url = sectionId
      ? `https://thetaxcalc.com/resources#${sectionId}`
      : 'https://thetaxcalc.com/resources';
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback — do nothing
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCite}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-muted/20 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
        aria-label={`Cite ${title}`}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Quote className="h-3 w-3" />
            Cite this data
          </>
        )}
      </button>
      {sectionId && (
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-muted/20 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
          aria-label={`Copy link to ${title}`}
        >
          <LinkIcon className="h-3 w-3" />
          Link
        </button>
      )}
    </div>
  );
}
