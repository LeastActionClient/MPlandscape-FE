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

  const phone = settings?.phoneNumbers?.[0] || '+91 8838548402';
  const email = settings?.emailAddresses?.[0] || 'info@mplandscape.com';

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Menu */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[85vw] sm:max-w-xs bg-cream-light border-l border-sand shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header row */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-6 border-b border-sand gap-3">
            <MPLogo
              imgClassName="h-[42px] min-[360px]:h-[44px] sm:h-12 w-auto object-contain shrink-0"
              textClassName="text-[14px] min-[360px]:text-[15px] sm:text-base font-serif font-bold"
              subtitleClassName="text-[8px] min-[360px]:text-[8.5px] sm:text-[9.5px] font-sans font-semibold tracking-[0.16em] sm:tracking-[0.2em]"
              showText={true}
            />
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-brand-dark hover:bg-sand/30 transition-colors shrink-0"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-4 sm:mt-6 flex flex-col space-y-0.5 sm:space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-dm text-[15px] sm:text-base tracking-normal transition-all ${
                    isActive
                      ? 'bg-burgundy text-white shadow-xs font-semibold'
                      : 'text-brand-dark hover:bg-sand/30 hover:text-burgundy font-medium'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Quick CTA */}
          <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-sand">
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-primary w-full justify-center font-dm font-medium text-[14.5px] sm:text-sm py-2.5 sm:py-3 px-4 rounded-lg tracking-normal shadow-xs transition-all"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-bronze-light shrink-0" />
            </Link>
          </div>
        </div>

        {/* Contact info footer in mobile drawer */}
        <div className="p-4 sm:p-6 bg-cream border-t border-sand space-y-2.5 sm:space-y-3">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2.5 text-xs sm:text-xs font-dm font-medium text-brand-dark hover:text-burgundy transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze shrink-0" />
            <span>{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2.5 text-xs sm:text-xs font-dm font-medium text-brand-dark hover:text-burgundy transition-colors"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze shrink-0" />
            <span className="truncate">{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
