'use client';

/**
 * StatesTaxTable — searchable 50-state tax table for the homepage (A+).
 * Replaces the old 50-tile link grid with a denser, searchable table.
 * ALL 50 rows are always rendered in the SSR DOM (search filters via CSS
 * classes only) so every /sales-tax-calculator/{state} internal link stays
 * crawlable — Task 31 SEO guardrail.
 */

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export interface StateTaxRow {
  key: string;
  name: string;
  slug: string;
  incomeTaxRate: string;
  salesTaxCombined: string;
  isNoIncomeTax: boolean;
}

export function StatesTaxTable({ rows }: { rows: StateTaxRow[] }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const visibleCount = rows.filter((r) => r.name.toLowerCase().includes(q)).length;

  return (
    <div>
      {/* Search */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8a29e]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your state…"
            aria-label="Search states"
            className="w-full rounded-full border border-[#e7e0d0] bg-white py-3 pl-10 pr-4 text-sm font-medium text-[#1c1917] outline-none transition placeholder:text-[#a8a29e] focus:border-[#b08d3e] focus:ring-2 focus:ring-[#b08d3e]/20"
          />
        </div>
        <p className="text-xs text-[#78716c]" aria-live="polite">
          {q ? `${visibleCount} state${visibleCount === 1 ? '' : 's'} match “${query.trim()}”` : 'All 50 states — combined state + average local sales tax'}
        </p>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#e7e0d0] bg-white">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#fafaf9]">
              <tr className="border-b border-[#e7e0d0] text-left text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                <th scope="col" className="px-4 py-3">State</th>
                <th scope="col" className="px-4 py-3">Income tax</th>
                <th scope="col" className="hidden px-4 py-3 sm:table-cell">Avg sales tax</th>
                <th scope="col" className="px-4 py-3 text-right">
                  <span className="sr-only">Open state page</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const visible = row.name.toLowerCase().includes(q);
                return (
                  <tr
                    key={row.key}
                    className={`border-b border-[#f0ece3] last:border-0 transition-colors hover:bg-[#faf5e9] ${
                      visible ? '' : 'hidden'
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#1c1917]">
                      <Link
                        prefetch={false}
                        href={`/sales-tax-calculator/${row.slug}`}
                        className="transition-colors hover:text-[#8a6a24] hover:underline"
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {row.isNoIncomeTax ? (
                        <span className="rounded-full bg-[#b08d3e]/10 px-2 py-0.5 text-xs font-semibold text-[#8a6a24]">
                          0% — none
                        </span>
                      ) : (
                        <span className="text-[#57534e]">{row.incomeTaxRate}</span>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 tabular-nums text-[#57534e] sm:table-cell">
                      {row.salesTaxCombined}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        prefetch={false}
                        href={`/sales-tax-calculator/${row.slug}`}
                        aria-label={`Open ${row.name} sales tax calculator`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#8a6a24] hover:underline"
                      >
                        Open
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
