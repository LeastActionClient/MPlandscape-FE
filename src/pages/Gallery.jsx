import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Filter, ZoomIn, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import GalleryCard from '../components/common/GalleryCard';
import Breadcrumb from '../components/common/Breadcrumb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import Modal from '../components/common/Modal';
import galleryService from '../services/galleryService';

const CATEGORIES = [
  'All',
  'Landscape Design',
  'Agriculture & Farm Development',
  'Irrigation Systems',
  'Landscape Architecture',
  'Garden Maintenance',
  'Plant Supply & Nursery',
  'Plant Trading',
];

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGallery = async (category = 'All', page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await galleryService.getGallery({
        category: category !== 'All' ? category : undefined,
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
    fetchGallery(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Projects Gallery | Signature Landscapes & Agricultural Works</title>
        <meta
          name="description"
          content="Explore our extensive visual portfolio of completed projects across landscape architecture, estate gardens, commercial irrigation, and farm development."
        />
      </Helmet>

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Projects Gallery' }]} />
          <div className="max-w-3xl mt-4 space-y-3">
            <span className="badge-burgundy">Project Showcase</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-sans tracking-tight">
              Curated Portfolio of Completed Works
            </h1>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Browse our dynamic visual archive showcasing bespoke residential estates, agro-forestry plantations, commercial courtyards, and smart irrigation networks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-burgundy text-white shadow-xs'
                    : 'bg-white border border-sand text-brand-dark hover:border-bronze hover:text-burgundy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Loading gallery projects..." fullPage />
          ) : error ? (
            <ErrorMessage
              title="Unable to Load Gallery"
              message={error}
              onRetry={() => fetchGallery(selectedCategory, currentPage)}
            />
          ) : items.length === 0 ? (
            <EmptyState
              title="No Gallery Projects in this Category"
              description={`There are currently no items under "${selectedCategory}". Choose another category or view all.`}
              actionText="View All Projects"
              onAction={() => handleCategoryChange('All')}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <span className="badge-bronze">{selectedImage.category}</span>
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
