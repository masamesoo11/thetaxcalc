'use client';

import { useState, useCallback } from 'react';
import { Mail, Users, Building2, Heart } from 'lucide-react';
import { trackOutreachEmailCopy } from '@/lib/analytics';

const EMAIL_TEMPLATE = `Subject: Free tax calculator widget for your website

Hi [Name],

I came across [their site] and noticed you cover [personal finance / HR / tax topics]. I wanted to share a free resource that your readers might find useful — embeddable tax calculator widgets from TheTaxCalc.com.

They're completely free, require no signup, and take about 30 seconds to add to any page. Your visitors can calculate their take-home pay, sales tax, capital gains tax, and more — all updated for the 2026 tax year.

Here's the embed code for our most popular widget (Paycheck Calculator):

<iframe src="https://thetaxcalc.com/paycheck-calculator?embed=1" width="100%" height="700" frameborder="0" style="border:1px solid #e5e7eb;border-radius:12px;" title="Free Paycheck Calculator by TheTaxCalc"></iframe>

You can browse all 20 free widgets and customize the size here:
https://thetaxcalc.com/widgets

The only ask is a small "Powered by TheTaxCalc" link that appears below the widget — which also helps your visitors find more free tax tools.

Would this be a good fit for your site? Happy to help with any customization.

Best,
[Your Name]`;

export function OutreachEmailTemplate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_TEMPLATE);
      setCopied(true);
      trackOutreachEmailCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL_TEMPLATE;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      trackOutreachEmailCopy();
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section id="outreach-template" className="mb-12 scroll-mt-24">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Mail className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Outreach <span className="gradient-text">Email Template</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Copy this template to reach out to blogs, accountants, and HR sites about embedding your widgets
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-card/50 border border-border/20 p-6 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Email Template'}
            </button>
          </div>
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words leading-relaxed pr-32">
            {EMAIL_TEMPLATE}
          </pre>
        </div>

        <div className="mt-6 rounded-lg bg-card/30 border border-border/20 p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Who to Target</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="text-center">
              <Users className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-foreground mb-1">Personal Finance Blogs</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Sites covering budgeting, saving, and taxes. They need interactive tools to boost engagement and dwell time.
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-foreground mb-1">CPA &amp; Accounting Firms</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Small to mid-size firms with websites. A calculator widget makes their site more useful and professional.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-foreground mb-1">Financial Coaches</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Independent advisors who blog about tax strategy. Embedding a calculator gives them a lead-generation tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
