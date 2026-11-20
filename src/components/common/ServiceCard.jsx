import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service, onEnquire, className = '' }) => {
  if (!service) return null;

  return (
    <article
      className={`card-luxury flex flex-col h-full overflow-hidden group relative rounded-2xl border border-sand/80 bg-cream-light shadow-sm hover:shadow-2xl hover:shadow-burgundy/10 hover:-translate-y-2 hover:border-bronze transition-all duration-500 ${className}`}
    >
      {/* Sliding Top Accent Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

      {/* Compact Image Thumbnail (Proportional Aspect Ratio) */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-sand/20 flex items-center justify-center">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/mp-logo.png';
              e.currentTarget.className =
                'w-auto h-20 object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-105';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-sand/30 p-4 text-center">
            <img
              src="/mp-logo.png"
              alt="MP Landscape Services"
              className="w-auto h-20 object-contain opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-xs"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

        {service.subtitle && (
          <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-semibold text-white tracking-wide truncate bg-burgundy/90 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 shadow-md">
            {service.subtitle}
          </span>
        )}
      </div>

      {/* Compact Card Content: Title, Clamped Description & Action Buttons */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold font-sans text-brand-dark group-hover:text-burgundy transition-colors duration-300 leading-snug break-words">
            <Link to={`/services/${service.slug}`} className="hover:underline flex items-center justify-between">
              <span>{service.title}</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze shrink-0 ml-2" />
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Action Buttons: Anchored to Bottom */}
        <div className="pt-4 mt-5 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 border-t border-sand/40">
          <Link
            to={`/services/${service.slug}`}
            className="w-full xs:flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg border border-burgundy/30 text-burgundy bg-transparent hover:bg-burgundy hover:text-white hover:border-burgundy shadow-2xs hover:shadow-md transition-all duration-300 text-center group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={() => (onEnquire ? onEnquire(service) : null)}
            className="w-full xs:flex-1 inline-flex items-center justify-center text-xs font-semibold py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg bg-gradient-to-r from-bronze to-bronze-dark text-white hover:from-bronze-light hover:to-bronze transition-all duration-300 text-center shadow-xs hover:shadow-lg hover:shadow-bronze/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer relative overflow-hidden"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
