/**
 * Server-rendered SVG comparison chart for state-vs-state compare pages.
 * Shows side-by-side take-home pay at multiple salary levels.
 * Pure SVG (no client-side JS) — fully crawlable by Google.
 */

import Link from 'next/link';
import { calculateSalaryTakeHome, formatSalary, fmt } from '@/lib/salary-calculations';
import type { CompareStateData, CompareConfig } from '@/lib/compare-config';

interface Props {
  config: CompareConfig;
}

export function CompareChart({ config }: Props) {
  const { state1: s1, state2: s2 } = config;
  
  // Calculate take-home at multiple salary points
  const SALARY_POINTS = [50000, 75000, 100000, 150000, 200000];
  const calc1 = SALARY_POINTS.map(sal => ({
    salary: sal,
    data: calculateSalaryTakeHome(sal).states.find(s => s.stateKey === s1.taxConfigKey)!,
  }));
  const calc2 = SALARY_POINTS.map(sal => ({
    salary: sal,
    data: calculateSalaryTakeHome(sal).states.find(s => s.stateKey === s2.taxConfigKey)!,
  }));
  
  // Chart dimensions
  const width = 800;
  const height = 480;
  const padding = { top: 60, right: 30, bottom: 60, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find max value for Y-axis scaling
  const allValues = [...calc1, ...calc2].map(c => c.data.netAnnual);
  const maxValue = Math.max(...allValues);
  const yMax = Math.ceil(maxValue / 10000) * 10000; // round up to nearest 10K
  
  // X-axis: salary points
  const xScale = (index: number) => padding.left + (index / (SALARY_POINTS.length - 1)) * chartWidth;
  // Y-axis: net pay
  const yScale = (value: number) => padding.top + chartHeight - (value / yMax) * chartHeight;
  
  // Generate line paths
  const line1Path = calc1.map((c, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(c.data.netAnnual)}`).join(' ');
  const line2Path = calc2.map((c, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(c.data.netAnnual)}`).join(' ');
  
  // Generate area paths (for fill)
  const area1Path = `${line1Path} L ${xScale(SALARY_POINTS.length - 1)} ${padding.top + chartHeight} L ${xScale(0)} ${padding.top + chartHeight} Z`;
  const area2Path = `${line2Path} L ${xScale(SALARY_POINTS.length - 1)} ${padding.top + chartHeight} L ${xScale(0)} ${padding.top + chartHeight} Z`;
  
  // Y-axis ticks
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => (yMax / yTicks) * i);
  
  // Color palette
  const color1 = '#10b981'; // emerald for state 1
  const color2 = '#3b82f6'; // blue for state 2
  
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-foreground mb-4">
        {s1.name} vs {s2.name} — Take-Home Pay Line Chart
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        This line chart compares your annual take-home pay in {s1.name} vs {s2.name} across five
        salary levels ($50K–$200K). The gap between the two lines shows exactly how much more (or less)
        you&apos;d take home by choosing one state over the other.
      </p>
      
      <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ minWidth: '600px' }}
          role="img"
          aria-label={`Line chart comparing ${s1.name} vs ${s2.name} take-home pay across salary levels`}
        >
          {/* Title */}
          <text
            x={width / 2}
            y={25}
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            {s1.name} vs {s2.name}: Annual Take-Home Pay
          </text>
          <text
            x={width / 2}
            y={45}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: '12px' }}
          >
            Single filer, standard deduction, 2026 tax year
          </text>
          
          {/* Y-axis grid lines and labels */}
          {yTickValues.map((value, i) => {
            const y = yScale(value);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border"
                  opacity={0.3}
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  style={{ fontSize: '11px' }}
                >
                  ${value.toLocaleString()}
                </text>
              </g>
            );
          })}
          
          {/* X-axis */}
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={width - padding.right}
            y2={padding.top + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          
          {/* X-axis labels (salary points) */}
          {SALARY_POINTS.map((salary, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: '12px' }}
            >
              {formatSalary(salary)}
            </text>
          ))}
          <text
            x={padding.left + chartWidth / 2}
            y={padding.top + chartHeight + 45}
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: '12px', fontWeight: '600' }}
          >
            Gross Annual Salary
          </text>
          
          {/* Area fills */}
          <path d={area1Path} fill={color1} opacity={0.1} />
          <path d={area2Path} fill={color2} opacity={0.1} />
          
          {/* Line 1 (state 1) */}
          <path
            d={line1Path}
            fill="none"
            stroke={color1}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Line 2 (state 2) */}
          <path
            d={line2Path}
            fill="none"
            stroke={color2}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points for line 1 */}
          {calc1.map((c, i) => (
            <g key={`p1-${i}`}>
              <circle
                cx={xScale(i)}
                cy={yScale(c.data.netAnnual)}
                r={5}
                fill={color1}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={xScale(i)}
                y={yScale(c.data.netAnnual) - 12}
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: '11px', fontWeight: '600' }}
              >
                {fmt(c.data.netAnnual)}
              </text>
            </g>
          ))}
          
          {/* Data points for line 2 */}
          {calc2.map((c, i) => (
            <g key={`p2-${i}`}>
              <circle
                cx={xScale(i)}
                cy={yScale(c.data.netAnnual)}
                r={5}
                fill={color2}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={xScale(i)}
                y={yScale(c.data.netAnnual) + 20}
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: '11px', fontWeight: '600' }}
              >
                {fmt(c.data.netAnnual)}
              </text>
            </g>
          ))}
          
          {/* Legend */}
          <g transform={`translate(${padding.left + 10}, ${padding.top + 10})`}>
            <rect x={0} y={0} width={180} height={50} className="fill-card" stroke="currentColor" strokeWidth="1" opacity={0.9} rx={6} />
            
            <line x1={10} y1={18} x2={30} y2={18} stroke={color1} strokeWidth="3" />
            <circle cx={20} cy={18} r={4} fill={color1} />
            <text x={38} y={22} className="fill-foreground" style={{ fontSize: '12px', fontWeight: '600' }}>
              {s1.name} ({s1.abbreviation})
            </text>
            
            <line x1={10} y1={38} x2={30} y2={38} stroke={color2} strokeWidth="3" />
            <circle cx={20} cy={38} r={4} fill={color2} />
            <text x={38} y={42} className="fill-foreground" style={{ fontSize: '12px', fontWeight: '600' }}>
              {s2.name} ({s2.abbreviation})
            </text>
          </g>
        </svg>
      </div>
      
      {/* Insights from the chart */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">At $75K Salary</h4>
          <p className="text-xs text-muted-foreground">
            {s1.name}: <span className="font-bold text-foreground">{fmt(calc1[1].data.netAnnual)}</span>
            <br />
            {s2.name}: <span className="font-bold text-foreground">{fmt(calc2[1].data.netAnnual)}</span>
            <br />
            <span className="text-emerald-400">
              {calc1[1].data.netAnnual > calc2[1].data.netAnnual ? s1.name : s2.name} wins by {fmt(Math.abs(calc1[1].data.netAnnual - calc2[1].data.netAnnual))}/yr
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">At $150K Salary</h4>
          <p className="text-xs text-muted-foreground">
            {s1.name}: <span className="font-bold text-foreground">{fmt(calc1[3].data.netAnnual)}</span>
            <br />
            {s2.name}: <span className="font-bold text-foreground">{fmt(calc2[3].data.netAnnual)}</span>
            <br />
            <span className="text-emerald-400">
              {calc1[3].data.netAnnual > calc2[3].data.netAnnual ? s1.name : s2.name} wins by {fmt(Math.abs(calc1[3].data.netAnnual - calc2[3].data.netAnnual))}/yr
            </span>
          </p>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">10-Year Cumulative</h4>
          <p className="text-xs text-muted-foreground">
            At $100K salary, the difference compounds to{' '}
            <span className="font-bold text-emerald-400">
              {fmt(Math.abs(calc1[2].data.netAnnual - calc2[2].data.netAnnual) * 10)}
            </span>{' '}
            over 10 years — before investment returns.
          </p>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        * Chart shows annual net pay (after federal tax, FICA, and state income tax). NYC residents
        pay additional city tax not reflected in this chart. Use the interactive calculator above
        for personalized scenarios.
      </p>
    </div>
  );
}
