/**
 * Hourly Rate → Annual Salary Calculation Utilities
 * Powers the programmatic SEO pages at /hourly/{rate}-an-hour
 * ("$X an hour is how much a year?").
 *
 * Companion to salary-calculations.ts — take-home math is delegated to
 * calculateSalaryTakeHome (the site's real 2026 tax engine); this module
 * owns the hourly→periodic gross conversions, slug helpers, and the
 * 4-tier content system that differentiates the 26 rate pages.
 *
 * Accuracy rule: every dollar figure rendered anywhere is computed from
 * these helpers or from calculateSalaryTakeHome at render time. The only
 * typed constants in the fleet are the arithmetic factors (2,080-hour
 * work year = 52 weeks × 40 hours, 8-hour day, 20-hour part-time week,
 * 1.5× overtime, 2× double-time) and the $7.25 federal minimum wage.
 */

// ─── The 26 Programmatic SEO Rates ─────────────────────────────────────────────

export const HOURLY_RATES = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 32, 35, 40, 45, 50,
] as const;

export type HourlyRate = (typeof HOURLY_RATES)[number];

// ─── URL Slug Helpers ─────────────────────────────────────────────────────────

/** SEO-friendly slug: /hourly/25-an-hour (no trailing zeros: 22.5 → "22.5-an-hour"). */
export function rateToSlug(rate: number): string {
  return `${String(rate)}-an-hour`;
}

/**
 * Parse a rate slug. Accepts both "25-an-hour" and the legacy bare "25".
 * Returns the number, or null for non-numeric slugs.
 */
export function slugToRate(slug: string): number | null {
  const match = slug.match(/^(\d+(?:\.\d{1,2})?)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (isNaN(num) || num <= 0) return null;
  return num;
}

/** True when the slug is the legacy bare-number pattern (no "-an-hour" suffix). */
export function isLegacyRateSlug(slug: string): boolean {
  return /^\d+(?:\.\d{1,2})?$/.test(slug);
}

/** On-demand rendering range — anything from $5 to $500 an hour gets a page. */
export function isValidHourlyRate(rate: number): boolean {
  return rate >= 5 && rate <= 500;
}

// ─── Format Helpers ───────────────────────────────────────────────────────────

/** "$25" for whole rates, "$22.50" for fractional ones. */
export function formatRate(rate: number): string {
  return Number.isInteger(rate) ? `$${rate.toLocaleString('en-US')}` : `$${rate.toFixed(2)}`;
}

// ─── Gross Conversion Engine ──────────────────────────────────────────────────

export const HOURS_PER_YEAR_FULL_TIME = 2080; // 52 weeks × 40 hours
export const STANDARD_HOURS_PER_WEEK = 40;
export const PART_TIME_HOURS_PER_WEEK = 20;
export const STANDARD_DAY_HOURS = 8;
export const OVERTIME_MULTIPLIER = 1.5;
export const DOUBLE_TIME_MULTIPLIER = 2;
/** Federal minimum wage (FLSA) — the one non-computed dollar constant allowed. */
export const FEDERAL_MINIMUM_WAGE = 7.25;

/** Full-time annual gross: rate × hours per week × 52. */
export function rateToAnnual(rate: number, hoursPerWeek: number = STANDARD_HOURS_PER_WEEK): number {
  return rate * hoursPerWeek * 52;
}

/** Monthly gross equivalent (annual ÷ 12). */
export function rateToMonthly(rate: number, hoursPerWeek: number = STANDARD_HOURS_PER_WEEK): number {
  return rateToAnnual(rate, hoursPerWeek) / 12;
}

/** Semi-monthly gross equivalent (annual ÷ 24). */
export function rateToSemimonthly(rate: number, hoursPerWeek: number = STANDARD_HOURS_PER_WEEK): number {
  return rateToAnnual(rate, hoursPerWeek) / 24;
}

/** Bi-weekly gross equivalent (annual ÷ 26). */
export function rateToBiweekly(rate: number, hoursPerWeek: number = STANDARD_HOURS_PER_WEEK): number {
  return rateToAnnual(rate, hoursPerWeek) / 26;
}

/** Weekly gross: rate × hours per week. */
export function rateToWeekly(rate: number, hoursPerWeek: number = STANDARD_HOURS_PER_WEEK): number {
  return rate * hoursPerWeek;
}

/** Daily gross: rate × 8-hour day. */
export function rateToDaily(rate: number, hoursPerDay: number = STANDARD_DAY_HOURS): number {
  return rate * hoursPerDay;
}

/** Part-time (20 h/week) annual gross: rate × 20 × 52. */
export function rateToPartTimeAnnual(rate: number, partTimeHours: number = PART_TIME_HOURS_PER_WEEK): number {
  return rate * partTimeHours * 52;
}

/** FLSA time-and-a-half overtime hourly rate. */
export function overtimeRate(rate: number): number {
  return rate * OVERTIME_MULTIPLIER;
}

/** Double-time (2×) hourly rate — Sunday/holiday work in some contracts. */
export function doubleTimeRate(rate: number): number {
  return rate * DOUBLE_TIME_MULTIPLIER;
}

// ─── Content Tier System ──────────────────────────────────────────────────────

export type RateTier = 'entry' | 'core' | 'standard' | 'professional';

/**
 * Four content tiers, each with its own article angle, FAQ set, and SEO text:
 *   entry       10–14  — budget reality, part-time, students / second income
 *   core        15–19  — above minimum wage, overtime value, gig vs. payroll
 *   standard    20–29  — salary-equivalent framing, raise rule, rent-to-income
 *   professional 30+    — careers, 401(k) match, exempt status, high-COL metros
 */
export function getRateTier(rate: number): RateTier {
  if (rate < 15) return 'entry';
  if (rate < 20) return 'core';
  if (rate < 30) return 'standard';
  return 'professional';
}
