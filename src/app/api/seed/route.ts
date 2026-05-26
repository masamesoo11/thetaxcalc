import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/seed
 * Seed the database with initial data.
 * Only creates records that don't already exist.
 */

// --- Seed data: Blog posts with real SEO content ---

const blogPosts = [
  {
    title: '2026 Federal Tax Brackets Explained',
    slug: '2026-federal-tax-brackets-explained',
    excerpt: 'Complete guide to the 2026 federal income tax brackets, standard deductions, and how to calculate your effective tax rate.',
    category: 'tax-guide',
    tags: 'federal,tax brackets,2026,income tax',
    published: true,
    featured: true,
    metaTitle: '2026 Federal Tax Brackets Explained | TaxYield.io',
    metaDesc: 'Understand the 2026 federal income tax brackets, marginal vs effective rates, and standard deductions. Complete guide with examples.',
    content: `# 2026 Federal Tax Brackets Explained

Understanding federal tax brackets is essential for accurate financial planning. The U.S. uses a progressive tax system, meaning different portions of your income are taxed at different rates. Here's everything you need to know about the 2026 federal tax brackets.

## How Tax Brackets Work

A common misconception is that earning more money and moving into a higher bracket means all your income is taxed at the higher rate. This is not how progressive taxation works. Instead, only the income within each bracket is taxed at that bracket's rate.

For example, if you're a single filer earning $60,000 in 2026:
- The first $11,600 is taxed at 10%
- Income from $11,601 to $47,150 is taxed at 12%
- Income from $47,151 to $60,000 is taxed at 22%

This means your **marginal tax rate** (the rate on your last dollar earned) is 22%, but your **effective tax rate** (total tax divided by total income) is significantly lower.

## 2026 Federal Tax Brackets for Single Filers

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10%      | $0 – $11,600        |
| 12%      | $11,601 – $47,150   |
| 22%      | $47,151 – $100,525  |
| 24%      | $100,526 – $191,950 |
| 32%      | $191,951 – $243,725 |
| 35%      | $243,726 – $609,350 |
| 37%      | Over $609,350       |

## 2026 Federal Tax Brackets for Married Filing Jointly

| Tax Rate | Taxable Income Range |
|----------|---------------------|
| 10%      | $0 – $23,200        |
| 12%      | $23,201 – $94,300   |
| 22%      | $94,301 – $201,050  |
| 24%      | $201,051 – $383,900 |
| 32%      | $383,901 – $487,450 |
| 35%      | $487,451 – $731,200 |
| 37%      | Over $731,200       |

## Standard Deductions for 2026

The standard deduction reduces your taxable income before the brackets apply:

- **Single**: $15,000
- **Married Filing Jointly**: $30,000
- **Head of Household**: $22,500

These amounts are adjusted annually for inflation. If your itemized deductions (mortgage interest, state and local taxes up to $10,000, charitable contributions) exceed the standard deduction, you should itemize instead.

## Key Takeaways

1. **Marginal vs. Effective Rate**: Your marginal rate is the rate on your highest dollar of income. Your effective rate is your total tax divided by total income — always lower than your marginal rate.

2. **Deductions Matter**: The standard deduction significantly reduces your taxable income. For most taxpayers, the standard deduction is the better choice.

3. **Bracket Creep**: Tax brackets are adjusted for inflation, but if your income grows faster than inflation, you may move into higher brackets over time.

4. **Planning Opportunities**: Understanding your bracket helps you make smarter decisions about retirement contributions, timing of deductions, and income recognition.

Use our **paycheck calculator** to see exactly how federal tax brackets affect your take-home pay based on your specific situation.`
  },
  {
    title: 'Illinois Income Tax Guide 2026',
    slug: 'illinois-income-tax-guide-2026',
    excerpt: 'Everything you need to know about Illinois income tax in 2026, including the flat tax rate, personal exemptions, and how it compares to neighboring states.',
    category: 'state-tax',
    tags: 'illinois,income tax,flat tax,2026,state tax',
    published: true,
    featured: true,
    metaTitle: 'Illinois Income Tax Guide 2026 | TaxYield.io',
    metaDesc: 'Complete guide to Illinois income tax for 2026. Flat tax rate, personal exemptions, property taxes, and comparison to neighboring states.',
    content: `# Illinois Income Tax Guide 2026

Illinois stands out among U.S. states for its flat income tax rate. Unlike the progressive systems used by most states and the federal government, Illinois taxes all taxable income at a single rate regardless of how much you earn.

## Illinois Flat Income Tax Rate

For 2026, the Illinois individual income tax rate is **4.95%**. This rate applies to all taxable income — there are no brackets. Whether you earn $30,000 or $3,000,000, your Illinois state income tax rate remains the same.

## Personal Exemptions

Illinois offers personal exemptions that reduce your taxable income:

- **Single**: $2,775
- **Married Filing Jointly**: $5,550
- **Head of Household**: $2,775
- **Additional dependent**: $2,775 each

These exemptions are subtracted from your income before the 4.95% rate is applied.

## How Illinois Tax Is Calculated

1. Start with your federal adjusted gross income (AGI)
2. Add back certain federal deductions (Illinois doesn't allow them)
3. Subtract Illinois personal exemptions
4. Apply the 4.95% flat rate
5. Subtract any tax credits

**Example**: A single filer with $80,000 in federal AGI:
- Taxable income: $80,000 − $2,775 = $77,225
- Illinois tax: $77,225 × 4.95% = **$3,822.64**

## Property Taxes in Illinois

While Illinois has a modest income tax rate, it has some of the highest property taxes in the nation. The average effective property tax rate in Illinois is approximately 2.08% of a home's value — the second-highest in the U.S. after New Jersey.

Cook County (Chicago) uses a classification system where residential properties are assessed at 10% of market value, while commercial properties are assessed at 25%.

## Sales Tax

Illinois has a base state sales tax rate of 6.25%, but local additions can push the total rate much higher:
- **Chicago**: 10.25% (combined state + county + city)
- **Some suburban areas**: 8.5%–10%

Groceries are taxed at a reduced rate of 1%, and prescription medications are exempt.

## Comparison to Neighboring States

| State | Income Tax Rate | Avg. Property Tax Rate |
|-------|----------------|----------------------|
| Illinois | 4.95% (flat) | 2.08% |
| Indiana | 3.05% (flat) | 0.82% |
| Wisconsin | 3.50%–7.65% (progressive) | 1.73% |
| Iowa | 5.70% (flat, phasing to 3.9%) | 1.53% |
| Missouri | 4.95% (top rate, progressive) | 0.97% |
| Kentucky | 4.0% (flat) | 0.82% |

## Key Takeaways

1. **Flat tax simplicity**: Illinois' flat 4.95% rate makes tax calculation straightforward, but it means lower-income residents pay the same rate as high earners.

2. **Property tax burden**: The real tax burden in Illinois often comes from property taxes, not income taxes.

3. **Retirement income**: Illinois does **not** tax retirement income, including Social Security, pensions, 401(k), and IRA distributions — a significant advantage for retirees.

4. **No local income tax**: Unlike some states with city or county income taxes, Illinois only has the state-level income tax.

Use our **Illinois paycheck calculator** to see your exact take-home pay after all Illinois taxes and deductions.`
  },
  {
    title: 'Why Texas Has No Income Tax',
    slug: 'why-texas-has-no-income-tax',
    excerpt: 'How Texas funds its government without a personal income tax, and what it means for residents in terms of property taxes and overall tax burden.',
    category: 'state-tax',
    tags: 'texas,no income tax,property tax,state tax,2026',
    published: true,
    featured: false,
    metaTitle: 'Why Texas Has No Income Tax | TaxYield.io',
    metaDesc: 'Discover how Texas operates without a personal income tax, the trade-offs in higher property taxes, and the overall tax burden for Texas residents.',
    content: `# Why Texas Has No Income Tax

Texas is one of nine U.S. states that levies no personal income tax. This is a major draw for individuals and businesses considering relocation. But how does the state fund its operations, and what are the trade-offs?

## The Constitutional Prohibition

Texas' lack of income tax isn't just policy — it's constitutional. The Texas Constitution explicitly prohibits the state from levying a personal income tax. To enact one would require a constitutional amendment, which demands a two-thirds vote in both legislative chambers AND approval by Texas voters in a statewide referendum.

In 2019, Texas voters approved a constitutional amendment (SJR 22) that made it even harder to implement an income tax. The amendment raised the threshold from a simple majority to a two-thirds vote of the electorate, making an income tax virtually impossible to implement.

## How Texas Funds Government

Without income tax revenue, Texas relies heavily on other sources:

### 1. Sales Tax (Primary Revenue Source)
- State sales tax rate: **6.25%**
- Local additions can push the total to **8.25%**
- Texas has one of the highest combined sales tax rates nationally
- Sales tax accounts for roughly 55-60% of state tax revenue

### 2. Property Taxes
- No state property tax, but local jurisdictions levy property taxes
- Average effective property tax rate: **1.60%** of home value
- Among the highest in the nation
- Funds schools, counties, cities, and special districts

### 3. Franchise Tax (Business Tax)
- Texas levies a "franchise tax" on businesses
- Rates range from 0.331% to 0.75% of margins
- Sometimes called the "margins tax"

### 4. Severance Taxes
- Taxes on oil and gas production
- Significant revenue source due to Texas' massive energy industry
- Oil production tax: 4.6% of market value
- Natural gas production tax: 7.5% of market value

## The Trade-Off: Higher Property Taxes

The absence of income tax doesn't mean Texans pay less tax overall. The state compensates through:

- **Property taxes**: Texas has the 6th highest effective property tax rate in the U.S.
- **Sales taxes**: The combined rate is among the top 15 states
- **Fees and surcharges**: Higher vehicle registration, hotel occupancy taxes, etc.

For a homeowner with a $350,000 home, annual property taxes could easily exceed $5,600 (at a 1.6% effective rate). This is significantly more than what many states with income taxes charge.

## Who Benefits Most?

Texas' tax structure is most beneficial for:

1. **High-income earners**: Someone earning $500,000+ saves thousands compared to states like California (13.3% top rate) or New York (10.9% top rate).

2. **Retirees**: No tax on retirement income, Social Security, pensions, or investment income.

3. **Renters**: Without property taxes directly, renters benefit from the no-income-tax environment.

4. **Business owners**: The franchise tax is generally lower than corporate income taxes in other states.

## Who Benefits Least?

1. **Low-income families**: Sales taxes are regressive — they consume a larger share of low-income household budgets.

2. **Homeowners with modest incomes**: High property taxes can strain budgets, especially for those on fixed incomes.

3. **Families needing services**: Texas' tax structure sometimes results in lower spending on public services, education, and infrastructure.

## Bottom Line

Texas' no-income-tax status is a genuine advantage for many, but it's not a free lunch. The total tax burden depends on your income level, homeownership status, and spending patterns. Use our **Texas paycheck calculator** to see exactly how much more take-home pay you'd have in Texas compared to your current state.`
  },
  {
    title: 'Florida vs Texas Tax Comparison',
    slug: 'florida-vs-texas-tax-comparison',
    excerpt: 'A detailed comparison of the tax structures in Florida and Texas — two of the most popular no-income-tax states for relocation.',
    category: 'comparison',
    tags: 'florida,texas,tax comparison,no income tax,relocation',
    published: true,
    featured: true,
    metaTitle: 'Florida vs Texas Tax Comparison 2026 | TaxYield.io',
    metaDesc: 'Compare Florida and Texas tax structures: income tax, property tax, sales tax, and overall tax burden. Find out which no-income-tax state is better for you.',
    content: `# Florida vs Texas Tax Comparison

Florida and Texas are the two most popular states for Americans seeking to escape state income taxes. Both states levy $0 in personal income tax, but their overall tax structures differ significantly. Here's an in-depth comparison to help you decide which state might be better for your financial situation.

## Income Tax: Tied at Zero

Both Florida and Texas have **no personal income tax**. This means:
- No state tax on wages, salaries, or self-employment income
- No state tax on investment income, dividends, or capital gains
- No state tax on retirement distributions (401k, IRA, pension)

**Winner: Tie** — Both states are equally attractive from an income tax perspective.

## Property Taxes: Florida Wins

Property taxes are where the biggest difference emerges:

| Metric | Florida | Texas |
|--------|---------|-------|
| Avg. Effective Rate | 0.86% | 1.60% |
| Annual Tax on $350K Home | ~$3,010 | ~$5,600 |
| Homestead Exemption | Yes ($25,000–$50,000) | No state exemption |
| Assessment Cap | Yes (3% annual max increase) | No cap (10% appraisal cap in some areas) |

Florida's **Save Our Homes** cap limits annual assessment increases on homesteaded properties to 3% or the CPI, whichever is less. Texas has no equivalent cap, meaning property tax bills can jump significantly when home values rise.

**Winner: Florida** — Significantly lower property taxes and better homeowner protections.

## Sales Taxes: Texas Wins

| Metric | Florida | Texas |
|--------|---------|-------|
| State Rate | 6.00% | 6.25% |
| Max Combined Rate | 8.50% | 8.25% |
| Average Combined Rate | 7.02% | 8.19% |
| Grocery Tax | Exempt | Exempt |
| Clothing Tax | Taxed | Taxed |

**Winner: Texas** — Slightly lower combined sales tax rates on average.

## Other Taxes and Fees

### Florida-Specific
- **Intangible tax**: 0.002% on certain investments (very minimal)
- **Documentary stamp tax**: $0.70 per $100 on real estate transfers
- **Tourist development tax**: 6% on short-term rentals
- **No franchise tax** on most small businesses

### Texas-Specific
- **Franchise tax**: 0.331%–0.75% on business margins
- **Vehicle sales tax**: 6.25% (same as general sales tax)
- **No state property tax** — all property taxes are local

## Cost of Living Comparison

| Category | Florida | Texas |
|----------|---------|-------|
| Median Home Price | $390,000 | $305,000 |
| Homeowners Insurance | Very High (hurricane risk) | Moderate |
| HOA Fees | Often High | Moderate |
| Utilities | Moderate (AC) | Moderate (AC) |

Florida's homeowners insurance costs are among the highest in the nation due to hurricane risk, which can add $3,000–$6,000+ annually compared to Texas.

## Overall Tax Burden Examples

### Example 1: Single Earner, $100,000 Income
- **Florida**: ~$3,200 in property tax (median home) + ~$2,100 in sales tax = **~$5,300**
- **Texas**: ~$5,600 in property tax (median home) + ~$2,800 in sales tax = **~$8,400**

### Example 2: Family, $200,000 Income, $500,000 Home
- **Florida**: ~$4,300 in property tax + ~$3,500 in sales tax + high insurance = **~$11,000+**
- **Texas**: ~$8,000 in property tax + ~$4,200 in sales tax + moderate insurance = **~$12,800**

## Verdict

- **Choose Florida if**: You're a homeowner who values property tax stability, a retiree (no tax on any income), or you prefer coastal living with the homestead exemption protections.

- **Choose Texas if**: You rent (avoiding property taxes entirely), you want a lower cost of housing, or you're a business owner who can navigate the franchise tax efficiently.

Both states offer tremendous tax savings compared to high-tax states like California, New York, or Illinois. Use our **relocation calculator** to see your personalized savings from moving to either state.`
  },
  {
    title: 'How FICA Taxes Work in 2026',
    slug: 'how-fica-taxes-work-2026',
    excerpt: 'Understanding FICA taxes (Social Security and Medicare) in 2026 — what you pay, what your employer pays, and how self-employment tax differs.',
    category: 'tax-guide',
    tags: 'FICA,social security,medicare,payroll tax,2026',
    published: true,
    featured: false,
    metaTitle: 'How FICA Taxes Work in 2026 | TaxYield.io',
    metaDesc: 'Complete guide to FICA taxes in 2026. Understand Social Security and Medicare withholding, wage bases, and self-employment tax calculations.',
    content: `# How FICA Taxes Work in 2026

FICA (Federal Insurance Contributions Act) taxes are mandatory payroll taxes that fund Social Security and Medicare. Every employee in the United States pays FICA taxes, and understanding them is crucial for accurate paycheck planning.

## The Two Components of FICA

### 1. Social Security Tax (OASDI)
- **Employee rate**: 6.2% of wages
- **Employer rate**: 6.2% of wages
- **Wage base limit**: $176,100 for 2026
- Only wages up to the base limit are subject to Social Security tax

Once you earn more than $176,100 in 2026, no additional Social Security tax is withheld for the rest of the year. This creates an interesting effect where high earners effectively pay a lower total FICA rate.

### 2. Medicare Tax
- **Employee rate**: 1.45% of wages
- **Employer rate**: 1.45% of wages
- **No wage base limit**: All wages are subject to Medicare tax
- **Additional Medicare Tax**: 0.9% on wages over $200,000 (employee only)

Unlike Social Security, there's no cap on Medicare tax. Every dollar you earn is subject to the 1.45% Medicare tax, and high earners pay an additional 0.9% on wages above $200,000.

## Total FICA Tax Rates

| Income Level | Employee Share | Employer Share | Total |
|-------------|---------------|----------------|-------|
| Below $176,100 | 7.65% | 7.65% | 15.30% |
| $176,100 – $200,000 | 1.45% | 1.45% | 2.90% |
| Above $200,000 | 2.35% | 1.45% | 3.80% |

## FICA Calculation Examples

### Example 1: $80,000 Annual Salary
- Social Security: $80,000 × 6.2% = $4,960
- Medicare: $80,000 × 1.45% = $1,160
- **Total employee FICA: $6,120**
- Employer matches: $6,120
- **Total FICA contribution: $12,240**

### Example 2: $250,000 Annual Salary
- Social Security: $176,100 × 6.2% = $10,918.20
- Medicare: $250,000 × 1.45% = $3,625.00
- Additional Medicare: ($250,000 − $200,000) × 0.9% = $450.00
- **Total employee FICA: $14,993.20**
- Employer pays: $10,918.20 + $3,625.00 = $14,543.20
- **Total FICA contribution: $29,536.40**

## Self-Employment Tax

If you're self-employed, you pay **both** the employee and employer shares of FICA, known as **self-employment tax**:

- **Social Security**: 12.4% (6.2% × 2)
- **Medicare**: 2.9% (1.45% × 2)
- **Additional Medicare**: 0.9% on earnings over $200,000
- **Total self-employment tax**: 15.3% on earnings up to $176,100

### The 50% Deduction
Self-employed individuals can deduct half of their self-employment tax when calculating adjusted gross income. This effectively reduces the impact:

- Pay 15.3% in SE tax
- Deduct 7.65% from taxable income
- Net effective rate is lower than the full 15.3%

## Important FICA Facts

1. **No exemptions**: Nearly all earned income is subject to FICA. There are very few exceptions.

2. **FICA is not income tax**: FICA taxes are separate from federal income tax. You pay both.

3. **Wage base increases annually**: The Social Security wage base is adjusted each year for inflation. It was $160,200 in 2023, $168,600 in 2024, and $176,100 in 2026.

4. **Benefits are earned**: Your Social Security benefit in retirement is based on your 35 highest-earning years of FICA contributions.

5. **Employer matching is real money**: The 7.65% employer match is part of your total compensation, even though you never see it in your paycheck.

Use our **paycheck calculator** to see exactly how much FICA tax is withheld from your paycheck and how it affects your take-home pay.`
  },
];

