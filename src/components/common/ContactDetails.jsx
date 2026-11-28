import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';
import { getInstagramUrl } from '../../utils/socialConfig';

// Custom lightweight SVG Instagram icon
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const ContactDetails = ({ settings, className = '' }) => {
  if (!settings) return null;

  const phones = settings.phoneNumbers || ['+91 8838548402'];
  const emails = settings.emailAddresses || ['info@mplandscape.com'];
  const whatsapp = settings.whatsappNumber || '+91 8838548402';
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
  const instagramUrl = getInstagramUrl(settings);

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Phone Numbers */}
      <div className="group/item flex items-start gap-3.5 sm:gap-4 transition-transform duration-300 hover:translate-x-1">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
          <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>
        <div className="pr-4 sm:pr-0">
          <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze">Telephone / Enquiries</h4>
          <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
            {phones.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="block text-[14px] min-[360px]:text-[14.5px] sm:text-sm font-medium text-brand-dark hover:text-burgundy transition-colors"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Quick Chat */}
      {whatsapp && (
        <div className="group/item flex items-start gap-3.5 sm:gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bronze/15 text-bronze-dark flex items-center justify-center flex-shrink-0 group-hover/item:bg-bronze group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <MessageCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="pr-4 sm:pr-0">
            <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze">WhatsApp Direct</h4>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MP%20Landscape%20Services,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 sm:mt-1 inline-flex flex-wrap items-center gap-1.5 text-[14px] min-[360px]:text-[14.5px] sm:text-sm font-medium text-brand-dark hover:text-burgundy transition-colors"
            >
              <span className="break-all">{whatsapp}</span>
              <span className="text-[11px] sm:text-[10px] bg-sand/60 px-2 py-0.5 rounded-full font-medium text-brand-dark shrink-0 hover:bg-bronze hover:text-white transition-colors">Chat Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Email Addresses */}
      <div className="group/item flex items-start gap-3.5 sm:gap-4 transition-transform duration-300 hover:translate-x-1">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
          <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>
        <div className="pr-4 sm:pr-0">
          <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze">Email Correspondence</h4>
          <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
            {emails.map((email, idx) => (
              <a
                key={idx}
                href={`mailto:${email}`}
                className="block text-[14px] min-[360px]:text-[14.5px] sm:text-sm font-medium text-brand-dark hover:text-burgundy transition-colors break-all"
              >
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Physical Address */}
      {settings.address && (
        <div className="group/item flex items-start gap-3.5 sm:gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="pr-4 sm:pr-0">
            <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze">Headquarters & Nursery</h4>
            <p className="mt-0.5 sm:mt-1 text-[14px] min-[360px]:text-[14.5px] sm:text-sm text-brand-dark leading-relaxed font-normal sm:font-medium">
              {settings.address}
            </p>
          </div>
        </div>
      )}

      {/* Working Hours */}
      {settings.workingHours && (
        <div className="group/item flex items-start gap-3.5 sm:gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="pr-4 sm:pr-0">
            <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze">Operational Hours</h4>
            <p className="mt-0.5 sm:mt-1 text-[14px] min-[360px]:text-[14.5px] sm:text-sm text-brand-dark font-normal sm:font-medium">
              {settings.workingHours}
            </p>
          </div>
        </div>
      )}

      {/* Social Media Links - Instagram Only */}
      <div className="pt-3.5 sm:pt-4 border-t border-sand">
        <h4 className="text-[12.5px] min-[360px]:text-[13px] sm:text-xs font-medium uppercase tracking-wider text-bronze mb-2 sm:mb-3">Connect With Us</h4>
        <div className="flex items-center gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cream border border-sand flex items-center justify-center text-brand-dark hover:text-white hover:bg-burgundy hover:border-burgundy hover:scale-105 hover:shadow-md transition-all duration-300 group"
            aria-label="Instagram"
            title="Follow MP Landscape Services on Instagram"
          >
            <InstagramIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-burgundy group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
