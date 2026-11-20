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
      className={`group relative overflow-hidden rounded-2xl border border-sand/60 bg-brand-charcoal cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-4/3 w-full select-none ${className}`}
    >
      {/* Background Image */}
      {!imageError && item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/35" />

      {/* Subtle Zoom Indicator on Hover */}
      <div className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-white/20">
        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
      </div>

      {/* Bottom Title Overlay with Small Elegant Icon */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-10 flex items-center gap-2 sm:gap-2.5 min-w-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/40 border border-white/20 flex items-center justify-center shrink-0">
          <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze-light" />
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate drop-shadow-sm font-sans flex-1">
          {item.title}
        </h4>
      </div>
    </div>
  );
};

export default GalleryCard;
