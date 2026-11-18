import React from 'react';
import mpLogoImg from './mp-logo.png';

/**
 * Official MP Landscape Services Logo Component
 * Uses the cropped, transparent brand logo featuring the lush canopy tree,
 * 3D bevelled MP monogram, and LANDSCAPE SERVICES ribbon badge.
 * Retains exact authentic colors, proportions, and typography.
 */
export const MPLogo = ({
  className = '',
  imgClassName = 'h-16 sm:h-20 md:h-22 w-auto',
  variant = 'default', // 'default' | 'dark-bg'
  showText = false,
  textClassName = '',
}) => {
  const isDarkBg = variant === 'dark-bg';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Supplied Logo Badge */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
          isDarkBg
            ? 'bg-white/95 rounded-xl px-3 py-2 shadow-sm'
            : ''
        }`}
      >
        <img
          src={mpLogoImg}
          alt="MP Landscape Services"
          className={`object-contain drop-shadow-xs ${imgClassName}`}
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-bold tracking-tight text-xl leading-tight uppercase font-sans text-brand-dark ${textClassName}`}
          >
            MP Landscape
          </span>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-bronze">
            Services & Horticulture
          </span>
        </div>
      )}
    </div>
  );
};

export default MPLogo;
