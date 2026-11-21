import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';

// Custom lightweight SVG social icons
const FacebookIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const ContactDetails = ({ settings, className = '' }) => {
  if (!settings) return null;

  const phones = settings.phoneNumbers || ['+91 8838548402'];
  const emails = settings.emailAddresses || ['info@mplandscape.com'];
  const whatsapp = settings.whatsappNumber || '+91 8838548402';
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Phone Numbers */}
      <div className="group/item flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
        <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze">Telephone / Enquiries</h4>
          <div className="mt-1 space-y-1">
            {phones.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="block text-base sm:text-sm font-semibold text-brand-dark hover:text-burgundy transition-colors"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Quick Chat */}
      {whatsapp && (
        <div className="group/item flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-10 h-10 rounded-xl bg-bronze/15 text-bronze-dark flex items-center justify-center flex-shrink-0 group-hover/item:bg-bronze group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze">WhatsApp Direct</h4>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MP%20Landscape%20Services,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-base sm:text-sm font-semibold text-brand-dark hover:text-burgundy transition-colors"
            >
              <span className="break-all">{whatsapp}</span>
              <span className="text-xs sm:text-[10px] bg-sand/60 px-2 py-0.5 rounded-full font-medium text-brand-dark shrink-0 hover:bg-bronze hover:text-white transition-colors">Chat Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Email Addresses */}
      <div className="group/item flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
        <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze">Email Correspondence</h4>
          <div className="mt-1 space-y-1">
            {emails.map((email, idx) => (
              <a
                key={idx}
                href={`mailto:${email}`}
                className="block text-base sm:text-sm font-semibold text-brand-dark hover:text-burgundy transition-colors break-all"
              >
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Physical Address */}
      {settings.address && (
        <div className="group/item flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze">Headquarters & Nursery</h4>
            <p className="mt-1 text-base sm:text-sm text-brand-dark leading-relaxed font-medium">
              {settings.address}
            </p>
          </div>
        </div>
      )}

      {/* Working Hours */}
      {settings.workingHours && (
        <div className="group/item flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-2xs">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze">Operational Hours</h4>
            <p className="mt-1 text-base sm:text-sm text-brand-dark font-medium">
              {settings.workingHours}
            </p>
          </div>
        </div>
      )}

      {/* Social Media Links */}
      {settings.socialLinks && (
        <div className="pt-4 border-t border-sand">
          <h4 className="text-sm sm:text-xs font-bold uppercase tracking-wider text-bronze mb-3">Connect With Us</h4>
          <div className="flex items-center gap-3">
            {settings.socialLinks.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream border border-sand flex items-center justify-center text-brand-dark hover:text-white hover:bg-burgundy transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream border border-sand flex items-center justify-center text-brand-dark hover:text-white hover:bg-burgundy transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {settings.socialLinks.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream border border-sand flex items-center justify-center text-brand-dark hover:text-white hover:bg-burgundy transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {settings.socialLinks.youtube && (
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream border border-sand flex items-center justify-center text-brand-dark hover:text-white hover:bg-burgundy transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
