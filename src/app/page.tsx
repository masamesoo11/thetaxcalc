'use client';

import { useCallback } from 'react';
import { Header } from '@/components/finance/header';
import { Footer } from '@/components/finance/footer';
import { PaycheckCalculator } from '@/components/finance/paycheck-calculator';
import { IllinoisCalculator } from '@/components/finance/illinois-calculator';
import { TexasCalculator } from '@/components/finance/texas-calculator';
import { FloridaCalculator } from '@/components/finance/florida-calculator';
import { MortgageCalculator } from '@/components/finance/mortgage-calculator';
import { useHashPage } from '@/hooks/use-hash-state';

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

function getHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Paycheck Calculator — Federal, FICA & State Tax Take-Home Pay',
        description:
          'Free 2026 paycheck calculator. Instantly compute your take-home pay after federal tax, FICA (Social Security + Medicare), and state income tax deductions. Supports Illinois, Texas, and Florida.',
        url: 'https://taxyield.io',
        inLanguage: 'en-US',
        dateModified: '2026-01-01',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TaxYield Paycheck Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'A precision paycheck calculator for 2026 that computes federal tax, FICA deductions, and state-specific income tax for Illinois, Texas, and Florida. Includes 401(k) and HSA pre-tax deduction support.',
      },
    ],
  };
}

function getIllinoisJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Illinois Paycheck Calculator 2026',
        url: 'https://taxyield.io/illinois',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Illinois Tax Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        description:
          'Calculate your Illinois take-home pay with the 4.95% flat income tax rate and $2,775 personal exemption. Includes federal tax brackets and FICA deductions.',
      },
      {
        '@type': 'MathSolver',
        name: 'Illinois Paycheck Math Solver',
        description:
          'Computes net take-home pay by solving: Net = Gross - Federal Tax - FICA - IL State Tax, where IL Tax = (Gross - Personal Exemption) × 4.95%',
        mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G) - (G - Exempt) × 0.0495',
        identifier: 'illinois-paycheck-solver',
      },
      {
        '@type': 'Dataset',
        name: '2026 Illinois Tax Rates',
        description: 'Key 2026 Illinois tax parameters for paycheck computation',
        about: {
          '@type': 'Thing',
          name: 'Illinois State Income Tax 2026',
        },
        variableMeasured: [
          { name: 'Illinois Flat Tax Rate', value: '4.95%' },
          { name: 'Illinois Personal Exemption', value: '$2,775' },
          { name: 'Federal Standard Deduction (Single)', value: '$15,000' },
          { name: 'Social Security Tax Rate', value: '6.2%' },
          { name: 'Medicare Tax Rate', value: '1.45%' },
          { name: 'FICA Total Rate', value: '7.65%' },
          { name: 'Social Security Wage Cap', value: '$176,100' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much is Illinois state income tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Illinois has a flat state income tax rate of 4.95% as of 2026. All taxable income is subject to this single rate regardless of income level.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Illinois personal exemption for 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Illinois personal exemption is $2,775 for 2026. This amount is subtracted from your gross income before the 4.95% flat tax is applied.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my Illinois take-home pay from $75,000?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For a $75,000 salary in Illinois: Subtract the $2,775 personal exemption to get $72,225 taxable income. Illinois tax = $72,225 × 4.95% = $3,575.14. Federal tax ≈ $8,717.50. FICA = $5,737.50. Net annual take-home ≈ $56,969.86.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Illinois have a standard deduction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, Illinois does not offer a standard deduction. Instead, it provides a personal exemption of $2,775 per person that reduces taxable income before the flat 4.95% rate is applied.',
            },
          },
        ],
      },
    ],
  };
}

function getTexasJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Texas Paycheck Calculator 2026',
        url: 'https://taxyield.io/texas',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'MathSolver',
        name: 'Texas Paycheck Math Solver',
        description:
          'Computes net take-home pay in Texas: Net = Gross - Federal Tax - FICA. Texas has 0% state income tax. Total cost-of-living burden adds property tax (1.71% avg) and sales tax (8.2% avg).',
        mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G); COL = PropertyTax + SalesTaxBurden',
        identifier: 'texas-paycheck-solver',
      },
      {
        '@type': 'Dataset',
        name: '2026 Texas Tax & Cost of Living Data',
        description: 'Texas has 0% state income tax. Key cost-of-living metrics for 2026.',
        variableMeasured: [
          { name: 'Texas State Income Tax Rate', value: '0%' },
          { name: 'Texas Average Effective Property Tax Rate', value: '1.71%' },
          { name: 'Texas State Sales Tax Rate', value: '6.25%' },
          { name: 'Texas Average Combined Sales Tax Rate', value: '8.2%' },
          { name: 'Texas Average Home Value', value: '$290,000' },
          { name: 'Texas Average Annual Property Tax', value: '$4,959' },
        ],
      },
    ],
  };
}

function getFloridaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Florida Paycheck Calculator 2026',
        url: 'https://taxyield.io/florida',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'MathSolver',
        name: 'Florida Paycheck Math Solver',
        description:
          'Computes net take-home pay in Florida: Net = Gross - Federal Tax - FICA. Florida has 0% state income tax. Cost-of-living burden includes property tax (0.86% avg) and sales tax (7.0% avg).',
        mathExpression: 'Net = G - Fed(G - StdDed) - FICA(G); COL = PropertyTax + SalesTaxBurden',
        identifier: 'florida-paycheck-solver',
      },
      {
        '@type': 'Dataset',
        name: '2026 Florida Tax & Cost of Living Data',
        variableMeasured: [
          { name: 'Florida State Income Tax Rate', value: '0%' },
          { name: 'Florida Average Effective Property Tax Rate', value: '0.86%' },
          { name: 'Florida State Sales Tax Rate', value: '6.0%' },
          { name: 'Florida Average Combined Sales Tax Rate', value: '7.0%' },
          { name: 'Florida Average Home Value', value: '$395,000' },
        ],
      },
    ],
  };
}

function getMortgageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Mortgage Calculator with Extra Payments',
        url: 'https://taxyield.io/mortgage',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'TaxYield Mortgage Calculator',
        applicationCategory: 'FinanceApplication',
        description:
          'Calculate fixed-rate mortgage payments with amortization schedule. Simulate extra monthly payments to see total interest savings and early payoff timeline.',
      },
      {
        '@type': 'MathSolver',
        name: 'Mortgage Amortization Solver',
        description:
          'Computes monthly payment using the standard fixed-rate formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P = principal, r = monthly rate, n = total payments.',
        mathExpression: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]',
        identifier: 'mortgage-amortization-solver',
      },
    ],
  };
}

function getJsonLdForPage(page: string) {
  switch (page) {
    case 'illinois': return getIllinoisJsonLd();
    case 'texas': return getTexasJsonLd();
    case 'florida': return getFloridaJsonLd();
    case 'mortgage': return getMortgageJsonLd();
    default: return getHomeJsonLd();
  }
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function Home() {
  const currentPage = useHashPage();

  const handleNavigate = useCallback((page: string) => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const jsonLd = getJsonLdForPage(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'illinois':
        return <IllinoisCalculator />;
      case 'texas':
        return <TexasCalculator />;
      case 'florida':
        return <FloridaCalculator />;
      case 'mortgage':
        return <MortgageCalculator />;
      default:
        return <PaycheckCalculator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}
