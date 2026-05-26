// ─── FAQ Data for Server & Client Components ──────────────────────────────────
// This file has NO 'use client' so it can be imported by both Server and Client components.

export interface FAQItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate my take-home pay from my salary?',
    answer:
      'To calculate your take-home pay, start with your gross salary, then subtract federal income tax (using the progressive bracket system), FICA taxes (7.65% for Social Security and Medicare), and your state income tax if applicable. Pre-tax deductions like 401(k) contributions and HSA contributions reduce your taxable income before federal and state taxes are calculated, but do not reduce FICA taxes.',
  },
  {
    question: 'What is FICA and how much does it take from my paycheck?',
    answer:
      'FICA stands for Federal Insurance Contributions Act. It consists of two parts: Social Security tax at 6.2% (up to the wage cap of $176,100 in 2026) and Medicare tax at 1.45% (on all wages, no cap). The total employee FICA rate is 7.65%. If you earn above $200,000, an Additional Medicare Tax of 0.9% applies to income above that threshold.',
  },
  {
    question: 'How much is taken out of a $75,000 salary in taxes?',
    answer:
      'For a $75,000 salary as a single filer: Federal tax ≈ $8,717.50 (after $15,000 standard deduction), FICA = $5,737.50 (7.65%), and state tax varies: $0 in Texas/Florida, $3,575.14 in Illinois. Total deductions range from $14,455 (TX/FL) to $18,030 (IL), leaving a net take-home of $60,545 or $56,970 respectively.',
  },
  {
    question: 'Does contributing to a 401(k) reduce my taxes?',
    answer:
      'Yes, 401(k) contributions are pre-tax deductions that reduce your federal and state taxable income, but not your FICA taxes. For example, contributing $10,000 to a 401(k) on a $75,000 salary reduces your taxable income to $65,000 for federal tax purposes, potentially saving you $2,200+ in federal taxes (at the 22% bracket). The 2026 401(k) contribution limit is $23,500.',
  },
  {
    question: 'What is the difference between effective tax rate and marginal tax rate?',
    answer:
      'Your effective tax rate is the average rate you pay on all your taxable income (total tax ÷ gross income). Your marginal tax rate is the rate on your last dollar of income — the highest bracket your income reaches. For example, a $75,000 salary has a marginal rate of 22% but an effective federal rate closer to 11.6% because the first dollars are taxed at lower brackets.',
  },
];

export const ILLINOIS_FAQS: FAQItem[] = [
  {
    question: 'How much is Illinois state income tax in 2026?',
    answer:
      'Illinois has a flat state income tax rate of 4.95% for 2026. Unlike the federal government and most other states, Illinois applies a single rate to all taxable income regardless of how much you earn — whether you make $30,000 or $300,000, the rate is the same 4.95%.',
  },
  {
    question: 'What is the Illinois personal exemption for 2026?',
    answer:
      'The Illinois personal exemption is $2,775 for 2026. This amount is subtracted from your gross income before the 4.95% flat tax is calculated. For example, on a $75,000 salary: $75,000 - $2,775 = $72,225 taxable income. Illinois tax = $72,225 × 4.95% = $3,575.14. Married couples and dependents may qualify for additional exemptions.',
  },
  {
    question: 'Does Illinois have a standard deduction?',
    answer:
      'No, Illinois does not offer a standard deduction. Instead, it provides a personal exemption of $2,775 per person. This is different from the federal standard deduction ($15,000 for single filers in 2026) which is applied separately to your federal tax calculation only.',
  },
  {
    question: 'Is Illinois a good state for high-income earners?',
    answer:
      'Illinois is less favorable for high-income earners compared to states with no income tax like Texas and Florida. At $200,000 salary, you would pay approximately $9,780 in Illinois state income tax — money that stays in your pocket in TX or FL. However, Illinois does not have an escalating tax rate, so the 4.95% flat rate becomes relatively more competitive at very high incomes compared to states with progressive tax brackets like California (up to 13.3%) or New York (up to 10.9%).',
  },
  {
    question: 'How does the Illinois property tax compare to other states?',
    answer:
      'Illinois has one of the highest effective property tax rates in the nation at approximately 1.78%, second only to New Jersey. On a $294,000 median home value, this translates to about $5,228 per year in property taxes. When combined with the 4.95% income tax and 8.86% average combined sales tax, Illinois has one of the highest overall tax burdens in the United States.',
  },
  {
    question: 'Does Illinois tax Social Security benefits?',
    answer:
      'No, Illinois does not tax Social Security benefits. Illinois also does not tax retirement income from qualified plans including 401(k)s, IRAs, and pensions. This makes Illinois somewhat more favorable for retirees than for working-age individuals, though the high property taxes remain a significant cost.',
  },
];

