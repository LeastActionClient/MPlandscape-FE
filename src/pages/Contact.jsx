import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import EnquiryForm from '../components/common/EnquiryForm';
import ContactDetails from '../components/common/ContactDetails';
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

  return (
    <>
      <Helmet>
        <title>Contact Us | {companyName} - Enquiries & Consultations</title>
        <meta
          name="description"
          content={`Connect with ${companyName}. Request a personalized site survey, agricultural consultation, or landscape engineering estimate.`}
        />
      </Helmet>

      {/* Contact Page Hero Banner with Greenhouse & Landscape Workspace Background */}
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
        {/* Subtle dark burgundy transparent overlay:
            Desktop: gentle right-heavy gradient behind the text container, leaving the left stone sign natural and clear
            Mobile: balanced top-to-bottom wash for text legibility */}
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
              'linear-gradient(to right, rgba(54, 27, 32, 0.12) 0%, rgba(54, 27, 32, 0.10) 35%, rgba(54, 27, 32, 0.42) 50%, rgba(54, 27, 32, 0.72) 68%, rgba(54, 27, 32, 0.85) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hero Content Container - Two Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-12 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Reserved for the prominent MP Landscape Services stone sign in the background */}
            <div className="hidden lg:block lg:col-span-6" aria-hidden="true">
              {/* Left side showcases the stone sign and architectural blueprint workspace naturally without any text collision */}
            </div>

            {/* Right Column: Positioned opposite the company sign */}
            <div className="w-full lg:col-span-6 space-y-4 sm:space-y-5">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] font-bold text-white font-sans tracking-tight leading-[1.18] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Get in Touch with Our Team
              </h1>

              <p className="text-sm sm:text-base md:text-[1.05rem] text-cream/95 leading-relaxed font-normal max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Whether you are planning an agricultural orchard, a commercial campus redesign, or a luxury villa garden, our agronomists and landscape architects are ready to assist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Details & Interactive Enquiry Form */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info Card */}
            <div className="lg:col-span-5 space-y-8">
              <div className="card-luxury p-6 sm:p-8 border border-sand bg-cream-light">
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
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm
                title="Submit Project Enquiry"
                subtitle="Complete the form below and an MP Landscape engineering consultant will respond within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map Section */}
      <section className="bg-cream-light border-t border-sand pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <SectionHeading
            badge="Location"
            title="Visit Our Horticultural Office & Propagation Center"
            subtitle="Explore our living specimen trees, palms, and design consultation studio in person."
          />

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-sand h-[350px] sm:h-[420px] bg-sand/20 relative group">
            <iframe
              src={embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MP Landscape Services Location Map"
            />
            {/* Direct Google Maps Navigation Button */}
            <div className="absolute bottom-3 right-3 z-10">
              <a
                href={directMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy/90 hover:bg-burgundy text-white text-xs font-semibold shadow-md backdrop-blur-xs transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-3.5 h-3.5 text-bronze" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
