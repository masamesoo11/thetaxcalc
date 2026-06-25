'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScenarioComparison, type TaxScenario } from '@/components/finance/scenario-comparison';
import { STATE_PROFILES } from '@/lib/tax-config';
import type { PayFrequency } from '@/lib/finance-utils';

interface CalculatorScenarioSectionProps {
  calculatorType: string;
  calculatorSlug: string;
}

/**
 * Calculator types that support salary/state/filing-based scenario comparison.
 * Only these calculators show the full ScenarioComparison component.
 * Other calculator types (mortgage, retirement, etc.) don't show it because
 * their inputs don't map to the TaxScenario interface.
 */
const PAYCHECK_TYPES = new Set([
  // 'home' is excluded — PaycheckCalculator already renders ScenarioComparison with live state
  'illinois', 'texas', 'florida', 'california', 'newyork',
  'georgia', 'virginia', 'northcarolina', 'pennsylvania', 'ohio',
  'michigan', 'newjersey', 'colorado', 'arizona', 'washington',
  'massachusetts', 'indiana', 'tennessee', 'missouri', 'maryland',
  'wisconsin', 'minnesota', 'oregon',
  // Generic state calculators
  'alaska', 'nevada', 'southdakota', 'wyoming', 'newhampshire',
  'idaho', 'kentucky', 'mississippi', 'utah',
  'alabama', 'arkansas', 'connecticut', 'delaware', 'hawaii', 'iowa',
  'kansas', 'louisiana', 'maine', 'montana', 'nebraska', 'newmexico',
  'northdakota', 'oklahoma', 'rhodeisland', 'southcarolina', 'vermont',
  'westvirginia',
  // Also for overtime and bonus since they're paycheck-related
  'overtime', 'bonus-tax',
]);

/**
 * Maps calculator type to a default state key for the scenario comparison.
 */
function getDefaultStateKey(type: string): string {
  // State calculators use their own state
  if (PAYCHECK_TYPES.has(type) && STATE_PROFILES[type]) {
    return type;
  }
  return 'illinois';
}

/**
 * Maps calculator type to a sensible default salary.
 */
function getDefaultSalary(type: string): number {
  switch (type) {
    case 'california':
    case 'newyork':
    case 'washington':
    case 'massachusetts':
    case 'newjersey':
    case 'connecticut':
      return 100000; // Higher cost-of-living states
    case 'mississippi':
    case 'arkansas':
    case 'westvirginia':
      return 55000; // Lower cost-of-living states
    default:
      return 75000;
  }
}

/**
 * CalculatorScenarioSection — conditionally renders ScenarioComparison
 * below the calculator for paycheck-type calculators.
 *
 * Reads URL hash params to pre-fill with current calculator values.
 * Falls back to sensible defaults based on calculator type.
 */
export function CalculatorScenarioSection({ calculatorType, calculatorSlug }: CalculatorScenarioSectionProps) {
  const searchParams = useSearchParams();

  // Don't render scenario section in embed mode
  if (searchParams.get('embed') === '1') {
    return null;
  }

  // Only paycheck-type calculators get the full comparison
  if (!PAYCHECK_TYPES.has(calculatorType)) {
    return null;
  }

  // Build default scenario from URL hash or calculator type
  const defaultScenario: TaxScenario = {
    id: 'default',
    label: 'Current',
    salary: getDefaultSalary(calculatorType),
    payFrequency: 'annual' as PayFrequency,
    stateKey: getDefaultStateKey(calculatorType),
    filingStatus: 'single',
    retirement401k: 0,
    hsaContribution: 0,
    nycResident: false,
  };

  return (
    <div id="scenario-comparison" className="mt-8">
      <ScenarioComparison defaultScenario={defaultScenario} />
    </div>
  );
}
