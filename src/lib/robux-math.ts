/**
 * Robux marketplace-fee math (Task 42).
 *
 * Sources — the platform figures documented in our ranking guide
 * (/blog/robux-tax-calculator-guide-2026):
 *  - Roblox deducts a 30% marketplace fee from every sale (game passes,
 *    developer products, catalog items); the creator receives 70%.
 *  - DevEx (Developer Exchange) cash-out rates: $0.0035 per Robux standard,
 *    $0.00385 per Robux premium (100,000 R$ = $350 / $385).
 *
 * Verified with `bun /tmp/verify-robux-math.ts`:
 *  - list 1,000 R$ -> fee 300 R$, net 700 R$
 *  - net target 1,000 R$ -> required list 1,428.57 R$
 *  - 700 R$ -> $2.45 standard | 100,000 R$ -> $350 / $385
 *  - effective USD per LISTED Robux: $0.00245 standard / $0.002695 premium
 *  - self-employment tax filing threshold for DevEx income: $400 net/yr
 */

/** Roblox marketplace fee on every sale (0.30 = 30%). */
export const MARKETPLACE_FEE_RATE = 0.3;
/** Fraction of the list price the creator keeps (0.70 = 70%). */
export const CREATOR_KEEP_RATE = 0.7;
/** DevEx standard rate: USD per Robux. */
export const DEVEX_STANDARD_RATE = 0.0035;
/** DevEx premium rate: USD per Robux. */
export const DEVEX_PREMIUM_RATE = 0.00385;
/** Net self-employment earnings (incl. DevEx payouts) that trigger SE tax. */
export const SE_TAX_FILING_THRESHOLD = 400;

export type DevexTier = 'standard' | 'premium';

export interface MarketplaceFeeResult {
  /** The listed sale price. */
  listRobux: number;
  /** What Roblox keeps (30%). */
  feeRobux: number;
  /** What the creator receives (70%). */
  netRobux: number;
}

/** Fee on a marketplace sale: Roblox keeps 30%, the creator keeps 70%. */
export function marketplaceFee(listRobux: number): MarketplaceFeeResult {
  const list = Number.isFinite(listRobux) && listRobux > 0 ? listRobux : 0;
  return {
    listRobux: list,
    feeRobux: list * MARKETPLACE_FEE_RATE,
    netRobux: list * CREATOR_KEEP_RATE,
  };
}

/**
 * Reverse calculator: the list price required to take home a target amount
 * after the 30% fee. list = target / 0.70.
 */
export function requiredListPrice(targetNetRobux: number): number {
  const target = Number.isFinite(targetNetRobux) && targetNetRobux > 0 ? targetNetRobux : 0;
  if (CREATOR_KEEP_RATE <= 0) return 0;
  // Round to cents-of-a-Robux so float artifacts (700/0.7 = 1000.0000000000001) vanish.
  return Math.round((target / CREATOR_KEEP_RATE) * 100) / 100;
}

/** DevEx cash-out: USD value of a Robux balance for the given tier. */
export function devexUsd(robux: number, tier: DevexTier): number {
  const amount = Number.isFinite(robux) && robux > 0 ? robux : 0;
  return amount * (tier === 'premium' ? DEVEX_PREMIUM_RATE : DEVEX_STANDARD_RATE);
}

/**
 * Effective USD value of ONE LISTED Robux after the 30% fee and DevEx
 * conversion (0.70 x DevEx rate). This is the full sale-to-cash ladder.
 */
export function effectiveUsdPerListedRobux(tier: DevexTier): number {
  return CREATOR_KEEP_RATE * (tier === 'premium' ? DEVEX_PREMIUM_RATE : DEVEX_STANDARD_RATE);
}
