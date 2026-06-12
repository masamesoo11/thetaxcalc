'use client';

import { useState, useCallback } from 'react';
import {
  DollarSign,
  Home,
  Receipt,
  TrendingUp,
  Briefcase,
  PiggyBank,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Code2,
  Palette,
  Maximize2,
  MapPin,
  ArrowRightLeft,
  Shield,
  Clock,
  FileText,
  Calculator,
  BadgeCheck,
  Link as LinkIcon,
  Download,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { trackEmbedCopy, trackWidgetPreview } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WidgetInfo {
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  defaultHeight: number;
  color: string;
}

const WIDGETS: WidgetInfo[] = [
  {
    slug: 'paycheck-calculator',
    title: 'Paycheck Calculator',
    description:
      'Estimate your take-home pay after federal, FICA, and state income taxes. Supports all 50 states with 2026 brackets.',
    icon: DollarSign,
    badge: 'Most Popular',
    defaultHeight: 700,
    color: 'emerald',
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description:
      'Calculate monthly payments, amortization schedules, and see how extra payments save you thousands in interest.',
    icon: Home,
    badge: 'Popular',
    defaultHeight: 700,
    color: 'emerald',
  },
  {
    slug: 'sales-tax-calculator',
    title: 'Sales Tax Calculator',
    description:
      'Get combined state + local sales tax rates for all 50 states. Perfect for e-commerce and retail sites.',
    icon: Receipt,
    badge: 'All 50 States',
    defaultHeight: 600,
    color: 'emerald',
  },
  {
    slug: 'capital-gains-calculator',
    title: 'Capital Gains Calculator',
    description:
      'Estimate short-term and long-term capital gains tax based on your income, filing status, and holding period.',
    icon: TrendingUp,
    badge: '2026 Rates',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'self-employment-tax-calculator',
    title: 'Self-Employment Tax Calculator',
    description:
      'Calculate your self-employment tax (Social Security + Medicare), quarterly estimates, and deductible half.',
    icon: Briefcase,
    badge: 'Freelancers',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: '401k-retirement-calculator',
    title: '401(k) Retirement Calculator',
    description:
      'Project your retirement savings with employer match, catch-up contributions, and compound growth scenarios.',
    icon: PiggyBank,
    badge: '2026 Limits',
    defaultHeight: 700,
    color: 'emerald',
  },
  {
    slug: 'illinois-tax-calculator',
    title: 'Illinois Tax Calculator',
    description:
      'Compute take-home pay in Illinois with the 4.95% flat income tax rate. Includes local tax considerations.',
    icon: MapPin,
    badge: 'IL — 4.95%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'texas-tax-calculator',
    title: 'Texas Tax Calculator',
    description:
      'Calculate your take-home pay in Texas with 0% state income tax. Only federal and FICA taxes apply.',
    icon: MapPin,
    badge: 'TX — 0%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'florida-tax-calculator',
    title: 'Florida Tax Calculator',
    description:
      'Compute your Florida paycheck with 0% state income tax. Great for retirees and remote workers.',
    icon: MapPin,
    badge: 'FL — 0%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'california-tax-calculator',
    title: 'California Tax Calculator',
    description:
      'Estimate take-home pay in California with progressive 1%–13.3% state income tax and SDI.',
    icon: MapPin,
    badge: 'CA — 1%–13.3%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'new-york-tax-calculator',
    title: 'New York Tax Calculator',
    description:
      'Calculate your NYC/NY paycheck with progressive 4%–10.9% state tax and city tax considerations.',
    icon: MapPin,
    badge: 'NY — 4%–10.9%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'georgia-tax-calculator',
    title: 'Georgia Tax Calculator',
    description:
      'Estimate your Georgia take-home pay with the 5.49% flat income tax rate and standard deductions.',
    icon: MapPin,
    badge: 'GA — 5.49%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'virginia-tax-calculator',
    title: 'Virginia Tax Calculator',
    description:
      'Compute your Virginia paycheck with progressive 2%–5.75% state income tax brackets.',
    icon: MapPin,
    badge: 'VA — 2%–5.75%',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'relocation-calculator',
    title: 'Relocation Calculator',
    description:
      'Compare your take-home pay between two states. See how much more (or less) you keep after moving.',
    icon: ArrowRightLeft,
    badge: 'State vs State',
    defaultHeight: 700,
    color: 'emerald',
  },
  {
    slug: 'tax-refund-calculator',
    title: 'Tax Refund Calculator',
    description:
      'Estimate your 2026 tax refund or amount owed. Based on withholding vs actual tax liability.',
    icon: DollarSign,
    badge: 'Refund Estimate',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'overtime-tax-calculator',
    title: 'Overtime Tax Calculator',
    description:
      'Calculate the after-tax value of overtime pay. See if the extra hours are worth it after taxes.',
    icon: Clock,
    badge: 'OT Pay',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'lottery-tax-calculator',
    title: 'Lottery Tax Calculator',
    description:
      'Find out how much you keep after federal and state taxes on lottery, sweepstakes, or prize winnings.',
    icon: DollarSign,
    badge: 'Prize Winnings',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'irs-withholding-calculator',
    title: 'IRS Withholding Calculator',
    description:
      'Optimize your W-4 withholding to avoid overpaying or underpaying. Adjust for life changes.',
    icon: FileText,
    badge: 'W-4 Helper',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'property-tax-calculator',
    title: 'Property Tax Calculator',
    description:
      'Estimate annual property tax for all 50 states. Compare effective rates and median payments.',
    icon: Home,
    badge: 'All 50 States',
    defaultHeight: 650,
    color: 'emerald',
  },
  {
    slug: 'bonus-tax-calculator',
    title: 'Bonus Tax Calculator',
    description:
      'Calculate tax on bonuses using the 22% flat rate or aggregate method. See your actual take-home.',
    icon: DollarSign,
    badge: '22% Flat Rate',
    defaultHeight: 650,
    color: 'emerald',
  },
];

function generateEmbedCode(slug: string, width = '100%', height = 600): string {
  return `<iframe src="https://thetaxcalc.com/${slug}?embed=1" width="${width}" height="${height}" frameborder="0" style="border:1px solid #e5e7eb;border-radius:12px;" title="Free ${slug.replace(/-/g, ' ')} by TheTaxCalc"></iframe>\n<p style="font-size:12px;color:#6b7280;margin-top:4px;">Powered by <a href="https://thetaxcalc.com" target="_blank" rel="noopener" style="color:#10b981;">TheTaxCalc</a> — Free 2026 Tax Calculators</p>`;
}

function CopyButton({ text, label = 'Copy Code', onCopy }: { text: string; label?: string; onCopy?: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text, onCopy]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5 text-xs border-border/50 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
      aria-label={copied ? 'Copied!' : label}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </Button>
  );
}

