/**
 * Server-rendered SEO content for the /hourly/{rate}-an-hour pages
 * ("$X an hour is how much a year?").
 *
 * Anti-templating design (mirrors salary-ssr-content.tsx): the 26 rate
 * pages split into FOUR content tiers — entry (10–14), core (15–19),
 * standard (20–29), professional (30+) — each with its own article angle,
 * section headings, FAQ set, and voice:
 *
 *   entry        — budget reality, part-time schedules, students / second income
 *   core         — above federal minimum wage, overtime value, gig vs. payroll
 *   standard     — salaried-equivalent framing, the $1/hr raise rule, rent-to-income
 *   professional — careers, 401(k) match framing, exempt status, high-COL metros
 *
 * Accuracy rule: every dollar figure rendered comes from calculateSalaryTakeHome
 * (the site's real 2026 engine) or from the hourly-calculations.ts helpers at
 * render time. The only typed constants are the arithmetic factors (2,080-hour
 * work year, 8-hour day, 20-hour part-time week, 1.5× OT, 2× double time),
 * the 30% rent guideline, and the $7.25 federal minimum wage.
 *
 * Site rule: the take-home comparison table renders EXACTLY five states
 * (Texas, Florida, Illinois, California, New York) — never a 50-state loop
 * (a past 50-state-per-card layout triggered Cloudflare Error 1102).
 */

import Link from 'next/link';
import {
  SALARY_AMOUNTS,
  calculateSalaryTakeHome,
  formatSalary,
  fmt,
  fmtFull,
  salaryToSlug,
  type StateTakeHome,
} from '@/lib/salary-calculations';
import {
  FEDERAL_MINIMUM_WAGE,
  HOURS_PER_YEAR_FULL_TIME,
  HOURLY_RATES,
  PART_TIME_HOURS_PER_WEEK,
  STANDARD_HOURS_PER_WEEK,
  doubleTimeRate,
  formatRate,
  getRateTier,
  overtimeRate,
  rateToAnnual,
  rateToBiweekly,
  rateToDaily,
  rateToMonthly,
  rateToPartTimeAnnual,
  rateToSemimonthly,
  rateToSlug,
  rateToWeekly,
  type RateTier,
} from '@/lib/hourly-calculations';

const RENT_GUIDELINE = 0.3; // 30% of net income — the standard affordability guideline

// ─── Page Data Builder ───────────────────────────────────────────────────────

/** The exact 5-state comparison set (order matches salary/page.tsx). */
const COMPARISON_STATE_KEYS = ['texas', 'florida', 'illinois', 'california', 'newyork'] as const;

interface HourlyPageData {
  rate: number;
  rateLabel: string; // "$25" / "$22.50"
  tier: RateTier;
  annual: number; // full-time annual gross (rate × 40 × 52)
  monthly: number;
  semimonthly: number;
  biweekly: number;
  weekly: number;
  daily: number;
  partTimeAnnual: number; // rate × 20 × 52
  partTimeCalc: ReturnType<typeof calculateSalaryTakeHome>;
  otRate: number; // × 1.5
  otAnnual: number; // a full 2,080-hour year paid at time-and-a-half
  dtRate: number; // × 2
  dtAnnual: number;
  calc: ReturnType<typeof calculateSalaryTakeHome>; // full-time, single filer
  tx: StateTakeHome;
  ca: StateTakeHome;
  ny: StateTakeHome;
  fl: StateTakeHome;
  il: StateTakeHome;
  comparisonStates: StateTakeHome[]; // exactly 5 — never more
  nycDelta: number; // extra city tax a NYC resident pays on this annual gross
  minWageAnnual: number; // $7.25 × 2,080, computed
  raiseNetTx: number; // net value of a $1/hr raise (2,080 gross) in Texas
  raiseNetCa: number;
  salaryLinkHref: string;
  salaryLinkLabel: string;
}

function buildHourlyPageData(rate: number): HourlyPageData {
  const annual = rateToAnnual(rate);
  const annualRounded = Math.round(annual);
  const calc = calculateSalaryTakeHome(annualRounded, 'single');
  const st = (key: string) => calc.states.find((s) => s.stateKey === key)!;

  const partTimeAnnual = rateToPartTimeAnnual(rate);
  const partTimeCalc = calculateSalaryTakeHome(Math.round(partTimeAnnual), 'single');

  const nycCalc = calculateSalaryTakeHome(annualRounded, 'single', true);
  const nyWithNyc = nycCalc.states.find((s) => s.stateKey === 'newyork')!;

  // Net value of a $1-an-hour raise ($1 × 2,080 gross) — engine diff.
  const raiseCalc = calculateSalaryTakeHome(annualRounded + HOURS_PER_YEAR_FULL_TIME, 'single');
  const raiseTx = raiseCalc.states.find((s) => s.stateKey === 'texas')!;
  const raiseCa = raiseCalc.states.find((s) => s.stateKey === 'california')!;

  const salaryMatchAmount = annualRounded;
  const salaryMatch = (SALARY_AMOUNTS as readonly number[]).includes(salaryMatchAmount);

  return {
    rate,
    rateLabel: formatRate(rate),
    tier: getRateTier(rate),
    annual,
    monthly: rateToMonthly(rate),
    semimonthly: rateToSemimonthly(rate),
    biweekly: rateToBiweekly(rate),
    weekly: rateToWeekly(rate),
    daily: rateToDaily(rate),
    partTimeAnnual,
    partTimeCalc,
    otRate: overtimeRate(rate),
    otAnnual: overtimeRate(rate) * HOURS_PER_YEAR_FULL_TIME,
    dtRate: doubleTimeRate(rate),
    dtAnnual: doubleTimeRate(rate) * HOURS_PER_YEAR_FULL_TIME,
    calc,
    tx: st('texas'),
    ca: st('california'),
    ny: st('newyork'),
    fl: st('florida'),
    il: st('illinois'),
    comparisonStates: COMPARISON_STATE_KEYS.map(
      (key) => calc.states.find((s) => s.stateKey === key)!
    ),
    nycDelta: st('newyork').netAnnual - nyWithNyc.netAnnual,
    minWageAnnual: FEDERAL_MINIMUM_WAGE * HOURS_PER_YEAR_FULL_TIME,
    raiseNetTx: raiseTx.netAnnual - st('texas').netAnnual,
    raiseNetCa: raiseCa.netAnnual - st('california').netAnnual,
    salaryLinkHref: salaryMatch ? `/salary/${salaryToSlug(salaryMatchAmount)}` : '/salary',
    salaryLinkLabel: salaryMatch
      ? `see the full ${formatSalary(salaryMatchAmount)} breakdown`
      : 'browse every salary level ($30K–$500K)',
  };
}

