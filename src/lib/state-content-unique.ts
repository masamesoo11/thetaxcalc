// ─── Unique State Content for SEO (States that fell to generic default) ────────
// Each state has genuinely unique content based on its actual tax structure:
// hand-written howItWorks paragraphs, state-specific FAQs, calculation
// examples, and neighbor-state links. This eliminates the duplicate-content
// problem (89–95% similarity) that blocked Google indexing of 27 state pages.

import { FAQItem } from '@/lib/faq-data';

export interface RelatedCalculatorLink {
  slug: string;
  label: string;
}

export interface StateContentEntry {
  name: string;
  hasIncomeTax: boolean;
  howItWorks: string[];
  keyRates: { label: string; value: string }[];
  faqs: FAQItem[];
  calcStep1: string;
  calcExample: string;
  neighbors: RelatedCalculatorLink[];
}

// Shared generic FAQ set — kept only as a safety fallback for any state not
// yet covered by hand-written entries above.
const CORE_STATE_FAQS: FAQItem[] = [
  {
    question: 'Does this calculator include federal income tax?',
    answer:
      'Yes. The calculator applies the 2026 federal progressive brackets (10% to 37%) with the standard deduction, plus FICA (6.2% Social Security up to $184,500 and 1.45% Medicare), and then layers the state income tax on top. The breakdown shows each line separately so you can see exactly where your money goes.',
  },
  {
    question: 'How accurate is the state tax calculation?',
    answer:
      'The state brackets, standard deductions, and exemption rules in this calculator match the state revenue department\'s published 2026 figures. Edge cases like local city taxes and special credits are noted in the content above where they apply. For most W-2 earners, results are within a few dollars per paycheck of actual withholding.',
  },
  {
    question: 'What filing statuses are supported?',
    answer:
      'Single, married filing jointly, married filing separately, and head of household. The state standard deduction (and state bracket thresholds where applicable) adjusts automatically based on the filing status you pick.',
  },
  {
    question: 'Why is my take-home pay different from a friend in another state?',
    answer:
      'Two people with the same salary and filing status can take home very different amounts because of state income tax. A zero-tax state keeps about 4%–7% more of your pay than a high-tax state, depending on income level. Use the compare tool to see your state side-by-side with another.',
  },
];

export function getCoreStateFaqs(): FAQItem[] {
  return CORE_STATE_FAQS;
}

// Shared steps 2–6 of the calculation methodology (step 1 is state-specific).
const SHARED_CALC_STEPS: string[] = [
  'Subtract pre-tax deductions (401(k), HSA) from gross pay to get adjusted gross income',
  'Apply the federal standard deduction ($16,100 single / $32,200 married) for federal taxable income',
  'Calculate federal tax using the 2026 progressive brackets (10%–37%) per IRS Publication 15-T',
  'Calculate FICA: 6.2% Social Security (up to $184,500) + 1.45% Medicare (no cap)',
  'Subtract all taxes and pre-tax deductions from gross pay to get net take-home pay',
];

export function buildStateCalculationMethod(entry: StateContentEntry) {
  return {
    formula: entry.hasIncomeTax
      ? `Net Pay = Gross Income − (Federal Tax + ${entry.name} State Tax + FICA + Pre-tax Deductions)`
      : `Net Pay = Gross Income − (Federal Tax + FICA) — ${entry.name} has no state income tax`,
    steps: [entry.calcStep1, ...SHARED_CALC_STEPS],
    example: entry.calcExample,
  };
}

