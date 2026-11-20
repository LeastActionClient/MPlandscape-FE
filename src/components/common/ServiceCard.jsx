import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service, onEnquire, className = '' }) => {
  if (!service) return null;

  return (
    <article
      className={`card-luxury flex flex-col h-full overflow-hidden group relative rounded-2xl border border-sand/80 bg-cream-light shadow-sm hover:shadow-xl hover:shadow-burgundy/10 hover:-translate-y-1.5 hover:border-bronze transition-all duration-300 ${className}`}
    >
      {/* Sliding Top Accent Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

      {/* Proportional Image Thumbnail without Overlay Labels */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-sand/20 flex items-center justify-center">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

        {/* Subtle hover gradient for refined contrast */}
        <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Compact Card Content: Refined Title & Horizontal Action Buttons */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="flex-1 flex items-center">
          <h3 className="text-[15px] sm:text-base font-bold font-sans text-brand-dark group-hover:text-burgundy transition-colors duration-300 leading-snug break-words w-full">
            <Link to={`/services/${service.slug}`} className="hover:underline flex items-start justify-between gap-1.5">
              <span>{service.title}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze shrink-0 mt-0.5" />
            </Link>
          </h3>
        </div>

        {/* Action Buttons: Horizontally Aligned in the Same Row */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-sand/40">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center justify-center gap-1 text-xs sm:text-[13px] font-semibold py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg border border-burgundy/35 text-burgundy bg-transparent hover:bg-burgundy hover:text-white hover:border-burgundy shadow-2xs hover:shadow-xs transition-all duration-300 text-center whitespace-nowrap group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={() => (onEnquire ? onEnquire(service) : null)}
            className="inline-flex items-center justify-center text-xs sm:text-[13px] font-semibold py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg bg-gradient-to-r from-bronze to-bronze-dark text-white hover:from-bronze-light hover:to-bronze transition-all duration-300 text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
