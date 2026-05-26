'use client';

import { TrendingUp, TrendingDown, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const COMPARISON_DATA = [
  {
    state: 'Illinois',
    abbreviation: 'IL',
    incomeTaxRate: '4.95%',
    incomeTaxType: 'Flat',
    personalExemption: '$2,775',
    avgPropertyTaxRate: '1.78%',
    avgAnnualPropertyTax: '$5,228',
    salesTaxRate: '8.86%',
    stateNotes: 'Flat tax on all income levels; no standard deduction, only personal exemption',
    netOn75k: '$56,969',
    netOn100k: '$73,215',
    effectiveBurden: 'Higher',
  },
  {
    state: 'Texas',
    abbreviation: 'TX',
    incomeTaxRate: '0%',
    incomeTaxType: 'None',
    personalExemption: 'N/A',
    avgPropertyTaxRate: '1.71%',
    avgAnnualPropertyTax: '$4,959',
    salesTaxRate: '8.20%',
    stateNotes: 'No state income tax; high property taxes compensate; great for high earners',
    netOn75k: '$60,545',
    netOn100k: '$78,597',
    effectiveBurden: 'Medium',
  },
  {
    state: 'Florida',
    abbreviation: 'FL',
    incomeTaxRate: '0%',
    incomeTaxType: 'None',
    personalExemption: 'N/A',
    avgPropertyTaxRate: '0.86%',
    avgAnnualPropertyTax: '$3,397',
    salesTaxRate: '7.00%',
    stateNotes: 'No state income tax; low property tax; no retirement income tax; retiree-friendly',
    netOn75k: '$60,545',
    netOn100k: '$78,597',
    effectiveBurden: 'Low',
  },
  {
    state: 'California',
    abbreviation: 'CA',
    incomeTaxRate: '1%–13.3%',
    incomeTaxType: 'Progressive',
    personalExemption: '$6,083 std ded',
    avgPropertyTaxRate: '0.71%',
    avgAnnualPropertyTax: '$5,574',
    salesTaxRate: '8.82%',
    stateNotes: 'Highest state income tax; progressive brackets; high sales tax; expensive housing',
    netOn75k: '$57,950',
    netOn100k: '$73,216',
    effectiveBurden: 'Highest',
  },
  {
    state: 'New York',
    abbreviation: 'NY',
    incomeTaxRate: '4%–10.9%',
    incomeTaxType: 'Progressive',
    personalExemption: '$8,100 std ded',
    avgPropertyTaxRate: '1.62%',
    avgAnnualPropertyTax: '$6,885',
    salesTaxRate: '8.52%',
    stateNotes: 'High progressive tax + NYC additional tax; high property tax; high COL',
    netOn75k: '$57,686',
    netOn100k: '$73,656',
    effectiveBurden: 'Very High',
  },
];

export function StateComparisonSection() {
  return (
    <section className="mt-8 space-y-6" aria-labelledby="state-comparison-heading">
      {/* ─── Comparison Table ────────────────────────────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle id="state-comparison-heading" className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-emerald-400" />
            2026 State Tax Comparison: IL vs TX vs FL vs CA vs NY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead className="text-center">Illinois</TableHead>
                  <TableHead className="text-center">Texas</TableHead>
                  <TableHead className="text-center">Florida</TableHead>
                  <TableHead className="text-center">California</TableHead>
                  <TableHead className="text-center">New York</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">State Income Tax Rate</TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="text-xs">4.95%</Badge></TableCell>
                  <TableCell className="text-center"><Badge className="bg-emerald-500/20 text-emerald-400 text-xs">0%</Badge></TableCell>
                  <TableCell className="text-center"><Badge className="bg-emerald-500/20 text-emerald-400 text-xs">0%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="text-xs">1%–13.3%</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="text-xs">4%–10.9%</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tax Type</TableCell>
                  <TableCell className="text-center text-sm">Flat Rate</TableCell>
                  <TableCell className="text-center text-sm">No Income Tax</TableCell>
                  <TableCell className="text-center text-sm">No Income Tax</TableCell>
                  <TableCell className="text-center text-sm">Progressive</TableCell>
                  <TableCell className="text-center text-sm">Progressive</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Net on $75K (Single)</TableCell>
                  <TableCell className="text-center font-semibold text-red-400">$56,969</TableCell>
                  <TableCell className="text-center font-semibold text-emerald-400">$60,545</TableCell>
                  <TableCell className="text-center font-semibold text-emerald-400">$60,545</TableCell>
                  <TableCell className="text-center font-semibold text-red-400">$57,950</TableCell>
                  <TableCell className="text-center font-semibold text-red-400">$57,686</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Avg Property Tax Rate</TableCell>
                  <TableCell className="text-center">1.78%</TableCell>
                  <TableCell className="text-center">1.71%</TableCell>
                  <TableCell className="text-center">0.86%</TableCell>
                  <TableCell className="text-center">0.71%</TableCell>
                  <TableCell className="text-center">1.62%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Avg Annual Property Tax</TableCell>
                  <TableCell className="text-center">$5,228</TableCell>
                  <TableCell className="text-center">$4,959</TableCell>
                  <TableCell className="text-center">$3,397</TableCell>
                  <TableCell className="text-center">$5,574</TableCell>
                  <TableCell className="text-center">$6,885</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Avg Combined Sales Tax</TableCell>
                  <TableCell className="text-center">8.86%</TableCell>
                  <TableCell className="text-center">8.20%</TableCell>
                  <TableCell className="text-center">7.00%</TableCell>
                  <TableCell className="text-center">8.82%</TableCell>
                  <TableCell className="text-center">8.52%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Overall Tax Burden</TableCell>
                  <TableCell className="text-center"><Badge className="bg-red-500/20 text-red-400 text-xs">Higher</Badge></TableCell>
                  <TableCell className="text-center"><Badge className="bg-amber-500/20 text-amber-400 text-xs">Medium</Badge></TableCell>
                  <TableCell className="text-center"><Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Low</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="text-xs">Highest</Badge></TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="text-xs">Very High</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ─── Detailed Analysis Paragraphs (SEO Gold) ────────── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Which State Has the Lowest Tax Burden in 2026?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            When comparing <strong className="text-foreground">Illinois, Texas, Florida, California, and New York</strong> for
            overall tax burden in 2026, <strong className="text-emerald-400">Florida</strong> consistently offers the lowest
            total tax burden. With <strong className="text-foreground">0% income tax</strong>, a low
            <strong className="text-foreground"> 0.86% effective property tax rate</strong>, and a moderate
            <strong className="text-foreground"> 7% average sales tax</strong>, Florida is the clear winner for both
            working professionals and retirees.
          </p>
          <p>
            <strong className="text-foreground">California</strong> has the highest state income tax in the nation
            at up to <strong className="text-foreground">13.3%</strong>, making it the most expensive state for
            high-income earners. For a $200,000 salary, California state income tax alone can exceed
            <strong className="text-foreground"> $15,000</strong> — compared to $0 in Texas or Florida.
            <strong className="text-foreground"> New York</strong> follows closely with rates up to 10.9%,
            plus an additional <strong className="text-foreground">3.876% NYC tax</strong> for city residents,
            pushing the combined state + city rate to nearly 14.8%.
          </p>
          <p>
            <strong className="text-foreground">Illinois</strong> at 4.95% flat rate sits in the middle — less
            expensive than CA or NY for high earners, but $3,576/year more expensive than TX or FL on a $75,000
            salary. Illinois compensates somewhat by not taxing retirement income.
          </p>
          <p>
            <strong className="text-foreground">For retirees</strong>, the ranking is clear:
            Florida (no income tax + no retirement tax + low property tax + homestead exemption) &gt;
            Texas (no income tax + no retirement tax, but high property tax) &gt;
            Illinois (taxes wages but not retirement income) &gt;
            New York &amp; California (high progressive taxes with limited retirement exemptions).
          </p>
        </CardContent>
      </Card>

      {/* ─── Quick Comparison Cards ──────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-red-500/20 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-red-400">Highest Tax Burden</p>
            <p className="mt-1 text-xl font-bold text-foreground">California</p>
            <p className="mt-1 text-sm text-muted-foreground">1%–13.3% + 8.82% sales + 0.71% property</p>
            <p className="mt-2 text-sm font-medium text-red-400">-$2,595/yr vs FL at $75K</p>
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-red-400">Very High Burden</p>
            <p className="mt-1 text-xl font-bold text-foreground">New York</p>
            <p className="mt-1 text-sm text-muted-foreground">4%–10.9% + NYC tax + 8.52% sales</p>
            <p className="mt-2 text-sm font-medium text-red-400">-$2,859/yr vs FL at $75K</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-amber-400">Higher Burden</p>
            <p className="mt-1 text-xl font-bold text-foreground">Illinois</p>
            <p className="mt-1 text-sm text-muted-foreground">4.95% flat + 1.78% property + 8.86% sales</p>
            <p className="mt-2 text-sm font-medium text-amber-400">-$3,576/yr vs TX/FL at $75K</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-amber-400">Best for High Earners</p>
            <p className="mt-1 text-xl font-bold text-foreground">Texas</p>
            <p className="mt-1 text-sm text-muted-foreground">0% income tax + strong job market</p>
            <p className="mt-2 text-sm font-medium text-amber-400">Watch: high property tax (1.71%)</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-emerald-400">Best Overall Value</p>
            <p className="mt-1 text-xl font-bold text-foreground">Florida</p>
            <p className="mt-1 text-sm text-muted-foreground">0% income + 0.86% property + retiree-friendly</p>
            <p className="mt-2 text-sm font-medium text-emerald-400">Lowest total tax burden</p>
          </CardContent>
        </Card>
      </div>

      {/* ─── Federal Tax Brackets Reference (SEO keyword gold) ── */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">2026 Federal Income Tax Brackets (Single Filer)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Rate</TableHead>
                  <TableHead>Taxable Income Range</TableHead>
                  <TableHead>Tax Owed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-emerald-400">10%</TableCell>
                  <TableCell>$0 – $11,600</TableCell>
                  <TableCell>10% of taxable income</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">12%</TableCell>
                  <TableCell>$11,601 – $47,150</TableCell>
                  <TableCell>$1,160 + 12% over $11,600</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-amber-400">22%</TableCell>
                  <TableCell>$47,151 – $100,525</TableCell>
                  <TableCell>$5,426 + 22% over $47,150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-orange-400">24%</TableCell>
                  <TableCell>$100,526 – $191,950</TableCell>
                  <TableCell>$17,168.50 + 24% over $100,525</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-red-400">32%</TableCell>
                  <TableCell>$191,951 – $243,725</TableCell>
                  <TableCell>$39,110.50 + 32% over $191,950</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-red-500">35%</TableCell>
                  <TableCell>$243,726 – $609,350</TableCell>
                  <TableCell>$55,678.50 + 35% over $243,725</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-red-600">37%</TableCell>
                  <TableCell>$609,351+</TableCell>
                  <TableCell>$183,647.25 + 37% over $609,350</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Standard Deduction: $15,000 (Single), $30,000 (Married), $22,500 (Head of Household). FICA: 7.65% (6.2% Social Security up to $176,100 + 1.45% Medicare).
            Additional Medicare Tax: 0.9% on income above $200,000.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
