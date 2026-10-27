'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  DollarSign,
  Info,
  MoonStar,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DEFAULT_OT_MULTIPLIER,
  dayWorkedMinutes,
  grossPay,
  minutesToDecimalHours,
  minutesToHM,
  weekTotals,
  type TimeCardDayInput,
} from '@/lib/time-math';
import { formatCurrency } from '@/lib/finance-utils';

// ─── Week definition ──────────────────────────────────────────────────────────

/** Monday-first workweek. */
const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

interface DayRow {
  start: string;
  end: string;
  breakMinutes: number;
}

const DEFAULT_START = '09:00';
const DEFAULT_END = '17:00';
const DEFAULT_BREAK = 30;

/**
 * Default card: Mon-Fri 9:00-17:00 with a 30-minute unpaid lunch (7.5 h/day),
 * weekend rows left empty.
 */
function defaultWeek(): DayRow[] {
  return WEEK_DAYS.map((_, i) => ({
    start: i < 5 ? DEFAULT_START : '',
    end: i < 5 ? DEFAULT_END : '',
    breakMinutes: DEFAULT_BREAK,
  }));
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function TimeCardCalculator() {
  const [days, setDays] = useState<DayRow[]>(defaultWeek);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [overtimeOn, setOvertimeOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateDay = useCallback((index: number, patch: Partial<DayRow>) => {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }, []);

  // ─── Live math (all client-side, no state tax tables) ─────────────────────
  const results = useMemo(() => {
    const cardDays: TimeCardDayInput[] = days;
    const totals = weekTotals(cardDays);
    // With overtime OFF every worked minute is straight time.
    const regularMinutes = overtimeOn ? totals.regularMinutes : totals.totalMinutes;
    const overtimeMinutes = overtimeOn ? totals.overtimeMinutes : 0;
    const pay = grossPay(regularMinutes, overtimeMinutes, hourlyRate, DEFAULT_OT_MULTIPLIER);
    const perDay = days.map((d) => dayWorkedMinutes(d.start, d.end, d.breakMinutes));
    return { totals, regularMinutes, overtimeMinutes, pay, perDay };
  }, [days, hourlyRate, overtimeOn]);

  const totalDecimal = minutesToDecimalHours(results.totals.totalMinutes);
  const regularDecimal = minutesToDecimalHours(results.regularMinutes);
  const overtimeDecimal = minutesToDecimalHours(results.overtimeMinutes);

  // ─── Plain-text summary for the copy button ───────────────────────────────
  const summaryText = useMemo(() => {
    const lines: string[] = [];
    lines.push('Time Card Summary (Mon-Sun)');
    lines.push(`Hourly rate: ${formatCurrency(hourlyRate)}/hr`);
    lines.push(
      overtimeOn
        ? 'Overtime: 1.5x over 40 hours/week (FLSA)'
        : 'Overtime: OFF (straight time)',
    );
    lines.push('');
    WEEK_DAYS.forEach((label, i) => {
      const worked = results.perDay[i];
      if (worked <= 0) {
        lines.push(`${label}: off`);
        return;
      }
      const day = days[i];
      const breakNote = day.breakMinutes > 0 ? `, ${day.breakMinutes} min break` : '';
      lines.push(
        `${label}: ${day.start} to ${day.end}${breakNote} = ${minutesToDecimalHours(worked).toFixed(2)} h`,
      );
    });
    lines.push('');
    lines.push(
      `Total hours: ${totalDecimal.toFixed(2)} (${minutesToHM(results.totals.totalMinutes)})`,
    );
    lines.push(
      `Regular: ${regularDecimal.toFixed(2)} h | Overtime: ${overtimeDecimal.toFixed(2)} h`,
    );
    lines.push(
      `Regular pay: ${formatCurrency(results.pay.regularPay)} | Overtime pay: ${formatCurrency(results.pay.overtimePay)}`,
    );
    lines.push(`Gross pay: ${formatCurrency(results.pay.total)}`);
    return lines.join('\n');
  }, [
    days,
    hourlyRate,
    overtimeOn,
    results,
    overtimeDecimal,
    regularDecimal,
    totalDecimal,
  ]);

  // ─── Fail-safe clipboard copy ─────────────────────────────────────────────
  const copySummary = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        if (copyTimer.current) clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(false);
    }
  }, [summaryText]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  return (
    <div className="space-y-6">
      {/* ─── Page Title ─────────────────────────────────── */}
      <div className="text-center">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Clock className="h-8 w-8 text-amber-600" />
          Time Card Calculator
        </h2>
        <p className="mt-2 text-muted-foreground">
          Enter daily clock-in and clock-out times - get decimal work hours,
          weekly overtime, and gross pay
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700">
            <Zap className="mr-1 h-3 w-3" />
            Overtime at 1.5x over 40 h
          </Badge>
          <Badge className="border-emerald-500/30 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Check className="mr-1 h-3 w-3" />
            Overnight shifts supported
          </Badge>
        </div>
      </div>

      {/* ─── Week setup: rate + overtime switch ──────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-amber-600" />
            Week Setup
          </CardTitle>
          <CardDescription>Adjust anything - the card recalculates instantly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tc-rate" className="text-sm font-medium">
                Hourly Rate
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="tc-rate"
                  type="number"
                  min="0"
                  step="0.5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  className="pl-9"
                  aria-label="Hourly rate in dollars"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/40 bg-background/60 p-3">
              <div className="pr-3">
                <Label htmlFor="tc-overtime" className="text-sm font-medium">
                  Overtime (over 40 h/week)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Paid at 1.5x your rate (federal FLSA)
                </p>
              </div>
              <Switch
                id="tc-overtime"
                checked={overtimeOn}
                onCheckedChange={setOvertimeOn}
                aria-label="Toggle weekly overtime at 1.5x"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            California uses daily overtime (1.5x over 8 h/day, 2x over 12 h). This
            card follows the federal weekly standard used by every other state.
          </p>
        </CardContent>
      </Card>

      {/* ─── The 7-day time card ─────────────────────────── */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-amber-600" />
            This Week&apos;s Time Card
          </CardTitle>
          <CardDescription>
            Unpaid break minutes are subtracted from each day - set 0 to disable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {WEEK_DAYS.map((label, i) => {
              const worked = results.perDay[i];
              const active = worked > 0;
              return (
                <div
                  key={label}
                  className={`rounded-xl border p-3 transition-colors ${
                    active
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-border/40 bg-background/60'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {label.slice(0, 3)}
                    </span>
                    {active && (
                      <span className="text-xs font-semibold text-amber-700">
                        {minutesToDecimalHours(worked).toFixed(2)} h
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <Label htmlFor={`tc-start-${i}`} className="sr-only">
                        {label} clock in
                      </Label>
                      <Input
                        id={`tc-start-${i}`}
                        type="time"
                        value={days[i].start}
                        onChange={(e) => updateDay(i, { start: e.target.value })}
                        className="h-9 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`tc-end-${i}`} className="sr-only">
                        {label} clock out
                      </Label>
                      <Input
                        id={`tc-end-${i}`}
                        type="time"
                        value={days[i].end}
                        onChange={(e) => updateDay(i, { end: e.target.value })}
                        className="h-9 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`tc-break-${i}`} className="sr-only">
                        {label} unpaid break minutes
                      </Label>
                      <Input
                        id={`tc-break-${i}`}
                        type="number"
                        min="0"
                        step="5"
                        value={days[i].breakMinutes}
                        onChange={(e) =>
                          updateDay(i, {
                            breakMinutes: Math.max(0, parseInt(e.target.value, 10) || 0),
                          })
                        }
                        className="h-9 text-sm"
                      />
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        Break (min)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ─── Results ────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
          <CardContent className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Weekly Gross Pay
            </p>
            <p className="mt-1 text-4xl font-bold text-amber-700">
              {formatCurrency(results.pay.total)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {formatCurrency(hourlyRate)}/hr
              {overtimeOn ? ' + overtime at 1.5x' : ' (overtime off)'}
            </p>
            {results.pay.overtimePay > 0 && (
              <p className="mt-1 text-xs text-amber-700">
                includes {formatCurrency(results.pay.overtimePay)} overtime pay
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Weekly Totals</CardTitle>
            <CardDescription>Payroll-ready decimal hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                <p className="text-xs text-muted-foreground">Total Hours</p>
                <p className="text-xl font-semibold text-foreground">
                  {totalDecimal.toFixed(2)} h
                </p>
                <p className="text-xs text-muted-foreground">
                  {minutesToHM(results.totals.totalMinutes)} on the clock
                </p>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/60 p-3">
                <p className="text-xs text-muted-foreground">Regular Hours</p>
                <p className="text-xl font-semibold text-foreground">
                  {regularDecimal.toFixed(2)} h
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(results.pay.regularPay)} at straight time
                </p>
              </div>
              <div
                className={`rounded-lg border p-3 ${
                  overtimeDecimal > 0
                    ? 'border-amber-500/30 bg-amber-500/10'
                    : 'border-border/40 bg-background/60'
                }`}
              >
                <p className="text-xs text-muted-foreground">Overtime Hours</p>
                <p className="text-xl font-semibold text-foreground">
                  {overtimeDecimal.toFixed(2)} h
                </p>
                <p className="text-xs text-muted-foreground">
                  {overtimeOn
                    ? `past 40, paid at ${formatCurrency(hourlyRate * 1.5)}/hr`
                    : 'toggle is off'}
                </p>
              </div>
            </div>

            {/* Per-day strip */}
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                Hours by day (decimal)
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {WEEK_DAYS.map((label, i) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-md border border-border/40 bg-background/60 px-1 py-1.5 text-center"
                  >
                    <p className="text-[10px] uppercase text-muted-foreground">
                      {label.slice(0, 3)}
                    </p>
                    <p className="truncate text-xs font-semibold text-foreground">
                      {results.perDay[i] > 0
                        ? minutesToDecimalHours(results.perDay[i]).toFixed(2)
                        : '--'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Copy summary ───────────────────────────────── */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border/40 bg-background/60 p-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Copy a plain-text summary of this week for records, emails, or your
          payroll admin.
        </p>
        <Button
          onClick={copySummary}
          variant="outline"
          className="shrink-0 border-amber-600/40 text-amber-700 hover:bg-amber-600/10 hover:text-amber-800"
        >
          {copied ? (
            <Check className="mr-1 h-4 w-4" />
          ) : (
            <Copy className="mr-1 h-4 w-4" />
          )}
          {copied ? 'Copied' : 'Copy Summary'}
        </Button>
      </div>

      {/* ─── How the day math works ──────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-emerald-500/20 bg-emerald-600/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Decimal hours, the payroll format</p>
                <p>
                  Minutes are divided by 60: 45 minutes is 0.75 of an hour, so a
                  7 h 45 m day counts as <strong>7.75 hours</strong>. Payroll
                  systems multiply that decimal by your rate - never by the
                  minutes printed on the clock.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-emerald-600/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MoonStar className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Overnight shifts</p>
                <p>
                  If clock-out is earlier than clock-in, the shift crossed
                  midnight: <strong>22:00 to 06:00 = 8.00 h</strong>. The card
                  rolls the end time forward 24 h automatically, so a graveyard
                  shift never shows as negative time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
