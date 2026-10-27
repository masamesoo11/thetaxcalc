'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// ─── 2026 Tax Bracket Data (IRS Rev. Proc. 2025-32) ────────────────────────────

interface BracketRow {
  rate: string;
  rateNum: number;
  single: string;
  mfj: string;
  hoh: string;
}

// 2026 inflation-adjusted thresholds per filing status (matches src/lib/tax-config.ts)
const BRACKETS_2026 = {
  single: [12400, 50400, 105700, 201775, 256225, 640600],
  mfj: [24800, 100800, 211400, 403550, 512450, 768700],
  hoh: [17700, 67450, 105700, 201750, 256200, 640600],
} as const;

const RATES = [10, 12, 22, 24, 32, 35, 37] as const;

function rangeLabel(lowerLimit: number | null, upperLimit: number): string {
  if (lowerLimit === null) return `$0 – $${upperLimit.toLocaleString('en-US')}`;
  return `$${(lowerLimit + 1).toLocaleString('en-US')} – $${upperLimit.toLocaleString('en-US')}`;
}

function overLabel(lowerLimit: number): string {
  return `Over $${lowerLimit.toLocaleString('en-US')}`;
}

function buildRows(status: 'single' | 'mfj' | 'hoh'): BracketRow[] {
  const limits = BRACKETS_2026[status];
  return RATES.map((rateNum, i) => {
    const label =
      i < limits.length ? rangeLabel(i === 0 ? null : limits[i - 1], limits[i]) : overLabel(limits[limits.length - 1]);
    return { rate: `${rateNum}%`, rateNum, single: '', mfj: '', hoh: '', [status]: label } as unknown as BracketRow;
  });
}

const SINGLE_ROWS = buildRows('single');
const MFJ_ROWS = buildRows('mfj');
const HOH_ROWS = buildRows('hoh');

function getRateColor(rateNum: number): string {
  if (rateNum <= 10) return 'bg-emerald-600/15 text-emerald-600 border-emerald-500/20';
  if (rateNum <= 12) return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
  if (rateNum <= 22) return 'bg-amber-500/15 text-amber-700 border-amber-500/20';
  if (rateNum <= 24) return 'bg-orange-500/15 text-orange-700 border-orange-500/20';
  if (rateNum <= 32) return 'bg-rose-500/15 text-rose-700 border-rose-500/20';
  if (rateNum <= 35) return 'bg-red-500/15 text-red-600 border-red-500/20';
  return 'bg-red-600/20 text-red-600 border-red-500/30';
}

// Cumulative tax owed at the START of each bracket, computed with the
// bracket limits OF THAT FILING STATUS (not a single-filer approximation).
function calculateCumulativeTax(status: 'single' | 'mfj' | 'hoh', bracketIndex: number): number {
  const limits = BRACKETS_2026[status];
  const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35];

  if (bracketIndex === 0) return 0;

  let cumulative = 0;
  let prevLimit = 0;
  for (let i = 0; i < bracketIndex && i < limits.length; i++) {
    cumulative += (limits[i] - prevLimit) * rates[i];
    prevLimit = limits[i];
  }
  return Math.round(cumulative);
}

function BracketTable({ data, status, label }: { data: BracketRow[]; status: 'single' | 'mfj' | 'hoh'; label: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border/20 hover:bg-transparent">
          <TableHead className="text-muted-foreground font-semibold">Rate</TableHead>
          <TableHead className="text-muted-foreground font-semibold">Taxable Income Range ({label})</TableHead>
          <TableHead className="text-muted-foreground font-semibold text-right">Tax on Lower Brackets</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => {
          const taxOnLower = calculateCumulativeTax(status, i);
          return (
            <TableRow key={row.rate} className="border-border/10 hover:bg-muted/30">
              <TableCell>
                <Badge
                  variant="outline"
                  className={`font-bold text-xs px-2.5 py-0.5 border ${getRateColor(row.rateNum)}`}
                >
                  {row.rate}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-foreground">{row[status]}</TableCell>
              <TableCell className="text-right text-muted-foreground tabular-nums">
                {taxOnLower > 0 ? `$${taxOnLower.toLocaleString('en-US')}` : '—'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function BracketsTabs() {
  return (
    <Tabs defaultValue="single" className="w-full">
      <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex bg-muted/50 border border-border/20 rounded-xl p-1 h-auto">
        <TabsTrigger
          value="single"
          className="rounded-lg data-[state=active]:bg-emerald-600/15 data-[state=active]:text-emerald-600 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Single
        </TabsTrigger>
        <TabsTrigger
          value="mfj"
          className="rounded-lg data-[state=active]:bg-emerald-600/15 data-[state=active]:text-emerald-600 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Married Filing Jointly
        </TabsTrigger>
        <TabsTrigger
          value="hoh"
          className="rounded-lg data-[state=active]:bg-emerald-600/15 data-[state=active]:text-emerald-600 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Head of Household
        </TabsTrigger>
      </TabsList>

      <TabsContent value="single" className="mt-6">
        <BracketTable data={SINGLE_ROWS} status="single" label="Single" />
      </TabsContent>
      <TabsContent value="mfj" className="mt-6">
        <BracketTable data={MFJ_ROWS} status="mfj" label="Married Filing Jointly" />
      </TabsContent>
      <TabsContent value="hoh" className="mt-6">
        <BracketTable data={HOH_ROWS} status="hoh" label="Head of Household" />
      </TabsContent>
    </Tabs>
  );
}
