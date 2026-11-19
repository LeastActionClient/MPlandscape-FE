import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service, onEnquire, className = '' }) => {
  if (!service) return null;

  return (
    <article
      className={`card-luxury flex flex-col h-full overflow-hidden group border border-sand bg-cream-light shadow-xs hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Compact Image Thumbnail (Proportional Aspect Ratio) */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-sand/20 flex items-center justify-center">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
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

        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {service.subtitle && (
          <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-semibold text-white tracking-wide truncate bg-burgundy/85 backdrop-blur-xs px-2.5 py-1 rounded-md">
            {service.subtitle}
          </span>
        )}
      </div>

      {/* Compact Card Content: Title, Clamped Description & Action Buttons */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold font-sans text-brand-dark group-hover:text-burgundy transition-colors leading-snug break-words">
            <Link to={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Action Buttons: Anchored to Bottom */}
        <div className="pt-4 mt-4 flex items-center gap-2.5 border-t border-sand/40">
          <Link
            to={`/services/${service.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all text-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => (onEnquire ? onEnquire(service) : null)}
            className="flex-1 inline-flex items-center justify-center text-xs font-semibold py-2 px-3 rounded-lg bg-bronze text-white hover:bg-bronze-dark transition-all text-center shadow-xs cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
