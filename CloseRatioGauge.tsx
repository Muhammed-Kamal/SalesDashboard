import React from 'react';

interface CloseRatioGaugeProps {
  value: number;
  size?: number;
}

export function CloseRatioGauge({ value, size = 200 }: CloseRatioGaugeProps) {
  // Normalize value between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate the angle for the needle (from -90 to 90 degrees)
  const angle = -90 + (normalizedValue / 100) * 180;
  
  // Get performance level and color based on value
  const getPerformanceInfo = (value: number) => {
    if (value >= 90) return { level: 'Exceptional', color: '#35de75' };
    if (value >= 80) return { level: 'Excellent', color: '#3b82f6' };
    if (value >= 70) return { level: 'Good', color: '#8b5cf6' };
    if (value >= 60) return { level: 'Satisfactory', color: '#eab308' };
    return { level: 'Needs Improvement', color: '#ef4444' };
  };

  const performanceInfo = getPerformanceInfo(normalizedValue);

  return (
    <div className="relative" style={{ width: size, height: size * 0.8 }}>
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 200 160"
        className="transform -rotate-90"
      >
        {/* Background Arc */}
        <path
          d="M20 120 A80 80 0 0 1 180 120"
          fill="none"
          stroke="#1f2937"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Colored Progress */}
        <path
          d="M20 120 A80 80 0 0 1 180 120"
          fill="none"
          stroke={performanceInfo.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${normalizedValue * 2.51}, 251`}
          className="transition-all duration-700 ease-out"
        />

        {/* Scale Markers */}
        <g className="text-xs" transform="rotate(90 100 120)">
          {[0, 25, 50, 75, 100].map((mark) => {
            const markAngle = -90 + (mark / 100) * 180;
            const markRadius = 95;
            const x = 100 + markRadius * Math.cos((markAngle * Math.PI) / 180);
            const y = 120 + markRadius * Math.sin((markAngle * Math.PI) / 180);
            return (
              <text
                key={mark}
                x={x}
                y={y}
                fill="#6B7280"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${-markAngle} ${x} ${y})`}
              >
                {mark}%
              </text>
            );
          })}
        </g>

        {/* Needle */}
        <g transform={`rotate(${angle} 100 120)`}>
          <line
            x1="100"
            y1="120"
            x2="100"
            y2="45"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          <circle
            cx="100"
            cy="120"
            r="6"
            fill="white"
          />
        </g>
      </svg>
      
      {/* Value Display */}
      <div 
        className="absolute inset-x-0 top-1/2 flex flex-col items-center justify-center text-center"
        style={{ transform: 'translateY(-20%)' }}
      >
        <div className="text-4xl font-bold" style={{ color: performanceInfo.color }}>
          {normalizedValue}%
        </div>
        <div className="text-gray-400 text-sm mt-1">Close ratio</div>
        <div className="text-sm mt-1" style={{ color: performanceInfo.color }}>
          {performanceInfo.level}
        </div>
      </div>
    </div>
  );
}