import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Film,
  Sparkles,
} from 'lucide-react';
import GalleryCard from '../components/common/GalleryCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';
import galleryService from '../services/galleryService';
import galleryHeroBg from '../assets/gallery-hero-bg.jpg';

// Custom SVG Icons matching the reference image category buttons
const IndoorLeafIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const OutdoorTreeIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L6 9h3l-4 6h5v5h4v-5h5l-4-6h3L12 2z" />
  </svg>
);

const PlaygroundIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l4-16h10l4 16" />
    <path d="M5 13h14" />
    <path d="M9 5v8" />
    <path d="M15 5v8" />
    <path d="M8 17h2" />
    <path d="M14 17h2" />
  </svg>
);

const PottedPlantIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11h10l-1.5 10h-7L7 11z" />
    <path d="M5 11h14" />
    <path d="M12 11V3" />
    <path d="M12 7c-2-2-4-2-6 0 0 2.5 3 4 6 4" />
    <path d="M12 5c2-2 4-2 6 0 0 2.5-3 4-6 4" />
  </svg>
);

const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: null },
  { id: 'Indoor Landscaping', label: 'Indoor Landscaping', icon: IndoorLeafIcon },
  { id: 'Outdoor Landscaping', label: 'Outdoor Landscaping', icon: OutdoorTreeIcon },
  { id: 'Playground & Recreation', label: 'Playground & Recreation', icon: PlaygroundIcon },
  { id: 'Plantation & Nursery', label: 'Plantation & Nursery', icon: PottedPlantIcon },
];

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchGallery = async (page = 1, category = 'All') => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 24 };
      if (category && category !== 'All') {
        params.category = category;
      }
      const res = await galleryService.getGallery(params);
      setItems(res.data || []);
      setTotalPages(res.pages || 1);
      setCurrentPage(res.page || 1);
    } catch (err) {
      setError(err.message || 'Failed to retrieve project gallery.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  // Next / Previous Lightbox Navigation
  const handleNextMedia = useCallback(() => {
    if (!selectedMedia || items.length === 0) return;
    const currentIndex = items.findIndex((i) => i._id === selectedMedia._id);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedMedia(items[nextIndex]);
  }, [selectedMedia, items]);

  const handlePrevMedia = useCallback(() => {
    if (!selectedMedia || items.length === 0) return;
    const currentIndex = items.findIndex((i) => i._id === selectedMedia._id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedMedia(items[prevIndex]);
  }, [selectedMedia, items]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      if (e.key === 'ArrowRight') handleNextMedia();
      if (e.key === 'ArrowLeft') handlePrevMedia();
      if (e.key === 'Escape') setSelectedMedia(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, handleNextMedia, handlePrevMedia]);

  return (
    <>
      <Helmet>
        <title>Projects Gallery | MP Landscape Services</title>
        <meta
          name="description"
          content="A visual showcase of our landscaping, indoor greenery, playgrounds, and commercial installations."
        />
      </Helmet>

      {/* 1. HERO BANNER: Cinematic Botanical Background with Staggered Word Motion & Ambient Depth */}
      <section
        className="relative w-full text-white border-b border-sand/60 overflow-hidden min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] flex items-center justify-center py-12 sm:py-16 md:py-20 select-none"
        style={{
          backgroundImage: `url(${galleryHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Projects Gallery Header"
      >
        {/* Naturally illuminated subtle gradient wash preserving botanical vibrancy & pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-burgundy-950/25 to-black/60 pointer-events-none" />

        {/* Ambient floating glow lights */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-bronze/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-14 w-80 h-80 bg-burgundy/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl sm:max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            
            {/* Top Eyebrow with Expanding Accent Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 animate-fade-in-up">
              <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-bronze/80 to-bronze transition-all duration-700" />
              <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold tracking-[0.22em] sm:tracking-[0.26em] text-sand-200 uppercase px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-bronze-light animate-pulse" />
                <span>Visual Portfolio</span>
              </span>
              <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent via-bronze/80 to-bronze transition-all duration-700" />
            </div>

            {/* Main Headline with Staggered Word Motion */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-white font-sans tracking-tight break-words leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-fade-in-up [animation-delay:150ms]">
              <span className="inline-block transition-transform duration-300 hover:scale-[1.01]">
                Curated Portfolio
              </span>{' '}
              <span className="inline-block font-serif italic text-bronze-light font-semibold bg-gradient-to-r from-bronze-light via-sand-200 to-bronze-light bg-clip-text text-transparent">
                of Completed Works
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-sand-100 leading-relaxed max-w-xl mx-auto font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] animate-fade-in-up [animation-delay:300ms]">
              Browse our dynamic visual archive showcasing bespoke residential estates, agro-forestry plantations, commercial courtyards, and smart irrigation networks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER NAVIGATION: Reference Image Rounded Pill Buttons */}
      <section className="bg-[#FAF7F2] py-8 sm:py-10 border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0 justify-start sm:justify-center flex-nowrap sm:flex-wrap">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shrink-0 cursor-pointer border ${
                    isSelected
                      ? 'bg-burgundy text-white border-burgundy shadow-sm'
                      : 'bg-white text-charcoal border-stone-300/80 hover:border-bronze hover:bg-white shadow-2xs hover:-translate-y-0.5'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-charcoal/70'}`} />}
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MASONRY GALLERY SHOWCASE SECTION */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#FAF7F2] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner text="Loading gallery projects..." />
            </div>
          ) : error ? (
            <ErrorMessage
              title="Unable to Load Gallery"
              message={error}
              onRetry={() => fetchGallery(currentPage, selectedCategory)}
            />
          ) : items.length === 0 ? (
            <EmptyState
              title="No Gallery Projects Available"
              description={
                selectedCategory !== 'All'
                  ? `No projects found under "${selectedCategory}". Try selecting another category.`
                  : 'There are currently no items in our project portfolio showcase.'
              }
              actionText={selectedCategory !== 'All' ? 'View All Projects' : undefined}
              onAction={selectedCategory !== 'All' ? () => handleCategoryChange('All') : undefined}
            />
          ) : (
            <>
              {/* Reference-Inspired Editorial Masonry Multi-Column Layout */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 [column-fill:_balance]">
                {items.map((item) => (
                  <div key={item._id} className="break-inside-avoid mb-5 sm:mb-6">
                    <GalleryCard
                      item={item}
                      onSelect={(media) => setSelectedMedia(media)}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 sm:mt-16">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => setCurrentPage(p)}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* 4. LIGHTBOX / MEDIA VIEWER MODAL */}
      <Modal
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
        title={selectedMedia?.title || 'Project Preview'}
        maxWidth="max-w-5xl"
      >
        {selectedMedia && (
          <div className="space-y-4">
            {/* Media Canvas with Next/Prev navigation */}
            <div className="relative rounded-2xl overflow-hidden bg-black max-h-[75vh] flex items-center justify-center group/preview border border-sand/40">
              {(() => {
                const isVideo =
                  selectedMedia.mediaType === 'VIDEO' ||
                  selectedMedia.resourceType === 'video' ||
                  /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(selectedMedia.imageUrl || '');

                if (isVideo) {
                  return (
                    <video
                      key={selectedMedia._id}
                      src={selectedMedia.imageUrl}
                      controls
                      autoPlay={false}
                      controlsList="nodownload"
                      playsInline
                      className="max-h-[75vh] w-full max-w-full rounded-xl object-contain mx-auto shadow-2xl bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                return (
                  <img
                    src={selectedMedia.imageUrl}
                    alt={selectedMedia.title || 'Project Preview'}
                    className="max-h-[75vh] w-auto max-w-full object-contain mx-auto transition-transform duration-300 select-none"
                  />
                );
              })()}

              {/* Prev Button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevMedia();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-bronze transition-all shadow-lg cursor-pointer z-20"
                  aria-label="Previous photograph or video"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              )}

              {/* Next Button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextMedia();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-bronze transition-all shadow-lg cursor-pointer z-20"
                  aria-label="Next photograph or video"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            {/* Project Details & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h4 className="text-xl font-bold text-burgundy font-serif">
                  {selectedMedia.title}
                </h4>
                {selectedMedia.category && (
                  <span className="inline-block text-[11px] font-bold text-bronze uppercase tracking-widest mt-0.5">
                    {selectedMedia.category}
                  </span>
                )}
                {selectedMedia.description && (
                  <p className="text-xs sm:text-sm text-charcoal/70 mt-1 leading-relaxed max-w-2xl">
                    {selectedMedia.description}
                  </p>
                )}
              </div>
              <Link
                to="/contact"
                onClick={() => setSelectedMedia(null)}
                className="btn-accent text-xs sm:text-sm py-2.5 px-5 rounded-full shrink-0 flex items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all text-white bg-burgundy hover:bg-burgundy-900"
              >
                <span>Enquire About Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