export const TEXAS_FAQS: FAQItem[] = [
  {
    question: 'Does Texas have a state income tax?',
    answer:
      'No, Texas has no state income tax. This is established in the Texas Constitution and would require a constitutional amendment to change. Texas is one of nine U.S. states (along with Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Washington, and Wyoming) that do not levy a state income tax on wages.',
  },
  {
    question: 'How does Texas make up for no income tax?',
    answer:
      'Texas compensates for the lack of income tax through higher property taxes (average effective rate of 1.71%, among the highest in the nation) and a state sales tax of 6.25% (combined with local taxes, the average rate is 8.2%). The average Texas homeowner pays about $4,959 per year in property taxes. Texas also generates revenue from oil and gas production taxes and business franchise taxes.',
  },
  {
    question: 'Is Texas really tax-free if property taxes are so high?',
    answer:
      'It depends on your situation. For high-income renters or those with modest homes, Texas is very tax-efficient because you avoid income tax while potentially having lower property tax exposure. However, for homeowners with expensive properties, the high property tax (1.71% effective rate) can offset much of the income tax savings. A $500,000 home in Texas generates approximately $8,550/year in property taxes alone.',
  },
  {
    question: 'What is the true cost of living tax burden in Texas?',
    answer:
      'For a typical Texas household earning $75,000 with a $290,000 home and $45,000 in annual consumer spending, the combined annual non-income tax burden is approximately $8,649: $4,959 in property taxes plus $3,690 in estimated sales taxes. While this is significant, it can be less than the combined income + property taxes in states like Illinois, where the same earner would pay $3,575 in state income tax plus $5,228 in property taxes.',
  },
  {
    question: 'Does Texas tax retirement income?',
    answer:
      'No, Texas does not tax any form of retirement income including Social Security benefits, 401(k) withdrawals, IRA distributions, or pension income. Combined with no state income tax, Texas can be attractive for retirees. However, retirees should consider the high property taxes when evaluating total cost of living.',
  },
];

export const FLORIDA_FAQS: FAQItem[] = [
  {
    question: 'Does Florida have a state income tax?',
    answer:
      'No, Florida has no state income tax on wages or salaries. This is protected by the Florida Constitution. Florida is one of nine U.S. states with zero personal income tax, making it particularly attractive for high-income earners and retirees.',
  },
  {
    question: 'How does Florida fund government services without income tax?',
    answer:
      'Florida relies primarily on a 6% state sales tax (with local option surtaxes up to 1.5%, averaging 7% combined) and property taxes (0.86% average effective rate, among the lowest in the nation). Florida also generates significant revenue from tourism-related taxes, corporate income tax (5.5%), and documentary stamp taxes on real estate transactions.',
  },
  {
    question: 'Is Florida the best state for low tax burden?',
    answer:
      'Florida generally has one of the lowest overall tax burdens in the U.S., especially for retirees and high-income earners. With 0% income tax, a low 0.86% effective property tax rate, and a moderate 7% average sales tax, Florida often outperforms both Texas (higher property tax) and Illinois (income + high property tax). For a $75,000 earner with a $395,000 home, the total annual tax burden in Florida is approximately $6,757 ($3,397 property + $3,360 sales), compared to $8,649 in Texas and $9,058 in Illinois.',
  },
  {
    question: 'Does Florida tax Social Security and retirement income?',
    answer:
      'No, Florida does not tax Social Security benefits, pension income, 401(k) withdrawals, IRA distributions, or any other form of retirement income. Florida also has no estate tax or inheritance tax. This makes Florida one of the most retiree-friendly states in the nation from a tax perspective.',
  },
  {
    question: 'What is the Florida Homestead Exemption?',
    answer:
      'The Florida Homestead Exemption reduces the assessed value of a primary residence by up to $50,000 for property tax purposes. The first $25,000 exempts all property taxes; the second $25,000 exempts non-school taxes. This can save homeowners $800–$1,500 per year. Florida also caps annual assessment increases at 3% for homesteaded properties (Save Our Homes cap), which provides significant long-term savings as home values appreciate.',
  },
];

