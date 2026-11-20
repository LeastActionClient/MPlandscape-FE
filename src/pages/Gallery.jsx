import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import GalleryCard from '../components/common/GalleryCard';
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

  const fetchGallery = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await galleryService.getGallery({
        page,
        limit: 12,
      });
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
    fetchGallery(currentPage);
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>Projects Gallery | Signature Landscapes & Agricultural Works</title>
        <meta
          name="description"
          content="Explore our extensive visual portfolio of completed projects across landscape architecture, estate gardens, commercial irrigation, and farm development."
        />
      </Helmet>

      {/* Projects Gallery Hero Banner with Horticulture Nursery Background */}
      <section
        className="relative w-full text-white border-b border-sand/60 overflow-hidden min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center justify-center py-10 sm:py-14 md:py-16"
        style={{
          backgroundImage: `url(${galleryHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Projects Gallery Header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl sm:max-w-3xl mx-auto text-center space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] font-bold text-white font-sans tracking-tight break-words leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Curated Portfolio of Completed Works
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-sand-50 leading-relaxed max-w-xl mx-auto font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Browse our dynamic visual archive showcasing bespoke residential estates, agro-forestry plantations, commercial courtyards, and smart irrigation networks.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading gallery projects..." fullPage />
          ) : error ? (
            <ErrorMessage
              title="Unable to Load Gallery"
              message={error}
              onRetry={() => fetchGallery(currentPage)}
            />
          ) : items.length === 0 ? (
            <EmptyState
              title="No Gallery Projects Available"
              description="There are currently no items in our project portfolio showcase."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
                {items.map((item) => (
                  <GalleryCard
                    key={item._id}
                    item={item}
                    onSelect={(img) => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || 'Project Preview'}
        maxWidth="max-w-4xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-brand-charcoal max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h4 className="text-xl font-bold text-brand-dark font-sans mt-1">
                  {selectedImage.title}
                </h4>
                {selectedImage.description && (
                  <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                    {selectedImage.description}
                  </p>
                )}
              </div>
              <Link
                to="/contact"
                onClick={() => setSelectedImage(null)}
                className="btn-primary text-xs flex-shrink-0"
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
