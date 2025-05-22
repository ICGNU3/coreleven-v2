
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

export function NavBar({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav className={cn('py-6', className)}>
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-medium text-earth-700 hover:text-earth-800 transition-duration-300">
          Coreleven
        </Link>
        
        {isMobile ? (
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-2 rounded-md hover:bg-earth-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-earth-700" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 border border-earth-100">
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-sm text-stone-600 hover:bg-earth-50 hover:text-earth-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/faq" 
                  className="block px-4 py-2 text-sm text-stone-600 hover:bg-earth-50 hover:text-earth-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>
                <a 
                  href="https://whop.com/coreleven/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-stone-600 hover:bg-earth-50 hover:text-earth-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Build a Grove
                </a>
                <a 
                  href="https://whop.com/coreleven/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-stone-600 hover:bg-earth-50 hover:text-earth-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  I've been invited
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-sm font-medium text-stone-600 hover:text-earth-700 transition-colors hover:underline">
              About
            </Link>
            <Link to="/faq" className="text-sm font-medium text-stone-600 hover:text-earth-700 transition-colors hover:underline">
              FAQ
            </Link>
            <a 
              href="https://whop.com/coreleven/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-stone-600 hover:text-earth-700 transition-colors hover:underline"
            >
              Build a Grove
            </a>
            <a 
              href="https://whop.com/coreleven/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 bg-earth-700 text-white rounded-md hover:bg-earth-800 transition-colors"
            >
              I've been invited
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
