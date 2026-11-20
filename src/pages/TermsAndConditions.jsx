import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building } from 'lucide-react';

export const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | MP LANDSCAPE SERVICES</title>
        <meta
          name="description"
          content="Terms and Conditions for MP Landscape Services. Operational policies, maintenance guidelines, site inspections, and billing terms."
        />
      </Helmet>

      {/* Header Banner - Compact & Clean without breadcrumb/tag */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title & Metadata */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy font-sans tracking-tight">
                Terms & Conditions
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

      {/* Terms Content */}
      <section className="py-10 sm:py-14 md:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-light/80 border border-sand-300 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs space-y-10 text-brand-dark">
            {/* 1. Labour & Service Charges */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">1.</span> Labour & Service Charges
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                Labour, transportation, food expenses, and work charges are included in the quoted amount.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 2. Garden Maintenance */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">2.</span> Garden Maintenance
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                Regular watering and cleaning of garden debris will be carried out as part of the maintenance service.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 3. Existing Garden Layout */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">3.</span> Existing Garden Layout
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                The existing garden layout, plants, and landscaped areas will be maintained as they are. Any new landscaping work, changes to the existing layout, or additional plant installations will be charged separately.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 4. Weekly Supervisor Visit */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">4.</span> Weekly Supervisor Visit
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                A supervisor from MP Landscape Services will visit the site once a week to inspect the maintenance work and monitor the overall condition of the plants and landscaped areas.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 5. Fertilizers */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">5.</span> Fertilizers
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                Fertilizers will be recommended and applied based on the company management’s requirements. Fertilizer costs will be charged separately.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 6. Machinery */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">6.</span> Machinery
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                If the required machinery is available at the client’s premises, it will be used for maintenance work. If machinery needs to be arranged by MP Landscape Services, additional rental charges will apply.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 7. GST & Billing */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">7.</span> GST & Billing
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                GST billing will be provided as applicable under prevailing tax regulations. Billing and accounting documentation will be provided accordingly.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 8. Natural Calamities */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">8.</span> Natural Calamities
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                MP Landscape Services shall not be held responsible for damage to plants, lawns, or landscaping caused by natural calamities, including heavy rain, floods, cyclones, extreme weather conditions, or other events beyond our reasonable control.
              </p>
            </article>

            <hr className="border-t border-sand-200" />

            {/* 9. Pest & Disease Management */}
            <article className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-burgundy flex items-center gap-2">
                <span className="text-bronze">9.</span> Pest & Disease Management
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-brand-dark/90 leading-relaxed font-normal">
                <p>
                  If any pest attack, plant disease, or similar issue is identified, the client will be informed promptly, and suitable treatment or fertilizers will be recommended.
                </p>
                <p>
                  If the client or company management does not approve or provide the necessary fertilizers or treatments, MP Landscape Services shall not be held responsible for resulting plant damage, deterioration, or loss.
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
                to="/privacy-policy"
                className="text-xs font-semibold text-burgundy hover:text-bronze transition-colors hover:underline"
              >
                View Privacy Policy &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
