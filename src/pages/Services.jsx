import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import Breadcrumb from '../components/common/Breadcrumb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import EnquiryForm from '../components/common/EnquiryForm';
import serviceService from '../services/serviceService';

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

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Services' }]} />
          <div className="max-w-3xl mt-4 space-y-3">
            <span className="badge-burgundy">Our Core Divisions</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-sans tracking-tight">
              Specialized Landscaping & Agricultural Services
            </h1>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Explore our seven integrated divisions engineered to bring technical rigor, horticultural mastery, and breathtaking aesthetic value to your property.
            </p>
          </div>

          {/* Search Filter Bar */}
          <div className="mt-8 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search services by keyword or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-24 py-3 rounded-xl border border-sand bg-white text-sm text-brand-dark focus:outline-hidden focus:border-bronze focus:ring-1 focus:ring-bronze shadow-xs"
              />
              <Search className="w-5 h-5 text-bronze absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 rounded-lg bg-burgundy text-white text-xs font-semibold hover:bg-burgundy-dark transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-20 bg-cream">
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
