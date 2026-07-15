import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Embed Free Tax Calculators — 1-Line Setup | TheTaxCalc',
  description: 'Embed free tax calculator widgets on your website with a single line of code. 67+ calculators. No signup, no cost.',
  alternates: { canonical: `${SITE_URL}/embed` },
};

export default function EmbedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Embed Free Tax Calculators</h1>
        <p className="mt-4 text-lg text-muted-foreground">Add any calculator to your website in 30 seconds. No signup, no cost.</p>
      </div>
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Start</h2>
        <p className="text-sm font-medium text-foreground mb-2">Step 1: Add this div:</p>
        <pre className="rounded-lg bg-background/80 border border-border/30 p-4 text-xs overflow-x-auto mb-4"><code>{'<div data-ttc-widget="paycheck-calculator"></div>'}</code></pre>
        <p className="text-sm font-medium text-foreground mb-2">Step 2: Add this script:</p>
        <pre className="rounded-lg bg-background/80 border border-border/30 p-4 text-xs overflow-x-auto"><code>{'<script src="https://thetaxcalc.com/embed.js" async></script>'}</code></pre>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {['paycheck-calculator','sales-tax-calculator','mortgage-calculator','capital-gains-calculator','self-employment-tax-calculator','tax-refund-calculator','401k-retirement-calculator','property-tax-calculator'].map(slug => (
          <div key={slug} className="rounded-lg border border-border/30 bg-card/50 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">{slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</h3>
            <pre className="rounded bg-background/80 border border-border/20 p-2 text-[10px] overflow-x-auto"><code>{`<div data-ttc-widget="${slug}"></div>`}</code></pre>
          </div>
        ))}
      </div>
    </div>
  );
}
