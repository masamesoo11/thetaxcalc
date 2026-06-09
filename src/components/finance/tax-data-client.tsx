'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ArrowUpDown,
  Copy,
  Check,
  Quote,
  Link as LinkIcon,
  ChevronDown,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STATE_SALES_TAX, ALL_STATE_KEYS, type StateSalesTax } from '@/lib/state-sales-tax-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-muted/20 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
      aria-label={copied ? 'Copied!' : label}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ─── Cite & Share Buttons ─────────────────────────────────────────────────────

function CiteShareButtons({ title, sectionId }: { title: string; sectionId: string }) {
  const [cited, setCited] = useState(false);
  const citation = `TheTaxCalc. (2026). ${title}. Retrieved from https://thetaxcalc.com/tax-data#${sectionId}`;
  const url = `https://thetaxcalc.com/tax-data#${sectionId}`;

  const handleCite = async () => {
    try { await navigator.clipboard.writeText(citation); } catch { /* */ }
    setCited(true);
    setTimeout(() => setCited(false), 2000);
  };

  const handleLink = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* */ }
  };

  const embedCode = `<iframe src="https://thetaxcalc.com/tax-data#${sectionId}" width="100%" height="500" frameborder="0" style="border-radius:12px;" title="${title} by TheTaxCalc"></iframe>`;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCite}
        className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-muted/20 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
      >
        {cited ? <Check className="h-3 w-3 text-emerald-400" /> : <Quote className="h-3 w-3" />}
        {cited ? 'Copied!' : 'Cite'}
      </button>
      <button
        onClick={handleLink}
        className="inline-flex items-center gap-1 rounded-lg border border-border/40 bg-muted/20 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
      >
        <LinkIcon className="h-3 w-3" />
        Link
      </button>
      <CopyBtn text={embedCode} label="Embed" />
    </div>
  );
}

// ─── Sort Types ──────────────────────────────────────────────────────────────

type SortKey = 'name' | 'stateRate' | 'avgLocalRate' | 'combinedRate';
type SortDir = 'asc' | 'desc';

// ─── Sort Header Button ──────────────────────────────────────────────────────

