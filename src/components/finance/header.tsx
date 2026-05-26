'use client';

import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPONENT_KEY_TO_SLUG } from '@/lib/calculator-routes';

const CALC_ITEMS = [
  { key: 'home', href: '/paycheck-calculator', label: 'Paycheck Calculator', icon: DollarSign, desc: 'Federal & state take-home pay' },
  { key: 'illinois', href: '/illinois-tax-calculator', label: 'Illinois', icon: MapPin, desc: '4.95% flat tax' },
  { key: 'texas', href: '/texas-tax-calculator', label: 'Texas', icon: MapPin, desc: '0% state income tax' },
  { key: 'florida', href: '/florida-tax-calculator', label: 'Florida', icon: MapPin, desc: '0% state income tax' },
  { key: 'california', href: '/california-tax-calculator', label: 'California', icon: MapPin, desc: '1%–13.3% progressive' },
  { key: 'newyork', href: '/new-york-tax-calculator', label: 'New York', icon: MapPin, desc: '4%–10.9% progressive' },
  { key: 'mortgage', href: '/mortgage-calculator', label: 'Mortgage', icon: Home, desc: 'Amortization & extra payments' },
  { key: 'retirement', href: '/401k-retirement-calculator', label: '401(k)', icon: PiggyBank, desc: 'Retirement projection' },
  { key: 'relocation', href: '/relocation-calculator', label: 'Relocate', icon: ArrowRightLeft, desc: 'Salary by state' },
  { key: 'capital-gains', href: '/capital-gains-calculator', label: 'Capital Gains', icon: TrendingUp, desc: '0%/15%/20% + NIIT' },
  { key: 'self-employment', href: '/self-employment-tax-calculator', label: 'Self-Employment', icon: Shield, desc: '15.3% SE tax' },
];

const MORE_LINKS = [
  { key: 'compare', href: '/compare', label: 'Compare States', icon: ArrowRightLeft, desc: 'State vs state taxes' },
  { key: 'salary', href: '/salary', label: 'Salary After Tax', icon: TrendingUp, desc: 'Take-home pay by salary' },
  { key: 'glossary', href: '/glossary', label: 'Tax Glossary', icon: BookOpen, desc: '25+ tax terms explained' },
  { key: 'blog', href: '/blog', label: 'Blog', icon: BookOpen, desc: 'Tax guides & tips' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if any calculator page is active
  const isCalcActive = CALC_ITEMS.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'));
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
  };

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
        {/* Logo — proper <a> for SEO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-all hover:opacity-90 group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow">
            <DollarSign className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            TaxYield<span className="gradient-text">.io</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Calculators Dropdown */}
          <div className="relative" ref={dropdownRef} style={{ zIndex: 110 }}>
            <button
              onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
              onMouseEnter={() => setCalcDropdownOpen(true)}
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

            {/* Mega Dropdown */}
            {calcDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-[520px] rounded-2xl p-4 shadow-2xl shadow-black/60 animate-slide-up dropdown-solid-bg"
                style={{ zIndex: 9999 }}
                onMouseLeave={() => setCalcDropdownOpen(false)}
              >
                <div className="mb-3 flex items-center gap-2 px-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-foreground">Tax Calculators</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">11 tools</span>
                </div>
                <div className="divider-glow mb-3" />
                <div className="grid grid-cols-2 gap-1">
                  {CALC_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setCalcDropdownOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                          isActive
                            ? 'bg-emerald-500/12 text-emerald-400'
                            : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                        }`}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          isActive ? 'bg-emerald-500/20' : 'bg-muted/30'
                        }`}>
                          <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : ''}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Compare States — proper <Link> for SEO */}
          <Link
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

          {/* Glossary — proper <Link> for SEO */}
          <Link
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

          {/* Blog — proper <Link> for SEO */}
          <Link
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

          {/* Salary — proper <Link> for SEO */}
          <Link
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
        </nav>

        {/* Right side: CTA + Mobile */}
        <div className="flex items-center gap-3">
          <Link
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
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border/30 glass-strong lg:hidden animate-slide-up">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {/* Calculators Section */}
            <div className="mb-3">
              <div className="flex items-center gap-2 px-3 py-2">
                <Calculator className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Calculators</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CALC_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={closeMobile}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500/12 text-emerald-400'
                          : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="divider-glow" />

            {/* Other Links */}
            {MORE_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
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

            {/* CTA */}
            <Link
              href="/paycheck-calculator"
              onClick={closeMobile}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
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
