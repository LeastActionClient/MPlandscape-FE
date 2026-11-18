import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | MP Landscape Services</title>
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center bg-cream">
        <div className="max-w-md space-y-5">
          <p className="text-6xl sm:text-7xl font-extrabold text-burgundy font-sans">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">Page Not Found</h1>
          <p className="text-sm text-brand-muted leading-relaxed">
            The page you requested may have been moved, renamed, or is currently unavailable.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link to="/" className="btn-primary text-xs">
              <Home className="w-4 h-4 mr-1.5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/services" className="btn-outline text-xs">
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
