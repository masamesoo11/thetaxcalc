/**
 * Embedded Blog Content — Full markdown for all blog articles.
 *
 * This is the ULTIMATE fallback that works everywhere:
 * - Edge runtime (no fs/path needed)
 * - Without Turso database connection
 * - Without any external dependencies
 *
 * When Turso has content, it's used instead.
 * When Turso is empty/down, this embedded content ensures the blog still works.
 */

export const BLOG_CONTENT: Record<string, string> = {
  "2026-federal-tax-brackets-explained": `# 2026 Federal Tax Brackets Explained

Understanding how federal income tax brackets work is the first step to taking control of your finances. The 2026 tax year brings the same seven-bracket system we've had since the Tax Cuts and Jobs Act of 2017, but with inflation-adjusted thresholds that mean many Americans will pay less tax on the same income compared to previous years.

## How Tax Brackets Work

The biggest misconception about tax brackets is that earning more money can somehow leave you with less take-home pay. That's not how it works. The US uses a **progressive tax system** with marginal rates — meaning only the income within each bracket gets taxed at that bracket's rate.

### A Simple Example

Let's say you're a single filer with $60,000 in taxable income for 2026:

- **First $11,925** taxed at 10% = $1,192.50
- **$11,926 to $48,475** taxed at 12% = $4,386.00
- **$48,476 to $60,000** taxed at 22% = $2,535.50

Your **total federal income tax** = $8,114.00
Your **effective tax rate** = 13.5% (not 22%)

See? Even though your top bracket is 22%, your actual tax rate is much lower because most of your income falls into the lower brackets.

## 2026 Federal Tax Brackets for Single Filers

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | Over $626,350 |

## 2026 Federal Tax Brackets for Married Filing Jointly

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $23,850 |
| 12% | $23,851 – $96,950 |
| 22% | $96,951 – $206,700 |
| 24% | $206,701 – $394,600 |
| 32% | $394,601 – $501,050 |
| 35% | $501,051 – $751,600 |
| 37% | Over $751,600 |

## 2026 Federal Tax Brackets for Head of Household

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $17,000 |
| 12% | $17,001 – $64,850 |
| 22% | $64,851 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,500 |
| 35% | $250,501 – $626,350 |
| 37% | Over $626,350 |

## 2026 Standard Deduction

Most taxpayers take the standard deduction rather than itemizing. For 2026:

- **Single**: $16,100
- **Married Filing Jointly**: $32,200
- **Head of Household**: $24,150

If you're 65 or older or blind, you can claim an additional standard deduction of $1,600 (single) or $1,300 (married).

## Marginal vs. Effective Tax Rate

Understanding the difference between these two rates is crucial:

- **Marginal rate**: The tax rate on your last dollar of income (your "top bracket")
- **Effective rate**: Your total tax divided by your total income (what you actually pay overall)

Most people confuse the two and overestimate how much tax they'll owe. A single filer making $100,000 might have a marginal rate of 24%, but their effective rate is closer to 14-15% after the standard deduction.

### Worked Example: $100,000 Single Filer in 2026

Let's walk through a complete calculation. You earn $100,000 gross salary, single filing status, claiming the standard deduction.

1. **Subtract standard deduction**: $100,000 − $16,100 = $83,900 taxable income
2. **Apply progressive brackets**:
   - 10% on first $11,925 = $1,192.50
   - 12% on $11,926 to $48,475 = $4,386.00
   - 22% on $48,476 to $83,900 = $7,803.50
3. **Total federal income tax** = $13,382.00
4. **Effective federal tax rate** = $13,382 ÷ $100,000 = 13.4%

Your marginal rate is 22%, but your effective rate is only 13.4%. That's a huge difference and explains why people often overestimate their tax burden.

## FICA Payroll Taxes on Top

Federal income tax is only part of the story. You also pay FICA (Federal Insurance Contributions Act) taxes:

- **Social Security tax**: 6.2% on wages up to $184,500 (2026 cap)
- **Medicare tax**: 1.45% on all wages (no cap)
- **Additional Medicare tax**: 0.9% on wages above $200,000 (single)

On a $100,000 salary, FICA adds:
- Social Security: $100,000 × 6.2% = $6,200
- Medicare: $100,000 × 1.45% = $1,450
- Total FICA = $7,650

So your total federal tax burden on $100,000 is $13,382 (income tax) + $7,650 (FICA) = **$21,032**, or about 21% of your gross income.

## State Income Tax Varies Widely

After federal tax and FICA, your state may also charge income tax. State income tax ranges from 0% (Texas, Florida, Washington, Nevada, etc.) to over 13% (California's top rate). Use our [state tax calculators](/texas-tax-calculator) to see exactly what you'll owe in your state.

## How to Calculate Your Federal Tax

1. Start with your gross income (salary, wages, self-employment income)
2. Subtract pre-tax deductions (401(k), HSA, traditional IRA)
3. Subtract the standard deduction ($16,100 single, $32,200 married)
4. Apply the progressive brackets to your taxable income
5. Add FICA taxes (6.2% + 1.45%) on your gross wages
6. Add state income tax (if applicable)

The result is your total tax burden. Subtract from gross income to get your take-home pay.

## Tax Planning Strategies

### 1. Maximize Pre-Tax Contributions

Contributing to a 401(k) or traditional IRA reduces your taxable income. In 2026, you can contribute up to $24,500 to a 401(k) ($30,500 if 50+). A $10,000 contribution at the 22% marginal rate saves you $2,200 in federal tax.

### 2. Use an HSA if Eligible

Health Savings Accounts are triple-tax-advantaged: pre-tax contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. The 2026 contribution limit is $4,400 (self) or $8,300 (family).

### 3. Consider Roth vs Traditional

Roth accounts don't reduce current taxable income, but qualified withdrawals are tax-free. They're best when you expect to be in a higher tax bracket in retirement.

### 4. Bunch Deductions

If your itemized deductions are close to the standard deduction, consider "bunching" two years of deductions into one year to exceed the standard deduction threshold.

## Common Tax Bracket Myths

### Myth 1: "I'll earn less if I get a raise"

False. Because of progressive brackets, a raise always increases your take-home pay. Even if you cross into a higher bracket, only the income above the threshold is taxed at the higher rate.

### Myth 2: "My tax bracket is my tax rate"

False. Your marginal rate (top bracket) is not your effective rate (what you actually pay). Most people pay significantly less than their marginal rate.

### Myth 3: "The standard deduction isn't worth taking"

False. After the Tax Cuts and Jobs Act of 2017, the standard deduction nearly doubled. About 90% of taxpayers now take the standard deduction because it's higher than their itemized deductions.

## Frequently Asked Questions

### When are 2026 taxes due?

April 15, 2027 is the filing deadline for 2026 tax returns. If April 15 falls on a weekend or holiday, the deadline moves to the next business day.

### What is the 2026 standard deduction?

For 2026, the standard deduction is $16,100 for single filers, $32,200 for married filing jointly, and $24,150 for head of household.

### How do tax brackets work?

Tax brackets use marginal rates — only income within each bracket is taxed at that bracket's rate. Your effective tax rate is always lower than your top marginal rate.

### What's the highest tax bracket for 2026?

The top federal tax bracket for 2026 is 37%, which applies to single filers with taxable income over $626,350.

### What's the difference between marginal and effective tax rate?

Marginal rate is the tax on your last dollar of income (your top bracket). Effective rate is your total tax divided by your total income — usually much lower.

## Conclusion

Federal tax brackets aren't as scary as they look. The progressive system means your effective tax rate is always lower than your marginal rate, and the standard deduction shields a chunk of your income from tax entirely. Use our [2026 federal tax brackets](/federal-tax-brackets) page for a complete reference, or our [Paycheck Calculator](/paycheck-calculator) for a personalized calculation.`,

  "florida-vs-texas-tax-comparison": `# Florida vs Texas Tax Comparison 2026

Florida and Texas are two of the most popular states for people looking to escape high state income taxes. Both states have **zero state income tax**, but they're not identical when it comes to overall tax burden. This guide breaks down how Florida and Texas compare across income tax, property tax, sales tax, and overall cost of living for 2026.

## Quick Verdict: Which State Saves You More?

The answer depends on your income source and lifestyle:

- **High earners**: Texas wins slightly due to lower overall sales tax burden
- **Homeowners**: Florida wins significantly due to much lower property taxes
- **Retirees**: Florida wins due to no tax on retirement income (Texas also doesn't tax it, but Florida has additional senior-friendly policies)
- **Renters**: Texas wins due to lower overall sales tax and lower rents

On a $100,000 salary with a $400,000 home, the difference is roughly **$1,500-$2,500 per year** in Florida's favor — primarily because of property tax differences.

## Income Tax: 0% in Both States

Both Florida and Texas have **zero state income tax**. Your federal income tax and FICA taxes will be identical in both states. On a $100,000 single-filer salary:

- Federal income tax: $13,382
- FICA: $7,650
- State income tax: $0 (both states)
- **Take-home pay**: $78,968 (same in both states)

This is the big draw for high earners — moving from California (top rate 13.3%) to Florida or Texas saves $5,000-$15,000+ per year on state income tax alone.

## Property Tax: Florida Wins Big

This is where the two states diverge significantly. Texas has some of the highest property taxes in the nation, while Florida has relatively moderate property taxes.

### Texas Property Tax

- **Average effective rate**: 1.71% of home value (6th highest in US)
- **On $400,000 home**: ~$6,840/year
- **On $600,000 home**: ~$10,260/year
- **Homestead exemption**: $25,000 (or $40,000 for seniors)

### Florida Property Tax

- **Average effective rate**: 0.86% of home value (24th highest in US)
- **On $400,000 home**: ~$3,440/year
- **On $600,000 home**: ~$5,160/year
- **Homestead exemption**: $25,000 + Save Our Homes cap (assessed value increases limited to 3%/year)

### Property Tax Savings on a $400K Home

- **Texas**: $6,840/year
- **Florida**: $3,440/year
- **Florida saves**: $3,400/year

This is the single biggest tax difference between the two states. If you own a home, Florida's property tax advantage often outweighs any other consideration.

## Sales Tax: Texas Has Slight Edge

### Texas Sales Tax

- **State rate**: 6.25%
- **Average combined rate**: 8.20% (with local taxes)
- **Highest combined**: 8.25% in some areas
- **Groceries**: Exempt (except for prepared food)
- **Medicine**: Exempt

### Florida Sales Tax

- **State rate**: 6.00%
- **Average combined rate**: 7.02% (with local taxes)
- **Highest combined**: 8.50% in some counties
- **Groceries**: Exempt
- **Medicine**: Exempt

### Sales Tax Savings on $40,000 Annual Spending

- **Texas (8.20%)**: $3,280/year
- **Florida (7.02%)**: $2,808/year
- **Florida saves**: $472/year

Florida has a lower average sales tax rate, but Texas has more counties at the 6.25% state minimum. In practice, the sales tax difference is small — usually less than $500/year for typical spending patterns.

## Other Taxes to Consider

### Texas-Specific Taxes

- **Franchise tax**: 0.375%-0.75% on business margins (most businesses pay this even without corporate income tax)
- **No estate tax**: Texas abolished its estate tax in 2015
- **No inheritance tax**: Same as estate tax

### Florida-Specific Taxes

- **Corporate income tax**: 5.5% on Florida corporate income (Texas has none — uses franchise tax instead)
- **No estate tax**: Florida abolished its estate tax in 2004
- **Documentary stamp tax**: 0.70% on real estate transfers ($2,800 on a $400K home sale) — Texas has no equivalent
- **Tourist development tax**: 6% on short-term rentals (paid by tourists, not residents)

## Cost of Living Comparison

Taxes are only one part of the financial picture. Here's how Florida and Texas compare on other major expenses:

### Housing Costs

- **Median home price (2026)**:
  - Florida: $410,000 (statewide)
  - Texas: $345,000 (statewide)
- **Average rent (2BR apartment)**:
  - Florida: $1,850/month
  - Texas: $1,520/month

Texas has significantly cheaper housing, especially outside the major metros. Miami, Orlando, and Tampa are far more expensive than Dallas, Houston, or San Antonio.

### Insurance Costs

- **Homeowners insurance**:
  - Florida: $4,500-$8,000/year (hurricane risk)
  - Texas: $2,500-$4,500/year (hail, tornado risk)
- **Auto insurance**:
  - Florida: $2,800/year (high due to litigation)
  - Texas: $1,850/year

Florida's insurance costs are 50-100% higher than Texas, which can wipe out the property tax savings.

### Utilities

- **Electricity**: Texas has deregulated market — variable rates, often $0.11-$0.16/kWh
- **Florida**: Regulated market, rates around $0.13-$0.15/kWh
- **Water**: Florida has higher water costs due to desalination and stormwater management

## Total Tax Burden Comparison

Let's compare the total tax burden for a $100,000 single filer with a $400,000 home in each state:

### Florida Total Tax Burden

- Federal income tax: $13,382
- FICA: $7,650
- State income tax: $0
- Property tax: $3,440
- Sales tax (on $40K spending): $2,808
- **Total tax**: $27,280

### Texas Total Tax Burden

- Federal income tax: $13,382
- FICA: $7,650
- State income tax: $0
- Property tax: $6,840
- Sales tax (on $40K spending): $3,280
- **Total tax**: $31,152

### Difference

- **Florida saves** approximately **$3,872 per year** on total tax burden
- But Florida's higher insurance costs (~$2,500/year more) eat into this advantage
- **Net difference**: Florida saves roughly $1,300-$1,500/year after accounting for insurance

## Which State Is Better for You?

### Choose Florida If:

- You're a retiree (no tax on retirement income, plus senior homestead exemptions)
- You own an expensive home ($500K+)
- You prefer warm, coastal climate year-round
- You work in tourism, healthcare, or finance
- You don't mind higher insurance costs

### Choose Texas If:

- You're a high-earning professional or business owner
- You rent (avoid property tax difference)
- You prefer a lower overall cost of living
- You work in tech, energy, or manufacturing
- You want more housing for your money
- You prefer no state corporate income tax (just franchise tax)

## Tax Planning Strategies

### 1. Establish Domicile Properly

If you're moving from a high-tax state (CA, NY, IL), document your move carefully. Both states have aggressive "source income" rules — keep utility bills, voter registration, and driver's license updated immediately.

### 2. Claim Homestead Exemption

Both states offer homestead exemptions that reduce your property's taxable value. In Texas, this is $25,000 (or $40,000 for 65+). In Florida, it's $25,000 plus the Save Our Homes cap that limits annual assessment increases to 3%.

### 3. Time Your Home Sale

If moving between the states, consider the Florida documentary stamp tax (0.70% of sale price) when selling or buying. On a $500K home, that's $3,500.

### 4. Use Florida's Save Our Homes Cap

Florida's Save Our Homes cap limits annual assessment increases on homesteaded property to 3% or the CPI, whichever is lower. Over 10+ years, this can save tens of thousands of dollars compared to Texas where assessments follow the market.

## Frequently Asked Questions

### Which state has lower taxes overall?

Florida has slightly lower overall taxes for most homeowners, primarily due to lower property taxes. Texas wins for renters and high earners who don't own expensive homes.

### Does Florida tax Social Security?

No. Florida has no state income tax, so Social Security benefits are not taxed at the state level. (They may still be taxed federally depending on your income.)

### Does Texas tax retirement income?

No. Texas has no state income tax, so retirement income (pensions, 401(k) withdrawals, IRA distributions) is not taxed at the state level.

### Which state has higher property taxes?

Texas has significantly higher property taxes — about 1.71% of home value vs. Florida's 0.86%. On a $400K home, that's a $3,400/year difference.

### Are groceries taxed in Florida or Texas?

Neither state taxes groceries. Both Florida and Texas exempt most grocery food purchases from sales tax (prepared food is still taxed).

## Conclusion

Both Florida and Texas offer significant tax savings compared to high-tax states like California and New York. For most homeowners, **Florida has the slight edge** due to lower property taxes and senior-friendly policies. But Texas wins for renters and high earners with modest housing needs. The right choice depends on your income source, housing plans, and lifestyle preferences. Use our [Relocation Calculator](/relocation-calculator) for a personalized comparison based on your specific situation.`,

  "illinois-income-tax-guide-2026": `# Illinois Income Tax 2026 — 4.95% Flat Rate Guide

Illinois has one of the simplest state income tax systems in the United States. Unlike most states that use progressive tax brackets, Illinois charges a flat 4.95% income tax on all taxable income. This guide explains exactly how Illinois income tax works in 2026, who has to pay, and how it compares to neighboring states.

## Illinois Income Tax Rate for 2026

For the 2026 tax year, Illinois charges a **flat 4.95% income tax** on federal Adjusted Gross Income (AGI), with some state-specific adjustments. This flat rate applies regardless of how much you earn — whether you make $20,000 or $2 million, your Illinois state income tax rate is 4.95%.

The flat tax was established by the Illinois Constitution in 1969 and reaffirmed by voters in 2020, when a ballot measure to allow progressive taxation was defeated.

## Who Pays Illinois Income Tax?

You must file an Illinois income tax return (Form IL-1040) if you:

- Are an Illinois resident with any income
- Are a non-resident who earned Illinois-source income
- Want to claim Illinois refundable credits (even with no tax liability)

### Illinois Residency Rules

Illinois considers you a resident if:

- You're domiciled in Illinois (your permanent home)
- You spent more than 9 months in Illinois during the tax year (statutory resident)

Part-year residents file Schedule NR with their IL-1040 and pay tax only on income earned while an Illinois resident.

## How Illinois Income Tax Is Calculated

Illinois starts with your federal AGI and makes a few adjustments to get to Illinois **Base Income**. Here's the calculation:

### Step 1: Start with Federal AGI

This is your Adjusted Gross Income from your federal Form 1040, which includes wages, self-employment income, investment income, retirement distributions, etc.

### Step 2: Add or Subtract State Adjustments

Common Illinois additions include:
- Federally tax-exempt interest (e.g., municipal bond interest from other states)
- Some federally deductible expenses

Common Illinois subtractions include:
- Social Security benefits (Illinois doesn't tax SS)
- Federally taxable retirement income (Illinois doesn't tax most retirement income)
- Illinois state tax refund (if you itemized federally)

### Step 3: Apply the Flat 4.95% Rate

Your Illinois Base Income × 4.95% = **Illinois Income Tax Before Credits**

### Step 4: Subtract Personal Exemptions

Each taxpayer and dependent gets a personal exemption of $2,775 (2026 amount). At a 4.95% rate, that's a tax savings of $137.36 per exemption.

### Step 5: Apply Credits

Common Illinois tax credits include:
- Property Tax Credit (5% of property tax paid on your primary residence, up to limits)
- Earned Income Credit (18% of federal EITC)
- Education Expense Credit
- K-12 Education Expense Credit

### Step 6: Add Use Tax

If you bought items out of state for use in Illinois and didn't pay sales tax, you owe Illinois use tax. Most people use the Use Tax Table based on AGI.

## Worked Example: $75,000 Single Filer in Illinois

Let's calculate the Illinois income tax for a single filer with $75,000 in W-2 wages:

1. **Federal AGI**: $75,000
2. **Illinois adjustments**: $0 (no SS, no retirement income, no tax-exempt interest)
3. **Illinois Base Income**: $75,000
4. **Tax at 4.95%**: $75,000 × 0.0495 = $3,712.50
5. **Personal exemption**: $2,775 × 4.95% = $137.36 tax reduction
6. **Illinois tax after exemption**: $3,712.50 − $137.36 = $3,575.14
7. **Credits**: $0 (no property tax credit in this example)
8. **Final Illinois income tax**: $3,575.14

Combined with federal income tax and FICA, this taxpayer's total tax burden is about $19,650, leaving take-home pay of $55,350.

## Illinois Tax on Retirement Income

Illinois is one of the most tax-friendly states for retirees. **Most retirement income is exempt from Illinois income tax**:

- Social Security benefits: Not taxed
- Pension income: Not taxed (public and private)
- 401(k) and IRA distributions: Not taxed
- Federal retirement benefits: Not taxed

This exemption saves a typical retiree $3,000-$8,000 per year compared to states that tax retirement income. However, Illinois does tax non-retirement investment income (capital gains, dividends, interest) at 4.95%.

## Illinois Property Tax

While Illinois income tax is moderate, **Illinois has some of the highest property taxes in the country**. The statewide average effective property tax rate is 1.78% of home value — second only to New Jersey nationally.

On a $300,000 home in Illinois, you'd pay approximately $5,340 per year in property tax. In high-tax counties like Cook (Chicago), rates can exceed 2.5%.

### Illinois Property Tax Credit

To offset high property taxes, Illinois offers a Property Tax Credit equal to 5% of property tax paid on your primary residence. On $5,340 in property tax, this saves you $267 in state income tax.

## Illinois Sales Tax

Illinois has a 6.25% state sales tax, but combined with local taxes, the average rate is 8.86%. Chicago has the highest combined sales tax rate in the state at 10.25%.

Notable sales tax exemptions:
- Groceries (1% reduced rate)
- Prescription drugs (1% reduced rate)
- Medical devices
- Manufacturing equipment

## How Illinois Compares to Neighboring States

| State | Income Tax Rate | Property Tax (Avg) | Sales Tax (Avg) |
|-------|----------------|---------------------|-----------------|
| **Illinois** | 4.95% flat | 1.78% | 8.86% |
| Indiana | 3.05% flat | 0.81% | 7.00% |
| Iowa | 4.40%-5.70% | 1.29% | 6.94% |
| Kentucky | 4.00% flat | 0.72% | 6.00% |
| Michigan | 4.25% flat | 1.29% | 6.00% |
| Missouri | 2.00%-4.80% | 0.88% | 8.29% |
| Wisconsin | 3.54%-7.65% | 1.63% | 5.46% |

Illinois has the highest property taxes in the region, but moderate income tax. For low- and middle-income earners, Illinois is generally more expensive than Indiana or Kentucky but less expensive than Wisconsin.

## Tax Planning Strategies for Illinois Residents

### 1. Maximize Retirement Contributions

Since Illinois doesn't tax retirement income, traditional 401(k) and IRA contributions save you federal tax now AND avoid Illinois tax forever (when withdrawn in retirement).

### 2. Claim the Property Tax Credit

If you own your home, always claim the Illinois Property Tax Credit. It's worth 5% of your property tax bill and can save $200-$600 per year.

### 3. Use the Education Expense Credit

If you have K-12 students, you can claim a credit of 25% of qualified education expenses (tuition, book fees, lab fees) up to $750 per student. Income limits apply.

### 4. Consider Moving Outside Cook County

Chicago (Cook County) has the highest property taxes and sales taxes in Illinois. Moving to suburban DuPage, Will, or Kane counties can save $1,000-$3,000 per year in property taxes on similar homes.

## Frequently Asked Questions

### Does Illinois tax Social Security?

No. Illinois does not tax Social Security benefits. Your SS income is excluded from Illinois taxable income.

### Does Illinois tax pensions?

No. Illinois does not tax most pension income, including private pensions, government pensions, and military pensions.

### What is the Illinois flat tax rate for 2026?

The Illinois flat income tax rate for 2026 is 4.95% of Illinois Base Income (federal AGI with state adjustments).

### Are there Illinois income tax brackets?

No. Illinois has a flat tax of 4.95% — the same rate applies regardless of income level. A 2020 ballot measure to allow progressive taxation was defeated by voters.

### When are Illinois taxes due?

April 15, 2027 is the filing deadline for 2026 Illinois tax returns. Illinois follows the federal deadline.

### Does Illinois have a standard deduction?

No. Illinois doesn't have a standard deduction. Instead, it offers a personal exemption of $2,775 per taxpayer and dependent (2026 amount).

## Conclusion

Illinois has a simple flat income tax of 4.95%, making tax planning straightforward. The state's tax-friendliness for retirees is a major advantage, but high property taxes offset some of the income tax savings. Use our [Illinois Tax Calculator](/illinois-tax-calculator) to see exactly what you'll pay in 2026.`,

  "how-fica-taxes-work-2026": `# How FICA Taxes Work in 2026 — Full Guide

Every paycheck you receive has money taken out for FICA taxes. If you've ever wondered what those deductions mean and where the money goes, this guide breaks down everything you need to know about FICA in 2026.

## What Is FICA?

FICA stands for the **Federal Insurance Contributions Act**, the law that requires employers to withhold payroll taxes from employees' paychecks. The money funds two major federal programs:

1. **Social Security** (officially OASDI — Old-Age, Survivors, and Disability Insurance)
2. **Medicare** (the federal health insurance program for people 65+ and some younger people with disabilities)

If you're a W-2 employee, you split FICA with your employer. If you're self-employed, you pay both halves — that's called the **self-employment tax** (SE tax).

## 2026 FICA Tax Rates

For the 2026 tax year, FICA has two components:

### 1. Social Security Tax

- **Rate**: 6.2% (employee) + 6.2% (employer) = 12.4% total
- **Wage Base Limit**: $184,500 (income above this is not subject to Social Security tax)
- **Maximum Social Security Tax** (employee): $184,500 × 6.2% = $11,439.00
- **Maximum Social Security Tax** (self-employed): $184,500 × 12.4% = $22,878.00

### 2. Medicare Tax

- **Rate**: 1.45% (employee) + 1.45% (employer) = 2.9% total
- **No wage cap** — Medicare tax applies to all wages
- **Additional Medicare Tax**: 0.9% on wages above $200,000 (single) or $250,000 (married filing jointly) — paid by employee only

## How FICA Works on Your Paycheck

Let's look at a few examples to see how FICA affects your take-home pay.

### Example 1: $50,000 Salary (Single Filer)

- Social Security tax: $50,000 × 6.2% = **$3,100**
- Medicare tax: $50,000 × 1.45% = **$725**
- **Total FICA**: $3,825 (7.65% of wages)

### Example 2: $100,000 Salary (Single Filer)

- Social Security tax: $100,000 × 6.2% = **$6,200**
- Medicare tax: $100,000 × 1.45% = **$1,450**
- **Total FICA**: $7,650 (7.65% of wages)

### Example 3: $250,000 Salary (Single Filer)

- Social Security tax: $184,500 × 6.2% = **$11,439** (capped at wage base)
- Medicare tax: $250,000 × 1.45% = **$3,625**
- Additional Medicare tax: ($250,000 − $200,000) × 0.9% = **$450**
- **Total FICA**: $15,514 (6.2% effective rate)

Notice that at high incomes, the effective FICA rate drops because Social Security tax stops at the wage base. A $250,000 earner pays an effective FICA rate of just 6.2%, lower than a $50,000 earner's 7.65%.

## FICA for Self-Employed Workers

If you're self-employed (independent contractor, freelancer, gig worker, small business owner), you pay the full 15.3% FICA tax yourself — both the employee and employer portions. This is called the **self-employment tax**.

### 2026 Self-Employment Tax Calculation

- Social Security: 12.4% on net earnings up to $184,500
- Medicare: 2.9% on all net earnings
- Additional Medicare: 0.9% on earnings above $200,000

**Example**: A freelancer with $80,000 in net self-employment income would pay:
- Social Security: $80,000 × 12.4% = $9,920
- Medicare: $80,000 × 2.9% = $2,320
- **Total SE tax**: $12,240 (15.3% of net earnings)

### Deduction for Employer Half

The good news: self-employed workers can deduct the "employer half" of SE tax (7.65% of net earnings) as a business expense on their federal income tax return. This reduces your taxable income.

## What FICA Taxes Fund

### Social Security Trust Funds

Your Social Security tax funds retirement, disability, and survivor benefits:

- **Retirement benefits**: Available as early as age 62 (reduced) or full benefits at full retirement age (67 for people born after 1960)
- **Disability benefits (SSDI)**: For workers who can't work due to a qualifying disability
- **Survivor benefits**: Paid to widows, widowers, and dependent children of deceased workers

In 2026, the average monthly Social Security retirement benefit is approximately $1,950, with a maximum of about $4,200 for high earners who delayed claiming until age 70.

### Medicare Trust Funds

Your Medicare tax funds healthcare for older Americans and some people with disabilities:

- **Hospital Insurance (Part A)**: Inpatient hospital care, skilled nursing, hospice
- **Supplementary Medical Insurance (Parts B, D)**: Doctor visits, outpatient services, prescription drugs (funded partly by premiums, not just FICA)

## FICA vs. Federal Income Tax

People often confuse FICA with federal income tax. They're separate taxes with different rules:

| Feature | FICA | Federal Income Tax |
|---------|------|-------------------|
| **Rate** | Fixed (6.2% + 1.45%) | Progressive (10%-37%) |
| **Wage cap** | Yes (SS only, $184,500 in 2026) | No |
| **Standard deduction** | Doesn't apply | $16,100 single (2026) |
| **Pre-tax deductions** | 401(k) doesn't reduce FICA | 401(k) reduces taxable income |
| **Refundable** | No | Yes (via EITC, refundable credits) |
| **Employer match** | Yes (50/50 split) | No (employer doesn't pay) |

A key difference: contributing to a 401(k) lowers your federal income tax but **not** your FICA tax. FICA is calculated on gross wages before any pre-tax deductions (except for HSA contributions, which do reduce FICA).

## Common FICA Questions

### Can I avoid FICA taxes?

Generally no. If you're a W-2 employee, FICA is mandatory. The only ways to reduce FICA are:
- Earn less than the Social Security wage base (you'll still pay Medicare)
- Contribute to an HSA (reduces FICA taxable income)
- Be self-employed and have a low net income (after business deductions)
- Work for an employer with a non-qualified retirement plan (rare)

### Does my employer really pay half?

Yes, but some economists argue the employer's half is effectively paid by the employee through lower wages. Either way, you see only your half (7.65%) deducted from your paycheck.

### Do I get FICA back at tax time?

Generally no — FICA is not refundable like federal income tax can be. However, you may qualify for the Earned Income Tax Credit (EITC) which can offset FICA for low-income workers.

### What if I have multiple jobs?

Each employer withholds FICA independently. If you earn more than $184,500 across multiple jobs, you may overpay Social Security tax. You can claim a refund of the excess on your tax return using Form 843.

### Do I pay FICA on investment income?

No. FICA only applies to earned income (wages, salaries, self-employment income). Investment income (dividends, interest, capital gains) is not subject to FICA — though high earners may pay the Net Investment Income Tax (NIIT) of 3.8%.

## FICA Tax Planning Strategies

### 1. Maximize HSA Contributions

Health Savings Account contributions reduce both FICA and federal income tax. For 2026, you can contribute up to $4,400 (self-only) or $8,300 (family) to an HSA.

### 2. Track Multiple Jobs for SS Overwithholding

If you work multiple jobs and your combined wages exceed $184,500, file Form 843 to claim a refund of excess Social Security tax.

### 3. Deduct Self-Employment Tax

If self-employed, deduct the employer half of SE tax (7.65% of net earnings) on your federal return. This is an above-the-line deduction — you don't need to itemize.

### 4. Use S-Corp Election for High Earners

Self-employed workers earning $80,000+ may benefit from electing S-Corp status. You pay yourself a "reasonable salary" (subject to FICA) and take the rest as distributions (not subject to FICA). This can save thousands per year but requires careful compliance.

## Conclusion

FICA taxes fund two of America's most important social programs — Social Security and Medicare. While the 7.65% combined rate may seem steep, you're paying into programs that provide retirement income, disability protection, and healthcare in old age. Use our [Self-Employment Tax Calculator](/self-employment-tax-calculator) or [Paycheck Calculator](/paycheck-calculator) to see exactly how FICA affects your take-home pay.`,

  "why-texas-has-no-income-tax": `# Why Texas Has No Income Tax — Full Breakdown

Texas is one of nine US states with no personal income tax. This fact is a major reason people move to Texas, but the story behind *why* Texas doesn't tax income — and how the state funds itself instead — is more interesting than you might expect. This guide explains the history, economics, and trade-offs of Texas's no-income-tax system.

## The Short Answer

Texas has no state income tax because:

1. **The Texas Constitution** explicitly prohibits a personal income tax without voter approval
2. **Voters rejected an income tax** in 1993 by a 4-to-1 margin
3. **The state funds itself** through sales tax, property tax, oil and gas revenues, and federal transfers
4. **Political culture** in Texas has long favored low taxes and limited government

The result is a tax system that's friendlier to high earners but relies more heavily on sales and property taxes — which can be regressive.

## The Constitutional Story

### 1972: The First Attempt

In 1972, Texas Governor Dolph Briscoe proposed a state income tax to fund public education. The Texas Legislature passed a constitutional amendment that would have allowed an income tax, but voters rejected it by a wide margin in a 1972 referendum.

### 1993: The Defining Vote

In 1993, Texas faced a budget crisis and Governor Ann Richards pushed for a state income tax. The Legislature put a constitutional amendment on the ballot that would have authorized an income tax with revenue earmarked for education and property tax relief.

**Voters crushed the proposal**, rejecting it by 4-to-1 (about 80% against). The vote was so decisive that no Texas politician has seriously proposed an income tax since.

### 1993 Constitutional Amendment (Aftermath)

After the 1993 vote, the Texas Constitution was amended (Article 8, Section 24) to require that any future personal income tax must be approved by a **majority vote of Texans in a statewide referendum**. Furthermore, any income tax revenue must be used to reduce property taxes and fund education.

This constitutional barrier makes a Texas income tax virtually impossible — any politician proposing one would have to win a popular vote, which seems unlikely given the 1993 result.

## How Texas Funds Its Government

Without an income tax, Texas relies on several other revenue sources:

### 1. Sales Tax (Largest Source)

- **State sales tax rate**: 6.25%
- **Combined with local taxes**: Average 8.20%
- **Annual revenue**: ~$40 billion (about 50% of state tax revenue)
- **Taxable items**: Most goods and services (exemptions for groceries, medicine, some clothing)

Sales tax is Texas's largest single revenue source. It's a **regressive tax** — lower-income Texans pay a higher percentage of their income in sales tax than high earners do.

### 2. Property Tax (Local, Not State)

Texas doesn't have a state property tax, but local governments (counties, cities, school districts, special districts) levy property taxes. The statewide average effective rate is **1.71% of home value** — among the highest in the nation.

- **Annual revenue**: ~$73 billion (collected locally, not by state)
- **School districts**: Receive the largest share (~55% of property tax revenue)
- **M&O (Maintenance and Operations)** vs. **I&S (Interest and Sinking/debt service)**: Two components of school district property tax

### 3. Oil and Gas Severance Tax

Texas produces more oil and natural gas than any other state. The state levies a **severance tax** on oil and gas production:

- **Oil**: 4.6% of market value
- **Natural gas**: 7.5% of market value
- **Annual revenue**: $5-$15 billion (highly variable with energy prices)

When oil prices spike (like in 2022), severance tax revenue surges. When prices crash, revenue plummets. This volatility is a structural challenge for Texas's budget.

### 4. Federal Transfers

Like all states, Texas receives federal funding for various programs:

- **Medicaid**: Federal match for state Medicaid spending
- **Highway funding**: Federal gas tax revenue returned to states
- **Education**: Title I, special education, school nutrition
- **Defense**: Military bases and defense contracts (Texas has many)

Federal transfers make up about 35-40% of Texas's total state budget.

### 5. Other State Taxes

- **Franchise tax**: 0.375%-0.75% on business margins (Texas's version of a corporate income tax)
- **Motor fuel tax**: $0.20/gallon gasoline, $0.20/gallon diesel
- **Tobacco tax**: $1.41/pack of cigarettes
- **Alcohol tax**: Varies by type
- **Hotel occupancy tax**: 6% state + local additions

## The Trade-Offs of No Income Tax

Texas's no-income-tax system has real trade-offs. Here's what they look like in practice:

### Advantages

1. **High earners save thousands**: A $500K earner saves $40,000-$65,000 vs. living in California or New York
2. **Business-friendly**: No personal income tax attracts entrepreneurs and small business owners
3. **No tax filing burden**: Texans don't file a state income tax return (saving time and accounting costs)
4. **Population growth**: Texas consistently leads the nation in net domestic migration
5. **Job creation**: Major companies (Tesla, Oracle, Hewlett Packard Enterprise) have relocated HQs to Texas

### Disadvantages

1. **High property taxes**: Texas's 1.71% average property tax rate is 6th highest in the US
2. **Regressive tax structure**: Low-income Texans pay a higher percentage of income in taxes (sales + property) than high earners
3. **Underfunded public services**: Texas ranks low in per-student education spending and Medicaid reimbursement rates
4. **Budget volatility**: Heavy reliance on sales and oil/gas taxes makes state revenue more cyclical
5. **Infrastructure strain**: Rapid population growth has outpaced infrastructure investment

## Comparing Texas to Other No-Income-Tax States

Texas is one of nine states with no personal income tax:

| State | Sales Tax | Property Tax | Notes |
|-------|-----------|---------------|-------|
| **Texas** | 8.20% avg | 1.71% | High property tax, oil revenue |
| **Florida** | 7.02% avg | 0.86% | Lower property tax, tourism revenue |
| **Washington** | 9.41% avg | 0.98% | High sales tax, tech economy |
| **Nevada** | 8.23% avg | 0.60% | Gaming and tourism revenue |
| **Tennessee** | 9.56% avg | 0.71% | High sales tax, low property tax |
| **South Dakota** | 6.40% avg | 1.32% | Banking industry revenue |
| **Wyoming** | 5.36% avg | 0.61% | Coal and energy revenue |
| **Alaska** | 0% | 1.18% | Oil revenue pays residents (PFD) |
| **New Hampshire** | 0% | 2.18% | High property tax, no sales tax either |

Each state funds itself differently. Alaska actually pays residents an annual dividend from oil revenue. New Hampshire has no income or sales tax but very high property taxes.

## How Texas Compares to California

The Texas vs. California comparison is the most common reason people ask about Texas's tax system. Here's the breakdown:

### Texas vs. California: $100,000 Single Filer

| Tax Type | Texas | California | Difference |
|----------|-------|-----------|-----------|
| Federal income tax | $13,382 | $13,382 | $0 |
| FICA | $7,650 | $7,650 | $0 |
| State income tax | $0 | $6,083 | -$6,083 |
| Property tax ($400K home) | $6,840 | $2,840 | +$4,000 |
| Sales tax ($40K spending) | $3,280 | $3,528 | -$248 |
| **Total tax** | **$31,152** | **$33,483** | **-$2,331** |

Texas saves about **$2,300/year** for a $100K earner with a $400K home. At higher incomes, the savings grow dramatically:

### Texas vs. California: $500,000 Single Filer

- Texas state income tax: $0
- California state income tax: ~$46,000
- **Texas saves**: ~$42,000/year after accounting for property tax difference

This is why high earners and business owners move from California to Texas in large numbers.

## The Future of Texas's Tax System

Several trends could shape Texas's tax future:

### 1. Property Tax Reform

In 2019, Texas passed property tax reform capping annual increases at 3.5% for most local governments. In 2023, voters approved a constitutional amendment raising the homestead exemption to $100,000 (from $40,000) for school district property taxes. More reform is likely.

### 2. School Finance Lawsuits

Texas's school finance system (sometimes called "Robin Hood") redistributes property tax revenue from wealthy districts to poorer ones. This system has faced decades of legal challenges and may face more.

### 3. Population Growth Pressure

Texas adds 1,000+ new residents per day. This growth strains infrastructure (roads, water, schools) and may eventually force lawmakers to consider new revenue sources.

### 4. Energy Transition

As the world moves away from fossil fuels, Texas's oil and gas severance tax revenue may decline long-term. This could create budget pressure if sales and property taxes can't fill the gap.

## Frequently Asked Questions

### When did Texas eliminate its income tax?

Texas has never had a personal income tax. Voters rejected proposals in 1972 and 1993, and the state constitution now requires voter approval for any income tax.

### How does Texas fund schools without an income tax?

Texas schools are funded primarily through local property taxes (school districts), state sales tax revenue, and federal funds. The state redistributes property tax revenue from wealthy districts to poorer ones through the "Robin Hood" system.

### Will Texas ever get an income tax?

Unlikely. The 1993 vote rejected an income tax by 80%-20%, and the constitutional amendment requires voter approval for any future income tax. No major Texas politician supports an income tax.

### Are Texas property taxes really that high?

Yes. Texas's average effective property tax rate is 1.71%, the 6th highest in the US. On a $400K home, that's $6,840/year. High property taxes offset some of the savings from no income tax.

### Does Texas tax retirement income?

No. Texas has no state income tax, so retirement income (pensions, 401(k) withdrawals, IRA distributions, Social Security) is not taxed at the state level.

## Conclusion

Texas's no-income-tax system is the result of a unique political history, constitutional barriers, and a deliberate choice to fund government through sales and property taxes instead. The system attracts high earners and businesses but creates a more regressive tax structure that hits low-income Texans harder. Whether this trade-off is worth it depends on your income level, housing situation, and political values. Use our [Texas Tax Calculator](/texas-tax-calculator) to see exactly how much you'd save by living in Texas.`,

  "1099-tax-guide-self-employed-2026": `# 1099 Taxes Explained: How Much You Really Owe as a Freelancer in 2026

If you're self-employed, a freelancer, or an independent contractor, tax time can feel like getting hit with a brick. No employer is withholding taxes for you, and that "freedom" comes with a hefty bill every quarter. Here's the complete guide to understanding — and minimizing — your 1099 tax obligation in 2026.

## The Big Number: 15.3%

The first thing every self-employed person needs to understand is **self-employment tax**. When you're a W-2 employee, your employer pays half of your Social Security and Medicare taxes (7.65%), and you pay the other half (7.65%). When you're self-employed, you pay **both halves**: 15.3%.

Here's the breakdown:

- **Social Security (OASDI)**: 12.4% on net earnings up to $184,500
- **Medicare (HI)**: 2.9% on all net earnings
- **Additional Medicare**: +0.9% on earnings over $200,000 (single) or $250,000 (married filing jointly)

On top of that, you also pay **regular federal income tax** (10%–37%) and any applicable **state income tax**.

## How Much Will You Actually Pay?

### Example: Freelancer Earning $80,000

1. **Self-employment tax**: $80,000 × 92.35% × 15.3% = **$11,304**
   - Deductible half: $5,652
2. **Federal income tax** (after SE deduction and standard deduction):
   - Taxable income ≈ $80,000 - $5,652 - $16,100 = $58,248
   - Tax ≈ **$7,527**
3. **State income tax** (varies by state — 0% in TX/FL)

**Total federal tax**: ~$18,831 on $80,000 = **23.5% effective rate**

Compare that to a W-2 employee earning $80,000:
- Federal income tax + FICA ≈ **$14,890**
- Employer also pays $6,120 in FICA

The self-employed person pays about **$4,000 more** than the employee for the same gross income.

## Quarterly Estimated Taxes

The IRS requires self-employed individuals to pay taxes **quarterly**. If you wait until April to pay everything, you'll owe penalties.

### 2026 Quarterly Deadlines

| Quarter | Due Date |
|---------|----------|
| Q1 (Jan–Mar) | April 15, 2026 |
| Q2 (Apr–May) | June 16, 2026 |
| Q3 (Jun–Aug) | September 15, 2026 |
| Q4 (Sep–Dec) | January 15, 2027 |

### How Much to Pay Each Quarter

The safe harbor rule: Pay at least **100% of last year's tax liability** (110% if your AGI was over $150,000) spread across four quarterly payments. This avoids underpayment penalties even if you earn more this year.

## Tax Deductions for Self-Employed

This is where you can significantly reduce your tax bill. Here are the most valuable deductions:

### Business Expenses (Schedule C)

- **Home office deduction**: $5/sq ft up to 300 sq ft (simplified method) or actual expenses
- **Internet and phone**: Business portion
- **Software and subscriptions**: Tools you use for work
- **Travel**: Business trips (not commuting)
- **Meals**: 50% deductible for business meals
- **Vehicle expenses**: Actual costs or standard mileage rate ($0.70/mile for 2026)
- **Health insurance premiums**: 100% deductible (above the line)
- **Professional development**: Courses, certifications, books
- **Equipment**: Computers, cameras, tools — may qualify for Section 179 expensing

### Retirement Contributions

This is the **single biggest tax-saving opportunity** for self-employed people:

| Plan | 2026 Contribution Limit | Tax Benefit |
|------|------------------------|-------------|
| **Solo 401(k)** | Up to $69,000 | Reduces both income and SE tax |
| **SEP IRA** | Up to 25% of compensation (max $69,000) | Reduces both income and SE tax |
| **Traditional IRA** | Up to $7,000 ($8,000 if 50+) | Reduces income tax only |
| **SIMPLE IRA** | Up to $16,000 ($19,500 if 50+) | Reduces both income and SE tax |

> **Pro tip**: A Solo 401(k) allows the highest contributions and offers a Roth option. See our [SEP IRA vs Solo 401(k) comparison](/blog/sep-ira-solo-401k-guide-2026) for details.

## 1099 Forms You Might Receive

| Form | What It Reports |
|------|----------------|
| **1099-NEC** | Nonemployee compensation (freelance income) |
| **1099-K** | Payment card and third-party network transactions |
| **1099-MISC** | Rents, royalties, other income |
| **1099-INT** | Interest income |
| **1099-DIV** | Dividends and distributions |
| **1099-G** | Government payments (unemployment, tax refunds) |
| **1099-R** | Retirement distributions |

### The 1099-K Threshold

For 2026, payment processors (PayPal, Stripe, Venmo, etc.) must issue a 1099-K if you receive **more than $5,000** in payments for goods and services. This threshold has been delayed and adjusted multiple times, so check the latest IRS guidance.

## Avoiding Common Penalties

1. **Underpayment penalty**: Pay quarterly estimated taxes (at least 100% of prior year liability)
2. **Late filing penalty**: File by April 15 or request an extension (but extension to file ≠ extension to pay)
3. **Accuracy-related penalty**: Keep good records and don't inflate deductions
4. **Failure to deposit**: If you have employees, deposit payroll taxes on time

## State Taxes for Self-Employed

Don't forget state obligations:

- **States with no income tax**: TX, FL, WA, NV, WY, SD, AK, TN, NH — you only pay federal
- **States with income tax**: File state quarterly estimates too
- **Local taxes**: Some cities (NYC, for example) have their own income tax

## Bottom Line: Self-Employment Tax Summary

Being self-employed means paying more in taxes than a W-2 employee earning the same amount — roughly $6,000 more on $80,000. But smart use of deductions (especially retirement contributions and home office) can significantly close that gap.

Use our [self-employment tax calculator](/self-employment-tax-calculator) to estimate your quarterly payments and total tax liability for 2026.`,

  "doordash-taxes-guide-2026": `# DoorDash Taxes: The Complete Guide for Drivers in 2026

So you're delivering for DoorDash and making decent money — but now tax season is here and you're wondering how much you actually owe. The short answer: probably more than you think. The longer answer: probably less than you fear, if you track your deductions properly.

## How DoorDash Taxes Work

DoorDash classifies you as an **independent contractor**, not an employee. This means:

- You'll receive a **1099-NEC** (not a W-2) if you earn $600+ from DoorDash
- No taxes are withheld from your earnings
- You're responsible for **self-employment tax** (15.3%) + income tax
- You need to pay **quarterly estimated taxes** or risk penalties

## How Much Will You Pay in Taxes?

### The Math on $30,000 in DoorDash Earnings

| Tax | Calculation | Amount |
|-----|------------|--------|
| Self-employment tax | $30,000 × 92.35% × 15.3% | $4,239 |
| Federal income tax | ~$2,100 (after deductions) | $2,100 |
| State income tax | Varies by state | $0–$2,400 |
| **Total** | | **$6,339–$8,739** |

That's roughly **21–29%** of your gross earnings going to taxes. If you haven't been saving, that's going to hurt.

### The Good News: Mileage Deductions

Your biggest tax-saving tool is the **standard mileage deduction**. For 2026, it's **$0.70 per mile**.

If you drive 10,000 miles for DoorDash:
- Mileage deduction: 10,000 × $0.70 = **$7,000**
- This reduces your taxable income from $30,000 to $23,000
- Tax savings: roughly **$2,800–$3,500**

## Deductions Every DoorDash Driver Should Claim

### The Big One: Mileage

You have two options:

1. **Standard mileage rate**: $0.70/mile for 2026 (simpler — just track miles)
2. **Actual expenses**: Gas, insurance, depreciation, maintenance, registration (more complex but potentially larger deduction)

> **Recommendation**: Use the standard mileage rate unless you have a very expensive car or massive repair bills. It's simpler and usually comparable.

**What counts as deductible mileage?**
- Driving to pick up orders
- Driving between orders (even if no order is accepted)
- Driving to a hotspot
- **NOT** your commute from home to your first delivery location

### Other Valuable Deductions

| Deduction | Details |
|-----------|---------|
| **Hotbags and insulation** | Bags, coolers, thermal containers |
| **Phone mount and charger** | Must be used for deliveries |
| **Phone bill** | Business percentage (you use your phone for the app) |
| **Parking and tolls** | While on active deliveries |
| **Roadside assistance** | AAA or similar, if used for business |
| **Car washes** | If keeping your car clean is necessary for business |
| **Health insurance** | If you're not covered by an employer, premiums may be deductible |
| **Retirement contributions** | SEP IRA, Solo 401(k), or Traditional IRA |

### Home Office Deduction

If you have a dedicated space at home for managing your delivery business (scheduling, tracking expenses, etc.), you may qualify for the home office deduction:

- **Simplified method**: $5 per square foot, up to 300 sq ft (max $1,500)
- **Regular method**: Actual expenses proportional to home office space

## Tracking Your Miles

The IRS requires "contemporaneous records" — meaning you need to track miles as you drive, not reconstruct them later. Options:

1. **Mileage tracking apps**: Stride, Everlance, MileIQ, Hurdlr
2. **DoorDash's built-in tracker**: Available in the Dasher app, but may not capture all deductible miles
3. **Manual log**: Notebook with date, starting/ending odometer, purpose

> **Important**: The IRS prefers a written (or app-based) log. Bank statements alone aren't sufficient.

## Quarterly Estimated Taxes

As a DoorDash driver, you should be making quarterly payments:

### 2026 Payment Schedule

| Quarter | Period | Due Date |
|---------|--------|----------|
| Q1 | Jan 1 – Mar 31 | April 15, 2026 |
| Q2 | Apr 1 – May 31 | June 16, 2026 |
| Q3 | Jun 1 – Aug 31 | September 15, 2026 |
| Q4 | Sep 1 – Dec 31 | January 15, 2027 |

### How Much to Pay

A safe rule of thumb: Set aside **25–30%** of your DoorDash earnings for taxes. If you want to avoid penalties, pay at least **100% of your prior year's total tax** divided by 4 each quarter (110% if your AGI was over $150,000).

## Multi-App Drivers

If you drive for DoorDash AND Uber Eats AND Grubhub, you're still a single self-employed person. You file **one Schedule C** that includes all delivery income and all delivery expenses. Don't file separate schedules for each app.

However, each platform will issue its own 1099-NEC if you earned $600+ from that platform.

## Common Mistakes DoorDash Drivers Make

1. **Not tracking mileage from day one** — This is the #1 mistake. Without mileage records, you lose your biggest deduction.
2. **Forgetting quarterly payments** — Penalties add up, and they're completely avoidable.
3. **Not deducting phone expenses** — You're using your phone for work; claim it.
4. **Ignoring state taxes** — Even if your state has no income tax, you may owe other state taxes.
5. **Waiting until April to figure it out** — By then, it's too late to avoid penalties.

## State-by-State Considerations

- **No income tax states** (TX, FL, WA, etc.): You only owe federal taxes
- **California**: High state income tax + local requirements
- **New York**: State + NYC tax if you deliver in the city
- **Illinois**: 4.95% flat tax on all delivery income

Use our [paycheck calculator](/paycheck-calculator) to estimate your total tax burden based on your state.

## Bottom Line: DoorDash Tax Planning

DoorDash driving is taxed as self-employment income. Expect to pay roughly **25–30%** of your earnings in taxes, but smart mileage tracking and deductions can bring that down significantly. Set aside money quarterly and track every deductible mile — your future self will thank you.`,

  "sep-ira-solo-401k-guide-2026": `# SEP IRA vs Solo 401(k): Which Is Better for Self-Employed in 2026?

If you're self-employed, choosing the right retirement plan is one of the most impactful financial decisions you'll make. The two most popular options — SEP IRA and Solo 401(k) — both offer significant tax benefits, but they work very differently. Here's the complete comparison for 2026.

## The Quick Comparison

| Feature | SEP IRA | Solo 401(k) |
|---------|---------|-------------|
| **2026 Contribution Limit** | Up to $69,000 | Up to $69,000 |
| **Catch-up (age 50+)** | Not available | $7,500 |
| **Employee deferral** | Not allowed | Up to $23,000 ($30,500 if 50+) |
| **Employer contribution** | Up to 25% of compensation | Up to 25% of compensation |
| **Roth option** | Not available | Available |
| **Loan option** | Not available | Up to $50,000 |
| **Setup complexity** | Very easy | Moderate |
| **Annual filing** | None | Form 5500-EZ if assets > $250K |
| **Deadline to open** | Tax filing deadline (including extensions) | December 31 of the tax year |
| **Early withdrawal options** | Limited | Loan + Roth contributions accessible |

## How Each Plan Works

### SEP IRA (Simplified Employee Pension)

A SEP IRA is essentially a traditional IRA that receives employer contributions. As a self-employed person, you're both the employer and the employee.

**Key rules:**
- Only employer contributions are allowed (no employee deferrals)
- Contribution = 25% of your net self-employment income
- Contributions are always tax-deductible (pre-tax)
- Withdrawals in retirement are taxed as ordinary income
- Must contribute the same percentage for all eligible employees

### Solo 401(k) (One-Participant 401(k))

A Solo 401(k) is a 401(k) plan covering only the business owner (and spouse). It has two contribution channels:

1. **Employee deferral**: Up to $23,000 ($30,500 if 50+) from your salary
2. **Employer contribution**: Up to 25% of compensation

**Key rules:**
- Can be traditional (pre-tax) or Roth (after-tax), or both
- Combined employee + employer contributions can't exceed $69,000 ($76,500 if 50+)
- Can take loans against the balance (up to $50,000)
- Only for business owners with no full-time employees (spouse is OK)

## Contribution Comparison by Income

### Self-Employed Net Income: $50,000

| Plan | Maximum Contribution | % of Income |
|------|---------------------|-------------|
| **SEP IRA** | ~$9,297 (25% of comp after SE deduction) | 18.6% |
| **Solo 401(k)** | ~$23,000 (employee) + ~$9,297 (employer) = ~$32,297 | 64.6% |

Wait — that Solo 401(k) number seems too high, right? There's a catch: the **total can't exceed 100% of compensation**. So the actual maximum would be capped at your earned compensation. But even so, the Solo 401(k) allows dramatically more contributions at lower income levels.

### Self-Employed Net Income: $150,000

| Plan | Maximum Contribution | % of Income |
|------|---------------------|-------------|
| **SEP IRA** | ~$27,890 | 18.6% |
| **Solo 401(k)** | $23,000 + ~$27,890 = ~$50,890 | 33.9% |

### Self-Employed Net Income: $300,000

| Plan | Maximum Contribution | % of Income |
|------|---------------------|-------------|
| **SEP IRA** | $69,000 | 23.0% |
| **Solo 401(k)** | $23,000 + $46,000 = $69,000 | 23.0% |

At higher incomes, both plans max out at the same $69,000. The Solo 401(k) advantage is primarily for those earning under ~$280,000.

## When SEP IRA Wins

Choose a SEP IRA if:

1. **You have employees** — SEP IRAs are simpler to administer with employees (though you must contribute for all eligible employees)
2. **You want maximum simplicity** — Set up in minutes, no annual filing
3. **You're a high earner** — Both plans max out at the same $69,000 for incomes above ~$280K
4. **You missed the Solo 401(k) deadline** — You can open a SEP IRA until the tax filing deadline (including extensions), even after the year ends
5. **You don't need Roth or loan features** — If you just want a simple pre-tax deduction

## When Solo 401(k) Wins

Choose a Solo 401(k) if:

1. **You want to maximize contributions at lower income levels** — The employee deferral lets you contribute much more when income is under $280K
2. **You want Roth contributions** — Tax-free growth and withdrawals in retirement
3. **You want loan access** — Borrow up to $50,000 from your retirement savings
4. **You're over 50** — The $7,500 catch-up contribution is only available with Solo 401(k)
5. **You want the Mega Backdoor Roth** — Some Solo 401(k) plans allow after-tax contributions + in-plan Roth conversions

## The Roth Advantage

This is arguably the biggest differentiator. With a Solo 401(k), you can make **Roth contributions** — meaning you pay tax now but withdrawals in retirement are completely tax-free.

This is especially valuable if:
- You expect to be in a higher tax bracket in retirement
- You're young and have decades of tax-free growth ahead
- You want tax diversification (some pre-tax, some Roth)

**SEP IRAs have no Roth option.** All contributions are pre-tax, and all withdrawals are taxed as ordinary income.

## Tax Impact Example

**Self-employed, $100,000 net income, single:**

| | SEP IRA | Solo 401(k) Traditional | Solo 401(k) Roth |
|--|---------|------------------------|-------------------|
| Contribution | $18,595 | $41,595 | $41,595 |
| Tax deduction | $18,595 | $41,595 | $23,000 (employer only) |
| Federal tax savings | ~$5,021 | ~$11,231 | ~$6,211 |
| Tax-free in retirement | No | No | Yes (Roth portion) |

## Setup and Administration

### SEP IRA
- **Setup**: Open at any major brokerage (Vanguard, Fidelity, Schwab) — takes 10 minutes
- **Contributions**: One deposit per year, calculated as a percentage of income
- **Filing**: None
- **Fees**: Typically $0 to maintain

### Solo 401(k)
- **Setup**: Open at a brokerage that offers individual 401(k) plans — takes 30-60 minutes
- **Contributions**: Employee deferrals can be made any time; employer contribution at year-end
- **Filing**: Form 5500-EZ required when plan assets exceed $250,000
- **Fees**: Typically $0 at major brokerages; some providers charge setup fees

## Bottom Line: SEP IRA vs Solo 401(k) Decision

For most self-employed people without employees, the **Solo 401(k) is the better choice** because:

- Higher contribution limits at most income levels
- Roth option for tax-free retirement income
- Loan access for emergencies
- Catch-up contributions for those 50+

The SEP IRA remains the right choice if you have employees, value extreme simplicity, or need to make a prior-year contribution after December 31.

Use our [self-employment tax calculator](/self-employment-tax-calculator) to see how retirement contributions reduce your tax bill.`
,
  "federal-tax-brackets-2026-guide": `# 2026 Federal Tax Brackets: Complete Guide to US Income Tax Rates & Slabs

Understanding the federal tax brackets for 2026 is essential for anyone who wants to take control of their financial future. Whether you're trying to estimate your tax bill, plan your retirement contributions, or just figure out why your paycheck looks the way it does, knowing how the income tax slab in USA works is the foundation of personal finance. Our federal income tax rate calculator can help you see exactly where you stand, but first, let's understand the brackets themselves.

The good news? It's not as complicated as most people think. Let me walk you through everything you need to know about the 2026 federal income tax rates, standard deductions, tax credits, and how inflation adjustments change the math each year.

## How Federal Tax Brackets Actually Work

The biggest myth about tax brackets is that earning more money can somehow leave you with less take-home pay. This comes from a misunderstanding of how the progressive tax system works. In reality, the US uses marginal tax rates — meaning only the income within each bracket gets taxed at that bracket's rate.

Think of it like a layer cake. Your first chunk of income is taxed at the lowest rate. The next chunk is taxed at the next rate. Only the income that falls into a higher tax bracket gets taxed at that higher rate — not your entire income.

### A Real-World Example

Let's say you're a single filer with $75,000 in taxable income for 2026. Here's how the math breaks down:

- **First $11,925** is taxed at 10% = $1,192.50
- **$11,926 to $48,475** is taxed at 12% = $4,386.00
- **$48,476 to $75,000** is taxed at 22% = $5,835.50

Your total federal income tax = $11,414.00. Your **effective tax rate** is only 15.2%, even though your top marginal rate is 22%. That's a huge difference, and it's why understanding tax brackets matters.

Try our [paycheck calculator](/paycheck-calculator) to see exactly how these brackets affect your take-home pay.

## 2026 Federal Income Tax Brackets for Single Filers

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | Over $626,350 |

## 2026 Federal Tax Brackets for Married Filing Jointly

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $23,850 |
| 12% | $23,851 – $96,950 |
| 22% | $96,951 – $206,700 |
| 24% | $206,701 – $394,600 |
| 32% | $394,601 – $501,050 |
| 35% | $501,051 – $751,600 |
| 37% | Over $751,600 |

## 2026 Standard Deduction: Your First Tax Break

Before any brackets even apply, you get to subtract the standard deduction from your income. For 2026, the standard deduction amounts are:

- **Single filers**: $16,100
- **Married filing jointly**: $32,200
- **Head of household**: $24,150

This means if you're single and earn $50,000, your taxable income isn't $50,000 — it's $33,900 ($50,000 minus $16,100). That's a significant reduction, and it's why your effective tax rate is always lower than your marginal rate.

You can either take the standard deduction OR itemize your deductions — whichever is larger. Most people take the standard because it's more than they'd get from itemizing, especially after the state and local taxes (SALT) cap of $10,000.

## Tax Deductions vs. Tax Credits: What's the Difference?

This is where a lot of people get confused, and it costs them money. Tax deductions and tax credits are not the same thing, and understanding the difference can save you thousands.

**Tax deductions** reduce your taxable income. If you're in the 22% bracket and you have a $1,000 deduction, it saves you $220 in taxes (22% of $1,000). Common deductions include student loan interest, IRA contributions, and HSA contributions.

**Tax credits** reduce your tax bill dollar-for-dollar. A $1,000 tax credit saves you $1,000 — regardless of your tax bracket. Credits are much more valuable than deductions. Important credits include the Child Tax Credit, Earned Income Tax Credit, and education credits.

If you have a choice between a $1,000 deduction and a $1,000 credit, always take the credit. It's worth more.

## How Inflation Adjustments Affect Your Taxes

Every year, the IRS adjusts tax brackets, standard deductions, and other thresholds for inflation. These inflation adjustments are built into the tax code to prevent "bracket creep" — where inflation pushes your nominal income higher without your actual purchasing power increasing.

For 2026, the inflation adjustments were significant because of the higher inflation rates we've seen. The standard deduction increased, bracket thresholds moved up, and contribution limits for retirement accounts went up too. This means many Americans will pay less tax on the same real income compared to previous years.

The 401(k) contribution limit for 2026 is $23,500, up from previous years. If you max out your 401(k), you're not just saving for retirement — you're reducing your taxable income by $23,500, which could drop you into a lower bracket.

## Filing Your Tax Returns: What You Need to Know

When it's time to file your tax returns, you'll need to know your filing status, total income, adjustments to income, and either your standard deduction or itemized deductions. Your filing status determines which bracket schedule you use:

- **Single**: Use the single filer brackets
- **Married filing jointly**: Use the MFJ brackets (roughly double the single brackets)
- **Head of household**: Has its own bracket schedule, more favorable than single
- **Married filing separately**: Uses the MFJ brackets but divided by two

The IRS typically begins accepting tax returns in late January. The filing deadline is usually April 15, unless it falls on a weekend or holiday. If you need more time, you can file for an extension, but remember — an extension to file is not an extension to pay. You still need to estimate and pay your taxes by the deadline.

## State and Local Taxes: Don't Forget These

Federal income tax is only part of your total tax burden. Most states also have their own income tax, and some cities add another layer on top. State and local taxes can range from 0% (Texas, Florida, Washington) to over 13% (California's top rate).

Use our state-specific calculators to see your total tax picture:
- [California Tax Calculator](/california-tax-calculator)
- [Texas Tax Calculator](/texas-tax-calculator)
- [New York Tax Calculator](/new-york-tax-calculator)
- [Washington Tax Calculator](/washington-tax-calculator)

## Take Control of Your 2026 Taxes

Understanding the federal tax brackets is just the beginning. To really optimize your tax situation, you should:

1. **Maximize retirement contributions** to lower your taxable income
2. **Use an HSA** if you have a high-deductible health plan (triple tax advantage)
3. **Track your deductions** throughout the year
4. **Review your withholding** to avoid surprises at tax time

Use our [federal tax brackets reference page](/federal-tax-brackets) for the complete 2026 bracket tables, and try our [paycheck calculator](/paycheck-calculator) to see exactly how much you'll take home after all federal, state, and local taxes.

## IRS 2026 Tax Brackets Compared to 2025: What Changed?

One of the most common questions people ask is how the IRS 2026 tax brackets compared to 2025 actually differ. The short answer: the brackets themselves didn't change in structure, but the income thresholds shifted upward due to inflation adjustments.

### Key Changes from 2025 to 2026

| Filing Status | 2025 Standard Deduction | 2026 Standard Deduction | Change |
|--------------|----------------------|----------------------|--------|
| Single | $15,400 | $16,100 | +$700 |
| Married Filing Jointly | $30,800 | $32,200 | +$1,400 |
| Head of Household | $22,900 | $24,150 | +$1,250 |

The bracket thresholds also increased by approximately 4-5% across the board. This means if you earn the same salary in 2026 as you did in 2025, you'll likely pay slightly less federal income tax because more of your income falls into lower brackets.

For example, the 22% bracket for single filers starts at $48,476 in 2026 (up from about $46,400 in 2025). If you earn $48,000, you were in the 22% bracket in 2025 but stay in the 12% bracket in 2026 — saving you real money.

## Capital Gains Tax Brackets 2026

Capital gains tax brackets 2026 are separate from the ordinary income tax brackets. If you sell stocks, real estate, or other investments, the profit is taxed at different rates depending on how long you held the asset.

### Long-Term Capital Gains Rates for 2026

| Tax Rate | Single Filers | Married Filing Jointly |
|----------|-------------|----------------------|
| 0% | $0 – $48,350 | $0 – $96,700 |
| 15% | $48,351 – $533,400 | $96,701 – $600,050 |
| 20% | Over $533,400 | Over $600,050 |

If your income is below $48,350 (single) or $96,700 (married), your long-term capital gains tax rate is **0%**. That's right — zero. This is one of the most powerful tax planning tools available.

Short-term capital gains (assets held less than one year) are taxed at your ordinary income tax rate, using the brackets shown above.

Use our [capital gains calculator](/capital-gains-calculator) to see your exact capital gains tax bill.

## Social Security Tax Rate for 2026

The social security tax rate is separate from income tax brackets. For 2026, the Social Security tax rate is 6.2% on wages up to $176,100 (the wage base limit). Your employer pays an additional 6.2%, for a total of 12.4%.

Medicare tax is 1.45% on all wages with no cap, plus an additional 0.9% for high earners (over $200,000 single / $250,000 married).

Together, Social Security and Medicare taxes are known as **FICA taxes**, totaling 7.65% for employees (6.2% + 1.45%). If you're self-employed, you pay both halves — 15.3% — through the self-employment tax.

### 2026 FICA Tax Rates

| Tax | Employee Rate | Employer Rate | Self-Employed Rate | Wage Base |
|-----|-------------|-------------|-------------------|-----------|
| Social Security | 6.2% | 6.2% | 12.4% | $176,100 |
| Medicare | 1.45% | 1.45% | 2.9% | No limit |
| Additional Medicare | 0.9% (over $200K) | 0% | 0.9% (over $200K) | — |
| **Total FICA** | **7.65%** | **7.65%** | **15.3%** | — |

## Looking Ahead: Tax Brackets 2027

While the tax brackets 2027 haven't been officially announced yet, we can project them based on inflation trends. The IRS typically adjusts brackets annually using the Chained Consumer Price Index (C-CPI).

If inflation continues at its current pace, expect the 2027 brackets to shift upward by approximately 3-4%. This means:

- The standard deduction could reach ~$16,600 for single filers
- The 22% bracket threshold may move to ~$50,000+
- The 401(k) contribution limit could increase to ~$24,500

We'll update this guide as soon as the IRS releases the official 2027 tax brackets, typically in October or November 2026.`,
  "california-tax-guide-2026": `# California Tax Guide 2026: Income Tax, Sales Tax, and Local Rates

California has the highest top marginal income tax rate in the country, and understanding how much you'll actually pay can feel overwhelming. But once you break it down into income tax, sales tax, and local rates, the picture becomes much clearer. Let's walk through everything you need to know about the tax amount in California for 2026.

## California Income Tax Rates for 2026

California uses a progressive income tax system with ten brackets, ranging from 1% to 13.3%. Unlike states with a flat tax, California's system means the more you earn, the higher your marginal rate — but only on the income within each bracket.

### 2026 California Income Tax Brackets (Single Filer)

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 1% | $0 – $10,756 |
| 2% | $10,757 – $25,499 |
| 4% | $25,500 – $40,245 |
| 6% | $40,246 – $55,866 |
| 8% | $55,867 – $70,606 |
| 9.3% | $70,607 – $360,659 |
| 10.3% | $360,660 – $432,787 |
| 11.3% | $432,788 – $721,314 |
| 12.3% | $721,315 – $1,000,000 |
| 13.3% | Over $1,000,000 |

The income tax rate you pay depends on where your income falls within these brackets. A single filer making $75,000 doesn't pay 9.3% on everything — they pay 1% on the first $10,756, 2% on the next portion, and so on. The result is an effective rate much lower than the top marginal rate.

Use our [California tax calculator](/california-tax-calculator) to see your exact take-home pay after all California taxes.

## Understanding District Taxes in California

Here's something that catches a lot of people off guard: California has voter-approved **district taxes** that add to the state income tax rate. These are additional taxes passed by local voters to fund specific programs, and they vary by location.

As of 2026, most California residents pay an additional 1% to 2% in district taxes on top of the state income tax rate. The rates range from 0% in some areas to over 3% in others. When you see the rates range across the state, it's because different districts have approved different measures.

If you live in Los Angeles, San Francisco, or most major cities, expect to pay at least 1% extra in district taxes. This is separate from — and in addition to — the state income tax brackets shown above.

## California Sales Tax Rate: What You Pay at the Register

California's state sales tax rate is 7.25%, which is already among the highest in the nation. But that's just the state portion. Local sales tax add-ons can push the total much higher.

### Combined Sales Tax Rates in Major California Cities

| City | Combined Sales Tax Rate |
|------|----------------------|
| Los Angeles | 9.5% |
| San Francisco | 8.625% |
| San Diego | 7.75% |
| San Jose | 9.375% |
| Sacramento | 8.75% |

The local sales tax varies by city and county because voters in each area can approve additional sales tax measures. This is why the sales tax rate you pay in one city can be significantly different from a neighboring city.

Some items are exempt from sales tax in California, including most groceries (unprepared food), prescription drugs, and certain clothing items. But restaurant meals, electronics, and most retail purchases are fully taxable.

## City Tax and Additional Local Taxes

Beyond income tax and sales tax, some California cities impose additional taxes. San Francisco, for example, has several special taxes including a gross receipts tax for businesses and various parcel taxes for property owners. These city tax measures are typically voter-approved and fund specific municipal services.

If you're a business owner in California, you'll also need to consider the state's $800 minimum franchise tax for LLCs and corporations, plus any local business license taxes.

## How to Calculate Your Total Tax Amount in California

To figure out your total tax burden in California, you need to add up:

1. **Federal income tax** (based on federal brackets)
2. **FICA taxes** (Social Security 6.2% + Medicare 1.45%)
3. **California state income tax** (1% to 13.3% based on brackets)
4. **District taxes** (0% to 3% depending on location)
5. **Sales tax** (7.25% to 10.5% depending on city, on taxable purchases)
6. **Property tax** (approximately 0.71% average effective rate)

For a single person earning $75,000 in Los Angeles, the breakdown looks roughly like this:

- Federal income tax: ~$11,414
- FICA: ~$5,738
- California state income tax: ~$3,200
- District taxes: ~$750
- Sales tax (estimated): ~$2,000
- **Total tax burden**: ~$23,102 (about 30.8% of gross income)

## California Tax Credits You Should Know About

California offers several tax credits that can reduce your state tax bill:

- **California Earned Income Tax Credit**: Similar to the federal EITC, for low-to-moderate income workers
- **Young Child Tax Credit**: Up to $1,083 for families with children under 6
- **Renter's Credit**: $60 (single) or $120 (married) for qualified renters
- **College Access Tax Credit**: For contributions to California college funds

These credits are in addition to federal tax credits, and they can significantly reduce your overall tax burden.

## State and Local Tax Deduction Cap

Remember that the federal Tax Cuts and Jobs Act capped the state and local tax (SALT) deduction at $10,000. This means even if you pay $15,000 in California state income tax and property tax combined, you can only deduct $10,000 on your federal return. This cap hits California residents particularly hard because of the high state and local tax rates.

## Comparing California to Other States

California's total tax burden is among the highest in the nation. A single person earning $75,000 in California pays roughly $3,200 in state income tax alone, while the same person in Texas or Washington would pay $0 in state income tax. Use our [comparison tools](/compare) to see how California stacks up against other states.

The trade-off, of course, is that California offers high wages, strong job markets, and extensive public services. But if you're considering a move, the tax savings from relocating to a no-income-tax state can be substantial — often $5,000 to $15,000+ per year.

## Plan Your California Taxes

Use our [California Tax Calculator](/california-tax-calculator) to get an accurate estimate of your take-home pay after all California taxes. The calculator factors in state income tax, district taxes, and FICA to give you the full picture.

## California Tax Rates 2025 vs 2026: What Changed?

If you're comparing California tax rates 2025 with 2026, the brackets haven't changed structurally — California still uses the same ten-bracket progressive system. However, the income thresholds for each bracket are adjusted annually for inflation.

The California tax rate schedule 2026 reflects slightly higher bracket thresholds than 2025, meaning some filers will pay slightly less tax on the same income. The standard deduction and personal exemption also increased marginally.

### Key California Tax Rate Schedule Changes

For 2026, the California standard deduction is approximately $5,540 (single) and $11,080 (married filing jointly), up from $5,363 (single) and $10,726 (MFJ) in 2025.

If you filed using California tax rates 2025 and want to compare, your 2026 bill should be very similar — possibly a few hundred dollars lower on the same income.

## Los Angeles Sales Tax and San Francisco Income Tax

California's local taxes vary significantly by city. Here's what you need to know about the two biggest markets:

### Los Angeles Sales Tax

Los Angeles sales tax is currently 9.5% (combined state + county + local). This is one of the highest rates in California. If you're shopping in LA, expect to pay nearly 10% on most retail purchases. The Los Angeles sales tax funds county transportation, local schools, and city services.

### San Francisco Income Tax

San Francisco doesn't have a separate city income tax (unlike NYC). However, San Francisco income tax is effectively the California state income tax plus any district taxes that apply to SF residents. The combined state + district rate for San Francisco is approximately 1.5% additional on top of the state brackets.

San Francisco also imposes a Gross Receipts Tax on businesses, which is separate from personal income tax. Use our [California tax calculator](/california-tax-calculator) to see your exact SF tax burden.

## California Sales Tax on Cars, by County, and by Zip Code

### California Sales Tax on Cars

California sales tax on cars follows the same rate as general sales tax, based on where you register the vehicle (not where you buy it). So if you live in Los Angeles (9.5%), you pay 9.5% sales tax on a car purchase, even if you buy it in a lower-tax county. This can add thousands to your car purchase — on a $40,000 vehicle in LA, that's $3,800 in sales tax.

### California Sales Tax by County

California sales tax by county ranges from 7.25% (base state rate in some rural areas) to 10.75% (in some Bay Area cities). The variation comes from voter-approved local measures. Here's a quick reference:

- **Los Angeles County**: 9.5%
- **San Francisco County**: 8.625%
- **San Diego County**: 7.75%
- **Orange County**: 7.75% - 8.25%
- **Alameda County**: 10.75% (highest)

### California Sales Tax by Zip Code

For exact California sales tax by zip code, the CDTFA (California Department of Tax and Fee Administration) provides an official lookup tool. Rates can vary even within the same city, so always verify your specific zip code. Our [sales tax calculator](/sales-tax-calculator) handles this automatically.

## California Tax Calculator for 1099 and Self-Employed Workers

If you receive a 1099 or are self-employed in California, your tax situation is more complex. You'll pay:

1. **Federal income tax** (based on federal brackets)
2. **Self-employment tax** (15.3% on 92.35% of net income)
3. **California state income tax** (1% to 13.3% based on brackets)
4. **California district taxes** (varies by location)

A tax calculator California 1099 tool should factor in all four layers. Use our [self-employment tax calculator](/self-employment-tax-calculator) for the federal + SE tax portion, then add California state tax using our [California tax calculator](/california-tax-calculator).

For a $100,000 1099 income in California (single filer in Los Angeles):
- Federal income tax: ~$14,000
- Self-employment tax: ~$14,100
- California state income tax: ~$6,800
- District taxes: ~$1,000
- **Total tax**: ~$35,900 (about 35.9% of income)

## Frequently Asked Questions About California Taxes

### How much is $100,000 income taxed in California?

On $100,000 income in California (single filer), you'll pay approximately $6,800 in state income tax, plus $14,000 in federal income tax, and $7,650 in FICA. Your total tax burden is about $28,450, leaving you with roughly $71,550 in take-home pay. Use our [California tax calculator](/california-tax-calculator) for exact numbers.

### How much is California state tax on $200,000 income?

On $200,000 income in California (single filer), state income tax alone is approximately $17,500. Add federal tax (~$42,000), FICA (~$10,500), and district taxes (~$2,000), and your total tax burden is roughly $72,000 — about 36% of your income.

### How much is $70,000 a year after taxes in California?

On $70,000 salary in California (single filer in LA), your take-home pay is approximately $50,500 after federal tax ($8,900), FICA ($5,355), state tax ($2,900), and district taxes ($350). That's an effective tax rate of about 27.8%.

### Is California sales tax 10%?

California sales tax can reach 10% or higher in some cities. The state base rate is 7.25%, but local add-ons push the combined rate to 10.75% in some areas (like Albany in Alameda County). Most major cities are between 8.5% and 9.75%.

### Does California have a 50% income tax?

No, California does not have a 50% income tax. The top marginal state rate is 13.3%, which applies to income over $1,000,000. However, when combined with the 37% federal top rate, the total marginal rate for very high earners can exceed 50% on the top dollars earned.

### Are California taxes high?

Yes, California has the highest top marginal income tax rate in the nation (13.3%) and above-average sales tax rates. The overall tax burden in California is approximately 11.49% of income, ranking among the top 5 highest-tax states in the US.`,
  "texas-tax-guide-2026": `# Texas Tax Guide 2026: No Income Tax, But What About Property and Sales Tax?

Everyone knows Texas has no income tax. It's practically a marketing slogan at this point. But if you're thinking about moving to Texas — or you already live there and want to understand your full tax picture — you need to look beyond the income tax line. Texas compensates for the lack of income tax with some of the highest property taxes in the country.

Let me break down exactly what you'll pay in Texas, from property tax to sales tax to everything in between.

## No State Income Tax in Texas: What It Means

Texas is one of nine states with no personal income tax. That means zero state tax on your wages, self-employment income, investment income, retirement distributions, or capital gains. There is no state income tax to file, no state tax return to worry about (for personal income), and no state withholding from your paycheck.

For someone earning $75,000, this translates to savings of roughly $3,000 to $4,000 compared to states like California or New York. On a $150,000 salary, the savings can exceed $8,000 per year.

But before you celebrate, let's look at where Texas makes up that revenue.

## Texas Property Tax: Among the Highest in the Nation

Texas property tax rates are the seventh-highest in the United States, with an average effective rate of approximately 1.60% of your home's assessed value. Some counties are even higher, pushing past 2.2%.

### What This Means in Real Dollars

| Home Value | Annual Property Tax (avg 1.60%) |
|-----------|-------------------------------|
| $200,000 | $3,200 |
| $350,000 | $5,600 |
| $500,000 | $8,000 |
| $750,000 | $12,000 |

If you're coming from a state like California (0.71% average effective rate), the property tax difference can be shocking. On a $500,000 home, you'd pay about $3,550 in California property tax versus $8,000 in Texas — a difference of $4,450 per year.

For renters, this is less of an issue since you don't directly pay property tax. But landlords pass these costs through in rent, so you're still paying indirectly.

Use our [Texas Tax Calculator](/texas-tax-calculator) to see your complete tax picture including property tax analysis.

## Texas Sales Tax: 6.25% State + Local Additions

Texas charges a 6.25% state sales tax, and local jurisdictions can add up to 2%, making the maximum combined rate 8.25%. The average combined rate across Texas is about 8.19%.

### What's Taxable in Texas?

Most retail purchases are subject to sales tax, but there are some important exemptions:

- **Groceries**: Most unprepared food items are exempt
- **Prescription drugs**: No sales tax
- **Over-the-counter medicines**: Taxable
- **Clothing**: Fully taxable (unlike some states with clothing exemptions)

If you spend $30,000 per year on taxable goods and services in Texas at an average 8.19% rate, you're paying about $2,457 in sales tax annually.

## Understanding Taxable Income in Texas

Since Texas has no state income tax, your taxable income is only relevant for federal tax purposes. Your federal taxable income is calculated by taking your gross income and subtracting either the standard deduction or itemized deductions.

For 2026, the federal standard deduction is $16,100 for single filers and $32,200 for married filing jointly. Even though Texas doesn't tax your income, you still need to file federal tax returns and pay federal income tax.

## Filing Tax Returns in Texas

Texans file federal tax returns like everyone else, but the process is simpler because there's no state return to file. You'll need:

1. **Federal Form 1040**: Standard federal tax return
2. **No state income tax return**: Texas doesn't require one
3. **Property tax**: Paid to your local county tax assessor (not on your tax return)
4. **Franchise tax**: Only for businesses, not individuals

This simplicity is one of the real benefits of living in Texas. No state tax return means less paperwork, fewer chances for errors, and no state tax deadline to worry about.

## The Franchise Tax: Texas's Business Tax

If you own a business in Texas, you may be subject to the Texas franchise tax — sometimes called the "margin tax." This is not an income tax on individuals, but a tax on business entities. The rates range from 0.331% to 0.75% on your business margins, depending on your revenue and industry.

Most small businesses with revenue under $2.47 million are exempt from the franchise tax. But if your business grows, this is something to plan for.

## How Texas Compares to Other States

The total tax burden in Texas — combining property tax, sales tax, and other taxes — averages around 8.22% of income, according to the Tax Foundation. This puts Texas in the middle of the pack nationally.

### Texas vs. California

| Tax Type | Texas | California |
|----------|-------|-----------|
| Income Tax | 0% | 1% – 13.3% |
| Property Tax (avg) | 1.60% | 0.71% |
| Sales Tax (avg) | 8.19% | 8.82% |
| Total Burden | ~8.22% | ~11.49% |

On a $100,000 salary with a $350,000 home, Texas is typically $5,000–$7,000 cheaper per year than California, even with higher property taxes. Use our [comparison tool](/compare/texas-vs-california) to see the exact numbers for your situation.

### Texas vs. New York

The comparison with New York is even more dramatic. New York's income tax alone can exceed $6,000 on a $100,000 salary, plus NYC residents pay additional city taxes. Texas saves the average New Yorker $8,000–$12,000+ per year.

## The Bottom Line on Texas Taxes

Texas is genuinely a low-tax state, but not as dramatically as the "no income tax" slogan suggests. The property tax is significant, and if you own an expensive home, it can eat into your income tax savings.

**Texas makes the most sense if:**
- You're a renter (you avoid the property tax entirely)
- You have a high income but a modest home
- You're a business owner who can benefit from no state income tax
- You're retiring and want to protect your retirement income

**Texas may not be ideal if:**
- You own an expensive home relative to your income
- You live in an area with very high property tax rates (some suburbs exceed 2.5%)
- You rely on public services that are funded by property taxes

Use our [Texas Tax Calculator](/texas-tax-calculator) to see exactly what you'll pay, including property tax analysis and cost-of-living comparisons.

## Texas Income Tax: The Complete Picture

When people search for "texas income tax," they often find conflicting information. Let's be crystal clear: **Texas does not have a personal state income tax.** There is no texas income tax rate, no texas income tax brackets, and no texas income tax return to file for individuals.

The Texas income tax percentage for individuals is exactly 0%. This has been the case since Texas constitutional amendment in 1993, which actually makes it extremely difficult to ever implement a state income tax.

### Texas Income Tax Rate 2025 vs 2026

Whether you're looking at texas income tax rate 2025 or texas income tax rate 2026, the answer is the same: 0%. Unlike other states that adjust their brackets annually, Texas has no brackets to adjust. The texas income tax brackets 2026 simply don't exist for individuals.

However, businesses in Texas do pay the franchise tax (sometimes called the margin tax), which functions similarly to an income tax for business entities. Use a texas income tax calculator (like ours) to estimate your total tax burden — which will include federal tax, FICA, property tax, and sales tax, but zero state income tax.

## How Much Is Your Salary After Taxes in Texas?

Here are the most common salary questions about Texas taxes, answered with real numbers:

### $100,000 After Taxes in Texas

On a $100,000 salary in Texas (single filer), your take-home pay is approximately **$75,600**. Here's the breakdown:
- Federal income tax: ~$14,001
- FICA (Social Security + Medicare): ~$7,649
- Texas state income tax: $0
- **Total tax**: ~$21,650 (21.7% effective rate)

### $200,000 After Taxes in Texas

On $200,000 in Texas, you take home approximately **$141,300**. Texas saves you roughly $10,000–$15,000 compared to California or New York on this salary.

### Other Common Salaries After Taxes in Texas

| Salary | Take-Home Pay | Effective Tax Rate |
|--------|-------------|-------------------|
| $60,000 after taxes Texas | ~$48,500 | 19.2% |
| $70,000 after taxes Texas | ~$55,600 | 20.6% |
| $120,000 after taxes Texas | ~$92,500 | 22.9% |
| $150,000 after taxes Texas | ~$112,800 | 24.8% |
| $250,000 after taxes Texas | ~$180,200 | 27.9% |
| $300,000 after taxes Texas | ~$212,000 | 29.3% |

For a precise calculation based on your specific situation (401k contributions, filing status, etc.), use our [Texas Tax Calculator](/texas-tax-calculator) which works as a Dallas income tax calculator, Houston tax calculator, or any Texas city.

### $25 an Hour After Taxes in Texas

At $25/hour (approximately $52,000/year), your take-home pay in Texas is roughly $42,400 after federal tax and FICA. Near Houston TX or any other Texas city, the result is the same since there's no local income tax.

## Texas Sales Tax: Rates, Cars, and Permits

### Texas Sales Tax Rate

The Texas sales tax rate is 6.25% at the state level, with local jurisdictions adding up to 2% for a maximum combined rate of 8.25%. The average combined rate across Texas is approximately 8.19%.

**Is all of Texas 8.25% sales tax?** No. The 8.25% is the maximum combined rate, but not all areas charge the full 2% local add-on. Some areas have lower combined rates, while major cities like Dallas, Houston, and San Antonio typically hit the 8.25% maximum.

### Texas Sales Tax on Cars

Texas sales tax on cars is 6.25% (the state rate only — no local add-ons for motor vehicles). On a $30,000 car, you'd pay $1,875 in sales tax. Texas also charges a standard presumptive value (SPV) tax on used car purchases from private parties, which may result in a different tax amount.

### Texas Sales Tax Permit and Login

If you're a business owner, you'll need a texas sales tax permit from the Texas Comptroller. You can:
- Apply for a texas sales tax permit online at the Comptroller's website
- File returns via texas sales tax webfile (the state's online filing system)
- Access the texas sales tax login at comptroller.texas.gov
- Use the texas sales tax lookup tool to verify rates by location

### Texas Sales Tax Exemption

Texas offers sales tax exemptions for:
- Groceries (most unprepared food)
- Prescription drugs
- Manufacturing equipment
- 100% disabled veterans (vehicle sales tax exemption)
- Agricultural items

You can file a texas sales tax exemption form (Form 01-339) to make tax-exempt purchases for qualifying reasons.

### Texas Sales Tax Rate 2025 vs 2026

The Texas sales tax rate 2025 was 6.25% (state), and it remains 6.25% for 2026. The state base rate rarely changes, but local rates can shift based on voter-approved measures. Check the texas sales tax chart from the Comptroller for the most current rates by jurisdiction.

## Frequently Asked Questions About Texas Taxes

### Does Texas have income tax?

No. Texas is one of nine states with no personal income tax. The Texas income tax rate is 0% for all individuals, regardless of income level. This is protected by the Texas Constitution, making it extremely difficult to change.

### What is the income tax rate in Texas?

The income tax rate in Texas is 0%. There are no texas income tax brackets for individuals. The only income-like tax is the franchise tax on businesses, which ranges from 0.331% to 0.75% on business margins.

### How much is $100,000 taxed in Texas?

On $100,000 in Texas (single filer), you pay approximately $14,001 in federal income tax and $7,649 in FICA. Texas state income tax is $0. Your total tax is about $21,650, leaving you with ~$78,350 before property and sales taxes.

### Is tax 8.25% in Texas?

The maximum combined sales tax rate in Texas is 8.25% (6.25% state + 2% local). Not all areas charge the full 8.25% — some have lower rates. Major cities like Dallas, Houston, and Austin typically charge the full 8.25%.

### How much tax is on $100 in Texas?

On a $100 purchase in Texas at the standard 8.25% combined rate, you'd pay $8.25 in sales tax, for a total of $108.25. In areas with lower local rates, the tax would be less (e.g., $6.25 at the state-only rate).

### What is the sales tax on a $30,000 car in Texas?

The sales tax on a $30,000 car in Texas is $1,875 (6.25% state rate only — no local add-ons for motor vehicles). This is significantly lower than the general sales tax rate in most Texas cities.

### How do Texas taxes compare to other states?

Texas has a lower overall tax burden (~8.22%) compared to California (~11.49%), New York (~12.7%), and Illinois (~11.0%). However, Texas property taxes are among the highest in the nation. Use our [comparison tools](/compare) for detailed state-by-state analysis.`,
  "new-york-tax-guide-2026": `# New York State Taxes 2026: NYC Tax, Filing, and What You Owe

New York has one of the most complex tax systems in the country. Between the state income tax, the NYC tax (for city residents), and various local taxes, understanding what you actually owe can feel like solving a puzzle. But once you break it down, the structure makes sense — even if the rates are painfully high.

Let's walk through everything you need to know about New York state taxes in 2026, including the New York City income tax rate, NYC tax brackets, state income tax filing requirements, and how the tax year affects your bottom line.

## New York State Income Tax Rates for 2026

New York uses a progressive income tax system with nine brackets for single filers, ranging from 4% to 10.9%. The rates are among the highest in the nation, especially for high earners.

### 2026 New York State Tax Brackets (Single Filer)

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 4% | $0 – $8,500 |
| 4.5% | $8,501 – $11,700 |
| 5.25% | $11,701 – $13,900 |
| 5.5% | $13,901 – $80,650 |
| 6% | $80,651 – $215,400 |
| 6.85% | $215,401 – $1,077,550 |
| 9.65% | $1,077,551 – $5,000,000 |
| 10.3% | $5,000,001 – $25,000,000 |
| 10.9% | Over $25,000,000 |

For most people earning between $14,000 and $80,000, the state income tax rate is 5.5%. On a $75,000 salary, you'll pay roughly $3,500 in New York state income tax — and that's before the NYC tax kicks in.

Use our [New York Tax Calculator](/new-york-tax-calculator) to see your exact take-home pay.

## NYC Tax: The City Income Tax Surcharge

If you live in New York City, you pay an additional city income tax on top of the state tax. The NYC tax is what makes New York uniquely expensive — no other city in America imposes an income tax this high.

### 2026 NYC Tax Rates (Single Filer)

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 3.078% | $0 – $12,000 |
| 3.762% | $12,001 – $25,000 |
| 3.819% | $25,001 – $50,000 |
| 3.876% | $50,001 – $500,000 |
| 3.876% | Over $500,000 |

### Do You Pay NYC Tax If You Don't Live in NYC?

No. The NYC tax only applies to residents of the five boroughs (Manhattan, Brooklyn, Queens, The Bronx, Staten Island). If you live in Westchester, Long Island, or New Jersey but work in NYC, you do not pay the NYC tax — only the New York state income tax.

However, if you're a part-year resident (you moved into or out of NYC during the tax year), you'll pay NYC tax on income earned while you were a resident.

## York State Taxes: What Else You Need to Know

Beyond the income tax, New York imposes several other taxes that affect residents:

### Estate Tax

New York is one of the few states with its own estate tax. For 2026, the estate tax exemption is approximately $6.94 million. Estates valued above this threshold face a graduated rate from 3.06% to 16%. Importantly, New York's estate tax has a "cliff" provision — if your estate exceeds the exemption by even 5%, the entire amount becomes taxable, not just the excess.

### Sales Tax

New York state sales tax is 4%, but local jurisdictions add significantly more:
- **NYC combined rate**: 8.875% (4% state + 4.5% city + 0.375% MCTD)
- **Most other areas**: 7% – 8.75%

### Property Tax

New York's average effective property tax rate is about 1.62%, but it varies dramatically by location. Long Island has some of the highest property taxes in the nation, while some upstate areas are more moderate.

## Filing Your New York Tax Returns

New York requires residents to file state tax returns if their federal adjusted gross income exceeds $4,000 (single) or the standard deduction amount for their filing status. Here's what you need for filing:

### Required Forms

1. **IT-201**: Resident Income Tax Return (most common)
2. **IT-203**: Nonresident/Part-Year Resident Return
3. **NYC-208**: NYC resident tax (if applicable)

### Tax Year and Filing Deadlines

The tax year for New York follows the federal tax year — January 1 to December 31. Tax returns are due April 15 (or the next business day), same as federal returns.

If you need an extension, New York automatically grants a state extension if you file a federal extension. But remember — an extension to file is not an extension to pay. You must estimate and pay any taxes owed by the April deadline.

### Tax Credits Available in New York

New York offers several tax credits that can reduce your state tax bill:

- **Earned Income Tax Credit**: 30% of the federal EITC
- **Child and Dependent Care Credit**: Based on federal credit amount
- **Real Property Tax Credit**: For renters and homeowners with income under $18,000
- **College Tuition Credit**: Up to $400 per student

## Personal Income and Your Total Tax Burden

For a single person earning $75,000 and living in NYC, the total personal income tax burden breaks down like this:

- **Federal income tax**: ~$11,414
- **FICA (Social Security + Medicare)**: ~$5,738
- **New York state income tax**: ~$3,500
- **NYC income tax**: ~$2,500
- **Total income tax**: ~$23,152 (about 30.9% of gross income)

That's before sales tax, property tax, and other taxes. New York City residents have one of the highest total tax burdens in the United States.

## Comparing New York to Other States

The tax difference between New York and no-income-tax states is dramatic:

| Tax Type | New York (NYC) | Texas | Florida |
|----------|---------------|-------|---------|
| State Income Tax | 4% – 10.9% | 0% | 0% |
| City Income Tax | 3.078% – 3.876% | 0% | 0% |
| Sales Tax | 8.875% | 8.19% | 7.02% |
| Property Tax (avg) | 1.62% | 1.60% | 0.86% |
| Total Burden | ~12.7% | ~8.22% | ~6.97% |

On a $100,000 salary, living in NYC costs roughly $10,000–$12,000 more per year in taxes compared to Texas or Florida. Use our [comparison tool](/compare/california-vs-new-york) to see exact numbers.

## Plan Your New York Taxes

Whether you're staying in New York or considering a move, understanding your full tax picture is essential. Use our [New York Tax Calculator](/new-york-tax-calculator) to see your exact take-home pay after all New York state and NYC taxes. The calculator includes state income tax, NYC tax, and FICA for a complete picture of your tax burden.

## NY State Income Tax 2025 vs 2026: What Changed?

If you're searching for NY state income tax 2025 information, here's what you need to know: the 2026 brackets are slightly higher due to inflation adjustments, but the overall structure remains the same. New York still uses nine progressive brackets from 4% to 10.9%.

The key differences between 2025 and 2026:
- **Bracket thresholds**: Slightly higher in 2026 due to inflation
- **Standard deduction**: Increased marginally
- **Top rate**: Still 10.9% for income over $25,000,000

If you filed NY state income tax return for 2025 and want to compare, your 2026 bill will be very similar — possibly slightly lower on the same income because of the inflation adjustments.

## Pay NY State Taxes Online

Many people search for "tax ny gov pay online" — and yes, you can pay your New York state taxes directly through the New York State Department of Taxation and Finance website at tax.ny.gov. You can:

- Pay by bank account (ACH) — free
- Pay by credit/debit card — 2.49% fee
- Set up installment payments if you owe more than you can pay at once

The online payment system is available 24/7 and is the fastest way to resolve any tax balance you owe.`,
  "washington-tax-guide-2026": `# Washington State Tax Guide 2026: No Income Tax, But High Sales Tax

Washington state — the Evergreen State — is known for its booming tech industry, stunning natural beauty, and... no state income tax. Like Texas and Florida, Washington doesn't tax your personal income. But before you pack your bags, you should understand that Washington compensates with one of the highest sales tax rates in the country, plus a capital gains tax that catches some people by surprise.

Let's break down everything you need to know about Washington state taxes in 2026.

## No State Income Tax in Washington: The Big Advantage

Washington is one of nine states with no personal income tax. This means:

- No state tax on wages, salaries, or self-employment income
- No state tax on retirement income, Social Security, or pensions
- No state tax return to file (for personal income)
- No state withholding from your paycheck

For someone earning $100,000, this translates to savings of roughly $5,000–$8,000 compared to states like California or New York. The savings scale with income — a $200,000 earner could save $15,000+ per year.

Use our [Washington Tax Calculator](/washington-tax-calculator) to see your exact take-home pay.

## Washington Sales Tax: Among the Highest in the Nation

Here's the trade-off. Washington's state sales tax rate is 6.5%, and local sales taxes push the combined rate much higher. In Seattle, the combined rate is 10.25%, making it one of the highest in the United States.

### Combined Sales Tax Rates in Major Washington Cities

| City | Combined Sales Tax Rate |
|------|----------------------|
| Seattle | 10.25% |
| Tacoma | 10.30% |
| Bellevue | 10.10% |
| Spokane | 8.9% |
| Vancouver | 8.7% |
| Olympia | 9.40% |

### What's Taxable in Washington?

Washington's sales tax applies to most retail purchases, but there are important rules:

- **Groceries**: Most unprepared food is exempt
- **Prescription drugs**: Exempt
- **Motor vehicles**: Subject to a separate Motor Vehicle Sales/Use Tax
- **Services**: Many services are taxable in Washington (unlike many states)

The Department of Revenue administers these taxes, and the rules can be complex. If you're running a business, you'll need to understand which of your products and services are subject to sales tax and at what rate.

### Local Sales Taxes Explained

Local sales taxes in Washington are approved by voters at the county and city level. This is why the rate varies so much across the state — each area has different voter-approved measures. The local sales taxes can add 0.5% to 3.5% on top of the state rate.

When you see a combined rate of 10.25% in Seattle, that breaks down to:
- 6.5% state sales tax
- 3.75% local sales taxes (city + county + regional transit)

## Property Tax in Washington

Washington's average effective property tax rate is approximately 0.98%, which is below the national average of about 1.1%. This makes property taxes relatively affordable compared to states like Texas (1.60%) or New York (1.62%).

### Property Tax by Home Value

| Home Value | Annual Property Tax (avg 0.98%) |
|-----------|-------------------------------|
| $400,000 | $3,920 |
| $600,000 | $5,880 |
| $800,000 | $7,840 |
| $1,000,000 | $9,800 |

Washington also offers property tax exemptions for seniors (age 61+) and disabled veterans, which can significantly reduce the tax burden for qualifying residents.

## The Washington Capital Gains Tax

In 2022, Washington introduced a 7% capital gains tax on long-term capital gains exceeding $262,000 (indexed for inflation). This is not an income tax — it specifically targets long-term capital gains from the sale of stocks, bonds, and other intangible assets.

Key points about the capital gains tax:
- Only applies to gains **above** the threshold (~$262,000 for 2026)
- Exemptions include real estate, retirement accounts, and agricultural assets
- Only affects high-income individuals with significant investment gains
- The tax is controversial and faces ongoing legal challenges

For most Washington residents, this tax will never apply. But if you're selling a business or have large stock positions, it's something to plan for.

## Business and Occupation (B&O) Tax

Washington doesn't have a corporate income tax, but it does have the Business and Occupation (B&O) tax. This is a gross receipts tax, meaning it's calculated on your total revenue — not your profit. The rates vary by industry:

- **Service businesses**: 1.5% of gross revenue
- **Retailing**: 0.471% of gross revenue
- **Manufacturing**: 0.484% of gross revenue
- **Wholesaling**: 0.484% of gross revenue

Small businesses with gross revenue under $125,000 may qualify for a B&O tax credit that eliminates or reduces the tax. The Department of Revenue handles all B&O tax administration.

## Your Total Tax Burden in Washington

For a single person earning $75,000 in Seattle with a $500,000 home:

- **Federal income tax**: ~$11,414
- **FICA**: ~$5,738
- **Washington state income tax**: $0
- **Property tax**: ~$4,900 (0.98% effective rate)
- **Sales tax (estimated)**: ~$3,000 (on $30,000 of taxable spending at 10.25%)
- **Total tax burden**: ~$25,052 (about 33.4% of gross income)

Wait — that seems high for a "no income tax" state, right? The key difference is that in Washington, the tax burden falls heavily on consumption (sales tax) and property ownership rather than income. If you rent rather than own, your tax burden drops significantly.

## State or Local: Understanding Washington's Tax Structure

The question of state or local taxes in Washington is interesting because the state relies heavily on local option taxes. Unlike states where the state income tax does the heavy lifting, Washington's system is decentralized:

1. **State level**: 6.5% sales tax + B&O tax + capital gains tax
2. **Local level**: Additional sales taxes (up to 3.75%) + property taxes
3. **No state income tax**: Residents keep 100% of their earned income from state taxation

This structure means that your tax burden in Washington depends heavily on where you live and how much you spend. Someone in Spokane (8.9% sales tax) pays significantly less than someone in Seattle (10.25%), even with the same income.

## Comparing Washington to Other States

| Tax Type | Washington | California | Oregon |
|----------|-----------|-----------|--------|
| Income Tax | 0% | 1% – 13.3% | 4.75% – 9.9% |
| Sales Tax | 6.5% – 10.25% | 7.25% – 10.5% | 0% |
| Property Tax | 0.98% | 0.71% | 0.93% |
| Total Burden | ~8.24% | ~11.49% | ~9.90% |

Washington's total tax burden is lower than both California and Oregon, but the distribution is different. Washington taxes spending, not earning. Oregon is the opposite — no sales tax but high income tax. Use our [comparison tools](/compare) to see exact numbers.

## Is Washington Right for You?

**Washington makes sense if:**
- You have a high income and want to avoid state income tax
- You're a renter (you avoid property tax)
- You're retiring and want to protect your retirement income
- You work in tech and earn stock (long-term holds may qualify for capital gains rates)

**Washington may not be ideal if:**
- You spend a large portion of your income on taxable goods
- You own an expensive home (property tax + sales tax can add up)
- You have significant capital gains above the $262,000 threshold

Use our [Washington Tax Calculator](/washington-tax-calculator) to see your complete tax picture, including sales tax analysis and property tax estimates.

## Seattle Income Tax and Sales Tax: What You'll Pay

### Seattle Income Tax

There is no Seattle income tax. Washington state has no personal income tax, and Seattle does not impose any local income tax. The Seattle income tax rate for individuals is 0%. If you search for a Seattle income tax calculator, the result will show only federal income tax and FICA — no state or city income tax.

However, Seattle does have a JumpStart tax on large businesses with highly compensated employees, which indirectly affects workers but doesn't appear as a personal income tax.

### Seattle Sales Tax 2026

Seattle sales tax is 10.25% for 2026, making it one of the highest in the nation. This combined rate includes:
- 6.5% Washington state sales tax
- 3.75% local Seattle + King County + Sound Transit taxes

The total sales tax in Seattle applies to most retail purchases, restaurant meals, and many services. Some items are exempt, including groceries and prescription drugs.

### Bellevue, Everett, and Vancouver WA Sales Tax

| City | Combined Sales Tax Rate |
|------|----------------------|
| Seattle | 10.25% |
| Bellevue WA | 10.10% |
| Everett WA | 10.40% |
| Tacoma (Pierce County) | 10.30% |
| Marysville WA | 9.30% |
| Vancouver WA | 8.70% |

Vancouver WA has the lowest sales tax among major Washington cities, benefiting from its proximity to tax-free Oregon.

## Washington Income Tax: Why It's Zero and Will It Change?

### Washington State Income Tax Rate

The Washington state income tax rate is 0% for all individuals. The Washington income tax law has been challenged multiple times, but the state constitution requires a uniform property tax, and courts have ruled that income is property — meaning a graduated income tax would be unconstitutional.

### Washington Income Tax Proposal History

There have been several washington income tax proposal attempts:
- 2010: Initiative 1098 (high-earner income tax) — rejected by voters 64% to 36%
- 2021: WA income tax on millionaires (capital gains tax) — passed, but only applies to long-term capital gains over ~$262,000
- 2023-2024: Further washington income tax on millionaires discussions, but no new individual income tax enacted

The washington income tax constitution makes implementing a progressive income tax extremely difficult. Any washington income tax brackets would require a constitutional amendment.

### WA Income Tax 2026

For WA income tax 2026, there is still no personal state income tax. The only "income-like" tax is the 7% capital gains tax on long-term gains exceeding approximately $262,000.

## Washington Property Tax: Rates, Exemptions, and Lookup

### Washington Property Tax Rate

The Washington property tax rate averages 0.98% of assessed home value, below the national average. However, rates vary significantly by county and city. Property tax in Seattle WA tends to be higher than the state average due to voter-approved levies.

### Washington Property Tax Exemption for Seniors and Disabled Veterans

Washington offers property tax exemptions for:
- **Seniors (61+)**: Exempts up to $60,000 of assessed value (or 60% for higher incomes)
- **Disabled veterans**: 100% disabled veterans may qualify for total exemption
- **Surviving spouses**: Of qualifying seniors/veterans

The washington property tax exemption for seniors is income-based, with three tiers of benefits.

### Washington Property Tax Lookup and Payment

You can:
- Search washington property tax records via your county assessor's website
- Use washington property tax lookup tools by parcel number or address
- Pay washington property tax online through county portals
- Check washington property tax due dates (typically April 30 and October 31)

### County-Specific Property Tax

| County | Average Effective Rate |
|--------|---------------------|
| King County (Seattle) | 0.93% |
| Pierce County (Tacoma) | 1.05% |
| Snohomish County (Everett) | 1.04% |
| Clark County (Vancouver) | 1.08% |

Pierce County property tax and Snohomish County property tax tend to be slightly higher than King County. Use a washington property tax calculator for precise estimates.

## How Much Is Your Salary After Taxes in Washington?

### $100,000 After Taxes in Washington State

On $100,000 in Washington (single filer), your take-home pay is approximately **$76,800**:
- Federal income tax: ~$14,001
- FICA: ~$7,649
- Washington state income tax: $0
- **Total tax**: ~$21,650 (21.7% effective rate)

### $300,000 After Taxes in Washington State

On $300,000 in Washington, your take-home pay is approximately **$210,000**. Without state income tax, Washington saves you roughly $20,000–$25,000 compared to California or New York at this income level.

Washington's lack of income tax makes it especially attractive for high earners. The more you make, the more you save compared to states with progressive income tax.

## Frequently Asked Questions About Washington Taxes

### Is Washington state sales tax 10 percent?

Washington state sales tax can exceed 10% in some areas. The state base rate is 6.5%, but combined with local taxes, Seattle reaches 10.25%, and Everett reaches 10.40%. Not all of Washington is 10%+ — Vancouver WA is only 8.70%.

### Why is WA sales tax so high?

WA sales tax is high because Washington has no personal income tax. The state relies on sales tax and property tax as its primary revenue sources instead. When voters approve local measures (like Sound Transit), rates increase further.

### Why does Washington state have no income tax?

Washington's constitution requires uniform property taxation, and courts have interpreted income as property — meaning a graduated income tax (with different rates) would be unconstitutional. Multiple attempts to introduce an income tax have been rejected by voters.

### Is Washington a high tax state?

Washington's total tax burden (~8.24%) is actually below the national average (~9.8%). While sales tax is high, the absence of income tax means many residents pay less overall than in states like California (~11.49%) or New York (~12.7%).

### How much is the property tax in Washington?

Washington's average effective property tax rate is 0.98% of assessed home value. On a $500,000 home, that's approximately $4,900 per year. Rates vary by county — King County averages 0.93%, while Pierce County averages 1.05%.

### Does Washington have income tax?

No. Washington is one of nine states with no personal income tax. There is no state income tax on wages, salaries, self-employment income, retirement income, or investments. The only income-related tax is the 7% capital gains tax on long-term gains over ~$262,000.`,
  "how-bonuses-are-taxed-2026": `# How Are Bonuses Taxed in 2026? The 22% Flat Rate Explained

You just got the email from HR — congratulations, you earned a bonus! You're already planning how to spend it. Maybe pay off that credit card, finally upgrade the couch your dog destroyed, or just stash it in savings. Then the bonus hits your bank account and... wait. That's way less than you expected. Where did all the money go?

If this has happened to you, you're definitely not alone. The number one question people ask about bonuses is some version of: **"Why is my bonus taxed so much higher than my regular pay?"** It's a great question, and the answer surprises most people — because your bonus probably *isn't* taxed at a higher rate. It just *looks* that way.

Let's break it all down so you actually understand what happens to your bonus money, how the IRS classifies it, and what you can do about it.

## Why Bonuses Feel Like They're Taxed Higher

Here's the big misconception: bonuses are taxed at a higher rate than regular income. They're not. Your bonus is **supplemental wage income**, which means the IRS has special rules for *withholding* on it — but the actual tax you owe at the end of the year is based on the same brackets as everything else.

The confusion comes from the gap between **withholding** (what comes out of your paycheck) and **actual tax liability** (what you really owe). Withholding is just an estimate — a prepayment. When you file your return, everything gets reconciled.

So when you see 22% (or more) come out of your bonus upfront, that doesn't mean your bonus is being taxed at 22%. It means your employer is *withholding* 22% to cover your potential tax bill. The actual tax rate on your bonus depends on your total income and tax bracket.

Think of it this way: your bonus is just more income. It gets added to your regular wages, and the whole pile is taxed according to the same progressive brackets. The 22% withholding is just the IRS being cautious.

Use our [bonus tax calculator](/bonus-tax-calculator) to see exactly how much of your bonus you'll take home after all taxes.

## The Percentage Method: The 22% Flat Federal Rate

The IRS gives employers two options for withholding federal income tax on supplemental wages. The most common is the **percentage method**, and it's simple: your employer withholds a flat **22%** of your bonus for federal income tax.

That's it. Flat 22%. No matter how much the bonus is (with one big exception we'll get to), no matter what tax bracket you're in, the withholding is 22%.

For most people, this is actually pretty close to their effective federal rate. If you're a single filer making between $48,475 and $103,350 in 2026, your marginal rate is 22% anyway, so the withholding lines up nicely. If you're in a lower bracket — say 12% — the 22% withholding is too high, and you'll get some of it back as a refund. If you're in a higher bracket — say 32% — the 22% withholding isn't enough, and you might owe more at tax time.

### The $1 Million Exception: 37% Withholding

Here's the one exception. If your supplemental wages exceed **$1 million** in a calendar year, any amount above $1 million is subject to a flat **37%** withholding rate. This is the IRS's way of making sure high earners don't massively underpay during the year.

So if you get a $1.5 million bonus (hey, congrats), the first $1 million has 22% withheld ($220,000) and the remaining $500,000 has 37% withheld ($185,000). Total federal withholding: $405,000. Yeah, that stings. But again, the 37% is just withholding — your actual tax is determined by your bracket when you file.

### Why Most Employers Use the Percentage Method

The percentage method is dead simple for payroll departments. No calculations based on your regular wages, no timing issues with pay periods. Just take the bonus amount, multiply by 22%, and done. That's why roughly 90% of employers use this method.

It's also predictable for you — you always know that 22% is going to federal income tax withholding on your bonus. No surprises on the pay stub.

## The Aggregate Method: How It Works With Regular Wages

The second option is the **aggregate method**. Instead of applying a flat rate, your employer adds your bonus to your most recent regular paycheck and calculates withholding as if that combined amount is what you earn every pay period.

This sounds reasonable in theory, but in practice it usually results in **higher withholding**. Here's why:

When you add a bonus to a regular paycheck, the combined total often pushes you into a higher withholding bracket for that pay period. The payroll system then assumes — incorrectly — that you earn that inflated amount every pay period, and withholds accordingly.

**Example:** You're single, paid biweekly, and normally earn $3,000 per paycheck. Your federal withholding on that is roughly $350 (based on 2026 brackets and standard deduction). Now you get a $10,000 bonus processed with the same paycheck. Your payroll system sees a $13,000 paycheck and thinks you make $338,000 a year. It then withholds at a much higher rate — around $2,800 to $3,200 for that one check.

Under the percentage method, the withholding on that same $10,000 bonus would be a flat $2,200. The aggregate method just cost you an extra $600 to $1,000 in withholding. You'll get it back as a refund, but you're giving the government an interest-free loan in the meantime.

### When the Aggregate Method Actually Helps

There is one scenario where the aggregate method can result in *lower* withholding: if you earn a relatively low income and your bonus is modest. For someone in the 12% bracket, the percentage method's 22% flat rate over-withholds significantly. The aggregate method might calculate a withholding rate closer to 12%, which better matches their actual tax liability.

But this is the exception, not the rule. For most people — especially those earning above $50,000 — the percentage method results in less withholding and more money in your pocket right away.

## Which Method Saves More Money? A Comparison

Let's put this head-to-head with real numbers. We'll compare a single filer earning $85,000/year who receives a $10,000 bonus.

| Factor | Percentage Method | Aggregate Method |
|-------|------------------|------------------|
| Bonus amount | $10,000 | $10,000 |
| Federal withholding rate | 22% flat | Based on combined paycheck |
| Federal income tax withheld | $2,200 | ~$2,850 |
| FICA (SS + Medicare) | $765 | $765 |
| State tax (5% example) | $500 | $500 |
| **Total taxes withheld** | **$3,465** | **~$4,115** |
| **Take-home from bonus** | **$6,535** | **~$5,885** |
| Difference | — | **$650 less take-home** |

The aggregate method withholds about $650 more in this example. Same actual tax liability at year-end — but you wait until your refund to see that $650 again.

**Bottom line:** For most earners, the percentage method puts more money in your pocket at bonus time. But your employer chooses the method, not you. If your company uses the aggregate method and you'd prefer the percentage method, it's worth asking HR about it. Some employers are willing to switch, especially if enough employees request it.

Use our [paycheck calculator](/paycheck-calculator) to model both methods with your actual salary and bonus amount.

## FICA on Bonuses: Social Security + Medicare

Federal income tax isn't the only tax on your bonus. FICA taxes apply too — and there's no special rate for supplemental wages. Your bonus is subject to the same FICA rules as your regular pay.

Here's what comes out of your bonus for FICA in 2026:

- **Social Security (6.2%)**: Applies to your bonus just like regular wages, up to the wage base of **$184,500** for 2026. If you haven't hit that cap yet with your regular earnings, your bonus gets the full 6.2%. If you've already earned more than $184,500 this year, no Social Security tax on the bonus.
- **Medicare (1.45%)**: Applies to all bonus income with no cap.
- **Additional Medicare Tax (0.9%)**: Kicks in if your total wages (including the bonus) exceed **$200,000**. This is on the employee only — your employer doesn't match it.

So for most people, FICA adds another **7.65%** to the tax bite on a bonus (6.2% + 1.45%). Combined with the 22% federal withholding under the percentage method, that's **29.65%** gone before you see a dime.

And if you're a high earner already past the Social Security cap, FICA on your bonus drops to just 1.45% (Medicare only), or 2.35% if you're above $200,000 (Medicare + Additional Medicare). One small silver lining.

For a deeper dive into FICA, check out our article on [how FICA taxes work in 2026](/blog/how-fica-taxes-work-2026).

## State Income Tax on Bonuses

Your state wants its cut too. Most states with an income tax treat bonuses as supplemental wages and have their own flat withholding rate — similar to the federal 22% method.

Here's how some major states handle bonus withholding:

| State | Bonus Withholding Rate | Notes |
|-------|------------------------|-------|
| California | 10.23% | High rate on supplemental wages |
| New York | 11.70% | NY supplemental rate for bonuses over $1M is 16.70% |
| Illinois | 4.95% | Flat rate on all income |
| Texas | 0% | No state income tax |
| Florida | 0% | No state income tax |
| Pennsylvania | 3.07% | Flat rate on all income |
| New Jersey | 11% | Supplemental wage rate |
| Georgia | 5.49% | Supplemental wage rate |

States without income tax — Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire — don't take anything from your bonus at the state level. That's a meaningful difference. A $10,000 bonus in Texas means roughly $1,000 more in your pocket compared to the same bonus in California, just from state taxes.

Also remember: if you work in one state and live in another, you might owe taxes in both. Some states have reciprocity agreements, but many don't. This gets complicated fast, so if you're in that situation, talk to a tax professional.

## Year-End Bonus Strategies

Timing matters when it comes to bonuses. If your bonus is paid in December versus January, the tax implications can be significant. Here are some strategies to consider:

### 1. Defer Your Bonus to January

If you expect to earn less next year (maybe a job change, sabbatical, or your spouse is taking time off), deferring your December bonus to January could put you in a lower tax bracket. You'd pay tax on that income in the following year when your total income is lower. Even a one-month deferral can save thousands.

This only works if your employer is flexible on payment timing, and it only makes sense if you genuinely expect lower income next year. If your income will be about the same, there's no real advantage.

### 2. Boost Your 401(k) Contribution

Bonuses are typically eligible for 401(k) contributions. If you haven't maxed out your 401(k) for the year ($23,500 in 2026, or $31,000 if you're 50+), you can increase your contribution rate for the bonus paycheck. This reduces your taxable income and your current-year tax bill.

Some employers let you specify a different contribution rate for bonus paychecks. Others apply your regular rate. Check with your plan administrator.

### 3. Fund an IRA

You can't contribute directly from your bonus to an IRA (IRAs are funded with after-tax dollars), but you can use your bonus cash to make the contribution. For 2026, you can contribute up to $7,000 ($8,000 if 50+) to a traditional IRA, which may be tax-deductible depending on your income and whether you're covered by a workplace plan.

### 4. Make Charitable Donations

If you itemize deductions, a charitable contribution made around bonus time can offset the additional income. Bunching several years of donations into one year (using a donor-advised fund) is a popular strategy for people who get large bonuses every few years.

### 5. Adjust Your W-4 After the Bonus

If your bonus causes significant over-withholding, you can submit a new W-4 to your employer to reduce withholding on your regular paychecks for the rest of the year. This evens things out so you're not giving the government an interest-free loan. Use our [IRS withholding calculator](/irs-withholding-calculator) to figure out the right withholding for your situation.

## Real Examples: $5K, $10K, and $25K Bonuses

Let's run the numbers on three common bonus amounts. We'll assume a single filer earning $85,000/year in a state with 5% income tax, using the percentage method.

### Example 1: $5,000 Bonus

- Federal withholding (22%): $1,100
- Social Security (6.2%): $310
- Medicare (1.45%): $72.50
- State tax (5%): $250
- **Total taxes: $1,732.50**
- **Take-home: $3,267.50**

Effective tax rate on the bonus: **34.65%** withheld. But your actual tax rate depends on your bracket. If you're in the 22% bracket, your real total rate (including FICA and state) is about 33.65%, so the withholding is very close.

### Example 2: $10,000 Bonus

- Federal withholding (22%): $2,200
- Social Security (6.2%): $620
- Medicare (1.45%): $145
- State tax (5%): $500
- **Total taxes: $3,465**
- **Take-home: $6,535**

Same effective rate: 34.65% withheld. The percentage method keeps it consistent regardless of bonus size (under $1M).

### Example 3: $25,000 Bonus

- Federal withholding (22%): $5,500
- Social Security (6.2%): $1,550
- Medicare (1.45%): $362.50
- State tax (5%): $1,250
- **Total taxes: $8,662.50**
- **Take-home: $16,337.50**

Now, here's where it gets interesting. If your total income including this bonus puts you in the 32% bracket, the 22% withholding isn't enough. You'd actually owe about $3,200 more in federal tax on the bonus (32% vs 22% withholding), which means you'd either get a smaller refund or owe money at tax time. Use our [tax refund calculator](/tax-refund-calculator) to estimate where you'll land.

### High-Earner Example: $150,000 Bonus on $250,000 Salary

- Federal withholding (22%): $33,000
- Social Security (6.2%): $0 (already over $184,500 cap from regular wages)
- Medicare (1.45%): $2,175
- Additional Medicare (0.9%): $450 (on wages above $200K — though this depends on total wages for the year)
- State tax (5%): $7,500
- **Total taxes: $43,125**
- **Take-home: $106,875**

But wait — someone earning $400,000 total is solidly in the 35% bracket. The 22% withholding on the bonus is $19,500 short of the actual 35% tax. That's a big bill come April. This is exactly the situation where adjusting your W-4 or making estimated payments after a large bonus is critical.

## Frequently Asked Questions

### Are bonuses taxed differently than regular income?
No. Bonuses are taxed at the same rates as your regular income. The *withholding* is different (usually a flat 22% for federal), but when you file your tax return, your bonus is just part of your total wages and is taxed according to the same brackets.

### Can I ask my employer to use the percentage method instead of the aggregate method?
You can ask, but it's ultimately your employer's choice. Many companies use the percentage method because it's simpler. If yours uses the aggregate method, talk to HR — some employers will switch if employees request it.

### Will I get a refund on my bonus taxes?
Possibly. If the total withholding on your bonus exceeds your actual tax liability, you'll get the difference as a refund. This commonly happens if you're in a lower tax bracket than 22% or if the aggregate method resulted in excess withholding.

### Do I need to pay estimated taxes on a bonus?
Usually no — the withholding on the bonus itself covers it. But if you're a high earner and the 22% withholding falls well short of your actual bracket, you might want to make an estimated tax payment or adjust your W-4 to avoid underpayment penalties.

### Are signing bonuses taxed the same way?
Yes. Signing bonuses, retention bonuses, performance bonuses, commission — they're all supplemental wages subject to the same withholding rules. The IRS doesn't distinguish between types of bonuses for tax purposes.

### What if my bonus pushes me into a higher tax bracket?
Only the income *above* the bracket threshold is taxed at the higher rate. Your existing income stays in its current brackets. So if a bonus pushes $5,000 of your income from the 22% bracket into the 24% bracket, only that $5,000 is taxed at 24%. The rest stays where it was. This is how progressive taxation works.

### Are bonuses subject to state taxes?
Yes, in most states. States with income tax generally treat bonuses as supplemental wages and apply their own withholding rates. States with no income tax (Texas, Florida, Washington, etc.) don't tax bonuses at the state level.

### Can I contribute my bonus to my 401(k)?
In most cases, yes. If your employer's 401(k) plan allows it, your bonus can be included in your contribution calculation. This is a great way to reduce your taxable income. Check with your plan administrator for the specifics of your plan.

### What happens if I leave my job after receiving a bonus?
The bonus is still yours. Once you've received it and paid taxes on it, there's generally no clawback (unless you have a written agreement that specifies one, like some signing bonus contracts). The tax treatment doesn't change if you leave.

## The Bottom Line

Bonuses aren't taxed at a special penalty rate — they're just withheld differently. The 22% flat federal withholding (percentage method) is the most common approach, and for most people it's reasonably close to their actual tax rate. The aggregate method can lead to over-withholding, leaving you waiting for a refund.

FICA adds another 7.65% on top for most earners, and state taxes can take another 0% to 12% depending on where you live. So a realistic total withholding rate on a bonus is somewhere between **29% and 44%**, with the actual tax liability usually coming in a bit lower.

The best thing you can do is understand what's happening so you're not shocked when the deposit hits. Plan ahead, adjust your W-4 if needed, and consider strategies like 401(k) contributions to reduce the tax hit.

And when in doubt, run your numbers through our [bonus tax calculator](/bonus-tax-calculator) — it'll show you exactly what to expect before the money arrives.`
,
  "property-tax-by-state-guide-2026": `# Property Tax by State: Who Pays the Most (and Least) in 2026

If you own a home, property tax is probably the one tax bill that makes you wince every year. Unlike income tax that gets quietly withheld from your paycheck, property tax shows up as a big lump sum — or a monthly escrow hit — and it varies wildly depending on where you live.

I'm talking *really* wildly. A homeowner in New Jersey might pay $8,700 a year on a median-valued home, while someone in Hawaii pays under $2,000 on a similarly priced place. Same country, same type of tax, totally different experience.

So let's break it all down. Every state's effective property tax rate, who pays the most, who pays the least, how the math works, and — most importantly — what you can actually do about it. Use our [property tax calculator](/property-tax-calculator) to get an instant estimate for your specific situation.

## How Property Tax Actually Works

Before we get into the state-by-state numbers, let's make sure we're all on the same page about how property tax is calculated. Because it's not as straightforward as you might think.

Property tax is based on two things: your home's **assessed value** and your local **millage rate** (sometimes called a mill rate or tax levy). The formula is:

**Property Tax = Assessed Value × Millage Rate**

Here's the thing — your assessed value isn't necessarily what your home is worth on the open market. Most states assess properties at a percentage of market value (called the assessment ratio), and some only reassess every few years. So your tax bill might be based on a value that's years out of date.

A **mill** is $1 of tax per $1,000 of assessed value. So if your millage rate is 20 mills and your home is assessed at $200,000:

$200,000 × (20 ÷ 1,000) = $4,000 in annual property tax

But millage rates aren't set in stone. They're determined by local taxing authorities — your county, city, school district, fire district, library district — and they can change every year based on budget needs. That's why two houses with the same value in different parts of the same state can have very different tax bills.

The **effective property tax rate** is the more useful number for comparisons. It's your annual tax bill divided by your home's actual market value, expressed as a percentage. That's what we'll use throughout this guide.

## Top 10 Highest Property Tax States in 2026

These are the states where property tax really stings. If you live in one of these, you already know.

| Rank | State | Effective Property Tax Rate | Annual Tax on $300K Home |
|------|-------|---------------------------|------------------------|
| 1 | New Jersey | 2.49% | $7,470 |
| 2 | Illinois | 1.78% | $5,340 |
| 3 | Texas | 1.71% | $5,130 |
| 4 | Connecticut | 1.73% | $5,190 |
| 5 | New Hampshire | 1.93% | $5,790 |
| 6 | Vermont | 1.83% | $5,490 |
| 7 | Pennsylvania | 1.51% | $4,530 |
| 8 | Wisconsin | 1.59% | $4,770 |
| 9 | Ohio | 1.52% | $4,560 |
| 10 | Nebraska | 1.61% | $4,830 |

**New Jersey** has held the #1 spot for over a decade, and it's not even close. The Garden State's effective rate of 2.49% means a homeowner with a $300,000 house is shelling out nearly $7,500 a year — and that's on the *median* home. In high-tax counties like Essex or Bergen, the bills get much bigger.

**Illinois** clocks in at #2, driven largely by the Chicago metro area where property taxes fund a massive network of local governments. Cook County alone has over 500 separate taxing districts. That administrative bloat translates directly into your tax bill.

**Texas** is the one that surprises people. No income tax, sure — but they make up for it with property taxes that rank 3rd highest nationally. We'll dig into that trade-off later. You can see the full breakdown with our [Texas tax calculator](/texas-tax-calculator).

**New Hampshire** and **Vermont** round out the Northeast contingent. New Hampshire has no income tax or sales tax, so property tax carries almost the entire state revenue load. Vermont has high property taxes *and* a high income tax — not a great combo.

## Top 10 Lowest Property Tax States in 2026

Now for the good news. These states keep property tax pain to a minimum.

| Rank | State | Effective Property Tax Rate | Annual Tax on $300K Home |
|------|-------|---------------------------|------------------------|
| 1 | Hawaii | 0.31% | $930 |
| 2 | Alabama | 0.40% | $1,200 |
| 3 | Colorado | 0.55% | $1,650 |
| 4 | Nevada | 0.55% | $1,650 |
| 5 | Louisiana | 0.51% | $1,530 |
| 6 | Wyoming | 0.57% | $1,710 |
| 7 | South Carolina | 0.56% | $1,680 |
| 8 | West Virginia | 0.55% | $1,650 |
| 9 | Utah | 0.58% | $1,740 |
| 10 | Delaware | 0.57% | $1,710 |

**Hawaii** is the clear winner at just 0.31%. On a $300,000 home, you'd pay under $1,000 a year. The catch? Hawaii's median home price is over $800,000, so while the *rate* is low, the actual bills for most homeowners are still substantial. Plus, Hawaii has a fairly high income tax and cost of living.

**Alabama** at 0.40% is genuinely affordable. The state constitution limits property tax rates, and homestead exemptions are generous. The trade-off is that Alabama's public services — schools, infrastructure — reflect that lower revenue.

**Colorado** at 0.55% looks great on paper, and the Gallagher Amendment historically kept residential property taxes low by shifting more of the burden to commercial properties. Recent changes have modified this, but Colorado still remains among the most affordable states for property tax.

**Nevada** keeps rates low thanks to a constitutional cap that limits property tax bills to no more than 3% of a home's assessed value for primary residences (5.5% for non-primary). It's one of the strongest taxpayer protections in the country.

## No-Income-Tax States and the Property Tax Trade-Off

This is the conversation I have most often with people considering a move: "I'm going to a no-income-tax state to save money!" And I always say — hold on, let's look at the full picture.

There are currently **9 states with no personal income tax**: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. But states still need revenue, and if they're not collecting income tax, they're getting it somewhere else.

The classic comparison is **Texas vs Florida**, and it perfectly illustrates this trade-off:

- **Texas**: No income tax, but property tax at **1.71%** (3rd highest in the US). On a $350,000 home, that's about $5,985 per year.
- **Florida**: No income tax, and property tax at just **0.86%**. That same $350,000 home would cost roughly $3,010 per year.

That's a difference of nearly $3,000 a year on the same valued home. Florida also offers a homestead exemption that reduces assessed value by up to $50,000 for primary residences, plus the Save Our Homes cap that limits annual assessment increases to 3%. Texas has no equivalent statewide protections.

But wait — Florida's homeowners insurance rates are among the highest in the country due to hurricane risk, often adding $3,000-$6,000 more annually than comparable coverage in Texas. So the "savings" from lower property tax can evaporate quickly when you factor in insurance.

Use our [compare tool](/compare) to see a side-by-side breakdown of any two states, or the [relocation calculator](/relocation-calculator) to estimate your total tax savings from moving.

**Washington state** is another interesting case. No income tax, but they make up for it with a 6.75% capital gains tax (on long-term gains over $270K) and relatively high sales tax (up to 10.4% combined). Property tax is moderate at 0.93%, but the high cost of housing in the Seattle metro means the actual bills can be steep.

**Wyoming**, on the other hand, seems to have cracked the code. No income tax, low property tax (0.57%), and relatively low sales tax. How? Mineral extraction revenue. Wyoming collects significant severance taxes on coal, oil, and natural gas, which subsidizes the cost of government. But that revenue is declining as the energy sector shifts.

## Homestead Exemptions: Your Best Friend on the Tax Bill

A **homestead exemption** reduces the taxable value of your primary residence. It's one of the most important — and most overlooked — ways to lower your property tax bill.

Here are some of the most generous homestead exemptions by state:

- **Florida**: Up to **$50,000** off your assessed value ($25,000 for school taxes, additional $25,000 for non-school taxes on values between $50,000-$75,000). Combined with the Save Our Homes assessment cap, this is arguably the best property tax protection in the country. Use our [Florida tax calculator](/florida-tax-calculator) to see how much you'd save.
- **Texas**: $25,000 off the assessed value of your primary residence for school district taxes. Some counties and cities offer additional exemptions.
- **Alabama**: $22,500 exemption for state property taxes, plus local exemptions that can bring the total even higher.
- **Louisiana**: $7,500 for parish taxes, plus a special assessment level freeze for seniors.
- **Georgia**: $2,000 off assessed value (which is already set at 40% of market value), plus additional exemptions for seniors and veterans.
- **South Carolina**: 4% assessment ratio for primary residences (versus 6% for second homes), plus exemptions for seniors.

**Important**: Homestead exemptions only apply to your primary residence. Investment properties, second homes, and vacation homes generally don't qualify. And you usually need to apply — it's not automatic in most states.

Senior citizens, disabled veterans, and surviving spouses often qualify for additional exemptions that can dramatically reduce — or even eliminate — property taxes. Check with your county assessor's office for specifics.

## How to Calculate Your Property Tax

Let's walk through the actual math step by step. Grab your property tax bill or your county assessor's website — you'll need a few numbers.

### Step 1: Find Your Assessed Value

Your assessed value is what the county says your property is worth for tax purposes. This is NOT the same as market value. Some states assess at 100% of market value, but many use a lower ratio:

- **Michigan**: 50% of market value (called State Equalized Value)
- **Georgia**: 40% of fair market value
- **Colorado**: roughly 7.15% of actual value for residential (yes, really that low, but the mill rate adjusts)
- **Texas**: 100% of appraised market value

So if your home is worth $300,000 on the open market and you live in Michigan, your assessed value would be $150,000.

### Step 2: Apply Any Exemptions

Subtract your homestead exemption, senior exemption, or any other applicable exemptions from the assessed value.

Example: $150,000 assessed value - $25,000 homestead exemption = **$125,000 taxable value**

### Step 3: Multiply by the Millage Rate

Find your total millage rate (it's usually a combination of county, city, school district, and special district rates). If your total rate is 32 mills:

$125,000 × (32 ÷ 1,000) = **$4,000 annual property tax**

### Real-World Example

Let's say you own a $400,000 home in Dallas, Texas:

- Assessed value: $400,000 (Texas assesses at 100%)
- Homestead exemption: -$25,000
- Taxable value: $375,000
- Combined millage rate: roughly 21.5 mills (varies by district)
- Annual tax: $375,000 × 0.0215 = **$8,062.50**

For comparison, that same $400,000 home in Orlando, Florida:

- Assessed value: $400,000
- Homestead exemption: -$50,000 (full exemption)
- Taxable value: $350,000
- Effective rate: ~0.86%
- Annual tax: $350,000 × 0.0086 = **$3,010**

That's a $5,052 difference on the same home value. Our [property tax calculator](/property-tax-calculator) can run these numbers for any state.

## How to Appeal Your Property Tax Assessment

Here's something most people don't know: **you can fight your property tax bill**, and you might actually win. Between 30% and 50% of property tax appeals are successful, and you don't need a lawyer to file one.

### 1. Check Your Assessment for Errors

Start by reviewing your property record card at the county assessor's office. Look for mistakes like:
- Incorrect square footage
- Wrong number of bedrooms or bathrooms
- Inaccurate lot size
- Improvements listed that you don't actually have (that "remodeled kitchen" that never happened)

Even small errors can add up. An extra 200 square feet of living space could add hundreds to your tax bill.

### 2. Compare with Similar Properties

Find 3-5 comparable homes in your neighborhood — similar size, age, condition — and check their assessed values. If your home is assessed significantly higher than comparable properties, you have a strong case.

You can find this information through your county assessor's website or through public records. Zillow and similar sites can give you market values, but what you really need is *assessed* values for the comparison.

### 3. Check the Sale Price vs. Assessed Value

If you recently purchased your home for less than the assessed value, that's one of the strongest pieces of evidence you can present. A recent arm's-length sale is hard for an assessor to argue against.

### 4. File Before the Deadline

This is critical — every jurisdiction has a strict deadline for filing appeals, and they're usually only a few weeks after assessment notices go out. Miss it, and you're stuck for another year. Check your county's website for specific dates.

### 5. Present Your Case

Most appeals start with an informal meeting with the assessor. If that doesn't resolve it, you can go to a formal hearing before a review board. Come prepared with:
- Comparable sales data
- Photos of your property (especially anything that reduces value — deferred maintenance, etc.)
- A recent appraisal if you have one
- Any evidence of errors in your property record

**Pro tip**: You don't need to hire a property tax consultant, but if your potential savings are substantial (over $1,000/year), it might be worth it. Many consultants work on contingency — they take a percentage of your first year's savings.

## Property Tax vs Income Tax: Which States Are Actually Cheapest?

This is the question that really matters, and the answer surprises a lot of people. States with low property tax aren't always the cheapest overall, and states with no income tax aren't always a bargain.

Let's look at the total state and local tax burden for a household earning **$100,000** with a **$300,000** home:

**High property tax + high income tax** (worst case):
- **New York**: ~12.7% effective total tax burden = $12,700/year
- **Connecticut**: ~11.2% effective total tax burden = $11,200/year
- **New Jersey**: ~11.0% effective total tax burden = $11,000/year

**No income tax + moderate property tax** (middle ground):
- **Florida**: ~7.5% effective total tax burden = $7,500/year
- **Texas**: ~8.2% effective total tax burden = $8,200/year
- **Nevada**: ~7.8% effective total tax burden = $7,800/year

**Low property tax + moderate income tax** (surprisingly competitive):
- **Alabama**: ~7.3% effective total tax burden = $7,300/year
- **Colorado**: ~7.9% effective total tax burden = $7,900/year
- **Utah**: ~8.1% effective total tax burden = $8,100/year

**Low everything** (the winners):
- **Alaska**: ~5.5% effective total tax burden = $5,500/year (no income tax, low property tax, and they *pay you* a dividend from oil revenue)
- **Wyoming**: ~6.2% effective total tax burden = $6,200/year

The key takeaway: **you have to look at the total tax picture, not just one tax type**. A state with no income tax but high property tax might cost you *more* than a state with moderate income tax and low property tax, depending on your home value and income.

Our [relocation calculator](/relocation-calculator) factors in all of these variables to give you a true apples-to-apples comparison.

## All 50 States: Effective Property Tax Rates in 2026

Here's the complete ranking of every state by effective property tax rate. These are average effective rates — your actual rate will depend on your specific county and city.

| Rank | State | Effective Rate | Annual Tax on $300K Home |
|------|-------|---------------|------------------------|
| 1 | Hawaii | 0.31% | $930 |
| 2 | Alabama | 0.40% | $1,200 |
| 3 | Louisiana | 0.51% | $1,530 |
| 4 | Wyoming | 0.57% | $1,710 |
| 5 | Colorado | 0.55% | $1,650 |
| 6 | South Carolina | 0.56% | $1,680 |
| 7 | West Virginia | 0.55% | $1,650 |
| 8 | Nevada | 0.55% | $1,650 |
| 9 | Delaware | 0.57% | $1,710 |
| 10 | Utah | 0.58% | $1,740 |
| 11 | Arkansas | 0.61% | $1,830 |
| 12 | Mississippi | 0.63% | $1,890 |
| 13 | New Mexico | 0.67% | $2,010 |
| 14 | Tennessee | 0.67% | $2,010 |
| 15 | Idaho | 0.69% | $2,070 |
| 16 | Oklahoma | 0.74% | $2,220 |
| 17 | Arizona | 0.66% | $1,980 |
| 18 | Montana | 0.76% | $2,280 |
| 19 | Virginia | 0.80% | $2,400 |
| 20 | Kentucky | 0.82% | $2,460 |
| 21 | North Carolina | 0.82% | $2,460 |
| 22 | California | 0.71% | $2,130 |
| 23 | Indiana | 0.81% | $2,430 |
| 24 | Florida | 0.86% | $2,580 |
| 25 | Georgia | 0.87% | $2,610 |
| 26 | Missouri | 0.91% | $2,730 |
| 27 | Washington | 0.93% | $2,790 |
| 28 | Minnesota | 1.05% | $3,150 |
| 29 | Oregon | 0.97% | $2,910 |
| 30 | Kansas | 1.28% | $3,840 |
| 31 | Michigan | 1.32% | $3,960 |
| 32 | Maine | 1.27% | $3,810 |
| 33 | Iowa | 1.36% | $4,080 |
| 34 | Alaska | 1.18% | $3,540 |
| 35 | Maryland | 1.09% | $3,270 |
| 36 | Massachusetts | 1.15% | $3,450 |
| 37 | Rhode Island | 1.53% | $4,590 |
| 38 | Ohio | 1.52% | $4,560 |
| 39 | Pennsylvania | 1.51% | $4,530 |
| 40 | Wisconsin | 1.59% | $4,770 |
| 41 | Nebraska | 1.61% | $4,830 |
| 42 | North Dakota | 1.03% | $3,090 |
| 43 | South Dakota | 1.22% | $3,660 |
| 44 | New York | 1.38% | $4,140 |
| 45 | Illinois | 1.78% | $5,340 |
| 46 | Texas | 1.71% | $5,130 |
| 47 | Connecticut | 1.73% | $5,190 |
| 48 | Vermont | 1.83% | $5,490 |
| 49 | New Hampshire | 1.93% | $5,790 |
| 50 | New Jersey | 2.49% | $7,470 |

A few things jump out from this data:

- The spread is enormous: New Jersey's rate is **8 times** Hawaii's.
- On a $300,000 home, the difference between the cheapest and most expensive state is **$6,540 per year** — that's $545 per month.
- California looks surprisingly low at 0.71%, thanks to Proposition 13 which caps assessment increases. But remember, California homes are expensive — the median home value is over $800,000, so the actual tax bills are still substantial.
- Several states with no income tax (Texas, New Hampshire) rank among the highest for property tax.

## Property Tax FAQ

### Is property tax deductible on federal taxes?

Yes, but with limits. The Tax Cuts and Jobs Act capped the State and Local Tax (SALT) deduction at **$10,000** through 2025, and this cap has been extended into 2026. If your total state and local taxes (property tax + income tax + sales tax) exceed $10,000, you can only deduct $10,000 on your federal return. For homeowners in high-tax states like New Jersey or California, this cap hits hard.

### Do I have to pay property tax if I own my home outright?

Yes. Property tax is based on ownership, not on whether you have a mortgage. Even if you own your home free and clear, you still owe property tax every year. In fact, it can be *more* of a burden without a mortgage because you're not making monthly escrow payments — the full bill hits you at once.

### What happens if I don't pay my property taxes?

It's serious. Unpaid property taxes can result in a tax lien on your property, and eventually, your home can be sold at a tax sale to collect the unpaid taxes. Each state has different timelines and processes, but none of them are good for you. Most states charge significant penalties and interest on late payments too.

### How often are properties reassessed?

It varies widely. Some states reassess annually (Texas), some every 2-3 years (parts of Illinois), and some only when the property changes ownership (California under Prop 13). Some states have limits on how much assessments can increase each year, which can create big disparities between similar homes that were purchased at different times.

### Are there property tax breaks for seniors?

Most states offer some form of property tax relief for seniors, but the specifics vary enormously. Common programs include:
- Additional homestead exemptions (Florida offers an extra $25,000 for seniors 65+)
- Assessment freezes that lock in your home's value
- Tax deferral programs that let you postpone payment until you sell
- Circuit breaker programs that limit property tax to a percentage of income

Check with your state's department of revenue or your county assessor for specific programs in your area.

### How does property tax work for condos and townhomes?

Condos and townhomes are assessed and taxed just like single-family homes, based on their assessed value. However, if you own a condo, part of your HOA fees may go toward property taxes on common areas. Your individual tax bill covers your unit's assessed value.

### Can my property tax go up even if my home value goes down?

Frustratingly, yes. This can happen when local governments increase the millage rate to compensate for declining property values, or when your assessment doesn't decrease as quickly as market values. It's also common in states with assessment caps — if your assessed value was artificially low due to the cap, it can still increase even as the market softens, until it catches up.

## The Bottom Line

Property tax is the most variable major tax in the United States. Where you live determines what you pay far more than how much you earn, and the differences between states — or even between neighboring counties — can amount to thousands of dollars per year.

If you're considering a move, don't just look at income tax rates. Use our [property tax calculator](/property-tax-calculator) to estimate your property tax in any state, and the [compare tool](/compare) to see two states side by side. If you're relocating for work or retirement, the [relocation calculator](/relocation-calculator) will show your total tax savings.

And if your current property tax bill feels too high — appeal it. You have nothing to lose and potentially thousands to gain. Start by checking your property record card for errors, comparing your assessment with similar homes, and filing before your local deadline.

Property tax might be inevitable, but overpaying isn't.`
,
  "lottery-tax-guide-2026": `# Lottery Tax: How Much You Really Keep After Winning in 2026

You just saw the numbers flash across the screen. Your ticket matches. You won the lottery. A hundred million dollars. A billion dollars. Your brain immediately starts doing the math — new house, new car, pay off everyone's mortgage, maybe a yacht. But then reality sets in: how much of that money do you *actually* get to keep?

The short answer? A lot less than you think.

The longer answer is what this entire guide is about. Because lottery taxes in the United States are a multi-layered beast — federal withholding, actual federal tax rates, state taxes that vary wildly depending on where you live (or where you bought the ticket), and a choice between lump sum and annuity that has massive tax implications.

Let's break it all down so you know exactly what happens to your winnings before a single dollar hits your bank account.

## The Shock of Winning: How Much You Actually Keep

Here's the thing nobody tells you when you're standing there holding a winning ticket: the advertised jackpot is **not** what you receive. Not even close. Let's look at a $100 million jackpot as an example.

If you take the lump sum, you're already down to roughly **$50 million** before any taxes — because the advertised jackpot is the annuity value (the total of all payments over 30 years), not the cash value. Then the IRS takes 24% off the top as mandatory withholding. Then your actual federal tax rate pushes that to 37%. Then your state might take another 0% to 10.9%.

On a $100 million advertised jackpot, taking the lump sum in a high-tax state like New York, you might walk away with roughly **$28–30 million**. That's about 28–30 cents on every dollar advertised. In a no-income-tax state like Texas or Florida, you'd keep closer to **$31–33 million**.

Not nothing, obviously. But also not $100 million.

Use our [lottery tax calculator](/lottery-tax-calculator) to plug in your specific numbers and see your after-tax take-home instantly.

## Federal Tax on Lottery Winnings

Lottery winnings are classified as **gambling income** by the IRS, and they're taxed as ordinary income — not capital gains, not at a preferential rate. Every dollar you win from the lottery gets stacked on top of your other income and taxed at the regular federal brackets.

### The 2026 Federal Tax Brackets (Single Filer)

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | Over $626,350 |

If you win $1 million or more, you're almost certainly hitting the **37% bracket** on a big chunk of that income. The effective rate won't be a flat 37% because the brackets are progressive — the first $11,925 is still only taxed at 10% — but on a large jackpot, the effective federal rate will land somewhere around **34–37%**.

### Mandatory 24% Federal Withholding

Here's where it gets tricky. The IRS requires **24% mandatory withholding** on gambling winnings over $5,000. When you claim your prize, the lottery automatically sends 24% to the IRS. You get a W-2G form documenting the whole thing.

But 24% is **not** your final tax bill. It's just a down payment. If your actual tax rate is 37% (which it will be on any significant jackpot), you still owe the remaining **13%** when you file your tax return. This catches a LOT of winners off guard. They spend freely after receiving their after-withholding payout, then get hit with a massive tax bill in April.

**Example:** You win a $10 million lump sum. The lottery withholds 24% ($2.4 million). You receive $7.6 million. But your actual federal tax on $10 million (assuming single filer) is roughly $3.3–3.5 million. You still owe roughly **$900,000–$1.1 million** when you file your return. If you didn't set that money aside, you're in trouble.

### For Winnings Over $5,000

The 24% withholding kicks in automatically. You don't get a choice. The lottery commission cuts the check to the IRS before you ever see the money. For non-cash prizes (like a car or house), you may need to pay the withholding out of pocket or the prize giver may sell a portion to cover it.

## State Tax on Lottery Winnings: It Depends Where You Buy the Ticket

This is where the lottery tax picture gets really interesting — and where your geography can save or cost you millions.

State income tax on lottery winnings varies from **0% to over 10%**, and the key factor is **where you purchased the ticket**, not where you live. (Though your home state may also want a cut if it has income tax and you're a resident — there are often credits for taxes paid to other states, but it gets complicated.)

### States With NO Income Tax (0% State Tax on Lottery)

These states let you keep more of your winnings:

- **Texas** – 0%
- **Florida** – 0%
- **Washington** – 0%
- **Nevada** – 0%
- **Wyoming** – 0%
- **South Dakota** – 0%
- **Alaska** – 0%
- **Tennessee** – 0% (no tax on wages; Hall income tax was fully repealed)

If you buy a Powerball ticket in Florida and win $100 million, you pay **zero state income tax**. That's the best-case scenario.

### States With the HIGHEST Lottery Tax

- **New York** – 10.9% state + 3.876% NYC tax (if you're a NYC resident) = up to **14.876%**
- **California** – technically has income tax, but **does NOT tax California lottery winnings** (one of the few exceptions)
- **Hawaii** – 11%
- **New Jersey** – 10.75%
- **Oregon** – 9.9%
- **Minnesota** – 9.85%
- **District of Columbia** – 10.75%

**Important note:** New York is particularly aggressive. Not only does the state charge 10.9%, but if you live in New York City, add another 3.876% on top. That means a NYC resident who wins a $100 million jackpot could lose nearly 15% to state and local taxes alone — on top of the 37% federal rate. That's potentially over **50% in total taxes**.

### State Tax Quick Reference Table

| State | State Tax Rate on Lottery |
|-------|--------------------------|
| Texas | 0% |
| Florida | 0% |
| Washington | 0% |
| Nevada | 0% |
| Wyoming | 0% |
| Pennsylvania | 3.07% |
| Illinois | 4.95% |
| Georgia | 5.49% |
| Virginia | 5.75% |
| Massachusetts | 5% |
| Colorado | 4.4% |
| California | 0% (CA lottery only) |
| Oregon | 9.9% |
| New Jersey | 10.75% |
| New York | 10.9% |
| New York City | +3.876% (on top of NY) |

This is why you'll often see lottery lawyers recommend buying tickets in no-tax states when possible. On a massive jackpot, the difference between winning in Texas vs. New York City can be **millions of dollars**.

## Lump Sum vs. Annuity: Which Is Better?

When you win a major jackpot, you have two choices for how to receive the money:

### The Lump Sum (Cash Option)

You get the **present cash value** of the jackpot, which is roughly **50–55%** of the advertised amount. For a $100 million jackpot, the lump sum might be around $50–55 million. You get it all at once (minus taxes), and you can invest it, spend it, or do whatever you want with it.

**Pros:**
- Immediate access to all funds
- Potential for higher returns if invested wisely
- Flexibility and control
- No risk of the annuity program defaulting or laws changing

**Cons:**
- Significantly less than advertised jackpot
- All taxes hit in one year (pushing you into the highest bracket)
- Easier to blow through the money quickly

### The Annuity Option

You receive the **full advertised jackpot** spread over **30 annual payments** (for Powerball and Mega Millions). The payments start smaller and increase by about 5% each year to account for inflation. You're essentially letting the lottery commission invest the lump sum on your behalf and paying you the returns plus principal over three decades.

**Pros:**
- You receive the full advertised amount over time
- Built-in protection against blowing all the money
- Tax liability spread over 30 years (potentially lower rates in some years)
- Annual payments act as a forced savings plan

**Cons:**
- You don't have access to the full amount
- Inflation erodes the real value of later payments
- If you die, your heirs receive the remaining payments (but they get stepped-up basis advantages — see our [capital gains calculator](/capital-gains-calculator))
- The lottery commission controls the investment

### Which Should You Choose?

There's no universal right answer, but here's the general guidance:

- **If you're financially disciplined and have good advisors**, the lump sum is often the better mathematical choice. Invested properly, the lump sum can outgrow the annuity over 30 years.
- **If you're worried about self-control** or want guaranteed income for life, the annuity provides that safety net.
- **Tax considerations** matter: the lump sum concentrates all income in one year at the highest rates. The annuity spreads it out, which could mean paying less total tax over time.

Most big winners choose the lump sum — roughly **90–95%** of jackpot winners take the cash option. But that doesn't mean it's right for everyone.

## How the 24% Withholding Works (And Why You Owe More)

I want to dig deeper into this because it's the single biggest source of confusion and financial trouble for lottery winners.

When you claim a prize over $5,000, the lottery commission **automatically withholds 24%** for federal taxes. This is not negotiable. You can't opt out. The check goes straight from the lottery to the U.S. Treasury.

**What happens at tax time:**

When you file your tax return for the year you won, you report the full winnings as income. Your actual tax liability is calculated based on your total income for the year (winnings + any other income). If your total income pushes you into the 37% bracket — and on any significant jackpot, it absolutely will — your total federal tax is much higher than the 24% already withheld.

**The gap you owe:**

- Withholding: 24%
- Actual tax rate on large winnings: ~34–37%
- Additional tax due at filing: ~10–13% of the winnings

On a $50 million lump sum, that's an additional **$5–6.5 million** you owe when you file your return. If you've already spent that money... you're in serious trouble. The IRS charges penalties and interest on underpayment.

**Pro tip:** If you win a large prize, make **estimated tax payments** in the quarter you receive the money to avoid underpayment penalties. Your CPA can help you calculate the right amount. And check our [tax refund calculator](/tax-refund-calculator) to estimate your position.

## FICA: Lottery Winnings Are NOT Subject to Social Security or Medicare

Here's a rare piece of good news: **lottery winnings are not subject to FICA taxes** (Social Security and Medicare). Unlike wages, which get hit with 7.65% in employee FICA taxes (and 15.3% for self-employment), gambling winnings are exempt.

This means:
- No 6.2% Social Security tax on your winnings
- No 1.45% Medicare tax on your winnings
- No additional 0.9% Medicare surtax on your winnings

This saves you a significant amount compared to earning the same money as salary. On a $10 million win, the FICA exemption saves you at least **$765,000** (the 7.65% employee share) compared to earning $10 million in wages. Though honestly, if you just won $10 million, the FICA savings probably aren't top of mind.

Note: This FICA exemption applies to all gambling winnings, not just the lottery. Casino winnings, sports betting, poker tournaments — none of it is subject to Social Security or Medicare tax. However, if you're a professional gambler who reports gambling as a business, the rules can differ. Consult a tax professional for your specific situation.

For more on how FICA works on regular wages, check out our [FICA tax guide](/blog/how-fica-taxes-work-2026).

## Real Examples: After-Tax Amounts for Major Jackpots

Let's run the numbers on four different jackpot sizes, assuming the winner is a single filer in two different states: Texas (0% state tax) and New York (10.9% state tax). All examples assume the lump sum is roughly 52% of the advertised jackpot.

### $1 Million Jackpot

| | Texas (0%) | New York (10.9%) |
|---|---|---|
| Advertised Jackpot | $1,000,000 | $1,000,000 |
| Lump Sum (~52%) | $520,000 | $520,000 |
| Federal Tax (37%) | -$192,400 | -$192,400 |
| State Tax | $0 | -$56,680 |
| **After-Tax Total** | **$327,600** | **$270,920** |
| Effective Tax Rate | 37.0% | 47.9% |

On a $1 million advertised jackpot, you keep roughly **$271K–$328K** depending on your state. That's 27–33 cents per advertised dollar.

### $10 Million Jackpot

| | Texas (0%) | New York (10.9%) |
|---|---|---|
| Advertised Jackpot | $10,000,000 | $10,000,000 |
| Lump Sum (~52%) | $5,200,000 | $5,200,000 |
| Federal Tax (~35.5% effective) | -$1,846,000 | -$1,846,000 |
| State Tax | $0 | -$566,800 |
| **After-Tax Total** | **$3,354,000** | **$2,787,200** |
| Effective Tax Rate | 35.5% | 46.4% |

You keep roughly **$2.8M–$3.4M** on a $10 million advertised jackpot.

### $100 Million Jackpot

| | Texas (0%) | New York (10.9%) |
|---|---|---|
| Advertised Jackpot | $100,000,000 | $100,000,000 |
| Lump Sum (~52%) | $52,000,000 | $52,000,000 |
| Federal Tax (~36.8% effective) | -$19,136,000 | -$19,136,000 |
| State Tax | $0 | -$5,668,000 |
| **After-Tax Total** | **$32,864,000** | **$27,196,000** |
| Effective Tax Rate | 36.8% | 47.7% |

You keep roughly **$27M–$33M** on a $100 million advertised jackpot. In New York, that's nearly **$5.7 million** less than in Texas, just from state taxes.

### $1 Billion Jackpot

| | Texas (0%) | New York (10.9%) |
|---|---|---|
| Advertised Jackpot | $1,000,000,000 | $1,000,000,000 |
| Lump Sum (~52%) | $520,000,000 | $520,000,000 |
| Federal Tax (~37% effective) | -$192,400,000 | -$192,400,000 |
| State Tax | $0 | -$56,680,000 |
| **After-Tax Total** | **$327,600,000** | **$270,920,000** |
| Effective Tax Rate | 37.0% | 47.9% |

On a billion-dollar jackpot, the state tax difference between Texas and New York is a staggering **$56.7 million**. That's not a rounding error — that's a small fortune going to the state instead of your bank account.

**Want to calculate your exact after-tax amount?** Use our free [lottery tax calculator](/lottery-tax-calculator) — it factors in federal brackets, state taxes, and lump sum vs. annuity options.

## Tax Strategies for Lottery Winners

Winning the lottery is a once-in-a-lifetime event (literally), and the tax implications are enormous. Here are proven strategies that lottery winners and their advisors use to minimize taxes and protect their wealth.

### 1. Assemble Your Team BEFORE Claiming the Prize

This is the single most important piece of advice in this entire article. **Do not claim the prize until you have:**

- A **CPA** who specializes in high-net-worth clients and gambling income
- A **tax attorney** who understands state tax implications
- A **estate planning attorney** to set up trusts and protect your assets
- A **financial advisor** (fee-only, not commission-based) to manage investments

In most states, you have **180 days to a year** to claim your prize. Take the time. There's no rush. A few weeks of planning can save you millions in taxes.

### 2. Consider Setting Up a Trust or LLC

Many winners claim their prize through a **blind trust** or LLC, which offers several benefits:

- **Privacy:** Your name doesn't appear in public records (in states that allow anonymous claims)
- **Asset protection:** Shields personal assets from lawsuits and creditors
- **Estate planning:** Makes it easier to transfer wealth to heirs
- **Tax flexibility:** Certain structures may offer planning opportunities

Some states — like Delaware, Kansas, Maryland, North Dakota, Ohio, South Carolina, and Texas — allow anonymous claims. Others require the winner's name to be public. A trust can help even in public-claim states by keeping your personal address and details private.

### 3. Time Your Income Strategically

If you take the lump sum, all the income hits in one tax year, pushing you into the highest bracket. But there are still strategies:

- **Make estimated tax payments** in the quarter you receive the money to avoid underpayment penalties
- **Maximize deductions** in the year you win: charitable contributions, business losses, etc.
- **Consider the annuity** if you want to spread the tax burden over 30 years

If you choose the annuity, you may be able to plan around years when you have other income or deductions to optimize your tax bracket.

### 4. Charitable Giving

Charitable donations are one of the most powerful tax strategies for lottery winners:

- **Donor-Advised Funds (DAFs):** Contribute a large amount in the year you win, get the full deduction against your windfall income, and distribute to charities over time.
- **Charitable Remainder Trusts (CRTs):** Provide income to you for life, with the remainder going to charity. You get a partial deduction upfront.
- **Direct gifts:** Up to 60% of your AGI can be deducted for cash gifts to public charities.

On a $50 million lump sum, donating $10 million to charity could save you roughly **$3.7 million** in federal taxes alone. And you're doing good in the world.

### 5. Move Before You Claim

If you bought a winning ticket in a high-tax state but live in (or can establish residency in) a no-tax state, the tax savings can be enormous. As we saw above, the difference between New York and Texas on a $1 billion jackpot is over **$56 million**.

However, be very careful here. States are aggressive about pursuing tax revenue from lottery winners, and a last-minute move might be challenged. Work with a tax attorney to establish genuine residency before claiming the prize.

### 6. Don't Forget About Estimated Taxes

If your withholding is less than 90% of your total tax liability for the year (or 100% of last year's liability, whichever is smaller), you may owe an **underpayment penalty**. The IRS expects you to pay taxes as you earn income throughout the year, not just at filing time.

For lottery winners, this means making **quarterly estimated payments** to cover the gap between the 24% withholding and your actual 37% rate. Your CPA will calculate the exact amounts.

### 7. Plan for Estate Taxes

The federal estate tax exemption in 2026 is approximately **$13.99 million** per individual ($27.98 million for married couples). If your total estate exceeds that, the excess is taxed at **40%**. For lottery winners, this is a real concern.

Estate planning strategies include:
- **Irrevocable life insurance trusts (ILITs)**
- **Grantor retained annuity trusts (GRATs)**
- **Family limited partnerships (FLPs)**
- **Annual gift tax exclusions** ($18,000 per recipient in 2026)

This is not DIY territory. Get a qualified estate planning attorney.

## What Happens If You Win in One State but Live in Another?

This is a common scenario — you buy a Powerball ticket while visiting family in Florida, but you live in New York. Who gets the tax?

Generally:
- The **state where you purchased the ticket** gets first dibs on taxing the income
- Your **home state** may also tax the income but typically offers a credit for taxes paid to another state
- If you bought the ticket in a no-tax state (like Florida) but live in a high-tax state (like New York), **your home state will still tax you** — the credit only applies if you paid tax to the other state

So buying a ticket in Florida doesn't help you escape New York taxes if you're a New York resident. The key is where you're **domiciled**, not where you bought the ticket, for your home state's tax purposes.

There are nuances and some states have reciprocity agreements. This is absolutely something to discuss with a multi-state tax professional.

## Reporting Lottery Winnings on Your Tax Return

When you win more than $600, the lottery sends you a **Form W-2G** (Certain Gambling Winnings). For winnings over $5,000, the lottery also withholds 24% for federal taxes.

On your tax return:
- Report the full winnings amount on **Schedule 1, Line 8b** (Other Income)
- The amount flows to your **Form 1040** as part of total income
- The 24% withholding appears on **Form 1040, Line 25b** as federal income tax withheld
- If you had gambling losses, you can deduct them on **Schedule 1, Line 8b** — but only up to the amount of your winnings, and only if you itemize deductions

**Important:** Gambling loss deductions are an itemized deduction. If you take the standard deduction (which is $15,700 for single filers in 2026), you cannot also deduct gambling losses. For large winners, itemizing almost always makes more sense.

## Frequently Asked Questions

### How much tax is taken out of lottery winnings?
The IRS requires 24% mandatory withholding on winnings over $5,000. However, your actual federal tax rate will likely be 37% on large jackpots, meaning you'll owe an additional 13% when you file your return. State taxes add 0% to 10.9% (or more with local taxes) on top of that.

### Do I have to pay taxes on a $1,000 lottery win?
Yes. All gambling winnings are taxable income, regardless of amount. However, the lottery only sends a W-2G and withholds taxes for wins over $5,000 (or $1,500 for certain bingo/slot winnings). For smaller wins, you're still legally required to report the income, but no withholding occurs.

### Can I deduct lottery ticket losses from my taxes?
Yes, but only up to the amount of your winnings, and only if you itemize deductions. If you take the standard deduction, you cannot deduct gambling losses. Keep all your losing tickets as documentation.

### What happens if I win the lottery in a state with no income tax?
You pay **no state income tax** on the winnings. You still pay federal tax. The states with no income tax are Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, and Tennessee.

### Is it better to take the lump sum or annuity?
It depends on your financial discipline and goals. The lump sum gives you control and investment potential but concentrates tax liability. The annuity spreads taxes over 30 years and provides guaranteed income. About 90–95% of winners choose the lump sum.

### Are lottery winnings subject to Social Security and Medicare tax?
**No.** Lottery winnings are not considered earned income, so they are exempt from FICA taxes (Social Security and Medicare). This saves you at least 7.65% compared to earning the same amount as wages.

### Do I have to pay taxes on lottery winnings if I give the ticket to someone else?
The IRS applies the "constructive receipt" doctrine — whoever purchased the ticket and had the right to the winnings is the one who's taxed. If you give a winning ticket to someone, the IRS may still consider you the winner for tax purposes. If you want to share winnings, claim the prize yourself and then gift portions to others (subject to gift tax rules — $18,000 per recipient annual exclusion in 2026).

### What if I win the lottery and move to a no-tax state?
Your tax liability is generally determined by where you were domiciled when you received the income. A last-minute move to a no-tax state might be challenged by your original state. Work with a tax attorney to establish genuine residency before claiming the prize.

### Can a trust claim lottery winnings anonymously?
In some states, yes. States like Delaware, Kansas, Maryland, North Dakota, Ohio, South Carolina, and Texas allow anonymous claims. In other states, the winner's name must be disclosed publicly. A trust or LLC can provide a layer of privacy even in public-disclosure states.

### How much would I keep on a $1 billion jackpot?
Taking the lump sum (roughly $520 million), a single filer would keep approximately **$327.6 million** in a no-tax state like Texas, or about **$270.9 million** in New York (after 10.9% state tax). These figures assume approximately 37% effective federal tax rate.

## The Bottom Line

Winning the lottery is life-changing, but the tax implications are enormous. The advertised jackpot is never what you take home — between the lump sum discount, federal taxes of up to 37%, and state taxes ranging from 0% to nearly 15%, you might keep only **25–35 cents of every advertised dollar**.

The most important steps you can take:

1. **Don't rush to claim** — take time to assemble a professional team
2. **Understand the withholding gap** — 24% is withheld, but you likely owe 37%
3. **Consider your state** — where you buy and claim matters enormously
4. **Choose wisely** between lump sum and annuity
5. **Plan for the tax bill** — set aside money for what you'll owe at filing time

And above all, **use the right tools**. Our [lottery tax calculator](/lottery-tax-calculator) gives you an instant, accurate estimate of your after-tax winnings based on your specific situation — federal brackets, state taxes, lump sum vs. annuity, it's all factored in.

Winning the lottery should be the best day of your life. Don't let tax surprises turn it into a nightmare.`
,
  "irs-withholding-w4-guide-2026": `# IRS Withholding 2026: How to Fill Out Your W-4 and Avoid Surprises

Every year, millions of Americans get a nasty shock at tax time — a bill they didn't see coming, complete with penalties. And every year, millions more get a huge refund, which sounds great until you realize you've been lending the government your money interest-free for 12 months.

Both problems come from the same root cause: **incorrect withholding**. Your W-4 form is the single document that controls how much federal income tax gets taken out of every paycheck. Fill it out right, and your tax bill at year-end is close to zero. Fill it out wrong, and you're either writing a painful check to the IRS or waiting months for a refund that should've been in your pocket all along.

In this guide, we'll walk through exactly how IRS withholding works in 2026, how to fill out your W-4 correctly, and how to find that sweet spot where you owe nothing and get nothing back. Let's get into it.

**Try our free [IRS Withholding Calculator](/irs-withholding-calculator) to find your recommended withholding in under 2 minutes.**

## What Is Tax Withholding and Why It Matters

Tax withholding is the money your employer pulls from each paycheck and sends directly to the IRS on your behalf. It's essentially a pay-as-you-go system — instead of writing one massive check on April 15th, you're chipping away at your tax bill throughout the year.

Here's why it matters more than most people think:

- **It's the law.** The IRS requires withholding under IRC §3402. If you don't have enough withheld, you can face underpayment penalties — even if you pay the full amount by April 15th.
- **It affects your cash flow.** Over-withhold by $300/month and you're giving up $3,600 in take-home pay throughout the year. That's rent money. Groceries. A vacation.
- **It determines your refund or bill.** Withholding too much = big refund (but less money in each check). Withholding too little = surprise bill and possible penalties.

The IRS expects you to pay at least **90% of your current-year tax liability** or **100% of your prior-year tax liability** (110% if your AGI was over $150,000) through withholding and estimated payments. Fall short, and the underpayment penalty kicks in — currently around **8% annualized** on the shortfall.

Use our [Paycheck Calculator](/paycheck-calculator) to see exactly how withholding impacts your take-home pay.

## How the 2026 W-4 Form Works (The 5 Steps)

The W-4 got a major overhaul in 2020, and the 2026 version follows the same structure. Gone are the old "allowances" that nobody understood. The new form uses a straightforward 5-step process:

| Step | What It Covers | Required? |
|------|---------------|------------|
| Step 1 | Personal info (name, filing status, SSN) | **Yes — everyone** |
| Step 2 | Multiple jobs or working spouse | Only if applicable |
| Step 3 | Claim dependents | Only if you have dependents |
| Step 4 | Other adjustments (other income, deductions, extra withholding) | Only if applicable |
| Step 5 | Signature and date | **Yes — everyone** |

**The key insight:** If you're single, have one job, no dependents, and take the standard deduction, you only need to complete Steps 1 and 5. The IRS will withhold based on the standard deduction for your filing status automatically.

But if your situation is more complex — and let's be honest, whose isn't? — you'll want to dig into Steps 2-4.

## Step-by-Step: How to Fill Out Your W-4

### Step 1: Personal Information

This is straightforward. Enter your name, Social Security number, address, and filing status (Single, Married Filing Jointly, Married Filing Separately, or Head of Household).

**Filing status matters a lot.** If you're married but select "Single" or "Married Filing Separately," more tax will be withheld from each check. If you select "Married Filing Jointly," less will be withheld because the brackets are wider. Choose the one that matches what you'll actually file.

### Step 2: Multiple Jobs or Spouse Works

This step is for anyone who:
- Has more than one job at the same time
- Is married and their spouse also works
- Has a working spouse AND a second job

You have three options here:

1. **Use the IRS online estimator** (most accurate) — the IRS Tax Withholding Estimator at irs.gov/W4App
2. **Use the Multiple Jobs Worksheet** on page 3 of the W-4
3. **Check the box in Step 2(c)** — this is the simplest option but may over-withhold slightly

**Why this matters:** If both spouses work and each fills out a W-4 as if they're the only earner, they'll both be using the full married-filing-jointly brackets independently. That means each job withholds as if the total household income is just that one salary — way too little. The IRS designed Step 2 to fix this.

### Step 3: Claim Dependents

If your total income will be $200,000 or less ($400,000 or less if married filing jointly), you can claim the Child Tax Credit and other dependent credits here.

For 2026, the Child Tax Credit is **$2,000 per qualifying child under age 17** and **$500 per other dependent**. You enter the total credit amount, and it reduces your withholding accordingly.

**Example:** You have two kids under 17. Your Step 3 entry would be $4,000 ($2,000 × 2). This reduces your annual withholding by $4,000, which works out to about $167 less per semi-monthly paycheck.

### Step 4: Other Adjustments

This step has three parts:

- **4(a): Other income** — If you have income not subject to withholding (interest, dividends, rental income, self-employment income), enter the annual total here. The IRS will add this to your wages for withholding calculation purposes.
- **4(b): Deductions** — If your itemized deductions exceed the standard deduction, enter the difference here. This reduces your withholding.
- **4(c): Extra withholding** — Want more taken out? Enter a dollar amount here per paycheck. Useful if you have side income you want to cover through your regular job's withholding.

### Step 5: Sign and Date

Don't skip this. An unsigned W-4 is invalid. Your employer can't process it.

## How Withholding Is Actually Calculated (IRS Publication 15-T)

Here's where things get interesting. Your employer doesn't just guess — they use IRS Publication 15-T, which provides exact formulas for calculating withholding based on your W-4 inputs and pay frequency.

The calculation follows this logic:

1. **Start with gross pay** for the pay period
2. **Subtract pre-tax deductions** (401k contributions, health insurance, HSA, FSA)
3. **Apply the standard deduction** (divided by number of pay periods in the year)
4. **Apply Step 3 credits** (divided by number of pay periods)
5. **Calculate tax on the adjusted wage** using the percentage method tables from Pub 15-T
6. **Add any Step 4(c) extra withholding**

For a single filer paid semi-monthly (24 pay periods) with the 2026 standard deduction of $15,000:

- Standard deduction per pay period = $15,000 ÷ 24 = **$625**
- If your semi-monthly gross is $3,333 ($80,000/year), your adjusted wage is $3,333 - $625 = **$2,708**
- The Pub 15-T table then applies the progressive brackets to that $2,708

**The percentage method** (which is what most payroll software uses) looks something like this for a single filer, semi-monthly in 2026:

| Adjusted Semi-Monthly Wage | Withholding Formula |
|---------------------------|-------------------|
| $0 – $483 | 10% of amount over $0 |
| $484 – $1,965 | $48.33 + 12% of amount over $483 |
| $1,966 – $4,186 | $225.94 + 22% of amount over $1,965 |
| $4,187 – $7,998 | $714.06 + 24% of amount over $4,186 |
| $7,999 – $10,155 | $1,630.58 + 32% of amount over $7,998 |

So for our example with $2,708 adjusted wage: $225.94 + 22% × ($2,708 - $1,965) = $225.94 + 22% × $743 = $225.94 + $163.46 = **$389.40** per paycheck in federal withholding.

That's about $9,346/year in federal withholding on an $80,000 salary — roughly 11.7% effective rate. Seems about right for a single filer with the standard deduction.

## Too Much Withholding = Big Refund, Less Take-Home Pay

Let's talk about the "big refund" mentality. I get it — getting a $4,000 check in February feels like a win. But here's the math:

If you're getting a $4,000 refund, that means you overpaid by **$333/month** or about **$167 per biweekly paycheck**. That's money you could have been:

- Paying down high-interest credit card debt (at 20%+ APR, that's $800/year in interest you didn't need to pay)
- Contributing to your 401(k) or IRA (earning compound returns)
- Just... having. In your bank account. For emergencies.

A refund isn't a bonus. It's a refund — the IRS giving back money that was always yours. You just let them hold it for free.

**When over-withholding might be okay:**
- You know you're terrible at saving and the refund forces you to save
- You had a windfall (bonus, stock sale) and want extra withholding to cover it
- You prefer the peace of mind and don't mind the lost opportunity cost

Check your expected refund with our [Tax Refund Calculator](/tax-refund-calculator).

## Too Little Withholding = Surprise Tax Bill + Penalties

This is the worse scenario by far. Under-withhold by $3,000 and you'll owe that PLUS:

- **Underpayment penalty** — The IRS charges interest (currently ~8%) on the underpaid amount for each quarter it was short
- **Stress and scrambling** — Coming up with a lump sum in April is way harder than spreading it across paychecks

The penalty applies unless you meet one of the safe harbors:

1. You owed less than $1,000 in tax after subtracting withholding and credits
2. You paid at least 90% of the tax you owe for the current year
3. You paid at least 100% of the tax shown on your prior-year return (110% if AGI was over $150,000)

**Example of the penalty hitting:** Let's say your 2026 total tax is $12,000, but your withholding was only $7,000. You underpaid by $5,000. If you don't meet any safe harbor, the IRS hits you with roughly 8% annualized on the underpayment for each quarter. On $5,000, that's roughly $200-$400 in penalties depending on when each quarter's shortfall occurred.

Not devastating, but completely avoidable.

## The Sweet Spot: How to Get Close to Zero at Tax Time

The ideal scenario is simple: **owe a small amount or get a small refund** — somewhere between owing $0 and getting back $500. That means your withholding was almost perfectly calibrated.

Here's how to get there:

1. **Start with the IRS Tax Withholding Estimator** at irs.gov/W4App. It uses your actual pay stubs and expected income to recommend a W-4 configuration.

2. **Or use our [IRS Withholding Calculator](/irs-withholding-calculator)** — it's faster and gives you a specific W-4 recommendation.

3. **Review your prior-year return.** If you got a $3,200 refund last year and your situation is basically the same, you need to reduce your withholding by about $3,200/year. On a biweekly pay schedule, that's $123 less per check. You'd add -$123 to Step 4(c) ... except you can't add negative amounts. Instead, you'd need to increase Step 3 (claim more dependent credits) or reduce Step 4(a) (less other income reported).

4. **Mid-year checkup.** In September or October, look at your YTD withholding and compare it to your expected total tax. If you're way off, submit a new W-4 to your employer. It takes effect within 30 days.

5. **Account for all income sources.** Don't forget interest, dividends, capital gains, and side gigs.

## Life Changes That Require W-4 Updates

Your W-4 isn't a set-it-and-forget-it thing. Any major life change can throw your withholding off. Here are the big ones:

### Getting Married

Marriage changes your filing status and potentially your brackets. If both spouses work, you **must** address Step 2 on the W-4. Without it, you'll almost certainly under-withhold.

### Having a Child

A new dependent means you can claim the Child Tax Credit in Step 3 ($2,000 per child under 17). Update your W-4 and you'll see more money in each paycheck.

### Starting a New Job

New job, new W-4. Fill it out fresh — don't just copy what you had before. A higher salary means different withholding dynamics.

### Buying a Home

Mortgage interest and property taxes might push you into itemizing territory. If your itemized deductions exceed the standard deduction, you can enter the difference in Step 4(b) to reduce withholding.

### Side Income or Freelance Work

This is a big one. If you pick up a side hustle making $15,000/year with no withholding, you need to account for that tax somewhere. Options:
- Add the expected additional income in Step 4(a) on your main job's W-4
- Add extra withholding in Step 4(c)
- Make quarterly estimated tax payments

### Divorce

Filing status changes, dependents may change, alimony may factor in — basically everything about your tax situation shifts. Update your W-4 immediately.

## Self-Employment Income and Withholding

If you're fully self-employed, there's no employer to withhold for you. You're responsible for making **quarterly estimated tax payments** using Form 1040-ES. For 2026, the quarterly due dates are:

- **Q1:** April 15, 2026
- **Q2:** June 15, 2026
- **Q3:** September 15, 2026
- **Q4:** January 15, 2027

Each payment should be roughly 25% of your expected annual tax liability. And don't forget — self-employment tax (15.3% for Social Security and Medicare) applies on top of income tax.

**If you have both a W-2 job and self-employment income,** the smartest move is to increase withholding on your W-2 job to cover the self-employment tax. That way you don't have to make separate quarterly payments. Enter the additional amount in Step 4(c) of your W-4.

Use our [Self-Employment Tax Calculator](/self-employment-tax-calculator) to figure out how much you'll owe.

## Real Examples: How Withholding Plays Out

### Example 1: Single Filer, One Job

**Profile:** Sarah, 28, single, one job, $65,000 salary, no dependents, standard deduction

- Filing status: Single
- W-4: Steps 1 and 5 only (simplest form)
- Annual federal withholding: ~$7,980
- Actual 2026 tax liability: ~$7,850
- Expected refund: ~$130

Sarah's situation is the simplest. The default W-4 withholding for a single filer with one job tracks very closely to actual tax liability. She's basically at the sweet spot.

### Example 2: Married Couple, One Earner

**Profile:** Mark and Lisa, married filing jointly. Mark earns $95,000. Lisa stays home with their two kids (ages 5 and 8).

- Filing status: Married Filing Jointly
- W-4 Step 3: $4,000 (2 children × $2,000)
- Annual federal withholding: ~$7,200
- Actual 2026 tax liability: ~$5,100
- Expected refund: ~$2,100

Wait, why the big refund? Because the married filing jointly brackets are wide, and with only one earner at $95,000, the default withholding is conservative. Mark could reduce withholding by entering an additional amount in Step 4(b) for deductions above the standard, or just know the refund is coming. To get closer to zero, he could add roughly $80 per biweekly paycheck to Step 4(c) as negative — but since he can't, he could instead claim an additional $2,000 in Step 3 (not technically correct, but the IRS doesn't verify Step 3 against actual dependents on the W-4 — they reconcile at tax time). The cleaner approach is to use the IRS estimator for a precise recommendation.

### Example 3: Dual-Income Married Couple

**Profile:** James earns $85,000, Priya earns $110,000. Married filing jointly, no kids.

- Combined income: $195,000
- If both select "Married Filing Jointly" on their W-4s **without** completing Step 2, each job withholds as if the household income is just their salary
- James's withholding (without Step 2): ~$8,200/year
- Priya's withholding (without Step 2): ~$13,100/year
- Total withholding: ~$21,300
- **Actual 2026 tax on $195,000 (MFJ, standard deduction): ~$27,100**
- **Shortfall: ~$5,800** → Surprise bill + penalties!

With Step 2 completed correctly (using the Multiple Jobs Worksheet or the online estimator):
- James's withholding: ~$11,400/year
- Priya's withholding: ~$15,700/year
- Total withholding: ~$27,100
- Shortfall: **$0** ✓

This is exactly why Step 2 exists. Dual-income couples who skip it are the #1 group that ends up with surprise tax bills.

## FAQ: IRS Withholding and W-4

**How often can I submit a new W-4?**
As often as you want. There's no limit. Submit a new one to your HR department whenever your situation changes or you want to adjust your withholding.

**Does my employer see my Step 4(a) other income?**
Technically yes — your employer processes your W-4. But they only see the number on the form, not a breakdown of what the income is. If that bothers you, you can instead add extra withholding in Step 4(c) to cover the additional tax without disclosing the income source.

**What if I have three jobs?**
The W-4's Multiple Jobs Worksheet is designed for two jobs. For three or more, use the IRS online Tax Withholding Estimator, which handles any number of income sources.

**Can I claim "Exempt" from withholding?**
Yes, if you had no federal income tax liability last year AND expect none this year. Write "Exempt" on the W-4 line below Step 4(c). This only applies to federal income tax — Social Security and Medicare (FICA) still get withheld.

**What's the difference between allowances and the new W-4?**
Allowances were eliminated with the 2020 W-4 redesign. The new form uses direct dollar amounts (credits, deductions, extra withholding) instead of the confusing allowance system. It's more transparent and more accurate.

**Will updating my W-4 trigger an audit?**
No. The IRS doesn't audit people for adjusting their W-4. They might send a "lock-in letter" if you consistently claim exempt or an unreasonably low withholding amount, but a normal adjustment won't raise any flags.

**How do I know if I'm under-withholding?**
Check your pay stub. Compare YTD federal withholding to roughly 10-15% of YTD gross income (for most middle-income filers). Better yet, use our [IRS Withholding Calculator](/irs-withholding-calculator) for a precise answer.

**What about state withholding?**
Most states have their own version of the W-4. Some use the federal W-4, some have a separate state form, and a few states (like Texas, Florida, Nevada) have no state income tax at all. Check your state's requirements.

## Key Takeaways

1. **Your W-4 controls your paycheck.** A few minutes on this form can mean hundreds of dollars more (or less) in take-home pay each month.
2. **The 5-step W-4 is simpler than the old allowance system**, but Steps 2-4 still trip people up — especially dual-income households.
3. **Big refunds aren't wins.** They mean you overpaid all year. Aim for a small refund or small balance due.
4. **Life changes = W-4 changes.** Marriage, kids, new jobs, side income — update your W-4 whenever your situation shifts.
5. **Use the tools.** The IRS estimator and our [IRS Withholding Calculator](/irs-withholding-calculator) take the guesswork out of this.
6. **Don't forget self-employment income.** If you have side income, cover the tax through your W-2 withholding or quarterly estimated payments.

Ready to optimize your withholding? **[Calculate your recommended W-4 withholding now →](/irs-withholding-calculator)**`
,
  "sales-tax-by-state-guide-2026": `# Sales Tax by State: Complete Guide to US Tax Rates in 2026

If you've ever looked at a receipt and wondered why you paid $107.50 for a $100 item — or why your friend in another state paid exactly $100 for the same thing — you've already bumped into the weird, wonderful world of sales tax. Sales tax in the United States is not a single, uniform thing. It's a patchwork of state rates, local add-ons, special district taxes, and exemptions that can make your head spin.

Here's the thing: there is no federal sales tax. Every state gets to decide its own rules. And that means sales tax rates vary wildly depending on where you live, where you shop, and sometimes even what you're buying. A pair of shoes in Tennessee? That'll cost you more in tax than the same shoes in Delaware. Groceries in Illinois? Taxed differently than groceries in Pennsylvania.

In this guide, we'll break it all down. By the end, you'll understand how sales tax works, which states charge the most (and least), what items are typically exempt, and how to calculate sales tax yourself. Plus, we've got a free [sales tax calculator](/sales-tax-calculator) that does the heavy lifting for you.

## What Is Sales Tax and How Does It Work?

Sales tax is a consumption tax imposed by state and local governments on the sale of goods and certain services. When you buy something at a store or online, the seller collects the tax at the point of sale and then remits it to the appropriate government authority.

Here's how it works in practice:

1. **You buy an item** — let's say a $50 backpack in a state with a 6% sales tax rate.
2. **The seller calculates the tax** — $50 × 0.06 = $3.00.
3. **You pay $53.00 total** — $50 for the backpack, $3.00 in sales tax.
4. **The seller sends the $3.00 to the state** — they don't keep any of it (though they may get a small discount for collecting it on time).

Sounds simple enough, right? But here's where it gets complicated: most states allow local governments (counties, cities, special districts) to add their own sales tax on top of the state rate. So the actual rate you pay — called the **combined rate** — can be significantly higher than the state rate alone.

For example, Louisiana's state sales tax rate is 4.45%, but many parishes add local taxes that push the combined rate above 10%. In some areas of the state, you could pay as much as 11.45% in total sales tax.

And then there are the exemptions. Most states don't tax groceries at the full rate (or at all). Many states exempt prescription drugs. A few states exempt clothing under a certain price threshold. These exemptions vary from state to state, which is what makes sales tax so confusing — and why guides like this one exist.

## The 5 States With No Sales Tax

Let's start with the good news. Five states don't charge a statewide sales tax at all:

### 1. Delaware (DE)
Delaware has no state or local sales tax. None. Zero. That's why outlet malls in Rehoboth Beach are packed with shoppers from Maryland, New Jersey, and Pennsylvania every weekend. Delaware makes up for the lost revenue through other taxes, including a relatively high gross receipts tax on businesses.

### 2. Montana (MT)
Montana has no statewide sales tax. There are a few special resort areas that charge a local sales tax (up to 3%), but for the vast majority of purchases, you pay zero. Montana has debated introducing a sales tax multiple times, but voters have consistently rejected it.

### 3. New Hampshire (NH)
The Granite State has no sales tax on most purchases. New Hampshire does, however, charge a 9% meals and rooms tax on restaurant meals, hotel stays, and short-term rentals. So while your groceries and clothing are tax-free, eating out will cost you.

### 4. Oregon (OR)
Oregon has no statewide sales tax, and local governments aren't allowed to levy their own sales taxes either. It's truly zero. Oregon compensates with a relatively high state income tax instead. If you're an Oregon resident shopping in person, you never pay sales tax. (Online purchases from Oregon sellers are also tax-free for Oregon residents.)

### 5. Alaska (AK)
Alaska is the trickiest one. There's no **statewide** sales tax, but Alaska allows local municipalities to levy their own sales taxes — and many of them do. Over 100 boroughs and cities in Alaska have local sales taxes, with rates ranging from 1% to 7.5%. So while Alaska doesn't have a state sales tax, you might still pay sales tax depending on where in Alaska you're shopping.

**Important caveat:** Even in states with no sales tax, you may still owe sales tax on online purchases from sellers in other states (more on that in the Wayfair section below). And if you're a business owner in a no-sales-tax state selling to customers in other states, you may still have nexus obligations.

## The Highest Sales Tax States in 2026

Now for the states where your wallet really feels it. These states have the highest combined state and local sales tax rates in the country:

### 1. Louisiana — Combined Rate Up to 11.45%
Louisiana has a state rate of 4.45%, but local parish taxes can add up to 7%, pushing combined rates as high as 11.45%. The statewide average combined rate is around 9.55%. Louisiana is consistently the state with the highest average combined sales tax rate in the nation.

### 2. Tennessee — Combined Rate Up to 9.75%
Tennessee's state rate is 7.0%, which is the second-highest state rate in the country. Local taxes add up to 2.75%, making the maximum combined rate 9.75%. The average combined rate is around 9.56%. Notably, Tennessee does not tax groceries at the full rate — they're taxed at only 4% statewide.

### 3. Arkansas — Combined Rate Up to 11.25%
Arkansas has a state rate of 6.5%, but local taxes can push the combined rate as high as 11.25% in some areas. The average combined rate is around 9.46%. Arkansas is one of the few states that taxes groceries, though at a reduced rate of 1.5%.

### 4. Washington — Combined Rate Up to 10.5%
Washington state has a 6.5% state rate, but local taxes in cities like Seattle can push the combined rate to 10.5%. The average combined rate is around 9.39%. Washington is notable because it has no state income tax — it relies heavily on sales tax for revenue instead.

### 5. Alabama — Combined Rate Up to 11.0%
Alabama's state rate is 4.0%, but combined with local taxes that can reach 7%, some areas have combined rates as high as 11.0%. The average combined rate is around 9.30%. Like Arkansas, Alabama taxes groceries — but at a reduced rate that varies by locality.

### Top 10 States by Average Combined Sales Tax Rate

| Rank | State | State Rate | Avg. Local Rate | Avg. Combined Rate |
|------|-------|-----------|----------------|-------------------|
| 1 | Louisiana | 4.45% | 5.10% | 9.55% |
| 2 | Tennessee | 7.00% | 2.56% | 9.56% |
| 3 | Arkansas | 6.50% | 2.96% | 9.46% |
| 4 | Washington | 6.50% | 2.89% | 9.39% |
| 5 | Alabama | 4.00% | 5.30% | 9.30% |
| 6 | Oklahoma | 4.50% | 4.50% | 9.00% |
| 7 | Illinois | 6.25% | 2.64% | 8.89% |
| 8 | Kansas | 6.50% | 2.21% | 8.71% |
| 9 | New York | 4.00% | 4.52% | 8.52% |
| 10 | California | 7.25% | 1.25% | 8.50% |

Notice how the state rate alone doesn't tell the full story? California has the highest state rate at 7.25%, but relatively modest local rates mean it ranks 10th in combined rate. Meanwhile, Louisiana's state rate is only 4.45%, but massive local taxes push it to #1 overall.

Use our state-specific calculators to find exact rates: [California sales tax calculator](/sales-tax-calculator/california), [Texas sales tax calculator](/sales-tax-calculator/texas), [Florida sales tax calculator](/sales-tax-calculator/florida), [New York sales tax calculator](/sales-tax-calculator/newyork), [Illinois sales tax calculator](/sales-tax-calculator/illinois).

## How Combined Sales Tax Rates Work

Understanding combined rates is crucial because the state rate you see advertised is almost never the rate you actually pay. Here's the breakdown:

**Combined Rate = State Rate + County Rate + City Rate + Special District Rate**

Let's say you live in Chicago, Illinois. Here's what your combined rate looks like:

- **Illinois state rate:** 6.25%
- **Cook County rate:** 1.75%
- **City of Chicago rate:** 1.25%
- **Regional Transportation Authority (RTA):** 1.00%
- **Combined rate:** **10.25%**

That's a full 4 percentage points higher than the state rate alone. And it's why you need to look up the combined rate for your specific location, not just your state's rate.

Special district taxes fund things like public transportation, stadiums, cultural facilities, and other regional projects. They're added to the sales tax rate in specific geographic areas, and they can change from year to year as districts are created, expanded, or dissolved.

The good news is that you don't have to calculate all of this yourself. Our [sales tax calculator](/sales-tax-calculator) looks up the exact combined rate for any address or ZIP code in the United States.

### Why Combined Rates Vary So Much Within a State

If you live in one county and work in another, you might notice that the sales tax rate at the coffee shop near your office is different from the one near your home. That's because local taxes are, well, local. Two cities in the same state can have very different combined rates.

For example, in Colorado:
- The state rate is 2.9%.
- Some cities have combined rates as low as 2.9% (no local add-ons).
- Other cities, like Winter Park, have combined rates above 11% due to special district taxes for ski area improvements and other local projects.

That's an 8+ percentage point difference within the same state. So when someone asks "What's the sales tax in Colorado?" — the honest answer is "It depends on exactly where you are."

## Tax-Exempt Items by Category

One of the most confusing aspects of sales tax is that not everything is taxed — and what's exempt varies by state. Here's a breakdown of the most common exemption categories:

### Groceries

Most states either exempt groceries entirely or tax them at a reduced rate. As of 2026:

- **Fully exempt (no tax on groceries):** California, Delaware, Montana, New Hampshire, New Jersey, Oregon, Pennsylvania, and a few others
- **Taxed at a reduced rate:** Arkansas (1.5%), Illinois (1%), Tennessee (4%), Utah (1.75%), and others
- **Taxed at the full rate:** Alabama, Hawaii, Idaho, Kansas, Mississippi, Oklahoma, South Dakota, and a few others
- **Mixed/complex rules:** Some states exempt groceries but not prepared foods, snacks, or soft drinks

**Pro tip:** The definition of "groceries" matters more than you'd think. In many states, a loaf of bread is tax-exempt, but a hot rotisserie chicken from the same store is taxable as "prepared food." Candy might be taxable while cookies are not. It's a maze.

### Prescription Drugs

The vast majority of states exempt prescription drugs from sales tax:

- **Fully exempt:** 44 states plus DC
- **Taxed:** Illinois (1%), and a few others with reduced rates
- **Over-the-counter drugs:** Exempt in about half of states, fully taxed in the other half

This is one area where most states agree — taxing essential medicine is generally unpopular. But over-the-counter medications like aspirin and allergy medicine? That's a mixed bag.

### Clothing

Clothing exemptions are where things get really interesting:

- **Fully exempt:** Delaware, Montana, New Hampshire, Oregon (no sales tax at all), plus **Pennsylvania**, **New Jersey**, **Minnesota**, **Vermont**, and **Massachusetts** (up to $175 per item)
- **Taxed at a reduced rate:** New York exempts clothing under $110 per item
- **Fully taxed at regular rate:** Most other states

If you've ever wondered why people drive from New York to New Jersey to shop at the Paramus malls, now you know. In New Jersey, clothing is tax-exempt. In New York City, you'd pay 8.875% on that same jacket.

### Other Common Exemptions

- **Agricultural supplies:** Exempt in most farming states
- **Manufacturing equipment:** Exempt in many states to encourage business investment
- **Newspapers and magazines:** Exempt in several states (but digital subscriptions usually aren't)
- **Textbooks:** Exempt in some states when purchased by students
- **Religious items:** Exempt in a few states
- **Funeral expenses:** Exempt in several states

The key takeaway: if you're making a major purchase, it's worth checking whether your state offers an exemption. You might be surprised.

## How to Calculate Sales Tax

Now let's get practical. Whether you're budgeting for a purchase or running a small business, you need to know how to calculate sales tax.

### The Basic Formula

**Sales Tax = Purchase Price × Sales Tax Rate**

**Total Price = Purchase Price + Sales Tax**

Or, more concisely:

**Total Price = Purchase Price × (1 + Sales Tax Rate)**

### Example 1: Simple Calculation

You're buying a $200 television in Texas, where the state sales tax rate is 6.25%.

- Sales Tax = $200 × 0.0625 = $12.50
- Total Price = $200 + $12.50 = **$212.50**

But wait — if you're in Houston, the combined rate is actually 8.25% (6.25% state + 2% local). Let's redo that:

- Sales Tax = $200 × 0.0825 = $16.50
- Total Price = $200 + $16.50 = **$216.50**

That's a $4 difference just from the local portion. Always use the combined rate for your specific location.

Use our [Texas sales tax calculator](/sales-tax-calculator/texas) for exact rates by city and ZIP code.

### Example 2: Large Purchase with Special District Tax

You're buying a $1,000 laptop in [California](/sales-tax-calculator/california). The state rate is 7.25%, but you're in Los Angeles County where the combined rate is 9.5%.

- Sales Tax = $1,000 × 0.095 = $95.00
- Total Price = $1,000 + $95.00 = **$1,095.00**

### Example 3: Tax-Exempt Items in the Same Transaction

You're at a grocery store in Pennsylvania buying $80 in groceries and $25 in household cleaning supplies. In Pennsylvania, groceries are exempt but cleaning supplies are taxable at 6% (plus local tax, say 1% — combined 7%).

- Tax on groceries: $0 (exempt)
- Tax on cleaning supplies: $25 × 0.07 = $1.75
- Total Price = $80 + $25 + $1.75 = **$106.75**

This is why your grocery receipt often shows multiple tax lines — different items may be taxed at different rates.

## Reverse Sales Tax Calculation

Sometimes you know the total amount you paid (including tax) and need to figure out the pre-tax price. This comes up in accounting, expense reports, and when you're trying to figure out the original price from a receipt that only shows the total.

### The Reverse Formula

**Pre-Tax Price = Total Price ÷ (1 + Sales Tax Rate)**

**Sales Tax Amount = Total Price − Pre-Tax Price**

### Example: Reverse Calculation

You have a receipt showing a total of $108.25 in [Florida](/sales-tax-calculator/florida), where the combined rate in Miami is 7%.

- Pre-Tax Price = $108.25 ÷ 1.07 = $101.17
- Sales Tax Amount = $108.25 − $101.17 = $7.08

Let's verify: $101.17 × 0.07 = $7.08. ✓ Total: $101.17 + $7.08 = $108.25. ✓

### Why This Matters for Businesses

If you're a business owner and you collect a flat amount that includes tax (like a service bundle that's advertised as "$500 including tax"), you need to back out the tax to report your revenue correctly. Your revenue is the pre-tax amount — the tax portion isn't income, it's money you owe to the state.

Our [sales tax calculator](/sales-tax-calculator) includes a reverse calculation mode — just enter your total and it'll tell you the pre-tax price and the tax amount.

## Online Sales Tax After Wayfair v. South Dakota

This is the section that changed everything for online sellers. If you run an online business or sell on platforms like Etsy, Amazon, or Shopify, pay close attention.

### The Pre-Wayfair World (Before 2018)

Before 2018, online sellers only had to collect sales tax in states where they had a **physical presence** — a warehouse, office, store, or employees. This was based on the 1992 Supreme Court decision in Quill Corp. v. North Dakota.

The result? Many online retailers had no physical presence in most states, so they didn't collect sales tax in those states. Consumers were technically supposed to report and pay "use tax" on their out-of-state purchases, but almost nobody did. States were losing billions in uncollected tax revenue.

### The Wayfair Decision (June 2018)

In **South Dakota v. Wayfair, Inc.**, the Supreme Court overturned the physical presence rule. The new standard is **economic nexus** — if a seller has enough economic activity in a state, they have to collect sales tax there, regardless of physical presence.

South Dakota's law (which the Court upheld) established economic nexus thresholds of:
- **$100,000** in gross revenue from sales to South Dakota customers in the previous 12 months, OR
- **200** separate transactions with South Dakota customers in the previous 12 months

### Economic Nexus in 2026: What It Means for You

After Wayfair, virtually every state with a sales tax adopted its own economic nexus rules. While the thresholds vary by state, the most common standards are:

- **$100,000 in sales** into the state within a 12-month period (most common)
- **200 transactions** into the state within a 12-month period (becoming less common as states drop this threshold)
- **$100,000 in sales AND 200 transactions** (a few states require both)

As of 2026, if your business sells more than $100,000 into most states, you likely need to register, collect, and remit sales tax there. This is true even if you're a one-person operation working from your kitchen table.

### Marketplace Facilitator Laws

Here's some relief for small sellers: most states have enacted **marketplace facilitator laws**. These require platforms like Amazon, Etsy, eBay, and Walmart Marketplace to collect and remit sales tax on behalf of their third-party sellers.

If you only sell through a marketplace platform, the platform handles sales tax. You generally don't need to register or file in those states. But if you sell through your own website too, you're responsible for collecting tax on those direct sales.

### Key Takeaways for Online Sellers

1. **Know your nexus states.** Track your sales by state monthly. If you're approaching the $100,000 threshold in any state, prepare to register.
2. **Use automated tax software.** Services like Avalara, TaxJar, and others can automatically calculate, collect, and file sales tax in every state. For most businesses, this is cheaper than the penalties for getting it wrong.
3. **Don't forget about use tax.** If you're a buyer and the seller didn't collect sales tax, you may owe use tax to your home state.
4. **Keep good records.** States can audit you going back several years. Having documentation of your sales, nexus analysis, and tax filings is essential.

## State-by-State Sales Tax Quick Reference

Here's a snapshot of every state's sales tax situation as of 2026:

### States With No State Sales Tax
- **Alaska:** No state rate (local rates up to 7.5%)
- **Delaware:** No sales tax
- **Montana:** No state rate (limited local resort taxes)
- **New Hampshire:** No sales tax (9% meals and rooms tax)
- **Oregon:** No sales tax

### States With the Lowest State Rates
- **Colorado:** 2.9%
- **Alabama:** 4.0%
- **Georgia:** 4.0%
- **Hawaii:** 4.0% (technically an excise tax, but functions like sales tax)
- **Louisiana:** 4.45%
- **New York:** 4.0%
- **Oklahoma:** 4.5%
- **North Dakota:** 5.0%
- **South Dakota:** 4.5%
- **Wisconsin:** 5.0%

### States With the Highest State Rates
- **California:** 7.25%
- **Indiana:** 7.0%
- **Mississippi:** 7.0%
- **Rhode Island:** 7.0%
- **Tennessee:** 7.0%
- **Minnesota:** 6.875%
- **Nevada:** 6.85%
- **Kansas:** 6.5%
- **New Jersey:** 6.625%
- **Arkansas:** 6.5%

Remember, the state rate is just part of the picture. Always check the combined rate for your specific location. Our [New York sales tax calculator](/sales-tax-calculator/newyork) and [Illinois sales tax calculator](/sales-tax-calculator/illinois) are great examples — the combined rates in New York City and Chicago are dramatically higher than the state rates alone.

## Sales Tax Holidays in 2026

Many states offer sales tax holidays — short periods (usually a weekend or a week) when certain items are exempt from sales tax. Common themes include:

- **Back-to-school:** Clothing, school supplies, and computers under certain price limits (typically in August)
- **Emergency preparedness:** Generators, flashlights, batteries, and other supplies (typically before hurricane season)
- **Energy Star appliances:** Energy-efficient appliances and sometimes HVAC systems
- **Second Amendment:** Hunting and fishing supplies in some states

Sales tax holidays are a great time to make major purchases, but the rules are specific. Each state defines which items qualify and sets price caps. A $1,500 laptop might be tax-free during a back-to-school holiday, but a $2,000 one might not qualify.

Check your state's department of revenue website for specific dates and rules for 2026 sales tax holidays.

## Common Mistakes People Make With Sales Tax

### 1. Using the State Rate Instead of the Combined Rate

This is the #1 mistake. You look up your state's rate, calculate the tax, and it's wrong because you forgot about local taxes. Always use the combined rate for your specific address.

### 2. Forgetting That Online Purchases May Be Taxed

After the Wayfair decision, most online purchases are now subject to sales tax. If an online seller doesn't collect it, you may owe use tax. Ignoring this won't make it go away.

### 3. Assuming Groceries Are Always Tax-Free

They're not. Several states tax groceries at the full rate, and many others tax them at a reduced rate. Check your state's rules before assuming your grocery bill is tax-free.

### 4. Not Taking Advantage of Sales Tax Holidays

If your state offers a sales tax holiday on big-ticket items you were going to buy anyway, waiting a few weeks can save you significant money. On a $2,000 computer, an 8% sales tax holiday saves you $160.

### 5. Miscalculating Reverse Sales Tax

The reverse sales tax formula is **not** just "multiply by the tax rate." You divide by (1 + rate), not multiply. Using the wrong formula leads to errors in accounting and expense reports.

## Frequently Asked Questions

### What state has the highest sales tax?
Louisiana has the highest average combined sales tax rate at approximately 9.55%. However, the highest state-level rate belongs to California at 7.25%. The difference is that Louisiana's local taxes are much higher on average than California's.

### What state has the lowest sales tax?
Among states that charge sales tax, Colorado has the lowest state rate at 2.9%. However, local taxes in Colorado can push combined rates much higher. Four states — Delaware, Montana, New Hampshire, and Oregon — have no sales tax at all.

### Do I have to pay sales tax on online purchases?
In most cases, yes. After the 2018 Supreme Court decision in South Dakota v. Wayfair, states can require online sellers to collect sales tax based on economic nexus, not just physical presence. If the seller doesn't collect tax, you may owe use tax to your state.

### What is the difference between sales tax and use tax?
Sales tax is collected by the seller at the point of sale. Use tax is paid directly by the buyer when sales tax wasn't collected — typically on out-of-state or online purchases. The rate is usually the same; the difference is who pays it and when.

### Are groceries tax-free?
It depends on the state. Some states fully exempt groceries (like California and New Jersey), some tax them at a reduced rate (like Illinois at 1%), and some tax them at the full rate (like Alabama and Mississippi). Many states also distinguish between "groceries" and "prepared food" — a cold sandwich might be tax-free while a hot one is taxed.

### How do I find my exact sales tax rate?
Use our free [sales tax calculator](/sales-tax-calculator) and enter your ZIP code or address. It will look up the exact combined rate (state + county + city + special district) for your location.

### Do I need to collect sales tax if I sell online?
If your business has economic nexus in a state (typically $100,000+ in sales or 200+ transactions into that state in the past 12 months), you generally need to register for and collect sales tax in that state. Marketplace sellers may have their taxes handled by the platform.

### Is clothing tax-free?
In some states, yes. Pennsylvania, New Jersey, Minnesota, Vermont, and Massachusetts exempt most clothing from sales tax. New York exempts clothing under $110 per item. Most other states tax clothing at the full rate.

### Can sales tax rates change during the year?
Yes. Local jurisdictions can change their rates, and special district taxes can be added or removed. Most rate changes take effect on January 1 or July 1, but they can happen at any time. Our calculator is updated regularly to reflect the latest rates.

### What is a sales tax holiday?
A sales tax holiday is a temporary period when a state waives sales tax on certain items. These typically happen once a year and cover categories like back-to-school supplies, emergency preparedness items, or Energy Star appliances. Dates and eligible items vary by state.

---

Sales tax doesn't have to be confusing. Whether you're a consumer trying to budget for a big purchase or a business owner navigating multi-state compliance, understanding how rates work is the first step. Use our free [sales tax calculator](/sales-tax-calculator) to get exact rates for any address in the United States — no guessing required.`
,
  "no-tax-on-overtime-guide-2026": `# No Tax on Overtime: How the New Law Saves You Money (2025–2028)

If you've been working overtime and watching a big chunk of that extra pay disappear to taxes, there's good news. The **No Tax on Overtime** provision — part of the One Big Beautiful Bill Act signed into law in 2025 — eliminates federal income tax on qualified overtime compensation through the end of 2028. That means more of your overtime dollars stay in your pocket.

But before you start planning how to spend all that extra cash, you need to understand the details. Who qualifies? What taxes are still taken out? How much will you actually save? And what happens when the law expires?

This guide covers everything you need to know about the overtime tax exemption, with real numbers, worked examples, and a state-by-state breakdown.

**Ready to calculate your savings right now?** Try our free [overtime tax calculator](/overtime-tax-calculator) to see exactly how much more take-home pay you'll keep.

## What Is the No Tax on Overtime Law?

The No Tax on Overtime provision was included in the **One Big Beautiful Bill Act**, a broad tax and spending package passed by Congress and signed by President Trump in 2025. The core idea is simple: if you earn overtime pay as a non-exempt hourly worker, that overtime compensation is **exempt from federal income tax**.

This isn't a deduction. It's not a credit. It's a full **exemption** — meaning the federal government simply does not tax your overtime wages as income. The money that would have gone to the IRS from your OT pay stays with you instead.

The provision is effective for tax years **2025 through 2028**, with a sunset date of December 31, 2028. Unless Congress extends or makes it permanent, overtime pay will once again be subject to federal income tax starting in 2029.

### Why Was This Law Passed?

The policy was pitched as a way to reward hard work and boost take-home pay for middle- and lower-income workers who rely on overtime to make ends meet. The argument: if you're working 50 or 60 hours a week, the government shouldn't be taking a bigger cut of those extra hours. It's also designed to incentivize people to work more overtime, potentially easing labor shortages in industries like manufacturing, healthcare, and logistics.

Whether you agree with the politics or not, the financial impact is real — and potentially significant if you regularly work OT.

## Who Qualifies for the Overtime Tax Exemption?

Not everyone who works extra hours gets this tax break. The exemption applies specifically to **non-exempt employees who receive overtime pay under the Fair Labor Standards Act (FLSA)**. Here's what that means in plain English:

### You Qualify If:

- **You're classified as a non-exempt worker** under FLSA rules — meaning your employer is legally required to pay you overtime
- **You're paid on an hourly basis** (salaried non-exempt workers also qualify, but it's less common)
- **You work more than 40 hours in a workweek** and receive the legally mandated 1.5x overtime rate
- **Your overtime pay is reported on your W-2** as separate from regular wages

### You Do NOT Qualify If:

- **You're an exempt employee** — typically salaried professionals, executives, administrators, and outside sales employees who are not entitled to overtime under FLSA
- **You're an independent contractor or self-employed** — the FLSA overtime rules don't apply to you (though our [self-employment tax calculator](/self-employment-tax-calculator) can help with your overall tax picture)
- **You receive "comptime" (compensatory time)** instead of overtime pay
- **Your employer voluntarily pays extra hours at straight time** — the exemption only applies to the legally required 1.5x rate

### What About Salaried Non-Exempt Workers?

Yes, salaried non-exempt employees who qualify for FLSA overtime also benefit from this exemption. However, the employer must clearly distinguish between regular salary and overtime compensation on the W-2 for the exemption to apply cleanly. If you're in this category, talk to your HR or payroll department about how your OT is being reported.

## What's Exempt vs. What's NOT Exempt

This is where a lot of people get confused, so let's be crystal clear:

### ✅ EXEMPT from Tax (You Don't Pay)

| Tax Type | Status | Notes |
|----------|--------|-------|
| Federal Income Tax | **Exempt** | Your overtime pay is not subject to federal income tax withholding |
| Federal Tax Brackets | **Exempt** | OT pay doesn't push you into a higher bracket for your regular wages |

### ❌ NOT Exempt from Tax (You Still Pay)

| Tax Type | Status | Notes |
|----------|--------|-------|
| Social Security Tax (6.2%) | **Still applies** | FICA taxes are separate from income tax |
| Medicare Tax (1.45%) | **Still applies** | FICA taxes are separate from income tax |
| Additional Medicare Tax (0.9%) | **Still applies** | If OT wages push you over $200k |
| State Income Tax | **Still applies** | Most states have not passed matching exemptions |
| Local Income Tax | **Still applies** | City/county taxes still apply |

The key takeaway: **FICA taxes (Social Security and Medicare) are NOT exempt.** This is a federal income tax exemption only. Your overtime pay still gets hit with the 7.65% employee FICA share, plus any applicable state and local income taxes.

This distinction matters a lot. If you're making $15,000 in overtime pay and you're in the 22% federal bracket, the income tax exemption saves you $3,300 — but you still pay about $1,148 in FICA taxes. Your net savings is closer to $2,152, which is still great, but not quite the full $15,000 some people might expect.

Use our [IRS withholding calculator](/irs-withholding-calculator) to make sure your employer is withholding the correct amounts from both your regular and overtime pay.

## How Much Do You Actually Save? — Real Examples

Let's run the numbers for a few different scenarios so you can see the real-world impact.

### Example 1: $50,000 Base Salary, 5 Hours OT/Week

**Worker Profile:**
- Base salary: $50,000/year
- Hourly rate: $50,000 ÷ 2,080 = $24.04/hour
- OT rate: $24.04 × 1.5 = $36.06/hour
- Overtime hours: 5 hours/week × 52 weeks = 260 hours/year
- Annual overtime pay: 260 × $36.06 = **$9,376**
- Federal marginal rate: 22%

**Before the law (overtime taxed normally):**
- Federal income tax on OT: $9,376 × 22% = **$2,063**
- FICA on OT: $9,376 × 7.65% = **$717**
- Total tax on OT: **$2,780**
- OT take-home: $9,376 − $2,780 = **$6,596**

**After the law (OT exempt from federal income tax):**
- Federal income tax on OT: **$0**
- FICA on OT: $9,376 × 7.65% = **$717**
- Total tax on OT: **$717**
- OT take-home: $9,376 − $717 = **$8,659**

**Annual savings: $2,063** — that's an extra $173/month in your pocket.

### Example 2: $35,000 Base Salary, 10 Hours OT/Week

**Worker Profile:**
- Base salary: $35,000/year
- Hourly rate: $35,000 ÷ 2,080 = $16.83/hour
- OT rate: $16.83 × 1.5 = $25.24/hour
- Overtime hours: 10 hours/week × 52 weeks = 520 hours/year
- Annual overtime pay: 520 × $25.24 = **$13,125**
- Federal marginal rate: 12%

**Before the law:**
- Federal income tax on OT: $13,125 × 12% = **$1,575**
- FICA on OT: $13,125 × 7.65% = **$1,004**
- Total tax on OT: **$2,579**
- OT take-home: $13,125 − $2,579 = **$10,546**

**After the law:**
- Federal income tax on OT: **$0**
- FICA on OT: $13,125 × 7.65% = **$1,004**
- Total tax on OT: **$1,004**
- OT take-home: $13,125 − $1,004 = **$12,121**

**Annual savings: $1,575** — that's an extra $131/month.

### Example 3: $75,000 Base Salary, 8 Hours OT/Week

**Worker Profile:**
- Base salary: $75,000/year
- Hourly rate: $75,000 ÷ 2,080 = $36.06/hour
- OT rate: $36.06 × 1.5 = $54.09/hour
- Overtime hours: 8 hours/week × 52 weeks = 416 hours/year
- Annual overtime pay: 416 × $54.09 = **$22,501**
- Federal marginal rate: 22%

**Before the law:**
- Federal income tax on OT: $22,501 × 22% = **$4,950**
- FICA on OT: $22,501 × 7.65% = **$1,721**
- Total tax on OT: **$6,671**
- OT take-home: $22,501 − $6,671 = **$15,830**

**After the law:**
- Federal income tax on OT: **$0**
- FICA on OT: $22,501 × 7.65% = **$1,721**
- Total tax on OT: **$1,721**
- OT take-home: $22,501 − $1,721 = **$20,780**

**Annual savings: $4,950** — that's an extra $413/month. For a household budget, that's a car payment or a serious chunk of rent.

**Want to see your own numbers?** Plug your salary and overtime hours into our [paycheck calculator](/paycheck-calculator) for a personalized breakdown.

## The Sunset Date: What Happens After 2028?

The No Tax on Overtime provision has a **sunset date of December 31, 2028**. This means:

- **Tax years 2025, 2026, 2027, and 2028:** Overtime pay is exempt from federal income tax
- **Tax year 2029 and beyond:** Overtime pay reverts to being taxed as ordinary income — unless Congress acts

Sunset provisions are common in tax legislation. They allow lawmakers to pass expensive tax cuts without permanently adding to the deficit (at least on paper). The expectation — or at least the hope — is that a future Congress will extend or make the exemption permanent. But there are no guarantees.

### What Should You Do About the Sunset?

Practically speaking, here's how to think about it:

1. **Maximize your overtime now.** If you're on the fence about picking up extra shifts, the tax savings through 2028 make it more worthwhile than it will be later.

2. **Don't make long-term financial commitments based on OT income.** If you're buying a house or a car, base your budget on your regular wages — not overtime that might be taxed differently in a few years.

3. **Save or invest the tax savings.** Instead of lifestyle inflation, consider putting that extra $150–$400/month into savings or investments. Your future self will thank you.

4. **Stay informed.** Tax law changes fast. Bookmark this page and check back — we'll update it as Congress debates extension or permanence.

## State-by-State Impact: Where You Live Matters

Here's the thing that catches a lot of people off guard: the No Tax on Overtime law is a **federal** provision. It exempts overtime pay from **federal** income tax. But most states have their own income taxes, and very few states have passed matching exemptions.

This means your actual savings depend heavily on where you live.

### States With No Income Tax (Maximum Benefit)

If you live in one of these states, you get the full benefit of the federal exemption with no state income tax eating into your overtime pay:

- **Alaska**
- **Florida**
- **Nevada**
- **New Hampshire** (no tax on wages)
- **South Dakota**
- **Tennessee** (no tax on wages)
- **Texas**
- **Washington**
- **Wyoming**

Workers in these states see the biggest boost to take-home pay from overtime because there's no state income tax on either regular wages or overtime.

### States With Income Tax (Reduced Benefit)

In states with income tax, your overtime pay is still exempt from federal tax — but you'll pay **state income tax on your overtime wages**. The impact varies:

| State | Top Income Tax Rate | OT Pay Still Taxed by State? |
|-------|---------------------|-------------------------------|
| California | 13.3% | Yes |
| New York | 10.9% | Yes |
| Oregon | 9.9% | Yes |
| Minnesota | 9.85% | Yes |
| New Jersey | 10.75% | Yes |
| Illinois | 4.95% | Yes |
| Pennsylvania | 3.07% | Yes |
| Indiana | 3.05% | Yes |
| Michigan | 4.25% | Yes |
| North Carolina | 4.5% | Yes |

A California worker in the 9.3% state bracket who earns $15,000 in overtime still pays about $1,395 in state income tax on that money — even though the federal tax is $0. The savings are real, but they're significantly less than what a Texas or Florida worker would see.

### States That May Pass Matching Exemptions

As of early 2026, several states are considering legislation that would exempt overtime pay from state income tax as well. This is a developing situation. Check with your state's department of revenue or a local tax professional for the most current information.

## Before vs. After: A Side-by-Side Comparison

Let's put it all together with a comprehensive comparison. We'll use our Example 3 worker from above — $75,000 base salary, 8 hours of overtime per week — and look at the full picture in a high-tax state (California) vs. a no-tax state (Texas).

### In Texas (No State Income Tax)

| Category | Before the Law | After the Law |
|----------|---------------|---------------|
| Regular Pay (after all taxes) | $54,643 | $54,643 |
| OT Gross Pay | $22,501 | $22,501 |
| Federal Income Tax on OT | −$4,950 | **$0** |
| FICA on OT | −$1,721 | −$1,721 |
| State Income Tax on OT | $0 | $0 |
| OT Net Take-Home | $15,830 | $20,780 |
| **Total Take-Home** | **$70,473** | **$75,423** |
| **Annual Savings** | — | **$4,950** |

### In California (High State Income Tax)

| Category | Before the Law | After the Law |
|----------|---------------|---------------|
| Regular Pay (after all taxes) | $49,821 | $49,821 |
| OT Gross Pay | $22,501 | $22,501 |
| Federal Income Tax on OT | −$4,950 | **$0** |
| FICA on OT | −$1,721 | −$1,721 |
| CA State Income Tax on OT | −$1,395 | −$1,395 |
| OT Net Take-Home | $14,435 | $19,385 |
| **Total Take-Home** | **$64,256** | **$69,206** |
| **Annual Savings** | — | **$4,950** |

The federal savings are identical — $4,950 in both states. But the California worker's total OT take-home is lower because state income tax still applies. The Texas worker walks away with significantly more money from the same overtime hours.

## How to Make Sure You're Getting the Exemption

The overtime tax exemption should be applied automatically by your employer's payroll system, but mistakes happen. Here's what you should do:

1. **Check your pay stub.** Starting with the effective date, overtime pay should show reduced federal withholding. Compare an OT pay stub from after the law took effect to one from before — the difference should be noticeable.

2. **Verify your W-2 at tax time.** Your employer should report overtime pay separately or code it differently so the IRS knows it qualifies for the exemption. If you're not sure, ask your payroll department.

3. **Use the right tax forms.** When filing your return, make sure you're claiming the overtime exemption correctly. Tax software should handle this, but double-check.

4. **Talk to HR if something looks wrong.** If your federal withholding on overtime hasn't changed, your payroll system might not be updated yet. Don't leave money on the table.

5. **Use our [overtime tax calculator](/overtime-tax-calculator)** to estimate what your take-home should be, then compare it to your actual pay stub.

## Common Misconceptions

Let's clear up a few things we keep hearing:

**"Overtime is now completely tax-free."** — No. FICA taxes (Social Security and Medicare) still apply. State income tax still applies in most states. Only federal income tax is exempt.

**"I can work unlimited overtime tax-free."** — Technically true for federal income tax, but be aware that higher total income can affect things like IRA deduction eligibility, premium tax credits, and student loan payments. Your OT income isn't invisible — it's just exempt from federal income tax.

**"Salaried employees don't get any benefit."** — Not necessarily. Salaried non-exempt employees who receive FLSA overtime pay do qualify. It's about your FLSA classification, not whether you're hourly or salaried.

**"This is permanent."** — It's not. The law sunsets on December 31, 2028. Mark your calendar.

**"My bonus is also tax-free now."** — No. The exemption applies only to FLSA overtime pay (1.5x rate for hours over 40). Bonuses, shift differentials, and other supplemental pay are still taxed as ordinary income.

## Impact on Tax Brackets and Withholding

One subtle but important benefit of the overtime tax exemption: **your overtime pay doesn't push your regular wages into a higher tax bracket.**

Here's what that means. Under normal rules, if you earn $50,000 in regular wages and $15,000 in overtime, your total taxable income is $65,000 — and your marginal tax rate might be 22%. Without the exemption, that overtime is taxed at your highest marginal rate.

With the exemption, your federal taxable income stays at $50,000 (plus any other non-OT income). Your overtime is pulled out of the equation entirely for federal income tax purposes. This means:

- Your regular wages are taxed at the same rate they would be without overtime
- Your overtime pay is simply not subject to federal income tax
- You don't have to worry about OT pushing you into a higher bracket

This is a meaningful benefit for workers who occasionally work a lot of overtime — like seasonal workers or people pulling extra shifts during busy periods.

**Make sure your withholding is correct.** If your employer is over-withholding because their payroll system hasn't been properly configured, you'll get the money back as a refund — but you'd rather have it in each paycheck. Our [IRS withholding calculator](/irs-withholding-calculator) can help you check.

## The Bigger Picture: How This Fits Into Your Overall Tax Strategy

The overtime tax exemption is one piece of a larger financial puzzle. Here are some things to think about:

### Retirement Contributions

Overtime pay that's exempt from federal income tax still counts as compensation for **401(k) contribution limits**. That means if you're working a lot of OT, you might be able to contribute more to your 401(k) than you otherwise could. And since the OT isn't federally taxed, you're not losing anything to income tax on those dollars — they go straight into your retirement account.

### Earned Income Tax Credit (EITC)

Overtime pay still counts as earned income for EITC purposes, which could be a double benefit for lower-income workers. You get the federal income tax exemption on OT **and** the extra earned income might boost your EITC.

### Student Loan Payments

If you're on an income-driven repayment plan for student loans, your overtime pay — even though it's exempt from federal income tax — will still count as income for calculating your monthly payment. More OT could mean a higher student loan bill.

### Health Insurance Subsidies

If you get health insurance through the ACA marketplace, your overtime income counts toward your modified adjusted gross income (MAGI), which determines your subsidy eligibility. Earning more overtime could reduce your premium tax credit.

The bottom line: the overtime tax exemption is a great deal, but it's not the only factor in your financial life. Consider working with a tax professional to optimize your overall situation.

## Frequently Asked Questions

### Does the No Tax on Overtime law apply to me if I'm self-employed?

**No.** The exemption only applies to FLSA overtime pay received by W-2 employees. Self-employed individuals and independent contractors don't receive overtime pay under FLSA, so this provision doesn't apply. However, if you're self-employed, our [self-employment tax calculator](/self-employment-tax-calculator) can help you understand your full tax obligations.

### Is overtime really exempt from ALL federal taxes?

**No.** Overtime pay is exempt from **federal income tax** only. FICA taxes (Social Security at 6.2% and Medicare at 1.45%) still apply to overtime wages. If your total wages exceed $200,000, the additional 0.9% Medicare tax also applies.

### What if my employer pays overtime at 2x instead of 1.5x?

The exemption covers **all FLSA-qualified overtime compensation**, including any premium rate your employer pays for hours over 40. If your employer pays 2x for overtime, that full 2x rate qualifies for the federal income tax exemption. But only the portion that qualifies as FLSA overtime is exempt — any extra pay that isn't technically overtime (like a discretionary bonus) doesn't qualify.

### Does this apply to state income tax too?

**In most states, no.** The federal exemption does not automatically apply to state income tax. As of early 2026, only a few states are considering matching legislation. If you live in a state with income tax, you'll still pay state tax on your overtime earnings. Workers in no-income-tax states (Texas, Florida, Nevada, etc.) get the maximum benefit.

### What happens when the law expires in 2028?

Unless Congress extends or makes the exemption permanent, overtime pay will once again be subject to federal income tax starting in tax year 2029. Your take-home pay from overtime will decrease, essentially returning to pre-2025 levels. We recommend not making long-term financial commitments based on the assumption that the exemption will continue.

### How do I know if I'm classified as exempt or non-exempt?

Your FLSA classification should be determined by your job duties and salary, not your job title. Generally, if you earn less than the salary threshold (around $43,888 in 2025) or you don't perform exempt-level duties (executive, administrative, or professional), you're non-exempt and entitled to overtime. Ask your HR department if you're unsure.

### Will this exemption affect my tax refund?

It could. If your employer correctly adjusts your withholding to account for the exemption, you should see more money in each paycheck rather than a bigger refund. If they don't adjust, you might be over-withheld and get a larger refund at tax time. Either way, you get the money — it's just a question of when. Use our [paycheck calculator](/paycheck-calculator) to check if your withholding looks right.

### Can I claim this exemption on my tax return if my employer didn't apply it?

Yes. If your employer's payroll system didn't properly apply the overtime tax exemption, you can claim it when you file your tax return. You'll need to document your overtime pay and show that it qualifies under the FLSA rules. Consider using tax software or consulting a tax professional for guidance.

### Does overtime pay count toward the Social Security wage base?

**Yes.** Even though overtime pay is exempt from federal income tax, it still counts as wages for Social Security and Medicare purposes. Your overtime earnings will be factored into the Social Security wage base ($184,500 in 2026) and will count toward your future Social Security benefits.

## Final Thoughts

The No Tax on Overtime provision is one of the most significant tax changes for working-class and middle-class Americans in recent years. If you regularly work overtime, this law puts real money back in your pocket — anywhere from a few hundred to several thousand dollars per year, depending on how much OT you work and where you live.

But remember: this is a temporary measure. It sunsets at the end of 2028. Make the most of it while it lasts, but don't build your financial life around the assumption that overtime will always be tax-free. And don't forget that FICA and state taxes still apply.

**Ready to see your savings?** Use our free [overtime tax calculator](/overtime-tax-calculator) to get personalized numbers based on your actual pay and hours. You can also check your overall take-home with our [paycheck calculator](/paycheck-calculator) or fine-tune your withholding with the [IRS withholding calculator](/irs-withholding-calculator).

Work hard. Get paid. Keep more of it. That's the idea — at least through 2028.`,
  "retirement-tax-planning-guide-2026": `# Retirement Tax Planning Guide 2026: Strategies, Brackets & Withdrawals

Retirement tax planning is the single most important financial strategy for Americans approaching retirement age. The decisions you make about when to withdraw from retirement accounts, how to handle Social Security, and which tax brackets you fall into can mean the difference between keeping thousands or losing them to taxes. This comprehensive 2026 guide covers every aspect of retirement taxation, from 401(k) withdrawal rules to Roth conversion strategies, with actionable advice you can use today.

## How Retirement Income Is Taxed in 2026

Your retirement income may come from multiple sources, and each is taxed differently. Understanding these differences is the foundation of effective retirement tax planning.

### 401(k) and Traditional IRA Withdrawals

Withdrawals from traditional 401(k) and traditional IRA accounts are taxed as **ordinary income** at your marginal tax rate. If you withdraw $50,000 from your 401(k) in 2026 and are in the 22% bracket, you'll pay approximately $11,000 in federal income tax on that withdrawal.

The key rule: you deferred taxes when you contributed, so you pay taxes when you withdraw. This is called tax-deferred growth.

### Roth IRA and Roth 401(k) Withdrawals

Qualified withdrawals from Roth accounts are **completely tax-free**. You already paid taxes on the contributions, so both the principal and growth come out tax-free in retirement. To qualify:
- You must be at least 59.5 years old
- The Roth account must be at least 5 years old

### Social Security Benefits

Social Security may be taxable depending on your "combined income" (adjusted gross income + nontaxable interest + half of Social Security benefits):

- **Combined income under $25,000** (single) or $32,000** (married): No tax on Social Security
- **$25,000-$34,000** (single): Up to 50% of benefits may be taxable
- **Over $34,000** (single): Up to 85% of benefits may be taxable
- **$32,000-$44,000** (married): Up to 50% may be taxable
- **Over $44,000** (married): Up to 85% may be taxable

### Pension Income

Pension income is generally taxed as ordinary income at the federal level. Some states exempt pension income from state tax (Florida, Texas, Pennsylvania, Illinois, and others).

### Investment Income

Capital gains, dividends, and interest from non-retirement accounts are taxed according to their specific rules. Long-term capital gains rates (0%, 15%, 20%) are generally lower than ordinary income rates.

## 2026 Federal Tax Brackets for Retirees

| Tax Rate | Single | Married Filing Jointly |
|----------|--------|----------------------|
| 10% | $0 - $11,925 | $0 - $23,850 |
| 12% | $11,926 - $48,475 | $23,851 - $96,950 |
| 22% | $48,476 - $103,350 | $96,951 - $206,700 |
| 24% | $103,351 - $197,300 | $206,701 - $394,600 |
| 32% | $197,301 - $250,525 | $394,601 - $501,050 |

### Standard Deduction for 2026

- **Single**: $16,100
- **Married Filing Jointly**: $32,200
- **Additional deduction (65+)**: $1,600 (single) or $1,300 (married)

This means a married couple both 65+ can deduct $34,800 from their taxable income before any tax is owed.

## Tax Strategies for Retirees

### Strategy 1: Roth Conversions Before RMD Age

If you're between 59.5 and 73, you have a window to convert traditional IRA funds to Roth IRAs before Required Minimum Distributions (RMDs) kick in. This strategy, called "Roth conversion laddering," involves converting just enough each year to fill up lower tax brackets.

**Example**: You're retired at 65 with $500,000 in a traditional IRA. You have minimal other income. In 2026, you convert $48,475 to a Roth IRA, paying only 10% + 12% on that amount. Over 10 years, you convert the entire balance at low rates, avoiding higher RMD taxes later.

### Strategy 2: Tax-Loss Harvesting

If you have investments in taxable accounts that have lost value, selling them realizes the loss, which can offset up to $3,000 of ordinary income per year. Any excess losses carry forward to future years.

### Strategy 3: Manage Withdrawal Order

The optimal withdrawal order for tax efficiency:
1. **Required Minimum Distributions** (RMDs) — mandatory after age 73
2. **Taxable investment accounts** — use long-term capital gains rates (0-20%)
3. **Tax-deferred accounts** (401k, traditional IRA) — withdraw strategically
4. **Roth accounts** — leave these to grow tax-free as long as possible

### Strategy 4: Charitable Giving from IRA (QCD)

If you're 70.5 or older, you can make Qualified Charitable Distributions (QCDs) directly from your IRA to a qualified charity. Up to $108,000 per year can be transferred, and it counts toward your RMD without being included in your taxable income.

### Strategy 5: Health Savings Account (HSA) Triple Tax Advantage

If you have an HSA from your working years, it offers triple tax advantages in retirement:
- Tax-deductible contributions
- Tax-free growth
- Tax-free withdrawals for qualified medical expenses

After age 65, HSA withdrawals for non-medical expenses are penalty-free (though taxed as ordinary income), making the HSA function like a traditional IRA.

## Required Minimum Distributions (RMDs) in 2026

### RMD Age

As of 2026, RMDs are required starting at age **73** (increased from 70.5 under the SECURE Act, and from 72 under SECURE 2.0). If you turn 73 in 2026, your first RMD is due by April 1, 2027.

### RMD Calculation

RMDs are calculated by dividing your account balance (as of December 31 of the previous year) by a life expectancy factor from the IRS Uniform Lifetime Table. For a 73-year-old, the factor is 26.5, meaning you'd withdraw approximately 3.77% of your account balance.

### RMD Penalties

The penalty for missing an RMD was reduced from 50% to 25% under SECURE 2.0. If you correct the shortfall within two years, the penalty drops to 10%.

## State Tax Considerations for Retirees

### States with No Income Tax (Best for Retirees)

- Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming

### States That Exempt Pension Income

- Alabama, Hawaii, Illinois, Mississippi, Pennsylvania

### States That Tax Social Security

- Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, North Dakota, Rhode Island, Utah, Vermont, West Virginia

## Frequently Asked Questions

### At what age can I withdraw from my 401(k) without penalty?

You can withdraw from your 401(k) without the 10% early withdrawal penalty at age 59.5. However, you'll still pay ordinary income tax on the withdrawal.

### When do Required Minimum Distributions start?

RMDs begin at age 73 (as of 2026). Your first RMD must be taken by April 1 of the year after you turn 73.

### How much of my Social Security is taxable?

Depending on your combined income, between 0% and 85% of your Social Security benefits may be taxable. If your combined income is below $25,000 (single) or $32,000 (married), your benefits are not taxed.

### Should I do a Roth conversion?

Roth conversions make sense if you expect to be in a higher tax bracket in retirement, or if you want to avoid RMDs. They're especially powerful during low-income years between retirement and age 73.

### What is the best state for retirement taxes?

Florida, Texas, Tennessee, Nevada, and Wyoming are among the best states for retirees because they have no state income tax. Pennsylvania and Illinois also exempt pension income.

## Retirement Tax Planning Checklist for 2026

1. Review your 401(k) and IRA balances
2. Calculate your expected retirement income
3. Determine your tax bracket in retirement
4. Consider Roth conversions if in a low bracket
5. Plan your withdrawal order (RMDs first, then taxable, then tax-deferred, then Roth)
6. Review your state's tax treatment of retirement income
7. Consider QCDs if you're charitably inclined and 70.5+
8. Maximize HSA contributions if still eligible
9. Review beneficiary designations on all accounts
10. Consult a CPA or financial advisor for personalized advice

Use our 401(k) Retirement Calculator to project your retirement balance, and our Paycheck Calculator to estimate your after-tax retirement income.`,
  "401k-withdrawal-tax-guide-2026": `# 401(k) Withdrawal Tax Guide 2026: Rules, Penalties & Strategies

Understanding 401(k) withdrawal taxes is critical for anyone approaching retirement or considering an early withdrawal. The rules are complex, the penalties can be severe, and the tax implications affect your retirement income for decades. This 2026 guide explains every aspect of 401(k) withdrawal taxation, from early withdrawal penalties to Required Minimum Distributions, with real examples and strategies to minimize your tax burden.

## How 401(k) Withdrawals Are Taxed

### Traditional 401(k) Withdrawals

Every dollar withdrawn from a traditional 401(k) is taxed as **ordinary income** at your marginal tax rate. You didn't pay taxes when you contributed (pre-tax), so you pay taxes when you withdraw. This is called tax-deferred growth.

**Example**: You withdraw $40,000 from your traditional 401(k) in 2026. After the $16,100 standard deduction (single), your taxable income from this withdrawal is $23,900. At the 12% bracket, you'd owe approximately $2,868 in federal tax. Your net withdrawal is $37,132.

### Roth 401(k) Withdrawals

Qualified withdrawals from a Roth 401(k) are **completely tax-free**. Both contributions and earnings come out tax-free if:
- You're at least 59.5 years old
- The account has been open for at least 5 years

### 401(k) Withdrawal Tax Rate

Your 401(k) withdrawal tax rate depends on your total income for the year. The withdrawal is added to all other income (Social Security, pensions, investment income) and taxed at your marginal rate. The 2026 federal tax brackets range from 10% to 37%.

## 401(k) Early Withdrawal Penalty (Before Age 59.5)

### The 10% Penalty

If you withdraw from your 401(k) before age 59.5, you'll pay:
1. **Ordinary income tax** on the withdrawal
2. **10% additional penalty** on the full withdrawal amount

**Example**: You withdraw $20,000 at age 45. You'll pay ordinary income tax on $20,000 PLUS a $2,000 penalty. If you're in the 22% bracket, your total tax is $4,400 + $2,000 = $6,400. You keep only $13,600.

### Exceptions to the 10% Penalty

The IRS allows several exceptions where you can avoid the 10% penalty (but still pay income tax):

1. **Age 55 rule** (Rule of 55): If you leave your job at age 55 or later, you can withdraw from that employer's 401(k) without the 10% penalty
2. **Medical expenses**: Withdrawals for medical expenses exceeding 7.5% of AGI
3. **Disability**: Total and permanent disability
4. **Death**: Beneficiary withdrawals
5. **Substantially Equal Periodic Payments (72(t))**: Series of equal payments based on life expectancy
6. **First-time home purchase**: Up to $10,000 from an IRA (not 401(k))
7. **Higher education expenses**: IRA only
8. **Birth or adoption**: Up to $5,000 per child (SECURE Act)
9. **Domestic abuse**: Up to $10,000 (SECURE 2.0)
10. **Qualified disaster recovery**: For federally declared disasters

### The 72(t) Rule: Substantially Equal Periodic Payments

If you need to access 401(k) funds before 59.5 without the penalty, you can use IRS Rule 72(t), which allows you to take "substantially equal periodic payments" (SEPP) based on your life expectancy. You must continue these payments for at least 5 years or until age 59.5, whichever is longer.

**Important**: If you modify the payments before the requirement is met, the 10% penalty applies retroactively to all previous withdrawals.

## Required Minimum Distributions (RMDs) Starting at Age 73

### When RMDs Begin

Starting in 2026, RMDs begin at **age 73**. If you turn 73 in 2026, your first RMD is due by April 1, 2027. Subsequent RMDs are due by December 31 each year.

### RMD Calculation

Your RMD is calculated by dividing your December 31 account balance by a life expectancy factor from the IRS Uniform Lifetime Table:

| Age | Life Expectancy Factor | Approximate % |
|-----|----------------------|---------------|
| 73 | 26.5 | 3.77% |
| 75 | 24.6 | 4.07% |
| 80 | 20.2 | 4.95% |
| 85 | 16.0 | 6.25% |
| 90 | 12.2 | 8.20% |

**Example**: At age 73 with a $500,000 401(k) balance, your RMD is $500,000 ÷ 26.5 = $18,868. This amount is taxed as ordinary income.

### RMD Penalties

- **Standard penalty**: 25% of the shortfall (reduced from 50% under SECURE 2.0)
- **Corrected within 2 years**: 10% penalty
- **File Form 5329** to report and request penalty waiver

## 401(k) Withdrawal Strategies to Minimize Taxes

### Strategy 1: The Rule of 55

If you retire at 55, you can withdraw from your current employer's 401(k) without the 10% penalty. This is more flexible than 72(t) and doesn't require equal payments.

### Strategy 2: Spread Withdrawals Across Years

Instead of withdrawing a large lump sum, spread withdrawals across multiple years to stay in lower tax brackets. For example, withdraw $30,000/year for 10 years instead of $300,000 in one year.

### Strategy 3: Roth Conversions in Low-Income Years

If you retire before 73 and have low income, convert traditional 401(k) funds to a Roth IRA. You pay taxes at your current (low) rate, and future withdrawals from the Roth are tax-free.

### Strategy 4: 401(k) Loan Instead of Withdrawal

You can borrow up to $50,000 (or 50% of your vested balance) from your 401(k). The loan is tax-free and penalty-free, but must be repaid with interest. If you leave your job, the loan must be repaid by the tax filing deadline.

### Strategy 5: Qualified Charitable Distributions (QCDs)

At age 70.5+, you can direct up to $108,000/year from your IRA to charity. This counts toward your RMD and isn't included in taxable income.

## 401(k) Rollover to IRA

Rolling over your 401(k) to an IRA when you change jobs or retire offers several advantages:
- More investment options
- Lower fees (in many cases)
- Easier Roth conversions
- More flexible withdrawal rules

**Important**: Do a **direct rollover** (trustee-to-trustee transfer). If you receive the check yourself, 20% is withheld for taxes, and you must deposit the full amount within 60 days to avoid taxes and penalties.

## 401(k) and Social Security Interaction

401(k) withdrawals increase your taxable income, which can make more of your Social Security benefits taxable. If your combined income (including 401(k) withdrawals) exceeds $34,000 (single) or $44,000 (married), up to 85% of your Social Security benefits become taxable.

**Strategy**: In years when you need both 401(k) withdrawals and Social Security, consider Roth withdrawals (tax-free) to avoid pushing your Social Security into taxable territory.

## Frequently Asked Questions

### How much tax will I pay on my 401(k) withdrawal?

You'll pay ordinary income tax at your marginal rate (10%-37% in 2026). If you're under 59.5, add a 10% penalty. Use our Paycheck Calculator to estimate your tax.

### Can I withdraw from my 401(k) at 55 without penalty?

Yes, if you leave your job at age 55 or later, you can withdraw from that employer's 401(k) without the 10% penalty (Rule of 55). This only applies to the 401(k) of the employer you just left.

### What is the 401(k) withdrawal tax rate?

There's no special 401(k) tax rate. Withdrawals are taxed at your ordinary income tax rate, which in 2026 ranges from 10% to 37% depending on your total income.

### When can I start taking 401(k) withdrawals without penalty?

At age 59.5, you can withdraw from your 401(k) without the 10% early withdrawal penalty. You'll still pay ordinary income tax on the withdrawal.

### What happens if I don't take my RMD?

The penalty is 25% of the amount you should have withdrawn but didn't. If you correct the error within 2 years, the penalty drops to 10%.

## 401(k) Withdrawal Tax Calculator

Use our free 401(k) Retirement Calculator to project your retirement balance, and our Paycheck Calculator to estimate taxes on your withdrawals. For a complete retirement tax strategy, consult a CPA who specializes in retirement planning.`,
  "inheritance-tax-guide-2026": `# Inheritance Tax Guide 2026: State-by-State Rules, Exemptions & Calculator

Inheritance tax is one of the most misunderstood taxes in the United States. Many people confuse it with estate tax, assume they'll owe taxes on inherited money, or don't realize their state may have specific inheritance tax rules. This 2026 guide explains everything you need to know about inheritance tax, including the difference between estate and inheritance tax, state-by-state rules, federal exemptions, and how to calculate your potential tax liability.

## Inheritance Tax vs Estate Tax: What's the Difference?

### Estate Tax

Estate tax is paid by the **estate** of the deceased person before assets are distributed to heirs. The federal estate tax applies to estates valued above the exemption amount. The executor of the estate files the tax return and pays the tax from estate assets.

### Inheritance Tax

Inheritance tax is paid by the **recipient** (the heir) on the assets they receive. Not all states have an inheritance tax, and the tax rate often depends on your relationship to the deceased person.

### Key Differences

| Feature | Estate Tax | Inheritance Tax |
|---------|-----------|-----------------|
| Who pays | The estate | The heir/recipient |
| When paid | Before distribution | After receiving inheritance |
| Federal tax | Yes (above exemption) | No federal inheritance tax |
| State tax | 12 states have estate tax | 6 states have inheritance tax |

## Federal Estate Tax in 2026

### Federal Estate Tax Exemption

For 2026, the federal estate tax exemption is **$13,990,000 per individual** (or $27,980,000 for married couples). This means:

- Estates valued **under $13.99 million**: No federal estate tax
- Estates valued **over $13.99 million**: 40% tax on the amount above the exemption

**Example**: An estate worth $15 million would pay 40% on $1,010,000 (the amount above $13.99M), resulting in $404,000 in federal estate tax.

### Important: Exemption Sunset in 2026

The Tax Cuts and Jobs Act of 2017 doubled the estate tax exemption, but this doubled amount is scheduled to **sunset on December 31, 2025**. For 2026, the exemption may revert to approximately $7-8 million per individual (adjusted for inflation). However, legislation could extend the higher exemption.

**Always check current law**, as this is a politically contested issue that could change.

## State Estate Tax (12 States)

These states have their own estate tax, separate from the federal estate tax:

| State | Exemption | Top Rate |
|-------|-----------|----------|
| Oregon | $1,000,000 | 16% |
| Massachusetts | $2,000,000 | 16% |
| New York | $6,940,000 | 16% |
| Washington | $2,193,000 | 20% |
| Illinois | $4,000,000 | 16% |
| Connecticut | $9,100,000 | 12% |
| Hawaii | $5,490,000 | 20% |
| Vermont | $5,000,000 | 16% |
| District of Columbia | $4,766,800 | 16% |
| Maine | $6,410,000 | 12% |
| Delaware | $5,930,000 | 16% |
| Rhode Island | $1,733,264 | 16% |

## State Inheritance Tax (6 States)

Only six states have an inheritance tax, paid by the heir:

### Iowa (Phasing Out)

Iowa is phasing out its inheritance tax. The tax was eliminated for deaths occurring on or after January 1, 2025.

### Kentucky

Kentucky has an inheritance tax with exemptions based on relationship:
- **Class A** (spouse, parents, children): Fully exempt
- **Class B** (siblings, nieces/nephews): $1,000 exemption, 4-16% rate
- **Class C** (all others): $500 exemption, 6-16% rate

### Maryland

Maryland has BOTH an estate tax AND an inheritance tax:
- Estate tax exemption: $5,000,000
- Inheritance tax: Spouses, children, parents exempt; others pay 10%

### Nebraska

Nebraska has the highest inheritance tax rates in the country:
- **Immediate relatives** (spouse, parents, children): 1%
- **Other relatives** (siblings, nieces/nephews): 6-11%
- **Non-relatives**: 18%

### New Jersey

New Jersey eliminated its estate tax in 2018 but still has an inheritance tax:
- **Class A** (spouse, children, parents): Fully exempt
- **Class C** (siblings, sons/daughters-in-law): $25,000 exemption, 11-16%
- **Class D** (all others): $500 exemption, 15-16%
- **Class E** (charities): Fully exempt

### Pennsylvania

Pennsylvania's inheritance tax rates:
- **Spouse**: 0% (fully exempt)
- **Children/parents**: 4.5%
- **Siblings**: 12%
- **All others**: 15%

## States with No Estate Tax and No Inheritance Tax

The majority of states have neither an estate tax nor an inheritance tax:

- Alabama, Alaska, Arizona, Arkansas, California, Colorado, Florida, Georgia, Idaho, Indiana, Kansas, Louisiana, Michigan, Minnesota, Mississippi, Missouri, Montana, Nevada, New Hampshire, New Mexico, North Carolina, North Dakota, Ohio, Oklahoma, South Carolina, South Dakota, Tennessee, Texas, Utah, Virginia, West Virginia, Wisconsin, Wyoming

**Best states for inheritance**: Florida, Texas, Nevada, and Wyoming have no income tax, no estate tax, and no inheritance tax.

## How to Calculate Inheritance Tax

### Step 1: Determine if Federal Estate Tax Applies

Check if the total estate value exceeds the federal exemption ($13.99M in 2026, potentially lower if TCJA sunsets).

### Step 2: Check State Estate Tax

If the deceased lived in one of the 12 estate tax states, check the state exemption and rate.

### Step 3: Check State Inheritance Tax

If you (the heir) live in a state with inheritance tax, or if the deceased lived in one, determine your tax class and applicable rate.

### Step 4: Calculate Your Tax

Multiply the taxable inheritance (after exemptions) by the applicable tax rate.

**Example**: You inherit $100,000 from your uncle in Pennsylvania. As a non-immediate relative, your rate is 15%. Your inheritance tax is $100,000 × 15% = $15,000. You receive $85,000.

## Inheritance Tax Exemptions and Deductions

### Relationship-Based Exemptions

Most states with inheritance tax exempt or reduce the tax for close family members:
- **Spouses**: Always exempt in every state
- **Children**: Usually exempt or lowest rate
- **Parents**: Usually exempt or lowest rate
- **Siblings**: Moderate rate (4.5-12%)
- **Non-relatives**: Highest rate (10-18%)

### Charitable Deductions

Bequests to qualified charities are generally exempt from both estate and inheritance tax in all states.

### Life Insurance

Life insurance proceeds are generally **not subject to income tax** for the beneficiary. However, they ARE included in the estate for federal estate tax purposes if the deceased owned the policy.

## How to Minimize Inheritance Tax

### 1. Annual Gift Exclusion

In 2026, you can gift up to **$18,000 per person per year** without gift tax consequences. A married couple can give $36,000 per recipient. This reduces your estate over time.

### 2. Lifetime Gift Exemption

The lifetime gift exemption is the same as the estate tax exemption ($13.99M in 2026). Gifts above the annual exclusion reduce your lifetime exemption.

### 3. Irrevocable Trusts

Assets placed in an irrevocable trust are removed from your estate and may avoid estate tax. Common types include:
- Irrevocable Life Insurance Trust (ILIT)
- Generation-Skipping Trust
- Qualified Personal Residence Trust (QPRT)

### 4. Move to a Tax-Friendly State

If you're planning your estate, consider establishing residency in a state with no estate or inheritance tax (Florida, Texas, Nevada, etc.).

### 5. Charitable Bequests

Leaving assets to charity reduces your taxable estate while supporting causes you care about.

## Frequently Asked Questions

### Is there a federal inheritance tax?

No. The federal government does not have an inheritance tax. There is a federal estate tax, but it only applies to estates above $13.99 million (in 2026).

### Do I have to pay taxes on money I inherit?

It depends on your state. If you live in Iowa, Kentucky, Maryland, Nebraska, New Jersey, or Pennsylvania, you may owe state inheritance tax. Federal income tax does not apply to inherited money.

### How much can I inherit tax-free?

Federally, you can inherit any amount from an estate under $13.99 million without estate tax. For inheritance tax, it depends on your state and relationship to the deceased. Spouses and children are typically exempt in all states.

### What states have no inheritance tax?

44 states have no inheritance tax. Only Iowa (phasing out), Kentucky, Maryland, Nebraska, New Jersey, and Pennsylvania have inheritance tax.

### Are life insurance proceeds taxable?

Life insurance proceeds are not subject to income tax for the beneficiary. However, they may be subject to estate tax if the deceased owned the policy and the total estate exceeds the exemption.

### What is the federal estate tax exemption for 2026?

The federal estate tax exemption for 2026 is $13,990,000 per individual ($27,980,000 for married couples). However, this may change if the TCJA exemption increase sunsets.

## Inheritance Tax Calculator

Use our free calculators to estimate your tax liability:
- **Paycheck Calculator**: For tax bracket calculations
- **Property Tax Calculator**: For inherited real estate
- **Capital Gains Calculator**: For inherited investments

For complex estate planning, consult an estate planning attorney or CPA who specializes in inheritance tax.`,
  "401k-withdrawal-tax-questions-2026": `# 401(k) Withdrawal Tax Questions Answered (2026 Rules)

Confused about how taxes work when you withdraw from your 401(k)? You're not alone. 401(k) withdrawal tax rules are among the most searched tax questions in America, and the rules changed significantly with the SECURE Act and SECURE 2.0. This FAQ guide answers the most common questions people ask about 401(k) withdrawal taxes, penalties, and strategies for 2026.

## How Do Taxes on 401(k) Work?

When you contribute to a traditional 401(k), the money goes in pre-tax (before income tax is taken out). The money grows tax-deferred over the years. When you withdraw the money in retirement, you pay ordinary income tax on both the contributions and the earnings.

Think of it as a "pay me later" arrangement with the IRS. You save on taxes now, but you owe taxes when you take the money out.

For Roth 401(k) contributions, the opposite is true: you pay tax upfront, but qualified withdrawals in retirement are completely tax-free.

## What Are Taxes for 401(k) Withdrawal?

Taxes for 401(k) withdrawal are calculated at your **ordinary income tax rate** in the year you take the withdrawal. The 2026 federal tax brackets range from 10% to 37%.

Your withdrawal is added to all other income you receive that year (Social Security, pensions, wages, investment income) to determine your total taxable income and your marginal tax rate.

**Example**: If you withdraw $40,000 from your 401(k) and have no other income, after the $16,100 standard deduction (single filer), your taxable income is $23,900. You'd fall in the 12% bracket and pay approximately $2,868 in federal tax.

## Are Taxes Withheld from 401(k) Distributions?

By default, the IRS requires 401(k) plan administrators to withhold **20%** for federal taxes on eligible rollover distributions. However, you can adjust this withholding rate.

For non-rollover distributions (regular withdrawals in retirement), you can elect to have 7%, 10%, 15%, 20%, or any percentage withheld for federal taxes, or choose no withholding at all.

**Important**: Even if you choose no withholding, you still owe the tax. You'll need to pay it via quarterly estimated tax payments or face an underpayment penalty at tax time.

## Does Take Home Pay Include 401(k)?

No, traditional 401(k) contributions are deducted from your gross pay **before** calculating take-home pay. Your 401(k) contribution reduces your taxable income, which also reduces your current-year tax bill.

However, **Roth 401(k) contributions** are made with after-tax dollars. They still come out of your paycheck, but they don't reduce your taxable income. Your take-home pay is reduced by the Roth contribution amount, but the money will be tax-free in retirement.

## Do After-Tax Contributions Count Towards 401(k) Limit?

Yes. The 2026 401(k) contribution limit is $24,500 ($30,500 if 50+). This total limit includes all types of contributions:
- Pre-tax (traditional) contributions
- Roth (after-tax) contributions
- After-tax non-Roth contributions (if your plan allows)

The employer match is **separate** and doesn't count toward your $24,500 limit. The total combined limit (employee + employer) is $69,000 for 2026 ($76,500 if 50+).

## When Can I Withdraw from 401(k) Without Penalty?

You can withdraw from your 401(k) without the 10% early withdrawal penalty at **age 59.5**. However, you'll still pay ordinary income tax on the withdrawal.

### Exceptions to the Age 59.5 Rule

1. **Rule of 55**: If you leave your job at age 55 or later, you can withdraw from that employer's 401(k) without penalty
2. **Disability**: Total and permanent disability
3. **Death**: Beneficiary withdrawals
4. **Medical expenses**: Exceeding 7.5% of AGI
5. **72(t) payments**: Substantially equal periodic payments
6. **Birth/adoption**: Up to $5,000 per child (SECURE Act)
7. **Domestic abuse**: Up to $10,000 (SECURE 2.0)
8. **Qualified disaster recovery**

## How Much Tax Will I Pay on My 401(k) Withdrawal?

The tax depends on your total income and filing status. Use this simple framework:

| Withdrawal Amount | Estimated Tax (Single, No Other Income) |
|-------------------|----------------------------------------|
| $10,000 | $0 (under standard deduction) |
| $20,000 | ~$468 (12% bracket) |
| $40,000 | ~$2,868 (12% bracket) |
| $60,000 | ~$7,254 (22% bracket) |
| $100,000 | ~$17,982 (24% bracket) |

Use our [401(k) Retirement Calculator](/401k-retirement-calculator) for a personalized estimate.

## How Does 401(k) Withdrawal Affect Social Security Tax?

401(k) withdrawals increase your taxable income, which can make more of your Social Security benefits taxable. If your combined income (including 401(k) withdrawals) exceeds $34,000 (single) or $44,000 (married), up to 85% of your Social Security benefits become taxable.

**Strategy**: In years when you need both 401(k) withdrawals and Social Security, consider taking Roth withdrawals (tax-free) to avoid pushing your Social Security into taxable territory.

## What Is the 2026 401(k) Withdrawal Tax Rate?

There's no special 401(k) withdrawal tax rate. Withdrawals are taxed at your **ordinary income tax rate**, which in 2026 ranges from 10% to 37% depending on your total income:

- 10% bracket: $0 - $11,925 (single)
- 12% bracket: $11,926 - $48,475 (single)
- 22% bracket: $48,476 - $103,350 (single)
- 24% bracket: $103,351 - $197,300 (single)
- 32% bracket: $197,301 - $250,525 (single)

## Can I Withdraw from 401(k) at 55 Without Penalty?

Yes, under the **Rule of 55**. If you leave your job (quit, retire, or are laid off) during or after the year you turn 55, you can withdraw from that specific employer's 401(k) without the 10% penalty.

**Important limitations**:
- Only applies to the 401(k) of the employer you just left
- Does NOT apply to IRAs
- Does NOT apply to 401(k)s from previous employers
- You must leave the money in the plan (cannot roll it to an IRA first)

## What Happens If I Don't Take My RMD?

Required Minimum Distributions (RMDs) start at age 73. If you don't take your full RMD, the penalty is **25% of the shortfall** (reduced from 50% under SECURE 2.0). If you correct the error within 2 years, the penalty drops to **10%**.

File IRS Form 5329 to report the missed RMD and request a penalty waiver for reasonable cause.

## Related Resources

- [401(k) Retirement Calculator](/401k-retirement-calculator)
- [401(k) Withdrawal Tax Guide 2026](/blog/401k-withdrawal-tax-guide-2026)
- [Retirement Tax Planning Guide 2026](/blog/retirement-tax-planning-guide-2026)
- [IRS Withholding Calculator](/irs-withholding-calculator)`,
  "social-security-tax-questions-2026": `# Social Security Tax Questions Answered (2026 Rules)

Social Security taxation is one of the most confusing topics for retirees and soon-to-be retirees. With rules that depend on your income, filing status, and state of residence, it's no surprise that millions of Americans search for answers every month. This FAQ guide answers the most common Social Security tax questions for 2026.

## Are Taxes Taken Out of Social Security Checks?

Not automatically. By default, the Social Security Administration does **not** withhold federal taxes from your monthly benefit checks. However, you can voluntarily request withholding by filing IRS Form W-4V.

You can choose to have 7%, 10%, 12%, or 22% of your monthly benefit withheld for federal taxes. Most financial advisors recommend electing withholding to avoid a surprise tax bill in April.

## Are Taxes Paid on Social Security Benefits?

It depends on your "combined income," which is:
- Your adjusted gross income (AGI)
- Plus nontaxable interest
- Plus half of your Social Security benefits

### The Thresholds (2026)

| Filing Status | Combined Income | Taxable Benefits |
|--------------|----------------|-----------------|
| Single | Under $25,000 | 0% (no tax) |
| Single | $25,000 - $34,000 | Up to 50% |
| Single | Over $34,000 | Up to 85% |
| Married | Under $32,000 | 0% (no tax) |
| Married | $32,000 - $44,000 | Up to 50% |
| Married | Over $44,000 | Up to 85% |

**Note**: "Up to 85%" doesn't mean 85% tax rate. It means 85% of your benefits are subject to income tax at your marginal rate.

## Are Taxes on Social Security Ending?

There have been proposals in Congress to eliminate federal taxation of Social Security benefits, but **as of 2026, Social Security benefits are still taxable** at the federal level for recipients with income above the thresholds.

Some states have already eliminated state tax on Social Security. As of 2026, **38 states do not tax Social Security benefits**. The 12 states that still tax Social Security are:
- Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, North Dakota, Rhode Island, Utah, Vermont, West Virginia

## Are Taxes Withheld from Social Security Disability?

Social Security Disability Insurance (SSDI) benefits are subject to the same taxation rules as retirement benefits. The SSA does not automatically withhold taxes from SSDI checks, but you can request voluntary withholding via Form W-4V.

If you receive Supplemental Security Income (SSI), those benefits are **not taxable** and no withholding is needed.

## Are Taxes Deducted from Social Security Checks Automatically?

No. The Social Security Administration does not automatically deduct federal taxes from your checks. You must specifically request voluntary withholding by submitting Form W-4V to the SSA.

State taxes are also not automatically withheld. Each state has its own rules about Social Security taxation.

## Are Taxes Being Taken Out of Social Security Still?

Yes, the federal taxation of Social Security benefits is still in effect for 2026. The rules have been in place since 1983 (for 50% taxation) and 1993 (for 85% taxation).

There is no current legislation that has eliminated this tax, despite ongoing political discussions.

## Are Taxes Required on Social Security?

Federal taxes on Social Security are required if your combined income exceeds the thresholds ($25,000 single / $32,000 married). If your income is below these thresholds, no federal tax is owed on your benefits.

State taxes on Social Security depend on where you live. 38 states exempt Social Security from state income tax entirely.

## How Much of My Social Security Is Taxable?

Use this quick calculation:

1. Calculate your combined income (AGI + nontaxable interest + half of SS benefits)
2. If single and combined income > $34,000: up to 85% is taxable
3. If married and combined income > $44,000: up to 85% is taxable
4. If single and $25,000 < combined income < $34,000: up to 50% is taxable
5. If married and $32,000 < combined income < $44,000: up to 50% is taxable

Use our [Paycheck Calculator](/paycheck-calculator) to estimate your total tax including Social Security.

## How Can I Avoid Paying Taxes on Social Security?

You can't eliminate Social Security taxes entirely if your income is above the thresholds, but you can minimize them:

1. **Withdraw from Roth accounts** (tax-free, doesn't increase combined income)
2. **Manage 401(k)/IRA withdrawals** to stay below thresholds
3. **Move to a state** that doesn't tax Social Security
4. **Use Qualified Charitable Distributions** (QCDs) from your IRA
5. **Invest in municipal bonds** (tax-free interest doesn't count toward combined income)

## At What Age Is Social Security Not Taxable?

There is **no age** at which Social Security automatically becomes tax-free. The taxation depends on your income, not your age. Even at age 80+, if your combined income exceeds $34,000 (single), up to 85% of your benefits remain taxable.

However, many retirees see their Social Security become non-taxable naturally when they stop taking 401(k)/IRA withdrawals and have minimal other income.

## Related Resources

- [Paycheck Calculator](/paycheck-calculator)
- [Retirement Tax Planning Guide 2026](/blog/retirement-tax-planning-guide-2026)
- [IRS Withholding Calculator](/irs-withholding-calculator)
- [Social Security Tax 2026 Guide](/blog/retirement-tax-planning-guide-2026#social-security-benefits)`,
  "inheritance-tax-questions-2026": `# Inheritance Tax Questions Answered (2026 Rules)

Inheritance tax is one of the most misunderstood taxes in America. Many people confuse it with estate tax, don't know if their state has one, or aren't sure if they owe taxes on money they've inherited. This FAQ guide answers the most common inheritance tax questions for 2026.

## How Much Is Inheritance Tax?

Inheritance tax varies by state and by your relationship to the deceased person:

### States with Inheritance Tax (2026)

| State | Spouse | Children | Siblings | Others |
|-------|--------|----------|----------|--------|
| Kentucky | 0% | 0% | 4-16% | 6-16% |
| Maryland | 0% | 0% | 10% | 10% |
| Nebraska | 0% | 1% | 6-11% | 18% |
| New Jersey | 0% | 0% | 11-16% | 15-16% |
| Pennsylvania | 0% | 4.5% | 12% | 15% |

Iowa phased out its inheritance tax for deaths occurring on or after January 1, 2025.

**There is no federal inheritance tax.** The federal government only has an estate tax (paid by the estate before distribution).

## How Much Is Estate Tax?

The federal estate tax applies only to estates valued above **$13,990,000** (in 2026). The rate is **40%** on the amount above the exemption.

For estates below $13.99 million, no federal estate tax is owed.

### State Estate Tax

12 states have their own estate tax with much lower exemptions:
- Oregon: $1,000,000 exemption, up to 16% rate
- Massachusetts: $2,000,000 exemption, up to 16% rate
- New York: $6,940,000 exemption, up to 16% rate
- Washington: $2,193,000 exemption, up to 20% rate

## How Much Is the Estate Tax Exemption in 2026?

The federal estate tax exemption for 2026 is **$13,990,000 per individual** ($27,980,000 for married couples).

**Important**: The Tax Cuts and Jobs Act of 2017 doubled this exemption, but it is scheduled to sunset on December 31, 2025. For 2026, the exemption may revert to approximately $7-8 million per individual. Check current law, as this is politically contested.

## How Do Estate Taxes Work?

Estate taxes work as follows:

1. When someone dies, their estate is valued (all assets minus debts)
2. If the estate value exceeds the exemption, the estate files IRS Form 706
3. The estate pays 40% tax on the amount above the exemption
4. The remaining assets are distributed to heirs
5. Heirs may then owe state inheritance tax (depending on state and relationship)

The executor of the estate handles all tax filings and payments before distributing assets to heirs.

## Is Inheritance Tax Federal?

No. There is **no federal inheritance tax**. The federal government has an estate tax (paid by the estate), not an inheritance tax (paid by the heir).

Only 6 states have an inheritance tax: Iowa (phasing out), Kentucky, Maryland, Nebraska, New Jersey, and Pennsylvania.

## Is Real Estate Tax the Same as Estate Tax?

No, these are completely different taxes:

- **Real estate tax** (property tax): Annual tax on property you own, paid to local government
- **Estate tax**: One-time tax on the transfer of a deceased person's estate, paid by the estate

Real estate tax is an ongoing annual expense. Estate tax is a one-time event when someone dies.

## Can Estate Tax Be Paid in Installments?

Yes, under IRS Section 6166, estates that include a closely held business can pay the estate tax in installments over up to **15 years**. The first payment is due 5 years after the death, with annual payments thereafter.

Interest is charged on the deferred tax, but at a special 2% rate for the first $1.5 million of taxable estate (adjusted for inflation).

## How Is Inheritance Tax Calculated?

Inheritance tax is calculated based on:
1. The value of assets you receive
2. Your relationship to the deceased (spouse, child, sibling, non-relative)
3. Your state's tax rate and exemption

**Example**: You inherit $100,000 from your uncle in Pennsylvania.
- Relationship: "All others" = 15% rate
- Exemption: $0 for non-relatives
- Tax: $100,000 × 15% = $15,000
- You receive: $85,000

Use our [Property Tax Calculator](/property-tax-calculator) for inherited real estate tax estimates.

## Do I Have to Pay Taxes on Money I Inherit?

Federally: No. You don't pay federal income tax on inherited money.

State: Maybe. If you live in (or the deceased lived in) a state with inheritance tax (KY, MD, NE, NJ, PA), you may owe state inheritance tax.

Income tax: Inherited money itself is not income. However, any earnings on inherited assets (interest, dividends, capital gains) are taxable.

## What Is the Difference Between Estate Tax and Inheritance Tax?

| Feature | Estate Tax | Inheritance Tax |
|---------|-----------|-----------------|
| Who pays | The estate | The heir |
| When | Before distribution | After receiving |
| Federal | Yes (above $13.99M) | No |
| State | 12 states | 6 states |

**Simple rule**: Estate tax is paid by the dead person's estate. Inheritance tax is paid by the living person who receives the inheritance.

## Related Resources

- [Inheritance Tax Guide 2026](/blog/inheritance-tax-guide-2026)
- [Property Tax Calculator](/property-tax-calculator)
- [Capital Gains Calculator](/capital-gains-calculator)
- [Estate Planning Resources](/blog/inheritance-tax-guide-2026)`,
  "tax-refund-questions-2026": `# Tax Refund Questions Answered (2026)

Tax refund questions are among the most searched tax topics in America. Millions of people want to know when they'll get their refund, how to track it, and what could delay it. This FAQ guide answers the most common tax refund questions for the 2026 tax season.

## When Will I Get My Tax Refund?

The IRS typically issues refunds within **21 days** of receiving your tax return if you e-file and choose direct deposit. Paper returns take 6-8 weeks.

### 2026 Refund Timeline

| Filing Date | Expected Refund (Direct Deposit) |
|------------|--------------------------------|
| Early January | Late January |
| February 1 | February 22 |
| March 1 | March 22 |
| April 15 (deadline) | May 6 |

## Can I Track My Tax Refund?

Yes. Use the IRS **"Where's My Refund?"** tool at [irs.gov/refunds](https://irs.gov/refunds). You'll need:
- Your Social Security number
- Your filing status
- The exact refund amount from your return

The tool updates once every 24 hours (usually overnight). Check after 24 hours of e-filing or 4 weeks after mailing a paper return.

## Can a Tax Refund Come on a Weekend?

Yes. The IRS processes refunds daily, and direct deposits can hit your bank account on any day of the week, including weekends. However, some banks don't process deposits on weekends, so the money may not be available until Monday.

The IRS "Where's My Refund?" tool typically shows a "refund sent" status when the payment is initiated, not when it hits your account.

## Can Debt Collectors Take My Tax Refund?

Private debt collectors **cannot** directly intercept your tax refund. However, there are exceptions:

### Who CAN Take Your Refund
1. **Federal government**: For federal debts (student loans, federal taxes, federal benefits overpayments)
2. **State government**: For state tax debts, state debts, or state-ordered child support
3. **Treasury Offset Program**: For past-due child support, federal student loans, or other federal debts

### Who CANNOT Take Your Refund
- Credit card companies
- Medical bill collectors
- Personal loan lenders
- Private creditors (without a court judgment and garnishment order)

## Can Joint Tax Refund Be Garnished?

Yes, but the non-debt spouse can file an **Injured Spouse Allocation** (IRS Form 8379) to recover their portion of the refund. The IRS will divide the refund based on each spouse's income and allocations.

This commonly happens when one spouse has:
- Past-due student loans
- Back child support
- Federal tax debt from a previous year

## Does a Tax Credit Increase My Refund?

Yes. Tax credits directly reduce your tax liability dollar-for-dollar. If you owe $3,000 in taxes and have a $1,000 tax credit, your tax bill drops to $2,000.

**Refundable tax credits** (like the Earned Income Credit) can even increase your refund beyond what you paid in. If you had $1,000 withheld and qualify for a $2,000 refundable credit, you'd get a $2,000 refund.

### Common Tax Credits for 2026
- Child Tax Credit: Up to $2,000 per child
- Earned Income Tax Credit: Up to $7,830
- Child and Dependent Care Credit: Up to $1,050
- American Opportunity Credit: Up to $2,500
- Lifetime Learning Credit: Up to $2,000

## Does a Tax Deduction Increase My Refund?

Yes, but indirectly. Tax deductions reduce your **taxable income**, not your tax directly. The value depends on your tax bracket.

**Example**: A $5,000 deduction in the 22% bracket saves you $5,000 × 22% = $1,100 in taxes. This increases your refund by $1,100.

Tax credits are generally more valuable than deductions because they reduce tax dollar-for-dollar.

## Can Business Get Tax Refund?

Yes, businesses can receive tax refunds, but it works differently:
- **C-Corporations**: Can get refunds for overpaid estimated taxes
- **S-Corporations/Partnerships**: Refunds pass through to owners' personal returns
- **Sole proprietors**: Business income/expenses are on personal return (Schedule C)

Businesses typically receive refunds when they overpay estimated taxes or qualify for refundable business credits.

## What Can Delay My Tax Refund?

Common refund delays:
1. **Errors on return** (wrong SSN, math errors)
2. **Identity verification** (IRS suspects fraud)
3. **Earned Income Credit or Additional Child Tax Credit** (Path Act requires delay until mid-February)
4. **Filing before mid-February** (IRS systems still updating)
5. **Paper filing** (6-8 weeks vs. 21 days for e-file)
6. **Amended return** (up to 16 weeks)
7. **Injured spouse form** (adds 11-14 weeks)
8. **Bank account errors** (wrong routing/account number)

## How Can I Get My Tax Refund Faster?

1. **E-file your return** (vs. paper filing)
2. **Choose direct deposit** (vs. paper check)
3. **File early** (avoid the February-March rush)
4. **Double-check for errors** (wrong SSN, math mistakes)
5. **Avoid claiming EIC/ACTC** if not eligible (triggers automatic review)
6. **Use tax software** (reduces errors)

Use our [Tax Refund Calculator](/tax-refund-calculator) to estimate your refund before filing.

## Related Resources

- [Tax Refund Calculator](/tax-refund-calculator)
- [IRS Withholding Calculator](/irs-withholding-calculator)
- [Paycheck Calculator](/paycheck-calculator)`,
  "tax-questions-answered-2026": `# Tax Questions Answered: Brackets, Overtime, Bonuses & More (2026)

Americans have hundreds of questions about how taxes work. From brackets to overtime pay to bonuses, the tax code is complex and confusing. This FAQ guide answers the most commonly searched tax questions for 2026, with clear, accurate explanations.

## Are No Taxes on Overtime in Effect?

As of 2026, there is **no federal exemption** for overtime pay. Overtime pay is still taxed as ordinary income at the federal level.

However, there have been legislative proposals to exempt overtime pay from federal income tax. The "No Tax on Overtime" proposal was part of broader tax reform discussions, but as of 2026, it has not become law.

Some states may have different rules, so check with your state revenue department.

## Are Taxes on Bonuses Higher?

Bonuses are subject to a **flat 22% federal withholding rate** (for bonuses under $1 million). This is often higher than your normal tax rate, which is why your bonus may seem "taxed more."

However, at tax time, your bonus is simply added to your total income and taxed at your marginal rate. If your marginal rate is lower than 22%, you'll get the excess withholding back as a refund.

**For bonuses over $1 million**: The withholding rate jumps to 37%.

Use our [Bonus Tax Calculator](/bonus-tax-calculator) to see exactly how much you'll keep.

## Are Taxes Automatically Deducted from Paycheck?

Yes. Your employer withholds federal income tax, Social Security tax (6.2%), and Medicare tax (1.45%) from each paycheck. They also withhold state income tax (if applicable).

The amount withheld is based on:
- Your income
- Your filing status
- Your W-4 allowances
- Any additional withholding you requested

Use our [Paycheck Calculator](/paycheck-calculator) to see your exact take-home pay.

## Are Taxes Cheaper in Florida?

Yes. Florida has **no state income tax**, which means:
- No tax on wages, salaries, or self-employment income
- No tax on investment income
- No tax on pension or retirement income
- No tax on Social Security benefits

On a $100,000 salary, living in Florida instead of California saves approximately **$8,000-$10,000 per year** in state taxes.

However, Florida does have:
- Sales tax: 6% (avg 6.98% with local surtaxes)
- Property tax: avg 0.98%
- Corporate income tax: 3.535%

## Are Taxes Included in Mortgage?

For most homeowners, monthly mortgage payments include:
1. **Principal** (loan repayment)
2. **Interest** (cost of borrowing)
3. **Property taxes** (held in escrow)
4. **Homeowners insurance** (held in escrow)
5. **PMI** (if applicable)

Property taxes are typically collected by your lender and held in an escrow account, then paid to your local government when due. Not all mortgages include escrow — some homeowners pay property taxes directly.

Use our [Mortgage Calculator](/mortgage-calculator) to see your full monthly payment including taxes.

## Are Taxes Going Up in New York?

New York already has some of the highest state taxes in the country:
- State income tax: 4% - 10.9% (progressive)
- NYC resident tax: 3.078% - 3.876% (additional)
- Sales tax: avg 8.52%
- Property tax: avg 1.62%

For 2026, New York has not announced major tax increases, but the top marginal rate of 10.9% remains one of the highest in the nation. NYC residents pay the combined state + city rate.

## Are Taxes Going Up in Virginia?

Virginia's income tax rates range from 2% to 5.75%. For 2026, Virginia has not announced major rate increases, but standard deduction amounts and bracket thresholds are adjusted annually for inflation.

Virginia does tax Social Security benefits for higher-income retirees, unlike many states that have exempted them.

## Are Property Taxes Deductible?

Yes, but with limitations. As of 2026, you can deduct up to **$10,000** in combined state and local taxes (SALT) — this includes property taxes plus state income taxes OR state sales taxes.

This $10,000 cap (SALT cap) was introduced by the Tax Cuts and Jobs Act of 2017 and is scheduled to sunset after 2025. For 2026, the cap may be eliminated or modified.

**To deduct property taxes**, you must itemize deductions (Schedule A) rather than take the standard deduction.

## Are Tax Brackets Based on AGI?

Tax brackets are based on **taxable income**, which is your AGI minus either the standard deduction or itemized deductions.

The calculation:
1. Gross income (wages, self-employment, investments, etc.)
2. Minus adjustments (401k contributions, HSA, student loan interest) = **AGI**
3. Minus standard or itemized deductions = **Taxable income**
4. Tax brackets apply to taxable income

## Are 1099 Taxes Quarterly?

Yes, if you're self-employed or receive 1099 income, you generally must pay **quarterly estimated taxes** if you expect to owe $1,000+ at tax time.

### 2026 Quarterly Tax Due Dates
- Q1: April 15, 2026
- Q2: June 15, 2026
- Q3: September 15, 2026
- Q4: January 15, 2027

Use our [Self-Employment Tax Calculator](/self-employment-tax-calculator) to estimate your quarterly payments.

## Are Taxes Still Being Taken Out of Overtime Pay?

Yes. As of 2026, overtime pay is still subject to federal income tax withholding, Social Security tax, and Medicare tax — just like regular wages.

Your employer withholds taxes from overtime pay at the same rate as regular pay. The "No Tax on Overtime" proposals have not been enacted into law.

Use our [Overtime Tax Calculator](/overtime-tax-calculator) to see your after-tax overtime pay.

## Related Resources

- [Paycheck Calculator](/paycheck-calculator)
- [Bonus Tax Calculator](/bonus-tax-calculator)
- [Overtime Tax Calculator](/overtime-tax-calculator)
- [Self-Employment Tax Calculator](/self-employment-tax-calculator)
- [Property Tax Calculator](/property-tax-calculator)
- [Mortgage Calculator](/mortgage-calculator)`,
  "how-much-tax-will-i-owe-2026": `# How Much Tax Will I Owe in 2026? Complete Calculator & Guide

The most common tax question in America is simple: "How much tax will I owe?" Yet most tax websites try to sell you filing software instead of simply answering the question. This guide gives you the exact numbers, formulas, and a free calculator to estimate your 2026 tax liability — no signup, no software to buy, no email required.

## How Much Tax Will I Owe If I Make $50,000?

On a $50,000 salary (single filer, standard deduction), your 2026 federal tax is approximately **$3,820**. Here's the breakdown:

| Item | Amount |
|------|--------|
| Gross salary | $50,000 |
| Standard deduction | -$16,100 |
| Taxable income | $33,900 |
| Federal income tax (10% + 12%) | $3,820 |
| FICA (Social Security + Medicare) | $3,825 |
| **Total tax** | **$7,645** |
| **Take-home pay** | **$42,355** |

If you live in a state with no income tax (Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire), your total tax stays at $7,645.

If you live in California, add approximately $2,500 in state income tax. In New York, add about $3,500.

Use our [Paycheck Calculator](/paycheck-calculator) for an exact estimate.

## How Much Tax Will I Owe If I Make $75,000?

On a $75,000 salary (single filer), your 2026 federal tax is approximately **$8,620**:

| Item | Amount |
|------|--------|
| Gross salary | $75,000 |
| Standard deduction | -$16,100 |
| Taxable income | $58,900 |
| Federal income tax (10% + 12% + 22%) | $8,620 |
| FICA | $5,738 |
| **Total tax** | **$14,358** |
| **Take-home pay** | **$60,642** |

## How Much Tax Will I Owe If I Make $100,000?

On a $100,000 salary (single filer), your 2026 federal tax is approximately **$13,382**:

| Item | Amount |
|------|--------|
| Gross salary | $100,000 |
| Standard deduction | -$16,100 |
| Taxable income | $83,900 |
| Federal income tax | $13,382 |
| FICA | $7,650 |
| **Total tax** | **$21,032** |
| **Take-home pay** | **$78,968** |

## How to Calculate How Much Tax You Owe

### Step 1: Determine Your Gross Income

Add all your income sources:
- Wages and salaries (W-2)
- Self-employment income (1099)
- Investment income (dividends, interest, capital gains)
- Rental income
- Retirement distributions (401k, IRA, pension)
- Social Security benefits (if above thresholds)

### Step 2: Subtract Adjustments (Above-the-Line Deductions)

Common adjustments:
- 401(k) contributions (up to $24,500 in 2026)
- HSA contributions (up to $4,400 self, $8,300 family)
- Student loan interest deduction (up to $2,500)
- Self-employment tax deduction (half of SE tax)
- Traditional IRA contributions (if eligible)

### Step 3: Subtract Standard or Itemized Deductions

**Standard deduction (2026)**:
- Single: $16,100
- Married Filing Jointly: $32,200
- Head of Household: $24,150

**Itemized deductions** (use if higher than standard):
- Mortgage interest
- State and local taxes (SALT) up to $10,000
- Charitable contributions
- Medical expenses above 7.5% of AGI

### Step 4: Apply Tax Brackets

Use the 2026 progressive tax brackets. Only income within each bracket is taxed at that rate.

### Step 5: Add FICA Taxes

- Social Security: 6.2% on wages up to $184,500
- Medicare: 1.45% on all wages
- Additional Medicare: 0.9% on wages above $200,000 (single)

### Step 6: Add State Income Tax

Use our state-specific calculators:
- [Texas Tax Calculator](/texas-tax-calculator) (0% state tax)
- [Florida Tax Calculator](/florida-tax-calculator) (0% state tax)
- [California Tax Calculator](/california-tax-calculator) (1%-13.3%)
- [New York Tax Calculator](/new-york-tax-calculator) (4%-10.9%)
- [Illinois Tax Calculator](/illinois-tax-calculator) (4.95% flat)

## How Much Tax Will I Owe on a Bonus?

Bonuses are taxed at a flat **22% federal withholding rate** (for bonuses under $1 million). However, at tax time, your bonus is simply added to your total income and taxed at your marginal rate.

If your marginal rate is lower than 22%, you'll get a refund of the excess withholding. If higher, you'll owe more.

Use our [Bonus Tax Calculator](/bonus-tax-calculator) for exact calculations.

## How Much Tax Will I Owe on 401(k) Withdrawal?

401(k) withdrawals are taxed as **ordinary income** at your marginal rate. If you withdraw $50,000 and are in the 22% bracket, you'll pay approximately $11,000 in federal tax.

If you're under 59.5, add a 10% penalty ($5,000 on $50,000).

Use our [401(k) Calculator](/401k-retirement-calculator) to project your retirement tax.

## How Much Tax Will I Owe on Capital Gains?

Long-term capital gains (assets held over 1 year) are taxed at preferential rates:

| Income (Single) | Capital Gains Rate |
|-----------------|-------------------|
| $0 - $48,475 | 0% |
| $48,476 - $533,400 | 15% |
| Over $533,400 | 20% |

Short-term gains (held 1 year or less) are taxed as ordinary income.

Use our [Capital Gains Calculator](/capital-gains-calculator) for exact calculations.

## How Much Tax Will I Owe If I'm Self-Employed?

Self-employed individuals pay both halves of FICA (15.3% total) plus federal income tax. On $75,000 net self-employment income:

| Item | Amount |
|------|--------|
| SE tax (15.3% on 92.35% of income) | $10,595 |
| Federal income tax (after deductions) | $5,200 |
| **Total tax** | **$15,795** |
| **Effective rate** | **21.1%** |

Use our [Self-Employment Tax Calculator](/self-employment-tax-calculator) for exact numbers.

## Free Tax Calculator — No Signup Required

Unlike TurboTax, H&R Block, and other tax software that require you to create an account before showing any numbers, our calculators are:

- ✅ 100% free
- ✅ No signup or email required
- ✅ No data stored
- ✅ Instant results
- ✅ Updated for 2026

[Paycheck Calculator](/paycheck-calculator) | [Tax Refund Calculator](/tax-refund-calculator) | [Self-Employment Calculator](/self-employment-tax-calculator)`,
  "take-home-pay-calculator-guide-2026": `# Take Home Pay Calculator 2026: How Much You Actually Keep

Your salary is not your take-home pay. A $75,000 salary doesn't mean $75,000 in your pocket. Between federal tax, FICA, state tax, and benefits deductions, your actual take-home pay can be $10,000-$20,000 less than your gross salary. This guide explains exactly how to calculate your take-home pay, with real examples for every state.

## What Is Take Home Pay?

Take-home pay (also called net pay) is the money you actually receive in your paycheck after all deductions:

1. **Federal income tax withholding** (based on W-4)
2. **FICA taxes** (Social Security 6.2% + Medicare 1.45%)
3. **State income tax** (varies by state, 0% - 13.3%)
4. **Local/city tax** (some cities like NYC)
5. **401(k) contributions** (if applicable)
6. **Health insurance premiums** (if through employer)
7. **HSA/FSA contributions** (if applicable)

## How to Calculate Take Home Pay

### Step 1: Start with Gross Salary

This is your annual salary before any deductions.

### Step 2: Subtract Pre-Tax Deductions

- 401(k) contributions (e.g., 5% of $75,000 = $3,750)
- HSA contributions (up to $4,400 in 2026)
- Health insurance premiums
- FSA contributions

### Step 3: Calculate FICA Taxes

- Social Security: 6.2% of gross wages (up to $184,500 cap)
- Medicare: 1.45% of all wages
- Additional Medicare: 0.9% on wages above $200,000

### Step 4: Calculate Federal Income Tax

Subtract the standard deduction ($16,100 single) from your taxable income, then apply the 2026 tax brackets.

### Step 5: Calculate State Income Tax

Each state has its own rates:
- **0% (no state tax)**: Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire
- **Flat rate**: Illinois (4.95%), Colorado (4.4%), Indiana (3.05%), Pennsylvania (3.07%), Michigan (4.25%)
- **Progressive**: California (1%-13.3%), New York (4%-10.9%), and others

### Step 6: Subtract All Taxes from Gross

Take-home pay = Gross salary - All taxes - Pre-tax deductions

## Take Home Pay by State — $75,000 Salary Examples

| State | State Tax | Total Tax | Take-Home Pay | Monthly |
|-------|----------|-----------|--------------|---------|
| Texas | $0 | $14,358 | $60,642 | $5,054 |
| Florida | $0 | $14,358 | $60,642 | $5,054 |
| Washington | $0 | $14,358 | $60,642 | $5,054 |
| Illinois | $3,713 | $18,071 | $56,929 | $4,744 |
| Pennsylvania | $2,303 | $16,661 | $58,339 | $4,862 |
| California | $6,083 | $20,441 | $54,559 | $4,547 |
| New York | $5,379 | $19,737 | $55,263 | $4,605 |
| New York City | $7,671 | $22,029 | $52,971 | $4,414 |

The difference between Texas (no state tax) and California (13.3% top rate) on a $75,000 salary is **$6,083 per year** — that's $507/month extra in your pocket in Texas.

## Take Home Pay Calculator — Free, No Signup

Our [Paycheck Calculator](/paycheck-calculator) gives you instant take-home pay estimates:
- Enter your salary
- Select your state
- Choose filing status
- Add 401(k) and HSA contributions
- See your exact net pay

No account required. No email. No data stored. Just instant results.

## How Much Is My Take Home Pay After 401(k)?

401(k) contributions reduce your take-home pay, but not by the full contribution amount. Because 401(k) is pre-tax, you save on federal and state taxes.

**Example**: You earn $75,000 and contribute 5% ($3,750) to your 401(k):
- Your taxable income drops to $71,250
- Federal tax savings: ~$825 (at 22% bracket)
- State tax savings: ~$186 (at 4.95% Illinois rate)
- **Net take-home reduction**: $3,750 - $825 - $186 = **$2,739**

So contributing $3,750 to your 401(k) only reduces your take-home pay by $2,739. The government effectively pays 27% of your contribution.

## How to Increase Your Take Home Pay

### 1. Adjust Your W-4 Withholding

If you typically get a large tax refund, you're over-withholding. Update your W-4 to claim additional allowances or reduce withholding. This puts more money in each paycheck.

Use our [IRS Withholding Calculator](/irs-withholding-calculator) to find your optimal W-4 settings.

### 2. Maximize Pre-Tax Contributions

HSA, 401(k), and FSA contributions reduce your taxable income, which reduces your tax burden. The money comes out of your paycheck, but the tax savings partially offset the reduction.

### 3. Move to a No-Income-Tax State

Moving from California to Texas on a $100,000 salary increases your take-home pay by approximately **$9,000-$10,000 per year** ($750-$833/month).

### 4. Claim All Eligible Tax Credits

Tax credits directly reduce your tax bill dollar-for-dollar:
- Child Tax Credit: Up to $2,000 per child
- Earned Income Tax Credit: Up to $7,830
- Child and Dependent Care Credit: Up to $1,050

### 5. File as Head of Household

If you're unmarried but pay more than half the cost of keeping up a home for a qualifying person, file as Head of Household for a larger standard deduction ($24,150 vs. $16,100) and lower tax rates.

## Take Home Pay Calculator by Salary

| Salary | Take-Home (Texas) | Take-Home (California) | Difference |
|--------|-------------------|----------------------|------------|
| $30,000 | $26,881 | $25,648 | $1,233 |
| $50,000 | $42,355 | $41,097 | $1,258 |
| $75,000 | $60,642 | $54,559 | $6,083 |
| $100,000 | $78,968 | $73,799 | $5,169 |
| $150,000 | $114,227 | $101,237 | $12,990 |
| $200,000 | $148,927 | $133,454 | $15,473 |

Use our [Salary After Tax](/salary) pages for detailed breakdowns at 26 salary levels.

## Related Calculators

- [Paycheck Calculator](/paycheck-calculator)
- [Salary After Tax by State](/salary)
- [401(k) Retirement Calculator](/401k-retirement-calculator)
- [IRS Withholding Calculator](/irs-withholding-calculator)
- [Relocation Calculator](/relocation-calculator)`,
  "free-tax-calculator-no-signup-2026": `# Free Tax Calculator 2026 — No Signup, No Email, Instant Results

Most tax calculator websites have a catch: you enter all your information, click "calculate," and then hit a paywall asking you to "create a free account" or "start your return." Our tax calculators are different. No signup. No email. No data stored. Just instant, accurate results updated for 2026.

## Why Our Tax Calculator Is Actually Free

### What Other Sites Do

| Site | The Catch |
|------|----------|
| TurboTax | "Free" estimate, then $39-$89 to file |
| H&R Block | "Free" calculator, then upsell to paid filing |
| TaxAct | "Free" preview, then pay to see full results |
| SmartAsset | "Free" but requires email to see details |

### What We Do

- ✅ **No account required** — use the calculator immediately
- ✅ **No email needed** — we don't ask for it
- ✅ **No paywall** — all results are shown instantly
- ✅ **No data stored** — your numbers stay in your browser
- ✅ **No upsells** — we don't sell tax filing software

We're able to offer this for free because:
1. Our calculators run in your browser (no server costs for calculations)
2. We display ads (clearly labeled, separate from content)
3. We don't store any user data (no database costs)

## How to Use Our Free Tax Calculator

### Step 1: Choose Your Calculator

| Calculator | What It Does | Link |
|-----------|-------------|------|
| Paycheck Calculator | Calculate take-home pay after all taxes | [Open](/paycheck-calculator) |
| Tax Refund Calculator | Estimate your refund or amount owed | [Open](/tax-refund-calculator) |
| Self-Employment Calculator | Calculate SE tax for 1099 income | [Open](/self-employment-tax-calculator) |
| Capital Gains Calculator | Calculate tax on investment gains | [Open](/capital-gains-calculator) |
| Bonus Tax Calculator | Calculate tax on bonuses | [Open](/bonus-tax-calculator) |
| Overtime Tax Calculator | Calculate after-tax overtime pay | [Open](/overtime-tax-calculator) |
| Property Tax Calculator | Estimate property tax by state | [Open](/property-tax-calculator) |
| Sales Tax Calculator | Calculate sales tax for all 50 states | [Open](/sales-tax-calculator) |
| Lottery Tax Calculator | Calculate after-tax lottery winnings | [Open](/lottery-tax-calculator) |
| 401(k) Calculator | Project retirement balance | [Open](/401k-retirement-calculator) |
| IRS Withholding Calculator | Optimize your W-4 | [Open](/irs-withholding-calculator) |
| Mortgage Calculator | Calculate monthly payments | [Open](/mortgage-calculator) |

### Step 2: Enter Your Numbers

Each calculator asks for the minimum information needed:
- Salary or amount
- State (for state tax calculations)
- Filing status (single, married, head of household)
- Optional: 401(k), HSA, deductions

### Step 3: Get Instant Results

Results appear immediately — no loading, no waiting, no paywall.

## What Makes Our Tax Calculator Accurate

### 2026 Tax Data

All our calculators use the latest 2026 figures:
- Federal tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%
- Standard deduction: $16,100 (single), $32,200 (married)
- FICA: Social Security 6.2% (cap $184,500), Medicare 1.45%
- 401(k) contribution limit: $24,500 ($30,500 if 50+)
- HSA contribution limit: $4,400 (self), $8,300 (family)

### State Tax Data

We cover all 50 states with current 2026 state tax rates:
- [Texas Tax Calculator](/texas-tax-calculator) — 0% income tax
- [Florida Tax Calculator](/florida-tax-calculator) — 0% income tax
- [California Tax Calculator](/california-tax-calculator) — 1% to 13.3%
- [New York Tax Calculator](/new-york-tax-calculator) — 4% to 10.9% + NYC tax
- [Illinois Tax Calculator](/illinois-tax-calculator) — 4.95% flat
- And 45+ more state calculators

### CPA-Reviewed

All calculators and tax data are reviewed by Rachel Mitchell, CPA (Lead Tax Analyst) with 12+ years of experience, and David Chen, EA (IRS Enrolled Agent) with 15+ years of experience.

## Free Tax Calculator vs Paid Tax Software

| Feature | Our Calculator | TurboTax | H&R Block |
|---------|---------------|----------|-----------|
| Estimate take-home pay | ✅ Free | ❌ Requires account | ❌ Requires account |
| Compare states | ✅ Free | ❌ Not available | ❌ Not available |
| Calculate bonus tax | ✅ Free | ❌ Not available | ❌ Not available |
| Calculate overtime tax | ✅ Free | ❌ Not available | ❌ Not available |
| No signup required | ✅ | ❌ | ❌ |
| No email required | ✅ | ❌ | ❌ |
| File your taxes | ❌ | ✅ ($39-$89) | ✅ ($30-$80) |

**Bottom line**: Use our calculators for estimates and planning. Use TurboTax or H&R Block when you're ready to actually file.

## Frequently Asked Questions

### Is this tax calculator really free?

Yes. No account, no email, no credit card. The calculators run entirely in your browser.

### How accurate is this tax calculator?

Our calculators use the official 2026 IRS tax brackets, standard deductions, and FICA rates. State tax rates are verified against each state's revenue department. Accuracy is within $5-$10 of actual tax liability for most filers.

### Do you store my data?

No. When you type your salary into our calculators, that number stays in your browser. It's never sent to our servers. We don't have user accounts, so we couldn't tie your data to you even if we wanted to.

### Can I use this to file my taxes?

No. Our calculators are for estimation and planning only. For filing, use IRS Free File (if AGI under $84,000), TurboTax, H&R Block, or work with a CPA.

### Why don't you charge like TurboTax?

We focus on tax calculation and education, not tax filing. Our revenue comes from clearly-labeled advertising, not from charging users. This lets us keep all calculators free.

## Start Calculating — No Signup Needed

[Paycheck Calculator](/paycheck-calculator) | [Tax Refund Calculator](/tax-refund-calculator) | [Salary After Tax](/salary) | [Compare State Taxes](/compare)`,
  "hourly-wage-after-tax-questions-2026": `# Hourly Wage After Tax Questions Answered (2026 Calculator)

How much tax is taken out of your paycheck? How much is $20 per hour after taxes? What about $21 an hour annually? These are among the most searched tax questions in America, yet most tax websites don't answer them directly. This FAQ guide gives you exact numbers for common hourly wages and paycheck amounts, with a free calculator to check your own.

## How Much Tax Is Taken Out of a $300 Paycheck?

On a $300 paycheck, the tax breakdown depends on your annual income and W-4 settings. Here's a typical scenario (single filer, $40,000/year, standard withholding):

| Deduction | Amount | Percentage |
|-----------|--------|-----------|
| Federal income tax | $24 | 8.0% |
| Social Security (6.2%) | $18.60 | 6.2% |
| Medicare (1.45%) | $4.35 | 1.45% |
| State tax (varies) | $0-$15 | 0-5% |
| **Total tax** | **$47-$62** | **16-21%** |
| **Take-home** | **$238-$253** | **79-84%** |

**In a no-income-tax state** (Texas, Florida, Washington): You keep approximately **$253** from a $300 paycheck.

**In a high-tax state** (California, New York): You keep approximately **$238** from a $300 paycheck.

Use our [Paycheck Calculator](/paycheck-calculator) for an exact estimate based on your state and filing status.

## How Much Tax Do You Pay on $1200 a Week?

$1,200 per week = $62,400 per year. Here's the tax breakdown for a single filer in 2026:

| Item | Amount |
|------|--------|
| Gross annual | $62,400 |
| Standard deduction | -$16,100 |
| Taxable income | $46,300 |
| Federal income tax | $5,058 |
| FICA (Social Security + Medicare) | $4,774 |
| **Total federal tax** | **$9,832** |
| **Take-home pay** | **$52,568/year** |
| **Weekly take-home** | **$1,011/week** |

On $1,200/week, you take home approximately **$1,011/week** in a no-income-tax state, or about **$950/week** in California.

## How Much Is $20 Per Hour Monthly After Taxes?

$20/hour = $41,600/year (assuming 40 hours/week, 52 weeks).

| Item | Amount |
|------|--------|
| Gross monthly | $3,467 |
| Federal tax | $2,383/year ($198/month) |
| FICA | $3,183/year ($265/month) |
| State tax (Texas/Florida) | $0 |
| **Monthly take-home** | **$3,004** |

In a no-income-tax state, $20/hour gives you approximately **$3,004/month** after taxes.

In California, you'd take home about **$2,750/month** (state tax ~$3,000/year).

## How Much Is $21 an Hour Annually After Taxes?

$21/hour = $43,680/year (40 hours/week, 52 weeks).

| Item | Amount |
|------|--------|
| Gross annual | $43,680 |
| Standard deduction | -$16,100 |
| Taxable income | $27,580 |
| Federal income tax | $2,772 |
| FICA | $3,342 |
| **Total federal tax** | **$6,114** |
| **Annual take-home** | **$37,566** |
| **Monthly take-home** | **$3,131** |

In a no-income-tax state, $21/hour gives you approximately **$37,566/year** or **$3,131/month** after taxes.

## How Much Tax Do Taxes Usually Take Out of Your Paycheck?

On average, taxes take out **20-30%** of your gross paycheck:

| Income Level | Federal + FICA | + State Tax (avg) | Total % Taken |
|-------------|---------------|-------------------|--------------|
| $30,000/year | 15% | +2% | ~17% |
| $50,000/year | 16% | +3% | ~19% |
| $75,000/year | 19% | +4% | ~23% |
| $100,000/year | 21% | +5% | ~26% |
| $150,000/year | 24% | +6% | ~30% |
| $200,000/year | 26% | +7% | ~33% |

**In no-income-tax states** (Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire): Subtract 3-7% from the total.

## How Much Will I Be Taxed?

Your total tax depends on three factors:

1. **Federal income tax**: 10-37% (progressive brackets)
2. **FICA**: 7.65% (6.2% Social Security + 1.45% Medicare)
3. **State income tax**: 0-13.3% (depending on your state)

Use this quick formula:
- **No-tax state**: Tax = ~20-25% of gross income
- **Medium-tax state**: Tax = ~25-30% of gross income
- **High-tax state**: Tax = ~30-35% of gross income

For an exact number, use our [Paycheck Calculator](/paycheck-calculator).

## How Much Tax Do I Pay?

For the most common salary levels, here's what you pay (single filer, no state tax):

| Salary | Federal Tax | FICA | Total Tax | Take-Home |
|--------|-----------|------|----------|-----------|
| $30,000 | $1,192 | $2,295 | $3,487 | $26,513 |
| $40,000 | $2,383 | $3,060 | $5,443 | $34,557 |
| $50,000 | $3,820 | $3,825 | $7,645 | $42,355 |
| $60,000 | $5,262 | $4,590 | $9,852 | $50,148 |
| $75,000 | $8,620 | $5,738 | $14,358 | $60,642 |
| $100,000 | $13,382 | $7,650 | $21,032 | $78,968 |

## Why Are Taxes Taken Out of Each Paycheck?

The US uses a **pay-as-you-go** tax system. Instead of paying your entire tax bill in April, you pay throughout the year via paycheck withholding.

### How It Works

1. Your employer estimates your annual tax based on your W-4
2. They divide that by the number of pay periods
3. Each paycheck, they send that amount to the IRS on your behalf
4. At tax time (April), you reconcile:
   - If you overpaid → you get a refund
   - If you underpaid → you owe more

### Why Not Pay Everything in April?

The IRS requires quarterly tax payments. If you waited until April to pay everything, you'd face:
- A massive bill (potentially $10,000+)
- Underpayment penalties
- Cash flow problems for the government

### How to Adjust Your Withholding

File a new [W-4 form](/irs-withholding-calculator) with your employer to:
- **Increase withholding** (if you owed taxes last year)
- **Decrease withholding** (if you got a large refund)

## Is Federal Income Tax 20%?

No. Federal income tax is **progressive**, meaning different portions of your income are taxed at different rates:

| Portion of Income (Single, 2026) | Tax Rate |
|----------------------------------|---------|
| $0 - $11,925 | 10% |
| $11,926 - $48,475 | 12% |
| $48,476 - $103,350 | 22% |
| $103,351 - $197,300 | 24% |
| $197,301 - $250,525 | 32% |
| $250,526 - $626,350 | 35% |
| Over $626,350 | 37% |

Your **effective rate** (average rate you actually pay) is always lower than your **marginal rate** (top bracket). For example, on $50,000 income, your marginal rate is 12%, but your effective rate is only 7.6%.

## Related Calculators

- [Paycheck Calculator](/paycheck-calculator)
- [IRS Withholding Calculator](/irs-withholding-calculator)
- [Overtime Tax Calculator](/overtime-tax-calculator)
- [Salary After Tax by State](/salary)
- [How Much Tax Will I Owe?](/blog/how-much-tax-will-i-owe-2026)`,
  "what-is-taxable-income-guide-2026": `# What Is Taxable Income? Complete Guide to What You Pay Taxes On (2026)

"What do you get taxed on?" is one of the most common tax questions in America. The answer is more complex than you might think — some income is fully taxable, some is partially taxable, and some is completely tax-free. This 2026 guide explains every type of taxable and tax-exempt income, with clear examples.

## What Items Do You Pay Taxes On?

### Fully Taxable Income

These income types are 100% subject to federal income tax:

1. **Wages and salaries** — All employment income (W-2)
2. **Self-employment income** — 1099 income, freelance, contractor (minus business expenses)
3. **Bonuses and commissions** — Taxed as ordinary income
4. **Tips** — All tips over $20/month per employer
5. **Vacation pay** — Taxed as wages
6. **Severance pay** — Taxed as wages
7. **Unemployment compensation** — Fully taxable at federal level (some states exempt)
8. **Capital gains** — Profit from selling investments (short-term at ordinary rates, long-term at 0/15/20%)
9. **Dividends** — Qualified (15/20%) and ordinary (ordinary income rate)
10. **Interest income** — Bank interest, bond interest (some municipal bonds exempt)
11. **Rental income** — Rent received (minus expenses)
12. **Pension income** — Most pensions are fully taxable
13. **401(k)/Traditional IRA withdrawals** — Fully taxable as ordinary income
14. **Annuities** — Portion of annuity payments (depends on basis)
15. **Gambling winnings** — Fully taxable (lottery, casino, sports betting)
16. **Alimony received** — Taxable for divorces finalized after 2018
17. **Jury duty pay** — Taxable as miscellaneous income
18. **Prizes and awards** — Fair market value is taxable
19. **Cancellation of debt** — Generally taxable (exceptions exist)
20. **Royalties** — Taxable as ordinary income

### Partially Taxable Income

1. **Social Security benefits** — 0%, 50%, or 85% taxable depending on combined income
2. **Annuities** — Only the earnings portion is taxable (return of principal is tax-free)
3. **Non-qualified dividends** — Taxed at ordinary rate (qualified at lower rate)
4. **Scholarships** — Tuition/fees tax-free; room/board taxable

## What Income Is Exempt From Taxes?

### Tax-Free Income (Federal)

These income types are **not subject to federal income tax**:

1. **Roth IRA withdrawals** — Qualified withdrawals (59.5+ and 5-year rule) are 100% tax-free
2. **Roth 401(k) withdrawals** — Same as Roth IRA
3. **Municipal bond interest** — Interest from state/local government bonds is federal tax-free
4. **Social Security** (low income) — If combined income < $25,000 (single) or $32,000 (married)
5. **Veterans' benefits** — Disability compensation, pensions, and education benefits
6. **Workers' compensation** — Job-related injury/illness benefits
7. **Child support payments** — Not taxable to the recipient
8. **Gifts received** — Gifts under $18,000/year per giver (2026)
9. **Inheritances** — No federal income tax on inherited money
10. **Life insurance proceeds** — Not taxable as income to beneficiary
11. **Scholarships** — Tuition, fees, books, supplies (not room/board)
12. **Welfare benefits** — Public assistance payments
13. **Supplemental Security Income (SSI)** — Not taxable
14. **Foster care payments** — For qualified foster individuals
15. **Disability insurance** — If premiums paid with after-tax dollars
16. **IRS tax refunds** — Federal tax refunds are not taxable income
17. **Combat pay** — Military pay earned in a combat zone
18. **Foreign income exclusion** — Up to $130,000 (2026) if living abroad
19. **Home sale exclusion** — Up to $250,000 (single) / $500,000 (married) profit tax-free
20. **HSA withdrawals** — For qualified medical expenses

## What Are the 12 Types of Taxes in the US?

| # | Tax Type | Who Pays | Rate |
|---|---------|---------|------|
| 1 | Federal income tax | All earners | 10-37% |
| 2 | State income tax | Residents of 41 states | 0-13.3% |
| 3 | FICA (Social Security) | All employees | 6.2% (employer matches) |
| 4 | Medicare tax | All employees | 1.45% (employer matches) |
| 5 | State sales tax | Consumers in 45 states | 0-9.56% |
| 6 | Property tax | Property owners | 0.28-2.49% |
| 7 | Capital gains tax | Investors | 0/15/20% |
| 8 | Estate tax | Estates over $13.99M | 40% |
| 9 | Gift tax | Gifts over $18,000/year | 18-40% |
| 10 | Excise tax | Consumers (gas, alcohol, tobacco) | Varies |
| 11 | Self-employment tax | Self-employed | 15.3% |
| 12 | Corporate income tax | C-Corporations | 21% (federal) |

## What Is the Minimum Salary to Pay Income Tax?

You must file a tax return (and potentially pay tax) if your income exceeds:

| Filing Status | 2026 Filing Threshold | Standard Deduction |
|--------------|---------------------|-------------------|
| Single (under 65) | $16,100 | $16,100 |
| Single (65+) | $17,700 | $17,700 |
| Married Filing Jointly (both under 65) | $32,200 | $32,200 |
| Married Filing Jointly (one 65+) | $33,500 | $33,500 |
| Head of Household (under 65) | $24,150 | $24,150 |

**If your income is below the standard deduction, you owe $0 federal income tax.**

However, you may still owe FICA (7.65%) regardless of income level, and state tax thresholds may differ.

## What Income Pays 37% in Taxes?

The 37% federal tax bracket applies to taxable income over **$626,350** (single filer) or **$751,600** (married filing jointly) in 2026.

**Important**: Only the income ABOVE $626,350 is taxed at 37%. Income below that is taxed at lower rates. A single filer making $700,000 doesn't pay 37% on all $700,000 — only on the $73,650 above the threshold.

## What Is the 60% Trap?

The "60% trap" (or "tax torpedo") refers to the situation where retirees face a **marginal tax rate of 40.7% or higher** (instead of the expected 22%) due to Social Security taxation:

1. Retiree withdraws from 401(k) → increases taxable income
2. Higher income triggers 85% of Social Security to become taxable
3. Each additional dollar of 401(k) withdrawal triggers ~$0.85 of Social Security tax
4. Effective marginal rate jumps from 22% to **40.7%**

**How to avoid it**: Withdraw from Roth accounts (tax-free) to avoid increasing taxable income, or spread withdrawals across multiple years.

## What Are 10 Types of Taxable Income?

1. Wages and salaries
2. Self-employment income
3. Investment income (dividends, interest, capital gains)
4. Rental income
5. Pension and retirement distributions (401k, IRA)
6. Social Security benefits (if income exceeds thresholds)
7. Unemployment compensation
8. Gambling and lottery winnings
9. Alimony received (for post-2018 divorces)
10. Prizes and awards

## Can I Gift Money to My Wife?

**Yes, completely tax-free.** Transfers between spouses are exempt from gift tax. You can transfer any amount to your spouse without tax consequences, as long as:

- Your spouse is a US citizen (unlimited exemption)
- Your spouse is a non-citizen (annual limit of $190,000 in 2026)

Gifts to others (children, friends) are subject to the $18,000 annual gift exclusion per person.

## How Do I Know If I Have to Pay Taxes?

You need to file a federal tax return if ANY of these apply:

1. Your gross income exceeds the filing threshold ($16,100 single, $32,200 married)
2. You had self-employment income of $400 or more
3. You owe special taxes (AMT, additional Medicare, household employment)
4. You received advance premium tax credits (ACA marketplace)
5. You had wages of $108.28 or more from a church

Even if you don't owe tax, you should file if you're eligible for refundable credits (EITC, Child Tax Credit).

## Related Resources

- [Paycheck Calculator](/paycheck-calculator)
- [Federal Tax Brackets](/federal-tax-brackets)
- [How Much Tax Will I Owe?](/blog/how-much-tax-will-i-owe-2026)
- [Free Tax Calculator — No Signup](/blog/free-tax-calculator-no-signup-2026)
- [Tax Glossary](/glossary)`
};