import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, ArrowRight, ArrowDown } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import EnquiryForm from '../components/common/EnquiryForm';
import serviceService from '../services/serviceService';
import servicesHeroBg from '../assets/services-hero-bg.jpg';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiryModalService, setEnquiryModalService] = useState(null);

  const fetchServices = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await serviceService.getServices({ search, limit: 50 });
      setServices(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to retrieve services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchServices(searchTerm);
  };

  return (
    <>
      <Helmet>
        <title>Our Specialized Services | MP Landscape Services & Horticulture</title>
        <meta
          name="description"
          content="Explore all seven specialized divisions of MP Landscape Services: Landscape Design, Agriculture Development, Irrigation Systems, Nursery Plant Supply, and Horticultural Trading."
        />
      </Helmet>

      {/* Full-Width Edge-to-Edge Services Hero Banner */}
      <section
        className="relative w-full bg-cream border-b border-sand/60 overflow-hidden select-none min-h-[400px] sm:min-h-[440px] lg:min-h-[480px] xl:min-h-[510px] flex flex-col justify-center"
        aria-label="Our Services Overview"
      >
        {/* Full-Width Landscape Background Image (Prominently displayed on the right) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${servicesHeroBg})`,
            backgroundPosition: 'right center',
          }}
          aria-hidden="true"
        />

        {/* Mobile / Tablet Cream Gradient Wash for Superior Readability */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-b from-cream/95 via-cream/90 to-cream/75"
          aria-hidden="true"
        />

        {/* Desktop Left-to-Right Feathered Cream Gradient Overlay */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #FAF7F2 0%, #FAF7F2 36%, rgba(250, 247, 242, 0.94) 46%, rgba(250, 247, 242, 0.62) 60%, rgba(250, 247, 242, 0.15) 76%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hero Content Container - Vertically Aligned & Moved Upward */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-10 lg:py-12">
          {/* Left-Aligned Headline & Controls */}
          <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-3.5">
            {/* Eyebrow with Flanking Accent Lines matching reference */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 sm:w-12 bg-bronze/60" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-burgundy uppercase">
                Our Core Divisions
              </span>
              <span className="h-px w-8 sm:w-12 bg-bronze/60" />
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] xl:text-[3.15rem] font-bold text-burgundy font-sans tracking-tight leading-[1.15]">
              Specialized Landscaping &amp; Agricultural Services
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-brand-muted leading-relaxed max-w-xl font-normal pt-0.5">
              Explore our seven integrated divisions engineered to bring technical rigor, horticultural mastery, and breathtaking aesthetic value to your property.
            </p>

            {/* Search Filter Bar */}
            <div className="pt-2 sm:pt-4 max-w-lg">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
                <input
                  type="text"
                  placeholder="Search services by keyword or feature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-20 sm:pr-24 py-2.5 sm:py-3.5 rounded-xl border border-sand/80 bg-white/95 backdrop-blur-xs text-xs sm:text-sm text-brand-dark focus:outline-hidden focus:border-bronze focus:ring-1 focus:ring-bronze shadow-xs placeholder:text-brand-muted/70 transition-all group-hover:border-sand"
                />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-bronze absolute left-3 sm:left-3.5 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-burgundy text-white text-xs sm:text-sm font-semibold hover:bg-burgundy-dark transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-list" className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner text="Retrieving specialized service divisions..." fullPage />
          ) : error ? (
            <ErrorMessage
              title="Failed to Load Services"
              message={error}
              onRetry={() => fetchServices(searchTerm)}
            />
          ) : services.length === 0 ? (
            <EmptyState
              title="No Matching Services"
              description={`No services matched your query "${searchTerm}". Try searching for design, irrigation, or nursery.`}
              actionText="Reset Search"
              onAction={() => {
                setSearchTerm('');
                fetchServices('');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEnquire={(svc) => setEnquiryModalService(svc)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Direct Enquiry Modal */}
      <Modal
        isOpen={Boolean(enquiryModalService)}
        onClose={() => setEnquiryModalService(null)}
        title={`Enquire About ${enquiryModalService?.title || 'Service'}`}
        maxWidth="max-w-xl"
      >
        {enquiryModalService && (
          <EnquiryForm
            preselectedServiceId={enquiryModalService._id}
            onSuccess={() => setEnquiryModalService(null)}
            title=""
            subtitle={`Submit your project specifications for ${enquiryModalService.title}. We will prepare a personalized estimate.`}
          />
        )}
      </Modal>
    </>
  );
};

export default Services;
