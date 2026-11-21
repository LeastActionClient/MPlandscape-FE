import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import EnquiryForm from '../components/common/EnquiryForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/common/ScrollReveal';
import serviceService from '../services/serviceService';

export const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchServiceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await serviceService.getServiceBySlug(slug);
        if (isMounted && res.data) {
          setService(res.data);

          // Fetch other services for related section
          const relatedRes = await serviceService.getServices({ limit: 4 });
          if (relatedRes.data) {
            setRelatedServices(
              relatedRes.data.filter((item) => item.slug !== slug).slice(0, 3)
            );
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'The requested service could not be loaded.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServiceData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner text="Loading service details..." fullPage />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorMessage
          title="Service Not Found"
          message={error || 'We could not find the service you are looking for.'}
        />
        <div className="text-center mt-6">
          <Link to="/services" className="btn-primary text-sm sm:text-xs">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Return to All Services</span>
          </Link>
        </div>
      </div>
    );
  }

  const seoTitle = service.seoTitle || `${service.title} | MP Landscape Services`;
  const seoDescription =
    service.seoDescription || service.subtitle || service.description?.substring(0, 160);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {service.imageUrl && <meta property="og:image" content={service.imageUrl} />}
      </Helmet>

      {/* Banner & Breadcrumb */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-10 lg:py-14 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'Services', to: '/services' },
              { label: service.title },
            ]}
          />

          <div className="max-w-4xl mt-4 space-y-3 animate-fade-in-up">
            <span className="badge-burgundy shadow-2xs">Specialized Division</span>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-sans tracking-tight leading-tight break-words">
              {service.title}
            </h1>
            {service.subtitle && (
              <p className="text-sm sm:text-base md:text-lg text-bronze font-semibold">
                {service.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Details & Enquiry Grid */}
      <section className="py-16 sm:py-20 bg-cream relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-sand/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Feature Hero Image */}
              <ScrollReveal animation="zoom-in" duration={800} className="rounded-2xl overflow-hidden shadow-xl border border-sand bg-sand/20 aspect-16/9 flex items-center justify-center group/img relative">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/mp-logo.png';
                      e.currentTarget.className = 'max-h-40 w-auto object-contain p-6';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sand/30 p-8">
                    <img
                      src="/mp-logo.png"
                      alt="MP Landscape Services"
                      className="max-h-36 w-auto object-contain opacity-90 drop-shadow-xs"
                    />
                  </div>
                )}
              </ScrollReveal>

              {/* Description Body */}
              <ScrollReveal animation="fade-up" className="space-y-4">
                <h3 className="text-2xl font-bold text-burgundy font-sans">
                  Division Overview & Capabilities
                </h3>
                <p className="text-base text-brand-dark leading-relaxed font-normal whitespace-pre-line">
                  {service.description}
                </p>
              </ScrollReveal>

              {/* Key Features & Deliverables */}
              {service.features && service.features.length > 0 && (
                <ScrollReveal animation="fade-up" delay={150}>
                  <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-xl hover:shadow-burgundy/8 transition-all duration-300 group">
                    {/* Sliding Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="flex items-center gap-2 text-burgundy font-bold text-lg mb-4">
                      <Award className="w-5 h-5 text-bronze group-hover:rotate-12 transition-transform duration-300" />
                      <span>Key Features & Specifications</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-1 rounded-lg hover:bg-sand/30 transition-colors duration-200">
                          <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm text-brand-dark font-medium leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Quality Guarantee Box */}
              <ScrollReveal animation="fade-up" delay={250}>
                <div className="p-6 rounded-2xl bg-burgundy text-white space-y-2 border border-bronze/30 shadow-lg hover:shadow-2xl hover:border-bronze hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 text-bronze text-sm sm:text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-bronze" />
                    <span>The MP Landscape Guarantee</span>
                  </div>
                  <h4 className="text-xl sm:text-lg font-bold font-sans">
                    Sustainable Execution & Biological Health
                  </h4>
                  <p className="text-sm sm:text-sm text-cream/95 font-normal leading-relaxed">
                    Every installation is overseen by certified agronomists and landscape architects to ensure full structural compliance, soil health, and minimal maintenance overheads.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Sticky Enquiry Form */}
            <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-5 sticky top-28">
              <EnquiryForm
                preselectedServiceId={service._id}
                title={`Request Quote for ${service.title}`}
                subtitle="Fill in your project details below to receive a personalized proposal and consultation."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-cream-light border-t border-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="badge-burgundy">Complementary Solutions</span>
                <h3 className="text-2xl font-bold text-burgundy font-sans mt-1">
                  Explore Other Services
                </h3>
              </div>
              <Link to="/services" className="btn-outline text-xs">
                <span>All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((rel, idx) => (
                <ScrollReveal key={rel._id} animation="fade-up" delay={idx * 120} className="h-full">
                  <ServiceCard service={rel} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetails;
