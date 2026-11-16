/**
 * Editorial trust note for templated calculator pages (/hourly/* and /salary/*).
 *
 * AdSense / Google quality reviewers can mistake a large set of
 * programmatically generated rate/salary pages for "auto-generated thin
 * content". This small, factual note makes the editorial process visible:
 * the figures are computed from one documented 2026 tax engine and the
 * methodology is public. No invented authors, credentials, or reviews.
 */
import Link from 'next/link';

export function EditorialReviewNote({ subject }: { subject: string }) {
  return (
    <aside
      aria-label="How this page is produced"
      className="rounded-lg border border-emerald-500/20 bg-emerald-600/5 px-4 py-3 text-xs leading-relaxed text-muted-foreground"
    >
      <strong className="font-semibold text-foreground">How this page is produced: </strong>
      Every figure for {subject} is calculated with our documented 2026 tax engine
      (federal brackets, FICA and state tax), checked against IRS publications and
      state revenue departments. See our{' '}
      <Link href="/methodology" className="underline underline-offset-2 hover:text-emerald-600">
        methodology
      </Link>{' '}
      and{' '}
      <Link href="/accuracy-report" className="underline underline-offset-2 hover:text-emerald-600">
        accuracy report
      </Link>
      .
    </aside>
  );
}
