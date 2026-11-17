/**
 * Calculator accuracy tests (node --test).
 *
 * Every figure asserted here is either (a) an IRS-verified 2026 value from
 * IR-2025-103, or (b) derived from the site's own tax engine
 * (src/lib/tax-config.ts + src/lib/finance-utils.ts). These tests lock the
 * numbers the SEO copy and the components now print, so a future bracket
 * change without a test update fails the build.
 *
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FEDERAL_TAX_2026, FICA_2026 } from '../src/lib/tax-config';
import {
  calculateFederalTax,
  calculateFICA,
  roundCurrency,
} from '../src/lib/finance-utils';
import {
  HOURLY_RATES,
  isIndexableHourlyRate,
  isLegacyRateSlug,
  rateToAnnual,
  rateToSlug,
  slugToRate,
} from '../src/lib/hourly-calculations';
import {
  isValidSalaryAmount,
  salaryToSlug,
  slugToSalary,
} from '../src/lib/salary-calculations';
import {
  COMPARISON_SLUGS,
  getCompareConfig,
  parseComparisonSlug,
} from '../src/lib/compare-config';

// ─── IRS-verified 2026 constants (IR-2025-103 / Rev. Proc. 2025-32) ────────────

test('tax-config matches IRS-verified 2026 figures', () => {
  assert.equal(FEDERAL_TAX_2026.standardDeduction, 16100);
  assert.equal(FEDERAL_TAX_2026.standardDeductionsByFiling.single, 16100);
  assert.equal(FEDERAL_TAX_2026.standardDeductionsByFiling.married, 32200);
  assert.equal(FEDERAL_TAX_2026.standardDeductionsByFiling.head_of_household, 24150);
  assert.equal(FICA_2026.socialSecurityWageCap, 184500);

  // Single: 37% bracket starts above $640,600
  const single = FEDERAL_TAX_2026.bracketsByFiling.single;
  const top = single[single.length - 1];
  assert.equal(top.rate, 0.37);
  assert.equal(top.min, 640600);
  assert.equal(top.max, null);
  // 35% starts at 256,225
  assert.equal(single[single.length - 2].min, 256225);
  assert.equal(single[single.length - 2].rate, 0.35);

  // MFJ: 37% starts at $768,700
  const married = FEDERAL_TAX_2026.bracketsByFiling.married;
  assert.equal(married[married.length - 1].min, 768700);
  assert.equal(married[married.length - 1].rate, 0.37);
});

// ─── Federal income tax (single filer, std deduct $16,100) ─────────────────────────

test('federal tax: single filer, 2026 (matches blog quick-answer table)', () => {
  assert.equal(calculateFederalTax(30000), 1420);
  assert.equal(calculateFederalTax(50000), 3820);
  assert.equal(calculateFederalTax(75000), 7670);
  assert.equal(calculateFederalTax(100000), 13170);
  assert.equal(calculateFederalTax(150000), 24734);
  assert.equal(calculateFederalTax(200000), 36734);
});

test('federal tax: below standard deduction pays zero', () => {
  assert.equal(calculateFederalTax(16100), 0);
  assert.equal(calculateFederalTax(8000), 0);
});

test('federal tax: HOH all-figure regression', () => {
  // $100,000 HOH: std 24,150 → taxable 75,850
  // 10%×17,700=1,770 + 12%×(67,450−17,700)=5,970 + 22%×(75,850−67,450)=1,848
  assert.equal(calculateFederalTax(100000, 'head_of_household'), 1770 + 5970 + 1848);
});

test('federal tax: married $195,000 (used in W-4 article) = $25,240', () => {
  // taxable 162,800: 10%×24,800=2,480 + 12%×76,000=9,120 + 22%×62,000=13,640
  assert.equal(calculateFederalTax(195000, 'married'), 25240);
});

// ─── FICA (SS cap $184,500 for 2026) ───────────────────────────────────────────

test('FICA: $75,000 → 7.65% flat', () => {
  const f = calculateFICA(75000);
  assert.equal(f.socialSecurity, 4650);
  assert.equal(f.medicare, 1087.5);
  assert.equal(f.additionalMedicare, 0);
  assert.equal(f.total, 5737.5);
});

test('FICA: SS wage base caps at $184,500 (matches blog table)', () => {
  const f = calculateFICA(200000);
  assert.equal(f.socialSecurity, 184500 * 0.062); // 11,439
  assert.equal(f.medicare, 200000 * 0.0145);      // 2,900
  assert.equal(f.additionalMedicare, 0);
  assert.equal(f.total, 14339);
});

test('FICA: additional 0.9% Medicare above $200,000', () => {
  const f = calculateFICA(250000);
  assert.equal(f.socialSecurity, 184500 * 0.062);
  assert.equal(f.medicare, 250000 * 0.0145);            // 3,625
  assert.equal(f.additionalMedicare, (250000 - 200000) * 0.009); // 450
  assert.equal(roundCurrency(f.total), roundCurrency(11439 + 3625 + 450));
});

// ─── Hourly slug / conversion engine ─────────────────────────────────────────────

test('hourly: 25/hour × 2,080 = $52,000/yr', () => {
  assert.equal(rateToAnnual(25), 52000);
  assert.equal(rateToAnnual(25, 20), 26000); // part-time
});

test('hourly: strict slug parsing rejects junk suffixes', () => {
  assert.equal(slugToRate('25-an-hour'), 25);
  assert.equal(slugToRate('25'), 25); // legacy bare still parses
  assert.equal(slugToRate('22.5-an-hour'), 22.5);
  assert.equal(slugToRate('22_5-an-hour'), null);   // was a 200 that previewed as $22
  assert.equal(slugToRate('25-foo'), null);
  assert.equal(slugToRate('abc'), null);
});

test('hourly: only curated rates are indexable', () => {
  assert.ok(isIndexableHourlyRate(25));
  assert.ok(isIndexableHourlyRate(22));
  // 33 is not in HOURLY_RATES; cast to keep the tuple union type happy.
  assert.ok(((HOURLY_RATES as readonly number[]).includes(33)) === isIndexableHourlyRate(33));
  assert.equal(isIndexableHourlyRate(22.5), false);
  assert.equal(isIndexableHourlyRate(33), false); // on-demand → noindex
  assert.equal(isLegacyRateSlug('25'), true);
  assert.equal(isLegacyRateSlug('25-an-hour'), false);
  assert.equal(rateToSlug(22.5), '22.5-an-hour');
});

// ─── Salary slug engine ─────────────────────────────────────────────────────────

test('salary: canonical + legacy slugs parse; junk returns null', () => {
  assert.equal(slugToSalary('75000-after-taxes'), 75000);
  assert.equal(slugToSalary('75000'), 75000);
  assert.equal(slugToSalary('75000-foo'), null);  // was a soft 200 for $750,000… wait, 200? no — junk
  assert.equal(slugToSalary('abc'), null);
});

test('salary: valid amounts and slug round-trip', () => {
  assert.ok(isValidSalaryAmount(75000));
  assert.ok(!isValidSalaryAmount(62000));
  assert.ok(!isValidSalaryAmount(1));
  assert.equal(salaryToSlug(75000), '75000-after-taxes');
});

// ─── Compare pairs: reject same-state and non-canonical slugs ────────────────────

test('compare: same-state pair is rejected', () => {
  assert.equal(parseComparisonSlug('texas-vs-texas'), null);
  assert.equal(getCompareConfig('texas-vs-texas'), null);
});

test('compare: reversed pairs resolve to canonical via middleware, config is null', () => {
  assert.equal(getCompareConfig('california-vs-texas'), null);
  assert.equal(getCompareConfig('new-york-vs-texas'), null);
});

test('compare: canonical pairs produce a real config', () => {
  const cfg = getCompareConfig('texas-vs-california');
  assert.ok(cfg);
  assert.equal(cfg.state1.slug, 'texas');
  assert.equal(cfg.state2.slug, 'california');
});

test('compare: all 10 canonical pairs build a config', () => {
  assert.equal(COMPARISON_SLUGS.length, 10);
  for (const slug of COMPARISON_SLUGS) {
    assert.ok(getCompareConfig(slug), `should build config for ${slug}`);
    const parsed = parseComparisonSlug(slug);
    assert.ok(parsed && parsed[0] !== parsed[1]);
  }
});

// ─── SEO-printed take-home figure regression (Texas meta "$75K = $61,592") ─────────

test('take-home: $75,000 single in a no-tax state ≈ $61,592 (Texas meta claim)', () => {
  const federal = calculateFederalTax(75000);
  const fica = calculateFICA(75000);
  const net = roundCurrency(75000 - federal - fica.total);
  assert.equal(net, 61592.5);
});