export const CALIFORNIA_FAQS: FAQItem[] = [
  {
    question: 'How much is California state income tax in 2026?',
    answer:
      'California has a progressive state income tax with rates ranging from 1% to 13.3% across 9 tax brackets for 2026. The rate you pay depends on your taxable income after the standard deduction. For a single filer earning $100,000, the effective California state tax rate is approximately 5.4% — lower than the top marginal rate because only income above each bracket threshold is taxed at the higher rate.',
  },
  {
    question: 'What is the California standard deduction for 2026?',
    answer:
      'The California standard deduction for 2026 is $6,083 for single filers, $12,166 for married filing jointly, and $12,293 for head of household. This amount is subtracted from your gross income before the progressive tax brackets are applied. For example, a single filer with $100,000 gross income would have $93,917 in taxable income for California purposes.',
  },
  {
    question: 'Does California have the highest state income tax?',
    answer:
      "Yes, California has the highest top marginal state income tax rate in the nation at 13.3%. This rate applies to taxable income above $698,271 for single filers. However, most Californians pay a much lower effective rate because the progressive brackets start at just 1%. For moderate incomes (e.g., $75,000–$100,000), the effective California tax rate is typically 4–6%, which is comparable to Illinois's flat 4.95% rate.",
  },
  {
    question: 'Does California tax Social Security benefits?',
    answer:
      'No, California does not tax Social Security benefits. This is one of the few tax advantages for retirees in California. However, California does tax most other forms of retirement income including 401(k) withdrawals, IRA distributions, and pension income, which means many retirees still face a significant state tax burden.',
  },
  {
    question: 'How high are California sales taxes?',
    answer:
      'California has the highest base state sales tax rate in the nation at 7.25%. When combined with local sales taxes, the average combined rate is approximately 8.82%, and some cities exceed 10%. However, groceries are generally exempt from state sales tax (though local taxes may still apply), which helps reduce the effective burden on essential purchases.',
  },
  {
    question: "What is California's property tax rate?",
    answer:
      "California's average effective property tax rate is approximately 0.71% — surprisingly low compared to states like Illinois (1.78%) or Texas (1.71%). This is largely due to Proposition 13, which caps annual assessed value increases at 2% and limits the effective tax rate. On a $785,000 median home value, the annual property tax is approximately $5,574. However, the high home values in California mean the dollar amount paid is still significant.",
  },
];

export const NEWYORK_FAQS: FAQItem[] = [
  {
    question: 'How much is New York state income tax in 2026?',
    answer:
      'New York has a progressive state income tax with rates ranging from 4% to 10.9% across 9 tax brackets for 2026. For a single filer earning $100,000, the effective New York state tax rate is approximately 4.9% after the $8,100 standard deduction. The top marginal rate of 10.9% only applies to taxable income above $25,000,000.',
  },
  {
    question: 'What is the New York standard deduction for 2026?',
    answer:
      "The New York standard deduction for 2026 is $8,100 for single filers, $16,200 for married filing jointly, and $11,200 for head of household. This is higher than California's standard deduction and is subtracted from your gross income before the progressive tax brackets are applied.",
  },
  {
    question: 'Does New York City have its own income tax?',
    answer:
      'Yes, New York City residents pay an additional city income tax on top of the state income tax. The NYC tax ranges from 3.078% to 3.876% depending on income level. For a $100,000 salary, a NYC resident would pay approximately $3,400 in city tax on top of the ~$4,946 state tax. This means NYC residents effectively face the highest combined state + local income tax burden in the nation.',
  },
  {
    question: 'How high are New York property taxes?',
    answer:
      'New York has a high average effective property tax rate of approximately 1.62%, among the highest in the nation. On a $425,000 median home value, this translates to about $6,885 per year in property taxes. Property tax rates vary significantly by county — Long Island and Westchester County rates can exceed 2.5%, while some upstate areas are lower.',
  },
  {
    question: 'Does New York tax Social Security benefits?',
    answer:
      'No, New York does not tax Social Security benefits. New York also excludes up to $20,000 of qualified retirement income (pensions, 401(k), IRA) from taxation for taxpayers aged 59½ and older. This makes New York moderately more favorable for retirees than California, which taxes most retirement income except Social Security.',
  },
  {
    question: 'Is New York the highest-taxed state?',
    answer:
      "New York frequently ranks as the highest-taxed state overall when combining income tax, property tax, and sales tax. For a $100,000 single filer in NYC, the combined state + city income tax can exceed $8,300, plus 8.52% average combined sales tax and 1.62% effective property tax rates. However, for upstate New York residents who don't pay the NYC tax, the overall burden is significantly lower.",
  },
];

