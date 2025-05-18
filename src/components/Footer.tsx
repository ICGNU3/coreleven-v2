
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn('border-t border-stone-200 py-8 mt-16', className)}>
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-stone-500">
              © {currentYear} Coreleven. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-stone-500 hover:text-earth-600 transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-stone-500 hover:text-earth-600 transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="text-sm text-stone-500 hover:text-earth-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
