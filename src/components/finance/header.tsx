'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Home,
  MapPin,
  DollarSign,
  Menu,
  X,
  PiggyBank,
  ArrowRightLeft,
  BookOpen,
  Shield,
  TrendingUp,
  ChevronDown,
  Zap,
  BarChart3,
  Globe,
  Receipt,
  Clock,
  FileText,
  Code2,
  Search,
  Landmark,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPONENT_KEY_TO_SLUG } from '@/lib/calculator-routes';

// ─── Calculator Items organized by category ─────────────────────────────────

const CALC_CATEGORIES = [
  {
    id: 'income',
    label: 'Income Tax',
    icon: DollarSign,
    items: [
      { key: 'home', href: '/paycheck-calculator', label: 'Paycheck Calculator', desc: 'Take-home pay' },
      { key: 'self-employment', href: '/self-employment-tax-calculator', label: 'Self-Employment', desc: '15.3% SE tax' },
      { key: 'irs-withholding', href: '/irs-withholding-calculator', label: 'IRS Withholding', desc: 'W-4 optimization' },
      { key: 'overtime', href: '/overtime-tax-calculator', label: 'Overtime Tax', desc: 'No-tax OT savings' },
      { key: 'bonus-tax', href: '/bonus-tax-calculator', label: 'Bonus Tax', desc: '22% flat vs aggregate' },
      { key: 'lottery', href: '/lottery-tax-calculator', label: 'Lottery Tax', desc: 'After-tax winnings' },
    ],
  },
  {
    id: 'compare',
    label: 'Compare',
    icon: ArrowRightLeft,
    items: [
      { key: 'job-offer', href: '/job-offer-comparison-calculator', label: 'Job Offer Comparison', desc: 'Which offer pays more?' },
      { key: 'salary-compare', href: '/salary-comparison-calculator', label: 'Salary Comparison', desc: 'After-tax by state' },
      { key: 'paycheck-diff', href: '/paycheck-difference-calculator', label: 'Paycheck Difference', desc: 'State vs state' },
    ],
  },
  {
    id: 'state',
    label: 'By State',
    icon: MapPin,
    items: [
      { key: 'illinois', href: '/illinois-tax-calculator', label: 'Illinois', desc: '4.95% flat' },
      { key: 'texas', href: '/texas-tax-calculator', label: 'Texas', desc: '0% income tax' },
      { key: 'florida', href: '/florida-tax-calculator', label: 'Florida', desc: '0% income tax' },
      { key: 'california', href: '/california-tax-calculator', label: 'California', desc: '1%–13.3%' },
      { key: 'newyork', href: '/new-york-tax-calculator', label: 'New York', desc: '4%–10.9%' },
      { key: 'georgia', href: '/georgia-tax-calculator', label: 'Georgia', desc: '5.49% flat' },
      { key: 'virginia', href: '/virginia-tax-calculator', label: 'Virginia', desc: '2%–5.75%' },
      { key: 'northcarolina', href: '/north-carolina-tax-calculator', label: 'North Carolina', desc: '4.5% flat' },
      { key: 'pennsylvania', href: '/pennsylvania-tax-calculator', label: 'Pennsylvania', desc: '3.07% flat' },
      { key: 'ohio', href: '/ohio-tax-calculator', label: 'Ohio', desc: '0%–3.99%' },
      { key: 'michigan', href: '/michigan-tax-calculator', label: 'Michigan', desc: '4.25% flat' },
      { key: 'newjersey', href: '/new-jersey-tax-calculator', label: 'New Jersey', desc: '1.4%–10.75%' },
      { key: 'colorado', href: '/colorado-tax-calculator', label: 'Colorado', desc: '4.4% flat' },
      { key: 'arizona', href: '/arizona-tax-calculator', label: 'Arizona', desc: '2.5% flat' },
      { key: 'washington', href: '/washington-tax-calculator', label: 'Washington', desc: '0% income tax' },
      { key: 'massachusetts', href: '/massachusetts-tax-calculator', label: 'Massachusetts', desc: '5%/9% over $1M' },
      { key: 'indiana', href: '/indiana-tax-calculator', label: 'Indiana', desc: '3.05% flat' },
      { key: 'tennessee', href: '/tennessee-tax-calculator', label: 'Tennessee', desc: '0% income tax' },
      { key: 'missouri', href: '/missouri-tax-calculator', label: 'Missouri', desc: '2%–4.8%' },
      { key: 'maryland', href: '/maryland-tax-calculator', label: 'Maryland', desc: '2%–5.75% + county' },
      { key: 'wisconsin', href: '/wisconsin-tax-calculator', label: 'Wisconsin', desc: '3.54%–7.65%' },
      { key: 'minnesota', href: '/minnesota-tax-calculator', label: 'Minnesota', desc: '5.35%–9.85%' },
      { key: 'oregon', href: '/oregon-tax-calculator', label: 'Oregon', desc: '4.75%–9.9%' },
    ],
  },
  {
    id: 'sales-property',
    label: 'Sales & Property',
    icon: Landmark,
    items: [
      { key: 'sales-tax', href: '/sales-tax-calculator', label: 'Sales Tax', desc: '50 states & reverse' },
      { key: 'capital-gains', href: '/capital-gains-calculator', label: 'Capital Gains', desc: '0%/15%/20% + NIIT' },
      { key: 'property-tax', href: '/property-tax-calculator', label: 'Property Tax', desc: 'All 50 states' },
    ],
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: PiggyBank,
    items: [
      { key: 'mortgage', href: '/mortgage-calculator', label: 'Mortgage', desc: 'Amortization' },
      { key: 'retirement', href: '/401k-retirement-calculator', label: '401(k)', desc: 'Retirement' },
      { key: 'relocation', href: '/relocation-calculator', label: 'Relocate', desc: 'Salary by state' },
      { key: 'tax-refund', href: '/tax-refund-calculator', label: 'Tax Refund', desc: 'Estimate refund' },
    ],
  },
  {
    id: 'employers',
    label: 'For Employers',
    icon: Building2,
    items: [
      { key: 'employee-cost', href: '/employee-cost-calculator', label: 'Employee Cost', desc: 'True cost of hiring' },
      { key: 'self-employment', href: '/self-employment-tax-calculator', label: 'Self-Employment', desc: 'W-2 vs 1099' },
    ],
  },
];

