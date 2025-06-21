
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface GroveProgressProps {
  filledCount: number;
  totalCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  className?: string;
}

export function GroveProgress({ 
  filledCount = 0, 
  totalCount = 11, 
  size = 'md',
  showPulse = false,
  className 
}: GroveProgressProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48', 
    lg: 'w-64 h-64'
  };
  
  const dotSize = {
    sm: 8,
    md: 12,
    lg: 16
  };
  
  const centerSize = {
    sm: 16,
    md: 24,
    lg: 32
  };

  const positions = [];
  const radius = size === 'sm' ? 48 : size === 'md' ? 72 : 96;
  const centerX = size === 'sm' ? 64 : size === 'md' ? 96 : 128;
  const centerY = centerX;
  
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

  const progress = (filledCount / (totalCount - 1)) * 100;
  const isComplete = filledCount >= totalCount - 1;

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${centerX * 2} ${centerY * 2}`}
          className="transform transition-all duration-1000"
        >
          {/* Gentle background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 20}
            fill="none"
            stroke="rgba(138, 126, 96, 0.1)"
            strokeWidth={1}
            strokeDasharray="2,4"
            className="animate-spin"
            style={{ animationDuration: '30s' }}
          />
          
          {/* Progress ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 10}
            fill="none"
            stroke="rgba(106, 95, 68, 0.2)"
            strokeWidth={3}
            strokeDasharray={`${(progress / 100) * 2 * Math.PI * (radius + 10)} ${2 * Math.PI * (radius + 10)}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${centerX} ${centerY})`}
            className="transition-all duration-700"
          />
          
          {/* Connection lines */}
          {positions.slice(1).map((pos, index) => {
            const isFilled = index < filledCount;
            const midX = (centerX + pos.x) / 2;
            const midY = (centerY + pos.y) / 2;
            const offset = 8 * Math.sin(index * 0.6);
            
            return (
              <path
                key={`line-${index}`}
                d={`M ${centerX} ${centerY} Q ${midX + offset} ${midY + offset} ${pos.x} ${pos.y}`}
                stroke={isFilled ? 'rgba(106, 95, 68, 0.8)' : 'rgba(210, 210, 214, 0.3)'}
                strokeWidth={isFilled ? 2 : 1}
                fill="none"
                className="transition-all duration-500"
              />
            );
          })}
          
          {/* Member dots */}
          {positions.slice(1).map((pos, index) => {
            const isFilled = index < filledCount;
            
            return (
              <g key={`member-${index}`}>
                {isFilled && showPulse && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={dotSize[size] + 4}
                    fill="rgba(106, 95, 68, 0.3)"
                    className="animate-ping"
                  />
                )}
                
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={dotSize[size]}
                  fill={isFilled ? '#6A5F44' : '#F5F5F7'}
                  stroke={isFilled ? '#4A4230' : '#D2D2D6'}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                
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
          
          {/* Center circle (the user) */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={centerSize[size] + 8}
              fill="transparent"
              stroke="rgba(106, 95, 68, 0.3)"
              strokeWidth={1}
              className={showPulse ? "animate-pulse" : ""}
            />
            
            <circle
              cx={centerX}
              cy={centerY}
              r={centerSize[size]}
              fill="#4A4230"
              stroke="#312C1F"
              strokeWidth={2}
            />
            
            <circle
              cx={centerX - 6}
              cy={centerY - 6}
              r={6}
              fill="rgba(245, 245, 247, 0.4)"
            />
            
            {isComplete && (
              <g>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={centerSize[size] - 8}
                  fill="rgba(255, 215, 0, 0.2)"
                  className="animate-pulse"
                />
                <Sparkles 
                  x={centerX - 8} 
                  y={centerY - 8} 
                  width={16} 
                  height={16} 
                  className="text-yellow-400"
                />
              </g>
            )}
          </g>
        </svg>
      </div>
      
      {/* Progress text */}
      <div className="mt-4 text-center space-y-2">
        <div className="text-earth-700 font-medium text-sm">
          {filledCount} of {totalCount - 1} gathered
        </div>
        
        <div className="w-24 bg-stone-200 rounded-full h-1.5">
          <div 
            className="bg-earth-600 h-1.5 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {isComplete && (
          <div className="text-xs text-earth-600 font-medium animate-fade-in">
            Grove Complete ✨
          </div>
        )}
      </div>
    </div>
  );
}
