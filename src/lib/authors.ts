/**
 * Author profiles for YMYL / E-E-A-T compliance.
 *
 * All content on TheTaxCalc is researched and maintained by a single
 * editorial team. We do NOT use named persona authors with professional
 * credentials (CPA/EA/CFP) — every calculation is instead verified
 * directly against primary sources (IRS publications and state revenue
 * department figures), which is documented on /methodology and /about.
 *
 * These profiles are used in:
 *   1. JSON-LD schema (structured data)
 *   2. Author bio cards on calculator and blog pages
 *   3. Metadata authors array
 */

import { SITE_URL } from './site-config';

// ─── Author Interface ──────────────────────────────────────────────────────

export interface AuthorProfile {
  id: string;
  name: string;
  title: string;
  credentials: string; // empty string = no badge rendered
  bio: string;
  url: string;        // author page URL
  sameAs: string[];   // social / professional profiles
  initials: string;   // avatar fallback
  image?: string;     // headshot URL (unused for team entities)
  knowsAbout: string[];
  worksFor: {
    name: string;
    url: string;
  };
}

// ─── Author Definitions ────────────────────────────────────────────────────

const EDITORIAL_TEAM: AuthorProfile = {
  id: 'editorial-team',
  name: 'TheTaxCalc Editorial Team',
  title: 'Editorial Team',
  credentials: '',
  bio: 'TheTaxCalc Editorial Team researches and maintains every calculator and guide on this site. All federal rates, brackets, and rules are verified directly against IRS publications (including Publication 15-T and the annual inflation adjustments), and every state figure is checked against that state revenue department\'s official documentation. Tax data is updated within days of official changes — see our methodology page for sources and the full update history.',
  url: `${SITE_URL}/about#editorial-team`,
  sameAs: [],
  initials: 'TC',
  knowsAbout: [
    'Federal Income Tax',
    'State Income Tax',
    'FICA Tax',
    'Payroll Tax',
    'IRS Compliance',
    'Tax Planning',
    'Multi-State Taxation',
    'Tax-Advantaged Accounts',
    'Self-Employment Tax',
    'Estimated Tax Payments',
    'Retirement Planning',
    'Capital Gains Tax',
  ],
  worksFor: {
    name: 'TheTaxCalc',
    url: SITE_URL,
  },
};

export const AUTHORS: Record<string, AuthorProfile> = {
  'editorial-team': EDITORIAL_TEAM,
};

// Legacy persona IDs were passed as <AuthorBioCard authorId="..."> props
// across pages built before the editorial-team refactor (Task 48). They all
// resolve to the single team profile so no caller breaks.
const LEGACY_AUTHOR_IDS = ['rachel-mitchell', 'david-chen', 'sarah-johnson'];

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Get an author profile by ID (legacy persona IDs resolve to the team) */
export function getAuthor(id: string): AuthorProfile | undefined {
  if (AUTHORS[id]) return AUTHORS[id];
  if (LEGACY_AUTHOR_IDS.includes(id)) return EDITORIAL_TEAM;
  return undefined;
}

/** Get the primary author for calculator pages */
export function getCalculatorAuthor(): AuthorProfile {
  return EDITORIAL_TEAM;
}

/** Get the primary author for self-employment / 1099 content */
export function getSelfEmploymentAuthor(): AuthorProfile {
  return EDITORIAL_TEAM;
}

/** Get the primary author for retirement / investment content */
export function getRetirementAuthor(): AuthorProfile {
  return EDITORIAL_TEAM;
}

/** Map calculator type → author (single editorial team) */
export function getAuthorForCalculator(_calculatorType: string): AuthorProfile {
  return EDITORIAL_TEAM;
}

// ─── JSON-LD Schema Generator ──────────────────────────────────────────────

export function authorToJsonLd(author: AuthorProfile) {
  const schema: Record<string, unknown> = {
    '@type': 'Organization' as const,
    name: author.name,
    url: author.url,
    description: author.bio,
    knowsAbout: author.knowsAbout,
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
