/**
 * Server-rendered SVG bar chart for salary pages.
 * Shows take-home pay comparison across top states.
 * Pure SVG (no client-side JS) — fully crawlable by Google.
 */

import { calculateSalaryTakeHome, formatSalary, fmt, STATE_LABELS } from '@/lib/salary-calculations';

interface Props {
  salary: number;
}

export function SalaryChart({ salary }: Props) {
  const calc = calculateSalaryTakeHome(salary);
  
  // Get top 10 states by take-home pay
  const sortedStates = [...calc.states].sort((a, b) => b.netAnnual - a.netAnnual);
  const top10 = sortedStates.slice(0, 10);
  const bottom3 = sortedStates.slice(-3);
  
  // Combine for display (top 10 + bottom 3)
  const displayStates = [...top10, ...bottom3];
  
  // Chart dimensions
  const width = 800;
  const rowHeight = 38;
  const height = displayStates.length * rowHeight + 100;
  const barMaxWidth = 400;
  const labelWidth = 130;
  const valueWidth = 90;
  const startX = labelWidth + 20;
  
  // Find max value for scaling
  const maxNet = Math.max(...displayStates.map(s => s.netAnnual));
  const minNet = Math.min(...displayStates.map(s => s.netAnnual));
  
  // Color palette - emerald gradient based on rank
  const getColor = (index: number, total: number) => {
    if (index < 3) return '#10b981'; // top 3 - bright emerald
    if (index < 10) return '#059669'; // top 10 - medium emerald
    return '#64748b'; // bottom 3 - gray
  };

  const formatted = formatSalary(salary);
  
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-foreground mb-4">
        {formatted} Take-Home Pay by State — Visual Comparison
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        This chart shows your annual take-home pay (after federal, FICA, and state taxes) across
        all states where you keep the most money. Green bars represent top states, gray bars show
        the lowest take-home states for comparison.
      </p>
      
      <div className="overflow-x-auto rounded-xl border border-border/30 bg-card/30 p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ minWidth: '600px' }}
          role="img"
          aria-label={`Bar chart showing ${formatted} annual take-home pay across US states`}
        >
          {/* Title */}
          <text
            x={width / 2}
            y={25}
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            {formatted} Annual Take-Home Pay by State
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
          
          {/* Bars */}
          {displayStates.map((state, i) => {
            const y = 70 + i * rowHeight;
            const barWidth = (state.netAnnual / maxNet) * barMaxWidth;
            const color = getColor(i, displayStates.length);
            const isTop10 = i < 10;
            
            return (
              <g key={state.stateKey}>
                {/* State label */}
                <text
                  x={labelWidth}
                  y={y + 18}
                  textAnchor="end"
                  className="fill-foreground"
                  style={{ fontSize: '13px', fontWeight: isTop10 ? '600' : '400' }}
                >
                  {state.stateName}
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
                  fill={color}
                  rx={4}
                  opacity={isTop10 ? 1 : 0.6}
                />
                
                {/* Value label */}
                <text
                  x={startX + barWidth + 8}
                  y={y + 20}
                  className="fill-foreground"
                  style={{ fontSize: '12px', fontWeight: '600' }}
                >
                  {fmt(state.netAnnual)}
                </text>
                
                {/* Effective rate (small, right side) */}
                <text
                  x={width - 10}
                  y={y + 20}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  style={{ fontSize: '11px' }}
                >
                  {state.effectiveTaxRate.toFixed(1)}% tax
                </text>
                
                {/* Separator line between top 10 and bottom 3 */}
                {i === 9 && (
                  <line
                    x1={10}
                    y1={y + rowHeight + 2}
                    x2={width - 10}
                    y2={y + rowHeight + 2}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    className="text-border"
                  />
                )}
              </g>
            );
          })}
          
          {/* Legend */}
          <g transform={`translate(${startX}, ${height - 25})`}>
            <rect x={0} y={0} width={12} height={12} fill="#10b981" rx={2} />
            <text x={18} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>Top 3 states</text>
            
            <rect x={110} y={0} width={12} height={12} fill="#059669" rx={2} />
            <text x={128} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>Top 10</text>
            
            <rect x={200} y={0} width={12} height={12} fill="#64748b" rx={2} opacity={0.6} />
            <text x={218} y={10} className="fill-muted-foreground" style={{ fontSize: '11px' }}>Bottom 3 (highest tax)</text>
          </g>
        </svg>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        * Chart shows annual net pay (after federal tax, FICA, and state income tax). Bars scaled
        relative to the highest-take-home state. Effective tax rate = total tax ÷ gross salary.
      </p>
    </div>
  );
}