// --- Seed data: Ad slots ---

const adSlots = [
  {
    name: 'Header Banner',
    position: 'header-banner',
    adType: 'adsense',
    adCode: '<!-- AdSense header banner -->',
    isActive: true,
  },
  {
    name: 'After Calculator',
    position: 'after-calculator',
    adType: 'adsense',
    adCode: '<!-- AdSense after calculator -->',
    isActive: true,
  },
  {
    name: 'Sidebar',
    position: 'sidebar',
    adType: 'adsense',
    adCode: '<!-- AdSense sidebar -->',
    isActive: true,
  },
  {
    name: 'Footer Banner',
    position: 'footer-banner',
    adType: 'adsense',
    adCode: '<!-- AdSense footer banner -->',
    isActive: false,
  },
];

// --- Seed data: Site settings ---

const siteSettings = [
  {
    key: 'site_name',
    value: 'TaxYield.io',
  },
  {
    key: 'site_description',
    value: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning. Accurate, up-to-date tax information for all 50 states.',
  },
  {
    key: 'ga_tracking_id',
    value: '',
  },
];

// --- Seed data: External links ---

const externalLinks = [
  {
    label: 'IRS Official Website',
    url: 'https://www.irs.gov',
    category: 'government',
    isActive: true,
    sortOrder: 1,
  },
  {
    label: 'Tax Foundation',
    url: 'https://taxfoundation.org',
    category: 'resource',
    isActive: true,
    sortOrder: 2,
  },
  {
    label: 'Illinois Department of Revenue',
    url: 'https://www2.illinois.gov/rev',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 3,
  },
  {
    label: 'Texas Comptroller of Public Accounts',
    url: 'https://comptroller.texas.gov',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 4,
  },
  {
    label: 'Florida Department of Revenue',
    url: 'https://floridarevenue.com',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 5,
  },
  {
    label: 'California Franchise Tax Board',
    url: 'https://www.ftb.ca.gov',
    category: 'state-revenue',
    isActive: true,
    sortOrder: 6,
  },
];