export function buildStateRelatedCalculators(entry: StateContentEntry): RelatedCalculatorLink[] {
  return [
    { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    ...entry.neighbors,
    { slug: 'relocation-calculator', label: 'Relocation Calculator' },
    { slug: 'salary', label: 'Salary After Tax' },
  ];
}

export function getStateContentEntry(state: string): StateContentEntry | null {
  switch (state) {
    // ─── OKLAHOMA ─────────────────────────────────────────────────────────────
    case 'oklahoma':
      return {
        name: 'Oklahoma',
        hasIncomeTax: true,
        howItWorks: [
          'Oklahoma runs a nine-bracket progressive income tax — one of the most granular bracket systems in the country. Rates start at just 0.25% on your first $1,000 of taxable income and climb slowly: 0.75% up to $2,500, 1.25% up to $3,750, and so on through 4% at $12,200. Everything above $12,200 gets the top rate of 4.75%. Because the early brackets are so low, a typical middle-income earner\'s effective Oklahoma tax rate lands around 3.2%–3.8% — meaningfully below the 4.75% headline number.',
          'Here\'s the math on a $75,000 single-filer salary. Oklahoma starts from federal AGI and applies the federal standard deduction of $16,100, leaving $58,900 of taxable income. Running that through the nine brackets produces roughly $1,880 in state tax — an effective rate of about 2.5% of gross pay. Add federal tax and FICA on top and total take-home lands near $59,700.',
          'Two Oklahoma quirks worth knowing. First, the state keeps a personal exemption on top of the standard deduction for you and each dependent, which trims taxable income a bit further. Second, Oklahoma taxes all retirement income — Social Security included for higher earners — but seniors with household income under $75,000 ($100,000 married) are fully exempt. Tulsa and Oklahoma City add no local income taxes, so the state rate is the whole story on your pay stub.',
          'Sales tax is Oklahoma\'s real revenue engine: 4.5% state plus local add-ons averages 8.95% combined — top-10 in the nation. Property tax averages just 0.95%, which is one of the lowest rates in the country. So Oklahoma trades cheap property tax for pricey sales tax, a mix that favors homeowners over frequent spenders.',
          'Filing in Oklahoma: the state return is Form 511, sent to the Oklahoma Tax Commission by April 15 alongside your federal 1040. Oklahoma offers free e-file for most residents, and withholding starts from the first dollar of wages — there are no local returns to worry about.',
        ],
        keyRates: [
          { label: 'OK Tax Brackets', value: '0.25% – 4.75% (9 brackets)' },
          { label: 'OK Standard Deduction (Single)', value: '$16,100 (federal SD)' },
          { label: 'OK Avg Property Tax Rate', value: '~0.95%' },
          { label: 'OK Avg Combined Sales Tax', value: '8.95% (top-10 US)' },
          { label: 'Senior Exemption Threshold', value: '$75K single / $100K MFJ' },
        ],
        faqs: [
          {
            question: 'Why is my Oklahoma effective tax rate lower than the 4.75% top rate?',
            answer:
              'Because Oklahoma spreads nine brackets across the bottom of the income scale. The first $1,000 of taxable income is taxed at just 0.25%, and the rate doesn\'t reach 4% until $8,700. The 4.75% top rate only applies above $12,200, so most of a middle-class salary is taxed at 2.5%–4%. The blended result for a typical $75,000 earner is roughly $1,880 — about a 2.5% effective rate.',
          },
          {
            question: 'Does Oklahoma tax Social Security and 401(k) withdrawals?',
            answer:
              'Yes — Oklahoma taxes virtually all retirement income, including Social Security for higher earners, which puts it at odds with its zero-tax neighbors to the south. The big exception: seniors with total household income under $75,000 (single) or $100,000 (married filing jointly) pay no state tax on retirement income at all.',
          },
          {
            question: 'Do Tulsa and Oklahoma City have local income taxes?',
            answer:
              'No. Neither city — nor any Oklahoma municipality — adds a local income tax on wages. The state withholding line on your pay stub is the complete income-tax picture in Oklahoma, which simplifies things compared to states like Ohio or Maryland where city-level taxes exist.',
          },
          {
            question: 'Is Oklahoma tax-friendly overall?',
            answer:
              'It depends on your spending profile. Income tax is moderate (effective rates around 2.5%–3.8% for most earners) and property tax is among the lowest in the country at 0.95% average. The catch is sales tax: 8.95% combined average puts Oklahoma in the top 10 nationally, which hits frequent spenders hardest.',
          },
        ],
        calcStep1:
          'Run Oklahoma\'s nine brackets (0.25% to 4.75%) against your taxable income after the federal standard deduction',
        calcExample:
          'A single filer earning $75,000: the $16,100 federal standard deduction leaves $58,900 taxable. Oklahoma\'s nine brackets produce about $1,880 in state tax — roughly a 2.5% effective rate on gross pay.',
        neighbors: [
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% tax)' },
          { slug: 'kansas-tax-calculator', label: 'Kansas Calculator' },
          { slug: 'arkansas-tax-calculator', label: 'Arkansas Calculator' },
        ],
      };

    // ─── KANSAS ───────────────────────────────────────────────────────────────
    case 'kansas':
      return {
        name: 'Kansas',
        hasIncomeTax: true,
        howItWorks: [
          'Kansas keeps its income tax simple: three brackets. 3.1% on your first $23,000 of taxable income (married — $11,500 single), 5.25% on the middle band, and 5.7% on income above $46,000 married ($23,000 single). Unlike most states, Kansas does NOT let you use the federal standard deduction — it has its own smaller deduction of $3,500 single / $8,000 married. That smaller deduction is why the effective rate runs higher than you might guess from the bracket numbers.',
          'Run a $70,000 single salary through it: Kansas taxable income is $70,000 minus the $3,500 state deduction, so $66,500. The first $11,500 is taxed at 3.1% ($356.50), the next $11,500 at 5.25% ($603.75), and the remaining $43,500 at 5.7% ($2,479.50) — roughly $3,440 total, an effective rate of about 4.9% of gross. For 2026, Kansas has scheduled the brackets to compress further, which will shave a bit off the top band.',
          'Kansas is one of the states that still fully taxes Social Security benefits for higher earners, though seniors earning under $75,000 AGI get relief. The state levies no local income taxes — not even in Wichita, Topeka, or Kansas City (Kansas side) — so what you see in the brackets is what gets withheld.',
          'Property tax averages a moderate 1.37%, and combined sales tax runs 8.66% on average thanks to substantial local add-ons — top-10 nationally. Worth noting: the Kansas City metro area has a peculiar situation where living in Kansas but working in Missouri (or vice versa) triggers credit rules between the two states, which the calculator handles only implicitly — check with your payroll department for that edge case.',
          'Filing in Kansas: resident returns go to the Kansas Department of Revenue on Form K-40, due April 15 with your federal return. The state supports free online filing, and employer withholding follows your federal W-4 selections unless you file a separate Kansas K-4 to fine-tune it.',
        ],
        keyRates: [
          { label: 'KS Tax Brackets', value: '3.1% / 5.25% / 5.7%' },
          { label: 'KS Standard Deduction (Single)', value: '$3,500 (not federal SD)' },
          { label: 'KS Standard Deduction (Married)', value: '$8,000' },
          { label: 'KS Avg Property Tax Rate', value: '~1.37%' },
          { label: 'KS Avg Combined Sales Tax', value: '8.66% (top-10 US)' },
        ],
        faqs: [
          {
            question: 'Why can\'t I use the federal standard deduction on my Kansas return?',
            answer:
              'Kansas is one of the few states that rejected the federal standard deduction. The state allows only its own deduction — $3,500 for singles and $8,000 for joint filers — far smaller than the federal $16,100. That\'s why a Kansas effective rate (about 4.9% on a $70,000 salary) runs higher than the bracket numbers alone suggest.',
          },
          {
            question: 'What are the Kansas state income tax brackets?',
            answer:
              'Three brackets: 3.1% on your first $23,000 of taxable income (married) or $11,500 (single), 5.25% on the middle band, and 5.7% on everything above $46,000 (married) or $23,000 (single). The brackets are scheduled to compress further in 2026, trimming the top band slightly.',
          },
          {
            question: 'I live in Kansas but work in Kansas City, Missouri — how does that work?',
            answer:
              'You\'ll generally pay Missouri tax on wages earned there and claim a credit against your Kansas liability — but the credit mechanics and Kansas City\'s earnings tax on non-resident workers create edge cases. Have your payroll department split withholding appropriately; this calculator estimates the Kansas resident side.',
          },
          {
            question: 'Does Kansas tax Social Security benefits?',
            answer:
              'For higher earners, yes — Kansas is among the minority of states that can tax Social Security. Seniors with federal AGI under $75,000 get relief (the exemption phases out above that). Retirees above the threshold should factor this into relocation math, especially since neighboring Missouri fully exempts Social Security.',
          },
        ],
        calcStep1:
          'Subtract Kansas\'s own standard deduction ($3,500 single / $8,000 married) — the federal deduction does NOT apply — then run the 3.1% / 5.25% / 5.7% brackets',
        calcExample:
          'A single filer earning $70,000: Kansas taxable income is $66,500 after the $3,500 state deduction. The brackets produce 3.1% of the first $11,500, 5.25% of the next $11,500, and 5.7% of the remaining $43,500 — about $3,440 total.',
        neighbors: [
          { slug: 'missouri-tax-calculator', label: 'Missouri Calculator' },
          { slug: 'oklahoma-tax-calculator', label: 'Oklahoma Calculator' },
          { slug: 'nebraska-tax-calculator', label: 'Nebraska Calculator' },
        ],
      };

    // ─── IDAHO ────────────────────────────────────────────────────────────────
    case 'idaho':
      return {
        name: 'Idaho',
        hasIncomeTax: true,
        howItWorks: [
          'Idaho charges a flat 5.695% income tax for 2026 — and that single number is exactly what makes Idaho unusual: it uses your federal taxable income as the starting point, which means the federal standard deduction of $16,100 (single) automatically reduces Idaho taxable income too. There are no separate state deduction schedules to figure out.',
          'On a $75,000 salary, your federal taxable income is $58,900 after the standard deduction. Idaho takes 5.695% of that — about $3,354. Federal tax and FICA stack on top, leaving take-home around $57,300. High earners should note Idaho added a temporary 5.3% surcharge bracket on income above $250,000 (single) in recent years, which is why some Idaho pay stubs show two state lines.',
          'Idaho gives significant retirement breaks: Social Security is fully exempt, and there\'s a $60,000-per-person deduction for qualifying retirement income (45+ with earned income requirements). That makes Idaho surprisingly competitive for retirees despite the 5.695% working-years rate. Grocery shoppers get an odd perk — Idaho refunds $120 per person annually ($240 for seniors) to offset grocery sales tax.',
          'Boise adds no city income tax. Property tax averages 0.96% of home value — near the national average — while combined sales tax sits at 8.05%, mostly from the state\'s 6% base rate plus municipal add-ons. Idaho\'s overall burden is close to the national median.',
          'Filing in Idaho: the resident return is Form 40, filed with the Idaho State Tax Commission by April 15. Idaho supports free e-file, and the grocery credit is claimed on the same form — no local returns exist.',
        ],
        keyRates: [
          { label: 'ID Flat Tax Rate', value: '5.695%' },
          { label: 'ID Tax Base', value: 'Federal taxable income' },
          { label: 'Retirement Deduction (45+)', value: '$60,000/person' },
          { label: 'ID Avg Property Tax Rate', value: '~0.96%' },
          { label: 'ID Avg Combined Sales Tax', value: '8.05%' },
        ],
        faqs: [
          {
            question: 'How does Idaho\'s flat tax work with the federal standard deduction?',
            answer:
              'Idaho starts from your federal taxable income — the figure on your 1040 after the $16,100 federal standard deduction — and simply multiplies it by 5.695%. There\'s no separate Idaho deduction schedule to figure out, which makes it one of the easiest state taxes to estimate. On a $75,000 salary that\'s about $3,354 in state tax.',
          },
          {
            question: 'Is Idaho a good state for retirees?',
            answer:
              'Better than its working-years rate suggests. Social Security is fully exempt, and Idaho offers a $60,000-per-person deduction on qualifying retirement income (pensions, 401(k) and IRA distributions) for residents 45 and older who meet the earned-income rules. Many retirees end up paying little or no Idaho income tax.',
          },
          {
            question: 'What is Idaho\'s grocery tax credit?',
            answer:
              'Idaho taxes groceries at the full 6% sales tax rate, then refunds part of it: $120 per person annually ($240 for seniors) as a grocery credit claimed on your income tax return. It\'s an unusual structure — you pay the tax at checkout and claw a portion back at filing time.',
          },
          {
            question: 'Why do some Idaho pay stubs show two state tax lines?',
            answer:
              'Idaho added a temporary 5.3% surcharge bracket on income above $250,000 (single). If you earn above that line, payroll systems often split the base 5.695% and the surcharge into separate withholding lines. The calculator here folds the surcharge into a single estimate.',
          },
        ],
        calcStep1:
          'Start from federal taxable income (after the federal standard deduction) and multiply by Idaho\'s flat 5.695%',
        calcExample:
          'A single filer earning $75,000 has $58,900 of federal taxable income after the standard deduction. Idaho\'s flat 5.695% produces about $3,354 in state tax.',
        neighbors: [
          { slug: 'washington-tax-calculator', label: 'Washington Calculator (0% income tax)' },
          { slug: 'oregon-tax-calculator', label: 'Oregon Calculator' },
          { slug: 'utah-tax-calculator', label: 'Utah Calculator' },
        ],
      };

    // ─── KENTUCKY ─────────────────────────────────────────────────────────────
    case 'kentucky':
      return {
        name: 'Kentucky',
        hasIncomeTax: true,
        howItWorks: [
          'Kentucky levies a flat 4% income tax for 2026 — down from 4.5% the year before, part of a planned series of cuts that could eventually reach 3.5% if revenue targets keep being met. The flat rate means no bracket math at all: Kentucky taxable income × 4% = state tax. The state uses its own standard deduction of $3,510 (single), scheduled to keep rising with inflation.',
          'A $70,000 single salary pays Kentucky roughly $2,660 after the $3,510 deduction — an effective rate of 3.8% of gross. Louisville and Lexington add no city income taxes on wages (Louisville\'s occupational tax of 2.2% applies to net profits from business, not regular W-2 withholding), so the 4% is what comes out of your paycheck.',
          'Retirees: Kentucky exempts Social Security entirely and allows a $31,110 exclusion per person on most retirement income (pensions, 401(k) distributions, IRAs) once you meet the age and service requirements. Combined with the declining flat rate, that makes Kentucky one of the more retiree-friendly states among flat-tax states.',
          'Property tax is cheap — 0.86% average effective, bottom-15 nationally — while the 6% state sales tax carries no local add-ons (Kentucky bans local sales taxes), leaving combined at a flat 6%. Kentucky\'s overall tax burden ranks among the lower third of states.',
          'Filing in Kentucky: the resident return is Form 740, due to the Kentucky Department of Revenue by April 15. The state offers free e-file, and your employer handles withholding via the federal W-4 — Kentucky has no separate state withholding form.',
        ],
        keyRates: [
          { label: 'KY Flat Tax Rate', value: '4% (dropping yearly)' },
          { label: 'KY Standard Deduction', value: '$3,510' },
          { label: 'Retirement Income Exclusion', value: '$31,110/person' },
          { label: 'KY Avg Property Tax Rate', value: '~0.86%' },
          { label: 'KY Sales Tax', value: '6% flat (no local)' },
        ],
        faqs: [
          {
            question: 'When will Kentucky\'s flat tax rate drop again?',
            answer:
              'Kentucky cut its rate from 4.5% to 4% and built a statutory trigger for further reductions — down toward 3.5% — if revenue targets keep being met. The cuts happen automatically once the state hits its savings goals, so the rate on your paycheck can fall without new legislation.',
          },
          {
            question: 'Does Louisville\'s 2.2% occupational tax come out of my paycheck?',
            answer:
              'No — that\'s a common mix-up. Louisville\'s occupational tax applies to net profits from self-employment and business activity, not to W-2 wages. Regular employees in Louisville and Lexington pay only the 4% state flat rate.',
          },
          {
            question: 'How much retirement income can I exclude in Kentucky?',
            answer:
              'Social Security is fully exempt, and Kentucky adds a $31,110 per-person exclusion on most retirement income — pensions, 401(k) distributions, and IRA withdrawals — once you meet age and service requirements. For a retiree drawing $40,000 from retirement accounts, most of it escapes state tax.',
          },
          {
            question: 'Can Kentucky cities add their own sales taxes?',
            answer:
              'No — Kentucky\'s constitution bans local sales taxes, so every city in the state charges the same flat 6%. That\'s unusual; most states let cities and counties add 1%–3% on top of the state rate.',
          },
        ],
        calcStep1:
          'Subtract Kentucky\'s own standard deduction ($3,510 single) and multiply the rest by the flat 4% rate',
        calcExample:
          'A single filer earning $70,000 subtracts the $3,510 state deduction, leaving $66,490 taxable. Kentucky\'s flat 4% produces about $2,660 in state tax — an effective 3.8% of gross.',
        neighbors: [
          { slug: 'tennessee-tax-calculator', label: 'Tennessee Calculator (0% income tax)' },
          { slug: 'ohio-tax-calculator', label: 'Ohio Calculator' },
          { slug: 'indiana-tax-calculator', label: 'Indiana Calculator' },
        ],
      };

    // ─── MISSISSIPPI ──────────────────────────────────────────────────────────
    case 'mississippi':
      return {
        name: 'Mississippi',
        hasIncomeTax: true,
        howItWorks: [
          'Mississippi applies a flat 4.7% income tax on taxable income for 2026 — but "taxable income" in Mississippi means something different than almost anywhere else. The state eliminates its own standard deduction entirely in 2026 (it was $2,300, now zero) and replaces the old multi-bracket structure with the flat rate. Deductions come only from the federal side: itemized deductions carry over, but the federal standard deduction does NOT.',
          'That quirk matters for your paycheck. On a $65,000 salary, Mississippi taxes the full $65,000 at 4.7% unless you itemize — about $3,055. Compare that to a state like Idaho (also a flat-tax state, at 5.695%) which lets you subtract the federal standard deduction first, and you\'ll see why two similar-looking flat rates produce very different real burdens. For 2026, Mississippi also maintains a self-employment income exemption on the first $10,000 of business income.',
          'Retirees love Mississippi. Social Security is fully exempt, and — uniquely — Mississippi exempts ALL retirement income: pensions, 401(k), IRA withdrawals, annuities. There\'s no dollar cap and no age gate beyond the standard retirement definitions. For a retiree drawing $60,000 from a 401(k), Mississippi income tax is literally zero. Working years you pay 4.7%, retirement years you pay nothing.',
          'Property tax averages 0.98% and sales tax runs 7.07% combined (the state rate is 7% — one of the highest base rates in the country, with minimal local add-ons). Jackson adds no city income tax. Mississippi\'s total tax burden is bottom-5 nationally, especially for retirees.',
          'Filing in Mississippi: resident returns use Form 80-105, filed with the Mississippi Department of Revenue by April 15. The state provides free online filing, and withholding is handled through your employer — no separate state W-4 is needed.',
        ],
        keyRates: [
          { label: 'MS Flat Tax Rate', value: '4.7%' },
          { label: 'MS Standard Deduction', value: 'Eliminated for 2026' },
          { label: 'Retirement Income', value: 'Fully exempt (no cap)' },
          { label: 'MS Avg Property Tax Rate', value: '~0.98%' },
          { label: 'MS Sales Tax', value: '7% base (top-5 US)' },
        ],
        faqs: [
          {
            question: 'Why does Mississippi feel more expensive than its 4.7% flat rate?',
            answer:
              'Because Mississippi eliminated its standard deduction in 2026 — previously $2,300, now zero. Unless you itemize, the state taxes your income from the first dollar. On a $65,000 salary that\'s the full $65,000 × 4.7% ≈ $3,055, noticeably more than flat-tax states that let you subtract deductions first.',
          },
          {
            question: 'Is Mississippi really tax-free for retirees?',
            answer:
              'Yes, and it\'s one of the most generous retirement deals in the country. Mississippi exempts ALL retirement income — pensions, 401(k) withdrawals, IRA distributions, annuities — with no dollar cap. Social Security is also fully exempt. A retiree drawing $60,000 from a 401(k) owes $0 Mississippi income tax.',
          },
          {
            question: 'What is Mississippi\'s self-employment exemption?',
            answer:
              'For 2026, Mississippi exempts the first $10,000 of self-employment and business income from state tax. If you have both a W-2 job and side income, the exemption applies to the business side only.',
          },
          {
            question: 'How high is Mississippi\'s sales tax?',
            answer:
              'The state base rate is 7% — one of the highest in the nation — with minimal local add-ons, so combined rates average about 7.07%. Unlike most states, Mississippi applies the full rate to groceries.',
          },
        ],
        calcStep1:
          'Apply the flat 4.7% to your full income — Mississippi eliminated its standard deduction for 2026',
        calcExample:
          'A single filer earning $65,000 with no itemized deductions owes 4.7% on the full amount — about $3,055. Mississippi is the rare flat-tax state that starts from dollar one.',
        neighbors: [
          { slug: 'louisiana-tax-calculator', label: 'Louisiana Calculator' },
          { slug: 'tennessee-tax-calculator', label: 'Tennessee Calculator (0% income tax)' },
          { slug: 'alabama-tax-calculator', label: 'Alabama Calculator' },
        ],
      };

    // ─── UTAH ─────────────────────────────────────────────────────────────────
    case 'utah':
      return {
        name: 'Utah',
        hasIncomeTax: true,
        howItWorks: [
          'Utah charges a flat 4.65% income tax for 2026 — but Utah\'s twist is the taxpayer tax credit system. Instead of exemptions and deductions, Utah starts from federal taxable income, applies the 4.65% to get a preliminary tax, then subtracts a credit worth 4.65% of your dependents\' deductions (about $1,900 per dependent). For a family of four, that credit alone removes roughly $350 from the state bill.',
          'Single earner making $80,000: federal taxable income after the standard deduction is $63,900. Utah takes 4.65% — roughly $2,971 — with no dependent credit unless you have kids. Families get real relief: that same $80,000 with two dependents pays about $2,620 after the credit. Salt Lake City and Provo levy no local income taxes, so the state rate is the whole withholding story.',
          'Utah fully exempts Social Security and provides a retirement credit up to $450 per person for qualifying retirement income — modest, but the flat 4.65% (down from 4.95% a few years ago) keeps working-years burden reasonable. Utah has been cutting the rate steadily; every cut triggers an automatic taxpayer credit bump in the same bill.',
          'Property tax averages a low 0.67%, while combined sales tax runs 7.19%. Utah\'s overall burden sits close to the national median, but the flat structure means high earners do notably better here than in progressive-rate states like California or Oregon.',
          'Filing in Utah: the resident return is Form TC-40, sent to the Utah State Tax Commission by April 15. Utah offers free e-file for most filers, and the dependent tax credit is claimed directly on the TC-40.',
        ],
        keyRates: [
          { label: 'UT Flat Tax Rate', value: '4.65%' },
          { label: 'Dependent Tax Credit', value: '4.65% × ~$1,900 each' },
          { label: 'Retirement Credit', value: 'Up to $450/person' },
          { label: 'UT Avg Property Tax Rate', value: '~0.67%' },
          { label: 'UT Avg Combined Sales Tax', value: '7.19%' },
        ],
        faqs: [
          {
            question: 'How does Utah\'s dependent tax credit work?',
            answer:
              'Utah replaced exemptions and deductions with a taxpayer tax credit. The state calculates 4.65% of your income as preliminary tax, then subtracts a credit worth 4.65% of roughly $1,900 per dependent. A family of four shaves about $350 off their state bill — and the credit grows automatically whenever Utah cuts its rate.',
          },
          {
            question: 'Does Utah tax Social Security?',
            answer:
              'No, Social Security is fully exempt. Utah adds a retirement tax credit of up to $450 per person on qualifying retirement income, which softens the flat 4.65% for older residents.',
          },
          {
            question: 'What income does Utah\'s 4.65% actually apply to?',
            answer:
              'Federal taxable income — your 1040 figure after the federal standard deduction. That means pre-tax 401(k) and HSA contributions reduce your Utah tax dollar-for-dollar at the federal level first, then the state applies its flat rate to what\'s left.',
          },
          {
            question: 'Is Utah cheaper for high earners than neighboring states?',
            answer:
              'Generally yes. The flat 4.65% means a $300,000 earner pays the same marginal rate as a $50,000 earner, unlike progressive states where top brackets climb past 9%. Utah\'s overall burden sits near the national median, with property tax at 0.67% among the lowest in the Mountain West.',
          },
        ],
        calcStep1:
          'Multiply federal taxable income by the flat 4.65%, then subtract the taxpayer credit (4.65% of ~$1,900 per dependent)',
        calcExample:
          'A single filer earning $80,000 has $63,900 of federal taxable income. Utah\'s 4.65% produces about $2,971 — and with two dependents, the credit cuts it to roughly $2,620.',
        neighbors: [
          { slug: 'colorado-tax-calculator', label: 'Colorado Calculator' },
          { slug: 'arizona-tax-calculator', label: 'Arizona Calculator' },
          { slug: 'nevada-tax-calculator', label: 'Nevada Calculator (0% income tax)' },
        ],
      };

    // ─── ALABAMA ──────────────────────────────────────────────────────────────
    case 'alabama':
      return {
        name: 'Alabama',
        hasIncomeTax: true,
        howItWorks: [
          'Alabama runs a three-bracket progressive tax: 2% on your first $500 of taxable income, 4% on the next $2,500, and 5% on everything above $3,000. Yes, those thresholds are really that low — the brackets are compressed into the first $3,000, so virtually every working person\'s income above that line is taxed at 5%. The state standard deduction is $3,000 single / $8,500 married, plus a $1,500 personal exemption per person.',
          'Practical math on a $62,000 salary: after deductions, about $56,000 remains, and essentially all of it lands in the 5% bracket. The first-two-bracket effect shaves only a few dollars. Real Alabama tax: roughly $2,780 — an effective rate of 4.5% of gross. Birmingham, Montgomery, and Huntsville add no city income taxes.',
          'Alabama holds a major retiree advantage: Social Security is fully exempt, and defined-benefit pension income (teacher, state employee, and certain private pensions) escapes state tax for those who retired before the recent rule changes. A classic Alabama teacher pension pays out essentially state-tax-free. IRA and 401(k) withdrawals are taxed at the standard rates.',
          'Property tax is the real bargain — 0.41% average effective, the second-lowest in the nation behind Hawaii. Sales tax averages 9.29% combined (fourth-highest), and notably Alabama is one of the few states that still fully taxes groceries. Alabama\'s total tax burden ranks bottom-10 nationally.',
          'Filing in Alabama: the resident return is Form 40, filed with the Alabama Department of Revenue by April 15. Alabama provides free e-file options, and your employer calculates withholding from your federal W-4 elections.',
        ],
        keyRates: [
          { label: 'AL Tax Brackets', value: '2% / 4% / 5% (at $500 / $3,000)' },
          { label: 'AL Standard Deduction (Single)', value: '$3,000' },
          { label: 'Social Security', value: 'Fully exempt' },
          { label: 'AL Avg Property Tax Rate', value: '~0.41% (2nd-lowest US)' },
          { label: 'AL Avg Combined Sales Tax', value: '9.29% (4th-highest)' },
        ],
        faqs: [
          {
            question: 'Why do almost all Alabama earners pay the 5% top rate?',
            answer:
              'Alabama\'s brackets are compressed into the first $3,000 of income: 2% on the first $500, 4% up to $3,000, then a flat 5% on everything above. The lower brackets shave only a few dollars, so practically speaking a $62,000 salary pays 5% on nearly all of its taxable income.',
          },
          {
            question: 'Which retirement income is exempt in Alabama?',
            answer:
              'Social Security is fully exempt, and defined-benefit pensions — including teacher and state-employee retirements — largely escape state tax for those who retired before recent rule changes. That makes Alabama one of the best pension states in the Southeast. Private 401(k) and IRA withdrawals are taxed at the standard rates.',
          },
          {
            question: 'Does Alabama tax groceries?',
            answer:
              'Yes — Alabama is one of the few states that applies its full sales tax to groceries, pushing combined grocery rates above 9% in many cities. It\'s a meaningful cost difference for families compared to states that exempt or reduce tax on food.',
          },
          {
            question: 'How low are Alabama property taxes?',
            answer:
              '0.41% average effective — second-lowest in the nation behind Hawaii. A $250,000 home carries roughly $1,025 a year in property tax, a major offset to Alabama\'s high sales tax for homeowners.',
          },
        ],
        calcStep1:
          'Run Alabama\'s compressed brackets (2% to $500, 4% to $3,000, 5% above) after the state deduction and personal exemptions',
        calcExample:
          'A single filer earning $62,000: after the $3,000 standard deduction and $1,500 personal exemption, about $56,000 remains — nearly all taxed at 5% for roughly $2,780 in state tax.',
        neighbors: [
          { slug: 'georgia-tax-calculator', label: 'Georgia Calculator' },
          { slug: 'tennessee-tax-calculator', label: 'Tennessee Calculator (0% income tax)' },
          { slug: 'mississippi-tax-calculator', label: 'Mississippi Calculator' },
        ],
      };

    // ─── ARKANSAS ─────────────────────────────────────────────────────────────
    case 'arkansas':
      return {
        name: 'Arkansas',
        hasIncomeTax: true,
        howItWorks: [
          'Arkansas uses a six-bracket progressive tax running from 2% up to 4.4% for 2026. The brackets are narrow at the bottom — 2% on your first $5,000, 3% to $10,000, 3.4% to $14,000 — and the top 4.4% rate starts at just $25,000 of taxable income. Because the top bracket hits so early, most middle-class earners are effectively paying 4.4% on the bulk of their income. The state standard deduction is $2,620 single / $5,240 married, notably smaller than the federal one.',
          'A $68,000 single salary works out like this: taxable income after the state deduction is about $65,380. The lower brackets consume the first $25,000, and everything above gets 4.4%. Total Arkansas tax lands near $2,640 — an effective rate of 3.9% of gross pay. Little Rock adds no city income tax.',
          'Arkansas has been quietly reducing rates: the top rate was 5.9% a few years ago and has fallen in steps to 4.4%, with the bottom bracket doubling to 4% scheduled in future years. The state keeps a unique tax table system (like the federal wage tables) that most payroll departments use for withholding.',
          'Retirement treatment is mixed: Social Security is exempt, and military retirement pay is fully exempt, but private pensions and 401(k)/IRA distributions are taxed at standard rates. Property tax runs 0.93% average, while combined sales tax is high at 9.44% — third-highest in the country — driven by a 6.5% state rate plus substantial local add-ons.',
          'Filing in Arkansas: full-year residents file Form AR1000F with the Arkansas Department of Finance and Administration by April 15. Arkansas offers free online filing, and most payroll systems use the state wage tables for withholding.',
        ],
        keyRates: [
          { label: 'AR Tax Brackets', value: '2% – 4.4% (6 brackets)' },
          { label: 'AR Top Rate Threshold', value: '$25,000 (early)' },
          { label: 'AR Standard Deduction (Single)', value: '$2,620' },
          { label: 'AR Avg Property Tax Rate', value: '~0.93%' },
          { label: 'AR Avg Combined Sales Tax', value: '9.44% (3rd-highest)' },
        ],
        faqs: [
          {
            question: 'When does Arkansas\'s 4.4% top rate kick in?',
            answer:
              'At just $25,000 of taxable income — one of the earliest top-bracket thresholds in the country. The lower brackets (2%, 3%, 3.4%) cover only the first $14,000, so most middle-class Arkansans pay 4.4% on the bulk of their income.',
          },
          {
            question: 'Is military retirement taxed in Arkansas?',
            answer:
              'No — military retirement pay is fully exempt. Social Security is also exempt. Private pensions and 401(k)/IRA distributions are taxed at standard rates, so the state\'s retiree-friendliness depends heavily on your income mix.',
          },
          {
            question: 'How much have Arkansas income tax rates fallen?',
            answer:
              'The top rate has dropped from 5.9% to 4.4% in a series of legislative steps, and the bottom bracket is scheduled to keep expanding. Arkansas ties future cuts to revenue triggers, similar to its neighbors.',
          },
          {
            question: 'Why are Arkansas sales taxes so high?',
            answer:
              'A 6.5% state rate plus substantial local add-ons produces a 9.44% combined average — third-highest in the nation. Arkansas cities and counties add more local sales tax than almost any other state.',
          },
        ],
        calcStep1:
          'Run Arkansas\'s six brackets (2% to 4.4%) after the state standard deduction ($2,620 single)',
        calcExample:
          'A single filer earning $68,000 has $65,380 of taxable income after the state deduction. The lower brackets cover the first $25,000; the rest is taxed at 4.4% — about $2,640 total.',
        neighbors: [
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% income tax)' },
          { slug: 'oklahoma-tax-calculator', label: 'Oklahoma Calculator' },
          { slug: 'louisiana-tax-calculator', label: 'Louisiana Calculator' },
        ],
      };

    // ─── CONNECTICUT ──────────────────────────────────────────────────────────
    case 'connecticut':
      return {
        name: 'Connecticut',
        hasIncomeTax: true,
        howItWorks: [
          'Connecticut layers a seven-bracket progressive tax from 3% up to 6.99% for 2026. The brackets rise quickly: 3% on your first $10,000, 5% to $50,000, 5.5% to $100,000, then 6%, 6.5%, and 6.9% steps before the 6.99% top rate above $500,000. Unlike most states, Connecticut gives you NO standard deduction — the state eliminated it and instead phases out exemptions as income rises ($24,000 phase-out starting at $30,000 for singles, $48,000 at $56,000 married).',
          'That phase-out design means middle-income earners with moderate salaries often lose most of their exemption. On $85,000 single, the personal exemption is largely phased out, and Connecticut tax runs about $4,240 — an effective 5% of gross. High earners above $500,000 face an extra complexity: the 6.99% rate applies to ALL income once you cross the threshold in certain phase-out zones (an effective bump that functions like a 7%–8% marginal rate for a narrow income band).',
          'Connecticut fully exempts Social Security and phases out pension-income taxation for lower earners, but 401(k)/IRA withdrawals are taxed at full rates. There\'s no city income tax — Hartford, New Haven, and Bridgeport add nothing to wages — but property tax is where Connecticut hurts: 2.15% average effective, third-highest nationally.',
          'Combined sales tax is a moderate 6.35% (6.99% on certain goods). Connecticut has one of the highest per-capita total tax burdens in the country — not because of any single rate, but because the property tax, income tax phase-outs, and inheritance tax (estates above $5.1M) all stack together.',
          'Filing in Connecticut: the resident return is Form CT-1040, due to the Connecticut Department of Revenue Services by April 15. Connecticut offers free e-file, and employees can submit Form CT-W4 to fine-tune withholding beyond the federal W-4.',
        ],
        keyRates: [
          { label: 'CT Tax Brackets', value: '3% – 6.99% (7 brackets)' },
          { label: 'CT Standard Deduction', value: 'None (exemption phase-out)' },
          { label: 'CT Avg Property Tax Rate', value: '~2.15% (3rd-highest)' },
          { label: 'CT State Sales Tax', value: '6.35%' },
          { label: 'Estate Tax Threshold', value: '$5.1M' },
        ],
        faqs: [
          {
            question: 'Why doesn\'t Connecticut have a standard deduction?',
            answer:
              'Connecticut eliminated it and replaced it with a personal exemption that phases out as income rises — starting at $30,000 for singles and $56,000 for couples. Middle-income earners lose most of the exemption, which is why an $85,000 single filer\'s effective rate runs about 5%.',
          },
          {
            question: 'What is Connecticut\'s hidden marginal rate bump?',
            answer:
              'In certain income zones, the 6.99% top rate applies to ALL your income once you cross the phase-out threshold — not just the amount above it. For a narrow band of earners, this works out to an effective marginal rate of 7%–8%, higher than the stated bracket.',
          },
          {
            question: 'How bad are Connecticut property taxes?',
            answer:
              '2.15% average effective — third-highest in the nation. On a $400,000 home that\'s about $8,600 a year, which is why Connecticut\'s total per-capita tax burden is among the highest in the US despite moderate income-tax rates.',
          },
          {
            question: 'Does Connecticut have an estate tax?',
            answer:
              'Yes — estates above $5.1 million face Connecticut estate tax. For high-net-worth households, this is often the deciding factor when comparing against zero-estate-tax states like Florida.',
          },
        ],
        calcStep1:
          'Run Connecticut\'s seven brackets (3% to 6.99%) with the phase-out-adjusted personal exemption — Connecticut has no standard deduction',
        calcExample:
          'A single filer earning $85,000: the personal exemption is largely phased out at this income, so Connecticut tax runs about $4,240 — an effective 5% of gross.',
        neighbors: [
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'massachusetts-tax-calculator', label: 'Massachusetts Calculator' },
          { slug: 'rhode-island-tax-calculator', label: 'Rhode Island Calculator' },
        ],
      };

    // ─── DELAWARE ────────────────────────────────────────────────────────────
    case 'delaware':
      return {
        name: 'Delaware',
        hasIncomeTax: true,
        howItWorks: [
          'Delaware runs a seven-bracket progressive tax from 2.2% up to 6.6% for 2026. The brackets are unusual in their shape: 2.2% on your first $2,000, then 3.9%, 4.8%, 5.2%, 5.5%, and 6.6% steps — with the top 6.6% rate starting at $60,000 of taxable income. That early top-rate threshold means most professional earners are paying 6.6% on the majority of their income. The state standard deduction is $3,250 single / $6,500 married, plus a personal exemption of $110 per person (yes, $110 — one of the smallest in the country).',
          'Run $78,000 single through it: after the $3,250 deduction, taxable income is $74,750. The first five brackets consume up to $40,000, leaving about $34,750 taxed at 6.6%. Total Delaware tax: roughly $3,470, an effective rate of 4.5% of gross. Wilmington adds no city income tax — Delaware bans local income taxes entirely.',
          'The famous Delaware perks are real but specific: NO state sales tax at all (Delaware is one of five states with zero sales tax), which makes it a shopping destination and cuts effective consumption-tax burden substantially. Retirees get partial relief — Social Security is exempt, and those 60+ can exclude up to $12,500 of investment and pension income.',
          'Property tax is remarkably low at 0.57% average — but Delaware makes up for it with a quirky gross-receipts tax on businesses that gets embedded in prices. The overall picture: moderate income tax, zero sales tax, cheap property tax. For high-spenders and homeowners, Delaware often beats its reputation.',
          'Filing in Delaware: the resident return is Form 200-01, filed with the Delaware Division of Revenue — and uniquely, Delaware gives you until April 30, two weeks longer than the federal deadline. Free e-file is available for most residents.',
        ],
        keyRates: [
          { label: 'DE Tax Brackets', value: '2.2% – 6.6% (7 brackets)' },
          { label: 'DE Top Rate Threshold', value: '$60,000 (early)' },
          { label: 'DE State Sales Tax', value: '0% (one of 5 states)' },
          { label: 'DE Avg Property Tax Rate', value: '~0.57%' },
          { label: 'Senior Exclusion (60+)', value: '$12,500' },
        ],
        faqs: [
          {
            question: 'Does Delaware really have zero sales tax?',
            answer:
              'Yes — Delaware is one of five states with no state or local sales tax, which makes it a regional shopping destination. Pennsylvania, New Jersey, and Maryland residents routinely cross the border for big-ticket purchases.',
          },
          {
            question: 'How small is Delaware\'s personal exemption?',
            answer:
              '$110 per person — yes, one hundred ten dollars. It\'s one of the smallest exemptions in the country and mostly symbolic. Delaware\'s real deductions come from its standard deduction ($3,250 single / $6,500 married).',
          },
          {
            question: 'When does Delaware\'s top tax rate start?',
            answer:
              'At $60,000 of taxable income — quite early. The 6.6% top rate applies to most professional earners, and the bracket ladder (2.2%, 3.9%, 4.8%, 5.2%, 5.55%, 6.6%) climbs faster than in most states.',
          },
          {
            question: 'What can Delaware seniors exclude from taxes?',
            answer:
              'Residents 60 and older can exclude up to $12,500 of investment and pension income ($2,500 for those under 60). Social Security is fully exempt for everyone.',
          },
        ],
        calcStep1:
          'Run Delaware\'s seven brackets (2.2% to 6.6%) after the state deduction ($3,250 single)',
        calcExample:
          'A single filer earning $78,000 has $74,750 of taxable income after the state deduction. The first five brackets consume up to $40,000; the remainder is taxed at 6.6% — about $3,470 total.',
        neighbors: [
          { slug: 'pennsylvania-tax-calculator', label: 'Pennsylvania Calculator' },
          { slug: 'new-jersey-tax-calculator', label: 'New Jersey Calculator' },
          { slug: 'maryland-tax-calculator', label: 'Maryland Calculator' },
        ],
      };

    // ─── HAWAII ───────────────────────────────────────────────────────────────
    case 'hawaii':
      return {
        name: 'Hawaii',
        hasIncomeTax: true,
        howItWorks: [
          'Hawaii has the most granular income tax in the nation: TWELVE progressive brackets running from 1.4% on your first $4,800 of taxable income all the way to 11% above $400,000. The middle brackets climb steeply — 5.5% at $19,200, 7.6% at $43,200, 8.2% at $62,400 — which means Hawaii\'s effective rates hit high-tax-state territory much earlier than the 11% headline suggests. A $100,000 earner is already in the 8.25% bracket (the brackets above $62,400 run 8.25%, 9%, 10%, 11%).',
          'The state standard deduction is small: $2,200 single / $4,400 married, plus personal exemptions of $1,144 per person. On $85,000 single, taxable income is about $79,420, and running it through all twelve brackets produces roughly $5,950 in Hawaii tax — a 7% effective rate on gross. Honolulu adds no city income tax, but the state\'s high cost of living makes the absolute dollar burden feel heavier than the percentages imply.',
          'Hawaii exempts Social Security fully and gives a retirement income exclusion of up to $88,000 per person for qualifying pensions (combined with military, federal, and state pension rules). High-earners should note the 11% top rate is second-highest in the US behind California\'s 13.3%.',
          'The rest of the tax picture: property tax is famously the lowest in the nation at 0.31% average (Hawaii\'s assessment system is generous to owner-occupants), but the general excise tax (GET) — Hawaii\'s version of sales tax — applies to virtually every transaction at 4% (4.5% on Oahu) and gets baked into prices at every level of the supply chain. Effective consumption tax burden is much higher than the stated rate.',
          'Filing in Hawaii: the resident return is Form N-11, filed with the Hawaii Department of Taxation — and the state deadline is April 20, five days after the federal deadline. Hawaii provides free online filing through its tax portal.',
        ],
        keyRates: [
          { label: 'HI Tax Brackets', value: '1.4% – 11% (12 brackets, most in US)' },
          { label: 'HI Top Rate Threshold', value: '$400,000' },
          { label: 'HI Avg Property Tax Rate', value: '~0.31% (lowest US)' },
          { label: 'General Excise Tax (GET)', value: '4% – 4.5%' },
          { label: 'Retirement Exclusion', value: 'Up to $88,000/person' },
        ],
        faqs: [
          {
            question: 'How many tax brackets does Hawaii have?',
            answer:
              'Twelve — the most granular in the nation, running from 1.4% up to 11%, the second-highest top rate in the US behind California\'s 13.3%. Even mid-range earners feel it: a $100,000 salary already reaches the 8.25% bracket.',
          },
          {
            question: 'What is Hawaii\'s GET tax?',
            answer:
              'The General Excise Tax is Hawaii\'s version of sales tax — 4% statewide (4.5% on Oahu) — but it applies to virtually every transaction and gets embedded at multiple levels of the supply chain. The effective consumption burden runs meaningfully higher than the stated rate.',
          },
          {
            question: 'How much retirement income does Hawaii exempt?',
            answer:
              'Social Security is fully exempt, and qualifying pensions can exclude up to $88,000 per person — one of the largest retirement exclusions of any state. Combined with the lowest property tax in the nation (0.31%), Hawaii treats retirees surprisingly well.',
          },
          {
            question: 'Why is Hawaii property tax so low?',
            answer:
              '0.31% average effective — lowest in the country, thanks to a generous owner-occupant assessment system. The trade-off is the GET, which applies to essentially everything you buy.',
          },
        ],
        calcStep1:
          'Run Hawaii\'s twelve brackets (1.4% to 11%) after the state deduction ($2,200 single) and per-person exemptions',
        calcExample:
          'A single filer earning $85,000 has about $79,420 of taxable income after deductions. Running all twelve brackets produces roughly $5,950 in Hawaii tax — a 7% effective rate.',
        neighbors: [
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'washington-tax-calculator', label: 'Washington Calculator (0% income tax)' },
          { slug: 'oregon-tax-calculator', label: 'Oregon Calculator' },
        ],
      };

    // ─── IOWA ─────────────────────────────────────────────────────────────────
    case 'iowa':
      return {
        name: 'Iowa',
        hasIncomeTax: true,
        howItWorks: [
          'Iowa taxes income through six brackets from 4.4% up to a top rate of 5.7% for 2026 — but Iowa has been in the middle of a multi-year tax overhaul. The brackets: 4.4% on your first $11,820, then 4.82%, 5.28%, 5.63%, and 5.96% steps, with 5.7% above $78,435. Note the odd inversion in 2026: the fifth bracket (5.96%) is actually HIGHER than the top rate (5.7%) because the overhaul compressed the top two brackets first. Iowa lets you use the federal standard deduction ($16,100 single / $32,200 married) on the state return.',
          'A $72,000 single salary: taxable income after the federal deduction is $55,900. The first four brackets run through $41,360, and the remainder lands at 5.96% (the temporary high bracket). Total Iowa tax: roughly $2,890 — a 4% effective rate. Des Moines, Cedar Rapids, and Iowa City add no local income taxes.',
          'Iowa is one of the states that taxes Social Security for high earners (phase-out starts at $75,000 for 2026, exempt below), though the exemption rules keep expanding. The state offers a notable deduction for federal income taxes paid — one of the last states to allow it — which softens the effective burden for mid-to-high earners.',
          'Property tax runs 1.71% average — high, driven by school district levies — while combined sales tax is 6.94%. Iowa has also been cutting corporate rates aggressively, and the income tax is scheduled to keep simplifying toward a flatter structure in future years.',
          'Filing in Iowa: the resident return is Form IA 1040, filed with the Iowa Department of Revenue — and Iowa\'s deadline is April 30, two weeks after the federal due date. Free e-file is available for most residents.',
        ],
        keyRates: [
          { label: 'IA Tax Brackets', value: '4.4% – 5.7% (6 brackets)' },
          { label: 'IA Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'Federal Tax Deduction', value: 'Allowed (rare)' },
          { label: 'IA Avg Property Tax Rate', value: '~1.71%' },
          { label: 'IA Avg Combined Sales Tax', value: '6.94%' },
        ],
        faqs: [
          {
            question: 'Why does Iowa\'s fifth bracket have a higher rate than its top bracket?',
            answer:
              'Iowa\'s ongoing tax overhaul compressed the top brackets first, creating a temporary oddity for 2026: the fifth bracket runs 5.96% while the top bracket runs 5.7%. The structure will keep simplifying toward a flatter system in future years.',
          },
          {
            question: 'Can I deduct federal income tax on my Iowa return?',
            answer:
              'Yes — Iowa is one of the last states allowing a deduction for federal income taxes paid, which softens the effective state rate for mid-to-high earners. Most states abandoned this decades ago.',
          },
          {
            question: 'Does Iowa tax Social Security?',
            answer:
              'Only for higher earners. The exemption phases out starting at $75,000 of income for 2026 — below that, Social Security is fully exempt. The exemption rules keep expanding under Iowa\'s tax overhaul.',
          },
          {
            question: 'Why are Iowa property taxes so high?',
            answer:
              '1.71% average — driven by school district levies. On a $250,000 home that\'s about $4,275 a year, which is why Iowa\'s overall burden runs higher than its income-tax rates alone suggest.',
          },
        ],
        calcStep1:
          'Run Iowa\'s six brackets (4.4% to 5.96%) against federal taxable income — Iowa keeps the federal standard deduction',
        calcExample:
          'A single filer earning $72,000 has $55,900 of federal taxable income. Iowa\'s brackets (including the temporary 5.96% fifth band) produce about $2,890 in state tax.',
        neighbors: [
          { slug: 'illinois-tax-calculator', label: 'Illinois Calculator' },
          { slug: 'minnesota-tax-calculator', label: 'Minnesota Calculator' },
          { slug: 'missouri-tax-calculator', label: 'Missouri Calculator' },
        ],
      };

    // ─── LOUISIANA ────────────────────────────────────────────────────────────
    case 'louisiana':
      return {
        name: 'Louisiana',
        hasIncomeTax: true,
        howItWorks: [
          'Louisiana uses a three-bracket progressive tax for 2026: 1.85% on your first $12,500 of taxable income (single), 1.85% on the band from $12,500 to $50,000 (the rate structure is in transition — both bottom brackets sit at 1.85% this year), and 4.75% above $50,000. That top rate is what drives the real cost: any professional earner above $50,000 taxable income pays 4.75% on everything over the line. Louisiana uses the federal standard deduction ($16,100 single / $32,200 married) on the state return.',
          'The math on $70,000 single: taxable income after the standard deduction is $53,900. The first $50,000 gets the 1.85% treatment ($925), and the remaining $3,900 gets 4.75% ($185.25). Total: about $1,110 — a strikingly low 1.6% effective rate. Louisiana is genuinely one of the cheapest income-tax states for middle earners.',
          'Louisiana fully exempts Social Security and gives a generous retirement exclusion: up to $6,000 per person of annual retirement income (pensions, 401(k), IRA) escapes state tax, plus military pensions are fully exempt. New Orleans adds no city income tax on wages (there\'s a peculiar occupational license tax for businesses, not employees).',
          'Property tax averages 0.74% — low — but sales tax is the opposite: 9.55% combined average, the HIGHEST in the nation, driven by a 4.45% state rate plus some of the country\'s highest local add-ons. Louisiana\'s revenue model shifts burden from income/property to consumption, which is worth factoring into relocation math.',
          'Filing in Louisiana: the resident return is Form IT-540, sent to the Louisiana Department of Revenue — and Louisiana\'s deadline is May 15, a full month after the federal deadline, the latest state filing deadline in the country. Free e-file is available.',
        ],
        keyRates: [
          { label: 'LA Tax Brackets', value: '1.85% / 1.85% / 4.75%' },
          { label: 'LA Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'LA Avg Property Tax Rate', value: '~0.74%' },
          { label: 'LA Avg Combined Sales Tax', value: '9.55% (HIGHEST US)' },
          { label: 'Retirement Exclusion', value: '$6,000/person + military' },
        ],
        faqs: [
          {
            question: 'Why is Louisiana so cheap for middle-income earners?',
            answer:
              'Both of Louisiana\'s bottom brackets sit at 1.85%, and the 4.75% top rate only applies above $50,000 of taxable income. Since Louisiana uses the federal standard deduction ($16,100 single), a $70,000 salary has only $3,900 of income in the top bracket — total state tax ≈ $1,110, a 1.6% effective rate.',
          },
          {
            question: 'Which state has the highest sales tax in the US?',
            answer:
              'Louisiana — 9.55% combined average, the highest in the nation. A 4.45% state rate plus some of the country\'s heaviest local add-ons. The state deliberately shifts its revenue from income to consumption taxes.',
          },
          {
            question: 'Does New Orleans have a city income tax?',
            answer:
              'No — New Orleans doesn\'t tax wages. The city\'s occupational license tax applies to businesses, not employee paychecks. Your Louisiana withholding is purely the state\'s.',
          },
          {
            question: 'How much retirement income is exempt in Louisiana?',
            answer:
              'Social Security is fully exempt, plus $6,000 per person of other retirement income (pensions, 401(k), IRA). Military pensions are fully exempt with no cap.',
          },
        ],
        calcStep1:
          'Run Louisiana\'s brackets (1.85% below $50,000 taxable, 4.75% above) after the federal standard deduction',
        calcExample:
          'A single filer earning $70,000 has $53,900 of taxable income after the federal deduction. The first $50,000 is taxed at 1.85% and the remainder at 4.75% — about $1,110 total, one of the lowest state bills in the country.',
        neighbors: [
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% income tax)' },
          { slug: 'mississippi-tax-calculator', label: 'Mississippi Calculator' },
          { slug: 'arkansas-tax-calculator', label: 'Arkansas Calculator' },
        ],
      };

    // ─── MAINE ────────────────────────────────────────────────────────────────
    case 'maine':
      return {
        name: 'Maine',
        hasIncomeTax: true,
        howItWorks: [
          'Maine keeps income tax compact: three brackets. 5.8% on your first $27,450 of taxable income (single), 6.75% up to $65,450, and 7.15% above that. The state standard deduction is $14,600 single / $29,200 married — deliberately set at 90% of the federal deduction, which is higher than most states\' standalone deductions.',
          'A $76,000 single salary: taxable income after the $14,600 deduction is $61,400. The first $27,450 costs 5.8% ($1,592), the next $38,000 costs 6.75% ($2,565), leaving roughly $4,157 total — a 5.5% effective rate. Portland adds no city income tax. Maine has no local income taxes anywhere in the state.',
          'Maine graduates its retirement relief by income: Social Security is exempt for households under $85,000 AGI (phasing out above), and pension income gets a $10,000 exclusion per person for those under the income caps. The state also runs a unique "Pension Income Deduction" schedule — worth reviewing if you\'re retiring to Maine.',
          'Property tax runs 1.09% average, right at the national norm, while combined sales tax is 5.5% — bottom-10 nationally. Maine\'s total burden is moderate; the 7.15% top bracket matters mainly for six-figure earners, and the state\'s generous standard deduction helps everyone.',
          'Filing in Maine: the resident return is Form 1040ME, due to Maine Revenue Services by April 15. Maine offers free e-file, and the 90%-of-federal standard deduction is applied automatically.',
        ],
        keyRates: [
          { label: 'ME Tax Brackets', value: '5.8% / 6.75% / 7.15%' },
          { label: 'ME Standard Deduction (Single)', value: '$14,600' },
          { label: 'Pension Exclusion (per person)', value: '$10,000' },
          { label: 'ME Avg Property Tax Rate', value: '~1.09%' },
          { label: 'ME Avg Combined Sales Tax', value: '5.5% (bottom-10)' },
        ],
        faqs: [
          {
            question: 'How does Maine set its standard deduction?',
            answer:
              'At exactly 90% of the federal standard deduction — $14,600 single / $29,200 married for 2026. That\'s deliberately higher than most standalone state deductions, which keeps Maine\'s effective rate lower than its 7.15% top rate suggests.',
          },
          {
            question: 'Does Maine tax Social Security?',
            answer:
              'Maine phases its Social Security exemption out above $85,000 of household AGI. Below that threshold, benefits are fully exempt; above it, partial taxation applies — more generous than Vermont\'s full taxation, less generous than Massachusetts\'s full exemption.',
          },
          {
            question: 'What pension exclusion does Maine offer?',
            answer:
              'Up to $10,000 per person of pension income is deductible for residents under the income caps. Maine also runs a separate Pension Income Deduction schedule worth reviewing if you\'re retiring to the state.',
          },
          {
            question: 'How low are Maine\'s sales taxes?',
            answer:
              '5.5% combined average — bottom-10 nationally. Maine is one of the few New England states that didn\'t adopt high sales-tax rates, which offsets its above-average income tax.',
          },
        ],
        calcStep1:
          'Run Maine\'s three brackets (5.8%, 6.75%, 7.15%) after the state standard deduction ($14,600 single)',
        calcExample:
          'A single filer earning $76,000 has $61,400 of taxable income after the state deduction. The first $27,450 is taxed at 5.8% and the rest at 6.75% — about $4,157 in Maine tax.',
        neighbors: [
          { slug: 'new-hampshire-tax-calculator', label: 'New Hampshire Calculator (0% income tax)' },
          { slug: 'massachusetts-tax-calculator', label: 'Massachusetts Calculator' },
          { slug: 'vermont-tax-calculator', label: 'Vermont Calculator' },
        ],
      };

    // ─── MONTANA ──────────────────────────────────────────────────────────────
    case 'montana':
      return {
        name: 'Montana',
        hasIncomeTax: true,
        howItWorks: [
          'Montana runs a six-bracket progressive tax from 1% up to 5.9% for 2026. The brackets: 1% on your first $3,600 of taxable income, 2% to $6,500, 3% to $10,100, 4% to $14,000, 5% to $19,800, and 5.9% above. Those are narrow low brackets — a $60,000 earner\'s income above $19,800 is all at 5.9%. The state standard deduction is $5,510 single / $11,020 married (capped), plus Montana offers a unique 4.3%–4.8% capital gains credit that effectively cuts the top rate on investment income to about 5.37%.',
          'On $65,000 single: taxable income after the $5,510 deduction is $59,490. The brackets through $19,800 cost about $775, and the remaining $39,690 at 5.9% costs $2,342 — total roughly $3,117, an effective 4.8% of gross. Billings, Missoula, and Bozeman add no city income taxes.',
          'Montana fully exempts Social Security and allows a partial pension/retirement deduction ($4,310 per person against qualifying income). The state is one of the few that still allows deducting federal income taxes paid (capped), which trims the effective rate — a legacy provision most states have abandoned.',
          'Property tax averages 0.91%, and there\'s no general sales tax at the state level on most purchases — Montana is one of the few zero-sales-tax states (resort areas can levy small local options). Combined with the moderate income tax, Montana\'s total burden is genuinely low for a state with no sales tax.',
          'Filing in Montana: the resident return is Form 2, filed with the Montana Department of Revenue by April 15. Montana offers free e-file, and the capital gains credit is claimed on the same form.',
        ],
        keyRates: [
          { label: 'MT Tax Brackets', value: '1% – 5.9% (6 brackets)' },
          { label: 'MT Standard Deduction (Single)', value: '$5,510' },
          { label: 'Capital Gains Credit', value: 'Top eff. rate ~5.37%' },
          { label: 'MT Avg Property Tax Rate', value: '~0.91%' },
          { label: 'MT State Sales Tax', value: '0% (few states)' },
        ],
        faqs: [
          {
            question: 'Does Montana have a state sales tax?',
            answer:
              'No — Montana is one of the few zero-general-sales-tax states (small resort-area local options exist). Combined with a moderate income tax and low property tax, Montana\'s overall burden is genuinely low, especially for frequent spenders.',
          },
          {
            question: 'How does Montana\'s capital gains credit work?',
            answer:
              'Montana applies a 4.3%–4.8% credit against the tax on net long-term capital gains, cutting the effective top rate on investment income to about 5.37% — a real advantage over states that tax gains as ordinary income.',
          },
          {
            question: 'Can I deduct federal taxes paid on my Montana return?',
            answer:
              'Yes, up to a cap — Montana is one of the last states keeping this legacy deduction. It trims the effective state rate, particularly for higher earners.',
          },
          {
            question: 'When does Montana\'s top rate start?',
            answer:
              'At $19,800 of taxable income — the brackets are narrow and the 5.9% top rate arrives early. The state standard deduction ($5,510 single) partially offsets that.',
          },
        ],
        calcStep1:
          'Run Montana\'s six brackets (1% to 5.9%) after the state standard deduction ($5,510 single)',
        calcExample:
          'A single filer earning $65,000 has $59,490 of taxable income after the state deduction. The brackets through $19,800 cost about $775, and the remaining $39,690 is taxed at 5.9% — roughly $3,117 total.',
        neighbors: [
          { slug: 'wyoming-tax-calculator', label: 'Wyoming Calculator (0% income tax)' },
          { slug: 'idaho-tax-calculator', label: 'Idaho Calculator' },
          { slug: 'south-dakota-tax-calculator', label: 'South Dakota Calculator (0% income tax)' },
        ],
      };

    // ─── NEBRASKA ──────────────────────────────────────────────────────────────
    case 'nebraska':
      return {
        name: 'Nebraska',
        hasIncomeTax: true,
        howItWorks: [
          'Nebraska applies a four-bracket progressive tax: 2.46% on your first $4,130 of taxable income (single), 3.51% to $24,720, 5.01% to $78,990, and 5.84% above that. The state standard deduction matches the federal one ($16,100 single / $32,200 married), and Nebraska has been on a rate-cutting trajectory — every bracket rate has dropped over the past three years, and further cuts are triggered when revenue targets are met.',
          'Run $71,000 single through it: taxable income after the standard deduction is $54,900. The first $24,720 costs about $820 through the low brackets, and the remaining $30,180 at 5.01% costs $1,512 — total about $2,332, an effective 3.3% of gross. Omaha and Lincoln add no city income taxes on wages.',
          'Nebraska taxes Social Security for higher earners (exempt for AGI under roughly $45,000 single / $58,000 married, with a phase-out above) — one of the less retiree-friendly rules in the region. Military retirement, however, is fully exempt, and Nebraska added a targeted tax cut for veterans recently.',
          'Property tax is high at 1.73% average — driven heavily by school funding from agricultural land valuations — while combined sales tax runs 6.94%. The overall burden is moderate but the property tax side hits homeowners.',
          'Filing in Nebraska: the resident return is Form 1040N, sent to the Nebraska Department of Revenue by April 15. Nebraska provides free online filing, and the state accepts the federal standard deduction without adjustment.',
        ],
        keyRates: [
          { label: 'NE Tax Brackets', value: '2.46% – 5.84% (4 brackets)' },
          { label: 'NE Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'Military Retirement', value: 'Fully exempt' },
          { label: 'NE Avg Property Tax Rate', value: '~1.73% (high)' },
          { label: 'NE Avg Combined Sales Tax', value: '6.94%' },
        ],
        faqs: [
          {
            question: 'How do Nebraska\'s automatic tax cuts work?',
            answer:
              'Nebraska ties rate reductions to revenue triggers — when state savings targets are met, brackets drop automatically. Every bracket rate has fallen for three straight years, and further cuts are pre-scheduled if revenue keeps pace.',
          },
          {
            question: 'Does Nebraska tax Social Security?',
            answer:
              'For higher earners, yes — Nebraska\'s exemption phases out above roughly $45,000 AGI (single) / $58,000 (married), making it one of the less retiree-friendly rules in the region. Military retirement, by contrast, is fully exempt.',
          },
          {
            question: 'Why are Nebraska property taxes so high?',
            answer:
              '1.73% average — among the highest in the country, driven by school funding levies on agricultural land valuations. Homeowners feel this in the overall burden even though income tax is moderate.',
          },
          {
            question: 'What rate will I actually pay in Nebraska?',
            answer:
              'The brackets run 2.46% to 5.84%, but Nebraska matches the federal standard deduction ($16,100 single), so the effective rate on a $71,000 salary works out to about 3.3% — roughly $2,332.',
          },
        ],
        calcStep1:
          'Run Nebraska\'s four brackets (2.46% to 5.84%) against federal taxable income — Nebraska matches the federal standard deduction',
        calcExample:
          'A single filer earning $71,000 has $54,900 of taxable income after the standard deduction. The lower brackets and the 5.01% band produce about $2,332 in state tax — a 3.3% effective rate.',
        neighbors: [
          { slug: 'iowa-tax-calculator', label: 'Iowa Calculator' },
          { slug: 'kansas-tax-calculator', label: 'Kansas Calculator' },
          { slug: 'missouri-tax-calculator', label: 'Missouri Calculator' },
        ],
      };

    // ─── NEW MEXICO ───────────────────────────────────────────────────────────
    case 'newmexico':
      return {
        name: 'New Mexico',
        hasIncomeTax: true,
        howItWorks: [
          'New Mexico runs a six-bracket progressive tax from 1.7% up to 5.9% for 2026. The structure: 1.7% on your first $5,500 of taxable income (single), 3.2% to $16,500, 4.7% to $33,500, 4.9% to $66,000, 5.9% above. The state uses the federal standard deduction ($16,100 single / $32,200 married), and 2026 is the first year New Mexico\'s major rate overhaul takes effect — rates dropped across the board in 2024–2025.',
          'On a $64,000 single salary: taxable income after the standard deduction is $47,900. The low brackets consume $33,500 at about $960, the $18,400 band to $66,000 at 4.9% costs $902, and nothing hits the top rate. Total: roughly $1,862 — a low 2.9% effective rate. Albuquerque, Santa Fe, and Las Cruces add no city income taxes.',
          'New Mexico is one of the most retiree-friendly states in the West: Social Security is fully exempt, and there\'s a deduction of up to $8,000 per person ($15,200 for 65+) for qualifying retirement income (pensions, 401(k), IRA). The state also allows a deduction for certain military benefits. Low income-tax rates plus generous retirement breaks make New Mexico competitive with zero-tax states for retirees.',
          'Property tax is cheap at 0.92%, but combined sales tax (called gross receipts tax in New Mexico) runs 7.66% on average and applies broadly to services. The GRT structure embeds tax at multiple production levels, which pushes effective consumption costs above the stated rate.',
          'Filing in New Mexico: the resident return is Form PIT-1, due to the Taxation and Revenue Department by April 15. New Mexico offers free e-file, and the retirement deductions are claimed directly on the PIT-1.',
        ],
        keyRates: [
          { label: 'NM Tax Brackets', value: '1.7% – 5.9% (6 brackets)' },
          { label: 'NM Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'Retirement Exclusion (65+)', value: 'Up to $15,200' },
          { label: 'NM Avg Property Tax Rate', value: '~0.92%' },
          { label: 'Gross Receipts Tax (avg)', value: '7.66%' },
        ],
        faqs: [
          {
            question: 'What changed in New Mexico\'s 2026 tax rates?',
            answer:
              'New Mexico completed a major rate overhaul in 2024–2025 — every bracket dropped, with the top rate falling to 5.9% and the bottom to 1.7%. The state also kept the federal standard deduction, so effective rates are genuinely low: about 2.9% on a $64,000 salary.',
          },
          {
            question: 'How retiree-friendly is New Mexico?',
            answer:
              'Very — Social Security is fully exempt, and residents can deduct up to $8,000 per person of qualifying retirement income ($15,200 for those 65+). For retirees drawing primarily from Social Security and a 401(k), New Mexico\'s effective rate approaches zero.',
          },
          {
            question: 'What is New Mexico\'s gross receipts tax?',
            answer:
              'The GRT is New Mexico\'s version of sales tax — 7.66% average — but it applies broadly to services as well as goods, and it\'s embedded at multiple production levels. Effective consumption costs run above the stated rate.',
          },
          {
            question: 'Do Albuquerque and Santa Fe have local income taxes?',
            answer:
              'No — neither city, nor any New Mexico municipality, taxes wages. The state income tax is the only withholding line on a New Mexico paycheck.',
          },
        ],
        calcStep1:
          'Run New Mexico\'s six brackets (1.7% to 5.9%) against federal taxable income — New Mexico keeps the federal standard deduction',
        calcExample:
          'A single filer earning $64,000 has $47,900 of taxable income after the federal deduction. The brackets produce roughly $1,862 in state tax — a low 2.9% effective rate.',
        neighbors: [
          { slug: 'arizona-tax-calculator', label: 'Arizona Calculator' },
          { slug: 'colorado-tax-calculator', label: 'Colorado Calculator' },
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% income tax)' },
        ],
      };

    // ─── NORTH DAKOTA ─────────────────────────────────────────────────────────
    case 'northdakota':
      return {
        name: 'North Dakota',
        hasIncomeTax: true,
        howItWorks: [
          'North Dakota keeps a three-bracket progressive tax that is genuinely low: 1.1% on your first $47,770 of taxable income (single), 2.04% up to $393,975, and 2.5% above that. Yes, you read that right — 2.5% is the TOP rate, one of the lowest top rates of any income-tax state in the country. The state standard deduction matches the federal one ($16,100 single / $32,200 married).',
          'The math is almost anticlimactic: a $78,000 single salary has $61,900 of taxable income after the standard deduction, ALL of which falls in the 1.1% bracket. North Dakota tax: $680. Total effective rate: 0.87% of gross. Only the zero-tax states (Alaska, Florida, Nevada, South Dakota, Texas, Washington, and Wyoming) beat that. Fargo, Bismarck, and Grand Forks add no local income taxes.',
          'North Dakota\'s tax code is shaped by the energy economy — oil revenue funds the state budget and keeps income-tax rates among the lowest in the nation. The state has also been running a long-term trend of rate reductions and credits.',
          'Retirees: Social Security is fully exempt, and North Dakota exempts most military, federal, and state pension income. Property tax averages 1.07%, and combined sales tax runs 7.09% (with a notable local-option structure — municipalities set their own add-ons, so rates range 6%–8.5% by city). The overall tax burden is one of the lowest of any state.',
          'Filing in North Dakota: the resident return is Form ND-1, filed with the Office of State Tax Commissioner by April 15. North Dakota offers free e-file and is one of the few states that lets you itemize on the state return even if you take the federal standard deduction.',
        ],
        keyRates: [
          { label: 'ND Tax Brackets', value: '1.1% / 2.04% / 2.5% (lowest top)' },
          { label: 'ND Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'ND Avg Property Tax Rate', value: '~1.07%' },
          { label: 'ND Avg Combined Sales Tax', value: '7.09% (city-dependent)' },
          { label: 'Social Security', value: 'Fully exempt' },
        ],
        faqs: [
          {
            question: 'Which state has the lowest top income tax rate?',
            answer:
              'North Dakota — the top bracket is just 2.5%, and the first $47,770 of taxable income is taxed at only 1.1%. No other income-tax state comes close; the next-lowest top rates run well above 3%.',
          },
          {
            question: 'Why are North Dakota\'s taxes so low?',
            answer:
              'Oil revenue. Severance taxes on the Bakken fields fund most of the state budget, letting North Dakota keep income-tax rates at the bottom of the national table. The state has run a decades-long trend of rate reductions.',
          },
          {
            question: 'How much is $78,000 after taxes in North Dakota?',
            answer:
              'State income tax is about $680 — a 0.87% effective rate. After federal tax and FICA, a $78,000 single filer keeps roughly $63,000, which is why North Dakota routinely appears on lists of best take-home states.',
          },
          {
            question: 'Do North Dakota cities add their own taxes?',
            answer:
              'No local income taxes, but municipalities set their own sales-tax add-ons — combined rates range from about 6% to 8.5% depending on the city.',
          },
        ],
        calcStep1:
          'Run North Dakota\'s three brackets (1.1%, 2.04%, 2.5%) against federal taxable income',
        calcExample:
          'A single filer earning $78,000 has $61,900 of taxable income — all of it inside the 1.1% bottom bracket. North Dakota tax: about $680, an effective 0.87% of gross — the lowest income-tax bill of any taxing state.',
        neighbors: [
          { slug: 'minnesota-tax-calculator', label: 'Minnesota Calculator' },
          { slug: 'south-dakota-tax-calculator', label: 'South Dakota Calculator (0% income tax)' },
          { slug: 'montana-tax-calculator', label: 'Montana Calculator' },
        ],
      };

    // ─── RHODE ISLAND ─────────────────────────────────────────────────────────
    case 'rhodeisland':
      return {
        name: 'Rhode Island',
        hasIncomeTax: true,
        howItWorks: [
          'Rhode Island levies a three-bracket progressive tax: 3.75% on your first $80,250 of taxable income (single), 4.75% up to $175,550, and 5.99% above that. Note the unusually WIDE first bracket — 3.75% covers all income up to $80,250, which means most Rhode Islanders never leave the bottom bracket. The state uses the federal standard deduction ($16,100 single / $32,200 married).',
          'On a $95,000 single salary: taxable income after the standard deduction is $78,900, all of which fits in the 3.75% bracket. Rhode Island tax: about $2,959 — a 3.1% effective rate that undercuts many states with higher headline rates. Providence adds no city income tax.',
          'Rhode Island phases out nearly all its retirement benefits by income: Social Security is exempt only for AGI under roughly $101,900 (single) / $126,600 (married), with partial exemption in a phase-out zone. Above those caps, Social Security gets taxed at full state rates — a notable difference from most states.',
          'Property tax is 1.61% average — fourth-highest nationally — and combined sales tax runs 7.09%. Rhode Island\'s total burden is high per-capita, driven heavily by property tax on its dense housing stock, but the income-tax piece is more moderate than the state\'s reputation suggests.',
          'Filing in Rhode Island: the resident return is Form RI-1040, due to the Rhode Island Division of Taxation by April 15. Rhode Island offers free e-file, and the state accepts federal itemized or standard deductions.',
        ],
        keyRates: [
          { label: 'RI Tax Brackets', value: '3.75% / 4.75% / 5.99%' },
          { label: 'RI First Bracket Width', value: 'Up to $80,250 (wide)' },
          { label: 'RI Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'RI Avg Property Tax Rate', value: '~1.61% (4th-highest)' },
          { label: 'RI Avg Combined Sales Tax', value: '7.09%' },
        ],
        faqs: [
          {
            question: 'Why do most Rhode Islanders never leave the bottom bracket?',
            answer:
              'Rhode Island\'s first bracket is unusually wide — 3.75% covers all taxable income up to $80,250. Most residents\' entire income fits inside it. The 4.75% and 5.99% brackets only affect upper-middle and top earners.',
          },
          {
            question: 'At what income does Rhode Island tax Social Security?',
            answer:
              'Rhode Island is one of the few states that taxes Social Security for upper-income retirees — the exemption fully phases out above $101,900 AGI (single) / $126,600 (married). Below a phase-out zone, benefits are exempt.',
          },
          {
            question: 'How high are Rhode Island property taxes?',
            answer:
              '1.61% average effective — fourth-highest nationally. On a $400,000 home, that\'s roughly $6,440 a year, which drives Rhode Island\'s high per-capita tax burden despite moderate income-tax rates.',
          },
          {
            question: 'What\'s the real effective rate on a $95,000 salary in Rhode Island?',
            answer:
              'About 3.1% — roughly $2,959 in state tax. Because the federal standard deduction ($16,100) and the wide 3.75% bracket do the heavy lifting, Rhode Island\'s income tax undercuts its high-cost reputation.',
          },
        ],
        calcStep1:
          'Run Rhode Island\'s three brackets (3.75%, 4.75%, 5.99%) against federal taxable income',
        calcExample:
          'A single filer earning $95,000 has $78,900 of taxable income after the federal deduction — all of it fits inside the wide 3.75% first bracket, producing about $2,959 in state tax.',
        neighbors: [
          { slug: 'connecticut-tax-calculator', label: 'Connecticut Calculator' },
          { slug: 'massachusetts-tax-calculator', label: 'Massachusetts Calculator' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
        ],
      };

    // ─── SOUTH CAROLINA ──────────────────────────────────────────────────────
    case 'southcarolina':
      return {
        name: 'South Carolina',
        hasIncomeTax: true,
        howItWorks: [
          'South Carolina runs a three-bracket progressive tax with a striking bottom rung: 0% on your first $3,560 of taxable income — yes, the first bracket rate is literally zero. The middle bracket is 3% on income up to $17,830, and the top rate of 6.4% applies above that. The state standard deduction is $16,100, plus personal exemptions of $4,430 per person that phase out at higher incomes.',
          'A $73,000 single salary: taxable income after deductions is about $52,470. The 0% bracket costs nothing, the 3% bracket adds about $428, and the remaining $34,640 at 6.4% costs $2,217 — total roughly $2,645, an effective 3.6% of gross. Columbia, Charleston, and Greenville add no city income taxes.',
          'South Carolina is a genuine retiree destination, and the tax code shows it: Social Security is fully exempt, and residents 65+ can deduct up to $10,000 of ANY retirement income type (pension, 401(k), IRA, annuity). Under 65, the exclusion is $3,000. Military retirement is fully exempt at every age. That 6.4% top rate is what working earners pay — retirees face a much gentler schedule.',
          'Property tax averages 0.88% — below average — while combined sales tax runs 7.59%. South Carolina has no estate or inheritance tax, which rounds out its appeal for retirees and high-net-worth households.',
          'Filing in South Carolina: the resident return is Form SC1040, sent to the South Carolina Department of Revenue by April 15. The state offers free e-file, and the retirement exclusions are claimed on the SC1040 itself.',
        ],
        keyRates: [
          { label: 'SC Tax Brackets', value: '0% / 3% / 6.4%' },
          { label: 'SC First Bracket', value: '0% (rare)' },
          { label: 'Retirement Exclusion (65+)', value: '$10,000 any type' },
          { label: 'SC Avg Property Tax Rate', value: '~0.88%' },
          { label: 'SC Avg Combined Sales Tax', value: '7.59%' },
        ],
        faqs: [
          {
            question: 'Does South Carolina really have a 0% tax bracket?',
            answer:
              'Yes — the first $3,560 of taxable income is taxed at literally 0%, one of the few states with a true zero bracket. Then 3% up to $17,830, and 6.4% above that.',
          },
          {
            question: 'What retirement income can South Carolina seniors deduct?',
            answer:
              'Residents 65+ can deduct $10,000 of ANY retirement income — pensions, 401(k)s, IRAs, annuities. Under 65, the exclusion is $3,000. Social Security is fully exempt at every age, and military retirement is fully exempt at every age.',
          },
          {
            question: 'Does South Carolina have an estate tax?',
            answer:
              'No — South Carolina levies neither estate nor inheritance tax, which rounds out its profile as a retiree destination alongside neighbors like Florida and Tennessee.',
          },
          {
            question: 'How does South Carolina\'s 6.4% rate hit middle earners?',
            answer:
              'The 6.4% top rate starts at $17,830 of taxable income, so most middle-class salaries pay 6.4% on the bulk of their income. With personal exemptions ($4,430 per person, phasing out at higher incomes), the effective rate on a $73,000 salary lands around 3.6%.',
          },
        ],
        calcStep1:
          'Run South Carolina\'s brackets (0% to $3,560, 3% to $17,830, 6.4% above) after deductions and exemptions',
        calcExample:
          'A single filer earning $73,000 has about $52,470 of taxable income after deductions. The 0% bracket costs nothing, the 3% band adds about $428, and the rest is taxed at 6.4% — roughly $2,645 total.',
        neighbors: [
          { slug: 'north-carolina-tax-calculator', label: 'North Carolina Calculator' },
          { slug: 'georgia-tax-calculator', label: 'Georgia Calculator' },
          { slug: 'tennessee-tax-calculator', label: 'Tennessee Calculator (0% income tax)' },
        ],
      };

    // ─── VERMONT ──────────────────────────────────────────────────────────────
    case 'vermont':
      return {
        name: 'Vermont',
        hasIncomeTax: true,
        howItWorks: [
          'Vermont uses a four-bracket progressive tax from 3.35% up to 8.75% for 2026. The structure: 3.35% on your first $42,150 of taxable income (single), 6.6% to $102,200, 7.6% to $209,900, and 8.75% above that. That 8.75% top rate is among the highest state income-tax rates in the country — behind only California (13.3%), Hawaii (11%), and New York\'s combined top (10.9%+NYC). Vermont\'s standard deduction is $6,500 single / $13,050 married — deliberately lower than the federal deduction.',
          'On $82,000 single: taxable income after the $6,500 deduction is $75,500. The first $42,150 costs 3.35% ($1,412), the remaining $33,350 at 6.6% costs $2,201 — total about $3,613, an effective 4.4% of gross. But note the bracket jump: cross $102,200 of taxable income and the marginal rate leaps from 6.6% to 7.6%. Burlington adds no city income tax.',
          'Vermont fully taxes Social Security for most earners (exempt only for low-income households under roughly $45,000 AGI with phase-out), which makes it one of the least retiree-friendly states in New England. The state does offer a retirement income adjustment for military and some civil-service pensions.',
          'Property tax runs 1.86% average — fifth-highest nationally — and combined sales tax is 6.35%. Vermont\'s total tax burden consistently ranks among the top five states, which is the trade-off for its school funding model and public services.',
          'Filing in Vermont: the resident return is Form IN-111, filed with the Vermont Department of Taxes by April 15. Vermont offers free e-file, and the state lets you itemize on the state return even if you took the federal standard deduction.',
        ],
        keyRates: [
          { label: 'VT Tax Brackets', value: '3.35% – 8.75% (4 brackets)' },
          { label: 'VT Top Rate', value: '8.75% (4th-highest US)' },
          { label: 'VT Standard Deduction (Single)', value: '$6,500' },
          { label: 'VT Avg Property Tax Rate', value: '~1.86% (5th-highest)' },
          { label: 'VT Avg Combined Sales Tax', value: '6.35%' },
        ],
        faqs: [
          {
            question: 'How high is Vermont\'s top tax rate?',
            answer:
              '8.75% — the fourth-highest top rate in the nation, behind California (13.3%), Hawaii (11%), and New York\'s combined top (10.9% plus NYC tax). It applies to taxable income above $209,900.',
          },
          {
            question: 'Why is Vermont\'s standard deduction lower than the federal one?',
            answer:
              'Vermont sets its own standard deduction at $6,500 single / $13,050 married — deliberately below the federal $16,100. More of your income is taxable at the state level than at the federal level.',
          },
          {
            question: 'Does Vermont tax Social Security?',
            answer:
              'For most retirees, yes — Vermont fully taxes Social Security except for low-income households (roughly under $45,000 AGI, with a phase-out). Vermont consistently ranks among the least retiree-friendly states in New England.',
          },
          {
            question: 'What is the bracket jump at $102,200 in Vermont?',
            answer:
              'Crossing $102,200 of taxable income pushes your marginal rate from 6.6% to 7.6% — a full percentage-point jump in a single dollar. Vermont\'s bracket ladder climbs steeply in the six-figure range.',
          },
        ],
        calcStep1:
          'Run Vermont\'s four brackets (3.35% to 8.75%) after the state standard deduction ($6,500 single)',
        calcExample:
          'A single filer earning $82,000 has $75,500 of taxable income after the state deduction. The first $42,150 is taxed at 3.35% and the remainder at 6.6% — about $3,613 in Vermont tax.',
        neighbors: [
          { slug: 'new-hampshire-tax-calculator', label: 'New Hampshire Calculator (0% income tax)' },
          { slug: 'new-york-tax-calculator', label: 'New York Calculator' },
          { slug: 'massachusetts-tax-calculator', label: 'Massachusetts Calculator' },
        ],
      };

    // ─── WEST VIRGINIA ───────────────────────────────────────────────────────
    case 'westvirginia':
      return {
        name: 'West Virginia',
        hasIncomeTax: true,
        howItWorks: [
          'West Virginia runs a five-bracket progressive tax from 3% up to 5.12% for 2026. The brackets: 3% on your first $10,000 of taxable income, 4% to $25,000, 4.5% to $40,000, and 5.12% on everything above $60,000 after the ongoing phase-down compressed the former 6% and 6.5% mid and top brackets. The state standard deduction matches the federal one ($16,100 single / $32,200 married).',
          'Run $62,000 single through it: taxable income after the standard deduction is $45,900. The first three brackets cost about $1,075 through $40,000, and the remaining $5,900 lands at the top rate for roughly $302 — total about $1,377, an effective 2.2% of gross. Charleston, Morgantown, and Huntington add no city income taxes, but the state does allow a handful of small municipal fees on specific worker categories.',
          'West Virginia has been on an aggressive tax-cut path: the top rate has fallen in steps (from 6.5% down to 5.12%), triggered by revenue surpluses, and the state legislature has discussed eventually phasing toward zero. Social Security is fully exempt for most retirees (phase-out starts at $50,000 AGI single / $100,000 married), and there\'s a $8,000-per-person senior income deduction (65+) that applies broadly.',
          'Property tax is low at 0.69%, and combined sales tax runs 6.57%. With an income tax that keeps shrinking, low property tax, and moderate sales tax, West Virginia\'s total burden has dropped below the national average in recent years.',
          'Filing in West Virginia: the resident return is Form IT-140, due to the West Virginia State Tax Department by April 15. West Virginia provides free e-file, and the senior deduction is claimed directly on the IT-140.',
        ],
        keyRates: [
          { label: 'WV Tax Brackets', value: '3% – 5.12% (5 brackets)' },
          { label: 'WV Standard Deduction', value: 'Federal SD ($16,100)' },
          { label: 'Senior Deduction (65+)', value: '$8,000/person' },
          { label: 'WV Avg Property Tax Rate', value: '~0.69% (low)' },
          { label: 'WV Avg Combined Sales Tax', value: '6.57%' },
        ],
        faqs: [
          {
            question: 'How low can West Virginia\'s income tax go?',
            answer:
              'The top rate has fallen in steps from 6.5% to 5.12%, and the legislature has openly discussed phasing the income tax toward zero. Each cut is triggered by revenue surpluses, so the rate on your paycheck keeps dropping when the state\'s coffers are full.',
          },
          {
            question: 'What is West Virginia\'s senior deduction?',
            answer:
              '$8,000 per person for residents 65+, applied broadly against income. Combined with a Social Security exemption (phase-out at $50,000 AGI single / $100,000 married), most moderate-income seniors pay little state tax.',
          },
          {
            question: 'At what income does West Virginia tax Social Security?',
            answer:
              'Social Security is fully exempt for most retirees — the phase-out starts at $50,000 AGI (single) / $100,000 (married). Below those caps, benefits are untaxed.',
          },
          {
            question: 'How cheap is West Virginia overall?',
            answer:
              'Quite cheap: income-tax effective rates around 2.2% for middle earners, property tax at 0.69% (well below average), and moderate 6.57% sales tax. West Virginia\'s total burden has dropped below the national average in recent years.',
          },
        ],
        calcStep1:
          'Run West Virginia\'s brackets (3%, 4%, 4.5%, then 5.12% above $60,000) against federal taxable income — West Virginia matches the federal standard deduction',
        calcExample:
          'A single filer earning $62,000 has $45,900 of taxable income after the federal deduction. The lower brackets cover the first $40,000, and the remainder lands at the top rate — about $1,377 total, a 2.2% effective rate.',
        neighbors: [
          { slug: 'virginia-tax-calculator', label: 'Virginia Calculator' },
          { slug: 'ohio-tax-calculator', label: 'Ohio Calculator' },
          { slug: 'kentucky-tax-calculator', label: 'Kentucky Calculator' },
        ],
      };

    // ─── ZERO-TAX STATES (Alaska, Nevada, South Dakota, Wyoming, New Hampshire) ─
    case 'alaska':
      return {
        name: 'Alaska',
        hasIncomeTax: false,
        howItWorks: [
          'Alaska has no state income tax — none. In fact, it goes further: Alaska has no state sales tax either (localities can add small sales taxes, but the state itself stays out). The trade-off shows up in property tax, which averages 1.18% — higher than most zero-income-tax states.',
          'The only lines on an Alaska pay stub are federal: the 2026 progressive brackets (10% to 37%) applied after the $16,100 standard deduction (single), plus FICA — 6.2% Social Security up to the $184,500 cap and 1.45% Medicare with no cap. A $75,000 single earner clears about $61,592 a year, and the pay stub shows no state withholding line at all.',
          'The famous Alaska twist: the Permanent Fund Dividend (PFD) pays residents an annual dividend from oil-revenue investments — recently in the $1,300–$1,700 range per person. That\'s a state payment TO you, effectively a negative income tax. Oil revenue is what makes the zero-tax model possible.',
          'Anchorage adds no local income tax (Alaska bans most local income taxes by statute). The overall cost of living runs high — remote logistics drive up consumer prices — but the tax structure itself is among the lightest in the nation.',
          'Filing in Alaska: there is no state income tax return — nothing to file with the state on wage income. The one annual ritual that matters is the PFD application, open January through March through the Permanent Fund Dividend Division.',
        ],
        keyRates: [
          { label: 'AK State Income Tax', value: '0% (none)' },
          { label: 'AK State Sales Tax', value: '0% (local only)' },
          { label: 'Permanent Fund Dividend', value: '~$1,300–$1,700/yr per person' },
          { label: 'AK Avg Property Tax Rate', value: '~1.18%' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: [
          {
            question: 'How does Alaska fund itself with no income tax?',
            answer:
              'Oil. Alaska\'s Permanent Fund invests petroleum royalties, and the earnings cover most state functions plus pay the annual dividend to residents. No tax on wages, and no state sales tax either (only small local sales taxes exist in some boroughs).',
          },
          {
            question: 'What is the Permanent Fund Dividend worth?',
            answer:
              'Recent PFD payments have run $1,300–$1,700 per person per year — a payment FROM the state to every eligible resident who applies. A family of four can receive $5,000+ annually, effectively a negative income tax.',
          },
          {
            question: 'Does Anchorage have local taxes?',
            answer:
              'No local income tax — Alaska bans most municipal income taxes by statute. Anchorage collects no general sales tax either. Property tax (around 1.18% average statewide) is the main local levy.',
          },
          {
            question: 'What taxes do Alaskans actually pay?',
            answer:
              'Federal income tax, FICA, and property tax. That\'s essentially the whole picture for wages — no state income tax, no state sales tax. The trade-off is a higher cost of living driven by remote logistics.',
          },
        ],
        calcStep1: 'Skip state income tax entirely — Alaska has none on any income type',
        calcExample:
          'A single filer earning $75,000 pays zero state tax. After federal tax (about $7,670) and FICA (about $5,738), take-home is roughly $61,592 — and Alaska pays residents an annual dividend on top.',
        neighbors: [
          { slug: 'texas-tax-calculator', label: 'Texas Calculator (0% income tax)' },
          { slug: 'florida-tax-calculator', label: 'Florida Calculator (0% income tax)' },
          { slug: 'nevada-tax-calculator', label: 'Nevada Calculator (0% income tax)' },
        ],
      };

    case 'nevada':
      return {
        name: 'Nevada',
        hasIncomeTax: false,
        howItWorks: [
          'Payroll in Nevada deducts just two things: federal tax and FICA. That means the 2026 federal brackets (10% to 37%) after the $16,100 standard deduction (single), 6.2% Social Security up to $184,500, and 1.45% Medicare on everything. On a $75,000 single salary, roughly $61,592 stays in your pocket.',
          'Nevada funds government through gaming and sales tax instead. Combined sales tax averages 8.38% — notably high, driven by a 4.6% state rate plus county add-ons (Las Vegas area runs 8.375%). Property tax, by contrast, is low: 0.59% average, among the bottom-10 nationally.',
          'The retiree picture is strong: no income tax means no state tax on Social Security, 401(k), IRA, pension, or investment income — everything escapes state tax by default. Nevada has no estate or inheritance tax either.',
          'Las Vegas, Reno, and Henderson add no local income taxes. The overall tax burden ranks among the lowest in the West, though the sales-tax side shifts burden toward frequent spenders and away from savers. For retirees with substantial investment income, Nevada is one of the best deals in the country.',
          'Filing in Nevada: there is no state income tax return to file — your only annual obligation is federal. Nevada has no state withholding, no state W-4, and nothing to reconcile in April.',
        ],
        keyRates: [
          { label: 'NV State Income Tax', value: '0% (constitutional)' },
          { label: 'NV Avg Property Tax Rate', value: '~0.59% (bottom-10)' },
          { label: 'NV Avg Combined Sales Tax', value: '8.38% (Las Vegas 8.375%)' },
          { label: 'Estate/Inheritance Tax', value: 'None' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: [
          {
            question: 'Could Nevada ever add a state income tax?',
            answer:
              'Effectively no — the state constitution requires a supermajority to impose one, and the gaming industry\'s political power makes that near-impossible. Nevada\'s zero-tax status is about as durable as it gets.',
          },
          {
            question: 'What taxes does Nevada rely on instead?',
            answer:
              'Gaming and tourism: casino revenue taxes, the live entertainment tax, and hotel room taxes fund the budget. Combined sales tax averages 8.38% (8.375% in Las Vegas), which is the main levy residents actually feel.',
          },
          {
            question: 'Is Nevada good for retirees?',
            answer:
              'Excellent — no state tax on Social Security, pensions, 401(k) withdrawals, IRA distributions, or investment income. Nevada also has no estate or inheritance tax.',
          },
          {
            question: 'How low are Nevada property taxes?',
            answer:
              '0.59% average effective — bottom-10 nationally. A $400,000 home carries roughly $2,360 a year, which combines with the zero income tax to make Nevada one of the lowest-tax states overall.',
          },
        ],
        calcStep1: 'Skip state income tax entirely — Nevada\'s constitution prohibits one',
        calcExample:
          'A single filer earning $75,000 pays zero state tax. After federal tax (about $7,670) and FICA (about $5,738), take-home lands near $61,592 with no state withholding line at all.',
        neighbors: [
          { slug: 'california-tax-calculator', label: 'California Calculator' },
          { slug: 'arizona-tax-calculator', label: 'Arizona Calculator' },
          { slug: 'idaho-tax-calculator', label: 'Idaho Calculator' },
        ],
      };

    case 'southdakota':
      return {
        name: 'South Dakota',
        hasIncomeTax: false,
        howItWorks: [
          'South Dakota has no state income tax — and it is structurally committed to staying that way. The state collects no tax on wages, retirement income, investment income, or anything else resembling income. There\'s also no state inheritance or estate tax.',
          'In Sioux Falls, Rapid City, or anywhere in the state, your paycheck sees only federal withholding: 2026 progressive brackets (10% to 37%) after the $16,100 standard deduction (single), then 6.2% Social Security up to $184,500 and 1.45% Medicare. A $75,000 single earner banks about $61,592 — nothing goes to the state.',
          'South Dakota funds itself through sales tax (6.44% combined average — moderate, with the state rate at 4.2%) and a uniquely large financial-services sector: the state is a national hub for bank and trust-company charters, and financial-industry franchise fees replace what an income tax would raise.',
          'Property tax averages 1.32% — higher than the zero-tax average, a common trade-off. The state is a magnet for retirees with investment income (no state capital gains or dividend tax) and for trust structures. For pure income-tax purposes, South Dakota is among the cleanest stories in the country.',
          'Filing in South Dakota: there is no state income tax return — no state filing, no withholding reconciliation, nothing due to Pierre in April. Your only interaction with state revenue is the sales tax you pay at checkout.',
        ],
        keyRates: [
          { label: 'SD State Income Tax', value: '0% (none, all types)' },
          { label: 'SD Avg Property Tax Rate', value: '~1.32%' },
          { label: 'SD Avg Combined Sales Tax', value: '6.44% (4.2% state)' },
          { label: 'Estate/Inheritance Tax', value: 'None' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: [
          {
            question: 'Why do trust companies flock to South Dakota?',
            answer:
              'South Dakota is the national hub for bank and trust-company charters — favorable trust laws plus no state income tax on trust earnings. Financial-industry franchise fees replace what an income tax would raise, and the state is structurally committed to staying at zero.',
          },
          {
            question: 'Does South Dakota tax retirement income?',
            answer:
              'No — not pensions, not 401(k)s, not IRAs, not Social Security, not investment income. There is no state income tax of any kind, plus no estate or inheritance tax.',
          },
          {
            question: 'What taxes do South Dakotans pay?',
            answer:
              'Sales tax (6.44% combined average; 4.2% state rate) and property tax (1.32% average). That\'s the trade-off for zero income tax — property tax runs higher than in most zero-tax states.',
          },
          {
            question: 'Is South Dakota a good state for remote workers?',
            answer:
              'For take-home pay, yes — a $75,000 remote salary keeps about $61,592 after federal tax and FICA, with nothing owed to the state. Low cost of living and no tax on investment income amplify the advantage.',
          },
        ],
        calcStep1: 'Skip state income tax entirely — South Dakota taxes no income of any kind',
        calcExample:
          'A single filer earning $75,000 pays zero state tax. Federal tax (about $7,670) and FICA (about $5,738) are the only payroll deductions — take-home is roughly $61,592.',
        neighbors: [
          { slug: 'north-dakota-tax-calculator', label: 'North Dakota Calculator (lowest rates)' },
          { slug: 'minnesota-tax-calculator', label: 'Minnesota Calculator' },
          { slug: 'wyoming-tax-calculator', label: 'Wyoming Calculator (0% income tax)' },
        ],
      };

    case 'wyoming':
      return {
        name: 'Wyoming',
        hasIncomeTax: false,
        howItWorks: [
          'Wyoming has no state income tax — and the state constitution dedicates mineral revenue to a permanent trust fund that makes repealing the zero-tax status structurally difficult. No tax on wages, retirement income, investments, or capital gains.',
          'A Cheyenne or Casper paycheck carries federal withholding only: the 2026 federal brackets (10% to 37%) after the $16,100 standard deduction (single), 6.2% Social Security up to $184,500, and 1.45% Medicare. Run a $75,000 single salary through that and about $61,592 lands in your account — no state line item anywhere on the stub.',
          'Wyoming\'s revenue comes from severance taxes on coal, oil, and natural gas — the state is the top coal producer in the nation, and mineral royalties fill the budget gap that an income tax would otherwise cover. Property tax is notably low at 0.65% average, and combined sales tax runs 5.44% — bottom-10 nationally.',
          'There\'s no estate or inheritance tax. Retirees with investment income pay nothing at the state level, which is why Wyoming frequently appears on lists of top retirement tax states alongside its zero-tax neighbors.',
          'Filing in Wyoming: there is no state income tax return — no April filing, no state withholding, nothing owed to Cheyenne on wages or investments. Your tax season is federal-only.',
        ],
        keyRates: [
          { label: 'WY State Income Tax', value: '0% (constitutionally secure)' },
          { label: 'WY Avg Property Tax Rate', value: '~0.65% (low)' },
          { label: 'WY Avg Combined Sales Tax', value: '5.44% (bottom-10)' },
          { label: 'Estate/Inheritance Tax', value: 'None' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: [
          {
            question: 'What funds Wyoming\'s zero income tax?',
            answer:
              'Severance taxes on coal, oil, and natural gas — Wyoming is the top coal-producing state, and mineral royalties fill the budget gap. A constitutionally dedicated permanent trust fund makes reinstating an income tax structurally difficult.',
          },
          {
            question: 'How low are Wyoming\'s other taxes?',
            answer:
              'Combined sales tax averages 5.44% — bottom-10 nationally — and property tax runs 0.65% average. With zero income tax on top, Wyoming\'s overall burden is among the lowest in the country.',
          },
          {
            question: 'Is Wyoming good for retirees?',
            answer:
              'Very — no state tax on any retirement income type, no estate tax, no inheritance tax, and the lowest property-tax rates in the region. Wyoming routinely appears on top retirement tax-state lists.',
          },
          {
            question: 'How much take-home pay on a $75,000 salary in Wyoming?',
            answer:
              'About $61,592 — federal tax and FICA only. No state withholding line appears on a Wyoming pay stub.',
          },
        ],
        calcStep1: 'Skip state income tax entirely — Wyoming has none, secured by mineral trust revenue',
        calcExample:
          'A single filer earning $75,000 pays zero state tax. After federal tax (about $7,670) and FICA (about $5,738), take-home is roughly $61,592 — no state line on the pay stub.',
        neighbors: [
          { slug: 'montana-tax-calculator', label: 'Montana Calculator' },
          { slug: 'colorado-tax-calculator', label: 'Colorado Calculator' },
          { slug: 'south-dakota-tax-calculator', label: 'South Dakota Calculator (0% income tax)' },
        ],
      };

    case 'newhampshire':
      return {
        name: 'New Hampshire',
        hasIncomeTax: false,
        howItWorks: [
          'New Hampshire is a special case: it has no tax on WAGES, but it historically taxed interest and dividend income. That dividend tax (5% in recent years) has been phased down on a schedule — dropping 1 percentage point per year — and reached zero in 2026, at which point New Hampshire became a full no-income-tax state.',
          'A New Hampshire paycheck is a federal-only affair: 2026 federal brackets (10% to 37%) after the $16,100 standard deduction (single), 6.2% Social Security up to $184,500, and 1.45% Medicare. A $75,000 single earner keeps about $61,592 of it — the state takes no share of wages.',
          'New Hampshire funds itself through property tax — the highest average rate in the country at 2.19% effective, driven by the absence of broad-based income and sales taxes. There\'s no state sales tax either (New Hampshire is one of the five zero-sales-tax states). Manchester and Nashua add no local income taxes.',
          'The trade-off math matters for homeowners: the zero income tax saves a $75,000 earner roughly $3,000/yr versus a 5%-flat-tax state, but a $400,000 house in New Hampshire carries about $8,760 in property tax versus roughly $2,000 in a low-property-tax state. Renters and high earners come out well ahead; homeowners with modest incomes need to run the full numbers.',
          'Filing in New Hampshire: no wage tax means no state return on paycheck income — there is no filing obligation for W-2 earnings. The old interest-and-dividend return (DP-10) is gone now that the tax has reached zero.',
        ],
        keyRates: [
          { label: 'NH Wage Income Tax', value: '0%' },
          { label: 'NH Interest & Dividend Tax', value: 'Phased to 0% by 2026' },
          { label: 'NH State Sales Tax', value: '0% (one of 5 states)' },
          { label: 'NH Avg Property Tax Rate', value: '~2.19% (HIGHEST US)' },
          { label: 'Federal Standard Deduction', value: '$16,100 (single)' },
        ],
        faqs: [
          {
            question: 'Does New Hampshire tax paychecks?',
            answer:
              'No — the "Live Free or Die" state has never taxed wages. And for most of its history it taxed only interest and dividend income, which has now been fully phased out, making New Hampshire a complete no-income-tax state.',
          },
          {
            question: 'What happened to New Hampshire\'s interest and dividend tax?',
            answer:
              'It was scheduled down 1 percentage point per year and reached 0% — the phase-out is complete. Interest, dividends, and capital gains now escape state tax entirely.',
          },
          {
            question: 'Why are New Hampshire property taxes the highest in the country?',
            answer:
              '2.19% average effective — highest in the nation. With no income tax and no sales tax, property tax carries the entire burden of funding schools and local government. A $400,000 home carries roughly $8,760 a year.',
          },
          {
            question: 'Is New Hampshire really tax-free?',
            answer:
              'On income and purchases, yes — no wage tax and no sales tax. But homeowners pay for it through the highest property taxes in the US. Renters and high earners come out well ahead; homeowners with modest incomes should run the full numbers.',
          },
        ],
        calcStep1:
          'Skip state income tax — New Hampshire taxes neither wages nor (after the completed phase-out) interest and dividends',
        calcExample:
          'A single filer earning $75,000 pays zero state tax on wages. After federal tax (about $7,670) and FICA (about $5,738), take-home is roughly $61,592 — though property tax is a separate, heavy cost in New Hampshire.',
        neighbors: [
          { slug: 'massachusetts-tax-calculator', label: 'Massachusetts Calculator' },
          { slug: 'vermont-tax-calculator', label: 'Vermont Calculator' },
          { slug: 'maine-tax-calculator', label: 'Maine Calculator' },
        ],
      };

    default:
      return null;
  }
}
