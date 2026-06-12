'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  Globe,
  MousePointerClick,
  Search,
  Shield,
  TrendingDown,
  TrendingUp,
  XCircle,
  Zap,
  Target,
  Link2,
  FileText,
  Server,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── Data ────────────────────────────────────────────────────────────────────────

const OVERALL_SCORE = 38;

const SCORE_BREAKDOWN = [
  { category: 'Technical SEO', score: 55, max: 100, color: '#f59e0b' },
  { category: 'On-Page SEO', score: 48, max: 100, color: '#f59e0b' },
  { category: 'Content Quality', score: 62, max: 100, color: '#10b981' },
  { category: 'Backlinks / Authority', score: 5, max: 100, color: '#ef4444' },
  { category: 'Search Visibility', score: 8, max: 100, color: '#ef4444' },
  { category: 'Structured Data', score: 15, max: 100, color: '#ef4444' },
];

// GSC Data - Impressions over time
const GSC_TIMELINE = [
  { time: 'May 28 3PM', impressions: 1, clicks: 0, position: 10 },
  { time: '4PM', impressions: 1, clicks: 0, position: 1 },
  { time: '6PM', impressions: 1, clicks: 1, position: 1 },
  { time: '8PM', impressions: 2, clicks: 0, position: 28 },
  { time: '9PM', impressions: 5, clicks: 0, position: 34.8 },
  { time: '10PM', impressions: 1, clicks: 0, position: 4 },
  { time: '11PM', impressions: 1, clicks: 0, position: 6 },
  { time: 'May 29 12AM', impressions: 1, clicks: 0, position: 88 },
  { time: '1AM', impressions: 2, clicks: 0, position: 80.5 },
  { time: '2AM', impressions: 1, clicks: 0, position: 75 },
  { time: '3AM', impressions: 1, clicks: 0, position: 24 },
  { time: '4AM', impressions: 4, clicks: 0, position: 41.2 },
  { time: '5AM', impressions: 6, clicks: 0, position: 23.7 },
  { time: '6AM', impressions: 10, clicks: 0, position: 72.5 },
  { time: '7AM', impressions: 8, clicks: 0, position: 50.2 },
  { time: '8AM', impressions: 3, clicks: 0, position: 44.3 },
  { time: '9AM', impressions: 6, clicks: 0, position: 50.7 },
  { time: '10AM', impressions: 6, clicks: 0, position: 67.7 },
  { time: '11AM', impressions: 1, clicks: 0, position: 11 },
];

// GSC Pages Data
const GSC_PAGES = [
  { url: '/new-york-tax-calculator', clicks: 1, impressions: 21, ctr: 4.76, position: 43.52 },
  { url: '/', clicks: 1, impressions: 4, ctr: 25, position: 17.75 },
  { url: '/glossary', clicks: 1, impressions: 2, ctr: 50, position: 3.5 },
  { url: '/self-employment-tax-calculator', clicks: 0, impressions: 17, ctr: 0, position: 69.59 },
  { url: '/compare', clicks: 0, impressions: 11, ctr: 0, position: 22.64 },
  { url: '/illinois-tax-calculator', clicks: 0, impressions: 11, ctr: 0, position: 28.82 },
  { url: '/salary', clicks: 0, impressions: 7, ctr: 0, position: 30.14 },
  { url: '/privacy', clicks: 0, impressions: 1, ctr: 0, position: 2 },
  { url: '/terms', clicks: 0, impressions: 1, ctr: 0, position: 5 },
];

// GSC Device Data
const GSC_DEVICES = [
  { name: 'Desktop', clicks: 1, impressions: 51, ctr: 1.96, position: 53.94, icon: Monitor },
  { name: 'Mobile', clicks: 0, impressions: 8, ctr: 0, position: 15.12, icon: Smartphone },
  { name: 'Tablet', clicks: 0, impressions: 2, ctr: 0, position: 8, icon: Tablet },
];

