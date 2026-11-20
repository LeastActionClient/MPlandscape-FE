import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import MPLogo from '../../assets/logo/MPLogo';

export const Footer = ({ settings, services = [] }) => {
  const companyName = settings?.companyName || 'MP Landscape Services';
  const tagline = settings?.tagline || 'Premier Landscaping, Agriculture & Horticultural Solutions';
  const phones = settings?.phoneNumbers || ['+91 98765 43210'];
  const emails = settings?.emailAddresses || ['info@mplandscape.com'];
  const address = settings?.address || 'Green Valley Horticultural Park, Coimbatore, Tamil Nadu, India';
  const workingHours = settings?.workingHours || 'Mon - Sat: 8:00 AM - 6:30 PM';

  return (
    <footer className="bg-brand-charcoal text-cream border-t border-burgundy-dark/50">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <MPLogo variant="dark-bg" imgClassName="h-16 w-auto" />
            <p className="text-sm text-cream/70 leading-relaxed font-light">
              {tagline}. Transforming residential, commercial, and agricultural land into breathtaking, sustainable outdoor environments with precision horticulture and engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-bronze font-medium">
              <ShieldCheck className="w-4 h-4 text-bronze" />
              <span>Certified Agronomists & Landscape Architects</span>
            </div>
          </div>

          {/* Quick Links Column (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-bronze">Company</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/" className="text-cream/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cream/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream/80 hover:text-white transition-colors">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/80 hover:text-white transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (Col 7-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-bronze">Our Services</h4>
            <ul className="space-y-2 text-sm font-light">
              {services.slice(0, 5).map((svc) => (
                <li key={svc._id || svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-cream/70 hover:text-white transition-colors line-clamp-1"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
              {services.length === 0 && (
                <>
                  <li><Link to="/services" className="text-cream/70 hover:text-white">Landscape Design & Development</Link></li>
                  <li><Link to="/services" className="text-cream/70 hover:text-white">Agriculture & Farm Development</Link></li>
                  <li><Link to="/services" className="text-cream/70 hover:text-white">Irrigation Systems & Water Management</Link></li>
                  <li><Link to="/services" className="text-cream/70 hover:text-white">Plant Supply & Nursery Solutions</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Summary Column (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-bronze">Headquarters</h4>
            <div className="space-y-3 text-xs text-cream/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze flex-shrink-0" />
                <a href={`tel:${phones[0]?.replace(/\s+/g, '')}`} className="hover:text-white">
                  {phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bronze flex-shrink-0" />
                <a href={`mailto:${emails[0]}`} className="hover:text-white break-all">
                  {emails[0]}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-bronze flex-shrink-0" />
                <span>{workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright & Admin Portal Access */}
      <div className="border-t border-brand-dark/80 bg-[#161414] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved. Professional Landscaping, Agriculture & Horticultural Solutions.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-cream/40 hover:text-bronze transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