function WidgetCard({ widget, compact = false }: { widget: WidgetInfo; compact?: boolean }) {
  const [showPreview, setShowPreview] = useState(false);
  const [customWidth, setCustomWidth] = useState('100%');
  const [customHeight, setCustomHeight] = useState(String(widget.defaultHeight));
  const [showCustomize, setShowCustomize] = useState(false);

  const embedCode = generateEmbedCode(widget.slug, customWidth, Number(customHeight));
  const Icon = widget.icon;

  return (
    <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden hover-lift">
      {/* Widget header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
              <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{widget.title}</h3>
              <Badge
                variant="secondary"
                className="mt-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] px-2 py-0"
              >
                {widget.badge}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{widget.description}</p>
      </div>

      {/* Live preview toggle */}
      <div className="px-6 pb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!showPreview) trackWidgetPreview(widget.slug);
            setShowPreview(!showPreview);
          }}
          className="gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors w-full justify-center border border-dashed border-border/40 hover:border-emerald-500/30"
          aria-expanded={showPreview}
        >
          {showPreview ? (
            <>
              <ChevronDown className="h-3.5 w-3.5 rotate-180 transition-transform" />
              Hide Preview
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 transition-transform" />
              Show Preview
            </>
          )}
        </Button>
      </div>

      {/* Live preview iframe */}
      {showPreview && (
        <div className="px-6 pb-4">
          <div className="rounded-lg overflow-hidden border border-border/20 bg-background">
            <iframe
              src={`https://thetaxcalc.com/${widget.slug}?embed=1`}
              width="100%"
              height={widget.defaultHeight}
              frameBorder="0"
              style={{ borderRadius: '8px' }}
              title={`${widget.title} preview`}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Embed code section */}
      <div className="px-6 pb-3">
        <div className="rounded-lg bg-muted/30 border border-border/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              <span>Embed Code</span>
            </div>
            <CopyButton text={embedCode} onCopy={() => trackEmbedCopy(widget.slug)} />
          </div>
          <pre className="text-xs text-foreground/80 overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
            {embedCode}
          </pre>
        </div>
      </div>

      {/* Customize toggle */}
      <div className="px-6 pb-3">
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors"
          aria-expanded={showCustomize}
        >
          <Palette className="h-3.5 w-3.5" />
          Customize size
          <ChevronDown
            className={`h-3 w-3 transition-transform ${showCustomize ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Customization options */}
      {showCustomize && (
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor={`width-${widget.slug}`}
                className="text-xs text-muted-foreground mb-1 flex items-center gap-1"
              >
                <Maximize2 className="h-3 w-3" />
                Width
              </label>
              <input
                id={`width-${widget.slug}`}
                type="text"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="w-full rounded-md border border-border/40 bg-muted/20 px-3 py-1.5 text-xs text-foreground focus:border-emerald-500/40 focus:outline-none transition-colors"
                placeholder="100%"
              />
            </div>
            <div>
              <label
                htmlFor={`height-${widget.slug}`}
                className="text-xs text-muted-foreground mb-1 flex items-center gap-1"
              >
                <Maximize2 className="h-3 w-3" />
                Height (px)
              </label>
              <input
                id={`height-${widget.slug}`}
                type="text"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-full rounded-md border border-border/40 bg-muted/20 px-3 py-1.5 text-xs text-foreground focus:border-emerald-500/40 focus:outline-none transition-colors"
                placeholder="600"
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            Tip: Use <code className="bg-muted/30 px-1 rounded text-[10px]">100%</code> for responsive width. Minimum recommended height: 600px.
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-6 pb-6 pt-1 flex items-center gap-2">
        <Link href={`/${widget.slug}`} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs border-border/50 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open Calculator
          </Button>
        </Link>
      </div>
    </div>
  );
}

/* ─── Badge / "Powered By" Section ────────────────────────────────────────── */

const BADGE_STYLES = [
  {
    label: 'Powered by TheTaxCalc (Dark)',
    html: `<a href="https://thetaxcalc.com" title="Free Tax Calculator" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#0a0f1e;border:1px solid #10b981;border-radius:8px;color:#34d399;font-size:13px;font-family:sans-serif;text-decoration:none;">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  Powered by TheTaxCalc
</a>`,
  },
  {
    label: 'Powered by TheTaxCalc (Light)',
    html: `<a href="https://thetaxcalc.com" title="Free Tax Calculator" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#ffffff;border:1px solid #10b981;border-radius:8px;color:#059669;font-size:13px;font-family:sans-serif;text-decoration:none;">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  Powered by TheTaxCalc
</a>`,
  },
  {
    label: 'Simple Text Badge',
    html: `<a href="https://thetaxcalc.com" title="Free Tax Calculator" style="display:inline-block;padding:4px 10px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:6px;color:#065f46;font-size:12px;font-family:sans-serif;text-decoration:none;">Tax Calculator by TheTaxCalc</a>`,
  },
  {
    label: 'Compact Icon Badge',
    html: `<a href="https://thetaxcalc.com" title="Free Tax Calculator" style="display:inline-flex;align-items:center;gap:4px;padding:4px 8px;background:linear-gradient(135deg,#059669,#10b981);border-radius:6px;color:#fff;font-size:11px;font-weight:600;font-family:sans-serif;text-decoration:none;">
  💰 TheTaxCalc
</a>`,
  },
];

/* ─── Link-to-Us Section ──────────────────────────────────────────────────── */

const LINK_OPTIONS = [
  {
    label: 'TheTaxCalc Homepage',
    html: '<a href="https://thetaxcalc.com" title="Free Tax Calculator">Free Tax Calculator — TheTaxCalc</a>',
  },
  {
    label: 'Paycheck Calculator',
    html: '<a href="https://thetaxcalc.com/paycheck-calculator" title="Free Paycheck Calculator 2026">Free Paycheck Calculator — TheTaxCalc</a>',
  },
  {
    label: 'Mortgage Calculator',
    html: '<a href="https://thetaxcalc.com/mortgage-calculator" title="Free Mortgage Calculator 2026">Free Mortgage Calculator — TheTaxCalc</a>',
  },
  {
    label: 'Sales Tax Calculator',
    html: '<a href="https://thetaxcalc.com/sales-tax-calculator" title="Free Sales Tax Calculator — All 50 States">Free Sales Tax Calculator — TheTaxCalc</a>',
  },
  {
    label: 'Capital Gains Calculator',
    html: '<a href="https://thetaxcalc.com/capital-gains-calculator" title="Free Capital Gains Tax Calculator">Capital Gains Calculator — TheTaxCalc</a>',
  },
  {
    label: '401(k) Calculator',
    html: '<a href="https://thetaxcalc.com/401k-retirement-calculator" title="Free 401k Retirement Calculator">401(k) Calculator — TheTaxCalc</a>',
  },
  {
    label: 'Self-Employment Tax',
    html: '<a href="https://thetaxcalc.com/self-employment-tax-calculator" title="Free Self-Employment Tax Calculator">Self-Employment Tax Calculator — TheTaxCalc</a>',
  },
  {
    label: '2026 Tax Data & Rates',
    html: '<a href="https://thetaxcalc.com/resources" title="2026 Tax Brackets, Rates & Data">2026 Tax Data & Rates — TheTaxCalc</a>',
  },
];

/* ─── "Embed Data Table" Section ──────────────────────────────────────────── */

const EMBED_TABLE_OPTIONS = [
  {
    label: '2026 Federal Tax Brackets',
    slug: 'federal-tax-brackets',
    html: `<iframe src="https://thetaxcalc.com/resources#federal-tax-brackets" width="100%" height="500" frameborder="0" style="border-radius:12px;" title="2026 Federal Tax Brackets by TheTaxCalc"></iframe>`,
  },
  {
    label: 'State Income Tax Rates',
    slug: 'state-tax-rates',
    html: `<iframe src="https://thetaxcalc.com/resources#state-tax-rates" width="100%" height="400" frameborder="0" style="border-radius:12px;" title="State Income Tax Rates by TheTaxCalc"></iframe>`,
  },
  {
    label: 'FICA Tax Rates 2026',
    slug: 'fica-rates',
    html: `<iframe src="https://thetaxcalc.com/resources#fica-rates" width="100%" height="350" frameborder="0" style="border-radius:12px;" title="FICA Tax Rates 2026 by TheTaxCalc"></iframe>`,
  },
  {
    label: '401(k) & Retirement Limits',
    slug: 'retirement-limits',
    html: `<iframe src="https://thetaxcalc.com/resources#retirement-limits" width="100%" height="350" frameborder="0" style="border-radius:12px;" title="2026 Retirement Contribution Limits by TheTaxCalc"></iframe>`,
  },
];

/* ─── Filter Bar ──────────────────────────────────────────────────────────── */

type WidgetCategory = 'all' | 'paycheck' | 'state' | 'investment' | 'other';

const CATEGORIES: { key: WidgetCategory; label: string }[] = [
  { key: 'all', label: 'All 20 Widgets' },
  { key: 'paycheck', label: 'Paycheck & Income' },
  { key: 'state', label: 'State-Specific' },
  { key: 'investment', label: 'Investment & Retirement' },
  { key: 'other', label: 'Other Calculators' },
];

function getCategory(slug: string): WidgetCategory {
  const stateSlugs = ['illinois-tax-calculator', 'texas-tax-calculator', 'florida-tax-calculator', 'california-tax-calculator', 'new-york-tax-calculator', 'georgia-tax-calculator', 'virginia-tax-calculator'];
  const investmentSlugs = ['capital-gains-calculator', '401k-retirement-calculator', 'mortgage-calculator', 'property-tax-calculator'];
  const paycheckSlugs = ['paycheck-calculator', 'self-employment-tax-calculator', 'tax-refund-calculator', 'irs-withholding-calculator', 'bonus-tax-calculator', 'overtime-tax-calculator'];

  if (stateSlugs.includes(slug)) return 'state';
  if (investmentSlugs.includes(slug)) return 'investment';
  if (paycheckSlugs.includes(slug)) return 'paycheck';
  return 'other';
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

export function WidgetsGrid() {
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>('all');
  const [showBadges, setShowBadges] = useState(false);
  const [showEmbedTables, setShowEmbedTables] = useState(false);

  const filteredWidgets = activeCategory === 'all'
    ? WIDGETS
    : WIDGETS.filter((w) => getCategory(w.slug) === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-muted/20 text-muted-foreground border border-border/20 hover:border-emerald-500/20 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Widget Grid */}
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredWidgets.map((widget) => (
            <WidgetCard key={widget.slug} widget={widget} />
          ))}
        </div>
        {filteredWidgets.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No widgets in this category.
          </div>
        )}
      </section>

      {/* ── Badges / "Powered By" Section ─────────────────────────────────── */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <BadgeCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Free <span className="gradient-text">Badges</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Add a &ldquo;Powered by TheTaxCalc&rdquo; badge to your site. Free, no signup.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowBadges(!showBadges)}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${showBadges ? 'rotate-180' : ''}`} />
          {showBadges ? 'Hide Badge Options' : 'Show Badge Options'}
        </button>

        {showBadges && (
          <div className="mt-4 space-y-4">
            {BADGE_STYLES.map((badge) => (
              <div
                key={badge.label}
                className="rounded-lg bg-muted/20 border border-border/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{badge.label}</span>
                  <CopyButton text={badge.html} label="Copy HTML" />
                </div>
                {/* Preview */}
                <div className="mb-3 rounded-md bg-background/80 p-3 border border-border/10">
                  <div dangerouslySetInnerHTML={{ __html: badge.html }} />
                </div>
                <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                  {badge.html}
                </pre>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Link to Us Section ─────────────────────────────────────────────── */}
      <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <LinkIcon className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Link to <span className="gradient-text">Us</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Copy and paste any of these HTML snippets to link to our calculators.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {LINK_OPTIONS.map((option) => (
            <div
              key={option.label}
              className="rounded-lg bg-muted/20 border border-border/20 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{option.label}</span>
                <CopyButton text={option.html} label="Copy HTML" />
              </div>
              <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                {option.html}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Embed Data Tables Section ──────────────────────────────────────── */}
      <section className="mb-12 rounded-xl border border-border/30 bg-card/50 p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Share2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Embed Tax <span className="gradient-text">Data Tables</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Embed authoritative 2026 tax data on your website. Journalists, bloggers, and educators — link freely.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowEmbedTables(!showEmbedTables)}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${showEmbedTables ? 'rotate-180' : ''}`} />
          {showEmbedTables ? 'Hide Data Table Embeds' : 'Show Data Table Embeds'}
        </button>

        {showEmbedTables && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {EMBED_TABLE_OPTIONS.map((option) => (
              <div
                key={option.slug}
                className="rounded-lg bg-muted/20 border border-border/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{option.label}</span>
                  <CopyButton text={option.html} label="Copy Embed" />
                </div>
                <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                  {option.html}
                </pre>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-muted-foreground leading-relaxed">
          <Download className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Want raw data? Visit our{' '}
            <Link href="/resources" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              Tax Data &amp; Resources
            </Link>{' '}
            page for free, citable 2026 tax brackets, FICA rates, and more. Every section has a &ldquo;Cite this data&rdquo; button.
          </p>
        </div>
      </section>
    </>
  );
}
