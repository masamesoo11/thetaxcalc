'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, ArrowRight, ArrowRightLeft, Mail, ExternalLink, BookOpen, MapPin, Calculator, Shield, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CALCULATOR_LINKS = [
  { href: '/paycheck-calculator', label: 'Paycheck Calculator', icon: DollarSign },
  { href: '/illinois-tax-calculator', label: 'Illinois Tax', icon: MapPin },
  { href: '/texas-tax-calculator', label: 'Texas Tax', icon: MapPin },
  { href: '/florida-tax-calculator', label: 'Florida Tax', icon: MapPin },
  { href: '/california-tax-calculator', label: 'California Tax', icon: MapPin },
  { href: '/new-york-tax-calculator', label: 'New York Tax', icon: MapPin },
  { href: '/mortgage-calculator', label: 'Mortgage Calculator', icon: Home },
  { href: '/401k-retirement-calculator', label: '401(k) Projection', icon: Shield },
  { href: '/capital-gains-calculator', label: 'Capital Gains', icon: Calculator },
  { href: '/self-employment-tax-calculator', label: 'Self-Employment', icon: Calculator },
  { href: '/relocation-calculator', label: 'Relocation Calculator', icon: MapPin },
];

const RESOURCE_LINKS = [
  { label: 'IRS Official Site', url: 'https://www.irs.gov/', category: 'government' },
  { label: 'Tax Foundation', url: 'https://taxfoundation.org/', category: 'resource' },
  { label: 'IL Revenue Dept', url: 'https://www2.illinois.gov/rev/', category: 'government' },
  { label: 'TX Comptroller', url: 'https://comptroller.texas.gov/', category: 'government' },
  { label: 'FL Revenue Dept', url: 'https://floridarevenue.com/', category: 'government' },
  { label: 'CA FTB', url: 'https://www.ftb.ca.gov/', category: 'government' },
  { label: 'NY Tax & Finance', url: 'https://www.tax.ny.gov/', category: 'government' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-auto border-t border-border/30 glass-strong">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-foreground">
                Stay Updated on <span className="text-emerald-400">Tax Changes</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get the latest tax tips, calculator updates, and financial insights delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-sm gap-2">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm text-emerald-400">
                  <Mail className="h-4 w-4" />
                  Subscribed! Check your inbox.
                </div>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="bg-background/50 border-border/30 placeholder:text-muted-foreground/50"
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shrink-0"
                  >
                    Subscribe
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                TaxYield<span className="gradient-text">.io</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Precision tax calculators for 2026. Compute your take-home pay, plan your mortgage, and compare state taxes — all free, all accurate.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
                <Shield className="h-3 w-3" />
                2026 Tax Data
              </span>
              <span className="flex items-center gap-1 rounded-full bg-muted/30 px-2.5 py-1">
                Secure & Private
              </span>
            </div>
          </div>

          {/* Calculators Column — SEO internal links with <a> */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Calculators
            </h4>
            <ul className="space-y-2">
              {CALCULATOR_LINKS.slice(0, 7).map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* More Tools + Blog Column */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              More Tools
            </h4>
            <ul className="space-y-2">
              {CALCULATOR_LINKS.slice(7).map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/glossary"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Tax Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  Compare States
                </Link>
              </li>
              <li>
                <Link
                  href="/salary"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Salary After Tax
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Tax Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* External Resources Column — external links with <a rel="noopener"> */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Tax Resources
            </h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} TaxYield.io — Precision paycheck & mortgage calculators.
              All calculations are estimates for informational purposes only.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                Terms of Use
              </Link>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About Us
              </Link>
              <Link href="/compare" className="hover:text-emerald-400 transition-colors">
                Compare States
              </Link>
              <Link href="/glossary" className="hover:text-emerald-400 transition-colors">
                Glossary
              </Link>
              <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
