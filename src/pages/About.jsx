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
import Breadcrumb from '../components/common/Breadcrumb';

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

      {/* Page Banner */}
      <section className="bg-gradient-to-b from-cream via-cream to-sand/20 border-b border-sand py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About Us' }]} />
          <div className="max-w-3xl mt-4 space-y-3">
            <span className="badge-burgundy">About Our Organization</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-sans tracking-tight">
              Cultivating Natural Splendor with Architectural Precision
            </h1>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
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
                subtitle="Merging horticultural biology with civil craftsmanship."
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
                  <p className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">Years of Practice</p>
                </div>
                <div className="p-4 rounded-xl bg-cream-light border border-sand">
                  <p className="text-3xl font-extrabold text-burgundy">350+</p>
                  <p className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">Projects Delivered</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-sand">
                <img
                  src="https://images.unsplash.com/photo-1558904541-efa8c4a5af9b?auto=format&fit=crop&w=1200&q=80"
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
              <p className="text-xs text-brand-muted leading-relaxed">
                Comprehensive site surveying, sunlight path tracing, topographical grading, and soil nutrient chemical profiling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">02</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Architectural Master Plan</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                2D CAD and 3D realistic rendering detailing hardscape pathways, planting palettes, hydraulic irrigation diagrams, and nighttime lighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">03</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Turnkey Construction</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Excavation, drainage pipes, masonry construction, automated pump stations, organic soil mixing, and specimen tree installation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-light border border-sand relative">
              <span className="text-3xl font-black text-sand-dark">04</span>
              <h4 className="text-lg font-bold text-burgundy mt-2 mb-2">Perpetual Stewardship</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
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
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                No third-party subcontractors or finger-pointing. We manage earthworks, horticulture, electrical lighting, and plumbing under one clear contract.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream/5 border border-cream/10">
              <CheckCircle2 className="w-8 h-8 text-bronze mb-3" />
              <h4 className="text-lg font-bold text-cream mb-2">Water-Conservation Engineering</h4>
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                Advanced automated controllers and precision micro-drip networks engineered specifically for tropical and arid climate variations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream/5 border border-cream/10">
              <CheckCircle2 className="w-8 h-8 text-bronze mb-3" />
              <h4 className="text-lg font-bold text-cream mb-2">Specimen Nursery Reserves</h4>
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                Immediate access to healthy, mature specimen trees, palms, and exotic shrubs from our dedicated propagation centers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-accent text-sm px-6 py-3">
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
