'use client';

import { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { type PaycheckResult, formatCurrency } from '@/lib/finance-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ─── Color Palette ───────────────────────────────────────────────────────────

const COLORS = {
  netTakeHome: '#10b981', // emerald-500
  federalTax: '#ef4444', // red-500
  fica: '#f97316', // orange-500
  stateTax: '#f59e0b', // amber-500
  retirement401k: '#0d9488', // teal-600
  hsa: '#06b6d4', // cyan-500
} as const;

const BREAKDOWN_KEYS = [
  'netTakeHome',
  'federalTax',
  'fica',
  'stateTax',
  'retirement401k',
  'hsa',
] as const;

type BreakdownKey = (typeof BREAKDOWN_KEYS)[number];

const BREAKDOWN_LABELS: Record<BreakdownKey, string> = {
  netTakeHome: 'Net Take-Home',
  federalTax: 'Federal Tax',
  fica: 'FICA',
  stateTax: 'State Tax',
  retirement401k: '401(k)',
  hsa: 'HSA',
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      fill: string;
      percent?: number;
    };
  }>;
}

function PieCustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(item.value)}
      </p>
      {item.payload.percent !== undefined && (
        <p className="text-xs text-muted-foreground">
          {item.payload.percent.toFixed(1)}% of gross
        </p>
      )}
    </div>
  );
}

function BarCustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{item.payload.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(item.value)}
      </p>
    </div>
  );
}

// ─── Custom Legend ────────────────────────────────────────────────────────────

interface LegendPayloadEntry {
  value: string;
  color: string;
  payload?: {
    stroke?: string;
    fill?: string;
  };
}

function CustomLegend({ payload }: { payload?: LegendPayloadEntry[] }) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Component Props ─────────────────────────────────────────────────────────

interface TaxBreakdownChartProps {
  result: PaycheckResult;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function TaxBreakdownChart({ result }: TaxBreakdownChartProps) {
  const [viewMode, setViewMode] = useState<'annual' | 'perPeriod'>('annual');

  const isAnnual = viewMode === 'annual';

  // ─── Pie Chart Data ──────────────────────────────────────────────────────

  const pieData = useMemo(() => {
    const gross = isAnnual ? result.grossAnnual : result.grossPerPeriod;

    const entries: { name: string; value: number; fill: string; percent: number }[] = [
      {
        name: BREAKDOWN_LABELS.netTakeHome,
        value: Math.max(0, isAnnual ? result.netAnnual : result.netPerPeriod),
        fill: COLORS.netTakeHome,
        percent: gross > 0 ? (isAnnual ? result.netAnnual : result.netPerPeriod) / gross : 0,
      },
      {
        name: BREAKDOWN_LABELS.federalTax,
        value: Math.max(0, isAnnual ? result.federalTax : result.federalTaxPerPeriod),
        fill: COLORS.federalTax,
        percent: gross > 0 ? (isAnnual ? result.federalTax : result.federalTaxPerPeriod) / gross : 0,
      },
      {
        name: BREAKDOWN_LABELS.fica,
        value: Math.max(0, isAnnual ? result.ficaTotal : result.ficaPerPeriod),
        fill: COLORS.fica,
        percent: gross > 0 ? (isAnnual ? result.ficaTotal : result.ficaPerPeriod) / gross : 0,
      },
      {
        name: BREAKDOWN_LABELS.stateTax,
        value: Math.max(0, isAnnual ? result.stateTax : result.stateTaxPerPeriod),
        fill: COLORS.stateTax,
        percent: gross > 0 ? (isAnnual ? result.stateTax : result.stateTaxPerPeriod) / gross : 0,
      },
      {
        name: BREAKDOWN_LABELS.retirement401k,
        value: Math.max(0, isAnnual ? result.retirement401k : result.retirement401kPerPeriod),
        fill: COLORS.retirement401k,
        percent: gross > 0 ? (isAnnual ? result.retirement401k : result.retirement401kPerPeriod) / gross : 0,
      },
      {
        name: BREAKDOWN_LABELS.hsa,
        value: Math.max(0, isAnnual ? result.hsaContribution : result.hsaPerPeriod),
        fill: COLORS.hsa,
        percent: gross > 0 ? (isAnnual ? result.hsaContribution : result.hsaPerPeriod) / gross : 0,
      },
    ];

    // Filter out zero-value entries so they don't clutter the chart
    return entries.filter((e) => e.value > 0);
  }, [result, isAnnual]);

  // ─── Bar Chart Data ──────────────────────────────────────────────────────

  const barData = useMemo(() => {
    const entries: { name: string; value: number; fill: string }[] = [
      {
        name: BREAKDOWN_LABELS.federalTax,
        value: Math.max(0, isAnnual ? result.federalTax : result.federalTaxPerPeriod),
        fill: COLORS.federalTax,
      },
      {
        name: BREAKDOWN_LABELS.fica,
        value: Math.max(0, isAnnual ? result.ficaTotal : result.ficaPerPeriod),
        fill: COLORS.fica,
      },
      {
        name: BREAKDOWN_LABELS.stateTax,
        value: Math.max(0, isAnnual ? result.stateTax : result.stateTaxPerPeriod),
        fill: COLORS.stateTax,
      },
      {
        name: BREAKDOWN_LABELS.retirement401k,
        value: Math.max(0, isAnnual ? result.retirement401k : result.retirement401kPerPeriod),
        fill: COLORS.retirement401k,
      },
      {
        name: BREAKDOWN_LABELS.hsa,
        value: Math.max(0, isAnnual ? result.hsaContribution : result.hsaPerPeriod),
        fill: COLORS.hsa,
      },
    ];

    // Filter out zero-value entries
    return entries.filter((e) => e.value > 0);
  }, [result, isAnnual]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-foreground text-lg">
            Where Your Money Goes
          </CardTitle>
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as 'annual' | 'perPeriod')}
          >
            <TabsList>
              <TabsTrigger value="annual">Annual</TabsTrigger>
              <TabsTrigger value="perPeriod">Per Period</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ─── Pie Chart ────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              Salary Breakdown
            </h3>
            <div className="w-full" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Center summary below pie */}
            <div className="mt-2 text-center">
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(isAnnual ? result.netAnnual : result.netPerPeriod)}
              </p>
              <p className="text-sm text-muted-foreground">
                Net {isAnnual ? 'Annual' : 'Per Period'} Take-Home
              </p>
            </div>
          </div>

          {/* ─── Bar Chart ────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              Deduction Comparison
            </h3>
            <div className="w-full" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <XAxis
                    type="number"
                    tickFormatter={(value: number) => formatCurrency(value)}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={75}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<BarCustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {barData.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary below bar chart */}
            <div className="mt-2 text-center">
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(isAnnual ? result.totalDeductions : result.totalDeductionsPerPeriod)}
              </p>
              <p className="text-sm text-muted-foreground">
                Total {isAnnual ? 'Annual' : 'Per Period'} Deductions
              </p>
            </div>
          </div>
        </div>

        {/* ─── Effective Rate Footer ────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t pt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {(result.effectiveTaxRate * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Effective Tax Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {(result.marginalTaxRate * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Marginal Tax Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(isAnnual ? result.grossAnnual : result.grossPerPeriod)}
            </p>
            <p className="text-xs text-muted-foreground">
              Gross {isAnnual ? 'Annual' : 'Per Period'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaxBreakdownChart;
