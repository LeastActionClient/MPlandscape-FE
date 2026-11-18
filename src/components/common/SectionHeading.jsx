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
    <div className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border ${
            light
              ? 'bg-cream/10 text-cream border-cream/20'
              : 'bg-burgundy/10 text-burgundy border-burgundy/20'
          }`}
        >
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold font-sans tracking-tight leading-snug ${
            light ? 'text-cream' : 'text-burgundy'
          }`}
        >
          {title}
        </h2>
      )}

      {/* Decorative Bronze Divider Accent */}
      <div
        className={`h-1 w-16 bg-bronze rounded-full my-3.5 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? 'text-cream/80' : 'text-brand-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
