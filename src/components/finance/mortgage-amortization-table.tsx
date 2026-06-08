'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { BarChart3 } from 'lucide-react';
import { formatCurrency } from '@/lib/finance-utils';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

interface MortgageAmortizationTableProps {
  amortizationSchedule: AmortizationEntry[];
}

export function MortgageAmortizationTable({ amortizationSchedule }: MortgageAmortizationTableProps) {
  const yearlySummary = useMemo(() => {
    const years: { year: number; principal: number; interest: number; balance: number; cumulativeInterest: number }[] = [];
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (const entry of amortizationSchedule) {
      yearPrincipal += entry.principal;
      yearInterest += entry.interest;

      if (entry.month % 12 === 0 || entry.balance <= 0) {
        years.push({
          year: Math.ceil(entry.month / 12),
          principal: yearPrincipal,
          interest: yearInterest,
          balance: entry.balance,
          cumulativeInterest: entry.cumulativeInterest,
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }
    return years;
  }, [amortizationSchedule]);

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-emerald-400" />
          Amortization Schedule
        </CardTitle>
        <CardDescription>Yearly breakdown of principal vs interest payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Cum. Interest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yearlySummary.map((yr) => (
                <TableRow key={yr.year}>
                  <TableCell className="font-medium">{yr.year}</TableCell>
                  <TableCell className="text-right text-emerald-400">{formatCurrency(yr.principal)}</TableCell>
                  <TableCell className="text-right text-red-400">{formatCurrency(yr.interest)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(yr.balance)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(yr.cumulativeInterest)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
