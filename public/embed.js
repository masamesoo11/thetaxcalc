/**
 * TheTaxCalc Embed Script v1.0
 * 
 * This script allows any website to embed TheTaxCalc calculators
 * with a single line of code. Each embed includes a DoFollow
 * backlink to thetaxcalc.com — providing natural link building.
 * 
 * Usage on external sites:
 *   <div data-ttc-widget="paycheck-calculator"></div>
 *   <script src="https://thetaxcalc.com/embed.js" async></script>
 * 
 * Or with custom dimensions:
 *   <div data-ttc-widget="sales-tax-calculator" data-ttc-height="500"></div>
 * 
 * The script automatically:
 *   1. Finds all elements with data-ttc-widget attribute
 *   2. Creates an iframe pointing to the calculator with ?embed=1
 *   3. Adds a "Powered by TheTaxCalc" DoFollow link below each widget
 */

(function() {
  'use strict';

  var TTC_BASE = 'https://thetaxcalc.com';
  
  // Widget registry with default heights
  var WIDGETS = {
    'paycheck-calculator': { height: 700, title: 'Paycheck Calculator' },
    'mortgage-calculator': { height: 700, title: 'Mortgage Calculator' },
    'sales-tax-calculator': { height: 600, title: 'Sales Tax Calculator' },
    'capital-gains-calculator': { height: 650, title: 'Capital Gains Calculator' },
    'self-employment-tax-calculator': { height: 650, title: 'Self-Employment Tax Calculator' },
    'tax-refund-calculator': { height: 650, title: 'Tax Refund Calculator' },
    '401k-retirement-calculator': { height: 650, title: '401(k) Retirement Calculator' },
    'property-tax-calculator': { height: 600, title: 'Property Tax Calculator' },
    'bonus-tax-calculator': { height: 600, title: 'Bonus Tax Calculator' },
    'overtime-tax-calculator': { height: 600, title: 'Overtime Tax Calculator' },
    'lottery-tax-calculator': { height: 650, title: 'Lottery Tax Calculator' },
    'relocation-calculator': { height: 650, title: 'Relocation Calculator' },
    'irs-withholding-calculator': { height: 650, title: 'IRS Withholding Calculator' },
    'employee-cost-calculator': { height: 650, title: 'Employee Cost Calculator' },
    'salary-comparison-calculator': { height: 700, title: 'Salary Comparison Calculator' },
    'job-offer-comparison-calculator': { height: 700, title: 'Job Offer Comparison Calculator' },
    'paycheck-difference-calculator': { height: 650, title: 'Paycheck Difference Calculator' },
    'home-sale-tax-calculator': { height: 650, title: 'Home Sale Tax Calculator' },
  };

  // State calculator widgets (all 50 states)
  var STATES = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california',
    'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
    'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
    'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
    'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
    'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
    'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
    'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
    'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
    'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
  ];
  
  STATES.forEach(function(state) {
    WIDGETS[state + '-tax-calculator'] = { height: 700, title: state.charAt(0).toUpperCase() + state.slice(1) + ' Tax Calculator' };
  });

  function createEmbed(container) {
    var widgetSlug = container.getAttribute('data-ttc-widget');
    var customHeight = container.getAttribute('data-ttc-height');
    var widget = WIDGETS[widgetSlug];
    
    if (!widget) {
      console.warn('[TheTaxCalc] Unknown widget:', widgetSlug);
      return;
    }

    var height = customHeight || widget.height;
    var iframeUrl = TTC_BASE + '/' + widgetSlug + '?embed=1';

    // Clear container
    container.innerHTML = '';
    container.style.cssText = 'position:relative;width:100%;max-width:100%;';

    // Create iframe wrapper
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:100%;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);';

    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.title = widget.title + ' — TheTaxCalc';
    iframe.style.cssText = 'width:100%;height:' + height + 'px;border:0;display:block;';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allow', 'clipboard-write');
    wrapper.appendChild(iframe);

    // Create "Powered by" attribution link (DoFollow — this is the backlink!)
    var attribution = document.createElement('div');
    attribution.style.cssText = 'padding:8px 12px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:right;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:12px;';
    
    var link = document.createElement('a');
    link.href = TTC_BASE + '/' + widgetSlug;
    link.textContent = 'Powered by TheTaxCalc';
    link.style.cssText = 'color:#10b981;text-decoration:none;font-weight:600;';
    link.setAttribute('title', widget.title + ' — Free 2026 Tax Calculator');
    // DoFollow link (no rel="nofollow") — this passes link equity
    attribution.appendChild(link);

    wrapper.appendChild(attribution);
    container.appendChild(wrapper);
  }

  function init() {
    var containers = document.querySelectorAll('[data-ttc-widget]');
    containers.forEach(createEmbed);
  }

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-scan for new widgets (for SPAs)
  window.TTC = {
    render: init,
    widgets: WIDGETS,
  };
})();