export const CAPITAL_GAINS_FAQS: FAQItem[] = [
  {
    question: "What's the difference between short-term and long-term capital gains?",
    answer:
      'Short-term capital gains come from assets held for one year or less and are taxed at your ordinary income tax rate (up to 37%). Long-term capital gains come from assets held for more than one year and are taxed at preferential rates of 0%, 15%, or 20% depending on your total taxable income. For 2026, the 0% rate applies to taxable income up to $47,025 (single) or $94,050 (married). The 15% rate applies up to $518,900 (single) or $583,750 (married). Above those thresholds, the 20% rate applies.',
  },
  {
    question: 'How are cryptocurrency gains taxed?',
    answer:
      'The IRS treats cryptocurrency as property, meaning crypto gains follow the same capital gains rules as stocks and other investments. If you hold crypto for more than one year before selling, you qualify for the lower long-term capital gains rates. Short-term crypto gains are taxed as ordinary income. Note that each disposal — including trading one cryptocurrency for another or using crypto to purchase goods — is a taxable event, not just selling for fiat currency.',
  },
  {
    question: 'What is the Net Investment Income Tax (NIIT)?',
    answer:
      'The Net Investment Income Tax is an additional 3.8% tax on net investment income (including capital gains, dividends, interest, and rental income) that applies when your modified adjusted gross income exceeds $200,000 (single) or $250,000 (married filing jointly). The NIIT applies on the lesser of your net investment income or the amount by which your MAGI exceeds the threshold. This effectively raises the top long-term capital gains rate from 20% to 23.8%.',
  },
  {
    question: 'How can I reduce my capital gains tax?',
    answer:
      'Several strategies can reduce capital gains tax: (1) Hold investments for more than one year to qualify for lower long-term rates. (2) Use tax-loss harvesting — sell losing investments to offset gains. You can deduct up to $3,000 in net losses against ordinary income per year. (3) Time gains strategically — if your income is lower in a particular year, you may qualify for the 0% long-term rate. (4) Contribute to tax-advantaged accounts (401(k), IRA) to reduce your overall taxable income. (5) Donate appreciated assets to charity to avoid capital gains tax entirely while claiming a deduction for the fair market value.',
  },
  {
    question: 'Do I have to pay capital gains tax on my primary home?',
    answer:
      'You may be able to exclude up to $250,000 (single) or $500,000 (married) in capital gains from the sale of your primary residence if you owned and lived in the home for at least 2 of the last 5 years. Gains above the exclusion amount are taxed as long-term capital gains. This exclusion can be used once every 2 years. Investment properties and second homes do not qualify for this exclusion.',
  },
  {
    question: 'What are the 2026 capital gains tax brackets?',
    answer:
      'For 2026, long-term capital gains are taxed at three rates: 0% for taxable income up to $47,025 (single) / $94,050 (married) / $63,000 (HOH); 15% for income up to $518,900 (single) / $583,750 (married) / $551,350 (HOH); and 20% for income above those thresholds. These brackets are based on total taxable income, not just capital gains. Short-term gains are taxed at ordinary income rates: 10%, 12%, 22%, 24%, 32%, 35%, and 37%.',
  },
];

