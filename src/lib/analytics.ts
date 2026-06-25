/**
 * Analytics utility for tracking custom GA4 events.
 * Uses the gtag function injected by ClientAnalytics component.
 */

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom event in Google Analytics 4.
 * Safe to call even if GA is not loaded yet.
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// ─── Scenario Comparison Events ──────────────────────────────────────────────

/** Track when user opens the scenario comparison section */
export function trackScenarioOpen(scenarioCount: number) {
  trackEvent('scenario_comparison_open', {
    scenario_count: scenarioCount,
    feature: 'scenario_comparison',
  });
}

/** Track when user adds a new scenario */
export function trackScenarioAdd(scenarioCount: number, presetLabel?: string) {
  trackEvent('scenario_add', {
    scenario_count: scenarioCount,
    preset_label: presetLabel || 'custom',
    feature: 'scenario_comparison',
  });
}

/** Track when user shares scenario comparison link */
export function trackScenarioShare() {
  trackEvent('scenario_share', {
    feature: 'scenario_comparison',
  });
}

/** Track which preset scenario is selected */
export function trackScenarioPreset(presetLabel: string, source: string) {
  trackEvent('scenario_preset_selected', {
    preset_label: presetLabel,
    source_page: source,
    feature: 'scenario_comparison',
  });
}

/** Track when user removes a scenario */
export function trackScenarioRemove(scenarioCount: number) {
  trackEvent('scenario_remove', {
    scenario_count: scenarioCount,
    feature: 'scenario_comparison',
  });
}

// ─── Widget / Embed Events ───────────────────────────────────────────────────

/** Track when user copies embed code */
export function trackEmbedCopy(widgetSlug: string) {
  trackEvent('embed_code_copy', {
    widget_slug: widgetSlug,
    feature: 'widgets',
  });
}

/** Track when user previews a widget */
export function trackWidgetPreview(widgetSlug: string) {
  trackEvent('widget_preview', {
    widget_slug: widgetSlug,
    feature: 'widgets',
  });
}

/** Track when a page is loaded in embed mode */
export function trackEmbedView(calculatorSlug: string) {
  trackEvent('embed_view', {
    calculator_slug: calculatorSlug,
    feature: 'widgets',
  });
}

/** Track when the outreach email template is copied */
export function trackOutreachEmailCopy() {
  trackEvent('outreach_email_copy', {
    feature: 'widgets',
    page: 'widgets',
  });
}

// ─── Calculator Engagement Events ────────────────────────────────────────────

/** Track when a calculator produces a result (user completes an interaction) */
export function trackCalculatorUsed(calculatorType: string, stateKey?: string) {
  trackEvent('calculator_used', {
    calculator_type: calculatorType,
    state_key: stateKey || 'unknown',
    feature: 'calculator',
  });
}

/** Track when user clicks the scenario CTA banner */
export function trackScenarioCTAClick(source: string) {
  trackEvent('scenario_cta_click', {
    source_page: source,
    feature: 'scenario_comparison',
  });
}

/** Track when user changes the active tab/mode in a calculator */
export function trackCalculatorModeSwitch(mode: string, calculatorType: string) {
  trackEvent('calculator_mode_switch', {
    mode,
    calculator_type: calculatorType,
    feature: 'calculator',
  });
}
