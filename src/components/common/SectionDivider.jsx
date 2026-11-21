import React from 'react';

/**
 * SectionDivider Component
 * Provides refined transitions, smooth gradient dividers, and organic subtle wave accents between sections.
 */
export const SectionDivider = ({
  variant = 'bronze-accent',
  className = '',
  fillColor = 'fill-sand-50',
}) => {
  if (variant === 'curved-transition') {
    return (
      <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`} aria-hidden="true">
        <svg
          className={`relative block w-full h-5 sm:h-8 ${fillColor}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    );
  }

  if (variant === 'soft-fade') {
    return (
      <div
        className={`w-full h-8 sm:h-12 bg-gradient-to-b from-transparent to-sand-50/60 pointer-events-none select-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Default: 'bronze-accent' - refined 1px gradient line with center bronze diamond
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pointer-events-none select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="w-full flex items-center justify-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-sand-300 to-sand-400/60" />
        <span className="flex items-center gap-1.5 shrink-0 opacity-70">
          <span className="w-1 h-1 rounded-full bg-bronze/60" />
          <span className="w-2 h-2 rotate-45 border border-bronze bg-sand-100" />
          <span className="w-1 h-1 rounded-full bg-bronze/60" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-sand-300 to-sand-400/60" />
      </div>
    </div>
  );
};

export default SectionDivider;
