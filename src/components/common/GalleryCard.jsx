import React, { useState } from 'react';
import { ZoomIn, Image as ImageIcon } from 'lucide-react';

export const GalleryCard = ({ item, onSelect, className = '' }) => {
  const [imageError, setImageError] = useState(!item?.imageUrl);

  if (!item) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className={`group relative overflow-hidden rounded-2xl border border-sand/80 bg-cream-light cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-burgundy/15 transition-all duration-500 transform hover:-translate-y-2 hover:border-bronze ${className}`}
    >
      {/* Sliding Top Accent Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-sand/25">
        {!imageError && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-sand/30 text-brand-muted p-4 text-center">
            <ImageIcon className="w-8 h-8 text-bronze/60 mb-1" />
            <span className="text-xs font-medium text-brand-muted line-clamp-1">{item.title}</span>
          </div>
        )}

        {/* Hover Gradient Overlay with Sliding Content Animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-white">
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <h4 className="text-base font-bold text-white font-sans leading-tight line-clamp-1">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-xs text-cream/90 line-clamp-2 mt-1 font-light">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Zoom Icon Pill with Scale & Rotate Animation */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream/95 backdrop-blur-md text-burgundy flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 group-hover:rotate-45 transition-all duration-300 shadow-md border border-white/30">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Visible Bottom Caption Bar */}
      <div className="p-3 sm:p-3.5 bg-cream-light border-t border-sand/40 flex items-center justify-between gap-2 group-hover:bg-sand/15 transition-colors duration-300">
        <h4 className="text-xs font-semibold text-brand-dark truncate flex-1 group-hover:text-burgundy transition-colors duration-300">
          {item.title}
        </h4>
        {item.category && (
          <span className="text-[10px] font-medium text-bronze uppercase tracking-wider truncate px-2 py-0.5 rounded-full bg-bronze/10 border border-bronze/20 shrink-0">
            {item.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default GalleryCard;