// Flat list for mobile & search
const ALL_CALC_ITEMS = CALC_CATEGORIES.flatMap((cat) => cat.items);

const MORE_LINKS = [
  { key: 'compare', href: '/compare', label: 'Compare States', icon: ArrowRightLeft, desc: 'State vs state taxes' },
  { key: 'job-offer', href: '/job-offer-comparison-calculator', label: 'Compare Job Offers', icon: ArrowRightLeft, desc: 'After-tax offer comparison' },
  { key: 'salary', href: '/salary', label: 'Salary After Tax', icon: TrendingUp, desc: 'Take-home pay by salary' },
  { key: 'tax-data', href: '/tax-data', label: 'Tax Data', icon: BarChart3, desc: 'All 50 states — cite & embed' },
  { key: 'widgets', href: '/widgets', label: 'Free Widgets', icon: Code2, desc: 'Embed calculators on your site' },
  { key: 'glossary', href: '/glossary', label: 'Tax Glossary', icon: BookOpen, desc: '25+ tax terms explained' },
  { key: 'blog', href: '/blog', label: 'Blog', icon: BookOpen, desc: 'Tax guides & tips' },
];

// Map key to icon for search results
const KEY_TO_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  home: DollarSign,
  illinois: MapPin,
  texas: MapPin,
  florida: MapPin,
  california: MapPin,
  newyork: MapPin,
  mortgage: Home,
  retirement: PiggyBank,
  relocation: ArrowRightLeft,
  'capital-gains': TrendingUp,
  'self-employment': Shield,
  'tax-refund': DollarSign,
  'sales-tax': Receipt,
  overtime: Clock,
  georgia: MapPin,
  lottery: DollarSign,
  'irs-withholding': FileText,
  'property-tax': Home,
  'bonus-tax': DollarSign,
  virginia: MapPin,
  northcarolina: MapPin,
  pennsylvania: MapPin,
  ohio: MapPin,
  michigan: MapPin,
  newjersey: MapPin,
  colorado: MapPin,
  arizona: MapPin,
  washington: MapPin,
  massachusetts: MapPin,
  indiana: MapPin,
  tennessee: MapPin,
  missouri: MapPin,
  maryland: MapPin,
  wisconsin: MapPin,
  minnesota: MapPin,
  oregon: MapPin,
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Determine if any calculator page is active
  const isCalcActive = ALL_CALC_ITEMS.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'));
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
  };

  // Filter calculators based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CALC_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return CALC_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          cat.label.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const totalFiltered = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  // Focus search when dropdown opens
  useEffect(() => {
    if (calcDropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [calcDropdownOpen]);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!calcDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalcDropdownOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCalcDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [calcDropdownOpen]);

  // Close dropdown on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setCalcDropdownOpen(false);
  }

  return (
    <header className="sticky top-0 z-[100] w-full glass-strong overflow-visible">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* Logo */}
        <Link
          prefetch={false}
          href="/"
          className="flex items-center gap-2.5 transition-all hover:opacity-90 group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow">
            <DollarSign className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            TheTaxCalc<span className="gradient-text">.com</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Calculators Dropdown */}
          <div className="relative" ref={dropdownRef} style={{ zIndex: 110 }}>
            <button
              onClick={() => { setCalcDropdownOpen(!calcDropdownOpen); if (calcDropdownOpen) setSearchQuery(''); }}
              onMouseEnter={() => { setCalcDropdownOpen(true); }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isCalcActive
                  ? 'bg-emerald-500/12 text-emerald-400'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Calculator className="h-4 w-4" />
              Calculators
              <ChevronDown className={`h-3 w-3 transition-transform ${calcDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Dropdown — Redesigned */}
            {calcDropdownOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] max-h-[calc(100vh-90px)] flex flex-col rounded-2xl shadow-2xl shadow-black/60 animate-slide-up dropdown-solid-bg"
                style={{ zIndex: 9999 }}
                onMouseLeave={() => { setCalcDropdownOpen(false); setSearchQuery(''); }}
              >
                {/* Header with Search — fixed, not scrollable */}
                <div className="shrink-0 px-4 pt-3 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-foreground">Tax Calculators</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">{ALL_CALC_ITEMS.length} tools</span>
                  </div>
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search calculators..."
                      className="w-full rounded-lg border border-border/40 bg-muted/30 pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="shrink-0 divider-glow mx-4" />

                {/* Categorized Content — scrollable, fills remaining space */}
                <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
                  {filteredCategories.length === 0 ? (
                    <div className="py-6 text-center">
                      <Search className="h-7 w-7 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No calculators found for &quot;{searchQuery}&quot;</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredCategories.map((category) => {
                        const CatIcon = category.icon;
                        return (
                          <div key={category.id}>
                            {/* Category Header */}
                            <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                              <CatIcon className="h-3 w-3 text-muted-foreground" />
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {category.label}
                              </span>
                              <span className="text-[9px] text-muted-foreground/50">
                                ({category.items.length})
                              </span>
                            </div>
                            {/* Items Grid — 3 columns, compact */}
                            <div className="grid grid-cols-3 gap-0.5">
                              {category.items.map((item) => {
                                const Icon = KEY_TO_ICON[item.key] || Calculator;
                                const isActive = pathname === item.href;
                                return (
                                  <Link
                                    prefetch={false}
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setCalcDropdownOpen(false)}
                                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all ${
                                      isActive
                                        ? 'bg-emerald-500/12 text-emerald-400'
                                        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                                    }`}
                                  >
                                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                                      isActive ? 'bg-emerald-500/20' : 'bg-muted/30'
                                    }`}>
                                      <Icon className={`h-3 w-3 ${isActive ? 'text-emerald-400' : ''}`} />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[12px] font-medium truncate leading-tight">{item.label}</p>
                                      <p className="text-[9px] text-muted-foreground truncate leading-tight">{item.desc}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer — fixed, not scrollable */}
                <div className="shrink-0 divider-glow mx-4" />
                <div className="shrink-0 px-4 py-2 flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground">
                    {searchQuery ? `${totalFiltered} result${totalFiltered !== 1 ? 's' : ''}` : `Showing all ${ALL_CALC_ITEMS.length} calculators`}
                  </p>
                  <Link
                    prefetch={false}
                    href="/paycheck-calculator"
                    onClick={() => setCalcDropdownOpen(false)}
                    className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    View all tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Compare States */}
          <Link
            prefetch={false}
            href="/compare"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === '/compare' || pathname.startsWith('/compare/')
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Compare
          </Link>

          {/* Glossary */}
          <Link
            prefetch={false}
            href="/glossary"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === '/glossary'
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Glossary
          </Link>

          {/* Blog */}
          <Link
            prefetch={false}
            href="/blog"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              isBlogActive
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>

          {/* Salary */}
          <Link
            prefetch={false}
            href="/salary"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === '/salary' || pathname.startsWith('/salary/')
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Salary
          </Link>

          {/* Tax Data */}
          <Link
            prefetch={false}
            href="/tax-data"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === '/tax-data'
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Data
          </Link>

          {/* Widgets */}
          <Link
            prefetch={false}
            href="/widgets"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              pathname === '/widgets'
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <Code2 className="h-4 w-4" />
            Widgets
          </Link>
        </nav>

        {/* Right side: CTA + Mobile */}
        <div className="flex items-center gap-3">
          <Link
            prefetch={false}
            href="/paycheck-calculator"
            className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <BarChart3 className="h-4 w-4" />
            Calculate Now
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border/30 glass-strong lg:hidden animate-slide-up">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators..."
                className="w-full rounded-lg border border-border/40 bg-muted/30 pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            {/* Calculators by Category */}
            <div className="mb-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {filteredCategories.map((category) => {
                const CatIcon = category.icon;
                return (
                  <div key={category.id} className="mb-3">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <CatIcon className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {category.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      {category.items.map((item) => {
                        const Icon = KEY_TO_ICON[item.key] || Calculator;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            prefetch={false}
                            key={item.key}
                            href={item.href}
                            onClick={closeMobile}
                            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-emerald-500/12 text-emerald-400'
                                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate text-[13px]">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filteredCategories.length === 0 && searchQuery && (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">No calculators found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>

            <div className="divider-glow" />

            {/* Other Links */}
            <div className="mt-3 space-y-0.5">
              {MORE_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    prefetch={false}
                    key={item.key}
                    href={item.href}
                    onClick={closeMobile}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-500/12 text-emerald-400'
                        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              prefetch={false}
              href="/paycheck-calculator"
              onClick={closeMobile}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
            >
              <Globe className="h-4 w-4" />
              Start Calculating
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
