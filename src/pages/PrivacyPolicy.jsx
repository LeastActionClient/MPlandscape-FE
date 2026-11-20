import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MP LANDSCAPE SERVICES</title>
        <meta
          name="description"
          content="Privacy Policy for MP Landscape Services. Learn how we collect, use, store, and protect your personal information when you visit our website or use our services."
        />
      </Helmet>

      {/* Header Banner - Compact & Clean without breadcrumb/tag */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title & Metadata */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy font-sans tracking-tight">
                Privacy Policy
              </h1>
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 sm:gap-x-5 text-xs sm:text-sm text-brand-muted">
                <div className="flex items-center gap-1.5 font-medium text-brand-dark">
                  <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze shrink-0" />
                  <span>MP LANDSCAPE SERVICES</span>
                </div>
                <span className="text-sand-400 hidden sm:inline select-none">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze shrink-0" />
                  <span>Effective Date: 19 November 2026</span>
                </div>
              </div>
            </div>

            {/* Back to Home Link - Aligned right on desktop */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-burgundy hover:text-burgundy-dark transition-colors self-start sm:self-center px-3.5 py-2 rounded-lg border border-sand hover:border-burgundy/40 bg-white/80 hover:bg-white shadow-2xs shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-bronze" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-10 sm:py-14 md:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-light/80 border border-sand-300 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs space-y-10 text-brand-dark">
            {/* 1. Introduction */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">1.</span> Introduction
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  Welcome to MP Landscape Services. We respect your privacy and are committed to protecting your personal information.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or use our landscaping and gardening services.
                </p>
              </div>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 2. Information We Collect */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">2.</span> Information We Collect
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed">
                We may collect the following information when you interact with our website:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-brand-dark/90 pl-1">
                {[
                  'Name and contact details.',
                  'Phone number and email address.',
                  'Business or company details.',
                  'Project location and site details.',
                  'Information submitted through enquiry and contact forms.',
                  'Details about your landscaping and gardening requirements.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 3. How We Use Your Information */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">3.</span> How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed">
                We use the information collected to:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-brand-dark/90 pl-1">
                {[
                  'Respond to customer enquiries and requests.',
                  'Provide landscaping and garden maintenance services.',
                  'Prepare quotations and project proposals.',
                  'Schedule site visits and consultations.',
                  'Share service updates and important communications.',
                  'Improve our website and customer experience.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 4. Information Sharing */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">4.</span> Information Sharing
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  MP Landscape Services does not sell, rent, or trade customers’ personal information to third parties.
                </p>
                <p>
                  We may share relevant information with trusted service providers or business partners when necessary to deliver our services or comply with applicable legal requirements.
                </p>
              </div>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 5. Data Security */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">5.</span> Data Security
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  We take reasonable technical and organisational measures to protect your personal information against unauthorised access, misuse, loss, or disclosure.
                </p>
                <p>
                  However, no online data transmission or storage system can be guaranteed to be completely secure.
                </p>
              </div>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 6. Cookies and Website Usage */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">6.</span> Cookies and Website Usage
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  Our website may use cookies and similar technologies to improve website functionality, understand visitor preferences, and enhance the browsing experience.
                </p>
                <p>
                  You can manage or disable cookies through your browser settings.
                </p>
              </div>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 7. Third-Party Websites */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">7.</span> Third-Party Websites
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  Our website may contain links to third-party websites or services. MP Landscape Services is not responsible for the privacy practices or content of external websites.
                </p>
                <p>
                  We encourage visitors to review the privacy policies of those websites.
                </p>
              </div>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 8. Your Privacy Rights */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">8.</span> Your Privacy Rights
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed">
                You may contact us to:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-brand-dark/90 pl-1">
                {[
                  'Request access to your personal information.',
                  'Request correction of inaccurate information.',
                  'Request deletion of personal information, subject to applicable legal requirements.',
                  'Withdraw consent where processing is based on consent.',
                  'Raise questions or concerns regarding your personal data.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 9. Changes to This Privacy Policy */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">9.</span> Changes to This Privacy Policy
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  MP Landscape Services reserves the right to update or modify this Privacy Policy whenever necessary.
                </p>
                <p>
                  Any changes will be published on this page along with the updated effective date.
                </p>
              </div>
            </article>

            {/* Bottom Navigation Return */}
            <div className="pt-8 border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/"
                className="btn-primary text-xs w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-xs font-semibold text-burgundy hover:text-bronze transition-colors hover:underline"
              >
                View Terms & Conditions &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
