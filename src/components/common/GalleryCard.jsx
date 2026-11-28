import React, { useState } from 'react';
import {
  Expand,
  Image as ImageIcon,
  Play,
  Film,
} from 'lucide-react';

export const GalleryCard = ({ item, onSelect, className = '' }) => {
  const [mediaError, setMediaError] = useState(!item?.imageUrl);

  if (!item) return null;

  const isVideo =
    item.mediaType === 'VIDEO' ||
    item.resourceType === 'video' ||
    /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(item.imageUrl || '');

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-sand/50 bg-brand-charcoal cursor-pointer shadow-xs hover:shadow-xl hover:shadow-burgundy/15 transition-all duration-400 transform hover:-translate-y-1 select-none w-full ${className}`}
    >
      {/* Media: Image or Video */}
      {!mediaError && item.imageUrl ? (
        isVideo ? (
          <div className="w-full relative overflow-hidden bg-black flex items-center justify-center">
            {item.videoThumbnail ? (
              <img
                src={item.videoThumbnail}
                alt={item.title || 'Video showcase'}
                className="w-full h-auto max-h-[550px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                onError={() => setMediaError(true)}
              />
            ) : (
              <video
                src={item.imageUrl}
                preload="metadata"
                muted
                playsInline
                className="w-full h-auto max-h-[550px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] pointer-events-none"
                onError={() => setMediaError(true)}
              />
            )}

            {/* Play Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-bronze/60 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-burgundy group-hover:border-sand transition-all duration-300">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>

            {/* Top-Left Video Indicator Pill */}
            <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-sand-200 border border-white/20 flex items-center gap-1.5 shadow-md z-10">
              <Film className="w-3 h-3 text-bronze" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Video</span>
            </div>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title || 'Gallery project'}
            loading="lazy"
            className="w-full h-auto block rounded-2xl sm:rounded-3xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            onError={() => setMediaError(true)}
          />
        )
      ) : (
        <div className="w-full min-h-[220px] flex flex-col items-center justify-center bg-sand/20 text-cream p-6 text-center">
          <ImageIcon className="w-8 h-8 text-bronze/70 mb-2" />
          <span className="text-xs font-medium text-cream/80 line-clamp-2">{item.title}</span>
        </div>
      )}

      {/* Reference Image Style Minimal Expand Icon Button in Top-Right */}
      <div
        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 text-charcoal shadow-md flex items-center justify-center backdrop-blur-xs group-hover:bg-white group-hover:scale-110 transition-all duration-300 z-10"
        aria-label="Expand image"
      >
        <Expand className="w-4 h-4 text-charcoal/80 group-hover:text-burgundy transition-colors" />
      </div>

      {/* Bottom Title Gradient on Hover */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end pointer-events-none">
        <h3 className="text-sm font-semibold text-white drop-shadow-sm line-clamp-1 font-sans">
          {item.title}
        </h3>
        {item.category && (
          <p className="text-xs text-sand-200/90 font-medium drop-shadow-xs mt-0.5">
            {item.category}
          </p>
        )}
      </div>

      {/* Screen-reader / Accessible Title element for automated tests & screen readers */}
      <span className="sr-only">{item.title}</span>
    </div>
  );
};

export default GalleryCard;
