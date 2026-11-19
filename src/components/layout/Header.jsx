import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import MPLogo from '../../assets/logo/MPLogo';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

export const Header = ({ settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-sand shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-[4.5rem] flex items-center justify-between gap-4">
          {/* Left: Unified Brand Section (Logo + MP Landscape Services Wordmark) */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center group py-0.5 focus:outline-hidden"
              aria-label="MP Landscape Services Home"
            >
              <MPLogo
                imgClassName="h-11 sm:h-12 md:h-[50px] w-auto object-contain"
                showText={true}
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 px-2">
            <Navigation />
          </div>

          {/* Right: Action CTA & Mobile Trigger */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary text-xs lg:text-sm px-3.5 py-2 lg:px-4.5 lg:py-2 shadow-xs whitespace-nowrap"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-bronze-light shrink-0" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg border border-sand bg-cream-light text-burgundy hover:bg-sand/30 transition-colors focus:outline-hidden"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        settings={settings}
      />
    </>
  );
};

export default Header;
