import {
  HOME_FAQS,
  ILLINOIS_FAQS,
  TEXAS_FAQS,
  FLORIDA_FAQS,
  CALIFORNIA_FAQS,
  NEWYORK_FAQS,
  MORTGAGE_FAQS,
  CAPITAL_GAINS_FAQS,
  SELF_EMPLOYMENT_FAQS,
  RETIREMENT_FAQS,
  RELOCATION_FAQS,
  TAX_REFUND_FAQS,
  SALES_TAX_FAQS,
  OVERTIME_FAQS,
  GEORGIA_FAQS,
  LOTTERY_TAX_FAQS,
  IRS_WITHHOLDING_FAQS,
  PROPERTY_TAX_FAQS,
  BONUS_TAX_FAQS,
  VIRGINIA_FAQS,
  NORTHCAROLINA_FAQS,
  PENNSYLVANIA_FAQS,
  OHIO_FAQS,
  MICHIGAN_FAQS,
  NEWJERSEY_FAQS,
  COLORADO_FAQS,
  ARIZONA_FAQS,
  WASHINGTON_FAQS,
  MASSACHUSETTS_FAQS,
  INDIANA_FAQS,
  TENNESSEE_FAQS,
  MISSOURI_FAQS,
  MARYLAND_FAQS,
  WISCONSIN_FAQS,
  MINNESOTA_FAQS,
  OREGON_FAQS,
  FAQItem,
} from '@/lib/faq-data';

// ─── Calculator Content Data (Server-Rendered for SEO) ─────────────────────────

export interface CalculatorContent {
  howItWorks: string[];
  keyRates: { label: string; value: string }[];
  faqs: FAQItem[];
  relatedCalculators: { slug: string; label: string }[];
}

