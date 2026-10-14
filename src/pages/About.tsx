import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../assets/images';
import { RotatingBadge } from '../components/RotatingBadge';
import { Eye, Target } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  return (
    <div className="page-about w-full">
      {/* 1. About hero */}
      <section className="relative w-full bg-[#050505] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#352B20] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#D6B45C]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D6B45C] uppercase">
                  OUR ESSENCE & HERITAGE
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#BFA078] font-bold uppercase tracking-tight">
                About Us
              </h1>
              <p className="text-base text-[#F6F0E7]/85 max-w-sm leading-relaxed">
                A peaceful haven dedicated to restorative wellness, mindful beauty, and unhurried luxury across hair, skin and body care.
              </p>
              <div className="pt-2">
                <GoldButton
                  text="Book Your Escape"
                  onClick={onOpenBooking}
                  size="md"
                />
              </div>
            </div>

            {/* Right Media + 3D Tilt Card + Spinning Badge */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className="absolute -top-12 -left-6 sm:-top-14 sm:left-4 z-20 pointer-events-none opacity-85">
                <RotatingBadge
                  text="THE BAAN PHILOSOPHY · SALON · BEAUTY · SPA · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#BFA078]/40 bg-[#181614]"
              >
                <ImageWithFallback
                  src={IMAGES.aboutHero}
                  alt="BAAN welcome space"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN welcome space"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY INTRODUCTION SECTION */}
      <section className="about-story-light w-full bg-[#F6F0E7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#977344] block">
              The BAAN Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#050505] font-bold">
              Mindful Luxury, Tailored For You
            </h2>
            <GoldDivider />
            <p className="text-base sm:text-lg text-[#352B20] leading-relaxed max-w-3xl mx-auto">
              BAAN B is a full-service salon, spa and bridal destination where warm hospitality meets personalized beauty care. From expert styling and hair colour to restorative spa rituals and bridal preparation, every visit is designed to help you feel comfortable, confident and cared for.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 3-COLUMN VERTICAL PHOTO GALLERY STRIP (With 3D Tilt) */}
      <section className="w-full bg-[#181614] py-16 lg:py-24 border-y border-[#352B20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-motion-stagger className="compact-card-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="rounded-[28px] overflow-hidden shadow-xl aspect-[3/4] bg-[#0C0B0A] border border-[#352B20]"
            >
              <ImageWithFallback
                src={IMAGES.aboutTrio1}
                alt="Therapist Preparing Session"
                data-reveal="left"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                fallbackText="Therapist preparing a session"
              />
            </TiltCard>
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="rounded-[28px] overflow-hidden shadow-xl aspect-[3/4] bg-[#0C0B0A] border border-[#352B20]"
            >
              <ImageWithFallback
                src={IMAGES.aboutTrio2}
                alt="Aromatic Botanical Oils"
                data-reveal="right"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                fallbackText="Aromatic botanical oils"
              />
            </TiltCard>
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="rounded-[28px] overflow-hidden shadow-xl aspect-[3/4] bg-[#0C0B0A] border border-[#352B20]"
            >
              <ImageWithFallback
                src={IMAGES.aboutTrio3}
                alt="Restorative Therapy Room"
                data-reveal="left"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                fallbackText="Restorative therapy room"
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 5. VISION & MISSION SECTION (With 3D Tilt Cards) */}
      <section className="w-full bg-[#050505] py-16 lg:py-24 border-b border-[#352B20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <TiltCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className="bg-[#0C0B0A] rounded-[32px] p-8 sm:p-12 space-y-4 shadow-xl border border-[#352B20]"
            >
              <div className="w-14 h-14 rounded-full bg-[#181614] text-[#D6B45C] flex items-center justify-center border border-[#BFA078]/30">
                <Eye size={24} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#BFA078]">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-[#F6F0E7]/85 leading-relaxed">
                To be the pinnacle destination for authentic holistic wellness, couture hair design and bridal artistry, harmonizing timeless Balinese techniques with contemporary luxury.
              </p>
            </TiltCard>

            {/* Mission Card */}
            <TiltCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className="bg-[#0C0B0A] rounded-[32px] p-8 sm:p-12 space-y-4 shadow-xl border border-[#352B20]"
            >
              <div className="w-14 h-14 rounded-full bg-[#181614] text-[#D6B45C] flex items-center justify-center border border-[#BFA078]/30">
                <Target size={24} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#BFA078]">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-[#F6F0E7]/85 leading-relaxed">
                To deliver bespoke therapeutic experiences, meticulous hygiene and empathetic service across all our salons and spas, leaving every guest revitalized in spirit and body.
              </p>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 6. BAAN MEDIA SHOWCASE */}
      <section className="w-full bg-[#181614] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard
            maxTilt={4}
            scale={1.01}
            className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[16/9] sm:aspect-[21/9] bg-[#050505] border border-[#BFA078]/30 group"
          >
            <ImageWithFallback
              src={IMAGES.aboutVideoPoster}
              alt="BAAN atmosphere"
              data-reveal="right"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              fallbackText="A BAAN spa atmosphere"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 flex flex-col items-center justify-center text-center p-6 text-white">
              <div className="w-12 h-px bg-[#D6B45C] mb-4" aria-hidden="true" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#BFA078]">
                A Glimpse Inside BAAN
              </h3>
              <p className="text-xs sm:text-sm text-[#F6F0E7]/85 mt-2 max-w-md">
                Gentle bamboo melodies, cold-pressed botanical oils, and private hydrotherapy suites.
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 7. MEMBERSHIP PROMOTIONAL BANNER */}
      <section className="w-full bg-[#050505] py-14 lg:py-20 border-y border-[#352B20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D6B45C]">
                Join The Circle
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#BFA078] font-bold mt-1">
                Membership Privileges
              </h2>
              <p className="text-sm text-[#F6F0E7]/80 mt-1 max-w-lg">
                Enjoy preferential pricing, prepaid hours, and bespoke privileges across all BAAN locations in Hyderabad.
              </p>
            </div>
            <Link to="/membership" className="flex-shrink-0">
              <GoldButton text="Explore Memberships" size="md" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ATMOSPHERIC OCEAN WAVE BREAK */}
      <section className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden">
        <ImageWithFallback
          src={IMAGES.oceanWaveBanner}
          alt="Serene Ocean"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          fallbackText="A quiet moment of renewal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 flex items-center justify-center pointer-events-none">
          <p className="font-serif italic text-white/95 text-2xl sm:text-3xl text-center px-4 drop-shadow-md">
            “In stillness, find your natural beauty.”
          </p>
        </div>
      </section>
    </div>
  );
};
