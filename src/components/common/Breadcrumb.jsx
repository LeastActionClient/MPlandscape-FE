import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [], className = '', light = false }) => {
  return (
    <nav className={`flex items-center text-xs font-medium py-2 ${light ? 'text-cream/80' : 'text-brand-muted'} ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className={`inline-flex items-center transition-colors gap-1 ${light ? 'text-cream/80 hover:text-white' : 'text-brand-muted hover:text-burgundy'}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label || index} className="inline-flex items-center">
              <ChevronRight className={`w-3.5 h-3.5 mx-1 ${light ? 'text-bronze-light' : 'text-sand-dark'}`} />
              {isLast || !item.to ? (
                <span className={`font-semibold truncate max-w-[200px] sm:max-w-none ${light ? 'text-white' : 'text-burgundy'}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={`transition-colors truncate max-w-[150px] sm:max-w-none ${light ? 'text-cream/80 hover:text-white' : 'text-brand-muted hover:text-burgundy'}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