export const SELF_EMPLOYMENT_FAQS: FAQItem[] = [
  {
    question: 'What is the self-employment tax rate for 2026?',
    answer:
      'The self-employment tax rate is 15.3% on 92.35% of your net business income. This breaks down to 12.4% for Social Security (on income up to the $176,100 wage cap) and 2.9% for Medicare (on all income, no cap). If your net SE income exceeds $200,000, an additional 0.9% Medicare surtax applies to the amount above that threshold, bringing the effective Medicare rate to 3.8% on income above $200,000.',
  },
  {
    question: 'How do quarterly estimated tax payments work?',
    answer:
      'Self-employed individuals must make quarterly estimated tax payments to the IRS on April 15, June 15, September 15, and January 15. Each payment should cover roughly 25% of your expected annual tax liability (including both income tax and self-employment tax). To avoid underpayment penalties, you must pay at least 100% of your prior-year tax liability (110% if your AGI exceeded $150,000) or 90% of your current-year liability. Payments can be made online at IRS.gov through Direct Pay or EFTPS.',
  },
  {
    question: 'Can I deduct half of my self-employment tax?',
    answer:
      'Yes, you can deduct half of your self-employment tax as an above-the-line deduction on your federal tax return. This deduction reduces your adjusted gross income (AGI), which in turn lowers your federal income tax and potentially your state income tax. For example, if your SE tax is $14,130, you can deduct $7,065 from your income before calculating income tax. This deduction does not reduce your self-employment tax itself.',
  },
  {
    question: 'How does self-employment tax compare to W-2 FICA withholding?',
    answer:
      'W-2 employees pay 7.65% in FICA taxes (6.2% Social Security + 1.45% Medicare), and their employer pays a matching 7.65%. Self-employed individuals pay the full 15.3% because they are both the employer and employee. However, the 92.35% adjustment and the above-the-line deduction for half of SE tax help offset this difference. On $100,000 of income, a self-employed person pays roughly $7,065 more in payroll/SE taxes than a W-2 employee earning the same amount.',
  },
  {
    question: 'What tax deductions are available for self-employed individuals?',
    answer:
      'Self-employed individuals can deduct: (1) Half of self-employment tax (above-the-line). (2) Solo 401(k) contributions up to $70,000 (2026, including employer portion). (3) Health insurance premiums (above-the-line). (4) Home office deduction ($5/sq ft up to 300 sq ft simplified method, or actual expenses). (5) Business expenses including supplies, software, travel, meals (50%), vehicle expenses, and professional services. (6) Qualified Business Income (QBI) deduction up to 20% of qualified business income.',
  },
  {
    question: 'Should I form an S-Corporation to save on self-employment tax?',
    answer:
      'An S-Corporation can reduce self-employment tax by splitting income between salary (subject to SE/FICA tax) and distributions (not subject to SE tax). For example, on $150,000 of net income, you might pay yourself a $75,000 salary and take $75,000 as distributions, saving SE tax on the distribution portion. However, S-Corps require reasonable compensation, additional payroll processing, state filing fees, and more complex tax returns. The savings typically outweigh the costs for net incomes above $60,000–$80,000. Consult a tax professional for your specific situation.',
  },
  {
    question: "What happens if I don't pay quarterly estimated taxes?",
    answer:
      "If you don't pay enough in quarterly estimated taxes, you may face an underpayment penalty when you file your annual return. The penalty is calculated based on the amount underpaid and the IRS interest rate for that quarter (typically 3-8% annually). The penalty applies even if you pay the full amount by April 15. You can avoid penalties by meeting the safe harbor rules: paying 100% of your prior-year tax (110% if AGI > $150,000) or 90% of your current-year tax through withholding and estimated payments.",
  },
];

export const RETIREMENT_FAQS: FAQItem[] = [
  {
    question: 'How does a 401(k) grow over time?',
    answer:
      'A 401(k) grows through compound interest: your contributions earn investment returns, and those returns themselves earn returns in subsequent years. For example, contributing $10,000/year with a 7% average annual return grows to approximately $149,735 after 10 years, $405,664 after 20 years, and $1,011,067 after 30 years. Starting early dramatically increases your final balance due to the compounding effect.',
  },
  {
    question: 'What is employer matching and how does it work?',
    answer:
      'Employer matching is when your employer contributes additional money to your 401(k) based on your contributions. A common match is 50% of contributions up to 6% of salary. For example, if you earn $100,000 and contribute 6% ($6,000), your employer adds $3,000. This is essentially free money — always contribute at least enough to get the full employer match.',
  },
  {
    question: 'How much should I contribute to my 401(k)?',
    answer:
      'Financial advisors recommend contributing at least enough to capture the full employer match (typically 4-6% of salary). Beyond that, aim for 10-15% of gross income including the employer match. The 2026 contribution limit is $23,500, with an additional $7,500 catch-up contribution for those aged 50+ and an extra $11,250 catch-up for ages 60-63.',
  },
  {
    question: 'What is the difference between traditional and Roth 401(k)?',
    answer:
      'Traditional 401(k) contributions are pre-tax, reducing your current taxable income, but withdrawals in retirement are taxed as ordinary income. Roth 401(k) contributions are made with after-tax dollars, but qualified withdrawals in retirement are completely tax-free. Choose traditional if you expect to be in a lower tax bracket in retirement; choose Roth if you expect higher rates or want tax-free income in retirement.',
  },
  {
    question: 'When can I withdraw from my 401(k) without penalties?',
    answer:
      'You can withdraw from your 401(k) without the 10% early withdrawal penalty starting at age 59½. Required Minimum Distributions (RMDs) begin at age 73 under current law. Early withdrawals before 59½ generally incur a 10% penalty plus income tax, with limited exceptions for hardship, certain medical expenses, or separation from service at age 55+.',
  },
];