export async function POST() {
  try {
    const results = {
      posts: { created: 0, skipped: 0 },
      ads: { created: 0, skipped: 0 },
      settings: { created: 0, skipped: 0 },
      links: { created: 0, skipped: 0 },
    };

    // Seed blog posts (check by slug)
    for (const postData of blogPosts) {
      const existing = await db.post.findUnique({ where: { slug: postData.slug } });
      if (existing) {
        results.posts.skipped++;
      } else {
        await db.post.create({ data: postData });
        results.posts.created++;
      }
    }

    // Seed ad slots (check by position)
    for (const adData of adSlots) {
      const existing = await db.adSlot.findUnique({ where: { position: adData.position } });
      if (existing) {
        results.ads.skipped++;
      } else {
        await db.adSlot.create({ data: adData });
        results.ads.created++;
      }
    }

    // Seed site settings (check by key)
    for (const settingData of siteSettings) {
      const existing = await db.siteSetting.findUnique({ where: { key: settingData.key } });
      if (existing) {
        results.settings.skipped++;
      } else {
        await db.siteSetting.create({ data: settingData });
        results.settings.created++;
      }
    }

    // Seed external links (check by url)
    for (const linkData of externalLinks) {
      const existing = await db.externalLink.findFirst({ where: { url: linkData.url } });
      if (existing) {
        results.links.skipped++;
      } else {
        await db.externalLink.create({ data: linkData });
        results.links.created++;
      }
    }

    return NextResponse.json({
      message: 'Seed completed successfully',
      results,
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
