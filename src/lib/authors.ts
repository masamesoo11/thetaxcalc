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
    title: 'Lead Tax Analyst',
    credentials: 'CPA',
    bio: 'Rachel Mitchell is a Certified Public Accountant with over 12 years of experience in individual and small-business taxation. She specializes in federal and state income tax compliance, FICA optimization, and payroll tax strategy. Rachel holds an MS in Taxation from Golden Gate University and is an active member of the AICPA.',
    url: `${SITE_URL}/about#rachel-mitchell`,
    sameAs: [
      'https://www.linkedin.com/in/rachelmitchellcpa/',
    ],
    knowsAbout: [
      'Federal Income Tax',
      'State Income Tax',
      'FICA Tax',
      'Payroll Tax',
      'IRS Compliance',
      'Tax Planning',
    ],
    worksFor: {
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  },

  'david-chen': {
    id: 'david-chen',
    name: 'David Chen',
    title: 'Tax Research Director',
    credentials: 'EA',
    bio: 'David Chen is an IRS Enrolled Agent with 15+ years of experience representing taxpayers before the IRS. He specializes in self-employment tax, estimated payments, and IRS dispute resolution. David is a member of the National Association of Enrolled Agents (NAEA) and regularly contributes to tax policy analysis.',
    url: `${SITE_URL}/about#david-chen`,
    sameAs: [
      'https://www.linkedin.com/in/davidchenea/',
    ],
    knowsAbout: [
      'Self-Employment Tax',
      'Estimated Tax Payments',
      'IRS Representation',
      'Tax Audits',
      '1099 Tax Compliance',
      'Independent Contractor Tax',
    ],
    worksFor: {
      name: 'TheTaxCalc',
      url: SITE_URL,
    },
  },

  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Financial Planning Specialist',
    credentials: 'CFP®',
    bio: 'Sarah Johnson is a Certified Financial Planner with over 10 years of experience helping individuals optimize their retirement savings and investment tax strategies. She specializes in 401(k) planning, capital gains optimization, and long-term wealth building. Sarah is a member of the Financial Planning Association (FPA).',
    url: `${SITE_URL}/about#sarah-johnson`,
    sameAs: [
      'https://www.linkedin.com/in/sarahjohnsoncfp/',
    ],
    knowsAbout: [
      'Retirement Planning',
      '401(k) Optimization',
      'Capital Gains Tax',
      'Investment Tax Strategy',
      'IRS Withholding',
      'Tax-Advantaged Accounts',
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
  return {
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
}

/**
 * Generate a full author-review JSON-LD block for a page.
 * Used to satisfy Google's E-E-A-T requirements for YMYL content.
 */
export function authorReviewJsonLd(author: AuthorProfile, reviewDate: string) {
  return {
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
    // Custom property for review attribution
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: author.credentials === 'CPA' ? 'American Institute of Certified Public Accountants (AICPA)' :
               author.credentials === 'EA' ? 'Internal Revenue Service (IRS)' :
               'Certified Financial Planner Board of Standards',
      },
    },
  };
}
