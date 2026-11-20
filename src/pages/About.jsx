import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Compass,
  Target,
  Sparkles,
  ShieldCheck,
  Award,
  Trees,
  Droplets,
  Sprout,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import aboutHeroBg from '../assets/about-hero-bg.jpg';
import aboutLegacyImg from '../assets/about-legacy.jpg';

export const About = () => {
  const { settings } = useOutletContext() || {};

  const companyName = settings?.companyName || 'MP Landscape Services';
  const aboutDescription =
    settings?.aboutDescription ||
    'MP Landscape Services is a professional landscaping, agricultural development, and horticultural services company. We design, build, and maintain high-value outdoor spaces with precision horticulture, soil science, and architectural landscaping.';
  const vision =
    settings?.vision ||
    'To be the foremost innovator in sustainable landscaping and precision agricultural development, engineering green spaces that inspire future generations while conserving vital natural ecosystems.';
  const mission =
    settings?.mission ||
    'Delivering superior horticultural craftsmanship, soil science mastery, and client-centric outdoor designs through sustainable practices, technical integrity, and enduring customer relationships.';

  return (
    <>
      <Helmet>
        <title>About Us | {companyName} - Professional Landscaping & Horticulture</title>
        <meta
          name="description"
          content={`Learn about ${companyName}, our vision, mission, sustainable approach, and horticultural engineering excellence.`}
        />
      </Helmet>

      {/* Page Hero Banner with Botanical Background */}
      <section
        className="relative min-h-[calc(100vh-72px)] min-h-[calc(100dvh-72px)] flex items-center bg-cream border-b border-sand/60 overflow-hidden select-none py-10 sm:py-14 lg:py-16"
        style={{
          backgroundImage: `url(${aboutHeroBg})`,
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="About MP Landscape Services"
      >
        {/* Soft subtle gradient scrim to ensure perfect text contrast while floral branch blooms on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/85 sm:via-cream/70 md:via-cream/45 to-transparent pointer-events-none" />

        {/* Hero Content Container - Positioned to fill the highlighted safe canvas without colliding with the floral branch */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center">
          <div className="w-full lg:w-[68%] xl:w-[65%] flex flex-col items-center justify-center text-center mx-auto lg:mx-0 py-4 sm:py-6">
            {/* Top Eyebrow with Flanking Accent Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-7 lg:mb-8">
              <span className="h-px w-10 sm:w-16 lg:w-20 bg-bronze/70" />
              <span className="text-xs sm:text-[13px] lg:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.28em] text-burgundy uppercase">
                About Our Organization
              </span>
              <span className="h-px w-10 sm:w-16 lg:w-20 bg-bronze/70" />
            </div>

            {/* Main Headline with Prominent Highlighted Subtitle */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-semibold text-burgundy tracking-tight leading-[1.16] sm:leading-[1.14] text-balance mb-5 sm:mb-7 lg:mb-8">
              Cultivating Natural Splendor
              <span className="block font-serif italic text-bronze font-medium sm:font-semibold mt-2 sm:mt-3.5 lg:mt-4 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.15rem]">
                with Architectural Precision
              </span>
            </h1>

            {/* Enhanced Description with Balanced Line Spacing and Width */}
            <p className="text-sm sm:text-base md:text-lg lg:text-[1.15rem] xl:text-[1.2rem] text-brand-muted max-w-xl sm:max-w-2xl lg:max-w-2xl leading-relaxed sm:leading-[1.8] font-normal text-balance">
              For over a decade and a half, {companyName} has redefined outdoor architecture across residential, agricultural, and commercial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                align="left"
                badge="Who We Are"
                title="A Legacy of Sustainable Landscape Engineering"
              />

              <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed">
                <p>{aboutDescription}</p>
                <p>
                  Founded on principles of technical discipline, ecological sensitivity, and transparent execution, we treat every outdoor property as an enduring living asset. Our certified landscape architects and agronomists collaborate directly with homeowners, developers, and corporate facility directors to transform conceptual blueprints into thriving, resilient landscapes.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-cream-light border border-sand">
                  <p className="text-3xl font-extrabold text-burgundy">15+</p>
                  <p className="text-sm sm:text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">Years of Practice</p>
                </div>
                <div className="p-4 rounded-xl bg-cream-light border border-sand">
                  <p className="text-3xl font-extrabold text-burgundy">350+</p>
                  <p className="text-sm sm:text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">Projects Delivered</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-sand">
                <img
                  src={aboutLegacyImg}
                  alt="Landscaped Estate Grounds"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block bg-burgundy text-white p-6 rounded-2xl shadow-xl max-w-xs border border-bronze/40">
                <div className="flex items-center gap-2 text-bronze text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4 text-bronze" />
                  <span>Quality Assurance</span>
                </div>
                <p className="text-xs text-cream/90 font-light leading-relaxed">
                  Every sapling, boulder, and irrigation emitter is calibrated for regional climate tolerance and long-term durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 bg-cream-light border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Strategic Direction"
            title="Our Vision & Corporate Mission"
            subtitle="Guiding our daily craftsmanship and long-term environmental stewardship."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card-luxury p-8 sm:p-10 border border-sand bg-cream relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-burgundy" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-bronze">Our Vision</span>
              <h3 className="text-2xl font-bold font-sans text-brand-dark mt-2 mb-4">
                Inspiring Living Environments
              </h3>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {vision}
              </p>
            </div>

            {/* Mission */}
            <div className="card-luxury p-8 sm:p-10 border border-sand bg-cream relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-bronze/15 text-bronze flex items-center justify-center mb-6">
                <Compass className="w-7 h-7 text-bronze" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-bronze">Our Mission</span>
              <h3 className="text-2xl font-bold font-sans text-brand-dark mt-2 mb-4">
                Mastery in Execution & Agronomy
              </h3>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our 4-Stage Architectural Approach */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Methodology"
            title="Our Structured Engineering Approach"
            subtitle="From initial soil mapping to perpetual horticultural care, our four-stage framework guarantees flawless execution."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">01</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Discovery & Soil Science</h4>
              <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                Comprehensive site surveying, sunlight path tracing, topographical grading, and soil nutrient chemical profiling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">02</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Architectural Master Plan</h4>
              <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                2D CAD and 3D realistic rendering detailing hardscape pathways, planting palettes, hydraulic irrigation diagrams, and nighttime lighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">03</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Turnkey Construction</h4>
              <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                Excavation, drainage pipes, masonry construction, automated pump stations, organic soil mixing, and specimen tree installation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">04</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Perpetual Stewardship</h4>
              <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                Long-term grounds maintenance, routine horticultural check-ups, lawn aeration, organic fertilization, and seasonal replanting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-burgundy-dark text-cream border-t border-burgundy/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            badge="Client Benefits"
            title="Why Choose MP Landscape Services"
            subtitle="Delivering certainty, high aesthetic value, and sustainable longevity."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-cream/5 border border-cream/10">
              <CheckCircle2 className="w-8 h-8 text-bronze mb-3" />
              <h4 className="text-lg font-bold text-cream mb-2">Single-Point Responsibility</h4>
              <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                No third-party subcontractors or finger-pointing. We manage earthworks, horticulture, electrical lighting, and plumbing under one clear contract.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream/5 border border-cream/10">
              <CheckCircle2 className="w-8 h-8 text-bronze mb-3" />
              <h4 className="text-lg font-bold text-cream mb-2">Water-Conservation Engineering</h4>
              <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                Advanced automated controllers and precision micro-drip networks engineered specifically for tropical and arid climate variations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream/5 border border-cream/10">
              <CheckCircle2 className="w-8 h-8 text-bronze mb-3" />
              <h4 className="text-lg font-bold text-cream mb-2">Specimen Nursery Reserves</h4>
              <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                Immediate access to healthy, mature specimen trees, palms, and exotic shrubs from our dedicated propagation centers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-accent text-base sm:text-sm px-6 py-3">
              <span>Connect with Our Leadership Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
