'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy-load calculator components for better performance
const PaycheckCalculator = dynamic(
  () => import('@/components/finance/paycheck-calculator').then((m) => ({ default: m.PaycheckCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const IllinoisCalculator = dynamic(
  () => import('@/components/finance/illinois-calculator').then((m) => ({ default: m.IllinoisCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TexasCalculator = dynamic(
  () => import('@/components/finance/texas-calculator').then((m) => ({ default: m.TexasCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const FloridaCalculator = dynamic(
  () => import('@/components/finance/florida-calculator').then((m) => ({ default: m.FloridaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const CaliforniaCalculator = dynamic(
  () => import('@/components/finance/california-calculator').then((m) => ({ default: m.CaliforniaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const NewYorkCalculator = dynamic(
  () => import('@/components/finance/newyork-calculator').then((m) => ({ default: m.NewYorkCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MortgageCalculator = dynamic(
  () => import('@/components/finance/mortgage-calculator').then((m) => ({ default: m.MortgageCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RetirementProjection = dynamic(
  () => import('@/components/finance/retirement-projection').then((m) => ({ default: m.RetirementProjection })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RelocationCalculator = dynamic(
  () => import('@/components/finance/relocation-calculator').then((m) => ({ default: m.RelocationCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const CapitalGainsCalculator = dynamic(
  () => import('@/components/finance/capital-gains-calculator').then((m) => ({ default: m.CapitalGainsCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const SelfEmploymentCalculator = dynamic(
  () => import('@/components/finance/self-employment-calculator').then((m) => ({ default: m.SelfEmploymentCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TaxRefundCalculator = dynamic(
  () => import('@/components/finance/tax-refund-calculator').then((m) => ({ default: m.TaxRefundCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const SalesTaxCalculator = dynamic(
  () => import('@/components/finance/sales-tax-calculator').then((m) => ({ default: m.SalesTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const OvertimeTaxCalculator = dynamic(
  () => import('@/components/finance/overtime-tax-calculator').then((m) => ({ default: m.OvertimeTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const GeorgiaCalculator = dynamic(
  () => import('@/components/finance/georgia-calculator').then((m) => ({ default: m.GeorgiaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const LotteryTaxCalculator = dynamic(
  () => import('@/components/finance/lottery-tax-calculator').then((m) => ({ default: m.LotteryTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const IRSWithholdingCalculator = dynamic(
  () => import('@/components/finance/irs-withholding-calculator').then((m) => ({ default: m.IRSWithholdingCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const PropertyTaxCalculator = dynamic(
  () => import('@/components/finance/property-tax-calculator').then((m) => ({ default: m.PropertyTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const BonusTaxCalculator = dynamic(
  () => import('@/components/finance/bonus-tax-calculator').then((m) => ({ default: m.BonusTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const VirginiaCalculator = dynamic(
  () => import('@/components/finance/virginia-calculator').then((m) => ({ default: m.VirginiaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const NorthCarolinaCalculator = dynamic(
  () => import('@/components/finance/northcarolina-calculator').then((m) => ({ default: m.NorthCarolinaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const PennsylvaniaCalculator = dynamic(
  () => import('@/components/finance/pennsylvania-calculator').then((m) => ({ default: m.PennsylvaniaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const OhioCalculator = dynamic(
  () => import('@/components/finance/ohio-calculator').then((m) => ({ default: m.OhioCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MichiganCalculator = dynamic(
  () => import('@/components/finance/michigan-calculator').then((m) => ({ default: m.MichiganCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const NewJerseyCalculator = dynamic(
  () => import('@/components/finance/newjersey-calculator').then((m) => ({ default: m.NewJerseyCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const ColoradoCalculator = dynamic(
  () => import('@/components/finance/colorado-calculator').then((m) => ({ default: m.ColoradoCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const ArizonaCalculator = dynamic(
  () => import('@/components/finance/arizona-calculator').then((m) => ({ default: m.ArizonaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const WashingtonCalculator = dynamic(
  () => import('@/components/finance/washington-calculator').then((m) => ({ default: m.WashingtonCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MassachusettsCalculator = dynamic(
  () => import('@/components/finance/massachusetts-calculator').then((m) => ({ default: m.MassachusettsCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const IndianaCalculator = dynamic(
  () => import('@/components/finance/indiana-calculator').then((m) => ({ default: m.IndianaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TennesseeCalculator = dynamic(
  () => import('@/components/finance/tennessee-calculator').then((m) => ({ default: m.TennesseeCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MissouriCalculator = dynamic(
  () => import('@/components/finance/missouri-calculator').then((m) => ({ default: m.MissouriCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MarylandCalculator = dynamic(
  () => import('@/components/finance/maryland-calculator').then((m) => ({ default: m.MarylandCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const WisconsinCalculator = dynamic(
  () => import('@/components/finance/wisconsin-calculator').then((m) => ({ default: m.WisconsinCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const MinnesotaCalculator = dynamic(
  () => import('@/components/finance/minnesota-calculator').then((m) => ({ default: m.MinnesotaCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const OregonCalculator = dynamic(
  () => import('@/components/finance/oregon-calculator').then((m) => ({ default: m.OregonCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

const EmployeeCostCalculator = dynamic(
  () => import('@/components/finance/employee-cost-calculator').then((m) => ({ default: m.EmployeeCostCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// Hourly ⇄ salary converter
const HourlyToSalaryCalculator = dynamic(
  () => import('@/components/finance/hourly-to-salary-calculator').then((m) => ({ default: m.HourlyToSalaryCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// Compound interest projector
const CompoundInterestCalculator = dynamic(
  () => import('@/components/finance/compound-interest-calculator').then((m) => ({ default: m.CompoundInterestCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// Marriage penalty/bonus comparison
const MarriageTaxCalculator = dynamic(
  () => import('@/components/finance/marriage-tax-calculator').then((m) => ({ default: m.MarriageTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// Generic state calculator for the 27 remaining states
const GenericStateCalculator = dynamic(
  () => import('@/components/finance/generic-state-calculator').then((m) => ({ default: m.GenericStateCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// ─── Task 39 additions: loans, retirement, savings, work, quick utils ────────
const AutoLoanCalculator = dynamic(
  () => import('@/components/finance/auto-loan-calculator').then((m) => ({ default: m.AutoLoanCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const LoanCalculator = dynamic(
  () => import('@/components/finance/loan-calculator').then((m) => ({ default: m.LoanCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const PersonalLoanCalculator = dynamic(
  () => import('@/components/finance/personal-loan-calculator').then((m) => ({ default: m.PersonalLoanCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const AmortizationCalculator = dynamic(
  () => import('@/components/finance/amortization-calculator').then((m) => ({ default: m.AmortizationCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RetirementCalculator = dynamic(
  () => import('@/components/finance/retirement-calculator').then((m) => ({ default: m.RetirementCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RothIraCalculator = dynamic(
  () => import('@/components/finance/roth-ira-calculator').then((m) => ({ default: m.RothIraCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const CdCalculator = dynamic(
  () => import('@/components/finance/cd-calculator').then((m) => ({ default: m.CdCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const InvestmentCalculator = dynamic(
  () => import('@/components/finance/investment-calculator').then((m) => ({ default: m.InvestmentCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const InterestCalculator = dynamic(
  () => import('@/components/finance/interest-calculator').then((m) => ({ default: m.InterestCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TimeCardCalculator = dynamic(
  () => import('@/components/finance/time-card-calculator').then((m) => ({ default: m.TimeCardCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const PayrollCalculator = dynamic(
  () => import('@/components/finance/payroll-calculator').then((m) => ({ default: m.PayrollCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const TipCalculator = dynamic(
  () => import('@/components/finance/tip-calculator').then((m) => ({ default: m.TipCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const PercentageChangeCalculator = dynamic(
  () => import('@/components/finance/percentage-change-calculator').then((m) => ({ default: m.PercentageChangeCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const InflationCalculator = dynamic(
  () => import('@/components/finance/inflation-calculator').then((m) => ({ default: m.InflationCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const DebtPayoffCalculator = dynamic(
  () => import('@/components/finance/debt-payoff-calculator').then((m) => ({ default: m.DebtPayoffCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const DebtToIncomeCalculator = dynamic(
  () => import('@/components/finance/debt-to-income-calculator').then((m) => ({ default: m.DebtToIncomeCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);
const RobuxTaxCalculator = dynamic(
  () => import('@/components/finance/robux-tax-calculator').then((m) => ({ default: m.RobuxTaxCalculator })),
  { loading: () => <CalculatorSkeleton />, ssr: false }
);

// Set of componentKeys handled by GenericStateCalculator
const GENERIC_STATE_KEYS = new Set([
  'alaska', 'nevada', 'southdakota', 'wyoming', 'newhampshire',
  'idaho', 'kentucky', 'mississippi', 'utah',
  'alabama', 'arkansas', 'connecticut', 'delaware', 'hawaii', 'iowa', 'kansas', 'louisiana', 'maine',
  'montana', 'nebraska', 'newmexico', 'northdakota', 'oklahoma', 'rhodeisland', 'southcarolina', 'vermont', 'westvirginia',
]);

function CalculatorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-2/3" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border/30 bg-card/50 p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CalculatorClientPageProps {
  componentKey: string;
}

export function CalculatorClientPage({ componentKey }: CalculatorClientPageProps) {
  switch (componentKey) {
    case 'home':
      return <PaycheckCalculator />;
    case 'illinois':
      return <IllinoisCalculator />;
    case 'texas':
      return <TexasCalculator />;
    case 'florida':
      return <FloridaCalculator />;
    case 'california':
      return <CaliforniaCalculator />;
    case 'newyork':
      return <NewYorkCalculator />;
    case 'mortgage':
      return <MortgageCalculator />;
    case 'retirement':
      return <RetirementProjection />;
    case 'relocation':
      return <RelocationCalculator />;
    case 'capital-gains':
      return <CapitalGainsCalculator />;
    case 'self-employment':
      return <SelfEmploymentCalculator />;
    case 'tax-refund':
      return <TaxRefundCalculator />;
    case 'sales-tax':
      return <SalesTaxCalculator />;
    case 'overtime':
      return <OvertimeTaxCalculator />;
    case 'georgia':
      return <GeorgiaCalculator />;
    case 'lottery':
      return <LotteryTaxCalculator />;
    case 'irs-withholding':
      return <IRSWithholdingCalculator />;
    case 'property-tax':
      return <PropertyTaxCalculator />;
    case 'bonus-tax':
      return <BonusTaxCalculator />;
    case 'virginia':
      return <VirginiaCalculator />;
    case 'northcarolina':
      return <NorthCarolinaCalculator />;
    case 'pennsylvania':
      return <PennsylvaniaCalculator />;
    case 'ohio':
      return <OhioCalculator />;
    case 'michigan':
      return <MichiganCalculator />;
    case 'newjersey':
      return <NewJerseyCalculator />;
    case 'colorado':
      return <ColoradoCalculator />;
    case 'arizona':
      return <ArizonaCalculator />;
    case 'washington':
      return <WashingtonCalculator />;
    case 'massachusetts':
      return <MassachusettsCalculator />;
    case 'indiana':
      return <IndianaCalculator />;
    case 'tennessee':
      return <TennesseeCalculator />;
    case 'missouri':
      return <MissouriCalculator />;
    case 'maryland':
      return <MarylandCalculator />;
    case 'wisconsin':
      return <WisconsinCalculator />;
    case 'minnesota':
      return <MinnesotaCalculator />;
    case 'oregon':
      return <OregonCalculator />;
    case 'employee-cost':
      return <EmployeeCostCalculator />;
    case 'nyc':
      return <NewYorkCalculator />;
    case 'la':
      return <CaliforniaCalculator />;
    case 'chicago':
      return <IllinoisCalculator />;
    case 'hourly-salary':
      return <HourlyToSalaryCalculator />;
    case 'compound-interest':
      return <CompoundInterestCalculator />;
    case 'marriage-tax':
      return <MarriageTaxCalculator />;
    case 'auto-loan':
      return <AutoLoanCalculator />;
    case 'loan':
      return <LoanCalculator />;
    case 'personal-loan':
      return <PersonalLoanCalculator />;
    case 'amortization':
      return <AmortizationCalculator />;
    case 'retirement-planning':
      return <RetirementCalculator />;
    case 'roth-ira':
      return <RothIraCalculator />;
    case 'cd':
      return <CdCalculator />;
    case 'investments':
      return <InvestmentCalculator />;
    case 'interest':
      return <InterestCalculator />;
    case 'time-card':
      return <TimeCardCalculator />;
    case 'payroll':
      return <PayrollCalculator />;
    case 'tip':
      return <TipCalculator />;
    case 'percentage-change':
      return <PercentageChangeCalculator />;
    case 'inflation':
      return <InflationCalculator />;
    case 'debt-payoff':
      return <DebtPayoffCalculator />;
    case 'debt-to-income':
      return <DebtToIncomeCalculator />;
    case 'robux':
      return <RobuxTaxCalculator />;
    default:
      // Check if it's a generic state key
      if (GENERIC_STATE_KEYS.has(componentKey)) {
        return <GenericStateCalculator stateKey={componentKey} />;
      }
      return <PaycheckCalculator />;
  }
}
