import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ArrowRight, PhoneCall, Mail } from 'lucide-react';
import { navItems } from './Navigation';
import MPLogo from '../../assets/logo/MPLogo';

export const MobileNavigation = ({ isOpen, onClose, settings }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const phone = settings?.phoneNumbers?.[0] || '+91 98765 43210';
  const email = settings?.emailAddresses?.[0] || 'info@mplandscape.com';

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Menu */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream-light border-l border-sand shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-6">
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-sand">
            <MPLogo imgClassName="h-12 w-auto object-contain" showText={true} />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-brand-dark hover:bg-sand/30 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-burgundy" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-burgundy text-white font-semibold shadow-xs'
                      : 'text-brand-dark hover:bg-sand/30 hover:text-burgundy'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Quick CTA */}
          <div className="mt-8 pt-6 border-t border-sand">
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-primary w-full justify-center"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-bronze-light" />
            </Link>
          </div>
        </div>

        {/* Contact info footer in mobile drawer */}
        <div className="p-6 bg-cream border-t border-sand space-y-3">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2.5 text-xs font-semibold text-brand-dark hover:text-burgundy"
          >
            <PhoneCall className="w-4 h-4 text-bronze" />
            <span>{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2.5 text-xs font-medium text-brand-muted hover:text-burgundy"
          >
            <Mail className="w-4 h-4 text-bronze" />
            <span className="truncate">{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
