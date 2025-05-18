
import React from 'react';
import { cn } from '@/lib/utils';

interface CircleVisualProps {
  className?: string;
  filledCount?: number;
  totalCount?: number;
}

export function CircleVisual({ 
  className, 
  filledCount = 0, 
  totalCount = 11 
}: CircleVisualProps) {
  // Size and positioning calculations
  const size = 280;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.32;
  
  // Calculate positions for all circles
  const positions = [];
  
  // First, add the center point
  positions.push({ x: centerX, y: centerY });
  
  // Then add positions for the outer circle
  const outerCircles = totalCount - 1;
  for (let i = 0; i < outerCircles; i++) {
    const angle = (i * 2 * Math.PI) / outerCircles - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.push({ x, y });
  }

  return (
    <div className={cn('relative', className)}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="transform transition-transform duration-1000 ease-in-out"
      >
        {/* Connection lines */}
        {positions.slice(1).map((pos, index) => (
          <line 
            key={`line-${index}`}
            x1={centerX}
            y1={centerY}
            x2={pos.x}
            y2={pos.y}
            stroke={index < filledCount ? 'rgba(138, 126, 96, 0.7)' : 'rgba(159, 158, 161, 0.3)'}
            strokeWidth={index < filledCount ? 1.5 : 0.8}
            className="transition-all duration-700"
          />
        ))}
        
        {/* Outer circles */}
        {positions.slice(1).map((pos, index) => (
          <circle
            key={`circle-${index}`}
            cx={pos.x}
            cy={pos.y}
            r={16}
            fill={index < filledCount ? 'rgba(138, 126, 96, 0.9)' : 'rgba(230, 230, 232, 0.7)'}
            stroke={index < filledCount ? 'rgba(106, 95, 68, 0.6)' : 'rgba(171, 171, 174, 0.4)'}
            strokeWidth={1.5}
            className="transition-all duration-500"
          />
        ))}
        
        {/* Center circle - you */}
        <circle
          cx={centerX}
          cy={centerY}
          r={24}
          fill="rgba(106, 95, 68, 0.9)"
          stroke="rgba(74, 66, 48, 0.6)"
          strokeWidth={2}
        />
        
        {/* Add a subtle pulse animation to the center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={24}
          fill="transparent"
          stroke="rgba(138, 126, 96, 0.4)"
          strokeWidth={2}
          className="animate-ripple origin-center"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>
      
      {/* Text labels */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xs text-stone-600 font-medium">
        You
      </div>
      <div className="text-center mt-4 text-stone-700 text-sm font-medium">
        {filledCount} of {totalCount - 1} spots filled
      </div>
    </div>
  );
}
