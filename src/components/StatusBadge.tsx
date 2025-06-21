
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Users } from 'lucide-react';

interface StatusBadgeProps {
  status: 'completed' | 'in-progress' | 'pending' | 'empty';
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = 'md', showIcon = true, className }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };
  
  const statusConfig = {
    completed: {
      label: 'Complete',
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    'in-progress': {
      label: 'In Progress', 
      icon: Users,
      className: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    empty: {
      label: 'Open',
      icon: Users,
      className: 'bg-stone-100 text-stone-600 border-stone-200'
    }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium border',
      sizeClasses[size],
      config.className,
      className
    )}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </span>
  );
}
