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
} from 'lucide-react';
import Link from 'next/link';
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
];

function generateEmbedCode(slug: string, width = '100%', height = 600): string {
  return `<iframe src="https://thetaxcalc.com/${slug}?embed=1" width="${width}" height="${height}" frameborder="0" style="border-radius:12px;"></iframe>`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-1.5 text-xs border-border/50 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
      aria-label={copied ? 'Copied!' : 'Copy embed code'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy Code
        </>
      )}
    </Button>
  );
}

function WidgetCard({ widget }: { widget: WidgetInfo }) {
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
          onClick={() => setShowPreview(!showPreview)}
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
            <CopyButton text={embedCode} />
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
          <p className="text-[11px] text-muted-foreground/60 mt-2 leading-relaxed">
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

function LinkToUsSection() {
  const linkOptions = [
    {
      label: 'Standard Link',
      html: '<a href="https://thetaxcalc.com" title="Free Tax Calculator">Free Tax Calculator - TheTaxCalc</a>',
    },
    {
      label: 'Paycheck Calculator Link',
      html: '<a href="https://thetaxcalc.com/paycheck-calculator" title="Free Paycheck Calculator">Paycheck Calculator - TheTaxCalc</a>',
    },
    {
      label: 'Mortgage Calculator Link',
      html: '<a href="https://thetaxcalc.com/mortgage-calculator" title="Free Mortgage Calculator">Mortgage Calculator - TheTaxCalc</a>',
    },
    {
      label: 'Sales Tax Calculator Link',
      html: '<a href="https://thetaxcalc.com/sales-tax-calculator" title="Free Sales Tax Calculator">Sales Tax Calculator - TheTaxCalc</a>',
    },
  ];

  return (
    <section className="mb-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <ExternalLink className="h-5 w-5 text-emerald-400" />
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
        {linkOptions.map((option) => (
          <div
            key={option.label}
            className="rounded-lg bg-muted/20 border border-border/20 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">{option.label}</span>
              <CopyButton text={option.html} />
            </div>
            <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
              {option.html}
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WidgetsGrid() {
  return (
    <>
      {/* Widget Grid */}
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {WIDGETS.map((widget) => (
            <WidgetCard key={widget.slug} widget={widget} />
          ))}
        </div>
      </section>

      {/* Link to Us */}
      <LinkToUsSection />
    </>
  );
}
