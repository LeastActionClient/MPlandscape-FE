import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Compass,
  Target,
  ShieldCheck,
  Award,
  Trees,
  Droplets,
  Sprout,
  Users,
  CheckCircle2,
  ArrowRight,
  Search,
  Layers,
  Calendar,
  Clock,
  Workflow,
  Check,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import SectionDivider from '../components/common/SectionDivider';
import {
  BotanicalBranchLeft,
  BotanicalBranchRight,
  TopographicalContour,
  ArchitecturalGridMarks,
} from '../components/common/DecorativeSideDecor';
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

      {/* 1. HERO BANNER: Cinematic Botanical Entrance with Staggered Word & Motion Effects */}
      <section
        className="relative min-h-[calc(100vh-72px)] min-h-[calc(100dvh-72px)] flex items-center bg-cream border-b border-sand/60 overflow-hidden select-none py-12 sm:py-16 lg:py-20"
        style={{
          backgroundImage: `url(${aboutHeroBg})`,
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="About MP Landscape Services"
      >
        {/* Soft subtle gradient scrims ensuring flawless text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/98 via-cream/90 sm:via-cream/80 md:via-cream/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/70 pointer-events-none" />

        {/* Ambient Floating Glow Lights */}
        <div className="absolute top-1/4 left-8 sm:left-14 w-64 sm:w-80 h-64 sm:h-80 bg-bronze/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-burgundy/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center">
          <div className="w-full lg:w-[70%] xl:w-[66%] flex flex-col items-center justify-center text-center mx-auto lg:mx-0 py-6 sm:py-8">
            
            {/* Top Eyebrow with Expanding Accent Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-7 lg:mb-8 animate-fade-in-up">
              <span className="h-px w-8 sm:w-16 lg:w-20 bg-gradient-to-r from-transparent via-bronze/80 to-bronze transition-all duration-700" />
              <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] lg:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-burgundy uppercase px-3.5 py-1.5 rounded-full bg-burgundy/5 border border-burgundy/15 backdrop-blur-xs shadow-xs hover:border-bronze hover:bg-white/80 transition-all duration-300">
                <span>About Our Organization</span>
              </span>
              <span className="h-px w-8 sm:w-16 lg:w-20 bg-gradient-to-l from-transparent via-bronze/80 to-bronze transition-all duration-700" />
            </div>

            {/* Main Headline with Word Animation & Shimmer */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-semibold text-burgundy tracking-tight leading-[1.16] sm:leading-[1.14] text-balance mb-5 sm:mb-7 lg:mb-8 animate-fade-in-up [animation-delay:150ms]">
              <span className="inline-block transition-transform duration-300 hover:scale-[1.015]">
                Cultivating Natural Splendor
              </span>
              <span className="block font-serif italic text-bronze font-medium sm:font-semibold mt-2 sm:mt-3.5 lg:mt-4 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.15rem] bg-gradient-to-r from-bronze-dark via-bronze-light to-bronze bg-clip-text text-transparent drop-shadow-xs transition-all duration-500 hover:tracking-wide">
                with Architectural Precision
              </span>
            </h1>

            {/* Enhanced Description with Balanced Line Spacing and Width */}
            <p className="text-sm sm:text-base md:text-lg lg:text-[1.15rem] xl:text-[1.2rem] text-brand-muted max-w-xl sm:max-w-2xl lg:max-w-2xl leading-relaxed sm:leading-[1.8] font-normal text-balance animate-fade-in-up [animation-delay:300ms]">
              For over a decade and a half, {companyName} has redefined outdoor architecture across residential, agricultural, and commercial sectors.
            </p>

            
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & INTERACTIVE STATS */}
      <section className="py-20 sm:py-24 bg-cream relative overflow-hidden">
        {/* Subtle decorative background watermarks & side botanical art */}
        <BotanicalBranchLeft />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-sand/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Narrative Column */}
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

              {/* Enhanced Interactive Stat Cards with Hover Lift & Shimmer */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <ScrollReveal animation="fade-up" delay={50}>
                  <div className="group relative p-4 sm:p-5 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden cursor-default h-full">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-bronze/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-3xl sm:text-4xl font-extrabold text-burgundy group-hover:text-burgundy-950 transition-colors">
                        15+
                      </p>
                      <Calendar className="w-5 h-5 text-bronze group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-xs sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider mt-1">
                      Years of Practice
                    </p>
                    <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-3" />
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={150}>
                  <div className="group relative p-4 sm:p-5 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden cursor-default h-full">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-bronze/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-3xl sm:text-4xl font-extrabold text-burgundy group-hover:text-burgundy-950 transition-colors">
                        350+
                      </p>
                      <Trees className="w-5 h-5 text-bronze group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-xs sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider mt-1">
                      Projects Delivered
                    </p>
                    <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-3" />
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={250} className="col-span-2 sm:col-span-1">
                  <div className="group relative p-4 sm:p-5 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden cursor-default h-full">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-bronze/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-3xl sm:text-4xl font-extrabold text-burgundy group-hover:text-burgundy-950 transition-colors">
                        100%
                      </p>
                      <Award className="w-5 h-5 text-bronze group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-xs sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider mt-1">
                      Quality Guaranteed
                    </p>
                    <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-burgundy transition-all duration-500 rounded-full mt-3" />
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Image Showcase with Depth Layering & Floating Assurance Badge */}
            <ScrollReveal animation="zoom-in" duration={800} className="lg:col-span-6 relative group">
              {/* Soft Ambient Depth Halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-burgundy/25 via-bronze/20 to-sand/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-1" />

              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-sand group-hover:border-bronze transition-colors duration-500 relative">
                <img
                  src={aboutLegacyImg}
                  alt="Landscaped Estate Grounds"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Quality Assurance Floating Badge with Smooth Hover Elevation */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block bg-burgundy/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl max-w-xs border border-bronze/40 hover:border-bronze hover:scale-105 hover:-translate-y-1 transition-all duration-400 animate-float cursor-default">
                <div className="flex items-center gap-2 text-bronze text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-bronze" />
                  <span>Quality Assurance</span>
                </div>
                <p className="text-xs text-cream/95 font-light leading-relaxed">
                  Every sapling, boulder, and irrigation emitter is calibrated for regional climate tolerance and long-term durability.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="bronze-accent" />

      {/* 3. STRATEGIC DIRECTION: VISION & MISSION LUXURY CARDS */}
      <section className="py-20 sm:py-24 bg-sand-50/70 border-y border-sand-200/60 relative overflow-hidden">
        {/* Soft background glow & topographical contours */}
        <TopographicalContour position="right" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Strategic Direction"
            title="Our Vision & Corporate Mission"
            subtitle="Guiding our daily craftsmanship and long-term environmental stewardship."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Vision Card */}
            <ScrollReveal animation="fade-right" delay={0}>
              <div className="group relative card-luxury p-8 sm:p-10 border border-sand bg-cream hover:border-bronze hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
                {/* Background Watermark Icon that Rotates & Scales on Hover */}
                <Target className="absolute -bottom-8 -right-8 w-44 h-44 text-burgundy/5 group-hover:text-burgundy/10 group-hover:scale-115 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-6 group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 shadow-xs">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-bronze flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-bronze inline-block" />
                    Our Vision
                  </span>
                  <h3 className="text-2xl font-bold font-sans text-brand-dark mt-2 mb-4 group-hover:text-burgundy transition-colors">
                    Inspiring Living Environments
                  </h3>
                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {vision}
                  </p>
                </div>

                {/* Bottom Expanding Accent Bar */}
                <div className="w-12 group-hover:w-full h-1 bg-gradient-to-r from-burgundy via-bronze to-burgundy transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="group relative card-luxury p-8 sm:p-10 border border-sand bg-cream hover:border-bronze hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
                {/* Background Watermark Icon that Rotates & Scales on Hover */}
                <Compass className="absolute -bottom-8 -right-8 w-44 h-44 text-bronze/5 group-hover:text-bronze/10 group-hover:scale-115 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-bronze/15 text-bronze flex items-center justify-center mb-6 group-hover:bg-bronze group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400 shadow-xs">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-bronze flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-bronze inline-block" />
                    Our Mission
                  </span>
                  <h3 className="text-2xl font-bold font-sans text-brand-dark mt-2 mb-4 group-hover:text-burgundy transition-colors">
                    Mastery in Execution & Agronomy
                  </h3>
                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {mission}
                  </p>
                </div>

                {/* Bottom Expanding Accent Bar */}
                <div className="w-12 group-hover:w-full h-1 bg-gradient-to-r from-bronze via-sand-600 to-bronze transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="bronze-accent" />

      {/* 4. METHODOLOGY: 4-STAGE ARCHITECTURAL PROCESS CARDS */}
      <section className="py-20 sm:py-24 bg-cream relative overflow-hidden">
        {/* Decorative botanical side line art */}
        <BotanicalBranchRight />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Methodology"
            title="Our Structured Engineering Approach"
            subtitle="From initial soil mapping to perpetual horticultural care, our four-stage framework guarantees flawless execution."
          />

          <div className="relative mt-14">
            {/* Desktop Connecting Process Rail */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-bronze/30 via-burgundy/40 to-bronze/30 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
              
              {/* Stage 01 */}
              <ScrollReveal animation="fade-up" delay={0}>
                <div className="group relative p-6 sm:p-7 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                        01
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Search className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Phase 1</span>
                    <h4 className="text-lg font-bold text-burgundy mt-1 mb-2.5 group-hover:text-burgundy-950 transition-colors">
                      Discovery & Soil Science
                    </h4>
                    <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                      Comprehensive site surveying, sunlight path tracing, topographical grading, and soil nutrient chemical profiling.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </ScrollReveal>

              {/* Stage 02 */}
              <ScrollReveal animation="fade-up" delay={120}>
                <div className="group relative p-6 sm:p-7 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                        02
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Layers className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Phase 2</span>
                    <h4 className="text-lg font-bold text-burgundy mt-1 mb-2.5 group-hover:text-burgundy-950 transition-colors">
                      Architectural Master Plan
                    </h4>
                    <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                      2D CAD and 3D realistic rendering detailing hardscape pathways, planting palettes, hydraulic irrigation diagrams, and nighttime lighting.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </ScrollReveal>

              {/* Stage 03 */}
              <ScrollReveal animation="fade-up" delay={240}>
                <div className="group relative p-6 sm:p-7 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                        03
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Sprout className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Phase 3</span>
                    <h4 className="text-lg font-bold text-burgundy mt-1 mb-2.5 group-hover:text-burgundy-950 transition-colors">
                      Turnkey Construction
                    </h4>
                    <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                      Excavation, drainage pipes, masonry construction, automated pump stations, organic soil mixing, and specimen tree installation.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </ScrollReveal>

              {/* Stage 04 */}
              <ScrollReveal animation="fade-up" delay={360}>
                <div className="group relative p-6 sm:p-7 rounded-2xl bg-cream-light border border-sand hover:border-bronze hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-default h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl sm:text-4xl font-extrabold text-sand-400 group-hover:text-bronze transition-colors duration-300">
                        04
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Trees className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">Phase 4</span>
                    <h4 className="text-lg font-bold text-burgundy mt-1 mb-2.5 group-hover:text-burgundy-950 transition-colors">
                      Perpetual Stewardship
                    </h4>
                    <p className="text-sm sm:text-xs text-brand-muted leading-relaxed">
                      Long-term grounds maintenance, routine horticultural check-ups, lawn aeration, organic fertilization, and seasonal replanting.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="bronze-accent" />

      {/* 5. CORE HORTICULTURAL PILLARS: Modern Technical Rigor Grid */}
      <section className="py-20 bg-sand-50/70 border-t border-sand-200/60 relative overflow-hidden">
        {/* Architectural layout marks */}
        <ArchitecturalGridMarks position="left" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Engineering Rigor"
            title="Our Four Pillars of Horticultural Mastery"
            subtitle="Scientific depth and architectural engineering behind every acre we develop."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group p-6 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 h-full">
                <div className="w-12 h-12 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center mb-4 group-hover:bg-bronze group-hover:text-white transition-all duration-300">
                  <Sprout className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                  Precision Soil Chemistry
                </h4>
                <p className="text-xs sm:text-xs text-brand-muted leading-relaxed font-normal">
                  Laboratory nutrient mapping, customized organic enrichment, and pH balance calibrated specifically for root health.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div className="group p-6 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 h-full">
                <div className="w-12 h-12 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center mb-4 group-hover:bg-bronze group-hover:text-white transition-all duration-300">
                  <Droplets className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                  Hydraulic Conservation
                </h4>
                <p className="text-xs sm:text-xs text-brand-muted leading-relaxed font-normal">
                  Smart micro-drip networks and weather-responsive controllers engineered to conserve up to 40% more water.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="group p-6 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 h-full">
                <div className="w-12 h-12 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center mb-4 group-hover:bg-bronze group-hover:text-white transition-all duration-300">
                  <Trees className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                  Native Biodiversity
                </h4>
                <p className="text-xs sm:text-xs text-brand-muted leading-relaxed font-normal">
                  Carefully selected indigenous specimen flora that naturally resist pests and flourish in local climate extremes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="group p-6 rounded-2xl bg-white border border-sand hover:border-bronze hover:shadow-xl hover:-translate-y-2 transition-all duration-400 h-full">
                <div className="w-12 h-12 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center mb-4 group-hover:bg-bronze group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-burgundy mb-2 group-hover:text-burgundy-950 transition-colors">
                  Hardscape Durability
                </h4>
                <p className="text-xs sm:text-xs text-brand-muted leading-relaxed font-normal">
                  Reinforced foundations, natural stone paving, and retaining walls built to withstand generational weathering.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US: LUXURY DARK BURGUNDY EXPERIENCE */}
      <section className="py-20 sm:py-24 bg-burgundy-dark text-cream border-t border-burgundy/40 relative overflow-hidden">
        {/* Soft Ambient Radiance in Background and delicate side motif */}
        <BotanicalBranchRight className="opacity-10 text-sand-300" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-bronze/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-burgundy/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            light
            badge="Client Benefits"
            title="Why Choose MP Landscape Services"
            subtitle="Delivering certainty, high aesthetic value, and sustainable longevity."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {/* Benefit 1 */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group relative p-7 sm:p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bronze/50 backdrop-blur-xs transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-bronze/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-bronze group-hover:text-white transition-all duration-300 shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-cream mb-2 group-hover:text-white transition-colors">
                    Single-Point Responsibility
                  </h4>
                  <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                    No third-party subcontractors or finger-pointing. We manage earthworks, horticulture, electrical lighting, and plumbing under one clear contract.
                  </p>
                </div>

                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-cream/40 transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            {/* Benefit 2 */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="group relative p-7 sm:p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bronze/50 backdrop-blur-xs transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-bronze/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-bronze group-hover:text-white transition-all duration-300 shadow-md">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-cream mb-2 group-hover:text-white transition-colors">
                    Water-Conservation Engineering
                  </h4>
                  <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                    Advanced automated controllers and precision micro-drip networks engineered specifically for tropical and arid climate variations.
                  </p>
                </div>

                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-cream/40 transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>

            {/* Benefit 3 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="group relative p-7 sm:p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bronze/50 backdrop-blur-xs transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between overflow-hidden cursor-default h-full">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-bronze/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <div className="w-12 h-12 rounded-xl bg-bronze/15 border border-bronze/30 text-bronze flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-bronze group-hover:text-white transition-all duration-300 shadow-md">
                    <Trees className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-cream mb-2 group-hover:text-white transition-colors">
                    Specimen Nursery Reserves
                  </h4>
                  <p className="text-sm sm:text-xs text-cream/85 leading-relaxed font-normal">
                    Immediate access to healthy, mature specimen trees, palms, and exotic shrubs from our dedicated propagation centers.
                  </p>
                </div>

                <div className="w-8 group-hover:w-full h-0.5 bg-gradient-to-r from-bronze to-cream/40 transition-all duration-500 rounded-full mt-6" />
              </div>
            </ScrollReveal>
          </div>

          {/* Interactive CTA Link */}
          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="group btn-accent text-base sm:text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-bronze/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span>Connect with Our Leadership Team</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
