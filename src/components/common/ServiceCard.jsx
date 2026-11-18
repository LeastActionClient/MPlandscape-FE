import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './Button';

export const ServiceCard = ({ service, onEnquire, className = '' }) => {
  if (!service) return null;

  return (
    <article
      className={`card-luxury flex flex-col h-full overflow-hidden group border border-sand bg-cream-light ${className}`}
    >
      {/* Image Thumbnail with Overlay Accent */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-sand/20">
        <img
          src={service.imageUrl || '/mp-logo.png'}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/mp-logo.png';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {service.subtitle && (
          <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white tracking-wide truncate bg-burgundy/85 backdrop-blur-xs px-2.5 py-1 rounded-md">
            {service.subtitle}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold font-sans text-brand-dark group-hover:text-burgundy transition-colors line-clamp-1">
            <Link to={`/services/${service.slug}`}>
              {service.title}
            </Link>
          </h3>

          <p className="text-sm text-brand-muted line-clamp-3 leading-relaxed">
            {service.description}
          </p>

          {/* Features Preview */}
          {service.features && service.features.length > 0 && (
            <ul className="pt-2 space-y-1.5 border-t border-sand/60">
              {service.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-brand-dark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center gap-3 border-t border-sand/40">
          <Link
            to={`/services/${service.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-lg border border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all text-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => onEnquire ? onEnquire(service) : null}
            className="flex-1 inline-flex items-center justify-center text-xs font-semibold py-2.5 px-3 rounded-lg bg-bronze text-white hover:bg-bronze-dark transition-all text-center shadow-xs cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