// ─── Hero Quick Answer (rendered above the client widget) ───────────────────

export function RateHero({ rate }: { rate: number }) {
  const d = buildHourlyPageData(rate);
  const headings: Record<RateTier, string> = {
    entry: 'The short answer',
    core: 'Quick math',
    standard: 'The headline number',
    professional: 'Bottom line',
  };

  const stats: { label: string; value: string; sub: string }[] = [
    { label: 'Monthly', value: fmt(d.monthly), sub: `${STANDARD_HOURS_PER_WEEK} h/wk, gross` },
    { label: 'Bi-weekly', value: fmt(d.biweekly), sub: 'per paycheck, gross' },
    { label: 'Weekly', value: fmt(d.weekly), sub: 'gross, before tax' },
    { label: 'Daily', value: fmt(d.daily), sub: '8-hour workday, gross' },
  ];

  return (
    <section className="rounded-xl border border-emerald-500/30 bg-emerald-600/5 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-foreground mb-3">{headings[d.tier]}</h2>
      <p className="text-muted-foreground leading-relaxed">
        Working <strong className="text-foreground">full-time</strong> — {STANDARD_HOURS_PER_WEEK} hours a week,
        52 weeks a year — at {d.rateLabel} an hour, you earn:
      </p>
      <p className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {fmt(d.annual)}
        <span className="ml-2 text-xl font-semibold text-muted-foreground sm:text-2xl">a year</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        That&apos;s {fmtFull(d.rate)} per hour × {HOURS_PER_YEAR_FULL_TIME.toLocaleString('en-US')} paid hours
        (52 weeks × {STANDARD_HOURS_PER_WEEK} hours), before any taxes.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/30 bg-card/50 p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-foreground">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        After 2026 federal income tax and FICA, a single filer keeps about{' '}
        <strong className="text-foreground">{fmt(d.tx.netAnnual)}</strong> of that in Texas (no state income
        tax) versus <strong className="text-foreground">{fmt(d.ca.netAnnual)}</strong> in California — the
        five-state take-home comparison is below.
      </p>
    </section>
  );
}

// ─── Main SSR Content (below the client widget + chart) ─────────────────────

export function RateSSRContent({ rate }: { rate: number }) {
  const d = buildHourlyPageData(rate);
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      <ConversionTableSection d={d} />
      <StateTakeHomeSection d={d} />
      <TierArticleSection d={d} />
      <FaqSection d={d} />
      <ExploreRatesSection d={d} />
    </div>
  );
}

// ─── (b) Pay Conversion Table ────────────────────────────────────────────────

