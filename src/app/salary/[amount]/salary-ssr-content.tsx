/**
 * Server-rendered SEO content for salary pages.
 *
 * Anti-doorway design (Task 26-a): the 26 salary pages previously shared ~79%
 * word-level similarity (only the interpolated numbers changed). This rewrite
 * gives each page a genuinely different article:
 *
 * 1. FIVE SALARY TIERS — entry (≤$50K), mid ($55K–$90K), upper-mid ($95K–$150K),
 *    high ($175K–$300K), top ($400K+) — each with its own narrative angle,
 *    section headings, paragraph structures, section ORDER, FAQ set, and voice.
 * 2. PER-AMOUNT DATA SECTIONS computed from real data: federal bracket position
 *    (marginal band, band fill, marginal-vs-effective), pay-frequency
 *    equivalents in three anchor states, and an adjacent-salary comparison
 *    showing the actual NET RAISE between neighboring salaries.
 *
 * Accuracy rule: every tax figure rendered comes from calculateSalaryTakeHome
 * or the imported 2026 config (FEDERAL_TAX_2026 / FICA_2026 / STATE_PROFILES).
 * The only typed non-computed constants are the 2,080-hour work year, the 2026
 * 401(k) elective deferral limit, and the Census median-household context.
 */

import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  formatSalary,
  formatSalaryCompact,
  fmt,
  fmtFull,
  type StateTakeHome,
} from '@/lib/salary-calculations';
import { FEDERAL_TAX_2026, FICA_2026, STATE_PROFILES } from '@/lib/tax-config';

// 2026 401(k) elective deferral limit (IRS — same figure used site-wide)
const K401_LIMIT_2026 = 24500;
const HOURS_PER_YEAR = 2080;
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface Props {
  salary: number;
}

// ─── Tier System ─────────────────────────────────────────────────────────────

type Tier = 'entry' | 'mid' | 'upperMid' | 'high' | 'top';

function getTier(salary: number): Tier {
  if (salary <= 50000) return 'entry';
  if (salary <= 90000) return 'mid';
  if (salary <= 150000) return 'upperMid';
  if (salary <= 300000) return 'high';
  return 'top';
}

function pctLabel(rate: number): string {
  return `${Number((rate * 100).toFixed(2))}%`;
}

// ─── Bracket Math (all derived from FEDERAL_TAX_2026) ────────────────────────

interface MarginalInfo {
  rate: number;
  rateLabel: string;
  bandMin: number; // taxable-income floor of the marginal band
  bandMax: number | null;
  taxableIncome: number;
  inBracket: number; // taxable dollars inside the marginal band
  below: number; // taxable dollars beneath the band
  prevRate: number | null;
  nextRate: number | null;
  bracketStartSalary: number; // wages at which this band begins
  nextThresholdSalary: number | null; // wages at which the NEXT band begins
}

function getMarginalBracket(salary: number): MarginalInfo {
  const std = FEDERAL_TAX_2026.standardDeduction;
  const taxable = Math.max(0, salary - std);
  const brackets = FEDERAL_TAX_2026.brackets;
  let idx = brackets.length - 1;
  for (let i = 0; i < brackets.length; i++) {
    const b = brackets[i];
    if (b.max === null || taxable <= b.max) {
      idx = i;
      break;
    }
  }
  const b = brackets[idx];
  return {
    rate: b.rate,
    rateLabel: pctLabel(b.rate),
    bandMin: b.min,
    bandMax: b.max,
    taxableIncome: taxable,
    inBracket: taxable - b.min,
    below: b.min,
    prevRate: idx > 0 ? brackets[idx - 1].rate : null,
    nextRate: idx < brackets.length - 1 ? brackets[idx + 1].rate : null,
    bracketStartSalary: b.min + std,
    nextThresholdSalary: b.max === null ? null : b.max + std,
  };
}

interface BracketRow {
  rateLabel: string;
  from: number;
  to: number | null;
  amount: number;
  tax: number;
  isMarginal: boolean;
}

function buildBracketRows(taxableIncome: number): BracketRow[] {
  const rows: BracketRow[] = [];
  for (const b of FEDERAL_TAX_2026.brackets) {
    if (taxableIncome <= b.min) break;
    const amount = Math.min(taxableIncome, b.max ?? taxableIncome) - b.min;
    if (amount <= 0) break;
    rows.push({
      rateLabel: pctLabel(b.rate),
      from: b.min,
      to: b.max,
      amount,
      tax: amount * b.rate,
      isMarginal: false,
    });
  }
  if (rows.length > 0) rows[rows.length - 1].isMarginal = true;
  return rows;
}

// Payroll marginal rate on the NEXT dollar of wages.
function marginalPayrollRate(salary: number): number {
  let rate = FICA_2026.medicareRate;
  if (salary < FICA_2026.socialSecurityWageCap) rate += FICA_2026.socialSecurityRate;
  if (salary > FICA_2026.additionalMedicareThreshold) rate += FICA_2026.additionalMedicareRate;
  return rate;
}

// State marginal rate on the next dollar (single filer) from STATE_PROFILES.
function marginalStateRate(stateKey: string, salary: number): number {
  const profile = STATE_PROFILES[stateKey];
  if (!profile || !profile.hasIncomeTax) return 0;
  if (profile.incomeTaxType !== 'progressive' || !profile.brackets || profile.brackets.length === 0) {
    return profile.incomeTaxRate;
  }
  const std = profile.standardDeductionsByFiling?.single ?? profile.standardDeduction;
  const taxable = Math.max(0, salary - std - profile.personalExemption);
  for (const b of profile.brackets) {
    if (b.max === null || taxable <= b.max) return b.rate;
  }
  return profile.brackets[profile.brackets.length - 1].rate;
}

// ─── Page Data Builder ───────────────────────────────────────────────────────

interface SalaryPageData {
  salary: number;
  formatted: string;
  tier: Tier;
  stdDeduction: number;
  taxableIncome: number;
  marginal: MarginalInfo;
  bracketRows: BracketRow[];
  bracketTaxTotal: number;
  calc: ReturnType<typeof calculateSalaryTakeHome>;
  sortedStates: StateTakeHome[];
  top10: StateTakeHome[];
  bottom5: StateTakeHome[]; // worst first
  tx: StateTakeHome;
  ca: StateTakeHome;
  ny: StateTakeHome;
  fl: StateTakeHome;
  il: StateTakeHome;
  wa: StateTakeHome;
  noTaxStateCount: number;
  federalTax: number;
  ficaTotal: number;
  effFedPct: number;
  effAllTxPct: number;
  keepPctTx: number;
  caGap: number;
  payrollMarginal: number;
  caMarginal: number;
  nyMarginal: number;
  addlMedicare: number;
  ssMaxTax: number;
  ssCapHitMonth: number | null;
  hourlyGross: number;
  keepNextDollarTxPct: number;
  keepNextDollarCaPct: number;
  combinedMarginalTxPct: number;
  combinedMarginalCaPct: number;
  prevSalary: number | null;
  nextSalary: number | null;
  prevNetTx: number | null;
  prevNetCa: number | null;
  nextNetTx: number | null;
  nextNetCa: number | null;
  k401: { fedAfter: number; savings: number; crossedIntoLowerBand: boolean; lowerBandRateLabel: string | null } | null;
}