export function getCalculatorContent(type: string): CalculatorContent {
  switch (type) {
    case 'home':
      return {
        howItWorks: [
          'Look at your pay stub sometime. That number at the bottom — the one that actually hits your bank — is way smaller than the number at the top. This calculator tells you why, line by line. All withholding calculations follow <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow">IRS Publication 15-T</a>.',
          'Here\'s what comes out of every paycheck. Federal tax uses progressive brackets from 10% up to 37%, with standard deductions of $16,100 (single) or $32,200 (married). Then <a href="/glossary">FICA</a>: 6.2% for Social Security on income up to $176,100, and 1.45% for Medicare on everything. Make over $200,000? Add another 0.9% Medicare surtax on the amount above that.',
          'My buddy in Chicago and I compared stubs once. Same salary, same filing status. He walked away with about $3,800 less for the year because Illinois takes 4.95% and my state takes nothing. That\'s when it hit me — state tax is not a small factor. We cover five states here: Illinois at 4.95% flat, Texas at 0%, Florida at 0%, California at 1%–13.3% progressive, and New York at 4%–10.9% plus a potential NYC tax.',
          'A couple things that help soften the blow:\n- <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both federal and state level\n- HSA contributions do the same\n- These pre-tax deductions are basically a discount on your tax bill',
          'Bottom line — you\'ll see your net pay, effective tax rate, and marginal rate. Most people think their effective rate is higher than it actually is. Go ahead, see for yourself.',
        ],
        keyRates: [
          { label: 'Federal Tax Brackets', value: '10% – 37%' },
          { label: 'Standard Deduction (Single)', value: '$16,100' },
          { label: 'Social Security Rate', value: '6.2% (up to $176,100)' },
          { label: 'Medicare Rate', value: '1.45% (no cap)' },
          { label: 'Additional Medicare Tax', value: '0.9% (above $200K)' },
        ],
        faqs: HOME_FAQS,
        relatedCalculators: [
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'illinois':
      return {
        howItWorks: [
          '<a href="https://revenue.illinois.gov/" target="_blank" rel="noopener noreferrer nofollow">4.95%</a>. That\'s it. One flat rate for every Illinois resident, whether you pull in $30K or $300K. No brackets to figure out, no guessing which rate applies. Honestly, it\'s kinda nice not having to navigate a bracket system — even if 4.95% isn\'t exactly cheap compared to the zero-tax states. You get a $2,775 personal exemption for 2026 that comes off the top, so on a $75,000 salary you\'re taxed on $72,225, which comes out to $3,575.14 in state tax. The math is easy to check. My cousin moved from Chicago to Austin last year and he said the <a href="/relocation-calculator">state tax savings alone covered his moving costs</a> within about 8 months.',
          'On top of Illinois tax you\'ve got the federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> are your friend here — they reduce taxable income at both the federal and state level, so every dollar you put in saves you money twice.',
          'One thing people don\'t expect: Illinois has no state standard deduction, just that personal exemption. But there\'s a real silver lining if you\'re anywhere near retirement. Illinois doesn\'t touch Social Security benefits, 401(k) distributions, IRA withdrawals, or pension income. The property taxes are brutal — no argument there — but for retirees specifically, the income tax picture is honestly pretty decent.',
        ],
        keyRates: [
          { label: 'Illinois Flat Tax Rate', value: '4.95%' },
          { label: 'IL Personal Exemption', value: '$2,775' },
          { label: 'IL Avg Property Tax Rate', value: '~1.78%' },
          { label: 'IL Avg Combined Sales Tax', value: '8.86%' },
          { label: 'Social Security Wage Cap', value: '$176,100' },
        ],
        faqs: ILLINOIS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'General Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'texas':
      return {
        howItWorks: [
          'Zero. That\'s the Texas income tax rate. Not "close to zero" or "effectively zero." Actually zero. The Texas Constitution bans a state income tax, so this isn\'t changing.',
          'Your only deductions are federal tax and FICA. Federal uses the 2026 progressive brackets (10%–37%) with standard deductions, plus 6.2% Social Security up to $176,100 and 1.45% Medicare on everything. No state line item on your pay stub. Period.',
          'I talk to people who moved from <a href="/california-tax-calculator">California</a> or <a href="/new-york-tax-calculator">New York</a> and they can\'t get over how much more shows up in their bank account on the same salary. A $100K earner in Texas takes home roughly $79,000. Same salary in California? More like $71,000. That\'s an $8,000 difference from state tax alone.',
          'But Texas gets you elsewhere. <a href="https://comptroller.texas.gov/" target="_blank" rel="noopener noreferrer nofollow">Property taxes</a> average about 1.71% of home value — on a $300,000 house that\'s roughly $5,130 a year. That\'s among the highest in the country. Sales tax runs around 8.2% combined with local add-ons. The income tax savings are real, but the full picture is more complicated than "Texas has no income tax so it\'s cheaper."',
          'If you\'re renting or own a modest home, Texas is hard to beat on taxes. But a $600K house changes the math — that property tax bill can eat into your income tax savings fast. Run the numbers. That\'s literally what this calculator is for.',
        ],
        keyRates: [
          { label: 'Texas State Income Tax', value: '0%' },
          { label: 'TX Avg Property Tax Rate', value: '~1.71%' },
          { label: 'TX Avg Combined Sales Tax', value: '8.2%' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
          { label: 'Social Security Rate', value: '6.2% (up to $176,100)' },
        ],
        faqs: TEXAS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'florida':
      return {
        howItWorks: [
          'Florida: zero state income tax, just like Texas. But the property tax picture is completely different, and that\'s where Florida pulls ahead for a lot of people.',
          'Your paycheck deductions in Florida are federal tax only (2026 progressive brackets with standard deductions) plus FICA at 7.65% combined. No state tax, no local wage tax, nothing extra. Someone making $100K in Florida takes home thousands more per year than the same salary in Illinois, California, or New York.',
          'Here\'s where Florida really wins though:\n- Average effective <a href="https://floridarevenue.com/" target="_blank" rel="noopener noreferrer nofollow">property tax rate</a> of just 0.86% (Texas is ~1.71%)\n- Homestead Exemption knocks up to $50,000 off your home\'s assessed value\n- On a $300,000 home: roughly $2,580 property tax in Florida vs $5,130 in Texas',
          'I think Florida wins for retirees. And it\'s not even close. Social Security benefits, 401(k) distributions, IRA withdrawals, pensions — all completely tax-free at the state level. Add in the Homestead Exemption keeping property taxes low, and your fixed income stretches a lot further than in most states.',
          'Florida funds government through a 6% state sales tax (averaging 7% with local surtaxes) and tourism taxes. Visitors pay a big chunk of the bill, which is a nice perk for residents. No estate tax, no inheritance tax either.',
          'Bottom line — if you\'re comparing zero-tax states, <a href="/texas-tax-calculator">Florida tends to beat Texas</a> for homeowners and retirees. Run both calculators and see the difference.',
        ],
        keyRates: [
          { label: 'Florida State Income Tax', value: '0%' },
          { label: 'FL Avg Property Tax Rate', value: '~0.86%' },
          { label: 'FL Avg Combined Sales Tax', value: '7.0%' },
          { label: 'Homestead Exemption', value: 'Up to $50,000' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: FLORIDA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'california':
      return {
        howItWorks: [
          'California has the highest state income tax in the country. Top rate is 13.3%, and it starts at $698,271 of taxable income for single filers. Even at a modest salary you\'re probably paying 6%–9.3% to the state. I won\'t pretend that doesn\'t sting.',
          'The state uses <a href="https://www.ftb.ca.gov/forms" target="_blank" rel="noopener noreferrer nofollow">nine progressive brackets</a>. Standard deduction for 2026 is $6,083 (single) or $12,166 (married). After that deduction, each slice of your income gets its own rate — 1% on the first $10,099, climbing all the way to 13.3% above $698,271. Same principle as federal brackets: only the income within each bracket gets that rate. On top of this, you\'re paying federal progressive brackets with the $16,100 standard deduction, plus FICA at 7.65%. Pre-tax deductions like <a href="/401k-retirement-calculator">401(k) contributions</a> are huge in California because they cut your taxable income at both federal and state level. At 13.3% for high earners, that state deduction is worth a lot.',
          'One thing that catches people off guard: California property taxes are actually pretty reasonable. Average effective rate around 0.71%. Proposition 13 caps annual assessed value increases at 2%, so your tax bill doesn\'t spiral even if your home\'s market value goes crazy. Of course, when the median house costs $800K, even a low rate gives you a hefty bill. And at least Social Security benefits aren\'t taxed by the state.',
          'A coworker of mine was offered a $130K job in San Francisco and almost took it without running the numbers. California state tax alone on that salary is roughly $8,500. The same job in <a href="/texas-tax-calculator">Texas</a>? $0 state tax. That\'s not chump change. <a href="/relocation-calculator">Do the math before you accept that offer</a>.',
        ],
        keyRates: [
          { label: 'CA Tax Brackets', value: '1% – 13.3% (9 brackets)' },
          { label: 'CA Standard Deduction (Single)', value: '$6,083' },
          { label: 'CA Top Marginal Rate Threshold', value: '$698,271 (single)' },
          { label: 'CA Avg Combined Sales Tax', value: '8.82%' },
          { label: 'CA Avg Property Tax Rate', value: '~0.71%' },
        ],
        faqs: CALIFORNIA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'newyork':
      return {
        howItWorks: [
          'New York takes a lot out of your paycheck. <a href="https://www.tax.ny.gov/" target="_blank" rel="noopener noreferrer nofollow">State income tax</a> runs from 4% to 10.9% across nine brackets, and if you live in NYC, there\'s an additional city tax (3.078%–3.876%) on top. NYC residents face the highest combined state and local income tax in the US.',
          'NY\'s standard deduction is $8,100 for single filers, $16,200 for married filing jointly — actually higher than California\'s, which is something. The top 10.9% rate doesn\'t kick in until $25,000,000 of taxable income, so most earners are in the 6%–8% range.',
          'That NYC tax though. If you live in any of the five boroughs, the city takes an additional 3.078%–3.876%. On $100,000, that\'s roughly $3,400 that people in literally any other US city don\'t pay. I\'ve seen friends reconsider job offers after factoring in the city tax. It\'s a toggle in this calculator for a reason — it makes a huge difference.',
          'One bright spot: New York doesn\'t tax Social Security, and excludes up to $20,000 of retirement income (pensions, 401(k), IRA) for taxpayers 59½ and older. Property taxes average 1.62% and combined sales tax is about 8.52%. Not great. But also not the worst part about living here.',
          'Winner for lowest total tax burden? Not New York, obviously. But if you\'re here for the career or the city, at least you can <a href="/compare">see exactly what it costs you compared to other states</a>.',
        ],
        keyRates: [
          { label: 'NY Tax Brackets', value: '4% – 10.9% (9 brackets)' },
          { label: 'NY Standard Deduction (Single)', value: '$8,100' },
          { label: 'NYC Income Tax', value: '3.078% – 3.876%' },
          { label: 'NY Avg Property Tax Rate', value: '~1.62%' },
          { label: 'NY Avg Combined Sales Tax', value: '8.52%' },
        ],
        faqs: NEWYORK_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% tax)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'mortgage':
      return {
        howItWorks: [
          'Your monthly mortgage payment comes from a formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]. P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is total payments (years × 12). It spits out a fixed payment that pays off every penny by the end of the term. Simple enough. What surprises people is how that payment breaks down. On a 30-year, $280,000 loan at 6.5%, your first payment is roughly 86% interest and only 14% principal. You feel like you\'re treading water. By year 15 it\'s about 50/50, and in the final years nearly everything goes to principal. My brother bought his first house in 2019 and called me panicked after seeing his first amortization statement — "I\'m basically just paying interest!" Yeah. That\'s how it works at first. Stick with it.',
          'Extra payments go 100% toward principal. Every dollar you add saves you interest for the remaining life of the loan. Adding $200/month extra on that $280K loan at 6.5% saves roughly $76,856 in interest and pays it off more than 5 years early. Compound interest working for you instead of against you, for once.',
          'We generate a full amortization schedule — month by month, principal vs interest, remaining balance. For a detailed walkthrough, check the <a href="https://www.consumerfinance.gov/consumer-tools/mortgages" target="_blank" rel="noopener noreferrer nofollow">CFPB mortgage resources</a>. Key things to keep in mind:\n- Recommended housing cost ratio: no more than 28% of gross income\n- 20% down payment avoids PMI entirely\n- Common loan terms are 15, 20, or 30 years\n- Even small extra payments make a big difference over 30 years',
        ],
        keyRates: [
          { label: 'Formula', value: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]' },
          { label: 'Common Loan Terms', value: '15, 20, or 30 years' },
          { label: 'Current Avg 30-Year Rate', value: '~6.5% (varies)' },
          { label: 'Recommended Housing Ratio', value: '≤28% of gross income' },
          { label: 'Typical Down Payment', value: '20% (avoids PMI)' },
        ],
        faqs: MORTGAGE_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'retirement':
      return {
        howItWorks: [
          'Start early. That\'s the whole game with retirement savings. This calculator estimates your 401(k) balance at retirement based on contributions, employer match, expected returns, and years left to save. The earlier you begin, the less you need to put in each year.',
          'The math is future value of a series. Each year\'s contribution grows at your assumed annual return for every remaining year until retirement. Year 1 grows for the full period. Year 10 grows for 10 fewer years. Add it all up — that\'s your projected balance. The concept is straightforward. The results can be surprising. Someone who starts at 25 and contributes $500/month with a 7% return ends up with roughly $1.2 million by 65. Start at 35 with the same contributions? About $567,000. Ten years of delay costs you over $600K. That\'s compound growth for you — brutal if you\'re late, powerful if you\'re early.',
          'The employer match is free money. Typical structure: 50% match up to 6% of salary. Make $100K, contribute 6% ($6,000), employer adds $3,000. If you\'re not contributing enough to get the full match, you\'re throwing away thousands every year.',
          'For 2026, the <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" target="_blank" rel="noopener noreferrer nofollow">401(k) contribution limit is $23,500</a>. Catch-up contribution for ages 50+ is another $7,500. Ages 60-63 get an even bigger catch-up of $11,250. The calculator defaults to 7% annual return, which is a reasonable long-term assumption for a diversified stock portfolio. Real returns bounce around — up 20% some years, down 15% others — but 7% is a solid planning number over decades.',
          'RMD age is 73. That\'s when the IRS makes you start withdrawing. But that\'s a problem for future you.',
        ],
        keyRates: [
          { label: '2026 Contribution Limit', value: '$23,500' },
          { label: 'Catch-Up (Age 50+)', value: '+$7,500' },
          { label: 'Catch-Up (Age 60-63)', value: '+$11,250' },
          { label: 'Assumed Annual Return', value: '7% (default)' },
          { label: 'RMD Age', value: '73' },
        ],
        faqs: RETIREMENT_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (retirees)' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'relocation':
      return {
        howItWorks: [
          'My sister got a job offer in San Francisco that paid $15,000 more than her Chicago salary. Sounded great until she ran the numbers. After California state tax and higher housing costs, she\'d actually have less money left over. That\'s exactly what this calculator prevents. It tells you the salary you\'d need in a new state to match your current take-home pay.',
          'How it works: first we calculate your current take-home after federal tax, FICA, and your state\'s income tax. Then we figure out what gross salary in the target state would give you the same net pay, accounting for that state\'s tax rates and deductions.',
          'Let\'s look at a real example. $100,000 in Texas (0% state tax) gets you roughly $79,000 take-home. To end up with the same $79,000 in California, you\'d need to earn about $120,000–$125,000. California\'s progressive income tax eats an extra $5,000–$8,000 that Texas doesn\'t touch. That\'s a car payment, a vacation, or a decent chunk of retirement savings — just gone to state tax.',
          'This tool focuses on income tax differences. But look, income tax isn\'t the whole story:\n- Property taxes: <a href="/texas-tax-calculator">Texas</a> is brutal (~1.71%), <a href="/california-tax-calculator">California</a> is surprisingly mild (~0.71%)\n- Sales taxes vary significantly by state and city\n- Housing costs are the big one — $1,500/month in Houston can be $3,000 in San Francisco\nCheck our <a href="/compare">state comparison pages</a> for the full picture.',
        ],
        keyRates: [
          { label: 'States Covered', value: 'IL, TX, FL, CA, NY' },
          { label: 'IL Flat Rate', value: '4.95%' },
          { label: 'TX / FL Rate', value: '0%' },
          { label: 'CA Top Rate', value: '13.3%' },
          { label: 'NY Top Rate (+ NYC)', value: '10.9% + 3.876%' },
        ],
        faqs: RELOCATION_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'capital-gains':
      return {
        howItWorks: [
          'How long you hold an investment changes everything about the tax bill. Short-term gains (held a year or less) get taxed as ordinary income — up to 37%. Long-term gains (held more than a year) qualify for <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer nofollow">0%, 15%, or 20%</a>. On a $50,000 gain, the difference between short-term and long-term rates can be thousands of dollars.',
          'For 2026, the 0% long-term rate applies if your total taxable income (including the gain) is under $47,025 (single) or $94,050 (married). The 15% rate covers most people, up to $518,900 (single) or $583,750 (married). Above that, it\'s 20%. These brackets are based on your total taxable income, not just the gain — so your salary can push you into a higher capital gains bracket.',
          'Don\'t forget the Net Investment Income Tax (NIIT). That\'s an extra 3.8% on top when your MAGI exceeds $200,000 (single) or $250,000 (married).',
          'A guy I know sold some stock after 11 months because he wanted the cash for a down payment. Held it just 3 more weeks and he would\'ve qualified for long-term rates. Cost him about $4,000 in extra tax. That one still stings.',
          'The effective top rate on long-term gains is 23.8% (20% + 3.8% NIIT), not the 20% most people quote. We factor in your ordinary income to figure out which bracket your gains fall into, and we show you the NIIT impact too.',
          'Common tax-saving strategies worth knowing:\n- Tax-loss harvesting: offset gains with losses to reduce your tax bill\n- Watch your holding period: sometimes waiting a few weeks saves you thousands\n- Donate appreciated assets to charity: you deduct the full value and never pay capital gains on it\nSmall decisions, big savings.',
        ],
        keyRates: [
          { label: 'Short-Term Rate', value: 'Ordinary income (up to 37%)' },
          { label: 'Long-Term Rates', value: '0% / 15% / 20%' },
          { label: 'NIIT Rate', value: '3.8% (above $200K/$250K)' },
          { label: '0% Bracket (Single)', value: 'Up to $47,025 taxable' },
          { label: 'Top Effective Rate (incl. NIIT)', value: '23.8%' },
        ],
        faqs: CAPITAL_GAINS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'self-employment':
      return {
        howItWorks: [
          '15.3%. That\'s the <a href="https://www.irs.gov/taxtopics/tc554" target="_blank" rel="noopener noreferrer nofollow">self-employment tax rate</a>, and if you just went freelance, it\'s probably higher than you expected. It covers both halves of Social Security (12.4%) and Medicare (2.9%) — the half your employer used to pay plus the half that always came out of your paycheck. Nobody warned me about this when I started consulting. It\'s a punch in the wallet.',
          'Here\'s a small relief: you don\'t pay 15.3% on 100% of your income. It\'s calculated on 92.35% of your net business income, which roughly accounts for the employer-half deduction that W-2 workers get automatically. So on $100,000 of net SE income, the tax base is $92,350 and the SE tax comes to roughly $14,130. Still hurts, but less than you might have feared at first glance. And you can deduct half of your SE tax ($7,065 in this example) as an above-the-line deduction. It doesn\'t reduce the SE tax itself, but it lowers your AGI, which means less federal and state income tax. Every bit counts.',
          'Quick reference for what you\'re dealing with:\n- Social Security portion: 12.4% on income up to $176,100\n- Medicare portion: 2.9% on everything, no cap\n- Additional Medicare: 0.9% on income above $200,000\n- Half of SE tax is deductible above the line',
          'Quarterly estimated payments. This is where new freelancers get into trouble. You have to send the IRS money four times a year — April 15, June 15, September 15, January 15 — or face penalties. The safe harbor is paying at least 100% of last year\'s tax liability (110% if your AGI was over $150,000) or 90% of this year\'s. We estimate those quarterly amounts so there are no ugly surprises in April. Seriously, don\'t skip estimated payments. The penalties aren\'t worth it.\n\nWant to see how self-employment income compares to a W-2 salary? <a href="/salary">Check our salary after tax pages</a> to compare take-home pay at every income level across all 5 states.',
        ],
        keyRates: [
          { label: 'SE Tax Rate', value: '15.3% on 92.35% of net income' },
          { label: 'Social Security Portion', value: '12.4% (up to $176,100)' },
          { label: 'Medicare Portion', value: '2.9% (no cap)' },
          { label: 'Additional Medicare', value: '0.9% (above $200K)' },
          { label: 'Half SE Tax Deduction', value: 'Above-the-line' },
        ],
        faqs: SELF_EMPLOYMENT_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'tax-refund':
      return {
        howItWorks: [
          'Your tax refund is simply the difference between what was withheld from your paychecks throughout the year and what you actually owe in taxes. If your employer withheld more than your total tax bill, the government sends you a refund. If they withheld less, you write a check. This <a href="/tax-refund-calculator">tax refund calculator</a> helps you figure out which scenario you\'re looking at before you file.',
          'The calculation goes like this: start with your total income, subtract deductions (standard or itemized) to get taxable income, apply the federal tax brackets, subtract any credits you qualify for, and that\'s your federal tax owed. Compare it to what was already withheld. The difference is your refund — or your balance due.',
          'The standard deduction for 2026 is $16,100 (single), $32,200 (married filing jointly), or $24,150 (head of household). Most people take the standard — about 90% of taxpayers. But if you have significant mortgage interest, charitable donations, or state/local taxes (SALT, capped at $10,000), itemizing might save you more. This calculator lets you try both.',
          'Tax credits are better than deductions — they reduce your tax bill dollar for dollar, while deductions only reduce your taxable income. The <a href="https://www.irs.gov/credits-deductions/individuals/child-tax-credit" target="_blank" rel="noopener noreferrer nofollow">Child Tax Credit</a> gives you $2,000 per qualifying child (up to $1,700 refundable). The Earned Income Credit can be worth up to $7,430 for families with three or more children. These credits can turn a small refund into a big one.',
          'A quick note on refund timing: if you e-file and choose direct deposit, most refunds arrive within 21 days. Paper returns take 6–8 weeks. The IRS typically starts accepting returns in late January, and filing early usually means faster processing. Just make sure you have all your documents (W-2, 1099, etc.) before you file.',
        ],
        keyRates: [
          { label: 'Standard Deduction (Single)', value: '$16,100' },
          { label: 'Standard Deduction (Married)', value: '$32,200' },
          { label: 'Child Tax Credit', value: '$2,000/child' },
          { label: 'Refundable Portion', value: 'Up to $1,700' },
          { label: 'EIC Max (3+ children)', value: '$7,430' },
        ],
        faqs: TAX_REFUND_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: '401k-retirement-calculator', label: '401(k) Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
        ],
      };
    case 'sales-tax':
      return {
        howItWorks: [
          'Sales tax is the tax you pay on purchases — it\'s added at the register and calculated by multiplying the purchase price by the combined tax rate for your area. The combined rate includes both the state base rate and any local taxes (county, city, special district). On a $1,000 purchase in California at 8.82% combined rate, you pay $88.20 in sales tax for a total of $1,088.20.',
          'Four states charge 0% state sales tax: <a href="https://www.taxadmin.org/" target="_blank" rel="noopener noreferrer nofollow">Delaware, Montana, New Hampshire, and Oregon</a>. Alaska has no state sales tax but allows local taxes, resulting in a low average combined rate of about 1.82%. On the other end, Louisiana and Tennessee tie for the highest average combined rate at 9.56%.',
          'Local taxes make a real difference. The state base rate might be 6%, but your county and city can add another 2-3% on top. That\'s why the same purchase can cost different amounts depending on exactly where you are within a state. Our calculator uses average combined rates for each state to give you the most realistic estimate.',
          'Need to figure out the original price before tax from a receipt? That\'s the reverse sales tax calculation. Divide the total by (1 + tax rate). A $108.82 total in California = $108.82 ÷ 1.0882 = $100.00 original price. This comes in handy for expense reports and accounting.',
          'Since the 2018 <a href="https://www.supremecourt.gov/" target="_blank" rel="noopener noreferrer nofollow">Supreme Court decision in South Dakota v. Wayfair</a>, states can require online retailers to collect sales tax even without a physical presence. So most online purchases now include sales tax based on your location. Some states also have sales tax holidays — temporary periods where certain items (like back-to-school supplies) are exempt from sales tax.',
        ],
        keyRates: [
          { label: 'Average US Combined Rate', value: '~6.6%' },
          { label: 'Highest Combined Rate', value: '9.56% (LA/TN)' },
          { label: 'No Sales Tax States', value: 'DE, MT, NH, OR' },
          { label: 'CA Combined Rate', value: '8.82%' },
          { label: 'TX Combined Rate', value: '8.20%' },
        ],
        faqs: SALES_TAX_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'overtime':
      return {
        howItWorks: [
          'Overtime pay is calculated at 1.5x your regular hourly rate for hours worked beyond 40 in a week — that\'s the federal standard under the <a href="https://www.dol.gov/agencies/whd/flsa" target="_blank" rel="noopener noreferrer nofollow">Fair Labor Standards Act</a>. So if you make $30/hour, your OT rate is $45/hour. Sounds great until you see the taxes. Overtime is taxed as ordinary income at your marginal federal rate, plus FICA (7.65%), plus state income tax. For someone in the 22% federal bracket in a state like Illinois, the combined hit on OT earnings can approach 35%. That $45/hour OT becomes more like $29/hour after taxes.',
          'Here\'s the thing most people miss: overtime gets taxed at your marginal rate, not your effective rate. Your effective rate is the blended average across all brackets. But OT income stacks on top of your regular income, so it fills the highest bracket first. If your regular salary puts you at the top of the 12% bracket, every OT dollar is taxed at 22% federally. That\'s a big jump. Still, even at a higher tax rate, overtime puts more money in your pocket — just not as much as the gross number suggests.',
          'Some states have proposed eliminating state income tax on overtime pay, but as of 2026, no state has enacted such a law. Federal tax on overtime remains unchanged. Your best strategy is knowing your marginal rate before you volunteer for extra shifts so you can make an informed decision about whether the after-tax pay is worth the extra hours.',
          'A quick example: earning $20/hour with 10 hours of OT per week means an extra $300/week in gross OT pay. In a 22% federal bracket with 7.65% FICA and no state tax, you\'d keep about $211 of that $300. In Illinois with 4.95% state tax, you\'d keep about $196. Over a year of consistent OT, that\'s $10,000–$11,000 extra take-home — real money, but significantly less than the $15,600 gross.',
        ],
        keyRates: [
          { label: 'OT Pay Rate', value: '1.5x regular rate' },
          { label: 'Federal Tax on OT', value: 'At marginal rate (10%–37%)' },
          { label: 'FICA Rate', value: '7.65%' },
          { label: 'Typical Combined Tax on OT', value: '25%–35%' },
          { label: 'FLSA OT Threshold', value: 'After 40 hours/week' },
        ],
        faqs: OVERTIME_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'bonus-tax-calculator', label: 'Bonus Tax Calculator' },
          { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'georgia':
      return {
        howItWorks: [
          'Georgia charges a flat 5.49% income tax rate for 2026. That\'s it — one rate for everybody, whether you\'re making $40K or $400K. The state moved to a flat tax system recently, and the rate has been gradually decreasing. Georgia offers a standard deduction of $5,400 for single filers and $7,100 for married filing jointly, which comes off the top before the 5.49% applies. On a $75,000 salary (single), you\'re taxed on $69,600 after the deduction, which comes to about $3,821 in state tax.',
          'On top of Georgia state tax, you\'ve got the federal progressive brackets with the $16,100 standard deduction, plus FICA at 7.65% combined. So for a single person earning $75,000, the total tax picture looks like this: roughly $7,670 federal, $5,738 FICA, and $3,821 Georgia state tax. That leaves you with about $57,771 take-home — an effective total tax rate of about 23.0%.',
          'Georgia does offer some tax benefits worth noting. Social Security income is not taxed at the state level, and retirees aged 62+ can exclude up to $35,000 of retirement income ($70,000 for couples). That makes Georgia surprisingly competitive for retirees compared to states with higher flat rates like Illinois at 4.95% (though Illinois has a broader retirement income exemption). Property taxes in Georgia average about 0.87% — quite reasonable compared to the national average of 1.1%.',
          'If you\'re considering a move to Georgia, the flat tax is predictable and easier to plan around than progressive brackets. Compare it to <a href="/california-tax-calculator">California\'s 13.3% top rate</a> or <a href="/new-york-tax-calculator">New York\'s 10.9%</a> and the savings are significant for high earners. <a href="/relocation-calculator">Run the relocation calculator</a> to see the difference for your salary.',
        ],
        keyRates: [
          { label: 'Georgia Flat Tax Rate', value: '5.49%' },
          { label: 'GA Standard Deduction (Single)', value: '$5,400' },
          { label: 'GA Standard Deduction (Married)', value: '$7,100' },
          { label: 'GA Avg Property Tax Rate', value: '~0.87%' },
          { label: 'Retirement Income Exclusion (62+)', value: 'Up to $35,000' },
        ],
        faqs: GEORGIA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator (4.95%)' },
          { slug: 'virginia-tax-calculator', label: 'Virginia Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'lottery':
      return {
        howItWorks: [
          'Won the lottery? Congratulations — now let\'s talk about the tax bill. The IRS treats lottery winnings as ordinary income, and the withholding is 24% federal for winnings over $5,000. But here\'s the catch: 24% is just the withholding, not your actual tax rate. If your total income (winnings + salary + other income) puts you in the 32% or 37% bracket, you\'ll owe the difference when you file your return. On a $1 million prize, the 24% withholding is $240,000, but if your total tax rate is 37%, you owe another $130,000 at tax time.',
          'State taxes on lottery winnings vary widely. Some states — like California, Florida, Pennsylvania, and Texas — don\'t tax lottery winnings at all at the state level. Others, like New York, hit you with up to 10.9% state tax plus 3.876% NYC tax if you\'re a city resident. On a $1 million win in NYC, you could lose nearly 50% to combined federal, state, and city taxes. That\'s why where you live matters enormously when you win.',
          'Lump sum vs. annuity is the big decision. Most lotteries advertise the annuity total (e.g., "$100 million"), but the lump sum is typically about 50-60% of that. A $100 million annuity might have a $50 million lump sum. After 24% federal withholding on $50 million, that\'s $38 million. After the full 37% federal rate, it\'s $31.5 million. After state tax, it could be $27 million or less. The annuity spreads the tax hit over 30 years, which can keep you in lower brackets — but you\'re locked into the payment schedule.',
          'Don\'t forget that some states also have local taxes on top. And if you\'re thinking about moving to a no-tax state before claiming your prize — most states tax based on where the ticket was purchased, not where you live when you claim it. Always consult a tax professional before claiming a major prize.',
        ],
        keyRates: [
          { label: 'Federal Withholding', value: '24% (on winnings over $5K)' },
          { label: 'Top Federal Marginal Rate', value: '37%' },
          { label: 'States with No Lottery Tax', value: 'CA, FL, PA, TX, and more' },
          { label: 'Lump Sum vs Annuity', value: 'Lump sum ~50-60% of annuity total' },
          { label: 'NYC Combined Tax on Winnings', value: 'Up to ~50% total' },
        ],
        faqs: LOTTERY_TAX_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'irs-withholding':
      return {
        howItWorks: [
          'Your W-4 form tells your employer how much federal tax to withhold from each paycheck. Too much withholding means a big refund but less money in each paycheck. Too little means bigger paychecks but a tax bill — and possibly penalties — in April. This calculator helps you find the sweet spot based on <a href="https://www.irs.gov/publications/p15t" target="_blank" rel="noopener noreferrer nofollow">IRS Publication 15-T</a>.',
          'The current W-4 (redesigned in 2020) no longer uses allowances. Instead, you enter your expected deductions, other income, and tax credits directly. The form has five steps: personal info, multiple jobs/spouse working, dependents, other adjustments, and signature. Most people only need Step 1 and Step 5. Steps 2-4 are for situations that make your withholding less straightforward.',
          'The safe harbor rule is your friend. To avoid underpayment penalties, you need to have withheld at least 90% of this year\'s tax liability OR 100% of last year\'s tax liability (110% if your AGI was over $150,000). If you owed less than $1,000 in tax for the year, you\'re also safe. The calculator shows you whether you\'re on track to meet the safe harbor, which is far more useful than just aiming for a refund.',
          'Common W-4 mistakes: not updating after getting married, having a second job, or having investment income. Each of these can throw off your withholding significantly. If you and your spouse both work and both check "Married" on your W-4 without accounting for the other\'s income, you\'ll almost certainly underpay. The fix is either Step 2 on the W-4 or using this calculator to figure out the right additional withholding amount.',
        ],
        keyRates: [
          { label: 'Standard Deduction (Single)', value: '$16,100' },
          { label: 'Standard Deduction (Married)', value: '$32,200' },
          { label: 'Safe Harbor (Prior Year)', value: '100% of last year\'s tax' },
          { label: 'Safe Harbor (High Income)', value: '110% if AGI > $150K' },
          { label: 'De Minimis Threshold', value: 'Owe less than $1,000 = no penalty' },
        ],
        faqs: IRS_WITHHOLDING_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'overtime-tax-calculator', label: 'Overtime Tax Calculator' },
          { slug: 'bonus-tax-calculator', label: 'Bonus Tax Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'property-tax':
      return {
        howItWorks: [
          'Property tax is calculated by multiplying your home\'s assessed value by the local effective tax rate. Simple formula, complicated reality. Your assessed value might not match your market value — some states assess at 100% of market value, others use a fraction. Illinois, for example, assesses residential property at about 10% of market value in Cook County. The rate itself varies enormously: New Jersey averages 2.49%, while Hawaii sits at 0.29%. On a $400,000 home, that\'s the difference between $9,960/year and $1,160/year. Same house value, wildly different tax bill.',
          'The national average effective property tax rate is about 1.1%. On a $300,000 home, that\'s roughly $3,300 per year or $275/month — often rolled into your mortgage payment via escrow. The states with the highest rates tend to be in the Northeast (New Jersey, Illinois, New Hampshire), while the lowest are in the South and West (Hawaii, Alabama, Colorado). But low property tax states often compensate with higher sales or income taxes, so the total tax burden tells a different story.',
          'Homestead exemptions can reduce your bill significantly. Florida knocks up to $50,000 off your assessed value if the property is your primary residence. Texas offers a $100,000 homestead exemption (increased in 2023). Some states also offer property tax freezes for seniors, disabled residents, or veterans. These exemptions aren\'t automatic — you have to apply for them, and many homeowners leave money on the table by not filing.',
          'Property taxes fund local services: schools, police, fire departments, road maintenance, and more. When you compare property taxes between areas, you\'re also comparing the quality and funding level of those services. A low rate in a rural county might mean underfunded schools. A high rate in a wealthy suburb might mean excellent public schools. The value you get matters as much as the amount you pay.',
          'This calculator uses average effective property tax rates for each state. Your actual rate depends on your specific county, city, school district, and any special assessment districts. Check your county tax assessor\'s website for the most precise rate for your address.',
        ],
        keyRates: [
          { label: 'US Average Effective Rate', value: '~1.1%' },
          { label: 'Highest Rate (NJ)', value: '~2.49%' },
          { label: 'Lowest Rate (HI)', value: '~0.29%' },
          { label: 'TX Avg Rate', value: '~1.71%' },
          { label: 'FL Avg Rate', value: '~0.86%' },
        ],
        faqs: PROPERTY_TAX_FAQS,
        relatedCalculators: [
          { slug: 'mortgage-calculator', label: 'Mortgage Calculator' },
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'bonus-tax':
      return {
        howItWorks: [
          'Your year-end bonus is considered supplemental wages by the IRS, and there are two ways your employer can tax it. The flat rate method withholds 22% federally for bonuses under $1 million. That\'s simple and predictable — a $5,000 bonus gets $1,100 withheld for federal tax. The aggregate method combines your bonus with your regular paycheck and calculates withholding as if it\'s all regular income, which can push you into a higher withholding bracket temporarily.',
          'Here\'s where it gets interesting: the 22% flat rate is just the withholding, not your actual tax. If your total income puts you in the 24% or 32% bracket, you\'ll owe the difference when you file. On a $10,000 bonus, 22% withholding is $2,200. If your actual rate is 32%, you owe $3,200 — that\'s an extra $1,000 come tax time. On the other hand, if you\'re in the 12% bracket, you\'ll get a refund of the difference. The withholding is a prepayment, not the final bill.',
          'For bonuses over $1 million, the mandatory federal withholding rate jumps to 37%. Yes, 37% off the top for anything above that first million. Plus FICA at 7.65% on the full amount, plus state taxes. A $2 million bonus in California could see total withholding above 50%. That\'s why compensation packages for executives often include tax gross-ups — the company pays the tax on the tax.',
          'State taxes on bonuses follow the same rules as regular income. In a zero-income-tax state like Texas or Florida, you only pay federal withholding and FICA on your bonus. In California, add up to 13.3% state tax. The difference between receiving a $10,000 bonus in Texas vs California is roughly $1,000 in state tax alone. <a href="/relocation-calculator">Location matters</a>.',
        ],
        keyRates: [
          { label: 'Federal Flat Withholding', value: '22% (under $1M)' },
          { label: 'Federal Rate (over $1M)', value: '37%' },
          { label: 'FICA Rate', value: '7.65%' },
          { label: 'Aggregate Method', value: 'Combined with regular wages' },
          { label: 'Actual Tax vs Withholding', value: 'Reconcile at tax time' },
        ],
        faqs: BONUS_TAX_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'overtime-tax-calculator', label: 'Overtime Tax Calculator' },
          { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
          { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'virginia':
      return {
        howItWorks: [
          'Virginia uses a progressive income tax with four brackets ranging from 2% to 5.75%. The 2% rate applies to your first $3,000 of taxable income (single) or $6,000 (married), then 3% up to $5,000/$10,000, 5% up to $17,000/$34,000, and 5.75% on everything above that. For most working professionals, the majority of your income falls into the 5.75% bracket. Virginia\'s standard deduction is $8,000 for single filers and $16,000 for married filing jointly — actually quite generous compared to states like California ($6,083) or Illinois (which has no standard deduction, just a $2,775 personal exemption).',
          'Let\'s run a real example. A single person earning $80,000 in Virginia: after the $8,000 standard deduction, taxable income is $72,000. Virginia tax comes to roughly $3,762.50. Add federal tax of about $9,660 and FICA of $6,120, and total taxes are about $19,542 — leaving you with roughly $60,458 take-home. That\'s an effective total tax rate of about 24.4%. Not bad compared to <a href="/california-tax-calculator">California</a> or <a href="/new-york-tax-calculator">New York</a>.',
          'Virginia has some decent tax benefits. Social Security benefits are fully exempt from state tax. Military pay is also exempt for Virginia National Guard members (up to $3,000) and active duty pay is exempt for those serving in a combat zone. The state also offers a deduction for long-term capital gains from certain qualifying investments. Property taxes average about 0.82%, which is below the national average of 1.1%.',
          'One thing to watch: Virginia doesn\'t allow local income taxes, unlike some states where cities or counties add their own tax on top. What you see at the state level is what you pay. That\'s different from <a href="/new-york-tax-calculator">New York City\'s 3.876% city tax</a> or the local taxes in some Pennsylvania and Ohio municipalities.',
        ],
        keyRates: [
          { label: 'VA Tax Brackets', value: '2% – 5.75% (4 brackets)' },
          { label: 'VA Standard Deduction (Single)', value: '$8,000' },
          { label: 'VA Standard Deduction (Married)', value: '$16,000' },
          { label: 'VA Avg Property Tax Rate', value: '~0.82%' },
          { label: 'Social Security Tax', value: 'Exempt' },
        ],
        faqs: VIRGINIA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'georgia-tax-calculator', label: 'Georgia Calculator (5.49%)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator (4.95%)' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'northcarolina':
      return {
        howItWorks: [
          'North Carolina charges a flat 4.5% income tax rate for 2026. One rate, no brackets, no surprises. The state has been steadily reducing its flat rate over the past few years, dropping from 5.25% down to the current 4.5%. North Carolina offers a standard deduction of $12,750 for single filers and $25,500 for married filing jointly — that\'s one of the highest state standard deductions in the country, which softens the impact of the flat rate considerably.',
          'Let\'s run the numbers. A single person earning $75,000: after the $12,750 standard deduction, taxable income is $62,250. North Carolina tax comes to $2,801.25. Add federal tax and FICA, and you\'re looking at roughly $58,500 take-home. That\'s competitive with most flat-tax states, and the generous standard deduction means lower-income earners pay very little state tax.',
          'North Carolina doesn\'t tax Social Security benefits at the state level, which is good news for retirees. Property taxes average about 0.82% — quite reasonable. The combined state and local sales tax averages around 7.1%. Compared to <a href="/georgia-tax-calculator">Georgia\'s 5.49%</a> or <a href="/illinois-tax-calculator">Illinois\' 4.95%</a>, North Carolina\'s 4.5% rate is actually the lowest among neighboring flat-tax states. <a href="/relocation-calculator">Run the relocation calculator</a> to compare for your specific salary.',
        ],
        keyRates: [
          { label: 'NC Flat Tax Rate', value: '4.5%' },
          { label: 'NC Standard Deduction (Single)', value: '$12,750' },
          { label: 'NC Standard Deduction (Married)', value: '$25,500' },
          { label: 'NC Avg Property Tax Rate', value: '~0.82%' },
          { label: 'NC Avg Combined Sales Tax', value: '~7.1%' },
        ],
        faqs: NORTHCAROLINA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'georgia-tax-calculator', label: 'Georgia Calculator (5.49%)' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator (4.95%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'pennsylvania':
      return {
        howItWorks: [
          'Pennsylvania has a flat 3.07% income tax rate — one of the lowest flat rates in the country. The catch? There\'s no state standard deduction and no personal exemption. Every dollar of taxable income gets hit with 3.07%, period. For a $75,000 salary, that\'s $2,302.50 in state tax. The low rate helps, but the lack of deductions means the tax applies to your full income from dollar one.',
          'On top of the state tax, Pennsylvania allows local earned income taxes (EIT) that vary by municipality. Philadelphia is the big one — residents pay an additional 3.75% city wage tax (non-residents working in Philly pay 3.44%). That brings the combined state and city rate to 6.82% for Philadelphia residents, which is more than double the base state rate. Most other municipalities have much lower EIT rates, typically 1%–2%.',
          'Pennsylvania doesn\'t tax Social Security benefits or most retirement income, including pensions and 401(k) distributions for residents 59½ and older. Property taxes average about 1.36%, which is above the national average. Combined sales tax is 6% statewide with some local add-ons. At 3.07% base rate, Pennsylvania is attractive for earners outside Philadelphia — <a href="/relocation-calculator">compare it to neighboring states</a> like <a href="/new-jersey-tax-calculator">New Jersey</a> or <a href="/ohio-tax-calculator">Ohio</a> to see the difference.',
        ],
        keyRates: [
          { label: 'PA Flat Tax Rate', value: '3.07%' },
          { label: 'PA Standard Deduction', value: 'None' },
          { label: 'Philadelphia Wage Tax', value: '3.75% (residents)' },
          { label: 'PA Avg Property Tax Rate', value: '~1.36%' },
          { label: 'PA State Sales Tax', value: '6%' },
        ],
        faqs: PENNSYLVANIA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'new-jersey-tax-calculator', label: 'New Jersey Calculator' },
          { slug: 'ohio-tax-calculator', label: 'Ohio Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'ohio':
      return {
        howItWorks: [
          'Ohio uses a progressive income tax with brackets ranging from 0% to 3.99% for 2026. The first $26,050 of taxable income is completely tax-free at the state level — that\'s a significant exemption that benefits low and middle-income earners. After that, rates climb through several brackets up to 3.99% on income above $115,300. The standard deduction is $0, but that first $26,050 exemption more than makes up for it for most people.',
          'Here\'s how it works in practice. A single person earning $75,000: after the $26,050 exempt amount, roughly $48,950 is subject to Ohio\'s progressive brackets. The Ohio tax comes to about $2,050 — significantly less than a flat 4% would suggest because of that large tax-free threshold. Add federal tax and FICA, and you\'re looking at a competitive take-home amount.',
          'Ohio does allow municipal income taxes, which can range from 0.5% to 3% depending on where you live and work. Columbus charges 2.5%, Cleveland 2.5%, Cincinnati 1.8%. These local taxes are on top of the state rate, so the actual combined rate can be noticeably higher. Social Security benefits are not taxed at the state level, and property taxes average about 1.41%. <a href="/relocation-calculator">Compare Ohio to neighbors</a> like <a href="/pennsylvania-tax-calculator">Pennsylvania (3.07%)</a> or <a href="/michigan-tax-calculator">Michigan (4.25%)</a> to see how it stacks up.',
        ],
        keyRates: [
          { label: 'OH Tax Brackets', value: '0% – 3.99% (4 brackets)' },
          { label: 'OH Tax-Free Threshold', value: '$26,050' },
          { label: 'OH Top Rate Threshold', value: '$115,300' },
          { label: 'OH Avg Property Tax Rate', value: '~1.41%' },
          { label: 'Columbus City Tax', value: '2.5%' },
        ],
        faqs: OHIO_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'pennsylvania-tax-calculator', label: 'Pennsylvania Calculator' },
          { slug: 'michigan-tax-calculator', label: 'Michigan Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'michigan':
      return {
        howItWorks: [
          'Michigan charges a flat 4.25% income tax rate for 2026. Simple, predictable, and easy to calculate. Michigan offers a $5,500 personal exemption for single filers and $11,000 for married filing jointly, which comes off the top before the 4.25% applies. On a $75,000 salary (single), you\'re taxed on $69,500 after the exemption, which comes to $2,953.75 in state tax.',
          'On top of Michigan state tax, the city of Detroit levies its own income tax: 2.4% for residents and 1.2% for non-residents working in the city. A few other Michigan cities also have local income taxes (Grand Rapids at 1.5% for residents, for example), but most of the state doesn\'t. If you\'re outside those cities, it\'s just the 4.25% flat rate plus federal and FICA.',
          'Michigan doesn\'t tax Social Security benefits, and military pensions are fully exempt. Property taxes average about 1.38%, which is somewhat high. The state sales tax is 6% with no local add-ons (Michigan is one of the few states that doesn\'t allow local sales taxes). At 4.25%, Michigan\'s rate sits between <a href="/illinois-tax-calculator">Illinois (4.95%)</a> and <a href="/pennsylvania-tax-calculator">Pennsylvania (3.07%)</a>. <a href="/relocation-calculator">Use the relocation calculator</a> to compare for your salary.',
        ],
        keyRates: [
          { label: 'MI Flat Tax Rate', value: '4.25%' },
          { label: 'MI Personal Exemption', value: '$5,500' },
          { label: 'Detroit City Tax (Residents)', value: '2.4%' },
          { label: 'MI Avg Property Tax Rate', value: '~1.38%' },
          { label: 'MI State Sales Tax', value: '6% (no local)' },
        ],
        faqs: MICHIGAN_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator (4.95%)' },
          { slug: 'ohio-tax-calculator', label: 'Ohio Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'newjersey':
      return {
        howItWorks: [
          'New Jersey has a progressive income tax with brackets ranging from 1.4% to 10.75% for 2026. The 1.4% rate applies to your first $20,000 of taxable income (single), then climbs through several brackets to a top rate of 10.75% on income above $1,000,000. The standard deduction is $1,000 for single filers and $2,000 for married filing jointly — that\'s not a typo, it\'s really that low. New Jersey relies on its bracket structure rather than a generous standard deduction.',
          'For a single person earning $100,000, New Jersey tax comes to roughly $4,700 after applying the progressive brackets. That\'s an effective state rate of about 4.7%, which is moderate. But if you\'re a high earner making $500,000+, New Jersey becomes very expensive — the top brackets kick in hard. The 10.75% top rate on income over $1 million makes New Jersey one of the highest-tax states for top earners, second only to <a href="/california-tax-calculator">California\'s 13.3%</a>.',
          'New Jersey does offer some relief: Social Security benefits are not taxed, and retirement income exclusions are available for seniors (up to $100,000 for couples 62+). Property taxes are the highest in the nation at an average of 2.26%, which is a major factor in the total tax burden. Sales tax is 6.625% statewide. New Jersey doesn\'t allow local income taxes, unlike neighboring <a href="/pennsylvania-tax-calculator">Pennsylvania</a> with its Philadelphia wage tax. <a href="/relocation-calculator">Compare New Jersey to other states</a> to see the full picture.',
        ],
        keyRates: [
          { label: 'NJ Tax Brackets', value: '1.4% – 10.75% (7 brackets)' },
          { label: 'NJ Standard Deduction (Single)', value: '$1,000' },
          { label: 'NJ Top Rate Threshold', value: '$1,000,000' },
          { label: 'NJ Avg Property Tax Rate', value: '~2.26%' },
          { label: 'NJ State Sales Tax', value: '6.625%' },
        ],
        faqs: NEWJERSEY_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'pennsylvania-tax-calculator', label: 'Pennsylvania Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'colorado':
      return {
        howItWorks: [
          'Colorado charges a flat 4.4% income tax rate for 2026. The rate has been dropping — it was 4.55% in 2023 and 4.4% in 2024, and it stays at 4.4% for 2026. Colorado\'s approach is unique: instead of calculating state taxable income separately, it uses your federal taxable income as the starting point and applies the 4.4% rate on top. That means your federal standard deduction ($16,100 single, $32,200 married) automatically reduces your Colorado taxable income too.',
          'Since Colorado uses federal taxable income, pre-tax deductions like <a href="/401k-retirement-calculator">401(k) contributions</a> reduce your state tax bill as well. On a $75,000 salary with the federal standard deduction, your Colorado taxable income is $58,900, and the state tax comes to $2,591.60. The federal deduction pass-through makes Colorado\'s effective tax burden lower than the 4.4% headline rate would suggest.',
          'Colorado doesn\'t tax Social Security benefits, and offers a modest retirement income deduction for seniors 65 and older ($24,000 per person). Property taxes are very low, averaging about 0.55% — among the lowest in the country. Sales tax averages 7.72% combined with local add-ons. At 4.4%, Colorado is competitive with <a href="/arizona-tax-calculator">Arizona\'s 2.5%</a> and <a href="/north-carolina-tax-calculator">North Carolina\'s 4.5%</a> for flat-tax states. <a href="/relocation-calculator">Run the relocation calculator</a> for your salary.',
        ],
        keyRates: [
          { label: 'CO Flat Tax Rate', value: '4.4%' },
          { label: 'CO Tax Base', value: 'Federal taxable income' },
          { label: 'CO Avg Property Tax Rate', value: '~0.55%' },
          { label: 'CO Avg Combined Sales Tax', value: '~7.72%' },
          { label: 'Retirement Deduction (65+)', value: '$24,000/person' },
        ],
        faqs: COLORADO_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'arizona-tax-calculator', label: 'Arizona Calculator (2.5%)' },
          { slug: 'north-carolina-tax-calculator', label: 'North Carolina Calculator (4.5%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'arizona':
      return {
        howItWorks: [
          'Arizona charges a flat 2.5% income tax rate for 2026. That\'s one of the lowest state income tax rates in the country — only states with zero income tax beat it. Arizona moved to a flat tax system in 2023, consolidating its previous progressive brackets into this single rate. The standard deduction is $13,850 for single filers and $27,700 for married filing jointly, mirroring the federal standard deduction amounts.',
          'At 2.5%, the state tax on a $75,000 salary (single) comes to roughly $1,528.75 after the $13,850 standard deduction. That\'s remarkably low — less than half of what you\'d pay in <a href="/illinois-tax-calculator">Illinois (4.95%)</a> or <a href="/georgia-tax-calculator">Georgia (5.49%)</a> on the same income. Add federal tax and FICA, and you\'re looking at one of the best take-home pay rates among states that do have an income tax.',
          'Arizona doesn\'t tax Social Security benefits, and military retirement pay is fully exempt. Property taxes average about 0.63% — quite reasonable. Combined sales tax averages around 8.37% with local add-ons, which is on the higher side. But if you\'re looking at the income tax picture alone, Arizona is hard to beat among states that still levy one. Compare Arizona to <a href="/colorado-tax-calculator">Colorado (4.4%)</a> or <a href="/washington-tax-calculator">Washington (0%)</a> to see the difference, or <a href="/relocation-calculator">use the relocation calculator</a> for your salary.',
        ],
        keyRates: [
          { label: 'AZ Flat Tax Rate', value: '2.5%' },
          { label: 'AZ Standard Deduction (Single)', value: '$13,850' },
          { label: 'AZ Standard Deduction (Married)', value: '$27,700' },
          { label: 'AZ Avg Property Tax Rate', value: '~0.63%' },
          { label: 'AZ Avg Combined Sales Tax', value: '~8.37%' },
        ],
        faqs: ARIZONA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'colorado-tax-calculator', label: 'Colorado Calculator (4.4%)' },
          { slug: 'washington-tax-calculator', label: 'Washington Calculator (0%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'washington':
      return {
        howItWorks: [
          'Zero. Washington state has no personal income tax — just like <a href="/texas-tax-calculator">Texas</a> and <a href="/florida-tax-calculator">Florida</a>. Your paycheck only has federal tax and FICA deductions. No state line item, period. Washington is one of nine states with no income tax, and it\'s the only one on the West Coast.',
          'Your only deductions are federal tax (2026 progressive brackets with standard deductions) plus FICA at 7.65% combined. A $100,000 earner in Washington takes home roughly $79,000 — the same as Texas and Florida. Compare that to <a href="/california-tax-calculator">California</a> where the same salary yields about $71,000 after state tax. That\'s an $8,000 difference that stays in your pocket.',
          'But Washington gets you on the other end. <a href="https://dor.wa.gov/" target="blank" rel="noopener noreferrer nofollow">Property taxes</a> average about 0.98% — reasonable, but not as low as Colorado\'s 0.55%. The combined sales tax is around 9.0%, one of the highest in the nation. And Washington levies a 7% capital gains tax on long-term gains over $270,000, which is notable since most zero-income-tax states also skip capital gains taxes. The state also has a premium payroll tax on high-wage employers (passed through to employees earning over $147,000 at 0.58%).',
          'For retirees, Washington is attractive — no tax on Social Security, 401(k) withdrawals, IRA distributions, or pension income. For investors with significant capital gains, the 7% state tax is a drawback that Texas and Florida don\'t have. <a href="/relocation-calculator">Run the numbers</a> for your situation to see if Washington beats the alternatives.',
        ],
        keyRates: [
          { label: 'WA State Income Tax', value: '0%' },
          { label: 'WA Capital Gains Tax', value: '7% (above $270K)' },
          { label: 'WA Avg Property Tax Rate', value: '~0.98%' },
          { label: 'WA Avg Combined Sales Tax', value: '~9.0%' },
          { label: 'WA Premium Payroll Tax', value: '0.58% (over $147K)' },
        ],
        faqs: WASHINGTON_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0%)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0%)' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'massachusetts':
      return {
        howItWorks: [
          'Massachusetts charges a flat 5% income tax rate, with a 9% surtax on income over $1,000,000. For most earners, it\'s a straightforward 5% — no brackets to figure out. The state standard deduction is $4,400 (single) or $8,800 (married). On a $100,000 salary after the standard deduction, you\'d pay about $4,780 in state tax. Simple enough.',
          'The 9% surtax kicks in on taxable income above $1,000,000, making the effective top marginal rate 9% on that excess income. If you\'re earning seven figures in Massachusetts, that surtax is significant — it turns a $1.5M income into roughly $70,000 more in state tax compared to someone just under the threshold.',
          'On top of state tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both the federal and state level, which is especially valuable here since Massachusetts doesn\'t allow many other state-level deductions.',
          'Massachusetts doesn\'t tax Social Security benefits. Property taxes average about 1.23%, and the combined sales tax is 6.25% — one of the lower state sales tax rates. No local sales tax add-ons either. <a href="/relocation-calculator">Compare MA to other states</a> to see if the tax picture works for you.',
        ],
        keyRates: [
          { label: 'MA Flat Tax Rate', value: '5%' },
          { label: 'MA Surtax (over $1M)', value: '9%' },
          { label: 'MA Standard Deduction (Single)', value: '$4,400' },
          { label: 'MA Avg Property Tax Rate', value: '~1.23%' },
          { label: 'MA State Sales Tax', value: '6.25%' },
        ],
        faqs: MASSACHUSETTS_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'indiana':
      return {
        howItWorks: [
          'Indiana charges a flat 3.05% income tax rate for 2026. That\'s one of the lower flat rates in the country — cheaper than Illinois (4.95%), Michigan (4.25%), and significantly cheaper than most progressive-tax states. The state uses a $1,000 personal exemption per person, and counties can add their own income tax on top (ranging from about 0.5% to 3.38%).',
          'On a $75,000 salary with the state rate only, you\'d pay about $2,254 in state income tax. But if you live in Marion County (Indianapolis), add roughly another $1,775 in county tax. That county tax is a big deal — it can push your effective Indiana rate from 3.05% to over 5% depending on where you live.',
          'On top of state and county tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both the federal and state level.',
          'Indiana doesn\'t tax Social Security benefits. Property taxes are reasonable at about 0.85% average effective rate. Combined sales tax is 7%, which is moderate. For a Midwestern state, Indiana\'s overall tax burden is competitive, especially if you\'re in a lower-tax county. <a href="/relocation-calculator">Compare IN to other states</a>.',
        ],
        keyRates: [
          { label: 'IN Flat Tax Rate', value: '3.05%' },
          { label: 'IN Personal Exemption', value: '$1,000/person' },
          { label: 'IN County Tax Range', value: '0.5% – 3.38%' },
          { label: 'IN Avg Property Tax Rate', value: '~0.85%' },
          { label: 'IN Avg Combined Sales Tax', value: '7.0%' },
        ],
        faqs: INDIANA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'michigan-tax-calculator', label: 'Michigan Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'tennessee':
      return {
        howItWorks: [
          'Zero. Tennessee has no state income tax on wages and salaries. Like <a href="/texas-tax-calculator">Texas</a> and <a href="/florida-tax-calculator">Florida</a>, your paycheck only has federal tax and FICA deductions. No state line item, period.',
          'Tennessee used to tax investment income (the "Hall Tax") but fully repealed it starting in 2021. So now there\'s truly no state income tax of any kind. Your only deductions are federal progressive brackets with the standard deduction, plus FICA at 7.65% combined.',
          'A $100,000 earner in Tennessee takes home roughly $79,000 — the same as Texas and Florida. Compare that to <a href="/california-tax-calculator">California</a> where the same salary yields about $71,000 after state tax. That\'s an $8,000 difference that stays in your pocket.',
          'But Tennessee compensates with higher sales taxes. The combined sales tax averages around 9.56% — one of the highest in the nation. Property taxes are relatively low at about 0.71% average effective rate. For retirees, Tennessee is attractive: no tax on Social Security, IRA withdrawals, 401(k) distributions, or pension income. <a href="/relocation-calculator">Run the numbers</a> for your situation.',
        ],
        keyRates: [
          { label: 'TN State Income Tax', value: '0%' },
          { label: 'TN Avg Combined Sales Tax', value: '~9.56%' },
          { label: 'TN Avg Property Tax Rate', value: '~0.71%' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
          { label: 'Social Security Rate', value: '6.2% (up to $176,100)' },
        ],
        faqs: TENNESSEE_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0%)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'missouri':
      return {
        howItWorks: [
          'Missouri uses a progressive income tax system with rates ranging from 2% to 4.8% for 2026. The standard deduction is $14,200 (single) or $28,400 (married). Most middle-income earners land in the 3.5%–4.8% range, which is moderate compared to neighboring states.',
          'On a $75,000 salary filing single, after the $14,200 standard deduction, your Missouri state tax comes to roughly $2,500–$2,700. Compare that to Illinois at 4.95% flat on the same income ($3,450) and Missouri looks pretty good. But compare it to <a href="/tennessee-tax-calculator">Tennessee</a> at 0% and the difference is obvious.',
          'On top of Missouri tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both the federal and state level. Missouri also allows a deduction for federal income tax paid, which softens the blow somewhat.',
          'Missouri doesn\'t tax Social Security benefits for most retirees. Property taxes average about 1.01%, and combined sales tax is around 8.33%. Kansas City and St. Louis have additional city earnings taxes of 1%. <a href="/relocation-calculator">Compare MO to other states</a> to see where you come out ahead.',
        ],
        keyRates: [
          { label: 'MO Tax Brackets', value: '2% – 4.8%' },
          { label: 'MO Standard Deduction (Single)', value: '$14,200' },
          { label: 'MO Avg Property Tax Rate', value: '~1.01%' },
          { label: 'MO Avg Combined Sales Tax', value: '8.33%' },
          { label: 'KC/STL City Earnings Tax', value: '1%' },
        ],
        faqs: MISSOURI_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'tennessee-tax-calculator', label: 'Tennessee Calculator (0%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'maryland':
      return {
        howItWorks: [
          'Maryland uses a progressive income tax system with state rates from 2% to 5.75% for 2026. But here\'s the catch: every Maryland county (and Baltimore City) adds its own local income tax on top, ranging from 2.25% to 3.28%. Your actual combined state + county rate can reach over 8% at the top bracket.',
          'On a $100,000 salary filing single in Montgomery County (3.28% local rate), your combined state and county tax would be roughly $5,700. The same salary in <a href="/virginia-tax-calculator">Virginia</a> would be about $5,100 in state tax. The county tax makes Maryland more expensive than the state rate alone suggests.',
          'On top of state and county tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both the federal and state level — and since Maryland\'s top combined rate can exceed 8%, those pre-tax deductions are worth even more.',
          'Maryland doesn\'t tax Social Security benefits. Property taxes average about 1.1%, and combined sales tax is 6%, which is on the lower side. For retirees, Maryland excludes up to $34,300 of pension and retirement income from state tax. <a href="/relocation-calculator">Compare MD to other states</a>.',
        ],
        keyRates: [
          { label: 'MD State Tax Brackets', value: '2% – 5.75%' },
          { label: 'MD County Tax Range', value: '2.25% – 3.28%' },
          { label: 'MD Max Combined Rate', value: '~9.03%' },
          { label: 'MD Avg Property Tax Rate', value: '~1.1%' },
          { label: 'MD State Sales Tax', value: '6%' },
        ],
        faqs: MARYLAND_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'virginia-tax-calculator', label: 'Virginia Calculator' },
          { slug: 'pennsylvania-tax-calculator', label: 'Pennsylvania Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'wisconsin':
      return {
        howItWorks: [
          'Wisconsin uses a progressive income tax system with four brackets ranging from 3.54% to 7.65% for 2026. The standard deduction is $13,910 (single) or $25,800 (married). The top rate of 7.65% kicks in at $280,950 of taxable income for single filers.',
          'On a $100,000 salary filing single, after the standard deduction, your Wisconsin state tax comes to roughly $4,900. That\'s more expensive than neighboring states like <a href="/indiana-tax-calculator">Indiana</a> (3.05% flat, about $2,900) and <a href="/michigan-tax-calculator">Michigan</a> (4.25% flat, about $3,800).',
          'On top of Wisconsin tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> reduce taxable income at both the federal and state level — and at a 7.65% top state rate, every dollar you shelter is worth more.',
          'Wisconsin doesn\'t tax Social Security benefits. Property taxes, however, are among the highest in the nation at about 1.85% average effective rate. Combined sales tax is 5.46% (the state rate is 5%, with minimal local add-ons). For retirees, the high property taxes can offset the moderate income tax. <a href="/relocation-calculator">Compare WI to other states</a>.',
        ],
        keyRates: [
          { label: 'WI Tax Brackets', value: '3.54% – 7.65%' },
          { label: 'WI Standard Deduction (Single)', value: '$13,910' },
          { label: 'WI Avg Property Tax Rate', value: '~1.85%' },
          { label: 'WI Avg Combined Sales Tax', value: '5.46%' },
          { label: 'WI Top Rate Threshold (Single)', value: '$280,950' },
        ],
        faqs: WISCONSIN_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'minnesota-tax-calculator', label: 'Minnesota Calculator' },
          { slug: 'michigan-tax-calculator', label: 'Michigan Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'minnesota':
      return {
        howItWorks: [
          'Minnesota has one of the highest state income tax rates in the country, with four progressive brackets ranging from 5.35% to 9.85% for 2026. The standard deduction is $14,975 (single) or $27,675 (married). The top rate of 9.85% kicks in at $183,340 of taxable income for single filers — much lower threshold than <a href="/california-tax-calculator">California</a>\'s top bracket.',
          'On a $100,000 salary filing single, after the standard deduction, your Minnesota state tax comes to roughly $5,800. That\'s among the highest in the Midwest. Compare to <a href="/wisconsin-tax-calculator">Wisconsin</a> at about $4,900 on the same salary, or <a href="/indiana-tax-calculator">Indiana</a> at about $2,900.',
          'On top of Minnesota tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> are critical in Minnesota — at a 9.85% top state rate, every dollar you shelter saves you nearly 10 cents in state tax alone.',
          'Minnesota doesn\'t tax Social Security benefits for most retirees. Property taxes are moderate at about 1.12%, and the state sales tax is 6.875% (averaging about 7.49% with local taxes). For high earners, Minnesota\'s combined tax burden is significant. <a href="/relocation-calculator">Compare MN to other states</a> to see if it\'s worth it.',
        ],
        keyRates: [
          { label: 'MN Tax Brackets', value: '5.35% – 9.85%' },
          { label: 'MN Standard Deduction (Single)', value: '$14,975' },
          { label: 'MN Top Rate Threshold (Single)', value: '$183,340' },
          { label: 'MN Avg Property Tax Rate', value: '~1.12%' },
          { label: 'MN Avg Combined Sales Tax', value: '7.49%' },
        ],
        faqs: MINNESOTA_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'wisconsin-tax-calculator', label: 'Wisconsin Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    case 'oregon':
      return {
        howItWorks: [
          'Oregon uses a progressive income tax system with four brackets ranging from 4.75% to 9.9% for 2026. The standard deduction is $2,830 (single) or $5,660 (married) — notably lower than most states. The top rate of 9.9% kicks in at $125,000 of taxable income for single filers, making it one of the easiest top brackets to reach.',
          'On a $100,000 salary filing single, your Oregon state tax comes to roughly $7,300. That\'s steep — more than <a href="/california-tax-calculator">California</a> on the same income. The low standard deduction means more of your income is subject to tax from the start.',
          'But here\'s the trade-off: Oregon has no state sales tax. Zero. On a $50,000 annual spending habit, that\'s roughly $3,000–$4,000 you\'d save compared to living in a high-sales-tax state like <a href="/tennessee-tax-calculator">Tennessee</a> (9.56%) or <a href="/louisiana">Louisiana</a>. Whether Oregon works for you depends heavily on your spending vs. earning ratio.',
          'On top of Oregon tax, you\'ve got federal progressive brackets with the standard deduction, plus FICA at 7.65% combined. <a href="/401k-retirement-calculator">401(k) contributions</a> are extremely valuable in Oregon — at a 9.9% top rate, every pre-tax dollar saves you almost 10 cents in state tax. Oregon doesn\'t tax Social Security benefits. Property taxes average about 1.05%. <a href="/relocation-calculator">Compare OR to other states</a>.',
        ],
        keyRates: [
          { label: 'OR Tax Brackets', value: '4.75% – 9.9%' },
          { label: 'OR Standard Deduction (Single)', value: '$2,830' },
          { label: 'OR Top Rate Threshold (Single)', value: '$125,000' },
          { label: 'OR State Sales Tax', value: '0%' },
          { label: 'OR Avg Property Tax Rate', value: '~1.05%' },
        ],
        faqs: OREGON_FAQS,
        relatedCalculators: [
          { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'washington-tax-calculator', label: 'Washington Calculator (0%)' },
          { slug: 'relocation-calculator', label: 'Relocation Calculator' },
          { slug: 'salary', label: 'Salary After Tax' },
        ],
      };
    default:
      return {
        howItWorks: [
          'This calculator figures out your take-home pay after federal tax, FICA, and state income tax. Enter your gross salary, pick your state and filing status, and add any pre-tax deductions like 401(k) or HSA contributions if you have them.',
          'The results break down exactly where your money goes — every deduction, your effective tax rate, and your marginal rate. Pretty straightforward.',
        ],
        keyRates: [],
        faqs: HOME_FAQS,
        relatedCalculators: [],
      };
  }
}
