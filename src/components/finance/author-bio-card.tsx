import Link from 'next/link';
import { getAuthor } from '@/lib/authors';

interface AuthorBioCardProps {
  authorId: string;
}

/**
 * Author Bio Card — E-E-A-T component for Google quality raters.
 *
 * Displays a compact, visually prominent card with the named author's
 * credentials, verified-expert badge, review date, and data-verification
 * notice. Rendered on calculator and blog pages so that YMYL content is
 * clearly attributed to identifiable, credentialed professionals.
 */
export function AuthorBioCard({ authorId }: AuthorBioCardProps) {
  const author = getAuthor(authorId);

  if (!author) {
    return null;
  }

  return (
    <section
      aria-label={`Author: ${author.name}`}
      className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80 p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        {/* Avatar placeholder with initials */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30">
          {author.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>

        <div className="min-w-0 flex-1">
          {/* Name + credentials badge */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/about#${author.id}`}
              className="text-base font-semibold text-foreground hover:text-emerald-400 transition-colors"
            >
              {author.name}
            </Link>
            <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
              {author.credentials}
            </span>
            {/* Verified Expert badge */}
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400/90 ring-1 ring-emerald-500/20">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Verified Expert
            </span>
          </div>

          {/* Title */}
          <p className="mt-0.5 text-sm text-muted-foreground">
            {author.title}, TheTaxCalc
          </p>

          {/* Bio — truncated to 2 lines */}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">
            {author.bio}
          </p>

          {/* Review date + data verification notice */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/60">
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-3 w-3 text-emerald-500/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              Reviewed: January 2026
            </span>
            <span>
              Tax data verified against IRS Publication 15-T &amp; state revenue departments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
