import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  Trees,
  Droplets,
  Sprout,
  Users,
  Compass,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import GalleryCard from '../components/common/GalleryCard';
import EnquiryForm from '../components/common/EnquiryForm';
import ContactDetails from '../components/common/ContactDetails';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import serviceService from '../services/serviceService';
import galleryService from '../services/galleryService';

export const Home = () => {
  const { settings } = useOutletContext() || {};
  const [services, setServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [enquiryModalService, setEnquiryModalService] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        const [servicesRes, galleryRes] = await Promise.allSettled([
          serviceService.getServices({ limit: 6 }),
          galleryService.getGallery({ limit: 6 }),
        ]);

        if (isMounted) {
          if (servicesRes.status === 'fulfilled' && servicesRes.value?.data) {
            setServices(servicesRes.value.data);
          }
          if (galleryRes.status === 'fulfilled' && galleryRes.value?.data) {
            setGalleryItems(galleryRes.value.data);
          }
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHomeData();
    return () => {
      isMounted = false;
    };
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
          content="From professional landscape development to agricultural planning, plantation and irrigation solutions, we create practical and sustainable green environments tailored to your needs."
        />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-cream to-sand/20 py-20 lg:py-28">
        {/* Subtle decorative background ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sand/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4 text-bronze" />
                <span>Premier Landscaping & Horticultural Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-burgundy font-sans leading-[1.15]">
                Creating Beautiful <span className="text-bronze">Landscapes.</span> Growing Sustainable Futures.
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed font-normal">
                From professional landscape development to agricultural planning, plantation and irrigation solutions, we create practical and sustainable green environments tailored to your needs.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/services" className="btn-primary text-base px-6 py-3.5 shadow-md">
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-bronze-light" />
                </Link>
                <Link to="/contact" className="btn-outline text-base px-6 py-3.5">
                  <span>Send an Enquiry</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-sand grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-burgundy">15+</p>
                  <p className="text-xs text-brand-muted font-medium mt-0.5">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-burgundy">350+</p>
                  <p className="text-xs text-brand-muted font-medium mt-0.5">Completed Projects</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-burgundy">100%</p>
                  <p className="text-xs text-brand-muted font-medium mt-0.5">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="card-luxury p-6 sm:p-8 relative bg-cream-light border border-sand">
                <div className="absolute top-4 right-4">
                  <span className="badge-burgundy">Craftsmanship</span>
                </div>

                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <Trees className="w-7 h-7 text-burgundy" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-brand-dark font-sans">
                      Complete Turnkey Horticultural Execution
                    </h3>
                    <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                      Transforming raw plots into majestic residential gardens, commercial plazas, and productive agro-forestry estates through science-backed horticultural engineering.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-sand/60">
                    <div className="flex items-center gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                      <span>Automated drip irrigation & water conservation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                      <span>Organic soil enrichment & specimen tree nursery</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-brand-dark font-medium">
                      <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                      <span>Dedicated long-term estate grounds maintenance</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link to="/contact" className="btn-accent w-full justify-center">
                      <span>Schedule On-Site Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION SECTION */}
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
                  'MP Landscape Services is a professional landscaping, agricultural development, and horticultural services company. We cater to discerning villa owners, commercial real estate developers, hospitality resorts, and farm owners seeking dependable, high-caliber environmental solutions.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-cream-light border border-sand">
                  <Droplets className="w-6 h-6 text-bronze mb-2" />
                  <h4 className="text-base font-bold text-burgundy">Water Efficiency</h4>
                  <p className="text-xs text-brand-muted mt-1">Custom automated micro-drip networks reducing consumption by up to 50%.</p>
                </div>
                <div className="p-4 rounded-xl bg-cream-light border border-sand">
                  <Sprout className="w-6 h-6 text-bronze mb-2" />
                  <h4 className="text-base font-bold text-burgundy">Soil Mastery</h4>
                  <p className="text-xs text-brand-muted mt-1">Comprehensive biological soil enrichment ensuring vigorous root vitality.</p>
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

      {/* 3. SERVICES OVERVIEW SECTION */}
      <section className="py-20 lg:py-24 bg-cream-light border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Specialized Expertise"
            title="Comprehensive Services Tailored to Your Environment"
            subtitle="Explore our seven specialized divisions spanning architectural landscaping, precision agricultural development, and global horticultural logistics."
          />

          {loading ? (
            <LoadingSpinner text="Loading services..." />
          ) : (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEnquire={openEnquiryModal}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/services" className="btn-primary text-base px-8 py-3.5 shadow-sm">
              <span>View All 7 Client Services</span>
              <ArrowRight className="w-4 h-4 text-bronze-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED GALLERY SECTION */}
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

          {loading ? (
            <LoadingSpinner text="Loading gallery..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
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

      {/* 5. WHY CHOOSE US SECTION */}
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
                From initial site contouring and architectural blueprinting to civil hardscaping, automatic irrigation, and flora planting, we handle the entire lifecycle under one unified roof.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Horticultural Science</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                We do not simply place plants; we analyze soil microbiomes, microclimates, drainage patterns, and root space to select flora varieties that thrive permanently without unnecessary replanting.
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
              <h4 className="text-xl font-bold text-cream font-sans">Proprietary Botanical Nursery</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                With our extensive nursery reserves, we supply mature, acclimatized specimen trees, exotic palms, and ornamental shrubs directly to your site at uncompromised health.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Experienced Agronomists</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                Our on-field team comprises seasoned landscape architects, certified horticulturists, and irrigation engineers with decades of collective field experience.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-bronze/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-bronze/20 text-bronze flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-bronze" />
              </div>
              <h4 className="text-xl font-bold text-cream font-sans">Dedicated Maintenance Support</h4>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-light">
                We stand firmly behind every project with long-term maintenance contracts, seasonal fertilizations, disease monitoring, and routine system audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ENQUIRY CTA & CONTACT INFORMATION SECTION */}
      <section id="enquiry" className="py-20 lg:py-28 bg-cream border-t border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                align="left"
                badge="Get In Touch"
                title="Let's Build Your Dream Landscape Together"
                subtitle="Reach out to our specialists today for initial site surveys, commercial proposals, or residential landscape estimates."
              />

              <div className="p-6 rounded-2xl bg-cream-light border border-sand shadow-xs">
                <ContactDetails settings={settings} />
              </div>
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
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
            <div className="flex items-center justify-between pt-2">
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
                className="btn-primary text-xs"
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