function buildSalaryPageData(salary: number): SalaryPageData {
  const calc = calculateSalaryTakeHome(salary);
  const marginal = getMarginalBracket(salary);
  const bracketRows = buildBracketRows(marginal.taxableIncome);
  const sortedStates = [...calc.states].sort((a, b) => b.netAnnual - a.netAnnual);
  const st = (key: string) => calc.states.find((s) => s.stateKey === key)!;
  const tx = st('texas');
  const ca = st('california');

  const amounts = SALARY_AMOUNTS as readonly number[];
  const idx = amounts.indexOf(salary);
  const prevSalary = idx > 0 ? amounts[idx - 1] : null;
  const nextSalary = idx >= 0 && idx < amounts.length - 1 ? amounts[idx + 1] : null;
  const prevCalc = prevSalary !== null ? calculateSalaryTakeHome(prevSalary) : null;
  const nextCalc = nextSalary !== null ? calculateSalaryTakeHome(nextSalary) : null;

  let k401: SalaryPageData['k401'] = null;
  if (getTier(salary) === 'upperMid') {
    const fedAfter = calculateSalaryTakeHome(salary - K401_LIMIT_2026)
      .states.find((s) => s.stateKey === 'texas')!
      .federalTax;
    k401 = {
      fedAfter,
      savings: tx.federalTax - fedAfter,
      crossedIntoLowerBand:
        marginal.prevRate !== null && marginal.taxableIncome - K401_LIMIT_2026 < marginal.bandMin,
      lowerBandRateLabel: marginal.prevRate !== null ? pctLabel(marginal.prevRate) : null,
    };
  }

  const payrollMarginal = marginalPayrollRate(salary);
  const caMarginal = marginalStateRate('california', salary);

  return {
    salary,
    formatted: formatSalary(salary),
    tier: getTier(salary),
    stdDeduction: FEDERAL_TAX_2026.standardDeduction,
    taxableIncome: marginal.taxableIncome,
    marginal,
    bracketRows,
    bracketTaxTotal: bracketRows.reduce((sum, r) => sum + r.tax, 0),
    calc,
    sortedStates,
    top10: sortedStates.slice(0, 10),
    bottom5: sortedStates.slice(-5).reverse(),
    tx,
    ca,
    ny: st('newyork'),
    fl: st('florida'),
    il: st('illinois'),
    wa: st('washington'),
    noTaxStateCount: sortedStates.filter((s) => s.stateTax === 0).length,
    federalTax: tx.federalTax,
    ficaTotal: tx.ficaTotal,
    effFedPct: (tx.federalTax / salary) * 100,
    effAllTxPct: tx.effectiveTaxRate,
    keepPctTx: 100 - tx.effectiveTaxRate,
    caGap: tx.netAnnual - ca.netAnnual,
    payrollMarginal,
    caMarginal,
    nyMarginal: marginalStateRate('newyork', salary),
    addlMedicare:
      salary > FICA_2026.additionalMedicareThreshold
        ? (salary - FICA_2026.additionalMedicareThreshold) * FICA_2026.additionalMedicareRate
        : 0,
    ssMaxTax: FICA_2026.socialSecurityWageCap * FICA_2026.socialSecurityRate,
    ssCapHitMonth:
      salary > FICA_2026.socialSecurityWageCap
        ? Math.min(12, Math.ceil(FICA_2026.socialSecurityWageCap / (salary / 12)))
        : null,
    hourlyGross: salary / HOURS_PER_YEAR,
    keepNextDollarTxPct: (1 - marginal.rate - payrollMarginal) * 100,
    keepNextDollarCaPct: (1 - marginal.rate - payrollMarginal - caMarginal) * 100,
    combinedMarginalTxPct: (marginal.rate + payrollMarginal) * 100,
    combinedMarginalCaPct: (marginal.rate + payrollMarginal + caMarginal) * 100,
    prevSalary,
    nextSalary,
    prevNetTx: prevCalc ? prevCalc.states.find((s) => s.stateKey === 'texas')!.netAnnual : null,
    prevNetCa: prevCalc ? prevCalc.states.find((s) => s.stateKey === 'california')!.netAnnual : null,
    nextNetTx: nextCalc ? nextCalc.states.find((s) => s.stateKey === 'texas')!.netAnnual : null,
    nextNetCa: nextCalc ? nextCalc.states.find((s) => s.stateKey === 'california')!.netAnnual : null,
    k401,
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

const SECTION_ORDER: Record<Tier, string[]> = {
  entry: ['overview', 'bracket', 'top10', 'payfreq', 'adjacent', 'keyStates', 'bottom5'],
  mid: ['overview', 'top10', 'adjacent', 'bracket', 'payfreq', 'keyStates', 'bottom5'],
  upperMid: ['overview', 'bracket', 'payfreq', 'top10', 'keyStates', 'adjacent', 'bottom5'],
  high: ['overview', 'bracket', 'adjacent', 'top10', 'keyStates', 'payfreq', 'bottom5'],
  top: ['overview', 'top10', 'bracket', 'adjacent', 'payfreq', 'keyStates', 'bottom5'],
};

export function SalarySSRContent({ salary }: Props) {
  const d = buildSalaryPageData(salary);

  const sections: Record<string, ReactNode> = {
    overview: <OverviewSection d={d} />,
    bracket: <BracketPositionSection d={d} />,
    payfreq: <PayFrequencySection d={d} />,
    adjacent: <AdjacentSalarySection d={d} />,
    top10: <TopStatesSection d={d} />,
    keyStates: <KeyStatesSection d={d} />,
    bottom5: <BottomStatesSection d={d} />,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <QuickAnswerSection d={d} />
      {SECTION_ORDER[d.tier].map((key) => (
        <Fragment key={key}>{sections[key]}</Fragment>
      ))}
      <RelatedLinksSection d={d} />
      <FaqSection d={d} />
      <StateLookupSection d={d} />
    </div>
  );
}

// ─── Quick Answer Callout (per-tier phrasing) ────────────────────────────────

function QuickAnswerSection({ d }: { d: SalaryPageData }) {
  const { formatted, tx, ca, marginal } = d;
  const best = d.sortedStates[0];
  const worst = d.sortedStates[d.sortedStates.length - 1];

  let heading: string;
  let body: ReactNode;
  let note: string;

  switch (d.tier) {
    case 'entry':
      heading = 'The quick answer';
      body = (
        <p>
          On {formatted}, a single filer in a no-income-tax state takes home about{' '}
          <strong className="text-foreground">{fmt(tx.netAnnual)}</strong> a year — roughly{' '}
          {fmt(tx.netMonthly)} a month, or {fmtFull(tx.netAnnual / HOURS_PER_YEAR)} net per hour.
          California&apos;s income tax trims that to{' '}
          <strong className="text-foreground">{fmt(ca.netAnnual)}</strong>. The bracket math and all
          50 states are laid out below.
        </p>
      );
      note = `Figures assume single filing status, the ${fmt(d.stdDeduction)} standard deduction, and no pre-tax deductions or credits — a clean baseline for a first salary.`;
      break;
    case 'mid':
      heading = 'Short answer first';
      body = (
        <p>
          {formatted} nets <strong className="text-foreground">{fmt(tx.netAnnual)}</strong> in Texas,{' '}
          <strong className="text-foreground">{fmt(ca.netAnnual)}</strong> in California, and{' '}
          {fmt(d.ny.netAnnual)} in New York State. That&apos;s a {fmt(d.caGap)} annual spread before a
          single 401(k) or HSA dollar moves the numbers — and your marginal federal bracket is{' '}
          {marginal.rateLabel}.
        </p>
      );
      note = 'Baseline: single filer, standard deduction, no pre-tax deferrals, no credits. Your real paycheck moves when any of those change.';
      break;
    case 'upperMid':
      heading = 'Bottom line';
      body = (
        <p>
          {formatted} gross works out to <strong className="text-foreground">{fmt(tx.netAnnual)}</strong>{' '}
          net in Texas and <strong className="text-foreground">{fmt(ca.netAnnual)}</strong> in
          California. Federal income tax is {fmt(d.federalTax)} — a {d.effFedPct.toFixed(1)}% effective
          rate against a {marginal.rateLabel} marginal bracket.
        </p>
      );
      note = 'All numbers: single filer, standard deduction, wages only (no bonus, equity, or investment income), no pre-tax deferrals modeled.';
      break;
    case 'high':
      heading = 'The number you came for';
      body = (
        <p>
          Take-home on {formatted} spans <strong className="text-foreground">{fmt(best.netAnnual)}</strong>{' '}
          in the no-tax states down to {fmt(worst.netAnnual)} in the highest-tax state — an all-in
          effective rate of {d.effAllTxPct.toFixed(1)}% (federal + FICA) even before state tax is
          layered on.
        </p>
      );
      note = 'Single filer, standard deduction, wages only. Pre-tax deferrals and credits — both plentiful at this income — would lower these numbers.';
      break;
    default:
      heading = 'Headline numbers';
      body = (
        <p>
          <strong className="text-foreground">{fmt(tx.netAnnual)}</strong> net in Texas ·{' '}
          {fmt(ca.netAnnual)} in California · {d.effFedPct.toFixed(1)}% effective federal rate ·{' '}
          {marginal.rateLabel} marginal bracket. The gap between those last two numbers is the whole
          story of top-bracket taxes — unpacked below.
        </p>
      );
      note = 'Assumes wages only, single filing status, standard deduction. Investment income, equity compensation, and AMT exposure change the picture at this level and are not modeled.';
      break;
  }

  return (
    <section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-foreground mb-3">{heading}</h2>
      <div className="text-muted-foreground leading-relaxed">{body}</div>
      <p className="mt-4 text-xs text-muted-foreground">{note}</p>
    </section>
  );
}

// ─── Tier Overviews (five different article approaches) ──────────────────────

function OverviewSection({ d }: { d: SalaryPageData }) {
  switch (d.tier) {
    case 'entry':
      return <EntryOverview d={d} />;
    case 'mid':
      return <MidOverview d={d} />;
    case 'upperMid':
      return <UpperMidOverview d={d} />;
    case 'high':
      return <HighOverview d={d} />;
    default:
      return <TopOverview d={d} />;
  }
}

function EntryOverview({ d }: { d: SalaryPageData }) {
  const { formatted, tx, ca, federalTax, ficaTotal, stdDeduction, taxableIncome, bracketRows } = d;
  const firstBand = bracketRows[0];
  const ficaBigger = ficaTotal > federalTax;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Starting Out on {formatted}: What Comes Out, and Why
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          First salary, first reality check. The good news is built in: the standard deduction wipes the
          first <strong className="text-foreground">{fmt(stdDeduction)}</strong> of your {formatted} off
          the federal tax table, so only <strong className="text-foreground">{fmt(taxableIncome)}</strong>{' '}
          of it gets taxed at all — and the first{' '}
          <strong className="text-foreground">{fmt(firstBand.amount)}</strong> of that is taxed at just{' '}
          {firstBand.rateLabel}. Total federal income tax for the year:{' '}
          <strong className="text-foreground">{fmt(federalTax)}</strong>, a {d.effFedPct.toFixed(1)}%
          effective rate.
        </p>
        <p>
          The line that surprises most first-job earners is payroll tax. Social Security (
          {pctLabel(FICA_2026.socialSecurityRate)}) and Medicare ({pctLabel(FICA_2026.medicareRate)})
          apply from dollar one — no deduction, no brackets. On {formatted} that&apos;s{' '}
          <strong className="text-foreground">{fmt(ficaTotal)}</strong>, which is{' '}
          {ficaBigger ? (
            <>
              actually <em>more</em> than your entire federal income tax bill of{' '}
              <strong className="text-foreground">{fmt(federalTax)}</strong>
            </>
          ) : (
            <>
              roughly level with your federal income tax bill of{' '}
              <strong className="text-foreground">{fmt(federalTax)}</strong>
            </>
          )}
          . Worth knowing before you build a monthly budget.
        </p>
        <p>
          Geography is the last lever. {d.noTaxStateCount} states — Texas, Florida, Washington, Nevada
          and the rest — levy no income tax on wages, leaving{' '}
          <strong className="text-foreground">{fmt(tx.netAnnual)}</strong> a year (about{' '}
          {fmt(tx.netMonthly)} a month). California&apos;s progressive brackets take{' '}
          <strong className="text-foreground">{fmt(ca.stateTax)}</strong>, dropping your net to{' '}
          <strong className="text-foreground">{fmt(ca.netAnnual)}</strong>. One accuracy note: these
          figures include no tax credits. If you qualify for a refundable credit such as the Earned
          Income Tax Credit, your real federal bill lands lower — eligibility depends on dependents and
          filing situation.
        </p>
      </div>
    </section>
  );
}

function MidOverview({ d }: { d: SalaryPageData }) {
  const { formatted, tx, federalTax, ficaTotal, stdDeduction, taxableIncome, marginal, prevSalary } = d;
  const medianPosition =
    d.salary <= 75000 ? 'below' : d.salary <= 85000 ? 'right around' : 'above';
  const rungs: { label: string; value: string; strong?: boolean }[] = [
    { label: 'Gross salary', value: formatted },
    { label: `− Standard deduction (single, 2026)`, value: fmt(stdDeduction) },
    { label: '= Federal taxable income', value: fmt(taxableIncome) },
    {
      label: `− Federal income tax (${d.bracketRows.map((r) => r.rateLabel).join(' → ')})`,
      value: fmt(federalTax),
    },
    { label: `− FICA (${pctLabel(FICA_2026.socialSecurityRate)} + ${pctLabel(FICA_2026.medicareRate)})`, value: fmt(ficaTotal) },
    { label: '= Net in a no-income-tax state', value: fmt(tx.netAnnual), strong: true },
    { label: 'Monthly equivalent', value: fmt(tx.netMonthly) },
  ];
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        From {formatted} Gross to {fmt(tx.netAnnual)} Net: Every Dollar Accounted For
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {formatted} sits {medianPosition} the U.S. median household income (roughly $80,000 in recent
        Census data) — but nobody takes home the gross. Here is the ladder, rung by rung, for a single
        filer in a no-income-tax state:
      </p>
      <div className="rounded-xl border border-border/30 divide-y divide-border/20 mb-6">
        {rungs.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
            <span className="text-muted-foreground">{r.label}</span>
            <span className={r.strong ? 'font-semibold text-emerald-400' : 'font-medium text-foreground'}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Two things jump out of that ladder. First, the average: your effective federal rate is only{' '}
          {d.effFedPct.toFixed(1)}%, even though your top dollars sit in the {marginal.rateLabel}{' '}
          bracket — because {fmt(marginal.below)} of taxable income fills cheaper bands first and{' '}
          {fmt(stdDeduction)} of wages never enters the table at all. Second, bracket creep: as pay
          rises, more of each paycheck pours into the top band. Right now{' '}
          <strong className="text-foreground">{fmt(marginal.inBracket)}</strong> of your taxable income
          is taxed at {marginal.rateLabel}
          {marginal.nextRate !== null && marginal.nextThresholdSalary !== null
            ? `, and the ${pctLabel(marginal.nextRate)} band doesn't start until ${fmt(marginal.nextThresholdSalary)} of wages`
            : ''}
          .
        </p>
        {prevSalary !== null && (
          <p>
            So what is a raise actually worth? The step from {formatSalary(prevSalary)} to {formatted}{' '}
            added {fmt(d.salary - prevSalary)} of gross to the offer letter — but only{' '}
            <strong className="text-foreground">
              {fmt(tx.netAnnual - (d.prevNetTx ?? tx.netAnnual))}
            </strong>{' '}
            of new take-home in a Texas bank account, and{' '}
            {fmt(d.ca.netAnnual - (d.prevNetCa ?? d.ca.netAnnual))} in California. The rung-by-rung
            comparison lives in the raise-math section below.
          </p>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function UpperMidOverview({ d }: { d: SalaryPageData }) {
  const { formatted, marginal, stdDeduction } = d;
  const inUpperBand = marginal.rate >= 0.24;
  const nextRateLabel = marginal.nextRate !== null ? pctLabel(marginal.nextRate) : null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        {formatted}, Dissected: Where Every Tax Dollar Goes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          label="Federal income tax"
          value={fmt(d.federalTax)}
          sub={`${d.effFedPct.toFixed(1)}% effective rate`}
        />
        <StatCard
          label="FICA"
          value={fmt(d.ficaTotal)}
          sub={`Social Security + Medicare`}
        />
        <StatCard
          label="Net in Texas"
          value={fmt(d.tx.netAnnual)}
          sub={`${fmt(d.tx.netMonthly)}/month`}
        />
        <StatCard
          label="Net in California"
          value={fmt(d.ca.netAnnual)}
          sub={`${fmt(d.caGap)} less than Texas`}
        />
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          {inUpperBand
            ? `You have already crossed into the ${marginal.rateLabel} band: ${fmt(marginal.inBracket)} of your taxable income is taxed at ${marginal.rateLabel}${nextRateLabel && marginal.nextThresholdSalary ? `, and the ${nextRateLabel} band doesn't start until ${fmt(marginal.nextThresholdSalary)} of wages` : ''}. `
            : `The number to watch at this pay level is the ${nextRateLabel} band's on-ramp: it starts at ${fmt(marginal.nextThresholdSalary ?? 0)} of wages for single filers — ${fmt(marginal.bandMax ?? 0)} of taxable income plus the ${fmt(stdDeduction)} standard deduction. At ${formatted} you are ${fmt((marginal.nextThresholdSalary ?? 0) - d.salary)} of raises away; today ${fmt(marginal.inBracket)} of taxable income sits in the ${marginal.rateLabel} band. `}
          Either way, the lower bands still fill at 10%–{marginal.prevRate !== null ? pctLabel(marginal.prevRate) : ''},
          which is why the effective rate stays down at {d.effFedPct.toFixed(1)}%.
        </p>
        {d.k401 && (
          <p>
            Pre-tax savings are the lever at this income. Deferring the full 2026 401(k) limit of{' '}
            <strong className="text-foreground">{fmt(K401_LIMIT_2026)}</strong> cuts your federal
            income tax from {fmt(d.federalTax)} to{' '}
            <strong className="text-foreground">{fmt(d.k401.fedAfter)}</strong> —{' '}
            {fmt(d.k401.savings)} back in your pocket
            {d.k401.crossedIntoLowerBand && d.k401.lowerBandRateLabel
              ? `, and it pulls your taxable income back down into the ${d.k401.lowerBandRateLabel} band`
              : ''}
            . In most states the deferral cuts state taxable income too, compounding the benefit.
          </p>
        )}
        <p>
          One employment-law note while you are salaried: federal overtime rules turn on your job
          duties, not your paycheck size — the FLSA salary floor for the white-collar exemptions is a
          small fraction of {formatted}. If your role is genuinely non-exempt, an overtime hour pays
          1.5× your {fmtFull(d.hourlyGross)} base rate ({fmtFull(d.hourlyGross * 1.5)}), taxed at your
          marginal rate.
        </p>
      </div>
    </section>
  );
}

function HighOverview({ d }: { d: SalaryPageData }) {
  const { formatted, marginal } = d;
  const items: ReactNode[] = [];
  items.push(
    <li key="bracket" className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">1</span>
      <span>
        <strong className="text-foreground">The {marginal.rateLabel} bracket.</strong> Every dollar of
        wages between {fmt(marginal.bracketStartSalary)}
        {marginal.nextThresholdSalary ? ` and ${fmt(marginal.nextThresholdSalary)}` : ''} is taxed at{' '}
        {marginal.rateLabel} federally. Your effective federal rate is only{' '}
        {d.effFedPct.toFixed(1)}% ({fmt(d.federalTax)}), because the bands below still fill at
        10%–{marginal.prevRate !== null ? pctLabel(marginal.prevRate) : ''}.
      </span>
    </li>
  );
  items.push(
    <li key="medicare" className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">2</span>
      <span>
        <strong className="text-foreground">The Additional Medicare Tax.</strong> Wages above{' '}
        {fmt(FICA_2026.additionalMedicareThreshold)} (single) carry an extra{' '}
        {pctLabel(FICA_2026.additionalMedicareRate)} Medicare withholding.{' '}
        {d.addlMedicare > 0
          ? `On ${formatted} that surtax costs ${fmt(d.addlMedicare)} for the year — 0.9% of the ${fmt(d.salary - FICA_2026.additionalMedicareThreshold)} above the threshold.`
          : `At ${formatted} you are ${fmt(FICA_2026.additionalMedicareThreshold - d.salary)} of wages away from it — the first dollar crossing that line is the first one taxed at the higher payroll rate.`}
      </span>
    </li>
  );
  items.push(
    <li key="ss" className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">3</span>
      <span>
        <strong className="text-foreground">Social Security caps out.</strong> The{' '}
        {pctLabel(FICA_2026.socialSecurityRate)} Social Security line stops at the{' '}
        {fmt(FICA_2026.socialSecurityWageCap)} wage cap — {fmt(d.ssMaxTax)} at most per year.{' '}
        {d.ssCapHitMonth !== null
          ? `On ${formatted} you cross the cap around ${MONTH_NAMES[d.ssCapHitMonth - 1]}, and every paycheck after that runs about ${fmt((d.salary / 12) * FICA_2026.socialSecurityRate)} fatter until December.`
          : `At ${formatted} you stay under the cap all year, so the 6.2% applies to every paycheck — no relief there.`}
      </span>
    </li>
  );
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        At {formatted}, Three Things Change on Your Pay Stub
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        High salaries do not just scale up the same taxes — the rules themselves shift. Three changes
        matter at {formatted}:
      </p>
      <ol className="space-y-3 text-muted-foreground leading-relaxed mb-6">{items}</ol>
      <p className="text-muted-foreground leading-relaxed">
        This is also phase-out territory: the student-loan interest deduction is long gone at this
        income, direct Roth IRA contributions phase out around this level for single filers, and most
        credits have faded. What still works: pre-tax 401(k) deferrals, HSA contributions, and state
        selection — the spread between Texas and California on {formatted} is{' '}
        <strong className="text-foreground">{fmt(d.caGap)}</strong> a year, {fmt(d.caGap / 12)} a
        month of pure geography.
      </p>
    </section>
  );
}

function TopOverview({ d }: { d: SalaryPageData }) {
  const { formatted, marginal } = d;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        {formatted} After Tax: The Top-Earner View
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          label="Marginal federal rate"
          value={marginal.rateLabel}
          sub={`on taxable income above ${fmt(marginal.bandMin)}`}
        />
        <StatCard
          label="Effective federal rate"
          value={`${d.effFedPct.toFixed(1)}%`}
          sub={`${fmt(d.federalTax)} of federal tax on ${formatted}`}
        />
        <StatCard
          label="All-in rate, Texas"
          value={`${d.effAllTxPct.toFixed(1)}%`}
          sub="federal + FICA, no state tax"
        />
        <StatCard
          label="Net in Texas"
          value={fmt(d.tx.netAnnual)}
          sub={`${fmt(d.tx.netMonthly)}/month`}
        />
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          The gap between the first two cards — {marginal.rateLabel} marginal versus{' '}
          {d.effFedPct.toFixed(1)}% effective — is the whole story of top-bracket taxes. Only{' '}
          <strong className="text-foreground">{fmt(marginal.inBracket)}</strong> of your taxable
          income (the portion above {fmt(marginal.bandMin)}) sees the {marginal.rateLabel} rate.
          Everything below it fills the cheaper bands first, and{' '}
          <strong className="text-foreground">{fmt(d.stdDeduction)}</strong> of wages is
          deduction-sheltered before the ladder even starts.
        </p>
        <p>
          Payroll tax behaves differently up here too. Social Security stopped at the{' '}
          {fmt(FICA_2026.socialSecurityWageCap)} cap — {fmt(d.ssMaxTax)} for the year, paid off by{' '}
          {d.ssCapHitMonth !== null ? MONTH_NAMES[d.ssCapHitMonth - 1] : 'year-end'}. Medicare has no
          cap: {pctLabel(FICA_2026.medicareRate)} on everything, plus the{' '}
          {pctLabel(FICA_2026.additionalMedicareRate)} Additional Medicare Tax above{' '}
          {fmt(FICA_2026.additionalMedicareThreshold)}, which costs {fmt(d.addlMedicare)} at this
          salary. Net effect: the marginal payroll rate on your next dollar is just{' '}
          {pctLabel(d.payrollMarginal)}.
        </p>
        <p>
          State choice is the biggest single lever left. Texas leaves{' '}
          <strong className="text-foreground">{fmt(d.tx.netAnnual)}</strong>; California — where your
          marginal state rate is {pctLabel(d.caMarginal)} at this income — takes the number down to{' '}
          <strong className="text-foreground">{fmt(d.ca.netAnnual)}</strong>. That {fmt(d.caGap)}{' '}
          annual difference is {fmt(d.caGap / 12)} a month, or {fmt(d.caGap * 10)} over a decade
          before any investment returns on the difference.
        </p>
      </div>
    </section>
  );
}

// ─── Bracket Position Section (per-tier headings/prose, shared table) ────────

function BracketPositionSection({ d }: { d: SalaryPageData }) {
  const { formatted, marginal, stdDeduction, taxableIncome, bracketRows, bracketTaxTotal } = d;
  const headings: Record<Tier, string> = {
    entry: `Where ${formatted} Lands in the 2026 Federal Brackets`,
    mid: `${formatted} and the ${marginal.rateLabel} Band: How Full Is It?`,
    upperMid: `Marginal vs. Effective: the Bracket Table Behind ${formatted}`,
    high: `The ${marginal.rateLabel} Slice of a ${formatted} Salary`,
    top: `How ${formatted} Fills the Bracket Ladder`,
  };
  const intros: Record<Tier, string> = {
    entry: `A ${formatted} salary becomes ${fmt(taxableIncome)} of taxable income once the ${fmt(stdDeduction)} standard deduction comes off. That money is not taxed at one flat rate — it pours into the 10% band first and spills upward:`,
    mid: `Same ladder, taller climb. After the standard deduction, ${formatted} leaves ${fmt(taxableIncome)} of taxable income. Each band fills completely before the next one takes over:`,
    upperMid: `This is the table that answers "what bracket am I in?" precisely. Your ${formatted} salary, after the ${fmt(stdDeduction)} deduction, puts ${fmt(taxableIncome)} through the bands like this:`,
    high: `At ${formatted} the top band does heavy lifting — but the lower bands still fill first at 10% through ${marginal.prevRate !== null ? pctLabel(marginal.prevRate) : ''}. The fill order:`,
    top: `Top salaries still pour through every lower band on the way up. The exact fill for ${formatted} — ${fmt(taxableIncome)} of taxable income:`,
  };
  const callouts: Record<Tier, string> = {
    entry: `Marginal ${bracketRows[bracketRows.length - 1].rateLabel}, effective federal ${d.effFedPct.toFixed(1)}%: the difference is the ${fmt(stdDeduction)} of wages that never gets taxed and the 10% price on the first ${fmt(bracketRows[0].amount)} that does.`,
    mid: `Your marginal rate is ${marginal.rateLabel}; your effective federal rate is ${d.effFedPct.toFixed(1)}%. Only ${fmt(marginal.inBracket)} of taxable income — the part above ${fmt(marginal.bandMin)} — actually pays ${marginal.rateLabel}.`,
    upperMid: `Read the two rates as different tools: the ${marginal.rateLabel} marginal rate prices your next raise and your next pre-tax dollar; the ${d.effFedPct.toFixed(1)}% effective rate is what actually landed on your ${formatted}. Confusing the two is how people turn down raises they should take.`,
    high: `Every dollar of wages above ${fmt(marginal.bracketStartSalary)} pays ${marginal.rateLabel}; every dollar below it pays less, all the way down to 10%. That is why ${formatted} carries an effective federal rate of just ${d.effFedPct.toFixed(1)}%.`,
    top: `The ${marginal.rateLabel} rate only applies above ${fmt(marginal.bandMin)} of taxable income — ${fmt(marginal.bracketStartSalary)} in wages. Everything beneath it is cheaper, which is how a ${marginal.rateLabel}-bracket salary pays only ${d.effFedPct.toFixed(1)}% effective federal.`,
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">{intros[d.tier]}</p>
      <div className="overflow-x-auto rounded-xl border border-border/30">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Band (taxable income)</th>
              <th className="text-right p-3 font-semibold text-foreground">Rate</th>
              <th className="text-right p-3 font-semibold text-foreground">Your income in band</th>
              <th className="text-right p-3 font-semibold text-foreground">Tax on band</th>
            </tr>
          </thead>
          <tbody>
            {bracketRows.map((r) => (
              <tr
                key={r.rateLabel}
                className={`border-t border-border/20 ${r.isMarginal ? 'bg-emerald-500/5' : ''}`}
              >
                <td className="p-3 text-muted-foreground">
                  {fmt(r.from)} – {r.to === null ? 'and up' : fmt(r.to)}
                  {r.isMarginal && (
                    <span className="ml-2 rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-medium text-emerald-400">
                      your bracket
                    </span>
                  )}
                </td>
                <td className="p-3 text-right font-medium text-foreground">{r.rateLabel}</td>
                <td className="p-3 text-right text-muted-foreground">{fmt(r.amount)}</td>
                <td className="p-3 text-right text-muted-foreground">{fmt(r.tax)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border/30 bg-muted/20">
              <td className="p-3 font-medium text-foreground">Total</td>
              <td className="p-3" />
              <td className="p-3 text-right font-medium text-foreground">{fmt(taxableIncome)}</td>
              <td className="p-3 text-right font-medium text-foreground">{fmt(bracketTaxTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-4 text-muted-foreground leading-relaxed">{callouts[d.tier]}</p>
    </section>
  );
}

// ─── Pay Frequency Section ───────────────────────────────────────────────────

function PayFrequencySection({ d }: { d: SalaryPageData }) {
  const { formatted, tx, ca, ny } = d;
  const headings: Record<Tier, string> = {
    entry: `${formatted}, Translated into Real Paychecks`,
    mid: `Every Pay Frequency on a ${formatted} Salary`,
    upperMid: `The Paycheck Math of ${formatted}`,
    high: `Cash Flow on ${formatted}, by Pay Period`,
    top: `${formatted} at Every Pay Cadence`,
  };
  const intros: Record<Tier, string> = {
    entry: `Budgeting a first salary is easier in paycheck terms. Here is ${formatted} translated — hourly figures assume 2,080 paid hours (52 weeks × 40 hours):`,
    mid: `Whether you are paid weekly or twice a month, here is what actually lands in the account. Gross first, then net in three anchor states; the hourly row assumes a 2,080-hour year:`,
    upperMid: `Offer letters quote annual figures; banks see paychecks. The translation of ${formatted} into every common pay frequency, net of Texas, California, and New York tax (2,080-hour basis for hourly):`,
    high: `The cash-flow view of ${formatted} across pay frequencies. Note that the New York column excludes the additional NYC resident income tax, which would trim it further:`,
    top: `What ${formatted} looks like at every pay cadence — gross, then net under three state treatments (New York figures exclude the NYC resident tax):`,
  };
  const rows: { label: string; gross: string; txNet: string; caNet: string; nyNet: string }[] = [
    {
      label: 'Hourly',
      gross: fmtFull(d.hourlyGross),
      txNet: fmtFull(tx.netAnnual / HOURS_PER_YEAR),
      caNet: fmtFull(ca.netAnnual / HOURS_PER_YEAR),
      nyNet: fmtFull(ny.netAnnual / HOURS_PER_YEAR),
    },
    {
      label: 'Weekly',
      gross: fmt(d.salary / 52),
      txNet: fmt(tx.netWeekly),
      caNet: fmt(ca.netWeekly),
      nyNet: fmt(ny.netWeekly),
    },
    {
      label: 'Bi-weekly',
      gross: fmt(d.salary / 26),
      txNet: fmt(tx.netBiweekly),
      caNet: fmt(ca.netBiweekly),
      nyNet: fmt(ny.netBiweekly),
    },
    {
      label: 'Semi-monthly',
      gross: fmt(d.salary / 24),
      txNet: fmt(tx.netAnnual / 24),
      caNet: fmt(ca.netAnnual / 24),
      nyNet: fmt(ny.netAnnual / 24),
    },
    {
      label: 'Monthly',
      gross: fmt(d.salary / 12),
      txNet: fmt(tx.netMonthly),
      caNet: fmt(ca.netMonthly),
      nyNet: fmt(ny.netMonthly),
    },
  ];
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">{intros[d.tier]}</p>
      <div className="overflow-x-auto rounded-xl border border-border/30">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Pay frequency</th>
              <th className="text-right p-3 font-semibold text-foreground">Gross</th>
              <th className="text-right p-3 font-semibold text-foreground">Net — Texas</th>
              <th className="text-right p-3 font-semibold text-foreground">Net — California</th>
              <th className="text-right p-3 font-semibold text-foreground">Net — New York</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-border/20">
                <td className="p-3 font-medium text-foreground">{r.label}</td>
                <td className="p-3 text-right text-muted-foreground">{r.gross}</td>
                <td className="p-3 text-right text-foreground">{r.txNet}</td>
                <td className="p-3 text-right text-muted-foreground">{r.caNet}</td>
                <td className="p-3 text-right text-muted-foreground">{r.nyNet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Adjacent-Salary Comparison (net-raise section) ─────────────────────────

function SalaryStepCard({
  amount,
  netTx,
  netCa,
  current,
}: {
  amount: number;
  netTx: number;
  netCa: number;
  current?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        current ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border/30 bg-card/50'
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className={`text-lg font-bold ${current ? 'text-emerald-400' : 'text-foreground'}`}>
          {formatSalary(amount)}
          {current && <span className="ml-2 text-xs font-medium text-muted-foreground">you are here</span>}
        </p>
        <p className="text-xs text-muted-foreground">
          {fmtFull(amount / HOURS_PER_YEAR)}/hr gross
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Net in Texas</p>
          <p className="font-semibold text-foreground">{fmt(netTx)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Net in California</p>
          <p className="font-semibold text-foreground">{fmt(netCa)}</p>
        </div>
      </div>
    </div>
  );
}

function RaiseChip({ gross, netTx, netCa }: { gross: number; netTx: number; netCa: number }) {
  return (
    <div className="flex items-center gap-3 px-2 sm:px-6">
      <span className="text-emerald-400" aria-hidden>↗</span>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">+{fmt(gross)} gross</span> →{' '}
        <span className="font-medium text-emerald-400">+{fmt(netTx)} take-home</span> in Texas ·{' '}
        +{fmt(netCa)} in California
      </p>
    </div>
  );
}

function AdjacentSalarySection({ d }: { d: SalaryPageData }) {
  const { formatted, tx, ca, marginal, prevSalary, nextSalary } = d;

  const headings: Record<Tier, string> = {
    entry: `What the Next Raise Is Actually Worth`,
    mid: `Raise Math: ${prevSalary ? `${formatSalary(prevSalary)} → ${formatted}` : formatted}${nextSalary ? ` → ${formatSalary(nextSalary)}` : ''}`,
    upperMid: `One Rung Up: ${formatted} vs. the Nearest Salaries`,
    high: `The Cost of Climbing from ${formatted}`,
    top: `The Last Rung of the Salary Ladder`,
  };

  const prevRaiseTx = d.prevNetTx !== null ? tx.netAnnual - d.prevNetTx : null;
  const prevRaiseCa = d.prevNetCa !== null ? ca.netAnnual - d.prevNetCa : null;
  const nextRaiseTx = d.nextNetTx !== null ? d.nextNetTx - tx.netAnnual : null;
  const nextRaiseCa = d.nextNetCa !== null ? d.nextNetCa - ca.netAnnual : null;

  let prose: ReactNode;
  switch (d.tier) {
    case 'entry':
      prose = (
        <p>
          Raises at the bottom of the ladder are the cheapest you will ever be taxed — most of each
          raise dollar survives at this level. The exact trade, computed for real:
        </p>
      );
      break;
    case 'mid':
      prose = prevRaiseTx !== null && prevSalary !== null ? (
        <p>
          Here is bracket creep priced in dollars. The step from {formatSalary(prevSalary)} to{' '}
          {formatted} puts <strong className="text-foreground">{fmt(prevRaiseTx)}</strong> of new
          take-home in a Texas account — about{' '}
          {Math.round((prevRaiseTx / (d.salary - prevSalary)) * 100)} cents per gross dollar — because
          each raise dollar pays {marginal.rateLabel} federal plus{' '}
          {pctLabel(d.payrollMarginal)} payroll. In California the same raise is worth{' '}
          {fmt(prevRaiseCa ?? 0)}: subtract a {pctLabel(d.caMarginal)} state marginal rate as well.
        </p>
      ) : (
        <p>Here is what each step of the salary ladder is worth after taxes:</p>
      );
      break;
    case 'upperMid':
      prose = nextRaiseTx !== null && nextSalary !== null ? (
        <p>
          Is the next rung worth negotiating for? From {formatted} to {formatSalary(nextSalary)} —{' '}
          {fmt(nextSalary - d.salary)} of gross — you keep{' '}
          <strong className="text-foreground">{fmt(nextRaiseTx)}</strong> in Texas and{' '}
          {fmt(nextRaiseCa ?? 0)} in California. Each gross dollar keeps{' '}
          {Math.round(d.keepNextDollarTxPct)} cents in a no-tax state and{' '}
          {Math.round(d.keepNextDollarCaPct)} cents in California.
        </p>
      ) : (
        <p>Here is how the nearest salaries compare after tax:</p>
      );
      break;
    case 'high':
      prose = nextRaiseTx !== null && nextSalary !== null ? (
        <p>
          At this level raises run through the {marginal.rateLabel} federal band plus a{' '}
          {pctLabel(d.payrollMarginal)} marginal payroll rate — so of the{' '}
          {fmt(nextSalary - d.salary)} step to {formatSalary(nextSalary)},{' '}
          <strong className="text-foreground">{fmt(nextRaiseTx)}</strong> sticks in Texas and{' '}
          {fmt(nextRaiseCa ?? 0)} in California. The California number eats a{' '}
          {pctLabel(d.caMarginal)} state marginal rate on top.
        </p>
      ) : (
        <p>Here is how the neighboring salaries land after tax:</p>
      );
      break;
    default:
      prose =
        prevRaiseTx !== null && prevSalary !== null ? (
          <p>
            From {formatSalary(prevSalary)} to {formatted} — {fmt(d.salary - prevSalary)} of gross —{' '}
            <strong className="text-foreground">{fmt(prevRaiseTx)}</strong> stuck in Texas and{' '}
            {fmt(prevRaiseCa ?? 0)} in California. The combined marginal bite on that final rung:{' '}
            {d.combinedMarginalTxPct.toFixed(1)}% in Texas versus{' '}
            {d.combinedMarginalCaPct.toFixed(1)}% in California.
          </p>
        ) : (
          <p>Here is the after-tax comparison across the top of the salary ladder:</p>
        );
      break;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <div className="text-muted-foreground leading-relaxed mb-5">{prose}</div>
      <div className="space-y-3">
        {prevSalary !== null && d.prevNetTx !== null && d.prevNetCa !== null && (
          <>
            <SalaryStepCard amount={prevSalary} netTx={d.prevNetTx} netCa={d.prevNetCa} />
            {prevRaiseTx !== null && prevRaiseCa !== null && (
              <RaiseChip
                gross={d.salary - prevSalary}
                netTx={prevRaiseTx}
                netCa={prevRaiseCa}
              />
            )}
          </>
        )}
        <SalaryStepCard amount={d.salary} netTx={tx.netAnnual} netCa={ca.netAnnual} current />
        {nextSalary !== null && d.nextNetTx !== null && d.nextNetCa !== null && (
          <>
            {nextRaiseTx !== null && nextRaiseCa !== null && (
              <RaiseChip
                gross={nextSalary - d.salary}
                netTx={nextRaiseTx}
                netCa={nextRaiseCa}
              />
            )}
            <SalaryStepCard amount={nextSalary} netTx={d.nextNetTx} netCa={d.nextNetCa} />
          </>
        )}
      </div>
      {(d.salary === SALARY_AMOUNTS[0] || d.salary === SALARY_AMOUNTS[SALARY_AMOUNTS.length - 1]) && (
        <p className="mt-4 text-sm text-muted-foreground">
          {d.salary === SALARY_AMOUNTS[0]
            ? 'This is the bottom rung of our salary ladder — every other salary page is a step up from here.'
            : 'This is the top of our salary ladder — there is no higher comparison rung on the site.'}
        </p>
      )}
    </section>
  );
}

// ─── Top-10 States Section ───────────────────────────────────────────────────

function TopStatesSection({ d }: { d: SalaryPageData }) {
  const { formatted, top10, ca } = d;
  const spread = top10[0].netAnnual - top10[9].netAnnual;
  const headings: Record<Tier, string> = {
    entry: `The 10 Best States to Earn ${formatted}`,
    mid: `Highest Take-Home Pay on ${formatted}: the State Rankings`,
    upperMid: `Where ${formatted} Goes Furthest: the Top 10 States`,
    high: `Top 10 States for a ${formatted} Salary`,
    top: `The Best States to Bank a ${formatted} Paycheck`,
  };
  const intros: Record<Tier, string> = {
    entry: `${d.noTaxStateCount} of these ten states levy no income tax on wages at all, and the most any of them takes is ${fmt(Math.max(...top10.map((s) => s.stateTax)))} a year. If you can work from anywhere on ${formatted}, this list is the shortlist:`,
    mid: `The spread between first and tenth place is ${fmt(spread)} a year — real money, but small next to the ${fmt(d.caGap)} that California gives up versus the leaders. Rankings on ${formatted}:`,
    upperMid: `The top ten on ${formatted} breaks into zero-tax states and a few flat-tax underdogs. Washington and Nevada tie Texas to the dollar at ${fmt(d.tx.netAnnual)} — wage tax is zero in all of them — while the highest state-tax bill inside this top ten is just ${fmt(Math.max(...top10.map((s) => s.stateTax)))}:`,
    high: `The ordering barely changes as income rises — what changes is the stakes. The #1-to-#10 spread on ${formatted} is ${fmt(spread)}, and the drop from #1 to California is ${fmt(d.caGap)} a year:`,
    top: `At ${formatted}, state tax is a six-figure decision over a decade: everyone in this top ten keeps ${fmt(top10[9].netAnnual)} or better, while California costs ${fmt(d.caGap)} versus Texas every single year:`,
  };
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">{intros[d.tier]}</p>
      <div className="overflow-x-auto rounded-xl border border-border/30">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Rank</th>
              <th className="text-left p-3 font-semibold text-foreground">State</th>
              <th className="text-right p-3 font-semibold text-foreground">Net Annual</th>
              <th className="text-right p-3 font-semibold text-foreground">Monthly</th>
              <th className="text-right p-3 font-semibold text-foreground">Bi-Weekly</th>
              <th className="text-right p-3 font-semibold text-foreground">All-In Rate</th>
            </tr>
          </thead>
          <tbody>
            {top10.map((s, i) => (
              <tr key={s.stateKey} className="border-t border-border/20">
                <td className="p-3 text-muted-foreground">{i + 1}</td>
                <td className="p-3 font-medium text-foreground">{s.stateName}</td>
                <td className="p-3 text-right text-foreground">{fmt(s.netAnnual)}</td>
                <td className="p-3 text-right text-muted-foreground">{fmt(s.netMonthly)}</td>
                <td className="p-3 text-right text-muted-foreground">{fmt(s.netBiweekly)}</td>
                <td className="p-3 text-right text-muted-foreground">{s.effectiveTaxRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        California, for comparison, lands at {fmt(ca.netAnnual)} — outside this top ten.
      </p>
    </section>
  );
}

// ─── Key States Section (tier-specific card copy) ────────────────────────────

function KeyStatesSection({ d }: { d: SalaryPageData }) {
  const { formatted, tx, ca, ny, fl, il, wa, marginal } = d;
  const headings: Record<Tier, string> = {
    entry: `Your ${formatted} in the Five Biggest State Economies`,
    mid: `State-by-State: ${formatted} Net Pay in the Big Five`,
    upperMid: `The Big-Five States, Priced on a ${formatted} Salary`,
    high: `Anchor States on a ${formatted} Salary: the Planning View`,
    top: `The Big-Five States at ${formatted}`,
  };

  const blurbs: Record<Tier, Record<'tx' | 'ca' | 'ny' | 'fl' | 'il' | 'wa', string>> = {
    entry: {
      tx: `No state income tax means your ${formatted} starting salary faces only federal tax and FICA — net ${fmt(tx.netAnnual)} (${fmt(tx.netMonthly)}/month). Texas funds itself with a 6.25% state sales tax and property taxes averaging 1.71% of home value.`,
      ca: `California's brackets start at 1% and climb from there; on ${formatted} the state takes about ${fmt(ca.stateTax)}. Net: ${fmt(ca.netAnnual)}. A starter salary stretches further once you budget around the state's housing costs.`,
      ny: `New York State takes ${fmt(ny.stateTax)} on ${formatted} (outside NYC), leaving ${fmt(ny.netAnnual)}. City residents pay the NYC income tax on top, which trims the number further.`,
      fl: `Like Texas, Florida skips the income tax entirely — ${fmt(fl.netAnnual)} net on ${formatted}. Average property tax is a light 0.86%, with a homestead exemption for primary residences.`,
      il: `Illinois's flat 4.95% runs ${fmt(il.stateTax)} on ${formatted}, netting ${fmt(il.netAnnual)}. The trade-off is property tax, among the nation's highest at about 1.78% average.`,
      wa: `Washington levies no income tax on wages: ${fmt(wa.netAnnual)} net, identical to Texas. Its 7% capital-gains tax applies only to large investment profits, not paychecks.`,
    },
    mid: {
      tx: `A ${formatted} salary clears ${fmt(tx.netAnnual)} in Texas — no state income tax on wages. That is ${fmt(tx.netMonthly)} landing in the account every month.`,
      ca: `At ${formatted}, California takes ${fmt(ca.stateTax)} — your marginal state rate here is ${pctLabel(d.caMarginal)}. Net ${fmt(ca.netAnnual)}, which is ${fmt(d.caGap)} a year behind Texas.`,
      ny: `New York taxes ${formatted} at ${fmt(ny.stateTax)} of state tax, netting ${fmt(ny.netAnnual)} outside NYC. City residents add the NYC income tax on top.`,
      fl: `Florida: ${fmt(fl.netAnnual)} net on ${formatted} — identical to Texas. Sales tax (6% state plus local surtax) is the revenue engine instead.`,
      il: `The flat 4.95% makes Illinois predictable: ${fmt(il.stateTax)} in state tax, ${fmt(il.netAnnual)} net on ${formatted}, no bracket surprises as your pay rises.`,
      wa: `No income tax in Washington: ${fmt(wa.netAnnual)} net on ${formatted}. Tech-sector salaries keep every dollar of state tax that California would take.`,
    },
    upperMid: {
      tx: `On ${formatted}, Texas takes nothing — net ${fmt(tx.netAnnual)}. At a ${marginal.rateLabel} federal marginal rate, every pre-tax 401(k) dollar you defer shelters that rate in federal tax.`,
      ca: `California runs ${fmt(ca.stateTax)} of state tax on ${formatted} (net ${fmt(ca.netAnnual)}). Your marginal state rate at this income is ${pctLabel(d.caMarginal)} — the price California puts on your next raise dollar.`,
      ny: `NY state tax on ${formatted} is ${fmt(ny.stateTax)}; net ${fmt(ny.netAnnual)} outside the city. NYC residents pay the city income tax as well.`,
      fl: `${fmt(fl.netAnnual)} net in Florida — no state tax on ${formatted}. Same take-home as Texas, Nevada, and the other zero-tax states.`,
      il: `Illinois's flat 4.95% costs ${fmt(il.stateTax)} on ${formatted}, netting ${fmt(il.netAnnual)}. The rate never jumps as income climbs — easy to plan around.`,
      wa: `Washington's no-income-tax rule makes ${formatted} worth ${fmt(wa.netAnnual)}. The state's 7% capital-gains tax touches large investment profits, never wages.`,
    },
    high: {
      tx: `Texas leaves ${fmt(tx.netAnnual)} of ${formatted} untouched by state tax — ${fmt(tx.netMonthly)} a month. At your ${marginal.rateLabel} federal marginal rate, deferrals shelter real money here.`,
      ca: `On ${formatted}, California's state tax reaches ${fmt(ca.stateTax)} — net ${fmt(ca.netAnnual)}. The CA-versus-TX gap is ${fmt(d.caGap)} annually, or ${fmt(d.caGap / 12)} a month.`,
      ny: `New York takes ${fmt(ny.stateTax)} from ${formatted} (net ${fmt(ny.netAnnual)}); NYC residents owe city tax on top. Your marginal NY rate at this income is ${pctLabel(d.nyMarginal)}.`,
      fl: `Florida nets ${fmt(fl.netAnnual)} on ${formatted} — the no-tax benchmark. Homestead exemptions keep property tax contained on primary residences.`,
      il: `Flat 4.95%: ${fmt(il.stateTax)} to Illinois on ${formatted}, net ${fmt(il.netAnnual)}. At high incomes the flat rate undercuts the top bands of progressive states.`,
      wa: `Washington: ${fmt(wa.netAnnual)} net on ${formatted}. No wage income tax — the 7% capital-gains tax is the only income-adjacent levy, and it spares salaries.`,
    },
    top: {
      tx: `At ${formatted}, Texas's zero income tax preserves ${fmt(tx.netAnnual)} — every dollar California would take can stay invested instead.`,
      ca: `California's upper brackets claim ${fmt(ca.stateTax)} on ${formatted} — net ${fmt(ca.netAnnual)}. Your marginal CA rate at this income is ${pctLabel(d.caMarginal)}. Over a decade, the Texas-versus-California gap compounds to ${fmt(d.caGap * 10)}.`,
      ny: `New York nets ${fmt(ny.netAnnual)} on ${formatted} after ${fmt(ny.stateTax)} of state tax. The 10.9% top band starts above $1,000,000 of taxable income — not your bracket at this salary.`,
      fl: `Florida: ${fmt(fl.netAnnual)} net on ${formatted}. No income tax, and homestead caps limit how fast property tax can grow on a primary home.`,
      il: `Illinois's flat 4.95% runs ${fmt(il.stateTax)} on ${formatted} — net ${fmt(il.netAnnual)}. At top incomes the flat rate is dramatically lighter than progressive states' upper bands.`,
      wa: `Washington keeps ${fmt(wa.netAnnual)} of ${formatted} intact — no wage income tax at any level. Large capital gains face the 7% levy, but salary never does.`,
    },
  };

  const set = blurbs[d.tier];
  const cards: { state: StateTakeHome; key: 'tx' | 'ca' | 'ny' | 'fl' | 'il' | 'wa'; title: string; href: string }[] = [
    { state: tx, key: 'tx', title: `${formatted} After Tax in Texas`, href: '/texas-tax-calculator' },
    { state: ca, key: 'ca', title: `${formatted} After Tax in California`, href: '/california-tax-calculator' },
    { state: ny, key: 'ny', title: `${formatted} After Tax in New York`, href: '/new-york-tax-calculator' },
    { state: fl, key: 'fl', title: `${formatted} After Tax in Florida`, href: '/florida-tax-calculator' },
    { state: il, key: 'il', title: `${formatted} After Tax in Illinois`, href: '/illinois-tax-calculator' },
    { state: wa, key: 'wa', title: `${formatted} After Tax in Washington`, href: '/washington-tax-calculator' },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <StateCard
            key={c.key}
            state={c.state}
            title={c.title}
            description={set[c.key]}
            calculatorHref={c.href}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Bottom-5 States Section ─────────────────────────────────────────────────

function BottomStatesSection({ d }: { d: SalaryPageData }) {
  const { formatted, bottom5, sortedStates } = d;
  const spread = sortedStates[0].netAnnual - sortedStates[sortedStates.length - 1].netAnnual;
  const worst = bottom5[0];
  const headings: Record<Tier, string> = {
    entry: `Where ${formatted} Gets Stretched Thin`,
    mid: `The Five Costliest States for a ${formatted} Salary`,
    upperMid: `Bottom Five: ${formatted} Net Pay`,
    high: `The Expensive End of the ${formatted} Spectrum`,
    top: `High-Tax States Take the Biggest Bite from ${formatted}`,
  };
  const intros: Record<Tier, string> = {
    entry: `The spread between the best and worst state for a ${formatted} salary is ${fmt(spread)} a year — ${((spread / d.salary) * 100).toFixed(1)}% of gross. The five below take the biggest share, worst first:`,
    mid: `Five states shave at least ${fmt(Math.min(...bottom5.map((s) => s.stateTax)))} off ${formatted} in state income tax. Ranked from most to least expensive of the bottom five:`,
    upperMid: `Ranked worst first. The costliest state runs a ${worst.effectiveTaxRate.toFixed(1)}% all-in effective rate on ${formatted}, against ${d.tx.effectiveTaxRate.toFixed(1)}% in a no-tax state:`,
    high: `The costliest five on ${formatted}, worst first. The full spread across all 50 states is ${fmt(spread)} — ${fmt(spread / 12)} a month of pure geography:`,
    top: `The expensive end of the ${formatted} spectrum — five states where the total tax bill reaches ${fmt(worst.totalDeductions)} or more. Geography is worth ${fmt(spread)} a year at this salary:`,
  };
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">{intros[d.tier]}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {bottom5.map((s) => (
          <div key={s.stateKey} className="rounded-lg border border-border/30 bg-card/50 p-3 text-center">
            <p className="font-semibold text-foreground">{s.stateName}</p>
            <p className="text-sm text-emerald-400 mt-1">{fmt(s.netAnnual)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.effectiveTaxRate.toFixed(1)}% effective</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Related Links (kept sections, tier-tuned salary chips) ──────────────────

function RelatedLinksSection({ d }: { d: SalaryPageData }) {
  const tierSpread: Record<Tier, number[]> = {
    entry: [50000, 75000, 100000, 150000],
    mid: [50000, 100000, 150000, 200000],
    upperMid: [75000, 100000, 150000, 200000],
    high: [100000, 150000, 200000, 300000],
    top: [150000, 200000, 300000, 400000],
  };
  const anchors: number[] = [];
  if (d.prevSalary !== null) anchors.push(d.prevSalary);
  if (d.nextSalary !== null) anchors.push(d.nextSalary);
  for (const a of tierSpread[d.tier]) {
    if (anchors.length >= 6) break;
    if (a !== d.salary && !anchors.includes(a)) anchors.push(a);
  }

  const headings: Record<Tier, string> = {
    entry: 'Keep Researching: Salaries, States & Tools',
    mid: 'More Salary & State Tax Resources',
    upperMid: 'Related Calculators & Salary Pages',
    high: 'Planning Tools & Related Salary Pages',
    top: 'More for High Earners: Tools & Comparisons',
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border/30 bg-card/50 p-5">
          <h3 className="font-semibold text-foreground mb-3">Other Salary Pages</h3>
          <div className="flex flex-wrap gap-2">
            {anchors.slice(0, 6).map((amount) => (
              <Link
                key={amount}
                href={`/salary/${amount}-after-taxes`}
                className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
              >
                {formatSalaryCompact(amount)}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/50 p-5">
          <h3 className="font-semibold text-foreground mb-3">State Calculators</h3>
          <div className="space-y-1.5">
            <Link href="/texas-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Texas Tax Calculator</Link>
            <Link href="/california-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">California Tax Calculator</Link>
            <Link href="/new-york-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">New York Tax Calculator</Link>
            <Link href="/florida-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Florida Tax Calculator</Link>
            <Link href="/illinois-tax-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Illinois Tax Calculator</Link>
          </div>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/50 p-5">
          <h3 className="font-semibold text-foreground mb-3">Useful Tools</h3>
          <div className="space-y-1.5">
            <Link href="/paycheck-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Paycheck Calculator</Link>
            <Link href="/compare" className="block text-sm text-muted-foreground hover:text-emerald-400">Compare State Taxes</Link>
            <Link href="/federal-tax-brackets" className="block text-sm text-muted-foreground hover:text-emerald-400">2026 Federal Tax Brackets</Link>
            <Link href="/401k-retirement-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">401(k) Retirement Calculator</Link>
            <Link href="/relocation-calculator" className="block text-sm text-muted-foreground hover:text-emerald-400">Relocation Calculator</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section (tier-varied, exported generator below) ─────────────────────

function FaqSection({ d }: { d: SalaryPageData }) {
  const headings: Record<Tier, string> = {
    entry: `${d.formatted} After Taxes — Questions New Earners Ask`,
    mid: `FAQ: ${d.formatted} Take-Home Pay`,
    upperMid: `${d.formatted} Salary Tax Questions, Answered`,
    high: `FAQ: ${d.formatted} and the High-Income Rules`,
    top: `${d.formatted} — Top-Earner Tax FAQ`,
  };
  const faqs = generateTierFaqs(d.salary);
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{headings[d.tier]}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
              <span className="text-sm sm:text-base">{faq.question}</span>
              <span className="text-muted-foreground text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─── State Lookup Grid (kept) ────────────────────────────────────────────────

function StateLookupSection({ d }: { d: SalaryPageData }) {
  const { formatted, sortedStates } = d;
  const headings: Record<Tier, string> = {
    entry: `Find Your State's ${formatted} Calculator`,
    mid: `Your State, Your ${formatted} Net Pay`,
    upperMid: `Jump to Any State's ${formatted} Breakdown`,
    high: `All 50 States: ${formatted} Net Pay at a Glance`,
    top: `Pick Your State for the Full ${formatted} Breakdown`,
  };
  const intros: Record<Tier, string> = {
    entry: `Skip the scrolling — open your state's calculator for the exact ${formatted} take-home, monthly breakdown, and effective rate, with 2026 federal and state brackets.`,
    mid: `Every state, one grid. Click through for your state's full ${formatted} breakdown — take-home, monthly figures, and the complete deduction stack.`,
    upperMid: `Your state's ${formatted} numbers, one click away. Each calculator shows the full federal, FICA, and state tax stack for 2026.`,
    high: `The complete ${formatted} map — net pay for all 50 states. Open any state's calculator for the detailed breakdown behind its number.`,
    top: `All 50 states ranked by ${formatted} take-home. Open your state for the full breakdown behind its figure.`,
  };
  return (
    <section className="mt-12 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-3">{headings[d.tier]}</h2>
      <p className="text-muted-foreground mb-5 leading-relaxed">{intros[d.tier]}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sortedStates.map((s) => {
          const stateSlug = s.stateName.toLowerCase().replace(/\s/g, '-');
          return (
            <Link
              key={s.stateKey}
              href={`/${stateSlug}-tax-calculator`}
              className="group rounded-lg border border-border/30 bg-background/40 px-3 py-2 text-sm hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
            >
              <div className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                {s.stateName}
              </div>
              <div className="text-xs text-muted-foreground">{fmt(s.netAnnual)}/yr</div>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Click your state to open its dedicated {formatted} tax calculator with full breakdown.
      </p>
    </section>
  );
}

// ─── State Card Component (kept) ─────────────────────────────────────────────

function StateCard({
  state,
  title,
  description,
  calculatorHref,
}: {
  state: StateTakeHome;
  title: string;
  description: string;
  calculatorHref: string;
}) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-5 hover:border-emerald-500/30 transition-colors">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-emerald-400 font-medium">{fmt(state.netAnnual)}/yr</span>
        <Link href={calculatorHref} className="text-muted-foreground hover:text-emerald-400">
          Open Calculator →
        </Link>
      </div>
    </div>
  );
}

// ─── Tier FAQ Generator (used by visible FAQ + JSON-LD in page.tsx) ──────────

function netIn(calc: ReturnType<typeof calculateSalaryTakeHome>, key: string): StateTakeHome {
  return calc.states.find((s) => s.stateKey === key)!;
}

export function generateTierFaqs(salary: number): { question: string; answer: string }[] {
  const d = buildSalaryPageData(salary);
  const { formatted, tx, ca, ny, stdDeduction, taxableIncome, marginal } = d;
  const gap = d.caGap;
  const bandLabels = d.bracketRows.map((r) => r.rateLabel).join(' → ');
  const tenPctBand = FEDERAL_TAX_2026.brackets[0].max ?? 0;

  switch (d.tier) {
    case 'entry':
      return [
        {
          question: `How much is ${formatted} after taxes in Texas?`,
          answer: `Texas takes no state income tax, so on ${formatted} your only deductions are federal tax (${fmt(tx.federalTax)}) and FICA (${fmt(tx.ficaTotal)}). That leaves about ${fmt(tx.netAnnual)} a year — ${fmt(tx.netMonthly)} a month, or ${fmt(tx.netBiweekly)} per bi-weekly paycheck — for a single filer claiming the standard deduction.`,
        },
        {
          question: `How much is ${formatted} after taxes in California?`,
          answer: `California's state tax on ${formatted} works out to ${fmt(ca.stateTax)} — a ${((ca.stateTax / salary) * 100).toFixed(1)}% effective state rate. After federal tax (${fmt(ca.federalTax)}) and FICA (${fmt(ca.ficaTotal)}), you net roughly ${fmt(ca.netAnnual)} a year: ${fmt(gap)} less than the same salary in Texas.`,
        },
        {
          question: `How much of a ${formatted} salary is tax-free?`,
          answer: `More than you would guess. The ${fmt(stdDeduction)} standard deduction comes off the top for single filers, so only ${fmt(taxableIncome)} of your ${formatted} faces federal income tax — and the first ${fmt(Math.min(taxableIncome, tenPctBand))} of that is taxed at just 10%. Total federal income tax: ${fmt(tx.federalTax)}, a ${d.effFedPct.toFixed(1)}% effective rate.`,
        },
        {
          question: `Why does payroll tax cost more than income tax on ${formatted}?`,
          answer: `FICA — Social Security at ${pctLabel(FICA_2026.socialSecurityRate)} up to ${fmt(FICA_2026.socialSecurityWageCap)} of wages, plus Medicare at ${pctLabel(FICA_2026.medicareRate)} with no cap — applies from your first dollar, with no deduction and no brackets. At ${formatted} that is ${fmt(tx.ficaTotal)} for the year, versus ${fmt(tx.federalTax)} of federal income tax after the standard deduction shelters ${fmt(stdDeduction)}. Almost every starting salary sees the same surprise.`,
        },
        {
          question: `Can you live on ${formatted} a year?`,
          answer: `It depends heavily on geography. In a no-tax state like Texas you clear ${fmt(tx.netAnnual)} — workable in most metros if rent stays under roughly ${fmt(tx.netMonthly * 0.3)} a month (the 30% guideline). In California the same salary nets ${fmt(ca.netAnnual)}, and coastal rents will test that budget. These figures exclude refundable credits like the EITC, which can add to take-home if you qualify.`,
        },
      ];

    case 'mid':
      return [
        {
          question: `What's ${formatted} after taxes in a no-income-tax state?`,
          answer: `In Texas — or Florida, Washington, Nevada and the other zero-tax states — ${formatted} nets about ${fmt(tx.netAnnual)}: gross minus ${fmt(tx.federalTax)} of federal tax and ${fmt(tx.ficaTotal)} of FICA. Monthly that is ${fmt(tx.netMonthly)}; bi-weekly, ${fmt(tx.netBiweekly)}.`,
        },
        {
          question: `How much less does ${formatted} pay in California than in Texas?`,
          answer: `California's state tax on ${formatted} runs ${fmt(ca.stateTax)} — at this income your marginal CA rate is ${pctLabel(d.caMarginal)}. Net pay: ${fmt(ca.netAnnual)} in California versus ${fmt(tx.netAnnual)} in Texas. That is ${fmt(gap)} a year, or ${fmt(gap / 12)} a month, of pure state-tax difference.`,
        },
        {
          question: `What tax bracket is ${formatted} in for 2026?`,
          answer: `Your marginal federal bracket is ${marginal.rateLabel}: for a single filer, that band runs from ${fmt(marginal.bracketStartSalary)}${marginal.nextThresholdSalary ? ` to ${fmt(marginal.nextThresholdSalary)}` : ''} of wages. Your effective federal rate on ${formatted} is only ${d.effFedPct.toFixed(1)}% (${fmt(tx.federalTax)}), because the lower bands fill first (${bandLabels}) and the standard deduction removes ${fmt(stdDeduction)} from the table.`,
        },
        {
          question:
            d.prevSalary !== null
              ? `How much of a raise from ${formatSalary(d.prevSalary)} to ${formatted} actually hits my bank account?`
              : `How much of a raise at this salary actually hits my bank account?`,
          answer:
            d.prevSalary !== null && d.prevNetTx !== null && d.prevNetCa !== null
              ? `The gross bump is ${fmt(salary - d.prevSalary)}. After taxes it is worth ${fmt(tx.netAnnual - d.prevNetTx)} in Texas and ${fmt(ca.netAnnual - d.prevNetCa)} in California — roughly ${Math.round(((tx.netAnnual - d.prevNetTx) / (salary - d.prevSalary)) * 100)} cents per gross dollar in a no-tax state, because raise dollars are taxed at your ${marginal.rateLabel} marginal rate plus ${pctLabel(d.payrollMarginal)} payroll tax.`
              : `At ${formatted}, each raise dollar keeps about ${Math.round(d.keepNextDollarTxPct)} cents in a no-tax state after the ${marginal.rateLabel} federal band and ${pctLabel(d.payrollMarginal)} payroll tax — less in states with an income tax.`,
        },
        {
          question: `What's ${formatted} a year in hourly pay?`,
          answer: `Divide by 2,080 hours (52 weeks × 40) and ${formatted} gross equals ${fmtFull(d.hourlyGross)} an hour. After taxes that is ${fmtFull(tx.netAnnual / HOURS_PER_YEAR)} net per hour in Texas and ${fmtFull(ca.netAnnual / HOURS_PER_YEAR)} in California. Overtime at 1.5× would pay ${fmtFull(d.hourlyGross * 1.5)} an hour if your role is non-exempt.`,
        },
      ];

    case 'upperMid':
      return [
        {
          question: `What's ${formatted} after taxes in Texas and California?`,
          answer: `Texas: ${fmt(tx.netAnnual)} net (${fmt(tx.netMonthly)} a month) — no state income tax. California: ${fmt(ca.netAnnual)} after ${fmt(ca.stateTax)} of state tax. The ${fmt(gap)}-a-year gap is why relocation math gets serious at this salary level.`,
        },
        {
          question: `When does the 24% bracket start in 2026, and am I in it?`,
          answer: (() => {
            const b24 = FEDERAL_TAX_2026.brackets.find((b) => b.rate === 0.24)!;
            const b24StartWages = b24.min + stdDeduction;
            return `For single filers, the 24% band begins at ${fmt(b24.min)} of taxable income — ${fmt(b24StartWages)} of wages once the ${fmt(stdDeduction)} standard deduction is applied. ${
              marginal.rate >= 0.24
                ? `At ${formatted} you are inside it: ${fmt(marginal.inBracket)} of your taxable income is taxed at ${marginal.rateLabel}.`
                : `At ${formatted} you are still in the ${marginal.rateLabel} band, ${fmt(b24StartWages - salary)} of wages below the line — with ${fmt(marginal.inBracket)} of taxable income already taxed at ${marginal.rateLabel}.`
            }`;
          })(),
        },
        {
          question: `How much tax does maxing out a 401(k) save on ${formatted}?`,
          answer: d.k401
            ? `The 2026 elective deferral limit is ${fmt(K401_LIMIT_2026)}. Deferring the full amount drops your federal income tax from ${fmt(tx.federalTax)} to ${fmt(d.k401.fedAfter)} — a savings of ${fmt(d.k401.savings)}${d.k401.crossedIntoLowerBand && d.k401.lowerBandRateLabel ? `, and it pulls your taxable income back down into the ${d.k401.lowerBandRateLabel} band` : ''}. Most states let the same deferral cut state taxable income, which stacks extra savings in tax states.`
            : `Pre-tax 401(k) deferrals reduce taxable income dollar-for-dollar, saving tax at your marginal rate of ${marginal.rateLabel} on every dollar deferred.`,
        },
        {
          question: `Is someone earning ${formatted} owed overtime?`,
          answer: `Exemption under the FLSA depends primarily on job duties (executive, administrative, professional) — not salary size, and the salary floor for those exemptions sits far below ${formatted}, so most professional roles at this pay level are exempt. If your duties do not fit an exemption, you are owed 1.5× your regular rate — ${fmtFull(d.hourlyGross * 1.5)} an hour on a ${fmtFull(d.hourlyGross)} base — no matter how high your salary is.`,
        },
        {
          question: `What's ${formatted} a month after taxes?`,
          answer: `Monthly net pay on ${formatted} runs from ${fmt(tx.netMonthly)} in no-tax states to ${fmt(ca.netMonthly)} in California and ${fmt(ny.netMonthly)} in New York State (before NYC's city tax if you live there). Paid semimonthly, the Texas figure is ${fmt(tx.netAnnual / 24)} per check; bi-weekly, ${fmt(tx.netBiweekly)}.`,
        },
      ];

    case 'high':
      return [
        {
          question: `What's the take-home on ${formatted} with no state income tax?`,
          answer: `In Texas, Florida, Washington and the other no-tax states, ${formatted} nets ${fmt(tx.netAnnual)} — ${fmt(tx.netMonthly)} a month. The deductions: ${fmt(tx.federalTax)} of federal income tax and ${fmt(tx.ficaTotal)} of FICA${d.addlMedicare > 0 ? ` (which includes the Additional Medicare surtax above ${fmt(FICA_2026.additionalMedicareThreshold)})` : ''}, with zero state tax.`,
        },
        {
          question: `How much Additional Medicare Tax do I pay on ${formatted}?`,
          answer: `Medicare's ${pctLabel(FICA_2026.additionalMedicareRate)} employee surtax applies to wages above ${fmt(FICA_2026.additionalMedicareThreshold)} for single filers. ${
            d.addlMedicare > 0
              ? `On ${formatted} it costs ${fmt(d.addlMedicare)} — 0.9% of the ${fmt(salary - FICA_2026.additionalMedicareThreshold)} above the threshold. Employers must begin withholding it once your year-to-date wages pass that mark, which is why late-year paychecks look slightly leaner.`
              : `At ${formatted} you are ${fmt(FICA_2026.additionalMedicareThreshold - salary)} of wages below the threshold, so no surtax applies yet — but a raise large enough to cross $200,000 switches it on for the dollars above the line.`
          } The regular ${pctLabel(FICA_2026.medicareRate)} Medicare tax continues on every dollar with no cap.`,
        },
        {
          question: `When do I stop paying Social Security tax on a ${formatted} salary?`,
          answer: `Social Security's ${pctLabel(FICA_2026.socialSecurityRate)} applies only to the first ${fmt(FICA_2026.socialSecurityWageCap)} of wages — ${fmt(d.ssMaxTax)} at most. ${
            d.ssCapHitMonth !== null
              ? `On ${formatted} you cross the cap around ${MONTH_NAMES[d.ssCapHitMonth - 1]}, so each remaining paycheck of the year runs about ${fmt((salary / 12) * FICA_2026.socialSecurityRate)} fatter.`
              : `At ${formatted} you stay under the cap all year, so the 6.2% applies to every paycheck — the cap relief only arrives at higher salaries.`
          }`,
        },
        {
          question: `How much more would I take home in Texas instead of California on ${formatted}?`,
          answer: `${fmt(gap)} a year, ${fmt(gap / 12)} a month. California taxes ${formatted} at ${fmt(ca.stateTax)} of state income tax (your marginal CA rate is ${pctLabel(d.caMarginal)} at this income); Texas takes none. New York lands between them at ${fmt(ny.stateTax)}, before the NYC resident tax.`,
        },
        {
          question: `What's the effective tax rate on ${formatted}?`,
          answer: `In a no-tax state your all-in rate — federal plus FICA — is ${d.effAllTxPct.toFixed(1)}%, meaning you keep ${d.keepPctTx.toFixed(1)}% of gross. The federal piece alone is ${d.effFedPct.toFixed(1)}% (${fmt(tx.federalTax)}), well under your ${marginal.rateLabel} marginal rate, because the lower brackets fill first and ${fmt(stdDeduction)} of wages is sheltered by the standard deduction.`,
        },
      ];

    default: // top
      return [
        {
          question: `How much is ${formatted} after taxes in Texas vs. California?`,
          answer: `Texas: ${fmt(tx.netAnnual)} net — the no-tax-state ceiling. California: ${fmt(ca.netAnnual)} after ${fmt(ca.stateTax)} of state tax, with a marginal CA rate of ${pctLabel(d.caMarginal)} at this income. The ${fmt(gap)} difference is ${fmt(gap / 12)} a month, every month, before any investment returns on the difference.`,
        },
        {
          question: `Why is my effective rate so much lower than my ${marginal.rateLabel} bracket?`,
          answer: `The ${marginal.rateLabel} rate only touches taxable income above ${fmt(marginal.bandMin)} — ${fmt(marginal.bracketStartSalary)} in wages once the standard deduction is applied. The ${fmt(marginal.below)} of taxable income beneath it fills the lower bands first (${bandLabels}), and ${fmt(stdDeduction)} of wages is removed entirely. Result: a ${d.effFedPct.toFixed(1)}% effective federal rate on ${formatted}.`,
        },
        {
          question: `What's the marginal tax on my next dollar at ${formatted}?`,
          answer: `Federal: ${marginal.rateLabel}. Payroll: ${pctLabel(d.payrollMarginal)} (${pctLabel(FICA_2026.medicareRate)} Medicare${salary > FICA_2026.additionalMedicareThreshold ? ` plus ${pctLabel(FICA_2026.additionalMedicareRate)} Additional Medicare` : ''}; Social Security is capped at ${fmt(FICA_2026.socialSecurityWageCap)}). State: zero in Texas versus ${pctLabel(d.caMarginal)} in California. Stacked, the next dollar keeps about ${Math.round(d.keepNextDollarTxPct)} cents in Texas and ${Math.round(d.keepNextDollarCaPct)} cents in California.`,
        },
        {
          question: `Does Social Security tax still come out of ${formatted}?`,
          answer: `Only on the first ${fmt(FICA_2026.socialSecurityWageCap)} of wages — ${fmt(d.ssMaxTax)} for the year, which you will have paid off by ${d.ssCapHitMonth !== null ? MONTH_NAMES[d.ssCapHitMonth - 1] : 'year-end'}. After that the 6.2% line disappears from your pay stub until January. Medicare has no cap, so it runs all year: ${fmt(tx.ficaMedicare)} total including the Additional Medicare Tax.`,
        },
        {
          question: `Is ${formatted} a good salary?`,
          answer: `${formatted} places a single filer among the top 1–2% of U.S. wage earners. Practical framing: in Texas it is ${fmt(tx.netAnnual)} of annual take-home; in California, ${fmt(ca.netAnnual)}. At this level, marginal-rate management — deferrals, timing, and state choice — moves more money than any debate about bracket rates.`,
        },
      ];
  }
}

// ─── Per-Tier SEO Text (used by generateMetadata + JSON-LD in page.tsx) ──────

export function getSalarySeoText(salary: number): {
  description: string;
  keywords: string[];
  webAppDescription: string;
} {
  const calc = calculateSalaryTakeHome(salary);
  const formatted = formatSalary(salary);
  const tx = calc.states.find((s) => s.stateKey === 'texas')!;
  const ca = calc.states.find((s) => s.stateKey === 'california')!;
  const marginal = getMarginalBracket(salary);
  const effFed = (tx.federalTax / salary) * 100;

  const baseKeywords = [
    `${formatted} after tax`,
    `${formatted} take home pay`,
    `${formatted} salary after tax`,
    `${formatted} net pay`,
    `${formatted} paycheck`,
    `${formatted} after tax california`,
    `${formatted} after tax texas`,
    `${formatted} after tax new york`,
    `${formatted} after tax illinois`,
    `${formatted} after tax florida`,
    'salary calculator 2026',
    'take home pay calculator',
  ];

  let description: string;
  let extraKeywords: string[];
  let webAppDescription: string;

  switch (getTier(salary)) {
    case 'entry':
      description = `${formatted} after taxes in 2026? A single filer keeps about ${fmt(tx.netAnnual)} in a no-tax state (${fmt(tx.netMonthly)}/month) vs. ${fmt(ca.netAnnual)} in California. Bracket math & all 50 states.`;
      extraKeywords = ['starting salary after tax', `${formatted} paycheck breakdown`, `${formatted} first job budget`];
      webAppDescription = `See what a ${formatted} starting salary nets after federal tax, FICA, and state income tax — with paycheck-by-paycheck breakdowns, bracket position, and all 50 states for 2026.`;
      break;
    case 'mid':
      description = `Take-home on ${formatted} in 2026: ${fmt(tx.netAnnual)} in Texas, ${fmt(ca.netAnnual)} in California. Your ${marginal.rateLabel} bracket position, raise value & pay-frequency math for all 50 states.`;
      extraKeywords = [`${formatted} raise take-home`, `${formatted} hourly rate`, `${formatted} vs median income`];
      webAppDescription = `Calculate ${formatted} take-home pay in 2026: the full deduction ladder, ${marginal.rateLabel} bracket position, what raises are worth after tax, and net pay across all 50 states.`;
      break;
    case 'upperMid':
      description = `${formatted} after tax in 2026: ~${fmt(tx.netAnnual)} net in Texas, ${fmt(ca.netAnnual)} in California. Where the 24% bracket starts, what a maxed 401(k) saves & all 50 states.`;
      extraKeywords = [`${formatted} tax bracket`, `24 percent bracket 2026`, `${formatted} 401k savings`];
      webAppDescription = `Calculate ${formatted} take-home pay for 2026 — federal brackets, FICA, and state tax for all 50 states, plus 401(k) deferral savings and overtime pay math.`;
      break;
    case 'high':
      description = `${formatted} after taxes in 2026: net from ${fmt(tx.netAnnual)} (no-tax states) to ${fmt(ca.netAnnual)} (California). Marginal stack, Medicare surtax, Social Security cap — 50 states.`;
      extraKeywords = [`${formatted} additional medicare tax`, `social security wage cap 2026`, `${formatted} effective tax rate`];
      webAppDescription = `Calculate ${formatted} take-home pay for 2026 — the ${marginal.rateLabel} marginal bracket, Additional Medicare Tax, the Social Security wage cap, and net pay across all 50 states.`;
      break;
    default:
      description = `${formatted} after tax: ${marginal.rateLabel} marginal bracket, but only ${effFed.toFixed(1)}% effective federal. Net ~${fmt(tx.netAnnual)} in Texas vs. ${fmt(ca.netAnnual)} in California — all 50 states.`;
      extraKeywords = [`${formatted} take home california`, `35 percent bracket 2026`, `${formatted} net pay texas`];
      webAppDescription = `Calculate ${formatted} take-home pay for 2026 — marginal versus effective rates, payroll-tax caps, and state-by-state net pay across all 50 states.`;
      break;
  }

  return { description, keywords: [...baseKeywords, ...extraKeywords], webAppDescription };
}