// Technical Issues from Screaming Frog
const TECHNICAL_ISSUES = [
  {
    id: 1,
    title: '4xx Client Error (Internal)',
    severity: 'high' as const,
    count: 1,
    description: '1 internal URL returns a client error (4xx). This is a broken link that wastes crawl budget and hurts user experience.',
    fix: 'Find and fix the broken internal link. Redirect or remove the link pointing to the 404 page.',
    category: 'Crawl Errors',
  },
  {
    id: 2,
    title: 'Page Titles Over 60 Characters',
    severity: 'medium' as const,
    count: 54,
    description: '54 pages have titles exceeding 60 characters, which may get truncated in Google search results.',
    fix: 'Shorten page titles to under 60 characters while keeping target keywords. Ensure the most important words appear first.',
    category: 'On-Page',
  },
  {
    id: 3,
    title: 'Page Titles Over 561 Pixels',
    severity: 'medium' as const,
    count: 53,
    description: '53 pages have titles that exceed Google\'s estimated pixel width limit, causing truncation.',
    fix: 'Rewrite titles to fit within Google\'s pixel limit. Prioritize key terms at the beginning of the title.',
    category: 'On-Page',
  },
  {
    id: 4,
    title: 'Reduce Unused JavaScript',
    severity: 'medium' as const,
    count: 14,
    description: '14 pages have unused JavaScript that increases page load time and hurts Core Web Vitals.',
    fix: 'Code-split JavaScript bundles, remove unused dependencies, and implement dynamic imports for non-critical code.',
    category: 'Performance',
  },
  {
    id: 5,
    title: 'Page Titles Below 30 Characters',
    severity: 'medium' as const,
    count: 3,
    description: '3 pages have very short titles (under 30 chars), missing the opportunity to target additional keywords.',
    fix: 'Expand these titles to include relevant keywords and unique selling points, keeping them under 60 characters.',
    category: 'On-Page',
  },
  {
    id: 6,
    title: 'Duplicate H2 Tags',
    severity: 'low' as const,
    count: 47,
    description: '47 pages have duplicate H2 tags, making it harder for search engines to differentiate pages.',
    fix: 'Ensure each page has unique, descriptive H2 tags that reflect the specific content of that page.',
    category: 'On-Page',
  },
  {
    id: 7,
    title: 'Meta Descriptions Over 155 Characters',
    severity: 'low' as const,
    count: 11,
    description: '11 pages have meta descriptions over 155 characters, which may be truncated in search results.',
    fix: 'Write concise meta descriptions (120-155 characters) that include target keywords and a call to action.',
    category: 'On-Page',
  },
  {
    id: 8,
    title: 'Missing HSTS Header',
    severity: 'low' as const,
    count: 1,
    description: 'The site is missing the HTTP Strict-Transport-Security header, which could expose users to MITM attacks.',
    fix: 'Add the HSTS header to all responses: Strict-Transport-Security: max-age=31536000; includeSubDomains',
    category: 'Security',
  },
  {
    id: 9,
    title: 'Missing Content-Security-Policy Header',
    severity: 'low' as const,
    count: 1,
    description: 'No Content-Security-Policy header is set, leaving the site vulnerable to XSS attacks.',
    fix: 'Implement a strict CSP header that only allows resources from trusted sources.',
    category: 'Security',
  },
  {
    id: 10,
    title: 'Missing Secure Referrer-Policy Header',
    severity: 'low' as const,
    count: 1,
    description: 'Missing Referrer-Policy header could leak URL information on non-HTTPS requests.',
    fix: 'Set Referrer-Policy: strict-origin-when-cross-origin on all responses.',
    category: 'Security',
  },
  {
    id: 11,
    title: 'External 4xx Client Errors',
    severity: 'low' as const,
    count: 4,
    description: '4 external links return 4xx errors (broken outbound links).',
    fix: 'Update or remove broken external links. Link to working, authoritative sources instead.',
    category: 'Crawl Errors',
  },
  {
    id: 12,
    title: 'High External Outlinks',
    severity: 'low' as const,
    count: 3,
    description: '3 pages have a high number of followed external outlinks, potentially diluting page authority.',
    fix: 'Review external links and add rel="nofollow" or rel="sponsored" where appropriate. Keep only the most valuable external references.',
    category: 'Links',
  },
];

