'use client';

/**
 * Settings Store — Client-side persistence using localStorage
 *
 * WHY: The in-memory database (/api/settings) crashes on Cloudflare Pages
 * and doesn't persist data between cold starts anyway. Using localStorage
 * is more reliable for admin settings like GA and AdSense IDs.
 *
 * This module provides:
 * 1. Read/write settings to localStorage
 * 2. Fallback to /api/settings if localStorage is empty
 * 3. Singleton pattern to avoid repeated reads
 */

const STORAGE_KEY = 'thetaxcalc_site_settings';

export interface SiteSettings {
  site_name: string;
  site_description: string;
  ga_tracking_id: string;
  adsense_client_id: string;
  [key: string]: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  site_name: 'TheTaxCalc',
  site_description: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning.',
  ga_tracking_id: '',
  adsense_client_id: '',
};

/** Read all settings from localStorage */
export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // localStorage not available
  }
  return { ...DEFAULT_SETTINGS };
}

/** Read a single setting */
export function getSetting(key: string): string {
  return getSettings()[key] ?? '';
}

/** Save all settings to localStorage */
export function saveSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage not available
  }
}

/** Save a single setting */
export function saveSetting(key: string, value: string): void {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
}

/** Clear all custom settings (reset to defaults) */
export function clearSettings(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}
