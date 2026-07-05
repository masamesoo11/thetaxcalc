import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Methodology: How TheTaxCalc Computes Your Taxes',
  description:
    'Learn how TheTaxCalc computes federal, state, and FICA taxes for 2026. Every calculation is based on official IRS publications, SSA data, and state revenue department sources.',
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    title: 'Methodology: How TheTaxCalc Computes Taxes',
    description:
      'How we compute your 2026 federal, state, and FICA taxes. All data sourced from IRS, SSA, and state revenue departments.',
    url: `${SITE_URL}/methodology`,
    siteName: 'TheTaxCalc',
    type: 'website',
  },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-medium">Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Methodology & Data Sources
      </h1>
      <p className="text-muted-foreground mb-2">
        Every number on TheTaxCalc.com is derived from official government publications.
        This page documents exactly which sources we use, how each tax is calculated,
        and what assumptions go into our 2026 calculators.
      </p>
      <p className="text-xs text-muted-foreground mb-10">
        Last updated: January 2026 &middot; Tax year: 2026
      </p>

      {/* ─── Federal Income Tax ─────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Federal Income Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Federal income tax is computed using the progressive bracket system defined in
          IRS Revenue Procedure 2025-25 and IRS Publication 15-T (Percentage Method
          Tables for Income Tax Withholding). For the 2026 tax year, there are seven
          brackets ranging from 10% to 37%. The standard deduction amounts are
          $16,100 for Single filers, $32,200 for Married Filing Jointly, and
          $24,150 for Head of Household. Our paycheck calculator applies these
          brackets sequentially to taxable income (gross income minus pre-tax
          deductions and the standard deduction), exactly as the IRS prescribes.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Publication 15-T
              </a>
              {' '}&mdash; Federal Income Tax Withholding Methods (2026)
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc551" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 551
              </a>
              {' '}&mdash; Standard Deduction
            </li>
            <li>
              <a href="https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                Revenue Procedure 2025-25
              </a>
              {' '}&mdash; Annual inflation adjustments for 2026
            </li>
          </ul>
        </div>
      </section>

      {/* ─── FICA (Social Security & Medicare) ──────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          FICA: Social Security &amp; Medicare
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          FICA taxes are calculated at 6.2% for Social Security (OASDI) on earnings
          up to the annual wage base limit, and 1.45% for Medicare (HI) on all
          earnings with no cap. For 2026, the Social Security wage base is $184,500,
          as announced by the Social Security Administration. An Additional Medicare
          Tax of 0.9% applies to earned income exceeding $200,000 for single filers
          ($250,000 for married filing jointly). Pre-tax deductions such as 401(k)
          contributions do not reduce FICA taxable income &mdash; only federal and
          state income tax. This is correctly reflected in all our calculators.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.ssa.gov/oact/cola/cbb.html" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                SSA Contribution and Benefit Base
              </a>
              {' '}&mdash; 2026 wage base: $184,500
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc751" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 751
              </a>
              {' '}&mdash; Social Security and Medicare Withholding Rates
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc860" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 860
              </a>
              {' '}&mdash; Additional Medicare Tax
            </li>
          </ul>
        </div>
      </section>

      {/* ─── State Income Tax ───────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          State Income Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          State income tax calculations vary significantly by state. We provide
          dedicated income tax calculators for all 50 states, plus dedicated
          sales tax calculators for all 50 states as well. For states with
          progressive bracket systems (e.g., California, New York, Georgia),
          we apply each state&rsquo;s published brackets to state taxable income. For flat-tax states (e.g.,
          Illinois at 4.95%, Pennsylvania at 3.07%), we apply a single rate. For
          states with no individual income tax (e.g., Texas, Florida, Washington,
          Tennessee, Wyoming, Nevada, South Dakota, Alaska, New Hampshire), the state
          income tax component is zero. State standard deductions and personal
          exemptions are factored in where applicable. Our data is sourced directly
          from each state&rsquo;s Department of Revenue or equivalent authority.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources (examples):</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.ftb.ca.gov/forms" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                California FTB
              </a>
              {' '}&mdash; 2026 tax rate schedules and brackets
            </li>
            <li>
              <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                NY Dept. of Taxation &amp; Finance
              </a>
              {' '}&mdash; 2026 income tax brackets
            </li>
            <li>
              <a href="https://revenue.illinois.gov/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IL Dept. of Revenue
              </a>
              {' '}&mdash; 4.95% flat rate and personal exemption
            </li>
            <li>
              <a href="https://taxfoundation.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                Tax Foundation
              </a>
              {' '}&mdash; State Individual Income Tax Rates and Brackets (2026)
            </li>
          </ul>
        </div>
      </section>

      {/* ─── 401(k) & Retirement ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          401(k) &amp; Retirement Projections
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our 401(k) calculator projects future retirement balances using compound
          growth with the formula: Balance = P &times; (1 + r)<sup>n</sup> + C &times;
          [((1 + r)<sup>n</sup> &minus; 1) / r], where P is the current balance,
          r is the assumed annual rate of return, n is the number of years, and C
          is the total annual contribution (employee + employer match). The 2026
          401(k) contribution limit is $23,500 for those under 50, with an additional
          $7,500 catch-up contribution for those aged 50+, as set by the IRS. Employer
          match is applied according to the most common formula (50% match on the
          first 6% of salary). Projections are estimates only; actual returns will
          vary based on market conditions.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-23500-for-2026" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Notice 2025-XX
              </a>
              {' '}&mdash; 2026 401(k) contribution limits: $23,500 / $31,000 (50+)
            </li>
            <li>
              <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Retirement Topics
              </a>
              {' '}&mdash; 401(k) and profit sharing plan contribution limits
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Capital Gains ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Capital Gains Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Capital gains tax rates depend on the holding period and the taxpayer&rsquo;s
          total taxable income. Short-term gains (assets held one year or less) are
          taxed as ordinary income using the federal brackets. Long-term gains (held
          more than one year) benefit from preferential rates: 0%, 15%, or 20%,
          depending on income level. For 2026, the 0% rate applies to taxable income
          up to $48,350 (single) or $96,700 (married filing jointly). The Net
          Investment Income Tax (NIIT) adds an additional 3.8% on investment income
          for individuals with modified AGI exceeding $200,000 (single) or $250,000
          (MFJ). Our calculator factors in both the long-term rates and the NIIT
          surcharge.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 409
              </a>
              {' '}&mdash; Capital Gains and Losses
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc559" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 559
              </a>
              {' '}&mdash; Net Investment Income Tax
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Self-Employment Tax ────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Self-Employment Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Self-employment tax covers both the employer and employee portions of FICA
          for freelancers and independent contractors. The total rate is 15.3%:
          12.4% for Social Security (on net earnings up to the $184,500 wage base)
          and 2.9% for Medicare (on all net earnings). However, only 92.35% of net
          self-employment income is subject to SE tax, and half of the total SE tax
          is deductible against ordinary income. Our calculator applies these rules
          exactly as specified in IRS Schedule SE and Publication 533.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.irs.gov/forms-pubs/about-schedule-se-form-1040" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Schedule SE
              </a>
              {' '}&mdash; Self-Employment Tax
            </li>
            <li>
              <a href="https://www.irs.gov/publications/p533" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Publication 533
              </a>
              {' '}&mdash; Self-Employment Tax
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Sales Tax ──────────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Sales Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our sales tax calculator uses combined rates that include the state base
          rate plus average local rates. For example, Texas has a 6.25% state sales
          tax but the average combined rate including local add-ons is approximately
          8.2%. Five states (Oregon, Montana, Delaware, New Hampshire, Alaska) have
          no statewide sales tax, though Alaska and some others allow local sales
          taxes. Rates are sourced from each state&rsquo;s revenue department and
          cross-referenced with the Tax Foundation&rsquo;s annual state and local
          sales tax report.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://taxfoundation.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                Tax Foundation
              </a>
              {' '}&mdash; State and Local Sales Tax Rates, Midyear 2026
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc505" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 505
              </a>
              {' '}&mdash; Deductible taxes (SALT deduction context)
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Property Tax ───────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Property Tax
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Property tax estimates are based on effective tax rates, calculated as the
          median annual property tax paid divided by the median home value in each
          state. These rates vary significantly: from approximately 0.28% in Hawaii
          to over 2.21% in New Jersey. Our data is drawn from the U.S. Census
          Bureau and Tax Foundation analyses. The calculator multiplies the
          home&rsquo;s assessed value by the state&rsquo;s average effective rate
          to produce an annual estimate. Actual property tax bills depend on local
          millage rates, assessment ratios, and exemptions (e.g., homestead
          exemptions in Florida), which vary by county.
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://taxfoundation.org/data/all/state/property-taxes-by-state-county/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                Tax Foundation
              </a>
              {' '}&mdash; Property Taxes by State and County
            </li>
            <li>
              <a href="https://www.census.gov/" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                U.S. Census Bureau
              </a>
              {' '}&mdash; Median home values and property tax data
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Payroll Deductions & Supplemental Income ───────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Payroll Deductions &amp; Supplemental Income
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          For bonuses, overtime, and other supplemental wages, our calculators apply
          the IRS supplemental withholding rate of 22% for amounts under $1 million
          and 37% for amounts exceeding $1 million, as defined in IRS Publication
          15-T. State supplemental rates are applied according to each state&rsquo;s
          published rules. The lottery tax calculator applies the mandatory 24%
          federal withholding on winnings over $5,000, plus applicable state
          withholding, and then computes the actual tax liability at the
          taxpayer&rsquo;s marginal rate (which may be higher than the withholding).
        </p>
        <div className="rounded-lg border border-border/30 bg-card/50 p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Primary Sources:</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Publication 15-T
              </a>
              {' '}&mdash; Supplemental wage withholding rates
            </li>
            <li>
              <a href="https://www.irs.gov/taxtopics/tc419" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-400 hover:text-emerald-300 underline">
                IRS Topic No. 419
              </a>
              {' '}&mdash; Gambling income and withholding
            </li>
          </ul>
        </div>
      </section>

      {/* ─── Privacy & Client-Side Computation ──────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Privacy &amp; Client-Side Computation
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          All tax calculations on TheTaxCalc.com are performed entirely in your
          browser using JavaScript. Your income, deductions, and tax figures are
          never transmitted to our servers or stored in any database. The only data
          we collect is standard web analytics (page views, referral sources) and
          email addresses if you voluntarily subscribe to our newsletter. This
          architecture ensures that your sensitive financial information remains
          private and secure on your own device.
        </p>
      </section>

      {/* ─── Important Disclaimer ───────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Important Disclaimer
        </h2>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            The calculations provided by TheTaxCalc.com are estimates for
            informational and educational purposes only. They do not constitute tax
            advice, and should not be used as the sole basis for financial decisions
            or tax filing. Individual tax situations vary based on many factors
            including but not limited to: additional deductions, credits, alternative
            minimum tax, foreign income, stock compensation, and multi-state filing
            obligations.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We strongly recommend consulting a qualified tax professional (CPA, EA,
            or tax attorney) for advice specific to your situation. While we make
            every effort to ensure accuracy by sourcing data from official government
            publications, tax law changes frequently and errors may occur. Use of
            this tool constitutes acceptance of our{' '}
            <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
              Terms of Use
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── When We Update ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Update Schedule
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We update our tax data on the following schedule to ensure accuracy:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">Jan</span>
            <span>Annual IRS inflation adjustments and new bracket/rate data published</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">Oct&ndash;Nov</span>
            <span>SSA announces the upcoming year&rsquo;s Social Security wage base</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">Ongoing</span>
            <span>State legislative changes incorporated within 30 days of enactment</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">Quarterly</span>
            <span>Full review of all calculator logic and data sources for consistency</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
