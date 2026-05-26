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

// ─── 2026 Tax Bracket Data ─────────────────────────────────────────────────────

interface BracketRow {
  rate: string;
  rateNum: number;
  single: string;
  mfj: string;
  hoh: string;
}

const BRACKETS: BracketRow[] = [
  { rate: '10%', rateNum: 10, single: '$0 – $11,925', mfj: '$0 – $23,850', hoh: '$0 – $17,000' },
  { rate: '12%', rateNum: 12, single: '$11,926 – $48,475', mfj: '$23,851 – $96,950', hoh: '$17,001 – $64,850' },
  { rate: '22%', rateNum: 22, single: '$48,476 – $103,350', mfj: '$96,951 – $206,700', hoh: '$64,851 – $103,350' },
  { rate: '24%', rateNum: 24, single: '$103,351 – $197,300', mfj: '$206,701 – $394,600', hoh: '$103,351 – $197,300' },
  { rate: '32%', rateNum: 32, single: '$197,301 – $250,525', mfj: '$394,601 – $501,050', hoh: '$197,301 – $250,500' },
  { rate: '35%', rateNum: 35, single: '$250,526 – $626,350', mfj: '$501,051 – $751,600', hoh: '$250,501 – $626,350' },
  { rate: '37%', rateNum: 37, single: 'Over $626,350', mfj: 'Over $751,600', hoh: 'Over $626,350' },
];

function getRateColor(rateNum: number): string {
  if (rateNum <= 10) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
  if (rateNum <= 12) return 'bg-teal-500/15 text-teal-400 border-teal-500/20';
  if (rateNum <= 22) return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
  if (rateNum <= 24) return 'bg-orange-500/15 text-orange-400 border-orange-500/20';
  if (rateNum <= 32) return 'bg-rose-500/15 text-rose-400 border-rose-500/20';
  if (rateNum <= 35) return 'bg-red-500/15 text-red-400 border-red-500/20';
  return 'bg-red-600/20 text-red-300 border-red-500/30';
}

// Cumulative tax owed at the top of each bracket (Single filing status)
function calculateCumulativeTax(bracketIndex: number): number {
  const brackets = [
    { limit: 11925, rate: 0.10 },
    { limit: 48475, rate: 0.12 },
    { limit: 103350, rate: 0.22 },
    { limit: 197300, rate: 0.24 },
    { limit: 250525, rate: 0.32 },
    { limit: 626350, rate: 0.35 },
  ];

  if (bracketIndex === 0) return 0;

  let cumulative = 0;
  let prevLimit = 0;
  for (let i = 0; i < bracketIndex && i < brackets.length; i++) {
    cumulative += (brackets[i].limit - prevLimit) * brackets[i].rate;
    prevLimit = brackets[i].limit;
  }
  return Math.round(cumulative);
}

function BracketTable({ data, label }: { data: BracketRow[]; label: string }) {
  const fieldMap: Record<string, keyof BracketRow> = {
    Single: 'single',
    'Married Filing Jointly': 'mfj',
    'Head of Household': 'hoh',
  };
  const field = fieldMap[label];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border/20 hover:bg-transparent">
          <TableHead className="text-muted-foreground font-semibold">Rate</TableHead>
          <TableHead className="text-muted-foreground font-semibold">Taxable Income Range</TableHead>
          <TableHead className="text-muted-foreground font-semibold text-right">Tax on Lower Bracket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => {
          const taxOnLower = calculateCumulativeTax(i);
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
              <TableCell className="font-medium text-foreground">{row[field]}</TableCell>
              <TableCell className="text-right text-muted-foreground tabular-nums">
                {taxOnLower > 0 ? `$${taxOnLower.toLocaleString()}` : '—'}
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
          className="rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Single
        </TabsTrigger>
        <TabsTrigger
          value="mfj"
          className="rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Married Filing Jointly
        </TabsTrigger>
        <TabsTrigger
          value="hoh"
          className="rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30 data-[state=active]:border px-4 py-2 text-xs sm:text-sm"
        >
          Head of Household
        </TabsTrigger>
      </TabsList>

      <TabsContent value="single" className="mt-6">
        <BracketTable data={BRACKETS} label="Single" />
      </TabsContent>
      <TabsContent value="mfj" className="mt-6">
        <BracketTable data={BRACKETS} label="Married Filing Jointly" />
      </TabsContent>
      <TabsContent value="hoh" className="mt-6">
        <BracketTable data={BRACKETS} label="Head of Household" />
      </TabsContent>
    </Tabs>
  );
}