function ConversionTableSection({ d }: { d: HourlyPageData }) {
  const rows: { scenario: string; perHour: string; annual: string; monthly: string; weekly: string }[] = [
    {
      scenario: `Full-time (${STANDARD_HOURS_PER_WEEK} h/week)`,
      perHour: fmtFull(d.rate),
      annual: fmt(d.annual),
      monthly: fmt(d.monthly),
      weekly: fmt(d.weekly),
    },
    {
      scenario: 'Time-and-a-half OT',
      perHour: fmtFull(d.otRate),
      annual: fmt(d.otAnnual),
      monthly: fmt(d.otAnnual / 12),
      weekly: fmt(d.otRate * STANDARD_HOURS_PER_WEEK),
    },
    {
      scenario: `Part-time (${PART_TIME_HOURS_PER_WEEK} h/week)`,
      perHour: fmtFull(d.rate),
      annual: fmt(d.partTimeAnnual),
      monthly: fmt(d.partTimeAnnual / 12),
      weekly: fmt(d.rate * PART_TIME_HOURS_PER_WEEK),
    },
    {
      scenario: 'Double-time (2×)',
      perHour: fmtFull(d.dtRate),
      annual: fmt(d.dtAnnual),
      monthly: fmt(d.dtAnnual / 12),
      weekly: fmt(d.dtRate * STANDARD_HOURS_PER_WEEK),
    },
  ];
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        {d.rateLabel} an Hour, Converted Across Work Schedules
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The same hourly rate means very different annual pay depending on the schedule. Every figure below
        is computed from {fmtFull(d.rate)} an hour — annual = per-hour rate ×{' '}
        {HOURS_PER_YEAR_FULL_TIME.toLocaleString('en-US')} hours:
      </p>
      <div className="overflow-x-auto rounded-xl border border-border/30">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Scenario</th>
              <th className="text-right p-3 font-semibold text-foreground">Per hour</th>
              <th className="text-right p-3 font-semibold text-foreground">Annual</th>
              <th className="text-right p-3 font-semibold text-foreground">Monthly</th>
              <th className="text-right p-3 font-semibold text-foreground">Weekly</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.scenario} className="border-t border-border/20">
                <td className="p-3 font-medium text-foreground">{r.scenario}</td>
                <td className="p-3 text-right text-muted-foreground">{r.perHour}</td>
                <td className="p-3 text-right font-medium text-foreground">{r.annual}</td>
                <td className="p-3 text-right text-muted-foreground">{r.monthly}</td>
                <td className="p-3 text-right text-muted-foreground">{r.weekly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The overtime and double-time rows show a full schedule paid at that rate — in practice the 1.5×
        rate applies only to hours beyond {STANDARD_HOURS_PER_WEEK} a week (most states) and 2× to premium
        hours defined by your contract or state law.
      </p>
    </section>
  );
}

// ─── (c) Five-State Take-Home Table — EXACTLY 5 states, never more ──────────

