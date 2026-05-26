import Link from 'next/link';
import { FileQuestion, Home, Calculator, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <FileQuestion className="h-10 w-10 text-emerald-400" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black tracking-tighter text-foreground/20">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our free tax calculators instead.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/paycheck-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/30 transition-all"
          >
            <Calculator className="h-4 w-4" />
            Paycheck Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
          {[
            { href: '/illinois-tax-calculator', label: 'Illinois' },
            { href: '/texas-tax-calculator', label: 'Texas' },
            { href: '/florida-tax-calculator', label: 'Florida' },
            { href: '/california-tax-calculator', label: 'California' },
            { href: '/new-york-tax-calculator', label: 'New York' },
            { href: '/mortgage-calculator', label: 'Mortgage' },
            { href: '/capital-gains-calculator', label: 'Capital Gains' },
            { href: '/401k-retirement-calculator', label: '401(k)' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-border/30 bg-card/30 px-3 py-1 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
