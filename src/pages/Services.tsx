import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, SERVICE_CATEGORIES } from '../config/business';
import { IMAGES } from '../assets/images';
import { RotatingBadge } from '../components/RotatingBadge';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';
import { Hero3DCanvas } from '../components/Hero3DCanvas';

interface ServicesProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

const ServiceCardImage: React.FC<{ title: string; category: string; src: string; popular?: boolean }> = ({
  title,
  category,
  src,
  popular,
}) => {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div className="service-card-fallback" role="img" aria-label={`${title} treatment image unavailable`}>
        <Sparkles size={22} aria-hidden="true" />
        <span>{category}</span>
        <strong>{title}</strong>
        {popular && <small>Featured ritual</small>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      onError={() => setHasFailed(true)}
    />
  );
};

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuModalOpen(false);
      if (event.key === 'Tab' && menuDialogRef.current) {
        const focusable = Array.from(menuDialogRef.current.querySelectorAll<HTMLElement>(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter((element) => !element.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    const focusTimer = window.setTimeout(() => menuDialogRef.current?.focus(), 0);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.setTimeout(() => (previousFocus ?? menuTriggerRef.current)?.focus(), 0);
    };
  }, [menuModalOpen]);

  const filteredServices = selectedCat === 'all'
    ? SERVICES
    : SERVICES.filter((s) => {
        const catObj = SERVICE_CATEGORIES.find((c) => c.id === selectedCat);
        return catObj ? s.category === catObj.name : true;
      });

  return (
    <div className="page-services w-full">
      {/* 1. Services hero */}
      <section className="relative w-full bg-[#050505] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#352B20] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#D6B45C]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D6B45C] uppercase">
                  HAIR · BEAUTY · BODY RITUALS
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#BFA078] font-bold uppercase tracking-tight">
                Our Services
              </h1>
              <p className="text-base text-[#F6F0E7]/85 max-w-sm leading-relaxed">
                Immerse yourself in authentic Balinese massages, couture hair rituals, and restorative Ayurvedic therapies designed to harmonize mind, body and spirit.
              </p>
              <div className="pt-2">
                <GoldButton
                  text="Book Your Escape"
                  onClick={() => onOpenBooking()}
                  size="md"
                />
              </div>
            </div>

            {/* Right Media + 3D Tilt Card + Spinning Badge */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className="absolute -top-12 -left-6 sm:-top-14 sm:left-4 z-20 pointer-events-none opacity-85">
                <RotatingBadge
                  text="AUTHENTIC BALINESE RITUALS · BAAN SPA & SALON · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#BFA078]/40 bg-[#181614]"
              >
                <ImageWithFallback
                  src={IMAGES.servicesHero}
                  alt="BAAN Holistic Treatments"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN treatments and rituals"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CENTERED SECTION TITLE */}
      <section className="services-title w-full bg-[#F6F0E7] pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#050505] font-bold tracking-tight uppercase">
            Curated Treatment Menu
          </h2>
          <GoldDivider />
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS (Warm Tan / Wood Tone matching reference) */}
      <section className="services-category-filter w-full bg-[#F6F0E7] pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-2" role="group" aria-label="Filter services by category">
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  aria-pressed={isSelected}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#BFA078] text-[#050505] shadow-sm'
                      : 'bg-[#0C0B0A] text-[#F6F0E7] hover:bg-[#352B20]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 5-COLUMN SERVICE GRID */}
      <section className="services-grid-section w-full bg-[#F6F0E7] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <p className="sr-only" aria-live="polite">
            Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
            {selectedCat !== 'all' ? ` in ${SERVICE_CATEGORIES.find((category) => category.id === selectedCat)?.name}` : ''}
          </p>
          <div key={selectedCat} data-motion-stagger className="service-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredServices.map((service) => (
              <TiltCard
                key={service.slug}
                maxTilt={8}
                scale={1.02}
                glare={true}
                className="service-card bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group border border-[#E8E0D6]"
              >
                <Link
                  to={`/service/${service.slug}`}
                  className="aspect-[4/3] overflow-hidden block relative"
                >
                  <ServiceCardImage
                    title={service.title}
                    category={service.category}
                    src={service.image}
                    popular={service.popular}
                  />
                  {service.popular && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-[#BFA078] to-[#D6B45C] text-[#050505] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Popular
                    </span>
                  )}
                  {/* Floating price pill */}
                  <span className="absolute bottom-2.5 right-2.5 bg-[#050505]/85 backdrop-blur-xs text-[#D6B45C] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#D6B45C]/40">
                    {service.price}
                  </span>
                </Link>

                <div className="p-4 bg-white flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="font-medium text-sm text-[#181614] group-hover:text-[#977344] transition-colors line-clamp-2">
                      <Link to={`/service/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-[11px] text-[#5f574e] mt-1">
                      {service.duration}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t border-[#E8E0D6] flex items-center justify-between text-xs">
                    <Link
                      to={`/service/${service.slug}`}
                      className="text-[#5f574e] hover:text-[#050505] transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => onOpenBooking(service.slug)}
                      className="text-[#977344] font-semibold hover:text-[#D6B45C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-[#181614] rounded-3xl border border-[#352B20] p-8 max-w-lg mx-auto">
              <Sparkles className="w-10 h-10 text-[#BFA078] mx-auto mb-3" />
              <p className="font-serif text-xl text-[#BFA078] font-semibold">
                No rituals found in this category
              </p>
              <button
                onClick={() => setSelectedCat('all')}
                className="mt-4 btn-bali text-xs py-2 px-5"
              >
                View All Services
              </button>
            </div>
          )}

          {/* View Menu Button */}
          <div className="text-center mt-12">
            <button
              ref={menuTriggerRef}
              onClick={() => setMenuModalOpen(true)}
              className="btn-bali px-8 py-3 text-sm group cursor-pointer"
            >
              <span>View Menu</span>
              <span className="transition-transform group-hover:translate-x-1">────→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE ATMOSPHERIC OCEAN WAVE BREAK */}
      <section className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden">
        <ImageWithFallback
          src={IMAGES.oceanWaveBanner}
          alt="Coastal BAAN atmosphere"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          fallbackText="A quiet moment of renewal"
        />
        <div className="absolute inset-0 bg-black/15 flex items-center justify-center pointer-events-none">
          <p className="font-serif italic text-white/90 text-2xl sm:text-3xl text-center px-4 drop-shadow-md">
            “True wellness is the harmony of mind, breath and body.”
          </p>
        </div>
      </section>

      {/* 7. APPOINTMENT PROMOTIONAL SECTION (Matching Reference Two-Column Box) */}
      <section className="w-full bg-[#FAF8F5] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-5 space-y-5">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#BFA078] font-bold leading-tight">
                Ready to Bring Out the Best Version of You
              </h3>
              <p className="text-sm sm:text-base text-[#F6F0E7] leading-relaxed">
                Book an appointment with BAAN and let our certified master therapists and couture hair stylists transform your look. Experience the perfect blend of professionalism, authenticity, and peace.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[#F6F0E7]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#BFA078] text-[#050505] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>Pure Organic Botanical Oils &amp; Clays</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#BFA078] text-[#050505] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>Private Hydrotherapy &amp; Steam Rooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#BFA078] text-[#050505] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>Four Convenient Hyderabad Sanctuaries</span>
                </div>
              </div>
            </div>

            {/* Right Column Form Box matching reference container */}
            <div className="lg:col-span-7">
              <div className="border border-[#352B20] rounded-[32px] p-8 sm:p-10 bg-[#181614] shadow-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onOpenBooking();
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    className="input-bali-underline"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    className="input-bali-underline"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-bali-underline"
                  />
                  <select className="input-bali-underline cursor-pointer">
                    <option value="">Select Service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      className="input-bali-underline cursor-pointer"
                    />
                    <input
                      type="time"
                      className="input-bali-underline cursor-pointer"
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#BFA078] text-[#050505] hover:bg-[#D6B45C] border border-[#BFA078] transition-all text-sm font-semibold tracking-wide cursor-pointer"
                    >
                      Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Menu Modal */}
      {menuModalOpen && (
        <div
          className="catalogue-backdrop fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMenuModalOpen(false);
          }}
        >
          <div
            ref={menuDialogRef}
            className="catalogue-dialog flex w-full max-w-[960px] max-h-[min(85dvh,900px)] flex-col overflow-hidden rounded-[24px] border border-[#D8C6AD] bg-[#FAF7F2] shadow-[0_24px_80px_rgba(40,35,31,.22)] outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="catalogue-title"
            tabIndex={-1}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-[#E8E0D6] px-5 py-5 sm:px-8 sm:py-6">
              <div>
                <h3 id="catalogue-title" className="font-serif text-2xl font-bold text-[#28231F] sm:text-3xl">
                  BAAN Complete Treatment Catalogue
                </h3>
                <p className="mt-1 text-xs text-[#756C63] sm:text-sm">
                  All services across our Hyderabad sanctuaries
                </p>
              </div>
              <button
                onClick={() => setMenuModalOpen(false)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#D8C6AD] text-xl text-[#28231F] transition-colors hover:bg-[#BFA078] focus:outline-none focus:ring-2 focus:ring-[#BFA078]"
                aria-label="Close treatment catalogue"
              >
                ✕
              </button>
            </div>
            <div className="catalogue-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-8 sm:py-6">
            <div className="space-y-3 sm:space-y-4">
              {SERVICES.map((s) => (
                <div
                  key={s.slug}
                  className="flex flex-col items-stretch gap-3 rounded-2xl border border-[#E8E0D6] bg-white p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-5"
                >
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm leading-snug text-[#28231F] sm:text-base">
                      {s.title}
                    </h4>
                    <p className="text-xs text-gray-500">{s.category} · {s.duration}</p>
                    <p className="text-xs text-gray-600 mt-1">{s.description}</p>
                  </div>
                  <div className="flex flex-shrink-0 items-center justify-between gap-4 border-t border-[#E8E0D6] pt-3 sm:min-w-[130px] sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                    <span className="font-serif text-base font-bold text-[#28231F]">
                      {s.price}
                    </span>
                    <button
                      onClick={() => {
                        setMenuModalOpen(false);
                        onOpenBooking(s.slug);
                      }}
                      className="text-xs font-semibold text-[#927449] transition-colors hover:text-[#28231F] hover:underline focus:outline-none focus:ring-2 focus:ring-[#BFA078]"
                    >
                      Book →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