// Top Target Keywords
const TARGET_KEYWORDS = [
  { keyword: 'paycheck calculator', volume: '500K', difficulty: 95, currentPosition: '-' },
  { keyword: 'tax calculator', volume: '500K', difficulty: 82, currentPosition: '-' },
  { keyword: 'income tax calculator', volume: '500K', difficulty: 90, currentPosition: '-' },
  { keyword: 'payroll calculator', volume: '500K', difficulty: 95, currentPosition: '-' },
  { keyword: 'tax refund estimator', volume: '50K', difficulty: 60, currentPosition: '-' },
  { keyword: 'self employment tax calculator', volume: '5K', difficulty: 40, currentPosition: '69+' },
  { keyword: 'capital gains tax calculator', volume: '50K', difficulty: 70, currentPosition: '-' },
  { keyword: 'sales tax calculator', volume: '500K', difficulty: 95, currentPosition: '-' },
  { keyword: 'take home pay calculator', volume: '50K', difficulty: 50, currentPosition: '-' },
  { keyword: 'tax withholding calculator', volume: '50K', difficulty: 55, currentPosition: '-' },
  { keyword: 'free tax calculator', volume: '50K', difficulty: 70, currentPosition: '-' },
  { keyword: 'property tax calculator', volume: '50K', difficulty: 50, currentPosition: '-' },
  { keyword: 'bonus tax calculator', volume: '5K', difficulty: 30, currentPosition: '-' },
  { keyword: 'lottery tax calculator', volume: '5K', difficulty: 25, currentPosition: '-' },
  { keyword: 'doorDash tax calculator', volume: '5K', difficulty: 18, currentPosition: '-' },
];

// Competitor Data
const COMPETITORS = [
  { name: 'SmartAsset', domain: 'smartasset.com', states: 50, calculators: 15, backlinks: '~2.1M', domainAuth: 82 },
  { name: 'PaycheckCity', domain: 'paycheckcity.com', states: 50, calculators: 10, backlinks: '~180K', domainAuth: 58 },
  { name: 'QuickBooks', domain: 'quickbooks.intuit.com', states: 50, calculators: 8, backlinks: '~5.5M', domainAuth: 91 },
  { name: 'ADP', domain: 'adp.com', states: 50, calculators: 5, backlinks: '~3.2M', domainAuth: 85 },
  { name: 'PaycheckTaxCalc', domain: 'paychecktaxcalculator.net', states: 50, calculators: 12, backlinks: '~8K', domainAuth: 22 },
  { name: 'TheTaxCalc', domain: 'thetaxcalc.com', states: 7, calculators: 20, backlinks: '~0', domainAuth: '~5', isUs: true },
];

