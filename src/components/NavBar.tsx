
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NavBar({ className }: { className?: string }) {
  return (
    <nav className={cn('flex justify-between items-center py-6', className)}>
      <Link to="/" className="text-xl font-medium text-earth-700">
        Coreleven
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/about" className="text-sm text-stone-600 hover:text-earth-700 transition-colors">
          About
        </Link>
        <Link to="/faq" className="text-sm text-stone-600 hover:text-earth-700 transition-colors">
          FAQ
        </Link>
        <a 
          href="https://whop.com/coreleven/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-600 hover:text-earth-700 transition-colors"
        >
          Build a Grove
        </a>
        <a 
          href="https://whop.com/coreleven/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-600 hover:text-earth-700 transition-colors"
        >
          I've been invited
        </a>
      </div>
    </nav>
  );
}
