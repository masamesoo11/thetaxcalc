'use client';

/**
 * Calculators Hub explorer — instant client-side search + category filter
 * over the full calculator directory. Receives the (pre-sorted, featured-first)
 * tool list as props from the server so the registry data stays server-side.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowRightLeft,
  Briefcase,
  Building2,
  Calculator,
  Clock,
  DollarSign,
  FileText,
  Home,
  Key,
  Landmark,
  Layers,
  MapPin,
  Percent,
  PiggyBank,
  Receipt,
  Scale,
  Search,
  Shield,
  Sparkles,
  Split,
  TrendingUp,
  X,
} from 'lucide-react';
import type { HubCalculator, HubCategory } from '@/lib/calculators-hub-data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  clock: Clock,
  percent: Percent,
  file: FileText,
  receipt: Receipt,
  sparkles: Sparkles,
  swap: ArrowRightLeft,
  home: Home,
  landmark: Landmark,
  piggy: PiggyBank,
  trending: TrendingUp,
  shield: Shield,
  briefcase: Briefcase,
  key: Key,
  scale: Scale,
  split: Split,
  layers: Layers,
  building: Building2,
  pin: MapPin,
  calculator: Calculator,
};

export interface CalculatorsExplorerProps {
  items: HubCalculator[];
  /** Ordered chips: [{ id, label }] with 'all' first. */
  categories: { id: HubCategory | 'all'; label: string; count: number }[];
}

export function CalculatorsExplorer({ items, categories }: CalculatorsExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<HubCategory | 'all'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      if (!q) return true;
      return (
        item.label.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q)
      );
    });
  }, [items, query, activeCategory]);

  return (
    <section aria-label="Calculator directory">
      <h2 className="sr-only">Calculator directory — search &amp; filter</h2>
      {/* Search + filter bar */}
      <div className="rounded-2xl border border-border/30 bg-card/50 p-4 sm:p-5 shadow-sm">
        <div className="relative">
          <label htmlFor="calculator-search" className="sr-only">
            Search tax calculators
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            id="calculator-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setQuery('');
            }}
            placeholder={`Search ${items.length}+ calculators — try “paycheck”, “Texas”, “mortgage”…`}
            className="w-full rounded-xl border border-border/40 bg-background py-3.5 pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto custom-scrollbar pb-1" role="group" aria-label="Filter by category">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                    : 'border-border/40 bg-background text-muted-foreground hover:border-emerald-600/40 hover:text-foreground'
                }`}
              >
                {cat.label}
                <span
                  className={`ml-1.5 text-xs ${isActive ? 'text-emerald-100' : 'text-muted-foreground/60'}`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {query
          ? `${results.length} result${results.length !== 1 ? 's' : ''} for “${query}”`
          : `Showing ${results.length} free calculators`}
      </p>

      {/* Results grid */}
      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border/30 bg-card/50 py-16 text-center">
          <Search className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-lg font-semibold text-foreground">No calculators found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different term — state name, “paycheck”, “mortgage”, “bonus”…
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
            className="mt-5 rounded-lg border border-emerald-600/40 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-600/10 transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((item) => {
            const Icon = ICONS[item.icon] ?? Calculator;
            return (
              <Link
                key={item.href}
                prefetch={false}
                href={item.href}
                className="group relative flex flex-col rounded-xl border border-border/30 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-card"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 group-hover:bg-emerald-600/15 transition-colors">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold leading-tight text-foreground group-hover:text-emerald-700 transition-colors">
                  {item.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
