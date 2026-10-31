import Link from 'next/link';
import { getAuthor } from '@/lib/authors';

interface AuthorBioCardProps {
  authorId: string;
  /** 'ink' renders a dark-glass version for dark sections (e.g. the
   * homepage's dark closing band); default 'light' suits the A+ light theme. */
  variant?: 'light' | 'ink';
}

/**
 * Author Bio Card — E-E-A-T component for Google quality raters.
 *
 * Displays a compact, visually prominent card attributing content to the
 * TheTaxCalc Editorial Team, with a data-review date and a source
 * verification notice. Rendered on calculator and blog pages so that YMYL
 * content is clearly attributed and its data provenance is visible.
 */
export function AuthorBioCard({ authorId, variant = 'light' }: AuthorBioCardProps) {
  const author = getAuthor(authorId);

  if (!author) {
    return null;
  }

  const ink = variant === 'ink';

  return (
    <section
      aria-label={`Author: ${author.name}`}
      className={`rounded-xl border p-5 sm:p-6 ${
        ink
          ? 'border-[#c9a961]/25 bg-white/[0.04]'
          : 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card/80'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Author photo or initials fallback */}
        {author.image ? (
          <img
            src={author.image}
            alt={author.credentials ? `${author.name}, ${author.credentials}` : author.name}
            width={48}
            height={48}
            className={`h-12 w-12 shrink-0 rounded-full object-cover ring-1 ${ink ? 'ring-[#c9a961]/40' : 'ring-emerald-500/30'}`}
            loading="lazy"
          />
        ) : (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1 ${ink ? 'bg-[#c9a961]/15 text-[#c9a961] ring-[#c9a961]/30' : 'bg-emerald-600/15 text-emerald-600 ring-emerald-500/30'}`}>
            {author.initials ||
              author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Name + credentials badge */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/about#${author.id}`}
              className={`text-base font-semibold transition-colors ${ink ? 'text-stone-100 hover:text-[#c9a961]' : 'text-foreground hover:text-emerald-600'}`}
            >
              {author.name}
            </Link>
            {author.credentials ? (
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${ink ? 'bg-[#c9a961]/15 text-[#c9a961] ring-[#c9a961]/25' : 'bg-emerald-600/15 text-emerald-600 ring-emerald-500/25'}`}>
                {author.credentials}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <p className={`mt-0.5 text-sm ${ink ? 'text-stone-400' : 'text-muted-foreground'}`}>
            {author.title}, TheTaxCalc
          </p>

          {/* Bio — truncated to 2 lines */}
          <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${ink ? 'text-stone-400' : 'text-muted-foreground'}`}>
            {author.bio}
          </p>

          {/* Review date + data verification notice */}
          <div className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${ink ? 'text-stone-400' : 'text-muted-foreground'}`}>
            <span className="inline-flex items-center gap-1">
              <svg
                className={`h-3 w-3 ${ink ? 'text-[#c9a961]/70' : 'text-emerald-700/60'}`}
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
              Reviewed: October 2026
            </span>
            <span>
              Tax data verified against IRS publications &amp; state revenue departments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
