import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, ArrowRight, Phone } from 'lucide-react';
import MPLogo from '../../assets/logo/MPLogo';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

export const Header = ({ settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phone = settings?.phoneNumbers?.[0] || '+91 98765 43210';

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-burgundy-dark text-cream-light text-xs font-medium py-2 px-4 border-b border-burgundy/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
            <span className="truncate">
              Premier Landscaping, Agriculture & Horticultural Solutions
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-bronze-light transition-colors"
            >
              <Phone className="w-3 h-3 text-bronze" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-sand shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          {/* Logo Brand Link */}
          <Link to="/" className="flex items-center group py-1 focus:outline-hidden">
            <MPLogo imgClassName="h-16 sm:h-20 md:h-22 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex btn-primary text-sm shadow-xs"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-bronze-light" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-lg border border-sand bg-cream-light text-burgundy hover:bg-sand/30 transition-colors focus:outline-hidden"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
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