// Action Plan
const ACTION_PLAN = [
  {
    priority: 1,
    title: 'Add Schema Markup for All Calculator Pages',
    impact: 'HIGH',
    effort: 'MEDIUM',
    timeline: '2-3 weeks',
    description: 'Add SoftwareApplication, FinancialProduct, and HowTo schema to every calculator page. This enables rich results (calculator cards) in Google search, which competitors like SmartAsset already use.',
    steps: [
      'Add SoftwareApplication schema to each calculator with name, description, and offers (free)',
      'Add FAQPage schema to calculator pages that have FAQ sections',
      'Add BreadcrumbList schema to all pages',
      'Test with Google Rich Results Test tool after implementation',
    ],
  },
  {
    priority: 2,
    title: 'Build Backlinks — Start with 20 Quality Links',
    impact: 'HIGH',
    effort: 'HIGH',
    timeline: '3-6 months',
    description: 'The site has essentially zero backlinks. Google sees no external validation. Start a systematic link-building campaign targeting personal finance blogs, tax preparation sites, and state-specific resources.',
    steps: [
      'Reach out to 50 personal finance blogs for guest posts / calculator embeds',
      'Submit to 30+ calculator directories (Calculator.net alternatives)',
      'Create linkable assets: "2026 Tax Changes Infographic", state tax comparison charts',
      ' HARO (Help A Reporter Out) responses for tax-related queries',
      'Partner with CPA firms and tax preparation services for co-marketing',
    ],
  },
  {
    priority: 3,
    title: 'Expand to All 50 States',
    impact: 'HIGH',
    effort: 'MEDIUM',
    timeline: '3-4 months',
    description: 'All 50 states are now covered with dedicated calculators. Each state page targets a separate keyword opportunity ("Ohio tax calculator", "Pennsylvania paycheck calculator"). Ensure state-specific long-tail keywords are optimized.',
    steps: [
      'Prioritize the top 15 states by population (OH, PA, GA already done, add NC, MI, NJ, VA done, etc.)',
      'Create state tax data files with brackets, deductions, and credits for each state',
      'Build calculator pages using existing template — reuse the architecture',
      'Add internal links from each state calculator to the comparison and salary pages',
    ],
  },
  {
    priority: 4,
    title: 'Fix Page Titles — 54 Pages Over 60 Characters',
    impact: 'MEDIUM',
    effort: 'LOW',
    timeline: '1 week',
    description: '54 pages have titles that get truncated in Google search results, losing important keywords and reducing CTR.',
    steps: [
      'Audit all page titles and shorten to under 60 characters',
      'Prioritize primary keywords at the beginning of each title',
      'Add year (2026) and state abbreviation where relevant',
      'Test with SERP preview tools before deploying',
    ],
  },
  {
    priority: 5,
    title: 'Reduce Unused JavaScript on 14 Pages',
    impact: 'MEDIUM',
    effort: 'MEDIUM',
    timeline: '2-3 weeks',
    description: '14 pages load unnecessary JavaScript, hurting Core Web Vitals scores. This impacts mobile rankings especially.',
    steps: [
      'Run Lighthouse audit on the 14 affected pages',
      'Implement dynamic imports for calculator components',
      'Remove unused dependencies and dead code',
      'Target Lighthouse Performance score > 90 on mobile',
    ],
  },
  {
    priority: 6,
    title: 'Submit to Google Search Console & Request Indexing',
    impact: 'MEDIUM',
    effort: 'LOW',
    timeline: '1-2 days',
    description: 'The site has minimal GSC presence with only 61 impressions in 24 hours. Ensure sitemap is submitted and request indexing for key pages.',
    steps: [
      'Verify GSC property is properly set up with sitemap submitted',
      'Request indexing for all calculator pages via URL Inspection tool',
      'Monitor crawl stats and index coverage reports weekly',
      'Fix any discovered crawl errors immediately',
    ],
  },
  {
    priority: 7,
    title: 'Fix Security Headers',
    impact: 'LOW',
    effort: 'LOW',
    timeline: '1 day',
    description: 'Missing HSTS, Content-Security-Policy, and Referrer-Policy headers. While not a direct ranking factor, they affect trust and security.',
    steps: [
      'Add Strict-Transport-Security header',
      'Add Content-Security-Policy header',
      'Add Referrer-Policy: strict-origin-when-cross-origin',
      'Test with securityheaders.com',
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 70) return '#10b981';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score: number): string {
  if (score >= 70) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'Critical';
}

function getSeverityIcon(severity: 'high' | 'medium' | 'low') {
  switch (severity) {
    case 'high':
      return <XCircle className="h-4 w-4 text-red-400" />;
    case 'medium':
      return <AlertTriangle className="h-4 w-4 text-amber-400" />;
    case 'low':
      return <Info className="h-4 w-4 text-blue-400" />;
  }
}

function getSeverityBadge(severity: 'high' | 'medium' | 'low') {
  const styles = {
    high: 'bg-red-500/15 text-red-400 border-red-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    low: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 border ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function getImpactBadge(impact: string) {
  const styles: Record<string, string> = {
    HIGH: 'bg-red-500/15 text-red-400',
    MEDIUM: 'bg-amber-500/15 text-amber-400',
    LOW: 'bg-blue-500/15 text-blue-400',
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 ${styles[impact] || styles.LOW}`}>
      {impact}
    </span>
  );
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border/30 bg-card/95 backdrop-blur-md px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {entry.name === 'position' ? `#${Math.round(entry.value)}` : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── Section Component ──────────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────────

export default function SEOAuditDashboard() {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero Header ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-mesh-hero border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-sm text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              SEO Audit Report — Critical Issues Found
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              SEO Audit: <span className="gradient-text">thetaxcalc.com</span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Comprehensive analysis of search engine optimization, indexing, and ranking performance.
              Data sourced from Google Search Console, Screaming Frog crawl, and Google Ads Keyword Planner.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-400" />
                Audit Date: June 6, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-400" />
                thetaxcalc.com
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-400" />
                64 Pages Crawled
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ─── Executive Summary ────────────────────────────────── */}
        <section>
          <SectionTitle icon={BarChart3} title="Executive Summary" subtitle="Overall SEO health at a glance" />

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Overall Score */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-3">Overall SEO Score</p>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={getScoreColor(OVERALL_SCORE)}
                      strokeWidth="8"
                      strokeDasharray={`${(OVERALL_SCORE / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: getScoreColor(OVERALL_SCORE) }}>{OVERALL_SCORE}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge
                  className="mt-3"
                  style={{
                    backgroundColor: `${getScoreColor(OVERALL_SCORE)}20`,
                    color: getScoreColor(OVERALL_SCORE),
                    border: `1px solid ${getScoreColor(OVERALL_SCORE)}40`,
                  }}
                >
                  {getScoreLabel(OVERALL_SCORE)}
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6 space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Google Search Console (24h)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-2xl font-bold text-red-400">2</p>
                    <p className="text-[11px] text-muted-foreground">Total Clicks</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-2xl font-bold text-amber-400">61</p>
                    <p className="text-[11px] text-muted-foreground">Impressions</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-2xl font-bold text-red-400">3.3%</p>
                    <p className="text-[11px] text-muted-foreground">Avg CTR</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-2xl font-bold text-red-400">48+</p>
                    <p className="text-[11px] text-muted-foreground">Avg Position</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues Summary */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6 space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Issues Found</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-foreground">High Priority</span>
                    </div>
                    <span className="text-lg font-bold text-red-400">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-foreground">Medium Priority</span>
                    </div>
                    <span className="text-lg font-bold text-amber-400">3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-foreground">Low Priority</span>
                    <span className="ml-auto text-lg font-bold text-blue-400">8</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/20">
                  <p className="text-xs text-muted-foreground">Total issues: <strong className="text-foreground">12</strong> affecting <strong className="text-foreground">~140 URL instances</strong></p>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6 space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Score Breakdown</p>
                {SCORE_BREAKDOWN.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.category}</span>
                      <span className="font-semibold" style={{ color: getScoreColor(item.score) }}>{item.score}</span>
                    </div>
                    <Progress value={item.score} className="h-1.5" style={{ '--progress-color': item.color } as React.CSSProperties} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── Critical Findings ────────────────────────────────── */}
        <section>
          <SectionTitle icon={AlertTriangle} title="Critical Findings" subtitle="The 3 biggest problems preventing search visibility" />

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Zero Backlinks',
                icon: Link2,
                severity: 'CRITICAL',
                color: 'red',
                description: 'No external websites link to thetaxcalc.com. Google sees zero authority signals. Your direct competitor has ~8K backlinks.',
                metric: '0',
                metricLabel: 'Referring Domains',
              },
              {
                title: 'No Search Visibility',
                icon: Eye,
                severity: 'CRITICAL',
                color: 'red',
                description: 'Site doesn\'t rank for any target keywords. Average position is 48+ (page 5+). Only 2 clicks in 24 hours.',
                metric: '0',
                metricLabel: 'Top 10 Keywords',
              },
              {
                title: 'Only 7 States Covered',
                icon: Globe,
                severity: 'HIGH',
                color: 'amber',
                description: 'Competitors cover all 50 states. Each missing state = lost keyword opportunities. paychecktaxcalculator.net covers all 50.',
                metric: '43',
                metricLabel: 'Missing States',
              },
            ].map((finding, i) => {
              const Icon = finding.icon;
              return (
                <Card
                  key={i}
                  className={`border-${
                    finding.color === 'red' ? 'red' : 'amber'
                  }-500/20 bg-${
                    finding.color === 'red' ? 'red' : 'amber'
                  }-500/5`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${
                        finding.color === 'red' ? 'red' : 'amber'
                      }-500/10`}>
                        <Icon className={`h-5 w-5 text-${
                          finding.color === 'red' ? 'red' : 'amber'
                        }-400`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 bg-${
                        finding.color === 'red' ? 'red' : 'amber'
                      }-500/15 text-${
                        finding.color === 'red' ? 'red' : 'amber'
                      }-400 border border-${
                        finding.color === 'red' ? 'red' : 'amber'
                      }-500/30`}>
                        {finding.severity}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{finding.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{finding.description}</p>
                    <div className="pt-2 border-t border-border/20">
                      <p className={`text-2xl font-bold text-${
                        finding.color === 'red' ? 'red' : 'amber'
                      }-400`}>{finding.metric}</p>
                      <p className="text-[11px] text-muted-foreground">{finding.metricLabel}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ─── GSC Performance ──────────────────────────────────── */}
        <section>
          <SectionTitle icon={BarChart3} title="Google Search Console Performance" subtitle="Real data from the last 24 hours — extremely low visibility" />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Impressions Chart */}
            <Card className="lg:col-span-2 border-border/30 bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Impressions Over Time (24h)</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GSC_TIMELINE}>
                      <defs>
                        <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.06} />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 10, fill: 'currentColor' }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: 'currentColor' }}
                        tickLine={false}
                        axisLine={false}
                        width={30}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="impressions"
                        stroke="#f59e0b"
                        fill="url(#impressionsGrad)"
                        strokeWidth={2}
                        name="impressions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="border-border/30 bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">By Device</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {GSC_DEVICES.map((device) => {
                  const Icon = device.icon;
                  return (
                    <div key={device.name} className="rounded-lg bg-background/50 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{device.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Pos #{Math.round(device.position)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">
                          <MousePointerClick className="h-3 w-3 inline mr-1" />
                          {device.clicks} clicks
                        </span>
                        <span className="text-muted-foreground">
                          <Eye className="h-3 w-3 inline mr-1" />
                          {device.impressions} impr.
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <p className="text-xs text-red-400 font-medium">⚠ Mobile has 0 clicks from 8 impressions</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Mobile-friendliness and mobile speed may be impacting CTR.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Page Performance Table */}
          <Card className="mt-6 border-border/30 bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Page Performance (GSC — 24h)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-80">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Page</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clicks</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impressions</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CTR</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {GSC_PAGES.map((page, i) => (
                        <tr key={i} className="border-b border-border/10 hover:bg-muted/5">
                          <td className="py-2.5 px-4 font-mono text-xs text-foreground">{page.url}</td>
                          <td className="py-2.5 px-4 text-right font-semibold text-foreground">{page.clicks}</td>
                          <td className="py-2.5 px-4 text-right text-muted-foreground">{page.impressions}</td>
                          <td className="py-2.5 px-4 text-right">
                            <span className={page.ctr > 0 ? 'text-emerald-400' : 'text-muted-foreground'}>
                              {page.ctr}%
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <span className={page.position <= 10 ? 'text-emerald-400' : page.position <= 30 ? 'text-amber-400' : 'text-red-400'}>
                              #{Math.round(page.position * 10) / 10}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        {/* ─── What's Working ────────────────────────────────────── */}
        <section>
          <SectionTitle icon={CheckCircle2} title="What's Working" subtitle="These elements are properly implemented" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Meta Robots Tags', desc: 'index, follow correctly configured with max-snippet, max-image-preview, max-video-preview' },
              { title: 'Open Graph Tags', desc: 'Complete OG implementation: og:title, og:description, og:image (1200x630), og:type, og:url' },
              { title: 'Twitter Cards', desc: 'summary_large_image card properly configured' },
              { title: 'Clean URL Structure', desc: '/paycheck-calculator, /illinois-tax-calculator, /salary/75000, /blog/slug — all clean and descriptive' },
              { title: 'Sitemap.xml', desc: 'Dynamic sitemap with proper priorities, changeFrequency, and all pages listed' },
              { title: 'Robots.txt', desc: 'Properly configured with AI bot access, API/admin blocked, sitemap reference included' },
              { title: 'Canonical URLs', desc: 'Self-referencing canonical tags on all pages with proper hreflang' },
              { title: 'RSS Feed', desc: '/feed.xml properly configured for content syndication' },
              { title: 'Internal Linking', desc: 'Comprehensive footer with links to all calculators, salary pages, blog, and comparisons' },
              { title: 'Accessibility', desc: '"Skip to main content" link, semantic HTML, proper ARIA attributes' },
              { title: 'Content Freshness', desc: 'Updated for 2026 tax year, references IRS publications and state revenue departments' },
              { title: 'Next.js Architecture', desc: 'SSR/SSG capabilities, good foundation for Core Web Vitals optimization' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Technical Issues ──────────────────────────────────── */}
        <section>
          <SectionTitle icon={Server} title="Technical SEO Issues" subtitle="From Screaming Frog crawl — 64 pages analyzed" />

          <div className="space-y-2">
            {TECHNICAL_ISSUES.map((issue) => (
              <Card key={issue.id} className="border-border/30 bg-card/50 overflow-hidden">
                <button
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/5 transition-colors"
                  onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                >
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{issue.title}</span>
                      <Badge variant="outline" className="text-[10px] shrink-0">{issue.count} URL{issue.count > 1 ? 's' : ''}</Badge>
                    </div>
                  </div>
                  {getSeverityBadge(issue.severity)}
                  {expandedIssue === issue.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {expandedIssue === issue.id && (
                  <div className="px-4 pb-4 pt-0 space-y-3 border-t border-border/20">
                    <div className="pt-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">{issue.description}</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                      <p className="text-xs font-semibold text-emerald-400 mb-1">How to Fix:</p>
                      <p className="text-xs text-muted-foreground">{issue.fix}</p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Keyword Analysis ──────────────────────────────────── */}
        <section>
          <SectionTitle icon={Search} title="Target Keyword Analysis" subtitle="Key terms the site should rank for — none currently in top 50" />

          <Card className="border-border/30 bg-card/50">
            <CardContent className="p-0">
              <ScrollArea className="max-h-96">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Keyword</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Volume</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Position</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Opportunity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TARGET_KEYWORDS.map((kw, i) => {
                        const difficultyNum = kw.difficulty;
                        const opportunity = difficultyNum < 30 ? 'Easy Win' : difficultyNum < 50 ? 'Achievable' : difficultyNum < 70 ? 'Competitive' : 'Hard';
                        const oppColor = difficultyNum < 30 ? 'text-emerald-400' : difficultyNum < 50 ? 'text-amber-400' : difficultyNum < 70 ? 'text-orange-400' : 'text-red-400';
                        return (
                          <tr key={i} className="border-b border-border/10 hover:bg-muted/5">
                            <td className="py-2.5 px-4 font-medium text-foreground">{kw.keyword}</td>
                            <td className="py-2.5 px-4 text-center text-muted-foreground">{kw.volume}</td>
                            <td className="py-2.5 px-4 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <Progress value={difficultyNum} className="h-1.5 w-16" />
                                <span className="text-xs text-muted-foreground">{difficultyNum}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span className="text-red-400 font-medium">{kw.currentPosition}</span>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span className={`text-xs font-semibold ${oppColor}`}>{opportunity}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">3</p>
              <p className="text-xs text-muted-foreground mt-1">Easy Win Keywords</p>
              <p className="text-[11px] text-muted-foreground">Bonus, lottery, DoorDash calculators</p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">3</p>
              <p className="text-xs text-muted-foreground mt-1">Achievable Keywords</p>
              <p className="text-[11px] text-muted-foreground">Self-employment, withholding, overtime</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-red-400">9</p>
              <p className="text-xs text-muted-foreground mt-1">Competitive/Hard Keywords</p>
              <p className="text-[11px] text-muted-foreground">Paycheck, tax, payroll, income tax calculators</p>
            </div>
          </div>
        </section>

        {/* ─── Competitor Analysis ───────────────────────────────── */}
        <section>
          <SectionTitle icon={Target} title="Competitor Comparison" subtitle="How thetaxcalc.com stacks up against the competition" />

          <Card className="border-border/30 bg-card/50">
            <CardContent className="p-0">
              <ScrollArea className="max-h-96">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Site</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Domain Auth</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">States</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Calculators</th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Backlinks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPETITORS.map((comp, i) => (
                        <tr
                          key={i}
                          className={`border-b border-border/10 ${comp.isUs ? 'bg-emerald-500/5' : 'hover:bg-muted/5'}`}
                        >
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              {comp.isUs && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">YOU</span>}
                              <span className={`font-medium ${comp.isUs ? 'text-emerald-400' : 'text-foreground'}`}>{comp.name}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{comp.domain}</p>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <span className={comp.domainAuth >= 70 ? 'text-red-400' : comp.domainAuth >= 40 ? 'text-amber-400' : 'text-emerald-400'}>
                              {comp.domainAuth}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-center text-muted-foreground">{comp.states}</td>
                          <td className="py-2.5 px-4 text-center text-muted-foreground">{comp.calculators}</td>
                          <td className="py-2.5 px-4 text-center text-muted-foreground">{comp.backlinks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Key Insight: Closest Competitor Gap</p>
                <p className="text-sm text-muted-foreground mt-1">
                  paychecktaxcalculator.net (DA 22) is your most direct competitor — similar age, also a tax calculator site.
                  They cover <strong className="text-foreground">all 50 states</strong> while you only cover 7.
                  Closing this gap would multiply your keyword coverage by ~7x. Their ~8K backlinks suggest
                  a focused link-building campaign is achievable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Schema Markup Analysis ────────────────────────────── */}
        <section>
          <SectionTitle icon={FileText} title="Schema Markup Analysis" subtitle="Structured data is critical for rich results — currently almost none" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Current Schema</h3>
                <div className="space-y-2">
                  {[
                    { type: 'Organization', status: 'present' as const, note: 'Basic org info with sameAs links' },
                    { type: 'WebSite + SearchAction', status: 'present' as const, note: 'Search action points to paycheck calculator' },
                    { type: 'AggregateRating', status: 'warning' as const, note: 'Self-generated 4.8/5 rating — risky, not from real reviews' },
                  ].map((schema, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {schema.status === 'present' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      )}
                      <span className="text-foreground font-medium">{schema.type}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{schema.note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Missing Schema (Critical)</h3>
                <div className="space-y-2">
                  {[
                    { type: 'SoftwareApplication', note: 'For each calculator — enables calculator rich results' },
                    { type: 'FAQPage', note: 'Calculator FAQ sections — enables FAQ rich results' },
                    { type: 'BreadcrumbList', note: 'Navigation breadcrumbs — improves SERP appearance' },
                    { type: 'HowTo', note: 'Step-by-step guides — enables HowTo rich results' },
                    { type: 'Article', note: 'Blog posts — enables article rich results' },
                    { type: 'FinancialProduct', note: 'Tax calculation tools — finance-specific schema' },
                  ].map((schema, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="text-foreground font-medium">{schema.type}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{schema.note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── Action Plan ───────────────────────────────────────── */}
        <section>
          <SectionTitle icon={Zap} title="Prioritized Action Plan" subtitle="What to fix first — ordered by impact and effort" />

          <div className="space-y-4">
            {ACTION_PLAN.map((action) => (
              <Card key={action.priority} className="border-border/30 bg-card/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-lg shrink-0">
                      {action.priority}
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-foreground">{action.title}</h3>
                        {getImpactBadge(action.impact)}
                        <Badge variant="outline" className="text-[10px]">
                          {action.effort} Effort
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          <Clock className="h-3 w-3 mr-1" />
                          {action.timeline}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-foreground">Steps:</p>
                        {action.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-semibold shrink-0 text-[10px]">
                              {i + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Timeline Projection ────────────────────────────────── */}
        <section>
          <SectionTitle icon={TrendingUp} title="Projected Timeline" subtitle="Expected results if all actions are implemented" />

          <div className="grid gap-4 sm:grid-cols-4">
            {[
              {
                period: 'Month 1-2',
                title: 'Foundation',
                items: ['Fix all technical issues', 'Add schema markup', 'Submit to GSC', 'Fix page titles'],
                color: 'red',
                target: 'SEO Score: 38 → 48',
              },
              {
                period: 'Month 2-4',
                title: 'Content Expansion',
                items: ['Add 15+ state calculators', 'Build linkable assets', 'Start outreach campaign', 'Publish pillar content'],
                color: 'amber',
                target: 'SEO Score: 48 → 55',
              },
              {
                period: 'Month 4-6',
                title: 'Authority Building',
                items: ['Secure 20+ quality backlinks', 'Expand to 30+ states', 'Target easy-win keywords', 'Build topical authority'],
                color: 'emerald',
                target: 'SEO Score: 55 → 65',
              },
              {
                period: 'Month 6-12',
                title: 'Competitive Growth',
                items: ['All 50 states covered', '100+ quality backlinks', 'Rank for medium-difficulty keywords', 'Establish domain authority'],
                color: 'emerald',
                target: 'SEO Score: 65 → 75+',
              },
            ].map((phase, i) => (
              <Card key={i} className={`border-${phase.color === 'red' ? 'red' : phase.color === 'amber' ? 'amber' : 'emerald'}-500/20 bg-${phase.color === 'red' ? 'red' : phase.color === 'amber' ? 'amber' : 'emerald'}-500/5`}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold text-${phase.color === 'red' ? 'red' : phase.color === 'amber' ? 'amber' : 'emerald'}-400`}>{phase.period}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{phase.title}</h3>
                  <ul className="space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className={`h-1 w-1 rounded-full bg-${phase.color === 'red' ? 'red' : phase.color === 'amber' ? 'amber' : 'emerald'}-400 shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-border/20">
                    <p className={`text-xs font-semibold text-${phase.color === 'red' ? 'red' : phase.color === 'amber' ? 'amber' : 'emerald'}-400`}>
                      {phase.target}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Summary ────────────────────────────────────────────── */}
        <section className="pb-8">
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Bottom Line</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TheTaxCalc has a <strong className="text-foreground">solid technical foundation</strong> and
                    <strong className="text-foreground"> quality content</strong>, but is invisible in search because of three critical gaps:
                    <strong className="text-red-400"> zero backlinks</strong>,
                    <strong className="text-red-400"> no search visibility</strong>, and
                    <strong className="text-amber-400"> limited state coverage</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The good news: these are all fixable. Your direct competitor paychecktaxcalculator.net (DA 22) proves
                    that a focused tax calculator site <em>can</em> rank. With systematic schema markup, link building,
                    and state expansion, the site could reach <strong className="text-foreground">50K+ monthly organic visitors</strong> within
                    6-12 months. The content is already there — you just need to make it findable.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Start with Action #1: Schema Markup — highest impact, medium effort</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