function StateTakeHomeSection({ d }: { d: HourlyPageData }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Estimated Monthly Take-Home by State
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {d.rateLabel} an hour is {fmt(d.annual)} of gross wages a year. After 2026 federal income tax,
        FICA, and state income tax, here is what actually lands in the bank — single filer, 2026 federal +
        state + FICA:
      </p>
      <div className="overflow-x-auto rounded-xl border border-border/30">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">State</th>
              <th className="text-right p-3 font-semibold text-foreground">Monthly take-home</th>
              <th className="text-right p-3 font-semibold text-foreground">Annual take-home</th>
              <th className="text-right p-3 font-semibold text-foreground">Effective tax rate</th>
            </tr>
          </thead>
          <tbody>
            {d.comparisonStates.map((s) => (
              <tr key={s.stateKey} className="border-t border-border/20">
                <td className="p-3 font-medium text-foreground">
                  {s.stateName} <span className="text-xs text-muted-foreground">({s.stateAbbr})</span>
                </td>
                <td className="p-3 text-right font-medium text-foreground">{fmt(s.netMonthly)}</td>
                <td className="p-3 text-right text-muted-foreground">{fmt(s.netAnnual)}</td>
                <td className="p-3 text-right text-muted-foreground">{(s.effectiveTaxRate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Baseline: single filing status, standard deduction, no pre-tax deductions or credits. The New York
        figures exclude the NYC resident income tax — city residents take home {fmt(d.nycDelta)} less.
      </p>
    </section>
  );
}

// ─── (d) Tier Article — four genuinely different article approaches ──────────

function TierArticleSection({ d }: { d: HourlyPageData }) {
  switch (d.tier) {
    case 'entry':
      return <EntryArticle d={d} />;
    case 'core':
      return <CoreArticle d={d} />;
    case 'standard':
      return <StandardArticle d={d} />;
    default:
      return <ProfessionalArticle d={d} />;
  }
}

function EntryArticle({ d }: { d: HourlyPageData }) {
  const { rateLabel, tx, ca } = d;
  const rentBudget = tx.netMonthly * RENT_GUIDELINE;
  const partTimeTx = d.partTimeCalc.states.find((s) => s.stateKey === 'texas')!;
  const partTimeFedRate = (partTimeTx.federalTax / Math.round(d.partTimeAnnual)) * 100;
  const minWageRatio = d.rate / FEDERAL_MINIMUM_WAGE;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Living on {rateLabel} an Hour: The Honest Budget Math
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          First, the context. The federal minimum wage has been stuck at{' '}
          {fmtFull(FEDERAL_MINIMUM_WAGE)} an hour since 2009, so {rateLabel} an hour pays{' '}
          <strong className="text-foreground">{minWageRatio.toFixed(1)}×</strong> that floor — roughly{' '}
          {fmt(d.annual - d.minWageAnnual)} more per full-time year than a minimum-wage paycheck (
          {fmt(d.minWageAnnual)} at 2,080 hours). This is common territory for first jobs, retail and
          food-service work, and campus jobs, which is why the budget below matters more than the gross.
        </p>
        <p>
          A single filer in Texas clears about <strong className="text-foreground">{fmt(tx.netAnnual)}</strong>{' '}
          a year — {fmt(tx.netMonthly)} a month — after 2026 federal tax and FICA. Using the 30% rent
          guideline, that supports a rent of roughly {fmt(rentBudget)} a month, leaving{' '}
          {fmt(tx.netMonthly - rentBudget)} for food, transport, a phone, and everything else. Workable
          with roommates; a solo apartment is a stretch in most metros. In California the same rate nets{' '}
          {fmt(ca.netAnnual)} ({fmt(ca.netMonthly)} a month), so the state you work in shifts the rent
          ceiling by {fmt(tx.netMonthly - ca.netMonthly)} a month.
        </p>
        <p>
          Part-time changes the math in a helpful way. At {PART_TIME_HOURS_PER_WEEK} hours a week — the
          classic student schedule — {rateLabel} an hour pays {fmt(d.partTimeAnnual)} a year, and the tax
          bite shrinks with it: the effective federal rate on that income is only about{' '}
          {partTimeFedRate.toFixed(1)}% here. A part-time semester job or a second household income at
          this rate is one of the most tax-efficient ways to earn, because so little of it is federally
          taxed at the start.
        </p>
        <p>
          Two levers are worth more than they look. Overtime, if your role is non-exempt, pays{' '}
          {fmtFull(d.otRate)} an hour — 1.5× the base rate — after 40 weekly hours. And every extra $1 an
          hour you negotiate is worth $2,080 of gross pay a year ({fmt(HOURS_PER_YEAR_FULL_TIME)} hours ×
          $1), which lands as about {fmt(d.raiseNetTx)} of take-home in Texas after tax. Small rate bumps
          compound quickly at this level.
        </p>
      </div>
    </section>
  );
}

function CoreArticle({ d }: { d: HourlyPageData }) {
  const { rateLabel, tx, ca } = d;
  const otWeeklyGross = d.otRate * 5 * 52; // 5 OT hours/week, all year
  const ficaShare = tx.ficaTotal / Math.round(d.annual);
  const gigBreakEvenRate = d.rate * (1 + ficaShare);
  const minWageRatio = d.rate / FEDERAL_MINIMUM_WAGE;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        {rateLabel} an Hour: Overtime, Minimum Wage, and Payroll Math
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          {rateLabel} an hour is solidly above the federal floor: {minWageRatio.toFixed(1)}× the{' '}
          {fmtFull(FEDERAL_MINIMUM_WAGE)} minimum wage, worth {fmt(d.annual - d.minWageAnnual)} more per
          year ({fmt(d.annual)} vs. {fmt(d.minWageAnnual)} full-time). That gap is why this rate band shows
          up in warehouse, logistics, call-center, and entry healthcare roles — and why the details below,
          not the sticker rate, decide what you actually bank.
        </p>
        <p>
          Overtime is the biggest lever. Past 40 hours in a week, the FLSA requires 1.5× your rate —{' '}
          <strong className="text-foreground">{fmtFull(d.otRate)} an hour</strong> here (California uses a
          daily 8-hour trigger, so it can kick in even sooner). Five OT hours a week for a full year adds{' '}
          {fmt(otWeeklyGross)} of gross pay, pushing a {fmt(d.annual)} year to{' '}
          {fmt(d.annual + otWeeklyGross)}. That is taxed at your marginal rates, but it is the fastest
          legal way to grow a paycheck at this level.
        </p>
        <p>
          The gig-vs-payroll trap is the other side of the coin. On a W-2 payroll your employer covers half
          of Social Security and Medicare — your share is {fmt(tx.ficaTotal)} a year,{' '}
          {(ficaShare * 100).toFixed(1)}% of gross. A 1099 contractor covers both halves, gets no overtime
          protection, and buys their own benefits, so a gig posting {rateLabel} an hour is really paying
          less. To merely break even on payroll tax, a contractor needs to bill about{' '}
          {fmtFull(gigBreakEvenRate)} an hour — and realistically more once benefits are priced in.
        </p>
        <p>
          Geography still moves the needle: {fmt(tx.netAnnual)} net in Texas against {fmt(ca.netAnnual)}{' '}
          in California, a {fmt(tx.netAnnual - ca.netAnnual)} gap on identical work. Part-time at this
          rate — {fmt(d.partTimeAnnual)} a year at {PART_TIME_HOURS_PER_WEEK} hours a week — is also the
          natural school-hours or side-gig schedule, and the take-home table above shows both full-time
          states side by side.
        </p>
      </div>
    </section>
  );
}

function StandardArticle({ d }: { d: HourlyPageData }) {
  const { rateLabel, tx, ca } = d;
  const rentBudget = tx.netMonthly * RENT_GUIDELINE;
  const fiftyCentGross = 0.5 * HOURS_PER_YEAR_FULL_TIME;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        The Salary Equivalent: Negotiating {rateLabel} an Hour
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          At this level the right mental model is a salary, not a rate. {rateLabel} an hour is{' '}
          <strong className="text-foreground">{fmt(d.annual)} a year</strong> on a 2,080-hour schedule —
          the same number a job ad quotes as {formatSalary(Math.round(d.annual))}. Paid monthly that is{' '}
          {fmt(d.monthly)}; semimonthly, {fmt(d.semimonthly)} per check; weekly, {fmt(d.weekly)}. Many
          employers convert hourly roles at exactly this band into salaried ones, so knowing both
          directions of the conversion protects you in negotiations either way.
        </p>
        <p>
          The single most useful negotiation rule: <strong className="text-foreground">every $1 an hour
          equals $2,080 a year</strong> — $1 × 2,080 hours. A $2-an-hour move is {fmt(2 * HOURS_PER_YEAR_FULL_TIME)} of
          gross. What matters more is what survives tax: on this page&apos;s numbers, a $1 raise is worth{' '}
          {fmt(d.raiseNetTx)} of added take-home in Texas and {fmt(d.raiseNetCa)} in California per year.
          When a recruiter offers a 50-cent bump, halve the rule: {fmt(fiftyCentGross)} of gross a year,
          about {fmt(d.raiseNetTx / 2)} of added take-home in Texas.
        </p>
        <p>
          Rent-to-income is the discipline that makes the rate livable. A single filer in Texas nets{' '}
          {fmt(tx.netMonthly)} a month; the 30% guideline caps rent near {fmt(rentBudget)}. In California
          the net is {fmt(ca.netMonthly)} a month, so the same guideline leaves about{' '}
          {fmt(tx.netMonthly - ca.netMonthly)} less for housing — the practical reason identical paychecks
          feel so different across state lines. The annual spread between those two states is{' '}
          {fmt(tx.netAnnual - ca.netAnnual)}, or {fmt((tx.netAnnual - ca.netAnnual) / 12)} a month.
        </p>
        <p>
          One classification note: exempt status depends on job duties, not the size of your paycheck — so
          an hourly worker at this rate is very likely still owed overtime at {fmtFull(d.otRate)} an hour,
          while a &quot;salaried&quot; title alone does not remove the obligation. Double-time clauses in
          some contracts pay {fmtFull(d.dtRate)} for premium hours. If you do move to a salaried offer,
          divide by 2,080 to check the implied rate before signing.
        </p>
      </div>
    </section>
  );
}

function ProfessionalArticle({ d }: { d: HourlyPageData }) {
  const { rateLabel, tx, ca, ny, fl } = d;
  const otWeeklyGross = d.otRate * 5 * 52; // 5 OT hours/week, all year
  const effFed = (tx.federalTax / Math.round(d.annual)) * 100;
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Professional Territory: Careers, Retirement, and Exempt Status at {rateLabel} an Hour
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          {fmtFull(d.rate)} an hour is {fmt(d.annual)} a year — professional and skilled-trades territory:
          experienced electricians and machinists, travel nurses, senior technicians, journeyman
          specialists, and consultants often bill in exactly this band. The annualized framing matters
          here too: a role posted as {formatSalary(Math.round(d.annual))} with benefits is the same base
          pay as this hourly rate, so compare offers on annual gross and benefits, never on the hourly
          sticker alone.
        </p>
        <p>
          The 401(k) is where this pay level compounds. Your effective federal rate on this income is only{' '}
          {effFed.toFixed(1)}% ({fmt(tx.federalTax)}), so pre-tax deferrals shelter real money, and an
          employer match is additional pay on top of the {fmt(d.annual)} you already earn — every matched
          dollar is an immediate, guaranteed doubling of that portion. Workers at this rate who capture a
          full match are, in effect, being paid meaningfully more than the rate on the check.
        </p>
        <p>
          Watch exempt status, because it decides overtime. The FLSA test is about job duties, not pay
          size — but at this level many roles flip to salaried-exempt, and some employers classify
          borderline roles loosely. If your duties do not fit an exemption, {rateLabel} an hour is owed at{' '}
          {fmtFull(d.otRate)} past 40 weekly hours — five such hours a week is {fmt(otWeeklyGross)} of
          additional annual gross — and contract double-time clauses can pay {fmtFull(d.dtRate)} for
          premium hours. Misclassification complaints are free to file and back-pay is recoverable.
        </p>
        <p>
          Finally, geography. A single filer nets {fmt(tx.netAnnual)} in Texas and {fmt(fl.netAnnual)} in
          Florida — both zero-income-tax states — against {fmt(ca.netAnnual)} in California and{' '}
          {fmt(ny.netAnnual)} in New York State. New York City adds its own resident income tax, worth{' '}
          {fmt(d.nycDelta)} a year on this income; combined with high-COL rents in San Francisco and
          Manhattan, the same rate supports very different lifestyles. Remote-work and contract
          arrangements at this level make the {fmt(tx.netAnnual - ca.netAnnual)} state-tax spread a
          first-order financial decision, not a rounding error.
        </p>
      </div>
    </section>
  );
}

