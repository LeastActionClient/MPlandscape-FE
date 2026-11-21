import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl animate-fade-in-up ${alignment} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-xs font-semibold tracking-wider uppercase mb-3 border transition-all duration-300 shadow-2xs hover:scale-105 hover:shadow-xs ${
            light
              ? 'bg-cream/10 text-cream border-cream/20 hover:border-bronze/40'
              : 'bg-burgundy/10 text-burgundy border-burgundy/20 hover:border-bronze/50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse shrink-0" />
          <span>{badge}</span>
        </span>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold font-sans tracking-tight leading-snug break-words ${
            light ? 'text-cream' : 'text-burgundy'
          }`}
        >
          {title}
        </h2>
      )}

      {/* Decorative Bronze Divider Accent with gradient and sliding shimmer */}
      <div
        className={`h-1 w-16 bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light rounded-full my-3.5 shadow-xs transition-all duration-500 hover:w-24 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed font-normal ${
            light ? 'text-cream/90' : 'text-brand-muted font-medium'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
