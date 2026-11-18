import React from 'react';
import { ZoomIn } from 'lucide-react';

export const GalleryCard = ({ item, onSelect, className = '' }) => {
  if (!item) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className={`group relative overflow-hidden rounded-xl border border-sand bg-cream-light cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-sand/30">
        <img
          src={item.imageUrl || '/mp-logo.png'}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/mp-logo.png';
          }}
        />


        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-bronze text-white px-2.5 py-0.5 rounded-full w-max mb-1.5 shadow-xs">
            {item.category}
          </span>
          <h4 className="text-base font-bold text-white font-sans leading-tight line-clamp-1">
            {item.title}
          </h4>
          {item.description && (
            <p className="text-xs text-cream/90 line-clamp-2 mt-1 font-light">
              {item.description}
            </p>
          )}
        </div>

        {/* Zoom Icon Pill */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-xs text-burgundy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Visible Bottom Caption Bar */}
      <div className="p-3.5 bg-cream-light border-t border-sand/40 flex items-center justify-between">
        <h4 className="text-xs font-semibold text-brand-dark truncate max-w-[70%]">
          {item.title}
        </h4>
        <span className="text-[10px] font-medium text-bronze uppercase tracking-wider truncate">
          {item.category}
        </span>
      </div>
    </div>
  );
};

export default GalleryCard;
