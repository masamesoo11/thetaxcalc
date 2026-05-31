import { SALARY_AMOUNTS, formatSalaryCompact } from '@/lib/salary-calculations';
import { COMPARISON_SLUGS, COMPARE_STATES, parseComparisonSlug } from '@/lib/compare-config';
import { getPublishedPostsMeta } from '@/lib/blog-index';

/**
 * SeoNavigation — Server Component
 *
 * Renders ALL internal site links using plain <a> tags (not Next.js <Link>).
 * This guarantees that crawlers (Google, Bing, etc.) can discover every page
 * on the site from the static HTML, regardless of JavaScript rendering.
 *
 * This component is server-rendered and included in the root layout,
 * appearing above the footer on every page.
 */
export function SeoNavigation() {
  const blogPosts = getPublishedPostsMeta();

  return (
    <nav aria-label="Site navigation" className="border-t border-border/20 bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          Explore TheTaxCalc — All Tools, Resources & Guides
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Tax Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Tax Calculators
            </h3>
            <ul className="space-y-1.5">
              <li><a href="/paycheck-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Paycheck Calculator</a></li>
              <li><a href="/illinois-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Illinois Tax Calculator (4.95%)</a></li>
              <li><a href="/texas-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Texas Tax Calculator (0%)</a></li>
              <li><a href="/florida-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Florida Tax Calculator (0%)</a></li>
              <li><a href="/california-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">California Tax Calculator (1%–13.3%)</a></li>
              <li><a href="/new-york-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">New York Tax Calculator (4%–10.9%)</a></li>
              <li><a href="/mortgage-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Mortgage Calculator</a></li>
              <li><a href="/401k-retirement-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">401(k) Retirement Calculator</a></li>
              <li><a href="/capital-gains-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Capital Gains Tax Calculator</a></li>
              <li><a href="/self-employment-tax-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Self-Employment Tax Calculator</a></li>
              <li><a href="/tax-refund-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Tax Refund Calculator</a></li>
              <li><a href="/relocation-calculator" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Relocation Calculator</a></li>
            </ul>
          </div>

          {/* Column 2: Salary After Tax */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Salary After Tax
            </h3>
            <ul className="space-y-1.5">
              <li><a href="/salary" className="text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors">All 26 Salary Levels</a></li>
              {SALARY_AMOUNTS.slice(0, 10).map((amount) => (
                <li key={amount}>
                  <a href={`/salary/${amount}`} className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                    {formatSalaryCompact(amount)} After Tax
                  </a>
                </li>
              ))}
              {SALARY_AMOUNTS.length > 10 && (
                <li className="text-xs text-muted-foreground/50 pl-2">
                  + {SALARY_AMOUNTS.length - 10} more salary levels
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Comparisons & Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              State Comparisons & Resources
            </h3>
            <ul className="space-y-1.5">
              <li><a href="/compare" className="text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors">Compare State Taxes</a></li>
              {COMPARISON_SLUGS.map((slug) => {
                const parsed = parseComparisonSlug(slug);
                if (!parsed) return null;
                const [key1, key2] = parsed;
                const s1 = COMPARE_STATES[key1];
                const s2 = COMPARE_STATES[key2];
                return (
                  <li key={slug}>
                    <a href={`/compare/${slug}`} className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                      {s1.name} vs {s2.name} Taxes
                    </a>
                  </li>
                );
              })}
              <li className="mt-3 pt-3 border-t border-border/10">
                <a href="/federal-tax-brackets" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">2026 Federal Tax Brackets</a>
              </li>
              <li><a href="/glossary" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Tax Glossary (25+ Terms)</a></li>
            </ul>
          </div>

          {/* Column 4: Blog & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Tax Guides & Blog
            </h3>
            <ul className="space-y-1.5">
              <li><a href="/blog" className="text-sm text-emerald-400 font-medium hover:text-emerald-300 transition-colors">All Blog Articles</a></li>
              {blogPosts.slice(0, 8).map((post) => (
                <li key={post.slug}>
                  <a href={`/blog/${post.slug}`} className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors line-clamp-1">
                    {post.title}
                  </a>
                </li>
              ))}
              <li className="mt-3 pt-3 border-t border-border/10">
                <a href="/about" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">About TheTaxCalc</a>
              </li>
              <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom: All salary links for comprehensive crawling */}
        <div className="mt-6 pt-6 border-t border-border/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            All Salary After Tax Pages
          </h3>
          <div className="flex flex-wrap gap-2">
            {SALARY_AMOUNTS.map((amount) => (
              <a
                key={amount}
                href={`/salary/${amount}`}
                className="inline-flex items-center rounded border border-border/30 bg-background/50 px-2.5 py-1 text-xs text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
              >
                {formatSalaryCompact(amount)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
