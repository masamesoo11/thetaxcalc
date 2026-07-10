'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DollarSign, ArrowRight, ArrowRightLeft, Mail, ExternalLink, BookOpen, MapPin, Calculator, Shield, Home, TrendingUp, Receipt, Clock, FileText, BarChart3, Code2, FileCheck } from 'lucide-react';
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
  { href: '/tax-refund-calculator', label: 'Tax Refund Calculator', icon: DollarSign },
  { href: '/sales-tax-calculator', label: 'Sales Tax Calculator', icon: Receipt },
  { href: '/overtime-tax-calculator', label: 'Overtime Tax Calculator', icon: Clock },
  { href: '/georgia-tax-calculator', label: 'Georgia Tax Calculator', icon: MapPin },
  { href: '/lottery-tax-calculator', label: 'Lottery Tax Calculator', icon: DollarSign },
  { href: '/irs-withholding-calculator', label: 'IRS Withholding Calculator', icon: FileText },
  { href: '/property-tax-calculator', label: 'Property Tax Calculator', icon: Home },
  { href: '/bonus-tax-calculator', label: 'Bonus Tax Calculator', icon: DollarSign },
  { href: '/virginia-tax-calculator', label: 'Virginia Tax Calculator', icon: MapPin },
  { href: '/relocation-calculator', label: 'Relocation Calculator', icon: MapPin },
  { href: '/freefile-irs', label: 'IRS Free File Guide', icon: FileCheck },
  { href: '/home-sale-tax-calculator', label: 'Home Sale Tax Calculator', icon: Home },
  { href: '/salary-comparison-calculator', label: 'Salary Comparison', icon: ArrowRightLeft },
  { href: '/job-offer-comparison-calculator', label: 'Job Offer Compare', icon: ArrowRightLeft },
  { href: '/paycheck-difference-calculator', label: 'Paycheck Difference', icon: ArrowRightLeft },
  { href: '/employee-cost-calculator', label: 'Employee Cost Calculator', icon: DollarSign },
  { href: '/obbba-tax-calculator', label: 'OBBBA Tax Calculator', icon: Calculator },
  { href: '/federal-tax-brackets', label: 'Federal Tax Brackets', icon: FileText },
];

// All 50 state tax calculators — eliminates orphan pages & boosts internal link equity
const ALL_STATE_LINKS: { href: string; label: string }[] = [
  { href: '/alabama-tax-calculator', label: 'Alabama' },
  { href: '/alaska-tax-calculator', label: 'Alaska' },
  { href: '/arizona-tax-calculator', label: 'Arizona' },
  { href: '/arkansas-tax-calculator', label: 'Arkansas' },
  { href: '/california-tax-calculator', label: 'California' },
  { href: '/colorado-tax-calculator', label: 'Colorado' },
  { href: '/connecticut-tax-calculator', label: 'Connecticut' },
  { href: '/delaware-tax-calculator', label: 'Delaware' },
  { href: '/florida-tax-calculator', label: 'Florida' },
  { href: '/georgia-tax-calculator', label: 'Georgia' },
  { href: '/hawaii-tax-calculator', label: 'Hawaii' },
  { href: '/idaho-tax-calculator', label: 'Idaho' },
  { href: '/illinois-tax-calculator', label: 'Illinois' },
  { href: '/indiana-tax-calculator', label: 'Indiana' },
  { href: '/iowa-tax-calculator', label: 'Iowa' },
  { href: '/kansas-tax-calculator', label: 'Kansas' },
  { href: '/kentucky-tax-calculator', label: 'Kentucky' },
  { href: '/louisiana-tax-calculator', label: 'Louisiana' },
  { href: '/maine-tax-calculator', label: 'Maine' },
  { href: '/maryland-tax-calculator', label: 'Maryland' },
  { href: '/massachusetts-tax-calculator', label: 'Massachusetts' },
  { href: '/michigan-tax-calculator', label: 'Michigan' },
  { href: '/minnesota-tax-calculator', label: 'Minnesota' },
  { href: '/mississippi-tax-calculator', label: 'Mississippi' },
  { href: '/missouri-tax-calculator', label: 'Missouri' },
  { href: '/montana-tax-calculator', label: 'Montana' },
  { href: '/nebraska-tax-calculator', label: 'Nebraska' },
  { href: '/nevada-tax-calculator', label: 'Nevada' },
  { href: '/new-hampshire-tax-calculator', label: 'New Hampshire' },
  { href: '/new-jersey-tax-calculator', label: 'New Jersey' },
  { href: '/new-mexico-tax-calculator', label: 'New Mexico' },
  { href: '/new-york-tax-calculator', label: 'New York' },
  { href: '/north-carolina-tax-calculator', label: 'North Carolina' },
  { href: '/north-dakota-tax-calculator', label: 'North Dakota' },
  { href: '/ohio-tax-calculator', label: 'Ohio' },
  { href: '/oklahoma-tax-calculator', label: 'Oklahoma' },
  { href: '/oregon-tax-calculator', label: 'Oregon' },
  { href: '/pennsylvania-tax-calculator', label: 'Pennsylvania' },
  { href: '/rhode-island-tax-calculator', label: 'Rhode Island' },
  { href: '/south-carolina-tax-calculator', label: 'South Carolina' },
  { href: '/south-dakota-tax-calculator', label: 'South Dakota' },
  { href: '/tennessee-tax-calculator', label: 'Tennessee' },
  { href: '/texas-tax-calculator', label: 'Texas' },
  { href: '/utah-tax-calculator', label: 'Utah' },
  { href: '/vermont-tax-calculator', label: 'Vermont' },
  { href: '/virginia-tax-calculator', label: 'Virginia' },
  { href: '/washington-tax-calculator', label: 'Washington' },
  { href: '/west-virginia-tax-calculator', label: 'West Virginia' },
  { href: '/wisconsin-tax-calculator', label: 'Wisconsin' },
  { href: '/wyoming-tax-calculator', label: 'Wyoming' },
];

