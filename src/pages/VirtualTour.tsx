import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IMAGES } from '../assets/images';
import { LOCATION_BRANCHES } from '../config/business';
import { RotatingBadge } from '../components/RotatingBadge';
import { ChevronLeft, ChevronRight, Compass, Expand, X } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';

interface VirtualTourProps {
  onOpenBooking: () => void;
}

export const VirtualTour: React.FC<VirtualTourProps> = ({ onOpenBooking }) => {
  const [selectedBranch, setSelectedBranch] = useState(LOCATION_BRANCHES[0].id);
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseTimer = useRef<number | null>(null);

  const activeSpace = IMAGES.spaces[activeSpaceIdx];
  const currentBranch = LOCATION_BRANCHES.find((b) => b.id === selectedBranch) || LOCATION_BRANCHES[0];

  const closeLightbox = useCallback(() => {
    if (lightboxCloseTimer.current !== null) window.clearTimeout(lightboxCloseTimer.current);
    setLightboxClosing(true);
    lightboxCloseTimer.current = window.setTimeout(() => {
      setLightboxOpen(false);
      setLightboxClosing(false);
      lightboxCloseTimer.current = null;
    }, 220);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') {
        setActiveSpaceIdx((current) => (current - 1 + IMAGES.spaces.length) % IMAGES.spaces.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveSpaceIdx((current) => (current + 1) % IMAGES.spaces.length);
      }
      if (event.key === 'Tab' && lightboxRef.current) {
        const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>('button:not([disabled])'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => () => {
    if (lightboxCloseTimer.current !== null) window.clearTimeout(lightboxCloseTimer.current);
  }, []);

  const selectSpaceInViewer = (index: number) => {
    setActiveSpaceIdx(index);
    viewerRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="page-virtual-tour w-full">
      {/* 1. Virtual tour hero */}
      <section className="relative w-full bg-[#000000] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#2C2114] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#FFF0A6]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#FFF0A6] uppercase">
                  IMMERSIVE PREMISES TOUR
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#D4A64A] font-bold uppercase tracking-tight">
                Virtual Tour
              </h1>
              <p className="text-base text-[#F7F3EC]/85 max-w-sm leading-relaxed">
                Step inside BAAN’s serene architectural spaces, treatment suites, and private relaxation terraces.
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
                  text="IMMERSIVE PREMISES TOUR · BAAN SALON & SPA · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#D4A64A]/40 bg-[#111111]"
              >
                <ImageWithFallback
                  src={IMAGES.virtualTourHero}
                  alt="BAAN Virtual Tour Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN interior spaces"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRANCH SWITCHER TABS */}
      <section className="w-full bg-[#111111] pt-12 pb-6 border-b border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {LOCATION_BRANCHES.map((b) => {
              const isSelected = selectedBranch === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranch(b.id)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] text-[#000000] shadow-sm'
                      : 'bg-[#0A0A0A] text-[#F7F3EC] hover:bg-[#2C2114] border border-[#2C2114]'
                  }`}
                >
                  {b.name.replace(' Studio', '').replace(' Retreat', '').replace(' Flagship', '').replace(' Financial District', '')}
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-[#F7F3EC]/70 mt-4">
            Selected Location: <strong className="text-[#FFF0A6]">{currentBranch.name}</strong> · {currentBranch.address}
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE TOUR VIEWER CONTAINER with 3D Tilt */}
      <section className="w-full bg-[#0A0A0A] py-10 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div ref={viewerRef} className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[16/9] bg-[#111] border border-[#2C2114]">
            <ImageWithFallback
              key={activeSpace.image}
              src={activeSpace.image}
              alt={activeSpace.title}
              className="w-full h-full object-cover transition-opacity duration-500"
              loading="lazy"
              fallbackText={activeSpace.title}
            />

            {/* Viewer HUD Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full border border-white/10">
              <Compass size={14} className="text-[#FFF0A6] animate-spin" />
              <span>Perspective: {activeSpace.title}</span>
            </div>

            <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md text-[#FFF0A6] text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#FFF0A6]/30">
              {currentBranch.name} · Interactive View
            </div>

            {/* Interactive Hotspot Pills on the scene */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2 items-center justify-between bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex flex-wrap gap-2">
                {IMAGES.spaces.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSpaceIdx(idx)}
                    aria-pressed={activeSpaceIdx === idx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      activeSpaceIdx === idx
                        ? 'bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] text-[#000000] font-semibold'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    {sp.title.split(' ')[0]} {sp.title.split(' ')[1]}
                  </button>
                ))}
              </div>
              <button
                onClick={onOpenBooking}
                className="text-xs bg-[#D4A64A] text-[#000000] font-semibold px-4 py-1.5 rounded-xl hover:bg-[#FFF0A6] transition-colors cursor-pointer"
              >
                Book This Suite →
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-[#F7F3EC]/60 mt-4">
            ℹ️ Demonstration Tour View · Photographs reflect curated architectural and interior aesthetics of the BAAN portfolio.
          </p>
        </div>
      </section>

      {/* 4. GALLERY THUMBNAILS GRID (With 3D Tilt on each Card) */}
      <section className="tour-gallery w-full bg-[#F7F3EC] py-16 border-t border-[#E7DED0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#000000]">
              BAAN Chambers &amp; Spaces
            </h3>
            <GoldDivider />
            <p className="text-xs text-[#5f574e] mt-1">
              Select any chamber to view in the showcase above or click enlarge for fullscreen
            </p>
          </div>

          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.spaces.map((sp, idx) => (
              <TiltCard
                key={sp.title}
                maxTilt={6}
                scale={1.02}
                glare={true}
                className={`tour-gallery-card group rounded-2xl overflow-hidden border bg-white shadow-xs hover:shadow-md transition-all ${
                  activeSpaceIdx === idx
                    ? 'border-[#D4A64A] ring-2 ring-[#D4A64A]/40'
                    : 'border-[#E7DED0]'
                }`}
              >
                <div className="tour-gallery-image aspect-[16/10] overflow-hidden bg-[#111111] relative">
                  <ImageWithFallback
                    src={sp.image}
                    alt={sp.title}
                    data-reveal={idx % 2 === 0 ? 'left' : 'right'}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    fallbackText={sp.title}
                  />
                  <button
                    type="button"
                    className="tour-enlarge-button"
                    aria-label={`Enlarge ${sp.title} photograph`}
                    onClick={() => {
                      setActiveSpaceIdx(idx);
                      setLightboxClosing(false);
                      setLightboxOpen(true);
                    }}
                  >
                    <Expand size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="p-4 bg-white flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#111111]">
                      {sp.title}
                    </h4>
                    <span className="text-[11px] text-[#8C5A1E] uppercase tracking-wider">
                      {sp.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="tour-view-button"
                    onClick={() => selectSpaceInViewer(idx)}
                    aria-label={`View ${sp.title} in the tour`}
                  >
                    View in tour <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FULLSCREEN LIGHTBOX DIALOG */}
      {lightboxOpen && (
        <div
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
          className={`tour-lightbox-backdrop ${lightboxClosing ? 'is-closing' : ''}`}
        >
          <div
            ref={lightboxRef}
            className={`tour-lightbox ${lightboxClosing ? 'is-closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSpace.title} enlarged photograph`}
            tabIndex={-1}
          >
            <div className="tour-lightbox-toolbar">
              <div>
                <h2>{activeSpace.title}</h2>
                <p>{activeSpace.category} · {currentBranch.name}</p>
              </div>
              <button
                ref={lightboxCloseRef}
                type="button"
                onClick={closeLightbox}
                className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close image preview"
              >
                <X size={22} />
              </button>
            </div>
            
            <div className="tour-lightbox-media relative">
              <button
                type="button"
                className="tour-lightbox-nav tour-lightbox-prev"
                aria-label="Previous photograph"
                onClick={() => setActiveSpaceIdx((current) => (current - 1 + IMAGES.spaces.length) % IMAGES.spaces.length)}
              >
                <ChevronLeft size={22} />
              </button>
              <img
                key={activeSpace.image}
                src={activeSpace.image}
                alt={activeSpace.title}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />
              <button
                type="button"
                className="tour-lightbox-nav tour-lightbox-next"
                aria-label="Next photograph"
                onClick={() => setActiveSpaceIdx((current) => (current + 1) % IMAGES.spaces.length)}
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="p-4 bg-[#111111] border-t border-[#2C2114] flex items-center justify-between text-xs text-[#F7F3EC]/70">
              <span>{activeSpaceIdx + 1} of {IMAGES.spaces.length} photos</span>
              <button
                onClick={() => {
                  closeLightbox();
                  onOpenBooking();
                }}
                className="text-[#FFF0A6] hover:underline font-semibold"
              >
                Book This Suite →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
