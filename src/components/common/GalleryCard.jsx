import React, { useState } from 'react';
import {
  ZoomIn,
  Image as ImageIcon,
  Leaf,
  Sprout,
  Droplets,
  Layers,
  Scissors,
  Trees,
  RefreshCw,
  Building2,
} from 'lucide-react';

const getCardIcon = (title = '', category = '') => {
  const text = `${title} ${category}`.toLowerCase();
  if (text.includes('irrig') || text.includes('water')) return Droplets;
  if (text.includes('farm') || text.includes('agri')) return Sprout;
  if (text.includes('arch') || text.includes('hardscape') || text.includes('stone')) return Layers;
  if (text.includes('maint') || text.includes('prun') || text.includes('care') || text.includes('lawn')) return Scissors;
  if (text.includes('nursery') || text.includes('tree') || text.includes('plant supply')) return Trees;
  if (text.includes('trad')) return RefreshCw;
  if (text.includes('court') || text.includes('commercial') || text.includes('estate') || text.includes('villa')) return Building2;
  return Leaf;
};

export const GalleryCard = ({ item, onSelect, className = '' }) => {
  const [imageError, setImageError] = useState(!item?.imageUrl);

  if (!item) return null;

  const IconComponent = getCardIcon(item.title, item.category);

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className={`group relative overflow-hidden rounded-2xl border border-sand/70 bg-brand-charcoal cursor-pointer shadow-md hover:shadow-2xl hover:shadow-burgundy/25 transition-all duration-500 transform hover:-translate-y-2 aspect-4/3 w-full select-none ${className}`}
    >
      {/* Sliding Top Accent Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20 pointer-events-none" />

      {/* Subtle Ambient Corner Glow on Hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-bronze/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Background Image with Smooth Organic Zoom */}
      {!imageError && item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-sand/20 text-cream p-4 text-center">
          <ImageIcon className="w-8 h-8 text-bronze/70 mb-1" />
          <span className="text-xs font-medium text-cream/80 line-clamp-1">{item.title}</span>
        </div>
      )}

      {/* Permanent Dark Gradient Overlay for Maximum Title Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/45" />

      {/* Modern Zoom / Expand Indicator Pill */}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg border border-white/20 group-hover:border-bronze/60">
        <ZoomIn className="w-3.5 h-3.5 text-bronze-light" />
        <span className="text-[11px] font-semibold text-white tracking-wide hidden sm:inline">View</span>
      </div>

      {/* Bottom Title Overlay with Animated Icon and Arrow */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex items-center justify-between gap-2.5 min-w-0">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/55 border border-white/20 group-hover:border-bronze/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze-light" />
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate drop-shadow-sm font-sans flex-1 group-hover:text-sand-100 transition-colors duration-300">
            {item.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
