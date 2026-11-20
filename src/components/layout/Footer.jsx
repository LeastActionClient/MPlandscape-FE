import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Lock, FileText } from 'lucide-react';
import MPLogo from '../../assets/logo/MPLogo';
import leastActionLogo from '../../assets/least-action-logo.png';

export const Footer = ({ settings, services = [] }) => {
  const companyName = settings?.companyName || 'MP Landscape Services';
  const tagline = settings?.tagline || 'Premier Landscaping, Agriculture & Horticultural Solutions';
  const phones = settings?.phoneNumbers || ['+91 8838548402'];
  const emails = settings?.emailAddresses || ['info@mplandscape.com'];
  const address = settings?.address || 'Green Valley Horticultural Park, Coimbatore, Tamil Nadu, India';
  const workingHours = settings?.workingHours || 'Mon - Sat: 8:00 AM - 6:30 PM';

  return (
    <footer className="bg-[#402027] text-cream border-t border-burgundy-800/80">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <MPLogo variant="dark-bg" imgClassName="h-16 w-auto" />
            <p className="text-sm sm:text-sm text-cream/90 leading-relaxed font-normal">
              {tagline}. Transforming residential, commercial, and agricultural land into breathtaking, sustainable outdoor environments with precision horticulture and engineering.
            </p>
            <div className="flex items-center gap-2 text-sm sm:text-xs text-bronze font-semibold">
              <ShieldCheck className="w-4 h-4 text-bronze" />
              <span>Certified Agronomists & Landscape Architects</span>
            </div>
          </div>

          {/* Quick Links Column (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-widest text-sand-200">Company</h4>
            <ul className="space-y-2.5 text-sm sm:text-sm font-medium">
              <li>
                <Link to="/" className="text-cream/90 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/90 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cream/90 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream/90 hover:text-white transition-colors">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/90 hover:text-white transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (Col 7-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-widest text-sand-200">Our Services</h4>
            <ul className="space-y-2 text-sm sm:text-sm font-normal">
              {services.slice(0, 5).map((svc) => (
                <li key={svc._id || svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-cream/90 hover:text-white transition-colors line-clamp-1"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
              {services.length === 0 && (
                <>
                  <li><Link to="/services" className="text-cream/90 hover:text-white">Landscape Design & Development</Link></li>
                  <li><Link to="/services" className="text-cream/90 hover:text-white">Agriculture & Farm Development</Link></li>
                  <li><Link to="/services" className="text-cream/90 hover:text-white">Irrigation Systems & Water Management</Link></li>
                  <li><Link to="/services" className="text-cream/90 hover:text-white">Plant Supply & Nursery Solutions</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Summary Column (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm sm:text-xs font-bold uppercase tracking-widest text-sand-200">Headquarters</h4>
            <div className="space-y-3 text-sm sm:text-xs text-cream/90 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze flex-shrink-0" />
                <a href={`tel:${phones[0]?.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bronze flex-shrink-0" />
                <a href={`mailto:${emails[0]}`} className="hover:text-white break-all transition-colors">
                  {emails[0]}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-bronze flex-shrink-0" />
                <span>{workingHours}</span>
              </div>
              <div className="pt-1.5 flex items-center">
                <a
                  href="/documents/gst-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-xs font-semibold text-bronze hover:text-sand transition-colors group"
                >
                  <FileText className="w-4 h-4 text-bronze group-hover:text-sand transition-colors flex-shrink-0" />
                  <span className="group-hover:underline underline-offset-4">GST Certificate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Dedicated Legal Section, Copyright, Admin Access & Powered by Least Action */}
      <div className="border-t border-[#31151c] bg-[#2d1419] py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm sm:text-xs text-center lg:text-left">
          {/* Bottom Copyright Section */}
          <p className="order-2 lg:order-1 text-cream/80 font-normal tracking-wide whitespace-normal sm:whitespace-nowrap">
            © 2026 MP Landscape Services. All Rights Reserved.
          </p>

          {/* Dedicated Legal Section */}
          <div className="order-1 lg:order-2 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2 text-sm sm:text-xs">
            <span className="text-bronze font-bold uppercase tracking-wider text-xs sm:text-[11px]">
              Legal
            </span>
            <span className="text-sand/30 hidden sm:inline select-none">•</span>
            <Link
              to="/privacy-policy"
              className="text-cream/90 hover:text-sand-200 transition-colors font-medium hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-sand/30 select-none">•</span>
            <Link
              to="/terms-and-conditions"
              className="text-cream/90 hover:text-sand-200 transition-colors font-medium hover:underline underline-offset-4"
            >
              Terms & Conditions
            </Link>
            <span className="text-sand/30 select-none">•</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-cream/50 hover:text-bronze transition-colors text-xs sm:text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Powered by Least Action Branding */}
          <div className="order-3 flex items-center justify-center lg:justify-end gap-2.5 shrink-0 pt-1 lg:pt-0">
            <span className="text-xs sm:text-xs font-medium text-sand-300/85 tracking-wide select-none">
              Powered by
            </span>
            <a
              href="https://www.leastactioncompany.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-hidden"
              aria-label="Powered by Least Action Company (opens in new tab)"
            >
              <img
                src={leastActionLogo}
                alt="Least Action Company"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain rounded-sm bg-white px-2.5 py-1 shadow-xs group-hover:shadow-md transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
