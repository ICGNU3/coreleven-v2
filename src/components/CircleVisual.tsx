
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
  const size = 280;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.32;
  
  // Calculate positions for all circles
  const positions = [];
  
  // Center position (the user)
  positions.push({ x: centerX, y: centerY });
  
  // Outer circle positions (the invites)
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
        className="transform transition-all duration-1000 ease-in-out"
      >
        {/* Gentle background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 30}
          fill="rgba(138, 126, 96, 0.05)"
          stroke="rgba(138, 126, 96, 0.1)"
          strokeWidth={1}
        />
        
        {/* Connection lines with organic curves */}
        {positions.slice(1).map((pos, index) => {
          const isFilled = index < filledCount;
          const midX = (centerX + pos.x) / 2;
          const midY = (centerY + pos.y) / 2;
          const offset = 15 * Math.sin(index * 0.8); // Organic curve
          
          return (
            <path
              key={`line-${index}`}
              d={`M ${centerX} ${centerY} Q ${midX + offset} ${midY + offset} ${pos.x} ${pos.y}`}
              stroke={isFilled ? 'rgba(106, 95, 68, 0.6)' : 'rgba(210, 210, 214, 0.4)'}
              strokeWidth={isFilled ? 2 : 1}
              fill="none"
              className="transition-all duration-700"
            />
          );
        })}
        
        {/* Outer circles (invites) */}
        {positions.slice(1).map((pos, index) => {
          const isFilled = index < filledCount;
          
          return (
            <g key={`circle-${index}`}>
              {/* Subtle glow for filled circles */}
              {isFilled && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={20}
                  fill="rgba(106, 95, 68, 0.1)"
                  className="animate-pulse"
                />
              )}
              
              <circle
                cx={pos.x}
                cy={pos.y}
                r={16}
                fill={isFilled ? 'rgba(106, 95, 68, 0.9)' : 'rgba(245, 245, 247, 0.8)'}
                stroke={isFilled ? 'rgba(74, 66, 48, 0.8)' : 'rgba(210, 210, 214, 0.6)'}
                strokeWidth={isFilled ? 2 : 1.5}
                className="transition-all duration-500"
              />
              
              {/* Small inner dot for visual interest */}
              {isFilled && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="rgba(245, 245, 247, 0.9)"
                />
              )}
            </g>
          );
        })}
        
        {/* Center circle (the user) - always filled */}
        <g>
          {/* Gentle pulse ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={30}
            fill="transparent"
            stroke="rgba(106, 95, 68, 0.2)"
            strokeWidth={1}
            className="animate-pulse"
          />
          
          {/* Main center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={24}
            fill="rgba(74, 66, 48, 0.95)"
            stroke="rgba(49, 42, 30, 0.8)"
            strokeWidth={2}
          />
          
          {/* Center highlight */}
          <circle
            cx={centerX - 6}
            cy={centerY - 6}
            r={6}
            fill="rgba(245, 245, 247, 0.3)"
          />
        </g>
      </svg>
      
      {/* Progress indicator */}
      <div className="text-center mt-4">
        <div className="text-earth-700 text-sm font-medium">
          {filledCount} of {totalCount - 1} spots filled
        </div>
        <div className="w-32 bg-stone-200 rounded-full h-2 mx-auto mt-2">
          <div 
            className="bg-earth-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(filledCount / (totalCount - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
