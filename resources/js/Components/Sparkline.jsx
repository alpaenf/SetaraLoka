import React from 'react';

export default function Sparkline({ data = [], stroke = '#2563eb', height = 40 }) {
  if (!data.length) return <div className="h-[40px]" aria-hidden="true" />;
  const values = data.map(d => d.count);
  const max = Math.max(...values, 1);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" height={height} className="w-full overflow-visible">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
