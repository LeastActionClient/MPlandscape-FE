import React from 'react';
import ScrollReveal from './ScrollReveal';

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
    <ScrollReveal animation="fade-up" duration={700} className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
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

      {/* Refined Bronze Decorative Accents around Section Headings */}
      {align === 'center' ? (
        <div className="flex items-center justify-center gap-2.5 my-3.5 select-none" aria-hidden="true">
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-bronze/60" />
          <span className="w-1.5 h-1.5 rotate-45 border border-bronze bg-bronze/30 shadow-2xs" />
          <div className="h-0.5 w-14 sm:w-18 bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light rounded-full shadow-xs transition-all duration-500 hover:w-24" />
          <span className="w-1.5 h-1.5 rotate-45 border border-bronze bg-bronze/30 shadow-2xs" />
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-bronze/60" />
        </div>
      ) : (
        <div className="flex items-center gap-2.5 my-3.5 select-none" aria-hidden="true">
          <span className="w-1.5 h-1.5 rotate-45 border border-bronze bg-bronze/30 shadow-2xs" />
          <div className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-bronze to-transparent rounded-full shadow-xs" />
        </div>
      )}

      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed font-normal ${
            light ? 'text-cream/90' : 'text-brand-muted font-medium'
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
};

export default SectionHeading;
