import React from 'react';
import { getInstagramUrl, getWhatsAppUrl } from '../../utils/socialConfig';

/**
 * Instagram Icon Component
 */
const InstagramIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

/**
 * WhatsApp Icon Component
 */
const WhatsAppIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * FloatingSocialButtons Component
 * Renders fixed, floating Instagram and WhatsApp buttons at the bottom-right corner of the website.
 * - Instagram is positioned above WhatsApp
 * - WhatsApp is positioned directly below Instagram
 * - Both open in a new tab with accessible labels, smooth hover states, and responsive touch targets.
 */
export const FloatingSocialButtons = ({ settings }) => {
  const instagramUrl = getInstagramUrl(settings);
  const whatsappUrl = getWhatsAppUrl(settings);

  return (
    <aside
      aria-label="Quick Social and Messaging Channels"
      className="fixed right-3.5 sm:right-6 bottom-4 sm:bottom-20 lg:bottom-28 z-40 flex flex-col items-center gap-2.5 sm:gap-3 select-none pointer-events-auto"
    >
      {/* 1. Instagram Floating Button (Positioned Above WhatsApp) */}
      <div className="relative flex items-center group">
        {/* Tooltip on Desktop */}
        <span
          role="tooltip"
          className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#542B32] text-cream text-xs font-medium tracking-wide border border-sand/40 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 hidden sm:flex items-center gap-1.5"
        >
          <span>Follow on Instagram</span>
          <span
            className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#542B32]"
            aria-hidden="true"
          />
        </span>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with MP Landscape Services on Instagram (opens in a new tab)"
          className="w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg shadow-black/25 hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-cream"
        >
          <InstagramIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 drop-shadow-xs" />
        </a>
      </div>

      {/* 2. WhatsApp Floating Button (Positioned Directly Below Instagram) */}
      <div className="relative flex items-center group">
        {/* Tooltip on Desktop */}
        <span
          role="tooltip"
          className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#542B32] text-cream text-xs font-medium tracking-wide border border-sand/40 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 hidden sm:flex items-center gap-1.5"
        >
          <span>Chat on WhatsApp</span>
          <span
            className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#542B32]"
            aria-hidden="true"
          />
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with MP Landscape Services on WhatsApp (opens in a new tab)"
          className="w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-black/25 hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-cream"
        >
          <WhatsAppIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 drop-shadow-xs" />
        </a>
      </div>
    </aside>
  );
};

export default FloatingSocialButtons;