export const RELOCATION_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate equivalent salary between two states?',
    answer:
      'To calculate an equivalent salary between states, you need to account for differences in state income tax rates, property taxes, sales taxes, and overall cost of living. Start with your current take-home pay after all taxes, then determine what gross salary in the new state would produce the same net take-home pay. Our relocation calculator handles this automatically by computing federal tax, FICA, and state-specific taxes for both states.',
  },
  {
    question: 'Is moving to a no-income-tax state always better?',
    answer:
      'Not necessarily. States with no income tax often compensate with higher property taxes, sales taxes, or other fees. Texas, for example, has 0% income tax but a 1.71% average property tax rate — nearly double Florida\'s 0.86%. For a homeowner with a $400,000 house, that\'s $3,400 more per year in Texas property taxes. Consider your full financial picture including housing costs, spending habits, and lifestyle needs.',
  },
  {
    question: 'What is cost of living and why does it matter for relocation?',
    answer:
      'Cost of living measures how much it costs to maintain a certain standard of living in different locations. It includes housing, groceries, healthcare, transportation, and utilities. A $100,000 salary in Texas goes much further than $100,000 in California because housing and taxes are significantly lower. Always compare cost-of-living-adjusted salaries, not just gross income, when evaluating a relocation offer.',
  },
  {
    question: 'How much more salary do I need to move from Texas to California?',
    answer:
      'To maintain the same take-home pay moving from Texas to California, you typically need a 15-25% salary increase depending on your income level. For a $100,000 salary in Texas (net ~$79,000 after federal tax and FICA), you would need approximately $120,000-$125,000 in California to achieve similar take-home pay because California\'s progressive income tax (1%-13.3%) can take an additional $5,000-$8,000 from your paycheck compared to Texas\'s 0% rate.',
  },
  {
    question: 'Does relocating affect my federal taxes?',
    answer:
      'Your federal income tax and FICA taxes remain the same regardless of which state you live in — they are based on your total taxable income, not your location. However, state and local taxes vary significantly and directly impact your net take-home pay. Some states also offer different deductions and credits that can affect your overall tax burden. Moving to a different state primarily changes your state and local tax obligations.',
  },
];

export const MORTGAGE_FAQS: FAQItem[] = [
  {
    question: 'How is a monthly mortgage payment calculated?',
    answer:
      'The monthly mortgage payment is calculated using the formula M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (years × 12). This formula produces a fixed payment that ensures the loan is fully paid off by the end of the term.',
  },
  {
    question: 'How much can extra mortgage payments save?',
    answer:
      'Extra mortgage payments can save dramatic amounts. On a $280,000 loan at 6.5% for 30 years, adding just $200/month in extra payments saves approximately $76,856 in total interest and pays off the loan 5.2 years early. Adding $500/month saves over $140,000 in interest and cuts the loan term by 10+ years. Every extra dollar goes directly toward reducing principal.',
  },
  {
    question: 'Should I choose a 15-year or 30-year mortgage?',
    answer:
      'A 15-year mortgage typically has a lower interest rate (often 0.5–1% less) and saves significantly on total interest, but requires higher monthly payments. For a $280,000 loan: at 5.5% over 15 years, monthly payment is $2,287 with total interest of ~$131,700; at 6.5% over 30 years, monthly payment is $1,769 with total interest of ~$356,967. Choose 15-year if you can comfortably afford the higher payment; choose 30-year and make extra payments for flexibility.',
  },
  {
    question: 'What percentage of my mortgage payment goes to interest?',
    answer:
      'In the early years, most of your payment goes toward interest. On a 30-year $280,000 loan at 6.5%, the first payment is approximately $1,517 interest (85.7%) and $252 principal (14.3%). This gradually shifts — by year 15, it is roughly 50/50, and by year 25, most goes to principal. This is called amortization, and it is why extra payments early in the loan have the greatest impact on total interest savings.',
  },
  {
    question: 'How much house can I afford?',
    answer:
      'Financial experts recommend the 28/36 rule: spend no more than 28% of gross monthly income on housing costs (mortgage + taxes + insurance) and no more than 36% on total debt. For a $75,000 salary, that means a maximum monthly housing payment of ~$1,750. With a 20% down payment at 6.5%, this translates to a home price of approximately $250,000–$280,000 depending on property tax and insurance costs.',
  },
];
