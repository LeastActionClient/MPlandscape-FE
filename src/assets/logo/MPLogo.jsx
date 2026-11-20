import React from 'react';
import mpLogoImg from './mp-logo.png';

/**
 * Official MP Landscape Services Logo & Wordmark Component
 * Center-aligned logo and professional brand wordmark.
 * Uses authentic brand typography and colors (Burgundy #542B32 & Charcoal #292626).
 */
export const MPLogo = ({
  className = '',
  imgClassName = 'h-11 sm:h-12 w-auto',
  containerClassName = '',
  variant = 'default', // 'default' | 'white-box' | 'dark-bg'
  showText = false,
  textClassName = '',
}) => {
  const isDarkBg = variant === 'dark-bg';
  const isWhiteBox = variant === 'white-box' || isDarkBg;

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Official Supplied Logo Badge */}
      <div
        className={`relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isWhiteBox
            ? 'bg-white rounded-xl p-1.5 shadow-xs'
            : ''
        } ${containerClassName}`}
      >
        <img
          src={mpLogoImg}
          alt="MP Landscape Services"
          className={`object-contain drop-shadow-xs ${imgClassName}`}
          loading="eager"
        />
      </div>

      {/* Brand Wordmark (Company Name) */}
      {showText && (
        <div className="flex flex-col justify-center text-left select-none">
          <span
            className={`font-serif font-bold text-xs sm:text-base lg:text-lg tracking-tight leading-none transition-colors ${
              isDarkBg ? 'text-cream' : 'text-burgundy group-hover:text-burgundy-dark'
            } ${textClassName}`}
          >
            MP Landscape
          </span>
          <span
            className={`font-sans text-[8px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase leading-none mt-0.5 sm:mt-1 ${
              isDarkBg ? 'text-sand-300' : 'text-charcoal/80'
            }`}
          >
            Services
          </span>
        </div>
      )}
    </div>
  );
};

export default MPLogo;
