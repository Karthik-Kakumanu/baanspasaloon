import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Building2, ChevronLeft, ChevronRight, Maximize2, Sparkles, Users } from 'lucide-react';
import { BUSINESS_SETTINGS, BUSINESS_STATS, SERVICES, BLOG_POSTS, REVIEWS } from '../config/business';
import { IMAGES } from '../assets/images';
import { RotatingBadge } from '../components/RotatingBadge';
import { QuickBookingBar } from '../components/QuickBookingBar';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';

interface HomeProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBooking }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [serviceScrollProgress, setServiceScrollProgress] = useState(0);
  const featuredServicesRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate state for hero 3D parallax depth
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setHeroOffset({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroOffset({ x: 0, y: 0 });
  };

  const featuredServices = SERVICES.slice(0, 5);

  return (
    <div className="w-full">
      {/* 1. IMMERSIVE 3D CINEMATIC HERO */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="home-hero relative w-full bg-[#000000] pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#2C2114]"
      >
        {/* Interactive 3D Canvas Background with orbital rings and floating gold ember particles */}
        <Hero3DCanvas className="opacity-90" />

        {/* Ambient Dark Vignette & Gold Spotlight Gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_45%,rgba(214,180,92,0.12)_0%,rgba(5,5,5,0.7)_50%,#000000_90%)]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Copy with subtle pointer depth shift */}
            <div
              className="home-hero-copy lg:col-span-5 space-y-6 text-left transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${heroOffset.x * -10}px, ${heroOffset.y * -8}px, 0)`,
              }}
            >
              <div data-motion-reveal data-motion-delay="0" className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#FFF0A6]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#FFF0A6] uppercase">
                  BAAN · SALON · BEAUTY · SPA
                </span>
              </div>

              <h1
                data-motion-reveal
                data-motion-delay="100"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.12] text-[#D4A64A] font-bold uppercase tracking-tight drop-shadow-[0_2px_18px_rgba(214,180,92,0.15)]"
              >
                Experience the
                <br />
                <span className="bg-gradient-to-r from-[#D4A64A] via-[#FFF0A6] to-[#D4A64A] bg-clip-text text-transparent">
                  serenity of BAAN
                </span>
              </h1>

              <p
                data-motion-reveal
                data-motion-delay="210"
                className="text-base sm:text-lg text-[#F7F3EC]/85 font-normal max-w-md leading-relaxed"
              >
                Escape to a luxury sanctuary where authentic Balinese bodywork, couture hair rituals and personalized treatments renew your essence.
              </p>

              <div data-motion-reveal data-motion-delay="320" className="pt-2 flex items-center gap-4">
                <GoldButton
                  text="Book Your Escape"
                  onClick={() => onOpenBooking()}
                  size="lg"
                  className="shadow-[0_4px_25px_rgba(214,180,92,0.35)]"
                />
                <Link
                  to="/service"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#F7F3EC]/80 hover:text-[#FFF0A6] transition-colors py-2 px-3 border-b border-transparent hover:border-[#FFF0A6]"
                >
                  Explore Rituals
                </Link>
              </div>
            </div>

            {/* Right Hero Media + 3D Tilt Card + Rotating Stamp */}
            <div
              className="lg:col-span-7 relative flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${heroOffset.x * 12}px, ${heroOffset.y * 10}px, 0)`,
              }}
            >
              {/* Rotating Badge behind/above media frame */}
              <div className="absolute -top-12 -left-6 sm:-top-14 sm:left-4 z-20 pointer-events-none opacity-90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                <RotatingBadge
                  text="YOUR WELLNESS SPA · BAAN SALON BEAUTY & SPA · "
                  size={200}
                />
              </div>

              {/* 3D Tilt Card Media Container */}
              <TiltCard
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-[#D4A64A]/40 bg-[#111111] group"
              >
                <ImageWithFallback
                  src={IMAGES.heroSpaTreatment}
                  alt="BAAN Authentic Spa Therapy"
                  className="home-hero-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  loading="eager"
                  fetchPriority="high"
                  fallbackText="A calm BAAN spa setting"
                />
                
                {/* Brand-led image treatment with luxury crest vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35 flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none">
                  <img
                    src={BUSINESS_SETTINGS.logo}
                    alt="BAAN Crest"
                    className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="text-[11px] uppercase tracking-widest text-[#FFF0A6] mt-2 font-medium drop-shadow-sm">
                    The Art of Serenity
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>

          <a className="home-scroll-cue" href="#home-story">
            <span>Scroll to explore</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 2. TRUSTED LEADERSHIP IN INDUSTRY / STATISTICS SECTION (With Interactive 3D Tilt) */}
      <section className="home-stats w-full bg-[#111111] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4A64A] font-bold tracking-tight">
              Trusted Leadership in Industry
            </h2>
            <GoldDivider />
            <p className="text-xs uppercase tracking-widest text-[#8C5A1E]">
              Demonstration Highlights &amp; Capacity
            </p>
          </div>

          <div data-motion-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {BUSINESS_STATS.map((stat) => (
              <TiltCard
                key={stat.id}
                maxTilt={8}
                scale={1.02}
                glare={true}
                className="home-stat-card bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-xs cursor-default"
              >
                {/* Round Ivory Circle Badge with Icon */}
                <div className="w-20 h-20 rounded-full bg-[#F7F3EC] border border-[#E7DED0] flex items-center justify-center mb-6 shadow-xs text-[#8C5A1E] transition-transform duration-300 group-hover:scale-110">
                  {stat.id === 'locations' && <Building2 size={30} strokeWidth={1.5} />}
                  {stat.id === 'therapists' && <Users size={30} strokeWidth={1.5} />}
                  {stat.id === 'space' && <Maximize2 size={30} strokeWidth={1.5} />}
                  {stat.id === 'rooms' && <Sparkles size={30} strokeWidth={1.5} />}
                </div>

                {/* Big Serif Number */}
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#000000] flex items-baseline">
                  <span>{stat.number}</span>
                  <span className="text-2xl font-normal ml-0.5 text-[#D4A64A]">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mt-2">
                  {stat.label}
                </h3>
                <p className="text-[11px] text-[#5f574e] mt-1">
                  {stat.sublabel}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <QuickBookingBar onOpenBooking={() => onOpenBooking()} />

      {/* 4. MAIN BRAND INTRODUCTION (Split layout with palm leaf background touches) */}
      <section id="home-story" className="home-intro relative w-full bg-[#F7F3EC] py-20 lg:py-28 overflow-hidden">
        {/* Subtle decorative leaf silhouette watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 200 200" fill="#D4A64A" className="w-full h-full">
            <path d="M45,15 C60,40 80,70 120,80 C90,95 60,110 30,135 C50,110 70,85 55,60 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-5 space-y-6">
              <span className="home-intro-eyebrow text-xs font-semibold tracking-widest text-[#8C5A1E] uppercase block">
                The BAAN Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#000000] font-bold leading-tight">
                Welcome to BAAN,
              </h2>
              <p className="text-base text-[#2C2114] leading-relaxed">
                Step into BAAN B — a full-service salon, spa and bridal destination where personalized treatments refresh your look, uplift your mood and boost your confidence. Enjoy complimentary drinks and refreshments as you unwind.
              </p>
              <div className="pt-2">
                <GoldButton
                  text="Book Your Escape"
                  onClick={() => onOpenBooking()}
                  size="md"
                />
              </div>
            </div>

            {/* Right Column Image with 3D Tilt */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={5}
                scale={1.01}
                className="relative rounded-[32px] overflow-hidden shadow-xl aspect-[16/10] bg-[#111111] border border-[#D4A64A]/30"
              >
                <ImageWithFallback
                  src={IMAGES.aboutHero}
                  alt="Inside BAAN"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  fallbackText="Inside BAAN"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUALITY HIGHLIGHTS SECTION (3 Interactive 3D Cards) */}
      <section className="home-highlights w-full bg-[#111111] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4A64A] font-bold tracking-tight">
              Authentic Balinese experience
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="compact-card-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="bg-[#0A0A0A] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[360px] border border-[#2C2114]"
            >
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#D4A64A] font-bold">
                  The BAAN experience
                </h3>
                <p className="text-sm text-[#F7F3EC]/80 leading-relaxed">
                  Escape into tranquility with our traditional Balinese palm therapies, aromatic oils and serene ambient music.
                </p>
              </div>
              <div className="pt-8">
                <Link
                  to="/service"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A64A] hover:text-[#FFF0A6] group transition-colors"
                >
                  <span>Discover Rituals</span>
                  <span className="transition-transform group-hover:translate-x-1.5">────→</span>
                </Link>
              </div>
            </TiltCard>

            {/* Card 2 */}
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="bg-[#0A0A0A] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[360px] border border-[#2C2114]"
            >
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#D4A64A] font-bold">
                  Professional Therapists
                </h3>
                <p className="text-sm text-[#F7F3EC]/80 leading-relaxed">
                  Experience expert bodywork and couture hair design from masters trained in international techniques and authentic disciplines.
                </p>
              </div>
              <div className="pt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A64A] hover:text-[#FFF0A6] group transition-colors"
                >
                  <span>Our Philosophy</span>
                  <span className="transition-transform group-hover:translate-x-1.5">────→</span>
                </Link>
              </div>
            </TiltCard>

            {/* Card 3 */}
            <TiltCard
              maxTilt={7}
              scale={1.02}
              glare={true}
              className="bg-[#0A0A0A] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[360px] border border-[#2C2114]"
            >
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[#D4A64A] font-bold">
                  Personalised Services
                </h3>
                <p className="text-sm text-[#F7F3EC]/80 leading-relaxed">
                  Every ritual begins with a quiet consultation so pressure, essential oils and focus areas match your exact energy today.
                </p>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4A64A] hover:text-[#FFF0A6] group cursor-pointer bg-transparent border-0 p-0 transition-colors"
                >
                  <span>Book Private Session</span>
                  <span className="transition-transform group-hover:translate-x-1.5">────→</span>
                </button>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 6. OUR SERVICES SHOWCASE (With 3D Perspective Tilt on Every Service Card) */}
      <section className="home-services w-full bg-[#F7F3EC] py-16 lg:py-24 border-t border-[#E7DED0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] font-bold tracking-tight">
              Our Services
            </h2>
            <GoldDivider />
          </div>

          <div className="home-service-controls" aria-label="Featured service carousel controls">
            <div className="home-service-progress" role="progressbar" aria-label="Featured service position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(serviceScrollProgress * 100)}>
              <span style={{ transform: `scaleX(${Math.max(0.08, serviceScrollProgress)})` }} />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="carousel-control"
                aria-label="Scroll featured services left"
                disabled={serviceScrollProgress <= 0.01}
                onClick={() => {
                  const rail = featuredServicesRef.current;
                  const card = rail?.firstElementChild;
                  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
                  rail?.scrollBy({ left: -(card?.getBoundingClientRect().width ?? 280) - 20, behavior });
                }}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="carousel-control"
                aria-label="Scroll featured services right"
                disabled={serviceScrollProgress >= 0.99}
                onClick={() => {
                  const rail = featuredServicesRef.current;
                  const card = rail?.firstElementChild;
                  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
                  rail?.scrollBy({ left: (card?.getBoundingClientRect().width ?? 280) + 20, behavior });
                }}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={featuredServicesRef}
            className="home-service-rail"
            data-motion-stagger
            role="region"
            aria-label="Featured services. Swipe or scroll to explore."
            tabIndex={0}
            onScroll={(event) => {
              const rail = event.currentTarget;
              const maxScroll = rail.scrollWidth - rail.clientWidth;
              setServiceScrollProgress(maxScroll > 0 ? rail.scrollLeft / maxScroll : 1);
            }}
          >
            {featuredServices.map((service) => (
              <TiltCard
                key={service.slug}
                maxTilt={7}
                scale={1.02}
                glare={true}
                className="home-service-card bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group border border-[#E7DED0] snap-start"
              >
                {/* Photo */}
                <Link
                  to={`/service/${service.slug}`}
                  className="aspect-[4/3] overflow-hidden block relative"
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    data-reveal="left"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                    fallbackText={service.title}
                  />
                  {/* Floating Price Pill */}
                  <span className="absolute bottom-2.5 right-2.5 bg-[#000000]/85 backdrop-blur-xs text-[#FFF0A6] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#FFF0A6]/40">
                    {service.price}
                  </span>
                </Link>

                {/* Warm Ivory Bottom Container */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="font-medium text-sm text-[#111111] group-hover:text-[#8C5A1E] transition-colors line-clamp-2">
                      <Link to={`/service/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-xs text-[#5f574e] mt-1">
                      {service.duration}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E7DED0] flex items-center justify-between">
                    <Link
                      to={`/service/${service.slug}`}
                      className="text-[11px] text-[#5f574e] hover:text-[#000000] transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => onOpenBooking(service.slug)}
                      className="text-xs text-[#8C5A1E] font-semibold hover:text-[#FFF0A6] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* View Menu CTA Button */}
          <div className="text-center mt-12">
            <Link to="/service">
              <GoldButton text="View Complete Menu" size="md" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP PROMOTIONAL BANNER */}
      <section className="home-membership w-full bg-[#000000] py-14 lg:py-20 border-y border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FFF0A6]">
                Exclusive Wellness Privileges
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#D4A64A] font-bold mt-1">
                Membership Privileges
              </h2>
              <p className="text-sm text-[#F7F3EC]/80 mt-1 max-w-lg">
                Unlock prepaid hours (BBH), complimentary luxury scrubs, and priority reservations across all 4 Hyderabad sanctuaries.
              </p>
            </div>
            <Link to="/membership" className="flex-shrink-0">
              <GoldButton text="Explore Memberships" size="md" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL / BLOG PREVIEW SECTION (With 3D Tilt Cards) */}
      <section className="home-blog w-full bg-[#F7F3EC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] font-bold tracking-tight">
              Wellness Journal
            </h2>
            <GoldDivider />
          </div>

          <div className="compact-card-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <TiltCard
                key={post.slug}
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="bg-white rounded-3xl overflow-hidden border border-[#E7DED0] flex flex-col group shadow-xs hover:shadow-md cursor-default"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                    fallbackText={post.title}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4A64A] block mb-2">
                      {post.category} · {post.readTime}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#111111] group-hover:text-[#8C5A1E] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#5f574e] mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E7DED0] flex items-center justify-between text-xs text-[#5f574e]">
                    <span>{post.date}</span>
                    <span className="font-medium text-[#8C5A1E] group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                      Read Article ────→
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SIGNATURE ATMOSPHERIC OCEAN WAVE BREAK BANNER */}
      <section className="home-wave w-full h-64 sm:h-80 md:h-96 relative overflow-hidden">
        <ImageWithFallback
          src={IMAGES.oceanWaveBanner}
          alt="Serene Coastal Waves"
          className="scroll-parallax w-full h-full object-cover object-center"
          loading="lazy"
          fallbackText="A quiet moment of renewal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 flex items-center justify-center pointer-events-none">
          <p className="font-serif italic text-white/95 text-2xl sm:text-3xl text-center px-4 drop-shadow-lg">
            “Silence is the language of deep renewal.”
          </p>
        </div>
      </section>

      {/* 10. CUSTOMER TESTIMONIALS SECTION (Interactive 3D Carousel with Working Controls) */}
      <section className="home-testimonials w-full bg-[#111111] py-16 lg:py-24 border-t border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#D4A64A] font-bold tracking-tight">
              Customer Testimonials
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="review-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" aria-live="polite">
            {REVIEWS.map((review, index) => (
              <TiltCard
                key={review.id}
                maxTilt={6}
                scale={1.02}
                glare={true}
                className={`bg-[#0A0A0A] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-xs border border-[#2C2114] ${activeTestimonial === index ? 'testimonial-active' : 'hidden'} md:flex`}
              >
                <div>
                  <div className="text-[#FFF0A6] text-lg mb-4 tracking-widest">★★★★★</div>
                  <blockquote className="font-serif italic text-base text-[#F7F3EC] leading-relaxed">
                    “{review.quote}”
                  </blockquote>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2C2114] text-center">
                  <p className="font-serif font-bold text-base text-[#D4A64A]">
                    {review.name}
                  </p>
                  <p className="text-[11px] text-[#F7F3EC]/65 mt-0.5">
                    {review.location}
                  </p>
                  <span className="inline-block text-[9px] uppercase tracking-wider text-[#FFF0A6] mt-2 px-2.5 py-0.5 bg-[#111111] rounded-full border border-[#D4A64A]/20">
                    {review.note}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8" role="group" aria-label="Testimonial carousel controls">
            <button
              type="button"
              className="carousel-control"
              aria-label="Previous testimonial"
              disabled={REVIEWS.length < 2}
              onClick={() => setActiveTestimonial((current) => (current - 1 + REVIEWS.length) % REVIEWS.length)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex items-center justify-center gap-2">
              {REVIEWS.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setActiveTestimonial(index)}
                  className={`testimonial-dot ${activeTestimonial === index ? 'is-active' : ''}`}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={activeTestimonial === index ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel-control"
              aria-label="Next testimonial"
              disabled={REVIEWS.length < 2}
              onClick={() => setActiveTestimonial((current) => (current + 1) % REVIEWS.length)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
