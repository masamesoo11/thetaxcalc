/**
 * Server-rendered SVG bar chart for the /hourly/{rate}-an-hour pages.
 * Shows gross annual pay vs. net annual pay in Texas and California
 * (single filer, 2,080-hour year) — all values computed from the take-home
 * engine at render time. Pure SVG (no client-side JS) — fully crawlable.
 */

import { calculateSalaryTakeHome, fmt, fmtFull } from '@/lib/salary-calculations';
import {
  HOURS_PER_YEAR_FULL_TIME,
  STANDARD_HOURS_PER_WEEK,
  formatRate,
  rateToAnnual,
} from '@/lib/hourly-calculations';

interface Props {
  rate: number;
}

export function HourlyChart({ rate }: Props) {
  const annualGross = Math.round(rateToAnnual(rate, STANDARD_HOURS_PER_WEEK));
  const calc = calculateSalaryTakeHome(annualGross, 'single');
  const tx = calc.states.find((s) => s.stateKey === 'texas')!;
  const ca = calc.states.find((s) => s.stateKey === 'california')!;

  // Bars: gross annual vs. net annual in Texas and California
  const bars: { label: string; value: number; color: string; note: string }[] = [
    { label: 'Gross annual', value: annualGross, color: '#64748b', note: `${fmtFull(rate)} × ${HOURS_PER_YEAR_FULL_TIME.toLocaleString('en-US')} hours` },
    { label: 'Net — Texas', value: tx.netAnnual, color: '#b08d3e', note: `${(tx.effectiveTaxRate * 100).toFixed(1)}% total tax` },
    { label: 'Net — California', value: ca.netAnnual, color: '#8a6a24', note: `${(ca.effectiveTaxRate * 100).toFixed(1)}% total tax` },
  ];

  // Chart dimensions (mirrors salary-chart.tsx visual language)
  const width = 800;
  const rowHeight = 56;
  const height = bars.length * rowHeight + 100;
  const barMaxWidth = 520;
  const labelWidth = 170;
  const startX = labelWidth + 20;

  const maxValue = Math.max(...bars.map((b) => b.value));
  const rateLabel = formatRate(rate);

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-foreground mb-4">
        {rateLabel} an Hour — Annual Gross vs. Net Pay (Single Filer)
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        This chart shows what {rateLabel} an hour earns per year before tax, and what a single filer
        actually keeps after 2026 federal income tax, FICA, and state income tax in two anchor states.
        Gold bars are take-home pay; the gray bar is the gross baseline.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ minWidth: '600px' }}
          role="img"
          aria-label={`Bar chart showing annual gross pay versus net pay in Texas and California at ${rateLabel} an hour`}
        >
          {/* Title */}
          <text
            x={width / 2}
            y={25}
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            {rateLabel} an Hour: Annual Pay Before and After Tax
          </text>
          <text
            x={width / 2}
            y={45}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: '12px' }}
          >
            Single filer, {HOURS_PER_YEAR_FULL_TIME.toLocaleString('en-US')}-hour year, 2026 tax rates
          </text>

          {/* Bars */}
          {bars.map((bar, i) => {
            const y = 70 + i * rowHeight;
            const barWidth = (bar.value / maxValue) * barMaxWidth;
            return (
              <g key={bar.label}>
                {/* Bar label */}
                <text
                  x={labelWidth}
                  y={y + 18}
                  textAnchor="end"
                  className="fill-foreground"
                  style={{ fontSize: '13px', fontWeight: '600' }}
                >
                  {bar.label}
                </text>

                {/* Bar background */}
                <rect
                  x={startX}
                  y={y + 4}
                  width={barMaxWidth}
                  height={24}
                  className="fill-muted/20"
                  rx={4}
                />

                {/* Bar fill */}
                <rect
                  x={startX}
                  y={y + 4}
                  width={barWidth}
                  height={24}
                  fill={bar.color}
                  rx={4}
                  opacity={i === 0 ? 0.6 : 1}
                />

                {/* Value label */}
                <text
                  x={startX + barWidth + 8}
                  y={y + 20}
                  className="fill-foreground"
                  style={{ fontSize: '12px', fontWeight: '600' }}
                >
                  {fmt(bar.value)}
                </text>

                {/* Effective-rate / basis note */}
                <text
                  x={startX + 4}
                  y={y + 40}
                  className="fill-muted-foreground"
                  style={{ fontSize: '11px' }}
                >
                  {bar.note}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(${startX}, ${height - 18})`}>
            <rect x={0} y={0} width={12} height={12} fill="#64748b" rx={2} opacity={0.6} />
            <text x={18} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
              Gross (before tax)
            </text>
            <rect x={150} y={0} width={12} height={12} fill="#b08d3e" rx={2} />
            <text x={168} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
              Net — no-tax state (TX)
            </text>
            <rect x={340} y={0} width={12} height={12} fill="#8a6a24" rx={2} />
            <text x={358} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>
              Net — high-tax state (CA)
            </text>
          </g>
        </svg>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        * Bars scaled relative to gross annual pay. Effective tax rate = (federal income tax + FICA +
        state income tax) ÷ gross. Texas levies no state income tax on wages; New York and other states
        land between these two anchors.
      </p>
    </div>
  );
}