// ─── (e) FAQ Section — mirrors the salary page's <details> accordion ────────

function FaqSection({ d }: { d: HourlyPageData }) {
  const headings: Record<RateTier, string> = {
    entry: `${d.rateLabel} an Hour — Questions First-Job Earners Ask`,
    core: `FAQ: ${d.rateLabel} an Hour, Overtime & Take-Home`,
    standard: `${d.rateLabel} an Hour: Salary-Equivalent Questions, Answered`,
    professional: `${d.rateLabel} an Hour — Professional-Pay FAQ`,
  };
  const faqs = generateRateFaqs(d.rate);
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

// ─── (f) Explore Sibling Rates + Tool Links ───────────────────────────────────

const TIER_ANCHORS: Record<RateTier, number[]> = {
  entry: [15, 25, 40],
  core: [15, 25, 40],
  standard: [25, 40, 50],
  professional: [40, 50],
};

/** Deterministic sibling selection: nearest neighbors + tier anchors, deduped, max 8. */
function getSiblingRates(rate: number): number[] {
  const others = (HOURLY_RATES as readonly number[]).filter((r) => r !== rate);
  others.sort((a, b) => Math.abs(a - rate) - Math.abs(b - rate) || a - b);
  const neighbors = others.slice(0, 6);
  const anchors = TIER_ANCHORS[getRateTier(rate)].filter((a) => a !== rate);
  const unique = Array.from(new Set([...neighbors, ...anchors]));
  return unique.sort((a, b) => a - b).slice(0, 8);
}

function ExploreRatesSection({ d }: { d: HourlyPageData }) {
  const siblings = getSiblingRates(d.rate);
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">Explore Other Hourly Rates</h2>
      <div className="rounded-xl border border-border/30 bg-card/50 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {siblings.map((r) => (
            <Link
              key={r}
              href={`/hourly/${rateToSlug(r)}`}
              className="inline-flex items-center rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium text-foreground hover:border-emerald-500/30 hover:text-emerald-600 transition-all"
            >
              {formatRate(r)} an hour
            </Link>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 border-t border-border/20 pt-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
          <Link
            href="/hourly-to-salary-calculator"
            className="text-muted-foreground hover:text-emerald-600"
          >
            Convert any rate interactively →
          </Link>
          <Link href="/paycheck-calculator" className="text-muted-foreground hover:text-emerald-600">
            Full paycheck calculator with deductions →
          </Link>
          <Link href={d.salaryLinkHref} className="text-muted-foreground hover:text-emerald-600">
            {d.salaryLinkLabel.charAt(0).toUpperCase() + d.salaryLinkLabel.slice(1)} →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Tier FAQ Generator (visible FAQ + FAQPage JSON-LD in page.tsx) ──────────

export function generateRateFaqs(rate: number): { question: string; answer: string }[] {
  const d = buildHourlyPageData(rate);
  const { rateLabel, tx, ca, ny } = d;
  const partTimeTx = d.partTimeCalc.states.find((s) => s.stateKey === 'texas')!;
  const minWageRatio = d.rate / FEDERAL_MINIMUM_WAGE;
  const rentBudget = tx.netMonthly * RENT_GUIDELINE;
  const otWeeklyGross = d.otRate * 5 * 52;
  const ficaShare = tx.ficaTotal / Math.round(d.annual);

  switch (d.tier) {
    case 'entry':
      return [
        {
          question: `Is ${rateLabel} an hour a livable wage in 2026?`,
          answer: `Depends on housing. Full-time at ${rateLabel} an hour is ${fmt(d.annual)} gross, about ${fmt(tx.netAnnual)} net in Texas — which supports roughly ${fmt(rentBudget)} of monthly rent under the 30% guideline. Solo apartments are tight in most metros, but with roommates it is a workable budget in low-cost states.`,
        },
        {
          question: `What jobs pay ${rateLabel} an hour?`,
          answer: `Typical roles at this rate include retail sales associates, fast-food and café crew, warehouse pickers, customer-service representatives, and campus or bank-teller positions. Availability varies by state — many set their own minimums above the federal ${fmtFull(FEDERAL_MINIMUM_WAGE)}, which lifts the whole local range.`,
        },
        {
          question: `How much is ${rateLabel} an hour part-time?`,
          answer: `At 20 hours a week (a standard student schedule), ${rateLabel} an hour pays ${fmt(d.partTimeAnnual)} a year — about ${fmt(d.partTimeAnnual / 12)} a month gross. After 2026 taxes a Texas single filer keeps roughly ${fmt(partTimeTx.netAnnual)} of it.`,
        },
        {
          question: `How much is ${rateLabel} an hour after taxes?`,
          answer: `A single filer earning ${fmt(d.annual)} nets about ${fmt(tx.netAnnual)} in Texas (no state income tax) versus ${fmt(ca.netAnnual)} in California after state tax — a ${fmt(tx.netAnnual - ca.netAnnual)} annual spread. These are 2026 federal + FICA + state baseline figures with the standard deduction.`,
        },
        {
          question: `How much more is ${rateLabel} an hour than minimum wage?`,
          answer: `${minWageRatio.toFixed(1)}× the federal minimum: ${rateLabel} versus ${fmtFull(FEDERAL_MINIMUM_WAGE)}. Over a 2,080-hour year that difference is worth ${fmt(d.annual - d.minWageAnnual)} — ${fmt(d.annual)} instead of ${fmt(d.minWageAnnual)}.`,
        },
        {
          question: `Can I build savings on ${rateLabel} an hour?`,
          answer: `Slowly, and with the right levers. Non-exempt overtime pays ${fmtFull(d.otRate)} an hour (1.5×), and each additional $1 an hour negotiated is worth $2,080 of gross pay a year — about ${fmt(d.raiseNetTx)} net in Texas. Automating a small fixed transfer on payday matters more than the amount at this level.`,
        },
      ];

    case 'core':
      return [
        {
          question: `${rateLabel} an hour is how much a year working full-time?`,
          answer: `At 40 hours a week, 52 weeks a year (2,080 hours), ${rateLabel} an hour is ${fmt(d.annual)} gross — ${fmt(d.monthly)} a month, ${fmt(d.biweekly)} bi-weekly, and ${fmt(d.weekly)} a week before taxes.`,
        },
        {
          question: `What is time-and-a-half for ${rateLabel} an hour?`,
          answer: `${fmtFull(d.otRate)} an hour — 1.5 × ${fmtFull(d.rate)}. Five overtime hours a week for a full year adds ${fmt(otWeeklyGross)} of gross pay on top of the ${fmt(d.annual)} base. California's daily trigger can start overtime after an 8-hour day.`,
        },
        {
          question: `How much is ${rateLabel} an hour after taxes?`,
          answer: `On ${fmt(d.annual)} of wages, a single filer nets about ${fmt(tx.netAnnual)} in Texas and ${fmt(ca.netAnnual)} in California — a ${fmt(tx.netAnnual - ca.netAnnual)} difference in state income tax. Monthly that is ${fmt(tx.netMonthly)} versus ${fmt(ca.netMonthly)}.`,
        },
        {
          question: `Is ${rateLabel} an hour more than minimum wage?`,
          answer: `Yes — ${minWageRatio.toFixed(1)}× the federal ${fmtFull(FEDERAL_MINIMUM_WAGE)} minimum, worth ${fmt(d.annual - d.minWageAnnual)} more per 2,080-hour year (${fmt(d.annual)} versus ${fmt(d.minWageAnnual)}). Some states and cities set higher local minimums, so the real margin varies by location.`,
        },
        {
          question: `${rateLabel} an hour on 1099 vs. W-2 — what's the difference?`,
          answer: `A W-2 employer pays half your Social Security and Medicare (your share is ${fmt(tx.ficaTotal)} a year, ${(ficaShare * 100).toFixed(1)}% of gross); a 1099 contractor pays both halves, with no overtime protection or benefits. To just cover the payroll-tax difference, a gig needs about ${fmtFull(d.rate * (1 + ficaShare))} an hour.`,
        },
        {
          question: `How much is ${rateLabel} an hour part-time a year?`,
          answer: `At 20 hours a week, ${rateLabel} an hour makes ${fmt(d.partTimeAnnual)} a year — ${fmt(d.partTimeAnnual / 12)} a month gross. That schedule is the standard school-hours or side-income arrangement, and the lower income usually carries a lower effective federal rate.`,
        },
      ];

    case 'standard':
      return [
        {
          question: `What salary is ${rateLabel} an hour equal to?`,
          answer: `${fmt(d.annual)} a year on the standard 2,080-hour schedule (40 hours × 52 weeks). Paid monthly that is ${fmt(d.monthly)}; semimonthly ${fmt(d.semimonthly)} per check; weekly ${fmt(d.weekly)}. A job ad quoting ${formatSalary(Math.round(d.annual))} a year is describing this exact rate.`,
        },
        {
          question: `How much is ${rateLabel} an hour after taxes?`,
          answer: `For a single filer on ${fmt(d.annual)}, take-home runs about ${fmt(tx.netAnnual)} in Texas, ${fmt(ca.netAnnual)} in California, and ${fmt(ny.netAnnual)} in New York State (before the NYC resident tax). The Texas–California gap alone is ${fmt(tx.netAnnual - ca.netAnnual)} a year.`,
        },
        {
          question: `What is a $1 an hour raise worth per year?`,
          answer: `$1 an hour × 2,080 hours = $2,080 of gross pay a year. After 2026 taxes it adds roughly ${fmt(d.raiseNetTx)} of take-home in Texas and ${fmt(d.raiseNetCa)} in California — the net number is what actually changes your budget, so use it when you evaluate a raise offer.`,
        },
        {
          question: `How much rent can I afford on ${rateLabel} an hour?`,
          answer: `The 30% guideline on Texas take-home of ${fmt(tx.netMonthly)} a month caps rent near ${fmt(rentBudget)}. In California, take-home of ${fmt(ca.netMonthly)} trims that by about ${fmt(tx.netMonthly - ca.netMonthly)} a month — the same rate buys noticeably less housing in high-tax, high-rent states.`,
        },
        {
          question: `${rateLabel} an hour full-time vs. part-time — what's the difference?`,
          answer: `Full-time (40 h/week) pays ${fmt(d.annual)} a year; part-time (20 h/week) pays ${fmt(d.partTimeAnnual)} — a ${fmt(d.annual - d.partTimeAnnual)} difference in gross. Two part-time roles can match one full-time schedule, but watch benefits and overtime eligibility, which usually attach only to the full-time role.`,
        },
        {
          question: `Am I owed overtime at ${rateLabel} an hour?`,
          answer: `Very likely yes — FLSA exemptions depend on job duties, not pay size. Non-exempt workers are owed ${fmtFull(d.otRate)} an hour (1.5×) past 40 hours a week, and some contracts pay ${fmtFull(d.dtRate)} (2×) for Sundays or holidays. Check duties, not the rate, to confirm.`,
        },
      ];

    default: // professional
      return [
        {
          question: `How much is ${rateLabel} an hour a year?`,
          answer: `${fmt(d.annual)} a year before taxes at 40 hours a week (2,080 hours) — ${fmt(d.monthly)} a month gross. That is squarely professional or skilled-trades pay, comparable to a ${formatSalary(Math.round(d.annual))} salaried offer with benefits.`,
        },
        {
          question: `A $1 raise at ${rateLabel} an hour adds how much per year?`,
          answer: `$2,080 of gross pay ($1 × 2,080 hours) — worth about ${fmt(d.raiseNetTx)} of additional take-home a year in Texas and ${fmt(d.raiseNetCa)} in California after 2026 taxes. A $3 raise is triple that: ${fmt(3 * HOURS_PER_YEAR_FULL_TIME)} gross.`,
        },
        {
          question: `How much is ${rateLabel} an hour after taxes?`,
          answer: `On ${fmt(d.annual)} of wages a single filer nets about ${fmt(tx.netAnnual)} in Texas, ${fmt(ca.netAnnual)} in California, and ${fmt(ny.netAnnual)} in New York State. New York City residents owe city income tax on top, which reduces that figure by about ${fmt(d.nycDelta)} a year.`,
        },
        {
          question: `Do I get overtime at ${rateLabel} an hour?`,
          answer: `Only if your duties do not fit an FLSA exemption — the test is about the work, not the rate. If non-exempt, hours past 40 a week are owed at ${fmtFull(d.otRate)} (1.5×), and contract double-time clauses can pay ${fmtFull(d.dtRate)}. Many genuinely professional roles are exempt at this level, so confirm duties before counting on OT income.`,
        },
        {
          question: `How does a 401(k) match work at this pay level?`,
          answer: `Your employer match is additional compensation on top of the ${fmt(d.annual)} you earn — every matched dollar is an immediate 100% return on that portion of your deferral. Pre-tax contributions also lower taxable income at your effective federal rate of ${((tx.federalTax / Math.round(d.annual)) * 100).toFixed(1)}%, so capturing the full match is the highest-certainty financial move at this income.`,
        },
        {
          question: `Is ${rateLabel} an hour enough for New York or San Francisco?`,
          answer: `The state-level net is ${fmt(ny.netAnnual)} in New York and ${fmt(ca.netAnnual)} in California, but metro costs matter more: NYC adds its resident income tax (about ${fmt(d.nycDelta)} a year here) and coastal rents consume a large share of the ${fmt(ca.netMonthly)} monthly net. The same rate is comfortable in no-tax states — ${fmt(tx.netAnnual)} net in Texas — and tight in the most expensive metros.`,
        },
      ];
  }
}

// ─── Per-Tier SEO Text (used by generateMetadata + JSON-LD in page.tsx) ─────

export function getRateSeoText(rate: number): {
  description: string;
  keywords: string[];
  webAppDescription: string;
} {
  const d = buildHourlyPageData(rate);
  const { rateLabel, tx, ca, ny } = d;

  const baseKeywords = [
    `${rateLabel} an hour is how much a year`,
    `${rateLabel} an hour annually`,
    `${rateLabel} an hour a year`,
    `${rateLabel} an hour salary`,
    `${rateLabel} an hour after taxes`,
    `${rateLabel} an hour yearly`,
    'hourly to salary calculator 2026',
    'hourly rate to annual salary',
  ];

  let description: string;
  let extraKeywords: string[];
  let webAppDescription: string;

  switch (d.tier) {
    case 'entry':
      description = `${rateLabel} an hour is ${fmt(d.annual)} a year full-time — about ${fmt(tx.netAnnual)} net in Texas for a single filer. Livable-wage math, part-time pay, and 2026 take-home by state.`;
      extraKeywords = [`is ${rateLabel} an hour livable`, `${rateLabel} an hour part time`, `${rateLabel} an hour budget`];
      webAppDescription = `Convert ${rateLabel} an hour to yearly, monthly, and weekly pay, then see 2026 take-home after federal, FICA, and state income tax — with a livable-wage budget check.`;
      break;
    case 'core':
      description = `${rateLabel} an hour is ${fmt(d.annual)} a year at 40 hours a week — roughly ${fmt(tx.netAnnual)} net in Texas after 2026 tax. Plus overtime at time-and-a-half and gig-vs-payroll math.`;
      extraKeywords = [`${rateLabel} an hour overtime`, `time and a half ${rateLabel} an hour`, `${rateLabel} an hour 1099 vs w2`];
      webAppDescription = `Convert ${rateLabel} an hour to annual salary and take-home pay — full-time, part-time, and overtime schedules with 2026 federal, FICA, and state tax in any state.`;
      break;
    case 'standard':
      description = `${rateLabel} an hour equals ${fmt(d.annual)} a year — the salary equivalent. A single filer nets ${fmt(tx.netAnnual)} in Texas vs. ${fmt(ca.netAnnual)} in California. Raise math & rent budgets for 2026.`;
      extraKeywords = [`${rateLabel} an hour yearly equivalent`, `${rateLabel} an hour raise`, `rent on ${rateLabel} an hour`];
      webAppDescription = `See what ${rateLabel} an hour equals as a salary — gross, net by state, and what each $1-an-hour raise is worth after 2026 taxes, plus rent-budget math.`;
      break;
    default:
      description = `${rateLabel} an hour is ${fmt(d.annual)} a year before tax. After-tax pay by state, single filer: ${fmt(tx.netAnnual)} in Texas, ${fmt(ca.netAnnual)} in California, ${fmt(ny.netAnnual)} in New York — 2026 rates.`;
      extraKeywords = [`${rateLabel} an hour 401k`, `${rateLabel} an hour exempt`, `${rateLabel} an hour nyc`];
      webAppDescription = `Convert ${rateLabel} an hour to yearly pay and after-tax income by state — 2026 single-filer rates, overtime and exempt-status notes, and retirement-match math.`;
      break;
  }

  return { description, keywords: [...baseKeywords, ...extraKeywords], webAppDescription };
}
