export interface BlogPostMeta {
  id: string; title: string; slug: string; excerpt: string;
  category: string; tags: string; coverImage: string;
  published: boolean; featured: boolean; metaTitle: string; metaDesc: string;
  createdAt: string; updatedAt: string;
}

/** Full blog post including content — independent of any DB client */
export interface BlogPost {
  id: string; title: string; slug: string; excerpt: string;
  content: string; category: string; tags: string; coverImage: string;
  published: boolean; featured: boolean; metaTitle: string; metaDesc: string;
  createdAt: string; updatedAt: string;
}

export const BLOG_INDEX: BlogPostMeta[] = [
  {
    "id": "1099-tax-guide-self-employed-2026",
    "title": "1099 Taxes: How Much Freelancers Really Owe in 2026",
    "slug": "1099-tax-guide-self-employed-2026",
    "excerpt": "The complete guide to 1099 taxes for self-employed freelancers and contractors in 2026. Learn how to calculate your tax bill, maximize deductions, and avoid penalties.",
    "category": "tax-guide",
    "tags": "1099,self-employed,freelancer,tax calculator,contractor,quarterly taxes,tax deductions",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "1099 Taxes 2026: How Much Freelancers Pay",
    "metaDesc": "Guide to 1099 taxes for self-employed workers in 2026. Calculate your tax bill, find deductions, and learn quarterly payment deadlines.",
    "createdAt": "2026-05-28T12:00:00.000Z",
    "updatedAt": "2026-05-28T12:00:00.000Z"
  },
  {
    "id": "cmpmabv3i0000mnivco81phfw",
    "title": "2026 Federal Tax Brackets Explained",
    "slug": "2026-federal-tax-brackets-explained",
    "excerpt": "Complete guide to the 2026 federal income tax brackets, standard deductions, and how to calculate your effective tax rate.",
    "category": "tax-guide",
    "tags": "federal,tax brackets,2026,income tax",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "2026 Federal Tax Brackets Explained",
    "metaDesc": "Understand the 2026 federal income tax brackets, marginal vs effective rates, and standard deductions. Complete guide with examples.",
    "createdAt": "2026-05-26T06:59:34.062Z",
    "updatedAt": "2026-05-26T20:31:33.161Z"
  },
  {
    "id": "doordash-taxes-2026-guide",
    "title": "DoorDash Taxes: The Complete Guide for Drivers in 2026",
    "slug": "doordash-taxes-guide-2026",
    "excerpt": "Everything DoorDash drivers need to know about taxes in 2026 — how much you'll pay, what deductions to claim, and how to avoid surprise tax bills.",
    "category": "tax-guide",
    "tags": "doordash,taxes,gig economy,self-employed,1099,delivery driver,quarterly taxes",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "DoorDash Taxes 2026: Driver Guide",
    "metaDesc": "DoorDash driver taxes for 2026. Self-employment tax, mileage deductions, quarterly payments, and filing tips for gig workers.",
    "createdAt": "2026-05-28T12:00:00.000Z",
    "updatedAt": "2026-05-28T12:00:00.000Z"
  },
  {
    "id": "cmpmabv3p0003mniv5b5v1cu7",
    "title": "Florida vs Texas Tax Comparison",
    "slug": "florida-vs-texas-tax-comparison",
    "excerpt": "A detailed comparison of the tax structures in Florida and Texas — two of the most popular no-income-tax states for relocation.",
    "category": "comparison",
    "tags": "florida,texas,tax comparison,no income tax,relocation",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "Florida vs Texas Tax Comparison 2026",
    "metaDesc": "Compare Florida and Texas tax structures: income tax, property tax, sales tax, and overall burden. Which no-income-tax state is better?",
    "createdAt": "2026-05-26T06:59:34.069Z",
    "updatedAt": "2026-05-26T20:31:33.169Z"
  },
  {
    "id": "cmpmabv3r0004mnivwdb8kqr5",
    "title": "How FICA Taxes Work in 2026",
    "slug": "how-fica-taxes-work-2026",
    "excerpt": "Understanding FICA taxes (Social Security and Medicare) in 2026 — what you pay, what your employer pays, and how self-employment tax differs.",
    "category": "tax-guide",
    "tags": "FICA,social security,medicare,payroll tax,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "How FICA Taxes Work 2026 — Full Guide",
    "metaDesc": "Complete guide to FICA taxes in 2026. Social Security and Medicare withholding, wage bases, and self-employment tax rules.",
    "createdAt": "2026-05-26T06:59:34.072Z",
    "updatedAt": "2026-05-26T20:31:33.172Z"
  },
  {
    "id": "cmpmabv3k0001mnivxj3jkk2j",
    "title": "Illinois Income Tax Guide 2026",
    "slug": "illinois-income-tax-guide-2026",
    "excerpt": "Everything you need to know about Illinois income tax in 2026, including the flat tax rate, personal exemptions, and how it compares to neighboring states.",
    "category": "state-tax",
    "tags": "illinois,income tax,flat tax,2026,state tax",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "Illinois Income Tax 2026 — 4.95% Guide",
    "metaDesc": "Complete guide to Illinois income tax for 2026. Flat rate, personal exemptions, property taxes, and neighboring state comparison.",
    "createdAt": "2026-05-26T06:59:34.065Z",
    "updatedAt": "2026-05-26T20:31:33.164Z"
  },
  {
    "id": "sep-ira-solo-401k-2026-guide",
    "title": "SEP IRA vs Solo 401k: Best for Self-Employed in 2026",
    "slug": "sep-ira-solo-401k-guide-2026",
    "excerpt": "Complete comparison of SEP IRA and Solo 401k contribution limits, rules, and tax benefits for self-employed workers in 2026. Find out which retirement plan saves you more.",
    "category": "tax-guide",
    "tags": "sep ira,solo 401k,retirement,self-employed,contribution limits,tax deduction,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "SEP IRA vs Solo 401k: Comparison 2026",
    "metaDesc": "SEP IRA vs Solo 401k for 2026: contribution limits, tax deductions, eligibility, and which is better for self-employed workers.",
    "createdAt": "2026-05-28T12:00:00.000Z",
    "updatedAt": "2026-05-28T12:00:00.000Z"
  },
  {
    "id": "cmpmabv3n0002mniv8xzlrfmn",
    "title": "Why Texas Has No Income Tax",
    "slug": "why-texas-has-no-income-tax",
    "excerpt": "How Texas funds its government without a personal income tax, and what it means for residents in terms of property taxes and overall tax burden.",
    "category": "state-tax",
    "tags": "texas,no income tax,property tax,state tax,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "Why Texas Has No Income Tax — Full Breakdown",
    "metaDesc": "How Texas funds government without personal income tax, higher property tax trade-offs, and the overall tax burden for residents.",
    "createdAt": "2026-05-26T06:59:34.067Z",
    "updatedAt": "2026-05-26T20:31:33.167Z"
  },
  {
    "id": "sales-tax-by-state-guide-2026",
    "title": "Sales Tax by State: Complete Guide to US Tax Rates in 2026",
    "slug": "sales-tax-by-state-guide-2026",
    "excerpt": "Complete guide to sales tax rates for all 50 US states in 2026. State rates, local rates, combined rates, tax-exempt items, and how to calculate sales tax. Free calculator included.",
    "category": "tax-guide",
    "tags": "sales tax,state sales tax,sales tax rates,sales tax calculator,tax by state,2026",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "Sales Tax by State 2026: Complete Rate Guide",
    "metaDesc": "Complete guide to sales tax rates for all 50 US states in 2026. State rates, local rates, combined rates, and tax-exempt items. Free calculator included.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  {
    "id": "no-tax-on-overtime-guide-2026",
    "title": "No Tax on Overtime: How the New Law Saves You Money (2025–2028)",
    "slug": "no-tax-on-overtime-guide-2026",
    "excerpt": "Complete guide to the No Tax on Overtime law for 2025-2028. Calculate your savings, understand eligibility, and see how FICA and state taxes still apply. Free calculator.",
    "category": "tax-guide",
    "tags": "no tax on overtime,overtime tax exemption,overtime pay,OT tax savings,trump tax law,2026",
    "coverImage": "",
    "published": true,
    "featured": true,
    "metaTitle": "No Tax on Overtime 2025-2028: Complete Guide",
    "metaDesc": "Complete guide to the No Tax on Overtime law for 2025-2028. Calculate your savings, understand eligibility, and see how FICA and state taxes still apply.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  {
    "id": "how-bonuses-are-taxed-2026",
    "title": "How Are Bonuses Taxed in 2026? The 22% Flat Rate Explained",
    "slug": "how-bonuses-are-taxed-2026",
    "excerpt": "Complete guide to bonus taxation in 2026. Understand the 22% flat rate vs aggregate method, FICA on bonuses, and state taxes. Free bonus tax calculator.",
    "category": "tax-guide",
    "tags": "bonus tax,supplemental wage tax,22% flat rate,aggregate method,bonus calculator,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "Bonus Tax 2026 | 22% Flat vs Aggregate",
    "metaDesc": "Complete guide to bonus taxation in 2026. Understand the 22% flat rate vs aggregate method, FICA on bonuses, and state taxes. Free bonus tax calculator.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  {
    "id": "property-tax-by-state-guide-2026",
    "title": "Property Tax by State: Who Pays the Most (and Least) in 2026",
    "slug": "property-tax-by-state-guide-2026",
    "excerpt": "Complete guide to property tax rates for all 50 US states in 2026. See which states have the highest and lowest property taxes. Free property tax calculator.",
    "category": "tax-guide",
    "tags": "property tax,property tax rates,home tax,real estate tax,tax by state,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "Property Tax by State 2026 | 50 State Rates",
    "metaDesc": "Complete guide to property tax rates for all 50 US states in 2026. See which states have the highest and lowest property taxes. Free property tax calculator.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  {
    "id": "lottery-tax-guide-2026",
    "title": "Lottery Tax: How Much You Really Keep After Winning in 2026",
    "slug": "lottery-tax-guide-2026",
    "excerpt": "Complete guide to lottery taxes in 2026. Federal tax, state tax, lump sum vs annuity, and how much you actually keep. Free lottery tax calculator.",
    "category": "tax-guide",
    "tags": "lottery tax,lottery winnings tax,mega millions tax,powerball tax,gambling tax,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "Lottery Tax 2026 | After-Tax Winnings",
    "metaDesc": "Complete guide to lottery taxes in 2026. Federal tax, state tax, lump sum vs annuity, and how much you actually keep. Free lottery tax calculator.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  },
  {
    "id": "irs-withholding-w4-guide-2026",
    "title": "IRS Withholding 2026: How to Fill Out Your W-4 and Avoid Surprises",
    "slug": "irs-withholding-w4-guide-2026",
    "excerpt": "Complete guide to IRS withholding and W-4 form for 2026. Calculate your recommended withholding, optimize your paycheck, and avoid tax surprises. Free calculator.",
    "category": "tax-guide",
    "tags": "irs withholding,w-4 form,federal withholding,paycheck withholding,tax withholding calculator,2026",
    "coverImage": "",
    "published": true,
    "featured": false,
    "metaTitle": "IRS Withholding & W-4 Guide 2026",
    "metaDesc": "Complete guide to IRS withholding and W-4 form for 2026. Calculate your recommended withholding, optimize your paycheck, and avoid tax surprises.",
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  }
];

/** Get all published posts metadata */
export function getPublishedPostsMeta(): BlogPostMeta[] {
  return BLOG_INDEX.filter(p => p.published).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/** Get a single post metadata by slug */
export function getPostMeta(slug: string): BlogPostMeta | null {
  return BLOG_INDEX.find(p => p.slug === slug && p.published) || null;
}

/** Get all published slugs */
export function getPublishedSlugs(): string[] {
  return BLOG_INDEX.filter(p => p.published).map(p => p.slug);
}

/** Convert BlogPostMeta to BlogPost with empty content */
export function metaToPost(meta: BlogPostMeta): BlogPost {
  return { ...meta, content: "" };
}