// Strategic pages — ensures they are not orphan pages
const STRATEGIC_PAGE_LINKS: { href: string; label: string }[] = [
  { href: '/obbba-tax-calculator', label: 'OBBBA Tax Calculator' },
  { href: '/scholarship', label: 'Tax Literacy Scholarship' },
  { href: '/smartasset-alternative', label: 'SmartAsset Alternative' },
  { href: '/tax-professionals', label: 'For Tax Professionals' },
  { href: '/research', label: 'Research Hub' },
  { href: '/federal-tax-brackets', label: 'Federal Tax Brackets' },
];

// City tax calculators — prevents orphan pages for Chicago, NYC, LA
const CITY_CALCULATOR_LINKS: { href: string; label: string }[] = [
  { href: '/chicago-tax-calculator', label: 'Chicago Tax Calculator' },
  { href: '/new-york-city-tax-calculator', label: 'NYC Tax Calculator' },
  { href: '/los-angeles-tax-calculator', label: 'Los Angeles Tax Calculator' },
];

const RESOURCE_LINKS = [
  { label: 'IRS Official Site', url: 'https://www.irs.gov/', category: 'government' },
  { label: 'Tax Foundation', url: 'https://taxfoundation.org/', category: 'resource' },
  { label: 'IL Revenue Dept', url: 'https://revenue.illinois.gov/', category: 'government' },
  { label: 'TX Comptroller', url: 'https://comptroller.texas.gov/', category: 'government' },
  { label: 'FL Revenue Dept', url: 'https://floridarevenue.com/', category: 'government' },
  { label: 'CA FTB', url: 'https://www.ftb.ca.gov/forms', category: 'government' },
  { label: 'NY Tax & Finance', url: 'https://www.tax.ny.gov/', category: 'government' },
];

const SOCIAL_LINKS: { label: string; url: string }[] = [];

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
              <h2 className="text-lg font-bold text-foreground">
                Stay Updated on <span className="text-emerald-400">Tax Changes</span>
              </h2>
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
                    aria-label="Email address for newsletter"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    className="bg-background/50 border-border/30 placeholder:text-muted-foreground"
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
              prefetch={false}
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                TheTaxCalc<span className="gradient-text">.com</span>
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Calculators
            </h3>
            <ul className="space-y-2">
              {CALCULATOR_LINKS.slice(0, 7).map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              More Tools
            </h3>
            <ul className="space-y-2">
              {CALCULATOR_LINKS.slice(7).map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  prefetch={false}
                  href="/glossary"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Tax Glossary
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/compare"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  Compare States
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/salary"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Salary After Tax
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/salary/50000-after-taxes"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 pl-5"
                >
                  $50K After Tax
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/salary/75000-after-taxes"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 pl-5"
                >
                  $75K After Tax
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/salary/100000-after-taxes"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 pl-5"
                >
                  $100K After Tax
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/salary/150000-after-taxes"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400 pl-5"
                >
                  $150K After Tax
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Tax Blog & Guides
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/tax-data"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Tax Data & Statistics
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/widgets"
                  className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  Free Widgets
                </Link>
              </li>
            </ul>
          </div>

          {/* External Resources Column — external links with <a rel="noopener"> */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Tax Resources
            </h3>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-2 decoration-border/50 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Social Links — hidden while no active social profiles exist */}
          </div>
        </div>

        {/* ─── All 50 State Tax Calculators Directory ───────────────────────── */}
        <div className="mt-10 pt-8 border-t border-border/20">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-400" />
            All 50 State Tax Calculators
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {ALL_STATE_LINKS.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="inline-block py-1 text-xs text-muted-foreground underline underline-offset-2 decoration-border/40 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Strategic Pages ────────────────────────────────────────────── */}
        <div className="mt-6 pt-6 border-t border-border/20">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-400" />
            Guides & Resources
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {STRATEGIC_PAGE_LINKS.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="inline-block py-1 text-xs text-muted-foreground underline underline-offset-2 decoration-border/40 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* City Tax Calculators — prevents orphan pages */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {CITY_CALCULATOR_LINKS.map((link) => (
              <Link
                key={link.href}
                prefetch={false}
                href={link.href}
                className="inline-block py-1 text-xs text-muted-foreground underline underline-offset-2 decoration-border/40 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} TheTaxCalc.com — Free 2026 paycheck & mortgage calculators.
              All calculations are estimates for informational purposes only.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Terms of Use
              </Link>
              <Link href="/about" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                About Us
              </Link>
              <Link href="/compare" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Compare States
              </Link>
              <Link href="/glossary" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Glossary
              </Link>
              <Link href="/blog" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Blog
              </Link>
              <Link href="/tax-data" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Tax Data
              </Link>
              <Link href="/widgets" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Free Widgets
              </Link>
              <Link href="/freefile-irs" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                IRS Free File
              </Link>
              <Link href="/methodology" className="underline underline-offset-2 decoration-border/50 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors">
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
