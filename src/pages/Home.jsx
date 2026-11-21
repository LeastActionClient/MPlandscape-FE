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
  Sparkles,
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
import aboutGrounds from '../assets/about-grounds.jpg';

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
        {/* Background Slides with Ken Burns Zoom & Crossfade Transition */}
        {/* Slide 1 Background (Landscape Architecture) */}
        <div
          className={`absolute inset-0 bg-cover bg-center md:bg-[center_58%] bg-no-repeat transition-all duration-1000 ease-out ${
            currentSlide === 0
              ? 'opacity-100 scale-105 z-0'
              : 'opacity-0 scale-100 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${heroLandscape})` }}
          role="img"
          aria-label="MP Landscape Services - Architectural villa garden with illuminated pathway and sunset over estate grounds"
        />

        {/* Slide 2 Background (Agriculture & Irrigation) */}
        <div
          className={`absolute inset-0 bg-cover bg-center md:bg-[center_55%] bg-no-repeat transition-all duration-1000 ease-out ${
            currentSlide === 1
              ? 'opacity-100 scale-105 z-0'
              : 'opacity-0 scale-100 z-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${heroAgriculture})` }}
          role="img"
          aria-label="MP Landscape Services - Agricultural field with smart sprinkler irrigation and greenhouse at sunset"
        />

        {/* Directional Scrim Overlay: left side darkening for typography readability, transparent to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 md:via-black/45 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/40 pointer-events-none z-1" />

        {/* Ambient Glow Orbs in Hero */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-bronze/15 rounded-full blur-3xl pointer-events-none z-2" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-burgundy/25 rounded-full blur-3xl pointer-events-none z-2" />

        {/* Slide Indicator Dots (Centered at bottom) */}
        <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 bg-black/45 hover:bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl transition-all">
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className={`transition-all duration-500 h-2 rounded-full cursor-pointer focus:outline-hidden ${
              currentSlide === 0
                ? 'w-8 sm:w-10 bg-gradient-to-r from-bronze to-bronze-light shadow-sm shadow-bronze/50'
                : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/80'
            }`}
            aria-label="Go to Slide 1: Premier Landscaping Solutions"
            aria-current={currentSlide === 0 ? 'true' : 'false'}
          />
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className={`transition-all duration-500 h-2 rounded-full cursor-pointer focus:outline-hidden ${
              currentSlide === 1
                ? 'w-8 sm:w-10 bg-gradient-to-r from-bronze to-bronze-light shadow-sm shadow-bronze/50'
                : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/80'
            }`}
            aria-label="Go to Slide 2: Sustainable Agriculture & Irrigation Solutions"
            aria-current={currentSlide === 1 ? 'true' : 'false'}
          />
        </div>

        {/* Hero Content Container - Vertically Centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full py-12 sm:py-16 md:py-20 flex items-center">
          {/* SLIDE 1 CONTENT */}
          <div
            className={`transition-all duration-700 ease-out w-full ${
              currentSlide === 0
                ? 'opacity-100 translate-x-0 pointer-events-auto relative z-10'
                : 'opacity-0 -translate-x-8 pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20 flex items-center'
            }`}
          >
            {/* Main Narrative on the Left */}
            <div className="max-w-2xl space-y-3.5 sm:space-y-4 lg:space-y-5 text-left">
              {/* Top Eyebrow with sliding stagger */}
              <div
                className={`space-y-1.5 transition-all duration-700 delay-100 transform ${
                  currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="inline-flex items-center text-bronze-light text-xs sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.22em] uppercase drop-shadow-xs">
                  Landscape &nbsp;•&nbsp; Agriculture &nbsp;•&nbsp; Horticulture
                </span>
                <div className="w-14 h-0.5 bg-gradient-to-r from-bronze to-bronze-light rounded-full" />
              </div>

              {/* Main Headline */}
              <h1
                className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.5rem] font-normal tracking-tight text-white leading-[1.14] drop-shadow-md transition-all duration-700 delay-200 transform ${
                  currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                Creating Beautiful <br className="hidden sm:inline" />
                <span className="text-bronze font-serif bg-gradient-to-r from-bronze via-bronze-light to-bronze bg-clip-text text-transparent">
                  Landscapes.
                </span>{' '}
                <br className="hidden sm:inline" />
                Growing Sustainable <br className="hidden sm:inline" />
                Futures.
              </h1>

              {/* Action Buttons: Cleanly Spaced Below Headline */}
              <div
                className={`pt-2 sm:pt-3 md:pt-4 flex flex-col min-[420px]:flex-row flex-wrap sm:flex-nowrap items-stretch min-[420px]:items-center gap-2.5 sm:gap-4 transition-all duration-700 delay-300 transform ${
                  currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-burgundy hover:bg-burgundy-900 text-white border border-burgundy hover:border-bronze text-sm sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-burgundy/40 hover:-translate-y-0.5 active:translate-y-0 group/btn whitespace-nowrap text-center"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/60 hover:border-white text-sm sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-300 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group/btn whitespace-nowrap text-center"
                >
                  <span className="text-white drop-shadow-xs">Send an Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light group-hover:text-white shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* SLIDE 2 CONTENT (Agriculture & Irrigation) */}
          <div
            className={`transition-all duration-700 ease-out w-full ${
              currentSlide === 1
                ? 'opacity-100 translate-x-0 pointer-events-auto relative z-10'
                : 'opacity-0 translate-x-8 pointer-events-none absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20 flex items-center'
            }`}
          >
            {/* Main Narrative on the Left */}
            <div className="max-w-2xl space-y-3.5 sm:space-y-4 lg:space-y-5 text-left">
              {/* Top Eyebrow */}
              <div
                className={`space-y-1.5 transition-all duration-700 delay-100 transform ${
                  currentSlide === 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="inline-flex items-center text-bronze-light text-xs sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.22em] uppercase drop-shadow-xs">
                  Agriculture &nbsp;•&nbsp; Irrigation &nbsp;•&nbsp; Horticulture
                </span>
                <div className="w-14 h-0.5 bg-gradient-to-r from-bronze to-bronze-light rounded-full" />
              </div>

              {/* Headline */}
              <h2
                className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.5rem] font-normal tracking-tight text-white leading-[1.14] drop-shadow-md transition-all duration-700 delay-200 transform ${
                  currentSlide === 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                Sustainable <br className="hidden sm:inline" />
                <span className="text-bronze font-serif bg-gradient-to-r from-bronze via-bronze-light to-bronze bg-clip-text text-transparent">
                  Agriculture &amp;
                </span>{' '}
                <br className="hidden sm:inline" />
                Irrigation Solutions
              </h2>

              {/* Action Buttons: Cleanly Spaced Below Headline */}
              <div
                className={`pt-2 sm:pt-3 md:pt-4 flex flex-col min-[420px]:flex-row flex-wrap sm:flex-nowrap items-stretch min-[420px]:items-center gap-2.5 sm:gap-4 transition-all duration-700 delay-300 transform ${
                  currentSlide === 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-burgundy hover:bg-burgundy-900 text-white border border-burgundy hover:border-bronze text-sm sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-burgundy/40 hover:-translate-y-0.5 active:translate-y-0 group/btn whitespace-nowrap text-center"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/60 hover:border-white text-sm sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-300 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group/btn whitespace-nowrap text-center"
                >
                  <span className="text-white drop-shadow-xs">Send an Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light group-hover:text-white shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CRAFTSMANSHIP & CORE HORTICULTURAL EXECUTION */}
      <section className="py-16 sm:py-20 bg-cream border-b border-sand/50 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-sand/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: 3 Core Pillars */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-2xs hover:border-bronze/40 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse shrink-0" />
                <Award className="w-4 h-4 text-bronze shrink-0" />
                <span>Core Agricultural & Horticultural Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy font-sans tracking-tight leading-snug">
                Precision Engineering for <span className="text-bronze bg-gradient-to-r from-bronze via-bronze-light to-bronze bg-clip-text text-transparent">Living Environments</span>
              </h2>
              <p className="text-base sm:text-base text-brand-muted leading-relaxed font-normal">
                Combining biological soil science, civil hardscaping precision, and intelligent water conservation to develop enduring landscape architecture.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-sand/80 shadow-xs hover:shadow-xl hover:shadow-burgundy/8 hover:-translate-y-2 hover:border-bronze transition-all duration-400 group">
                  {/* Sliding Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-cream group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                      <Trees className="w-4 h-4 text-bronze group-hover:text-cream transition-colors flex-shrink-0" />
                    </div>
                    <h4 className="text-base sm:text-sm font-bold text-burgundy group-hover:text-bronze-dark transition-colors duration-300">Turnkey Landscaping</h4>
                  </div>
                  <p className="text-sm sm:text-xs text-brand-muted leading-relaxed font-medium">
                    Masterplanned design, stonework hardscaping & bespoke planting.
                  </p>
                </div>

                <div className="relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-sand/80 shadow-xs hover:shadow-xl hover:shadow-burgundy/8 hover:-translate-y-2 hover:border-bronze transition-all duration-400 group">
                  {/* Sliding Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-cream group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                      <Sprout className="w-4 h-4 text-bronze group-hover:text-cream transition-colors flex-shrink-0" />
                    </div>
                    <h4 className="text-base sm:text-sm font-bold text-burgundy group-hover:text-bronze-dark transition-colors duration-300">Farm & Plantation</h4>
                  </div>
                  <p className="text-sm sm:text-xs text-brand-muted leading-relaxed font-medium">
                    Commercial layouts, high-density orchards & agro-forestry.
                  </p>
                </div>

                <div className="relative overflow-hidden p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-sand/80 shadow-xs hover:shadow-xl hover:shadow-burgundy/8 hover:-translate-y-2 hover:border-bronze transition-all duration-400 group">
                  {/* Sliding Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-cream group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                      <Droplets className="w-4 h-4 text-bronze group-hover:text-cream transition-colors flex-shrink-0" />
                    </div>
                    <h4 className="text-base sm:text-sm font-bold text-burgundy group-hover:text-bronze-dark transition-colors duration-300">Smart Irrigation</h4>
                  </div>
                  <p className="text-sm sm:text-xs text-brand-muted leading-relaxed font-medium">
                    Water-saving micro-drip networks & automated controllers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Craftsmanship & Agronomy Card */}
            <div className="lg:col-span-5">
              <div className="card-luxury p-7 sm:p-8 relative bg-cream-light border border-sand/90 shadow-xl hover:shadow-2xl hover:border-bronze transition-all duration-500 rounded-2xl overflow-hidden group">
                {/* Permanent Gradient Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-burgundy via-bronze to-burgundy" />

                <div className="flex items-center justify-between mb-4">
                  <span className="badge-burgundy shadow-2xs">Craftsmanship & Agronomy</span>
                  <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 group-hover:bg-burgundy group-hover:text-cream group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-2xs">
                    <Trees className="w-5 h-5 text-burgundy group-hover:text-cream transition-colors" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-dark font-sans leading-snug group-hover:text-burgundy transition-colors duration-300">
                      Complete Turnkey Horticultural Execution
                    </h3>
                    <p className="text-base sm:text-sm text-brand-muted mt-2 leading-relaxed font-normal">
                      Transforming raw plots into majestic residential gardens, commercial plazas, and productive agro-forestry estates through science-backed horticultural engineering.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-sand/60">
                    <div className="flex items-start gap-3 text-base sm:text-sm text-brand-dark font-medium p-2 -mx-2 rounded-xl hover:bg-sand/30 transition-all duration-200 group/item cursor-default">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform duration-300" />
                      <span>Automated drip irrigation & water conservation</span>
                    </div>
                    <div className="flex items-start gap-3 text-base sm:text-sm text-brand-dark font-medium p-2 -mx-2 rounded-xl hover:bg-sand/30 transition-all duration-200 group/item cursor-default">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform duration-300" />
                      <span>Organic soil enrichment & specimen tree nursery</span>
                    </div>
                    <div className="flex items-start gap-3 text-base sm:text-sm text-brand-dark font-medium p-2 -mx-2 rounded-xl hover:bg-sand/30 transition-all duration-200 group/item cursor-default">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform duration-300" />
                      <span>Dedicated long-term estate grounds maintenance</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="btn-accent w-full justify-center cursor-pointer shadow-md hover:shadow-xl hover:shadow-bronze/30 text-sm py-3.5 group/btn relative overflow-hidden"
                    >
                      <span>Schedule On-Site Consultation</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION / ABOUT SECTION */}
      <section className="py-20 bg-cream border-t border-sand/40 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-sand/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative group/img">
              {/* Soft decorative background blurs */}
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-bronze/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-burgundy/15 rounded-full blur-2xl pointer-events-none" />

              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-sand/80 p-1.5 bg-white/50 relative z-10">
                <img
                  src={aboutGrounds}
                  alt="MP Landscape Services Grounds"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover/img:scale-108"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge with Gentle Float Animation */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-burgundy/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl max-w-xs border border-bronze/50 animate-float hover:scale-103 transition-transform duration-300 z-20 group/badge">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-bronze animate-pulse" />
                  <p className="text-xs uppercase tracking-wider text-bronze font-bold">Integrity & Quality</p>
                </div>
                <p className="text-sm font-light mt-1.5 leading-relaxed text-cream/90">
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

              <p className="text-base sm:text-base text-brand-muted leading-relaxed font-normal">
                {settings?.aboutDescription ||
                  'MP Landscape Services is a dedicated landscaping, agricultural development, and horticultural services company. We deliver tailored environmental solutions across landscape design & development, commercial farm planning, smart water-efficient irrigation, architectural consultancy, grounds maintenance, specimen plant supply, and international horticultural trade. Working closely with private villa owners, estate developers, commercial campuses, and agricultural landowners, we combine biological soil science with refined aesthetic architecture.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="relative overflow-hidden p-5 rounded-2xl bg-cream-light/90 backdrop-blur-xs border border-sand hover:border-bronze hover:shadow-xl hover:shadow-burgundy/8 hover:-translate-y-2 transition-all duration-400 group">
                  {/* Sliding Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-3 group-hover:bg-burgundy group-hover:text-cream group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                    <Droplets className="w-6 h-6 text-bronze group-hover:text-cream transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy group-hover:text-bronze-dark transition-colors duration-300">Water Efficiency</h4>
                  <p className="text-sm sm:text-xs text-brand-muted mt-1 leading-relaxed font-medium">
                    Custom automated micro-drip networks and smart controllers reducing consumption while ensuring optimal root hydration.
                  </p>
                </div>

                <div className="relative overflow-hidden p-5 rounded-2xl bg-cream-light/90 backdrop-blur-xs border border-sand hover:border-bronze hover:shadow-xl hover:shadow-burgundy/8 hover:-translate-y-2 transition-all duration-400 group">
                  {/* Sliding Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 text-bronze flex items-center justify-center mb-3 group-hover:bg-burgundy group-hover:text-cream group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                    <Sprout className="w-6 h-6 text-bronze group-hover:text-cream transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-burgundy group-hover:text-bronze-dark transition-colors duration-300">Agronomy & Soil Health</h4>
                  <p className="text-sm sm:text-xs text-brand-muted mt-1 leading-relaxed font-medium">
                    Comprehensive soil testing and biological organic enrichment ensuring vigorous, enduring plant vitality.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about" className="btn-outline group/btn shadow-xs">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC SERVICES SECTION (First 3 Active Services) */}
      <section className="py-20 lg:py-24 bg-cream-light border-t border-sand relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-sand/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Link to="/services" className="btn-primary text-base px-8 py-3.5 shadow-md hover:shadow-2xl hover:shadow-burgundy/30 group/btn relative overflow-hidden">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-bronze-light transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "HOW WE WORK" SECTION ("From Planning to Completion") */}
      <section className="py-20 bg-cream border-t border-sand relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-sand/35 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Our Structured Process"
            title="From Planning to Completion"
            subtitle="Every landscape and agricultural project begins with understanding the site, planning suitable solutions and delivering work according to project requirements."
          />

          <div className="mt-14 relative">
            {/* Desktop Connected Progress Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-bronze/20 via-bronze/50 to-bronze/20 -translate-y-10 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Step 1 */}
              <div className="card-luxury p-7 relative bg-cream-light border border-sand/80 hover:border-bronze shadow-xs hover:shadow-2xl hover:shadow-burgundy/10 hover:-translate-y-2.5 transition-all duration-400 rounded-2xl flex flex-col justify-between group overflow-hidden">
                {/* Sliding Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-serif text-bronze tracking-wider group-hover:scale-110 group-hover:text-bronze-dark transition-all duration-300 inline-block">
                      01
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xs">
                      <MessageSquare className="w-5 h-5 text-burgundy group-hover:text-cream transition-colors" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-burgundy font-sans mb-2 group-hover:text-bronze-dark transition-colors duration-300">
                    Understand Your Requirements
                  </h4>
                  <p className="text-sm sm:text-sm text-brand-muted leading-relaxed font-normal">
                    We begin with an in-depth consultation to understand your aesthetic vision, functional outdoor needs, land goals, and timeline expectations.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-sand/60 text-xs sm:text-[11px] font-semibold text-bronze uppercase tracking-wider group-hover:tracking-widest transition-all duration-300 flex items-center justify-between">
                  <span>Discovery & Goals</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="card-luxury p-7 relative bg-cream-light border border-sand/80 hover:border-bronze shadow-xs hover:shadow-2xl hover:shadow-burgundy/10 hover:-translate-y-2.5 transition-all duration-400 rounded-2xl flex flex-col justify-between group overflow-hidden">
                {/* Sliding Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-serif text-bronze tracking-wider group-hover:scale-110 group-hover:text-bronze-dark transition-all duration-300 inline-block">
                      02
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xs">
                      <ClipboardCheck className="w-5 h-5 text-burgundy group-hover:text-cream transition-colors" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-burgundy font-sans mb-2 group-hover:text-bronze-dark transition-colors duration-300">
                    Site Assessment & Planning
                  </h4>
                  <p className="text-sm sm:text-sm text-brand-muted leading-relaxed font-normal">
                    Our agronomists and landscape engineers conduct on-site soil evaluation, contour mapping, water source analysis, and microclimate assessment.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-sand/60 text-xs sm:text-[11px] font-semibold text-bronze uppercase tracking-wider group-hover:tracking-widest transition-all duration-300 flex items-center justify-between">
                  <span>Survey & Feasibility</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="card-luxury p-7 relative bg-cream-light border border-sand/80 hover:border-bronze shadow-xs hover:shadow-2xl hover:shadow-burgundy/10 hover:-translate-y-2.5 transition-all duration-400 rounded-2xl flex flex-col justify-between group overflow-hidden">
                {/* Sliding Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-serif text-bronze tracking-wider group-hover:scale-110 group-hover:text-bronze-dark transition-all duration-300 inline-block">
                      03
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xs">
                      <Layers className="w-5 h-5 text-burgundy group-hover:text-cream transition-colors" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-burgundy font-sans mb-2 group-hover:text-bronze-dark transition-colors duration-300">
                    Design & Execution
                  </h4>
                  <p className="text-sm sm:text-sm text-brand-muted leading-relaxed font-normal">
                    We develop detailed architectural master plans, integrate precision irrigation, grade the terrain, and execute hardscaping and planting to high standards.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-sand/60 text-xs sm:text-[11px] font-semibold text-bronze uppercase tracking-wider group-hover:tracking-widest transition-all duration-300 flex items-center justify-between">
                  <span>Precision Construction</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="card-luxury p-7 relative bg-cream-light border border-sand/80 hover:border-bronze shadow-xs hover:shadow-2xl hover:shadow-burgundy/10 hover:-translate-y-2.5 transition-all duration-400 rounded-2xl flex flex-col justify-between group overflow-hidden">
                {/* Sliding Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-serif text-bronze tracking-wider group-hover:scale-110 group-hover:text-bronze-dark transition-all duration-300 inline-block">
                      04
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-cream group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xs">
                      <ShieldCheck className="w-5 h-5 text-burgundy group-hover:text-cream transition-colors" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-burgundy font-sans mb-2 group-hover:text-bronze-dark transition-colors duration-300">
                    Ongoing Support
                  </h4>
                  <p className="text-sm sm:text-sm text-brand-muted leading-relaxed font-normal">
                    Following completion and client walkthrough, we provide clear maintenance guidelines, seasonal health reviews, and dedicated grounds care contracts.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-sand/60 text-xs sm:text-[11px] font-semibold text-bronze uppercase tracking-wider group-hover:tracking-widest transition-all duration-300 flex items-center justify-between">
                  <span>Stewardship & Care</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-bronze" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-burgundy-dark text-cream border-t border-burgundy/30 relative overflow-hidden">
        {/* Ambient background radial gradient glows */}
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] bg-burgundy/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            light
            badge="Why MP Landscape"
            title="The Distinction in Craftsmanship & Agronomy"
            subtitle="Engineered for discerning property owners who appreciate lasting aesthetic value, biological precision, and transparent execution."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <Compass className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Turnkey Accountability</h4>
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                From initial site contouring and master planning to civil hardscaping, automatic irrigation, and flora planting, we handle the entire lifecycle under one unified roof.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <Sprout className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Horticultural Science</h4>
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                We analyze soil microbiomes, microclimates, drainage patterns, and root space to select plant varieties that thrive permanently without unnecessary replanting.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <Droplets className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Precision Water Conservation</h4>
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                Our smart weather-automated drip networks and rainwater detention bioswales guarantee lush vitality while preserving valuable freshwater resources.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <Trees className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Plant Selection & Nursery Sourcing</h4>
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                Direct access to acclimatized specimen trees, exotic palms, flowering shrubs, and healthy root systems from our curated botanical nursery reserves.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <Layers className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Complete Project Planning</h4>
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                Detailed topographical surveys, architectural schematics, transparent phasing, and proactive project management for private estates and commercial plots.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-bronze/70 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-2.5 transition-all duration-400 overflow-hidden">
              {/* Sliding Gold Line on Card Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-brand-dark group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-bronze/40 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-bronze group-hover:text-brand-dark transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans group-hover:text-bronze-light transition-colors duration-300">Dedicated Maintenance Support</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light group-hover:text-cream/90 transition-colors duration-300">
                We stand firmly behind every project with long-term maintenance contracts, seasonal fertilizations, disease monitoring, and routine irrigation diagnostics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC PROJECT GALLERY SECTION (First 6 Active Images, 3x2 Grid) */}
      <section className="py-20 bg-cream border-t border-sand relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-sand/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              align="left"
              badge="Project Portfolio"
              title="Signature Completed Landscapes"
              subtitle="A curated showcase of our recent residential, commercial, and agricultural installations."
            />
            <Link to="/gallery" className="btn-outline self-start md:self-end group/btn shadow-xs">
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
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
