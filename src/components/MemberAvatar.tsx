
import React from 'react';
import { cn } from '@/lib/utils';

interface MemberAvatarProps {
  name?: string;
  initials?: string;
  status: 'confirmed' | 'pending' | 'empty';
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
  onClick?: () => void;
}

export function MemberAvatar({ 
  name, 
  initials,
  status, 
  size = 'md',
  showStatus = true,
  className,
  onClick 
}: MemberAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm', 
    lg: 'w-16 h-16 text-base'
  };
  
  const statusColors = {
    confirmed: 'bg-earth-600 text-white border-earth-700',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    empty: 'bg-stone-100 text-stone-400 border-stone-300 border-dashed'
  };
  
  const displayText = initials || (name ? name.charAt(0).toUpperCase() : '?');
  
  return (
    <div className={cn('relative inline-block', className)}>
      <button
        onClick={onClick}
        disabled={!onClick}
        className={cn(
          'rounded-full font-medium border-2 transition-all duration-200 flex items-center justify-center',
          sizeClasses[size],
          statusColors[status],
          onClick && 'hover:scale-105 cursor-pointer',
          status === 'confirmed' && 'shadow-sm'
        )}
      >
        {displayText}
      </button>
      
      {showStatus && status === 'confirmed' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
      
      {showStatus && status === 'pending' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 border-2 border-white rounded-full animate-pulse" />
      )}
    </div>
  );
}
