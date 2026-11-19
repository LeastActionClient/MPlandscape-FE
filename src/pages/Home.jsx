import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  Trees,
  Droplets,
  Sprout,
  Compass,
  MessageSquare,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import GalleryCard from '../components/common/GalleryCard';
import EnquiryForm from '../components/common/EnquiryForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import serviceService from '../services/serviceService';
import galleryService from '../services/galleryService';
import heroLandscape from '../assets/hero-landscape.jpg';
import heroAgriculture from '../assets/hero-agriculture.jpg';

export const Home = () => {
  const navigate = useNavigate();
  const { settings } = useOutletContext() || {};
  const [services, setServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [galleryError, setGalleryError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [enquiryModalService, setEnquiryModalService] = useState(null);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [slideTimerKey, setSlideTimerKey] = useState(0);

  // Auto-advance hero carousel every 5 seconds (5000ms), paused on hover or when tab is hidden
  useEffect(() => {
    if (isCarouselPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, [isCarouselPaused, slideTimerKey]);

  // Pause carousel when browser tab is inactive / hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsCarouselPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    setSlideTimerKey((k) => k + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    setSlideTimerKey((k) => k + 1);
  };

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
    setSlideTimerKey((k) => k + 1);
  };

  // 1. Fetch only first 3 active services sorted by displayOrder
  const fetchServicesData = async () => {
    setLoadingServices(true);
    setServicesError(null);
    try {
      const res = await serviceService.getServices({ limit: 3 });
      setServices(res.data || []);
    } catch (err) {
      console.error('Failed to load homepage services:', err);
      setServicesError(err.message || 'Unable to load services at this time.');
    } finally {
      setLoadingServices(false);
    }
  };

  // 2. Fetch only first 6 active gallery images sorted by displayOrder
  const fetchGalleryData = async () => {
    setLoadingGallery(true);
    setGalleryError(null);
    try {
      const res = await galleryService.getGallery({ limit: 6 });
      setGalleryItems(res.data || []);
    } catch (err) {
      console.error('Failed to load homepage gallery:', err);
      setGalleryError(err.message || 'Unable to load gallery projects at this time.');
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
    fetchGalleryData();
  }, []);

  const openEnquiryModal = (service) => {
    setEnquiryModalService(service);
  };

  return (
    <>
      <Helmet>
        <title>MP Landscape Services | Creating Beautiful Landscapes. Growing Sustainable Futures.</title>
        <meta
          name="description"
          content="From professional landscape design and garden development to agricultural planning, plantation and irrigation solutions, we create practical and sustainable outdoor environments tailored to your needs."
        />
      </Helmet>

      {/* 1. HERO CAROUSEL SECTION */}
      <section
        className="relative w-full min-h-[520px] sm:min-h-[580px] lg:h-[calc(100vh-72px)] lg:min-h-[580px] lg:max-h-[840px] flex items-center overflow-hidden bg-brand-charcoal select-none"
        aria-label="MP Landscape Services - Featured Highlights"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {/* Background Slides with Crossfade Transition */}
        {/* Slide 1 Background (Landscape Architecture) */}
        <div
          className={`absolute inset-0 bg-cover bg-center md:bg-[center_58%] bg-no-repeat transition-opacity duration-700 ease-in-out ${
            currentSlide === 0 ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${heroLandscape})` }}
          role="img"
          aria-label="MP Landscape Services - Architectural villa garden with illuminated pathway and sunset over estate grounds"
        />

        {/* Slide 2 Background (Agriculture & Irrigation) */}
        <div
          className={`absolute inset-0 bg-cover bg-center md:bg-[center_55%] bg-no-repeat transition-opacity duration-700 ease-in-out ${
            currentSlide === 1 ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${heroAgriculture})` }}
          role="img"
          aria-label="MP Landscape Services - Agricultural field with smart sprinkler irrigation and greenhouse at sunset"
        />

        {/* Directional Scrim Overlay: left side darkening for typography readability, transparent to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 md:via-black/40 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none z-1" />

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2.5 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-burgundy text-white/80 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 focus:outline-hidden cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2.5 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-burgundy text-white/80 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 focus:outline-hidden cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className={`transition-all duration-300 h-2 rounded-full cursor-pointer focus:outline-hidden ${
              currentSlide === 0
                ? 'w-7 sm:w-8 bg-bronze'
                : 'w-2 sm:w-2.5 bg-white/45 hover:bg-white/80'
            }`}
            aria-label="Go to Slide 1: Premier Landscaping Solutions"
            aria-current={currentSlide === 0 ? 'true' : 'false'}
          />
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className={`transition-all duration-300 h-2 rounded-full cursor-pointer focus:outline-hidden ${
              currentSlide === 1
                ? 'w-7 sm:w-8 bg-bronze'
                : 'w-2 sm:w-2.5 bg-white/45 hover:bg-white/80'
            }`}
            aria-label="Go to Slide 2: Sustainable Agriculture & Irrigation Solutions"
            aria-current={currentSlide === 1 ? 'true' : 'false'}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-6 w-full flex flex-col justify-between h-full">
          {/* SLIDE 1 CONTENT */}
          <div
            className={`transition-all duration-700 ease-in-out flex flex-col justify-between h-full w-full ${
              currentSlide === 0
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 -translate-x-4 pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-6'
            }`}
          >
            {/* Main Narrative on the Left */}
            <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-4 pt-2 sm:pt-4 text-left">
              {/* Top Eyebrow */}
              <div className="space-y-1.5">
                <span className="text-bronze-light text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase drop-shadow-xs">
                  Landscape &nbsp;•&nbsp; Agriculture &nbsp;•&nbsp; Horticulture
                </span>
                <div className="w-12 h-0.5 bg-bronze" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-normal tracking-tight text-white leading-[1.12] drop-shadow-md">
                Creating Beautiful{' '}
                <br className="hidden sm:inline" />
                <span className="text-bronze font-serif">Landscapes.</span>{' '}
                <br className="hidden sm:inline" />
                Growing Sustainable{' '}
                <br className="hidden sm:inline" />
                Futures.
              </h1>

              {/* Description */}
              <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-lg lg:max-w-xl leading-relaxed font-light drop-shadow-xs">
                From professional landscape design and garden development to agricultural planning, plantation and irrigation solutions, we create practical and sustainable outdoor environments tailored to your needs.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-medium text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-burgundy-light/40"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light shrink-0" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-bronze text-white hover:bg-white/10 hover:border-bronze-light font-medium text-xs sm:text-sm md:text-base transition-all duration-300 backdrop-blur-xs shadow-sm"
                >
                  <span>Send an Enquiry</span>
                </Link>
              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <div className="w-full flex justify-end pb-1 pt-3 sm:pt-4">
              <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-xl">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5 text-bronze-light" />
                </div>
                <div className="text-left border-l border-white/20 pl-3 pr-1">
                  <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">Sustainable Spaces</p>
                  <p className="text-[10px] sm:text-xs text-white/75 font-light">for a Greener Tomorrow</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 CONTENT (Agriculture & Irrigation) */}
          <div
            className={`transition-all duration-700 ease-in-out flex flex-col justify-between h-full w-full ${
              currentSlide === 1
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 translate-x-4 pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-6'
            }`}
          >
            {/* Main Narrative on the Left */}
            <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-4 pt-2 sm:pt-4 text-left">
              {/* Top Eyebrow */}
              <div className="space-y-1.5">
                <span className="text-bronze-light text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase drop-shadow-xs">
                  Agriculture &nbsp;•&nbsp; Irrigation &nbsp;•&nbsp; Horticulture
                </span>
                <div className="w-12 h-0.5 bg-bronze" />
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-normal tracking-tight text-white leading-[1.12] drop-shadow-md">
                Sustainable{' '}
                <br className="hidden sm:inline" />
                <span className="text-bronze font-serif">Agriculture &</span>{' '}
                <br className="hidden sm:inline" />
                Irrigation Solutions
              </h2>

              {/* Description */}
              <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-lg lg:max-w-xl leading-relaxed font-light drop-shadow-xs">
                Modern, efficient and eco-friendly farm development with smart irrigation, healthy plantations and sustainable land management.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-medium text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-burgundy-light/40"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light shrink-0" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-bronze text-white hover:bg-white/10 hover:border-bronze-light font-medium text-xs sm:text-sm md:text-base transition-all duration-300 backdrop-blur-xs shadow-sm"
                >
                  <span>Send an Enquiry</span>
                </Link>
              </div>
            </div>

            {/* Feature Highlights: 3 Horizontal Glass Cards Matching Reference Image */}
            <div className="w-full flex flex-wrap gap-2.5 sm:gap-3.5 pb-1 pt-3 sm:pt-4">
              <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-burgundy/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-bronze-light" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-white">Smart</p>
                  <p className="text-[10px] sm:text-[11px] text-white/75 font-light">Irrigation</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-burgundy/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-bronze-light" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-white">Healthy</p>
                  <p className="text-[10px] sm:text-[11px] text-white/75 font-light">Plantations</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 text-white shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-burgundy/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Trees className="w-4 h-4 text-bronze-light" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-white">Sustainable</p>
                  <p className="text-[10px] sm:text-[11px] text-white/75 font-light">Land Use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CRAFTSMANSHIP & CORE HORTICULTURAL EXECUTION */}
      <section className="py-16 sm:py-20 bg-cream border-b border-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: 3 Core Pillars */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4 text-bronze shrink-0" />
                <span>Core Agricultural & Horticultural Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-burgundy font-sans">
                Precision Engineering for <span className="text-bronze">Living Environments</span>
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Combining biological soil science, civil hardscaping precision, and intelligent water conservation to develop enduring landscape architecture.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/80 border border-sand/80 shadow-2xs hover:border-bronze/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Trees className="w-4 h-4 text-bronze flex-shrink-0" />
                    <h4 className="text-sm font-bold text-burgundy">Turnkey Landscaping</h4>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Masterplanned design, stonework hardscaping & bespoke planting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-sand/80 shadow-2xs hover:border-bronze/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sprout className="w-4 h-4 text-bronze flex-shrink-0" />
                    <h4 className="text-sm font-bold text-burgundy">Farm & Plantation</h4>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Commercial layouts, high-density orchards & agro-forestry.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-sand/80 shadow-2xs hover:border-bronze/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Droplets className="w-4 h-4 text-bronze flex-shrink-0" />
                    <h4 className="text-sm font-bold text-burgundy">Smart Irrigation</h4>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Water-saving micro-drip networks & automated controllers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Craftsmanship & Agronomy Card */}
            <div className="lg:col-span-5">
              <div className="card-luxury p-6 sm:p-7 relative bg-cream-light border border-sand/80 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-burgundy">Craftsmanship & Agronomy</span>
                  <div className="w-10 h-10 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
                    <Trees className="w-5 h-5 text-burgundy" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-dark font-sans leading-snug">
                      Complete Turnkey Horticultural Execution
                    </h3>
                    <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                      Transforming raw plots into majestic residential gardens, commercial plazas, and productive agro-forestry estates through science-backed horticultural engineering.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-sand/60">
                    <div className="flex items-start gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>Automated drip irrigation & water conservation</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>Organic soil enrichment & specimen tree nursery</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>Dedicated long-term estate grounds maintenance</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="btn-accent w-full justify-center cursor-pointer shadow-xs text-sm py-3"
                    >
                      <span>Schedule On-Site Consultation</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION / ABOUT SECTION */}
      <section className="py-20 bg-cream border-t border-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-sand">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80"
                  alt="MP Landscape Services Grounds"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-burgundy text-white p-6 rounded-xl shadow-2xl max-w-xs border border-bronze/40">
                <p className="text-xs uppercase tracking-wider text-bronze font-bold">Integrity & Quality</p>
                <p className="text-sm font-light mt-1">
                  Engineered with biological soil science and landscape architectural elegance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                align="left"
                badge="About MP Landscape"
                title="Pioneering Excellence in Landscaping & Agriculture"
                subtitle="We integrate environmental stewardship, modern civil landscape design, and precision agriculture to deliver vibrant, enduring outdoor living spaces."
              />

              <p className="text-sm text-brand-muted leading-relaxed">
                {settings?.aboutDescription ||
                  'MP Landscape Services is a dedicated landscaping, agricultural development, and horticultural services company. We deliver tailored environmental solutions across landscape design & development, commercial farm planning, smart water-efficient irrigation, architectural consultancy, grounds maintenance, specimen plant supply, and international horticultural trade. Working closely with private villa owners, estate developers, commercial campuses, and agricultural landowners, we combine biological soil science with refined aesthetic architecture.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-cream-light border border-sand hover:border-bronze transition-colors">
                  <Droplets className="w-6 h-6 text-bronze mb-2" />
                  <h4 className="text-base font-bold text-burgundy">Water Efficiency</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Custom automated micro-drip networks and smart controllers reducing consumption while ensuring optimal root hydration.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-cream-light border border-sand hover:border-bronze transition-colors">
                  <Sprout className="w-6 h-6 text-bronze mb-2" />
                  <h4 className="text-base font-bold text-burgundy">Agronomy & Soil Health</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Comprehensive soil testing and biological organic enrichment ensuring vigorous, enduring plant vitality.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about" className="btn-outline">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC SERVICES SECTION (First 3 Active Services) */}
      <section className="py-20 lg:py-24 bg-cream-light border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Specialized Services"
            title="Comprehensive Solutions for Landscapes & Farmlands"
            subtitle="Explore our specialized services managed dynamically through our certified horticultural and agricultural divisions."
          />

          {loadingServices ? (
            <div className="py-12">
              <LoadingSpinner text="Loading services from catalogue..." />
            </div>
          ) : servicesError ? (
            <div className="mt-8 max-w-xl mx-auto">
              <ErrorMessage
                title="Failed to Load Services"
                message={servicesError}
                onRetry={fetchServicesData}
              />
            </div>
          ) : services.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                title="No Services Currently Active"
                description="Our specialized service catalogue is being updated. Explore our complete offerings or reach out to our team."
                actionText="View Complete Services"
                onAction={() => navigate('/services')}
              />
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEnquire={openEnquiryModal}
                />
              ))}
            </div>
          )}

          {/* Homepage CTA to complete Services page */}
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-primary text-base px-8 py-3.5 shadow-sm">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-bronze-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "HOW WE WORK" SECTION ("From Planning to Completion") */}
      <section className="py-20 bg-cream border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Structured Process"
            title="From Planning to Completion"
            subtitle="Every landscape and agricultural project begins with understanding the site, planning suitable solutions and delivering work according to project requirements."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="card-luxury p-6 sm:p-7 relative bg-cream-light border border-sand hover:border-bronze shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-sans text-bronze tracking-wider">
                    01
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-burgundy" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-burgundy font-sans mb-2">
                  Understand Your Requirements
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  We begin with an in-depth consultation to understand your aesthetic vision, functional outdoor needs, land goals, and timeline expectations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sand/60 text-[11px] font-semibold text-bronze uppercase tracking-wider">
                Discovery & Goals
              </div>
            </div>

            {/* Step 2 */}
            <div className="card-luxury p-6 sm:p-7 relative bg-cream-light border border-sand hover:border-bronze shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-sans text-bronze tracking-wider">
                    02
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-burgundy" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-burgundy font-sans mb-2">
                  Site Assessment & Planning
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Our agronomists and landscape engineers conduct on-site soil evaluation, contour mapping, water source analysis, and microclimate assessment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sand/60 text-[11px] font-semibold text-bronze uppercase tracking-wider">
                Survey & Feasibility
              </div>
            </div>

            {/* Step 3 */}
            <div className="card-luxury p-6 sm:p-7 relative bg-cream-light border border-sand hover:border-bronze shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-sans text-bronze tracking-wider">
                    03
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <Layers className="w-5 h-5 text-burgundy" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-burgundy font-sans mb-2">
                  Design & Execution
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  We develop detailed architectural master plans, integrate precision irrigation, grade the terrain, and execute hardscaping and planting to high standards.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sand/60 text-[11px] font-semibold text-bronze uppercase tracking-wider">
                Precision Construction
              </div>
            </div>

            {/* Step 4 */}
            <div className="card-luxury p-6 sm:p-7 relative bg-cream-light border border-sand hover:border-bronze shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-sans text-bronze tracking-wider">
                    04
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-burgundy" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-burgundy font-sans mb-2">
                  Ongoing Support
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Following completion and client walkthrough, we provide clear maintenance guidelines, seasonal health reviews, and dedicated grounds care contracts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sand/60 text-[11px] font-semibold text-bronze uppercase tracking-wider">
                Stewardship & Care
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-burgundy-dark text-cream border-t border-burgundy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            badge="Why MP Landscape"
            title="The Distinction in Craftsmanship & Agronomy"
            subtitle="Engineered for discerning property owners who appreciate lasting aesthetic value, biological precision, and transparent execution."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Turnkey Accountability</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                From initial site contouring and master planning to civil hardscaping, automatic irrigation, and flora planting, we handle the entire lifecycle under one unified roof.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Horticultural Science</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                We analyze soil microbiomes, microclimates, drainage patterns, and root space to select plant varieties that thrive permanently without unnecessary replanting.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Droplets className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Precision Water Conservation</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                Our smart weather-automated drip networks and rainwater detention bioswales guarantee lush vitality while preserving valuable freshwater resources.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Trees className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Plant Selection & Nursery Sourcing</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                Direct access to acclimatized specimen trees, exotic palms, flowering shrubs, and healthy root systems from our curated botanical nursery reserves.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Layers className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Complete Project Planning</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                Detailed topographical surveys, architectural schematics, transparent phasing, and proactive project management for private estates and commercial plots.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Dedicated Maintenance Support</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                We stand firmly behind every project with long-term maintenance contracts, seasonal fertilizations, disease monitoring, and routine irrigation diagnostics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC PROJECT GALLERY SECTION (First 6 Active Images, 3x2 Grid) */}
      <section className="py-20 bg-cream border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              badge="Project Portfolio"
              title="Signature Completed Landscapes"
              subtitle="A curated showcase of our recent residential, commercial, and agricultural installations."
            />
            <Link to="/gallery" className="btn-outline self-start md:self-end">
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingGallery ? (
            <div className="py-12">
              <LoadingSpinner text="Loading gallery..." />
            </div>
          ) : galleryError ? (
            <div className="max-w-xl mx-auto">
              <ErrorMessage
                title="Failed to Load Gallery"
                message={galleryError}
                onRetry={fetchGalleryData}
              />
            </div>
          ) : galleryItems.length === 0 ? (
            <EmptyState
              title="No Gallery Projects Found"
              description="Project photography is currently being updated. Visit our full portfolio or check back soon."
              actionText="View Complete Gallery"
              onAction={() => navigate('/gallery')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.slice(0, 6).map((item) => (
                <GalleryCard
                  key={item._id}
                  item={item}
                  onSelect={(img) => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Image Preview Modal */}
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <span className="badge-bronze">{selectedImage.category}</span>
                <h4 className="text-lg font-bold text-brand-dark mt-1">{selectedImage.title}</h4>
                {selectedImage.description && (
                  <p className="text-xs text-brand-muted mt-0.5">{selectedImage.description}</p>
                )}
              </div>
              <Link
                to="/contact"
                onClick={() => setSelectedImage(null)}
                className="btn-primary text-xs self-start sm:self-auto cursor-pointer"
              >
                Enquire for Similar Project
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* Enquiry Modal for Service Card Trigger */}
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
            subtitle={`Submit your requirements for ${enquiryModalService.title}. We will prepare a customized quotation.`}
          />
        )}
      </Modal>
    </>
  );
};

export default Home;
