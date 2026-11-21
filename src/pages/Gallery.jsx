import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
  Trees,
  Droplets,
  Sprout,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  SlidersHorizontal,
  Calendar,
  Layers,
  PhoneCall,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import GalleryCard from '../components/common/GalleryCard';
import ScrollReveal from '../components/common/ScrollReveal';
import SectionDivider from '../components/common/SectionDivider';
import {
  BotanicalBranchRight,
  ArchitecturalGridMarks,
} from '../components/common/DecorativeSideDecor';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';
import galleryService from '../services/galleryService';
import galleryHeroBg from '../assets/gallery-hero-bg.jpg';

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState([]);

  const fetchGallery = async (page = 1, category = 'All') => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 12 };
      if (category && category !== 'All') {
        params.category = category;
      }
      const res = await galleryService.getGallery(params);
      setItems(res.data || []);
      setTotalPages(res.pages || 1);
      setCurrentPage(res.page || 1);
      if (res.categories && res.categories.length > 0) {
        setAvailableCategories(['All', ...res.categories]);
      }
    } catch (err) {
      setError(err.message || 'Failed to retrieve project gallery.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Next / Previous Lightbox Navigation
  const handleNextImage = () => {
    if (!selectedImage || items.length === 0) return;
    const currentIndex = items.findIndex((i) => i._id === selectedImage._id);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedImage(items[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage || items.length === 0) return;
    const currentIndex = items.findIndex((i) => i._id === selectedImage._id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedImage(items[prevIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Projects Gallery | Signature Landscapes &amp; Agricultural Works</title>
        <meta
          name="description"
          content="Explore our extensive visual portfolio of completed projects across landscape architecture, estate gardens, commercial irrigation, and farm development."
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
        {/* Light transparent scrim to keep the nursery background bright and visible while ensuring text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/28 to-black/50 pointer-events-none" />

        {/* Subtle warm ambient glow lights */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-bronze/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-14 w-80 h-80 bg-burgundy/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl sm:max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            
            {/* Top Eyebrow with Expanding Accent Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 animate-fade-in-up">
              <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-bronze/80 to-bronze transition-all duration-700" />
              <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold tracking-[0.22em] sm:tracking-[0.26em] text-sand-200 uppercase px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xs">
                <span>Visual Portfolio</span>
              </span>
              <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent via-bronze/80 to-bronze transition-all duration-700" />
            </div>

            {/* Main Headline with Staggered Word Motion */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-white font-sans tracking-tight break-words leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] animate-fade-in-up [animation-delay:150ms]">
              <span className="inline-block transition-transform duration-300 hover:scale-[1.01]">
                Curated Portfolio
              </span>{' '}
              <span className="inline-block font-serif italic text-bronze-light font-semibold bg-gradient-to-r from-bronze-light via-sand-100 to-bronze-light bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                of Completed Works
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-cream leading-relaxed max-w-xl mx-auto font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] animate-fade-in-up [animation-delay:300ms]">
              Browse our dynamic visual archive showcasing bespoke residential estates, agro-forestry plantations, commercial courtyards, and smart irrigation networks.
            </p>

            {/* Trust Badges Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-medium text-sand-200/90 animate-fade-in-up [animation-delay:450ms]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
                <Camera className="w-3.5 h-3.5 text-bronze-light" />
                <span>Authentic On-Site Photography</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
                <Trees className="w-3.5 h-3.5 text-bronze-light" />
                <span>Living Specimen Installations</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
                <Droplets className="w-3.5 h-3.5 text-bronze-light" />
                <span>Smart Water Management</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. GALLERY SHOWCASE SECTION: Category Filters & Staggered Motion Grid */}
      <section className="pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 bg-cream relative overflow-hidden">
        {/* Subtle decorative botanical line art */}
        <BotanicalBranchRight />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Controls Bar: Categories & Project Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-8 border-b border-sand/60 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-burgundy">
                Project Visual Archive
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                Click any photograph to view high-resolution imagery and engineering specifications.
              </p>
            </div>

            {/* Category Filter Pills (if categories available) */}
            {availableCategories.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-bronze mr-1 hidden sm:inline" />
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'bg-burgundy text-white border-burgundy shadow-xs'
                          : 'bg-cream-light text-brand-dark border-sand hover:border-bronze hover:bg-white hover:scale-105'
                      }`}
                    >
                      {cat === 'All' ? 'All Works' : cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grid Content */}
          <div className="mt-8 sm:mt-10">
            {loading ? (
              <LoadingSpinner text="Loading gallery projects..." fullPage />
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
                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {items.map((item, idx) => (
                    <ScrollReveal
                      key={item._id}
                      animation="fade-up"
                      delay={Math.min((idx % 4) * 80, 240)}
                      className="h-full"
                    >
                      <GalleryCard
                        item={item}
                        onSelect={(img) => setSelectedImage(img)}
                      />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 sm:mt-14">
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
        </div>
      </section>

      <SectionDivider variant="bronze-accent" />

      {/* 3. EXECUTION HIGHLIGHTS: Pillars of Landscape Photography */}
      <section className="py-20 bg-sand-50/70 border-y border-sand-200/60 relative overflow-hidden">
        {/* Architectural layout marks */}
        <ArchitecturalGridMarks position="left" />
        {/* Soft background glow */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sand/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Portfolio Rigor"
            title="The Hallmark of Our Executed Grounds"
            subtitle="Every photograph documents real, thriving landscapes engineered with biological precision and generational resilience."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-5 group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                    Photographic Authenticity
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    Zero artificial rendering—all photographs depict living, completed installations across residential villas, farmlands, and commercial campuses.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                    <Trees className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                    Botanical Longevity
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    Our specimen plantings are selected with generous root allowances and organic soil blends, ensuring grounds grow denser and more valuable with time.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={240}>
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-5 group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                    Precision Hydraulics
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    Beneath each lawn lies an invisible network of pressure-regulated drip and rotary irrigation lines preventing root rot and water waste.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={360}>
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                    Architectural Hardscaping
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    Natural stone walkways, pergolas, retaining masonry, and illuminated garden paths engineered against subsoil settling and erosion.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. LUXURY PORTFOLIO CONSULTATION CTA SECTION */}
      <section className="py-20 sm:py-24 bg-burgundy-dark text-cream border-t border-burgundy/40 relative overflow-hidden">
        {/* Soft background radiance */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-bronze/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-burgundy/30 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal animation="fade-up" delay={150} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bronze px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
            <span>Signature Bespoke Designs</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Have a Signature Project in Mind?
          </h2>

          <p className="text-sm sm:text-base text-cream/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you are envisioning a private estate garden, a high-yield farm orchard, or commercial campus hardscaping, our specialists are ready to turn your vision into enduring reality.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto group btn-accent text-sm sm:text-base px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl hover:shadow-bronze/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Schedule On-Site Survey</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white text-sm sm:text-base font-semibold backdrop-blur-xs transition-all duration-300 shadow-md"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 text-bronze-light shrink-0" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. ENHANCED LIGHTBOX MODAL WITH NEXT / PREVIOUS NAVIGATION */}
      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || 'Project Preview'}
        maxWidth="max-w-4xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            {/* Image Canvas with Navigation Arrows */}
            <div className="relative rounded-2xl overflow-hidden bg-brand-charcoal max-h-[70vh] flex items-center justify-center group/preview border border-sand/40">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto transition-transform duration-300 select-none"
              />

              {/* Prev Button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-bronze transition-all shadow-lg cursor-pointer"
                  aria-label="Previous photograph"
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
                    handleNextImage();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-bronze transition-all shadow-lg cursor-pointer"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            {/* Project Details & Enquiry Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h4 className="text-xl font-bold text-burgundy font-serif">
                  {selectedImage.title}
                </h4>
                {selectedImage.category && (
                  <span className="inline-block text-[11px] font-bold text-bronze uppercase tracking-widest mt-0.5">
                    {selectedImage.category}
                  </span>
                )}
                {selectedImage.description && (
                  <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed max-w-xl">
                    {selectedImage.description}
                  </p>
                )}
              </div>
              <Link
                to="/contact"
                onClick={() => setSelectedImage(null)}
                className="btn-accent text-xs sm:text-sm py-2.5 px-5 rounded-xl shrink-0 flex items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
