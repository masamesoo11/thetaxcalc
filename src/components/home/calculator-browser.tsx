'use client';

/**
 * CalculatorBrowser — category-filtered calculator cards for the homepage (A+).
 * ALL cards are always rendered in the SSR DOM (visibility toggled via CSS
 * classes only) so every internal link stays crawlable; the pill bar is a
 * pure presentation-layer filter, per the Task 31 SEO guardrails.
 */

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building,
  Clock,
  DollarSign,
  FileText,
  Gift,
  Home,
  PiggyBank,
  ArrowRightLeft,
  TrendingUp,
  Shield,
  Receipt,
  Ticket,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export interface HomeCardData {
  href: string;
  title: string;
  desc: string;
  badge: string;
  category: 'paycheck' | 'state' | 'finance' | 'business';
  featured?: boolean;
  icon: string;
}

const ICONS: Record<string, LucideIcon> = {
  DollarSign,
  MapPin,
  Home,
  PiggyBank,
  ArrowRightLeft,
  TrendingUp,
  Shield,
  Receipt,
  Clock,
  Gift,
  Building,
  Ticket,
  FileText,
};

interface Category {
  key: 'featured' | 'all' | HomeCardData['category'];
  label: string;
}

export function CalculatorBrowser({ cards }: { cards: HomeCardData[] }) {
  const [active, setActive] = useState<Category['key']>('featured');

  const categories: Category[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'all', label: `All ${cards.length}` },
    { key: 'paycheck', label: 'Paychecks & Income' },
    { key: 'state', label: 'State Calculators' },
    { key: 'finance', label: 'Finance & Retirement' },
    { key: 'business', label: 'Business & Special' },
  ];

  const isVisible = (card: HomeCardData) =>
    active === 'all' ||
    (active === 'featured' ? card.featured === true : card.category === active);

  return (
    <div>
      {/* Filter pills */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Calculator categories"
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={active === cat.key}
            onClick={() => setActive(cat.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === cat.key
                ? 'border-[#8a6a24] bg-[#1c1917] text-white shadow-sm'
                : 'border-[#e7e0d0] bg-white text-[#57534e] hover:border-[#b08d3e]/50 hover:text-[#8a6a24]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards — all rendered, visibility via CSS only (SEO-safe) */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = ICONS[card.icon] ?? DollarSign;
          return (
            <Link
              prefetch={false}
              key={card.href}
              href={card.href}
              className={`group flex flex-col gap-3 rounded-2xl border border-[#e7e0d0] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#b08d3e]/50 hover:shadow-[0_8px_24px_-8px_rgba(138,106,36,0.18)] ${
                isVisible(card) ? '' : 'hidden'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf5e9] text-[#8a6a24]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#faf5e9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8a6a24]">
                  {card.badge}
                </span>
              </div>

              <div>
                <p className="text-base font-semibold text-[#1c1917] transition-colors group-hover:text-[#8a6a24]">
                  {card.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#57534e]">
                  {card.desc}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6a24] transition-all group-hover:gap-3">
                Try Calculator
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
