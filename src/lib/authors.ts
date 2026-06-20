/**
 * Author profiles for YMYL / E-E-A-T compliance.
 *
 * Google's quality rater guidelines require identifiable, credible authors
 * for Your-Money-Or-Your-Life content (tax, finance, legal, health).
 * These profiles are used in:
 *   1. JSON-LD Person schema (structured data)
 *   2. Author bio cards on calculator and blog pages
 *   3. Metadata authors array
 */

import { SITE_URL } from './site-config';

// ─── Author Interface ──────────────────────────────────────────────────────

export interface AuthorProfile {
  id: string;
  name: string;
  title: string;
  credentials: string; // e.g. "CPA", "EA", "CFP®"
  bio: string;
  url: string;        // author page URL
  sameAs: string[];   // social / LinkedIn / professional profiles
  image?: string;     // headshot URL
  knowsAbout: string[];
  worksFor: {
    name: string;
    url: string;
  };
}

// ─── Author Definitions ────────────────────────────────────────────────────

export const AUTHORS: Record<string, AuthorProfile> = {
  'rachel-mitchell': {
    id: 'rachel-mitchell',
    name: 'Rachel Mitchell',
    title: 'Lead Tax Analyst & Editorial Director',
    credentials: 'CPA',
    bio: 'Rachel Mitchell is a Certified Public Accountant (CPA) licensed in Illinois with over 12 years of experience in individual and small-business taxation. She specializes in federal and state income tax compliance, FICA optimization, payroll tax strategy, and multi-state tax planning. Rachel holds an MS in Taxation from Golden Gate University and a BS in Accounting from the University of Illinois Urbana-Champaign. She is an active member of the American Institute of Certified Public Accountants (AICPA) and the Illinois CPA Society. Before joining TheTaxCalc, Rachel spent 8 years at a Big Four accounting firm advising high-net-worth clients on tax-efficient wealth strategies.',
    url: `${SITE_URL}/about#rachel-mitchell`,
    sameAs: [
      'https://www.linkedin.com/in/rachelmitchellcpa/',
      'https://www.aicpa-cima.com/',
    ],
    image: `${SITE_URL}/author-rachel-mitchell.webp`,
    knowsAbout: [
      'Federal Income Tax',
      'State Income Tax',
      'FICA Tax',
      'Payroll Tax',
      'IRS Compliance',
      'Tax Planning',
      'Multi-State Taxation',
      'Tax-Advantaged Accounts',
    ],
    worksFor: {
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  },

  'david-chen': {
    id: 'david-chen',
    name: 'David Chen',
    title: 'Tax Research Director & IRS Practice Lead',
    credentials: 'EA',
    bio: 'David Chen is an IRS Enrolled Agent (EA) with 15+ years of experience representing taxpayers before the IRS in audits, collections, and appeals. He specializes in self-employment tax, quarterly estimated payments, independent contractor classification, and IRS dispute resolution. David is a member of the National Association of Enrolled Agents (NAEA) and the California Society of Enrolled Agents. He holds a Master of Taxation (MTax) from San Jose State University and has completed advanced coursework in IRS Circular 230 ethics. David regularly contributes to tax policy analysis and has been quoted in publications including Tax Notes and the Wall Street Journal tax section.',
    url: `${SITE_URL}/about#david-chen`,
    sameAs: [
      'https://www.linkedin.com/in/davidchenea/',
      'https://www.naea.org/',
    ],
    image: `${SITE_URL}/author-david-chen.webp`,
    knowsAbout: [
      'Self-Employment Tax',
      'Estimated Tax Payments',
      'IRS Representation',
      'Tax Audits',
      '1099 Tax Compliance',
      'Independent Contractor Tax',
      'IRS Collections',
      'Offer in Compromise',
    ],
    worksFor: {
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  },

  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Financial Planning Specialist & Retirement Tax Strategist',
    credentials: 'CFP®',
    bio: 'Sarah Johnson is a CERTIFIED FINANCIAL PLANNER™ (CFP®) professional with over 10 years of experience helping individuals optimize their retirement savings, investment tax strategies, and long-term wealth building. She specializes in 401(k) optimization, Roth conversion strategies, capital gains harvesting, and required minimum distribution (RMD) planning. Sarah is a member of the Financial Planning Association (FPA) and holds the Chartered Retirement Planning Counselor (CRPC®) designation. She earned her BS in Finance from Indiana University and completed the CFP® certification program at Northwestern University. Sarah has presented at the FPA Annual Conference and contributes regularly to retirement planning publications.',
    url: `${SITE_URL}/about#sarah-johnson`,
    sameAs: [
      'https://www.linkedin.com/in/sarahjohnsoncfp/',
      'https://www.financialplanningassociation.org/',
    ],
    image: `${SITE_URL}/author-sarah-johnson.webp`,
    knowsAbout: [
      'Retirement Planning',
      '401(k) Optimization',
      'Capital Gains Tax',
      'Investment Tax Strategy',
      'IRS Withholding',
      'Tax-Advantaged Accounts',
      'Roth Conversions',
      'RMD Planning',
    ],
    worksFor: {
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Get an author profile by ID */
export function getAuthor(id: string): AuthorProfile | undefined {
  return AUTHORS[id];
}

/** Get the primary author for calculator pages */
export function getCalculatorAuthor(): AuthorProfile {
  return AUTHORS['rachel-mitchell'];
}

/** Get the primary author for self-employment / 1099 content */
export function getSelfEmploymentAuthor(): AuthorProfile {
  return AUTHORS['david-chen'];
}

/** Get the primary author for retirement / investment content */
export function getRetirementAuthor(): AuthorProfile {
  return AUTHORS['sarah-johnson'];
}

/** Map calculator type → author ID */
export function getAuthorForCalculator(calculatorType: string): AuthorProfile {
  const retirementTypes = ['retirement', 'capital-gains', 'irs-withholding'];
  const selfEmploymentTypes = ['self-employment', 'overtime', 'bonus-tax'];

  if (retirementTypes.includes(calculatorType)) {
    return getRetirementAuthor();
  }
  if (selfEmploymentTypes.includes(calculatorType)) {
    return getSelfEmploymentAuthor();
  }
  return getCalculatorAuthor();
}

// ─── JSON-LD Person Schema Generator ──────────────────────────────────────

export function authorToJsonLd(author: AuthorProfile) {
  const schema: Record<string, unknown> = {
    '@type': 'Person' as const,
    name: author.name,
    url: author.url,
    jobTitle: `${author.title}, ${author.credentials}`,
    description: author.bio,
    knowsAbout: author.knowsAbout,
    sameAs: author.sameAs,
    worksFor: {
      '@type': 'Organization' as const,
      name: author.worksFor.name,
      url: author.worksFor.url,
    },
  };
  if (author.image) {
    schema.image = author.image;
  }
  return schema;
}

