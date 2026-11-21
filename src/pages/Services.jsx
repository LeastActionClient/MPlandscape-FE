import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Trees,
  Sprout,
  Award,
  X,
  Layers,
  PhoneCall,
  Compass,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import EnquiryForm from '../components/common/EnquiryForm';
import serviceService from '../services/serviceService';
import servicesHeroBg from '../assets/services-hero-bg.jpg';

const QUICK_FILTERS = [
  { label: 'All Divisions', value: '' },
  { label: 'Landscape Design', value: 'Design' },
  { label: 'Agriculture & Farm', value: 'Agriculture' },
  { label: 'Irrigation & Water', value: 'Irrigation' },
  { label: 'Nursery Supply', value: 'Nursery' },
  { label: 'Maintenance', value: 'Maintenance' },
];

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
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
    setActiveFilter(searchTerm ? 'custom' : '');
    fetchServices(searchTerm);
  };

  const handleQuickFilter = (val) => {
    setActiveFilter(val);
    setSearchTerm(val);
    fetchServices(val);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveFilter('');
    fetchServices('');
  };

  return (
    <>
      <Helmet>
        <title>Our Specialized Services | MP Landscape Services &amp; Horticulture</title>
        <meta
          name="description"
          content="Explore all seven specialized divisions of MP Landscape Services: Landscape Design, Agriculture Development, Irrigation Systems, Nursery Plant Supply, and Horticultural Trading."
        />
      </Helmet>

      {/* 1. HERO BANNER: Full-Width Cinematic Entrance with Directional Shade & Staggered Word Motion */}
      <section
        className="relative w-full bg-cream border-b border-sand/60 overflow-hidden select-none min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[550px] flex flex-col justify-center py-10 sm:py-14"
        aria-label="Our Services Overview"
      >
        {/* Full-Width Landscape Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${servicesHeroBg})`,
            backgroundPosition: 'right center',
          }}
          aria-hidden="true"
        />

        {/* Ambient Light Orbs for Depth */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-bronze/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-burgundy/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        {/* Mobile / Tablet Background Shade Overlay */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(250, 246, 240, 0.96) 0%, rgba(250, 246, 240, 0.92) 50%, rgba(250, 246, 240, 0.70) 75%, rgba(250, 246, 240, 0.25) 90%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Desktop Left-to-Right Background Shade Overlay */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(250, 246, 240, 0.97) 0%, rgba(250, 246, 240, 0.93) 30%, rgba(250, 246, 240, 0.84) 44%, rgba(250, 246, 240, 0.52) 60%, rgba(250, 246, 240, 0.18) 74%, transparent 90%)',
          }}
          aria-hidden="true"
        />

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6 sm:py-8 lg:py-10">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-4.5">
            
            {/* Eyebrow with Expanding Accent Lines */}
            <div className="flex items-center gap-3 animate-fade-in-up">
              <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent via-bronze/80 to-bronze transition-all duration-700" />
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.26em] text-burgundy uppercase px-3.5 py-1 rounded-full bg-burgundy/5 border border-burgundy/15 backdrop-blur-xs shadow-xs hover:border-bronze transition-all duration-300">
                <Sparkles className="w-3.5 h-3.5 text-bronze animate-pulse" />
                <span>Our Core Divisions</span>
              </span>
              <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent via-bronze/80 to-bronze transition-all duration-700" />
            </div>

            {/* Main Headline with Staggered Word Motion */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] xl:text-[3.15rem] font-bold text-burgundy font-sans tracking-tight leading-[1.15] animate-fade-in-up [animation-delay:150ms]">
              <span className="inline-block transition-transform duration-300 hover:scale-[1.01]">
                Specialized Landscaping
              </span>{' '}
              <span className="inline-block text-bronze font-serif italic font-semibold bg-gradient-to-r from-bronze-dark via-bronze-light to-bronze bg-clip-text text-transparent drop-shadow-xs">
                &amp; Agricultural Services
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-brand-dark leading-relaxed max-w-xl font-medium pt-0.5 animate-fade-in-up [animation-delay:300ms]">
              Explore our seven integrated divisions engineered to bring technical rigor, horticultural mastery, and breathtaking aesthetic value to your property.
            </p>

            {/* Modern Interactive Search Bar */}
            <div className="pt-2 sm:pt-3 max-w-lg animate-fade-in-up [animation-delay:400ms]">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
                <input
                  type="text"
                  placeholder="Search services by keyword or feature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-24 sm:pr-28 py-2.5 sm:py-3.5 rounded-xl border border-sand/80 bg-white/95 backdrop-blur-xs text-xs sm:text-sm text-brand-dark focus:outline-hidden focus:border-bronze focus:ring-2 focus:ring-bronze/20 shadow-xs placeholder:text-brand-muted/70 transition-all group-hover:border-sand group-hover:shadow-md"
                />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-bronze absolute left-3 sm:left-3.5 pointer-events-none" />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-20 sm:right-24 p-1 rounded-full text-charcoal/40 hover:text-charcoal hover:bg-sand/30 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-burgundy text-white text-xs sm:text-sm font-semibold hover:bg-burgundy-dark transition-all cursor-pointer shadow-xs active:scale-98 flex items-center gap-1.5"
                >
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Quick Interactive Category Filter Chips */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 animate-fade-in-up [animation-delay:500ms]">
              <span className="text-[11px] sm:text-xs font-bold text-burgundy uppercase tracking-wider mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-bronze" />
                <span>Filters:</span>
              </span>
              {QUICK_FILTERS.map((f) => {
                const isSelected = activeFilter === f.value || (f.value === '' && activeFilter === '');
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => handleQuickFilter(f.value)}
                    className={`text-xs px-2.5 sm:px-3 py-1 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap shadow-2xs ${
                      isSelected
                        ? 'bg-burgundy text-white border-burgundy shadow-xs'
                        : 'bg-white/80 text-brand-dark border-sand/80 hover:border-bronze hover:bg-white hover:scale-105'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Highlights Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-xs text-brand-dark/80 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-bronze" />
                <span>100% Turnkey Execution</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-bronze" />
                <span>In-House Agronomists</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-bronze" />
                <span>Climate-Calibrated Systems</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID: Staggered Slide Motion & Elevated Cards */}
      <section id="services-list" className="py-16 sm:py-20 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Sub-Header / Count Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-10 border-b border-sand/60 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-burgundy">
                Specialized Horticultural Divisions
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Engineered solutions tailored to residential estates, agricultural farmlands, and commercial developments.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-light border border-sand text-burgundy shadow-2xs">
                {services.length} {services.length === 1 ? 'Division' : 'Divisions'} Available
              </span>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
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
                description={`No services matched your query "${searchTerm}". Try resetting your filter to explore all offerings.`}
                actionText="Reset Search & Filters"
                onAction={handleClearSearch}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                {services.map((service, idx) => (
                  <div
                    key={service._id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(idx * 75, 450)}ms` }}
                  >
                    <ServiceCard
                      service={service}
                      onEnquire={(svc) => setEnquiryModalService(svc)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. EXECUTION STANDARDS: Modern Engineering Methodology Grid */}
      <section className="py-20 bg-cream-light border-y border-sand/60 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Engineering Standards"
            title="How We Execute Every Project"
            subtitle="Our disciplined execution framework guarantees scientific rigor, hydraulic efficiency, and enduring horticultural beauty."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            
            {/* Standard 1 */}
            <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-5 group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Standard 01</span>
                <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                  Topographical &amp; Soil Survey
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-normal">
                  In-depth analysis of site contours, water tables, sunlight gradients, and chemical soil composition prior to any physical work.
                </p>
              </div>
              <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
            </div>

            {/* Standard 2 */}
            <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Standard 02</span>
                <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                  Hydraulic Water Optimization
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-normal">
                  Custom-engineered micro-irrigation schemes with automatic timers, pressure regulators, and weather-responsive drip emitters.
                </p>
              </div>
              <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
            </div>

            {/* Standard 3 */}
            <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-5 group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Standard 03</span>
                <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                  Acclimatized Specimen Flora
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-normal">
                  Carefully sourced specimen trees, palms, and ground covers propagated for tropical resilience and high transplant survival rates.
                </p>
              </div>
              <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
            </div>

            {/* Standard 4 */}
            <div className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2.5 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default">
              <div>
                <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Standard 04</span>
                <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                  Continuous Stewardship
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-normal">
                  Optional long-term grounds maintenance contracts, seasonal pruning, nutrient top-dressing, and structural care protocols.
                </p>
              </div>
              <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. LUXURY CONSULTATION CTA SECTION */}
      <section className="py-20 sm:py-24 bg-burgundy-dark text-cream border-t border-burgundy/40 relative overflow-hidden">
        {/* Soft background radiance */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-bronze/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-burgundy/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bronze px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-bronze" />
            <span>Project Estimation &amp; Site Surveys</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Ready to Transform Your Outdoor Space?
          </h2>

          <p className="text-sm sm:text-base text-cream/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Connect with our certified landscape architects and agronomists to discuss your project requirements, schedule an on-site survey, and receive a comprehensive execution plan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto group btn-accent text-sm sm:text-base px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl hover:shadow-bronze/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Request Project Consultation</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
            </Link>

            <a
              href="tel:+918838548402"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white text-sm sm:text-base font-semibold backdrop-blur-xs transition-all duration-300 shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-bronze" />
              <span>Call +91 8838548402</span>
            </a>
          </div>
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