function SortHeaderButton({ k, label, sortKey, sortDir, onSort }: { k: SortKey; label: string; sortKey: SortKey; sortDir: SortDir; onSort: (k: SortKey) => void }) {
  return (
    <button
      onClick={() => onSort(k)}
      className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
    >
      {label}
      <ArrowUpDown
        className={`h-3 w-3 transition-opacity ${
          sortKey === k ? 'opacity-100' : 'opacity-30'
        }`}
      />
      {sortKey === k && (
        <span className="text-[10px] text-muted-foreground">
          {sortDir === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </button>
  );
}

// ─── Sortable Table ──────────────────────────────────────────────────────────

export function SalesTaxTable() {
  const [sortKey, setSortKey] = useState<SortKey>('combinedRate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'tax' | 'notax'>('all');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  };

  const data = useMemo(() => {
    let items = ALL_STATE_KEYS.map((key) => {
      const s = STATE_SALES_TAX[key];
      return {
        key,
        name: s.name,
        abbr: s.abbreviation,
        stateRate: s.stateRate,
        avgLocalRate: s.avgLocalRate,
        combinedRate: s.combinedRate,
        noStateTax: s.noStateTax,
        groceryExempt: s.groceryExempt,
        clothingExempt: s.clothingExempt,
      };
    });

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.abbr.toLowerCase().includes(q)
      );
    }

    if (filter === 'tax') items = items.filter((i) => !i.noStateTax);
    if (filter === 'notax') items = items.filter((i) => i.noStateTax);

    items.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'name') return dir * a.name.localeCompare(b.name);
      return dir * ((a[sortKey] as number) - (b[sortKey] as number));
    });

    return items;
  }, [sortKey, sortDir, search, filter]);

  const fmt = (rate: number) =>
    rate === 0 ? '0%' : (rate * 100).toFixed(2) + '%';

  const handleDownloadCSV = () => {
    const header = 'State,Abbreviation,State Rate,Avg Local Rate,Combined Rate,Grocery Exempt,Clothing Exempt\n';
    const rows = ALL_STATE_KEYS.map((key) => {
      const s = STATE_SALES_TAX[key];
      return `${s.name},${s.abbreviation},${fmt(s.stateRate)},${fmt(s.avgLocalRate)},${fmt(s.combinedRate)},${s.groceryExempt ? 'Yes' : 'No'},${s.clothingExempt ? 'Yes' : 'No'}`;
    }).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thetaxcalc-sales-tax-rates-2026.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border/40 bg-muted/20 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/40 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all' as const, label: 'All 50' },
            { key: 'tax' as const, label: 'Has Tax' },
            { key: 'notax' as const, label: 'No Tax' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                filter === f.key
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-muted/20 text-muted-foreground border border-border/20 hover:border-emerald-500/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleDownloadCSV}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
        >
          <Download className="h-3.5 w-3.5" />
          CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/20">
              <tr>
                <th className="px-4 py-3 text-left">
                  <SortHeaderButton k="name" label="State" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortHeaderButton k="stateRate" label="State Rate" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  <SortHeaderButton k="avgLocalRate" label="Avg Local" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortHeaderButton k="combinedRate" label="Combined" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Exemptions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.key}
                  className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${
                    row.noStateTax ? 'bg-emerald-500/[0.03]' : ''
                  }`}
                >
                  <td className="px-4 py-2.5 text-sm">
                    <span className="font-semibold text-foreground">{row.name}</span>
                    <span className="ml-1.5 text-xs text-muted-foreground">({row.abbr})</span>
                    {row.noStateTax && (
                      <span className="ml-2 inline-flex items-center rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                        NO TAX
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-sm">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                        row.stateRate === 0
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {fmt(row.stateRate)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground hidden sm:table-cell">
                    {fmt(row.avgLocalRate)}
                  </td>
                  <td className="px-4 py-2.5 text-sm">
                    <span className="font-semibold text-foreground">
                      {fmt(row.combinedRate)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground hidden md:table-cell">
                    {[
                      row.groceryExempt && 'Groceries',
                      row.clothingExempt && 'Clothing',
                    ]
                      .filter(Boolean)
                      .join(', ') || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Showing {data.length} of 50 states. Data sourced from state revenue departments and the Tax Foundation, updated for 2026.
      </p>
    </div>
  );
}

// ─── Sales Tax Chart (Top 10 / Bottom 10) ────────────────────────────────────

export function SalesTaxChart() {
  const [view, setView] = useState<'highest' | 'lowest'>('highest');

  const chartData = useMemo(() => {
    const sorted = ALL_STATE_KEYS.map((key) => {
      const s = STATE_SALES_TAX[key];
      return {
        name: s.abbreviation,
        fullName: s.name,
        stateRate: +(s.stateRate * 100).toFixed(2),
        localRate: +(s.avgLocalRate * 100).toFixed(2),
        combined: +(s.combinedRate * 100).toFixed(2),
        noStateTax: s.noStateTax,
      };
    }).sort((a, b) =>
      view === 'highest'
        ? b.combined - a.combined
        : a.combined - b.combined
    );
    return sorted.slice(0, 10);
  }, [view]);

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'highest' as const, label: 'Highest 10', icon: TrendingUp },
          { key: 'lowest' as const, label: 'Lowest 10', icon: TrendingDown },
        ].map((v) => {
          const Icon = v.icon;
          return (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                view === v.key
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-muted/20 text-muted-foreground border border-border/20 hover:border-emerald-500/20'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border/30 bg-card/50 p-4">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === 'stateRate' ? 'State Rate' : name === 'localRate' ? 'Avg Local' : 'Combined',
              ]}
              labelFormatter={(label: string) => {
                const item = chartData.find((d) => d.name === label);
                return item?.fullName || label;
              }}
            />
            <Legend
              formatter={(value: string) =>
                value === 'stateRate' ? 'State Rate' : value === 'localRate' ? 'Avg Local' : 'Combined'
              }
              wrapperStyle={{ fontSize: '11px' }}
            />
            <Bar dataKey="stateRate" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="localRate" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {view === 'highest'
          ? 'Louisiana has the highest combined sales tax rate at 9.56%, driven by high local surtaxes.'
          : 'Five states (OR, DE, MT, NH) have 0% combined sales tax. Alaska has no state tax but allows local taxes.'}
      </p>
    </div>
  );
}

// ─── Federal Brackets Chart ──────────────────────────────────────────────────

const BRACKET_DATA_SINGLE = [
  { bracket: '10%', min: 0, max: 11925 },
  { bracket: '12%', min: 11926, max: 48475 },
  { bracket: '22%', min: 48476, max: 103350 },
  { bracket: '24%', min: 103351, max: 197300 },
  { bracket: '32%', min: 197301, max: 250525 },
  { bracket: '35%', min: 250526, max: 626350 },
  { bracket: '37%', min: 626351, max: 626350 + 1 },
];

const BRACKET_COLORS = [
  '#10b981', '#34d399', '#6ee7b7', '#a7f3d0',
  '#fbbf24', '#f59e0b', '#ef4444',
];

export function FederalBracketsChart() {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={BRACKET_DATA_SINGLE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="bracket"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Upper Limit']}
            labelFormatter={(label: string) => `${label} Bracket`}
          />
          <Bar dataKey="max" radius={[4, 4, 0, 0]}>
            {BRACKET_DATA_SINGLE.map((_, index) => (
              <Cell key={`cell-${index}`} fill={BRACKET_COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── No-Income-Tax States Comparison ─────────────────────────────────────────

const NO_INCOME_TAX_STATES = [
  { state: 'Alaska', abbr: 'AK', incomeTax: 0, salesTax: 1.82, propertyTax: 1.18, note: 'Pays residents a dividend' },
  { state: 'Florida', abbr: 'FL', incomeTax: 0, salesTax: 7.02, propertyTax: 0.86, note: 'Popular for retirees' },
  { state: 'Nevada', abbr: 'NV', incomeTax: 0, salesTax: 8.23, propertyTax: 0.59, note: 'Relies on gaming/gaming tax' },
  { state: 'New Hampshire', abbr: 'NH', incomeTax: 0, salesTax: 0, propertyTax: 2.18, note: 'Taxes dividends/interest only' },
  { state: 'South Dakota', abbr: 'SD', incomeTax: 0, salesTax: 6.40, propertyTax: 1.22, note: 'Low overall tax burden' },
  { state: 'Tennessee', abbr: 'TN', incomeTax: 0, salesTax: 9.56, propertyTax: 0.63, note: 'Hall income tax repealed 2021' },
  { state: 'Texas', abbr: 'TX', incomeTax: 0, salesTax: 8.20, propertyTax: 1.69, note: 'Higher property taxes offset' },
  { state: 'Washington', abbr: 'WA', incomeTax: 0, salesTax: 9.41, propertyTax: 0.92, note: 'Capital gains tax since 2023' },
  { state: 'Wyoming', abbr: 'WY', incomeTax: 0, salesTax: 5.36, propertyTax: 0.61, note: 'Mineral revenue funds state' },
];

export function NoIncomeTaxTable() {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/20">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/5">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/5">Income Tax</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/5">Avg Sales Tax</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/5 hidden sm:table-cell">Property Tax</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/5 hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {NO_INCOME_TAX_STATES.map((row, i) => (
              <tr key={row.abbr} className={`border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors ${i % 2 === 1 ? 'bg-muted/[0.02]' : ''}`}>
                <td className="px-4 py-3 text-sm">
                  <span className="font-semibold text-foreground">{row.state}</span>
                  <span className="ml-1 text-xs text-muted-foreground">({row.abbr})</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    0%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {row.salesTax > 0 ? `${row.salesTax}%` : '0%'}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                  {row.propertyTax}%
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Embed Code Snippets ─────────────────────────────────────────────────────

export function DataEmbedSnippets() {
  const [showAll, setShowAll] = useState(false);

  const snippets = [
    {
      label: 'All 50 States Sales Tax Table',
      code: `<iframe src="https://thetaxcalc.com/tax-data#sales-tax-all-states" width="100%" height="600" frameborder="0" style="border-radius:12px;" title="Sales Tax Rates All 50 States by TheTaxCalc"></iframe>`,
    },
    {
      label: 'Top 10 Highest Sales Tax Chart',
      code: `<iframe src="https://thetaxcalc.com/tax-data#sales-tax-charts" width="100%" height="500" frameborder="0" style="border-radius:12px;" title="Top 10 Highest Sales Tax Rates by TheTaxCalc"></iframe>`,
    },
    {
      label: 'Federal Tax Brackets 2026',
      code: `<iframe src="https://thetaxcalc.com/tax-data#federal-brackets" width="100%" height="450" frameborder="0" style="border-radius:12px;" title="2026 Federal Tax Brackets by TheTaxCalc"></iframe>`,
    },
    {
      label: 'No-Income-Tax States Table',
      code: `<iframe src="https://thetaxcalc.com/tax-data#no-income-tax" width="100%" height="400" frameborder="0" style="border-radius:12px;" title="States With No Income Tax by TheTaxCalc"></iframe>`,
    },
  ];

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <BarChart3 className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Embed This <span className="gradient-text">Data</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Copy the iframe code to embed any data section on your website. Free with attribution.
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors mb-4"
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        {showAll ? 'Hide Embed Codes' : 'Show Embed Codes'}
      </button>

      {showAll && (
        <div className="grid gap-3 sm:grid-cols-2">
          {snippets.map((s) => (
            <div key={s.label} className="rounded-lg bg-muted/20 border border-border/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{s.label}</span>
                <CopyBtn text={s.code} label="Copy" />
              </div>
              <pre className="text-[11px] text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
        <Download className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          You can also download the raw data as CSV using the button in the sales tax table above.
          All data is free to use with attribution:{' '}
          <code className="bg-muted/30 px-1 rounded text-[10px]">
            TheTaxCalc. (2026). [Section Title]. https://thetaxcalc.com/tax-data
          </code>
        </p>
      </div>
    </div>
  );
}
