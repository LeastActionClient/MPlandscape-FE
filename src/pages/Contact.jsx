import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Compass,
  FileText,
  PhoneCall,
  Trees,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import EnquiryForm from '../components/common/EnquiryForm';
import ContactDetails from '../components/common/ContactDetails';
import ScrollReveal from '../components/common/ScrollReveal';
import contactHeroBg from '../assets/contact-hero-bg.jpg';
import { formatGoogleMapsEmbedUrl, getDirectGoogleMapsUrl } from '../utils/mapHelper';

export const Contact = () => {
  const { settings } = useOutletContext() || {};

  const companyName = settings?.companyName || 'MP Landscape Services';
  const physicalAddress =
    settings?.address ||
    'No.94, Sri Krishna Nagar, Mosque Street, Noombal, Thiruverkadu, Chennai, Tamil Nadu, 600077';
  const embedMapUrl = formatGoogleMapsEmbedUrl(settings?.mapUrl, physicalAddress);
  const directMapUrl = getDirectGoogleMapsUrl(settings?.mapUrl, physicalAddress);

  const phones = settings?.phoneNumbers || ['+91 8838548402'];
  const emails = settings?.emailAddresses || ['info@mplandscape.com'];
  const whatsapp = settings?.whatsappNumber || '+91 8838548402';
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  return (
    <>
      <Helmet>
        <title>Contact Us | {companyName} - Enquiries &amp; Consultations</title>
        <meta
          name="description"
          content={`Connect with ${companyName}. Request a personalized site survey, agricultural consultation, or landscape engineering estimate.`}
        />
      </Helmet>

      {/* 1. HERO BANNER: Botanical & Architectural Workspace with Staggered Word Motion */}
      <section
        className="relative w-full border-b border-sand/60 overflow-hidden select-none min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[490px] flex items-center"
        style={{
          backgroundImage: `url(${contactHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Contact MP Landscape Services"
      >
        {/* Subtle dark burgundy transparent overlays:
            Desktop: gentle right-heavy gradient behind text, leaving stone sign natural on the left
            Mobile: balanced wash for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(54, 27, 32, 0.82) 0%, rgba(54, 27, 32, 0.68) 55%, rgba(54, 27, 32, 0.40) 80%, rgba(54, 27, 32, 0.20) 100%)',
          }}
          aria-hidden="true"
        />

        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(54, 27, 32, 0.10) 0%, rgba(54, 27, 32, 0.12) 35%, rgba(54, 27, 32, 0.45) 50%, rgba(54, 27, 32, 0.74) 68%, rgba(54, 27, 32, 0.88) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Ambient floating glow lights on the right */}
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-bronze/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        {/* Hero Content Container - Two Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-12 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Reserved for the MP Landscape stone sign in the background */}
            <div className="hidden lg:block lg:col-span-6" aria-hidden="true">
              {/* Natural view of the stone monument sign and blueprint workspace */}
            </div>

            {/* Right Column: Hero Narrative */}
            <div className="w-full lg:col-span-6 space-y-4 sm:space-y-5">
              
              {/* Top Eyebrow with Expanding Accent Lines */}
              <div className="flex items-center gap-3 sm:gap-4 mb-2 animate-fade-in-up">
                <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent via-bronze/80 to-bronze transition-all duration-700" />
                <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-sand-200 uppercase px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xs hover:border-bronze transition-all duration-300">
                  <Sparkles className="w-3.5 h-3.5 text-bronze-light animate-pulse" />
                  <span>Connect With Specialists</span>
                </span>
                <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent via-bronze/80 to-bronze transition-all duration-700" />
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem] font-bold text-white font-sans tracking-tight leading-[1.18] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] animate-fade-in-up [animation-delay:150ms]">
                Get in Touch with Our Team
              </h1>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base md:text-[1.05rem] text-cream/95 leading-relaxed font-normal max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] animate-fade-in-up [animation-delay:300ms]">
                Whether you are planning an agricultural orchard, a commercial campus redesign, or a luxury villa garden, our agronomists and landscape architects are ready to assist.
              </p>

              {/* Rapid Response Trust Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs font-medium text-sand-200/95 animate-fade-in-up [animation-delay:450ms]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-bronze-light" />
                  <span>24-Hour Engineer Response</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-xs">
                  <Compass className="w-3.5 h-3.5 text-bronze-light" />
                  <span>Complimentary Site Survey</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-xs">
                  <MessageCircle className="w-3.5 h-3.5 text-bronze-light" />
                  <span>Direct WhatsApp Channel</span>
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK DIRECT COMMUNICATION CHANNELS: Modern Interactive Cards */}
      <section className="py-12 sm:py-14 bg-cream-light border-b border-sand/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Direct Call */}
            <ScrollReveal animation="fade-up" delay={0}>
              <a
                href={`tel:${phones[0]?.replace(/\s+/g, '')}`}
                className="group relative p-5 sm:p-6 rounded-2xl bg-cream border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-bronze opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Direct Hotline</span>
                  <h4 className="text-base font-bold text-burgundy mt-0.5 group-hover:text-burgundy-950 transition-colors">
                    {phones[0]}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">Speak directly with our senior consultant</p>
                </div>
              </a>
            </ScrollReveal>

            {/* WhatsApp */}
            <ScrollReveal animation="fade-up" delay={100}>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MP%20Landscape%20Services,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 sm:p-6 rounded-2xl bg-cream border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-bronze/15 text-bronze-dark flex items-center justify-center group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-bronze opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Instant Messaging</span>
                  <h4 className="text-base font-bold text-burgundy mt-0.5 group-hover:text-burgundy-950 transition-colors">
                    WhatsApp Direct
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">Quick photo &amp; plot layout sharing</p>
                </div>
              </a>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal animation="fade-up" delay={200}>
              <a
                href={`mailto:${emails[0]}`}
                className="group relative p-5 sm:p-6 rounded-2xl bg-cream border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-bronze opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Formal Correspondence</span>
                  <h4 className="text-base font-bold text-burgundy mt-0.5 group-hover:text-burgundy-950 transition-colors truncate">
                    {emails[0]}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">Send blueprints and RFP documents</p>
                </div>
              </a>
            </ScrollReveal>

            {/* Propagation Nursery & Headquarters */}
            <ScrollReveal animation="fade-up" delay={300}>
              <a
                href="#location-map"
                className="group relative p-5 sm:p-6 rounded-2xl bg-cream border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-bronze/15 text-bronze-dark flex items-center justify-center group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-bronze opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-bronze">Nursery &amp; Studio</span>
                  <h4 className="text-base font-bold text-burgundy mt-0.5 group-hover:text-burgundy-950 transition-colors">
                    Chennai, Tamil Nadu
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">Visit our specimen display nursery</p>
                </div>
              </a>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. MAIN SECTION: CONTACT CHANNELS & INTERACTIVE ENQUIRY FORM */}
      <section className="py-16 sm:py-20 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Direct Info Luxury Card */}
            <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="group card-luxury p-6 sm:p-8 border border-sand bg-cream-light relative overflow-hidden hover:border-bronze hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500">
                {/* Sliding Top Accent Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <SectionHeading
                  align="left"
                  badge="Corporate Office"
                  title="Direct Contact Channels"
                  subtitle="We are available during working hours for technical discussions, site survey scheduling, and general enquiries."
                />

                <div className="mt-8">
                  <ContactDetails settings={settings} />
                </div>
              </div>

              {/* Consultation Response Assurance Badge */}
              <div className="p-5 rounded-2xl bg-cream-light border border-sand/80 shadow-xs flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                <div className="text-xs text-brand-muted leading-relaxed">
                  <span className="font-bold text-burgundy block text-sm mb-0.5">Privacy &amp; Response Guarantee</span>
                  Your contact information is strictly handled for horticultural consultation. You will receive an engineering callback within one business day.
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Interactive Enquiry Form */}
            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-7">
              <div className="group rounded-2xl border border-sand hover:border-bronze/70 transition-colors duration-500 shadow-md hover:shadow-xl bg-white overflow-hidden">
                <EnquiryForm
                  title="Submit Project Enquiry"
                  subtitle="Complete the form below and an MP Landscape engineering consultant will respond within 24 hours."
                />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. CONSULTATION TIMELINE: 3-Stage Response Process */}
      <section className="py-16 sm:py-20 bg-cream-light border-y border-sand/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Consultation Process"
            title="What Happens After You Reach Out"
            subtitle="From initial intake to on-site surveying, our transparent framework guarantees clarity at every milestone."
          />

          <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                      01
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-all duration-300 shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Step 1 • Within 24h</span>
                  <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                    Agronomic Intake Discussion
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    Our senior landscape specialist reviews your site dimensions, desired aesthetic themes, soil status, and project timeline.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <div className="group p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                      02
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-bronze/15 text-bronze-dark flex items-center justify-center group-hover:bg-bronze group-hover:text-white transition-all duration-300 shadow-xs">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Step 2 • Day 2–3</span>
                  <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                    On-Site Technical Survey
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    We visit your property to map physical gradients, test soil chemistry, evaluate hydraulic pressures, and verify drainage paths.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={240}>
              <div className="group p-6 sm:p-7 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                      03
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-all duration-300 shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Step 3 • Day 4–5</span>
                  <h4 className="text-base font-bold text-burgundy mt-1 mb-2 group-hover:text-burgundy-950 transition-colors">
                    Detailed Blueprint &amp; Estimate
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    You receive an itemized Bill of Quantities (BOQ), botanical plant schedules, 2D/3D visual renders, and a guaranteed execution date.
                  </p>
                </div>
                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE GOOGLE MAP SHOWCASE */}
      <section id="location-map" className="bg-cream border-t border-sand pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <SectionHeading
            badge="Location"
            title="Visit Our Horticultural Office &amp; Propagation Center"
            subtitle="Explore our living specimen trees, palms, and design consultation studio in person."
          />

          <ScrollReveal animation="zoom-in" duration={800} className="mt-8 sm:mt-10 rounded-2xl overflow-hidden shadow-xl border-2 border-sand group-hover:border-bronze h-[360px] sm:h-[430px] bg-sand/20 relative group">
            {/* Subtle Ambient Halo */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-burgundy/15 via-bronze/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-1" />

            <iframe
              src={embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MP Landscape Services Location Map"
              className="w-full h-full"
            />

            {/* Direct Google Maps Navigation Button with Pulse Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10">
              <a
                href={directMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-burgundy/95 hover:bg-burgundy text-white text-xs sm:text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20"
              >
                <MapPin className="w-3.5 h-3.5 text-bronze-light animate-bounce" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Physical Address Overlay Pill on Desktop */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-bronze-light shrink-0" />
              <span className="truncate max-w-md">{physicalAddress}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
