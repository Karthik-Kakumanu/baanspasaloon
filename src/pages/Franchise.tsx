import React, { useState } from 'react';
import { IMAGES } from '../assets/images';
import { RotatingBadge } from '../components/RotatingBadge';
import { BUSINESS_SETTINGS } from '../config/business';
import { Check } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';
import type { FranchiseEnquiry } from '../types';

interface FranchiseProps {
  onOpenBooking: () => void;
}

export const Franchise: React.FC<FranchiseProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !city) return;

    const enquiry: FranchiseEnquiry = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      city,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('baan_franchise_enquiries') || '[]');
      localStorage.setItem('baan_franchise_enquiries', JSON.stringify([enquiry, ...existing]));
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  const supportBenefits = [
    {
      title: 'Site Selection',
      desc: 'Expert demographic feasibility analysis, footfall studies and prime real estate evaluation across high-value urban residential corridors.',
    },
    {
      title: 'Centre Design',
      desc: 'Detailed architectural layouts, acoustic isolation, signature lighting aesthetics, and treatment chamber spatial blueprints.',
    },
    {
      title: 'Superior Training',
      desc: 'Comprehensive academy curriculum for therapists, master hair stylists and front-desk concierge in authentic hospitality rituals.',
    },
    {
      title: 'State-of-Art Software',
      desc: 'Cloud-native ERP system for appointment management, inventory control, automated marketing, and real-time revenue analytics.',
    },
    {
      title: 'Community Outreach',
      desc: 'Multi-channel digital marketing, localized influencer partnerships, and launch campaigns driving early customer acquisition.',
    },
    {
      title: 'Operation Manual',
      desc: 'Step-by-step Standard Operating Procedures covering hygiene, cold-pressed oil sourcing, customer service and fiscal governance.',
    },
  ];

  return (
    <div className="page-franchise w-full">
      {/* 1. Franchise hero */}
      <section className="relative w-full bg-[#000000] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#2C2114] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#FFF0A6]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#FFF0A6] uppercase">
                  EXPANSION & PARTNERSHIPS
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#D4A64A] font-bold uppercase tracking-tight">
                Franchise
              </h1>
              <p className="text-base text-[#F7F3EC]/85 max-w-sm leading-relaxed">
                Partner with BAAN to introduce quiet luxury, certified spa therapies, and couture salon excellence to your city.
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
                  text="WELLNESS FRANCHISE PARTNERSHIP · BAAN NETWORK · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#D4A64A]/40 bg-[#111111]"
              >
                <ImageWithFallback
                  src={IMAGES.franchiseHero}
                  alt="BAAN Franchise Opportunities"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN salon and spa"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRANCHISE ENQUIRY SECTION */}
      <section className="w-full bg-[#111111] py-16 lg:py-24 border-b border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FFF0A6]">
                Turnkey Wellness Model
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#D4A64A] font-bold leading-tight">
                Passionate About Owning a Luxury Spa?
              </h2>
              <GoldDivider width="w-20" className="justify-start my-2" />
              <p className="text-sm sm:text-base text-[#F7F3EC]/85 leading-relaxed">
                BAAN provides end-to-end operational enablement, from turnkey interior blueprints and therapist academy training to supply-chain access and localized branding support.
              </p>
              <div className="pt-4 border-t border-[#2C2114] text-xs text-[#F7F3EC]/70 space-y-2">
                <p>✓ Proven 4-location track record in premium metropolitan areas</p>
                <p>✓ Dedicated recruitment and continuing education academies</p>
                <p>✓ Turnkey architectural design and acoustic chamber layout</p>
              </div>
            </div>

            {/* Right Form Card with 3D Tilt */}
            <div className="lg:col-span-7">
              <TiltCard
                maxTilt={5}
                scale={1.01}
                glare={true}
                className="bg-[#0A0A0A] rounded-[32px] p-8 sm:p-12 border border-[#2C2114] shadow-xl"
              >
                <h3 className="font-serif text-2xl font-bold text-[#D4A64A] mb-6">
                  Franchise Inquiry Form
                </h3>

                {submitted ? (
                  <div className="text-center py-10 space-y-3">
                    <span className="w-12 h-12 rounded-full bg-[#D4A64A]/15 text-[#FFF0A6] inline-flex items-center justify-center">
                      <Check size={24} />
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-[#D4A64A]">
                      Inquiry Saved
                    </h4>
                    <p className="text-sm text-[#F7F3EC]/75 max-w-sm mx-auto">
                      Thank you {name}. Your franchise demonstration inquiry has been recorded in the local store.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setCity('');
                      }}
                      className="btn-bali text-xs mt-4"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F7F3EC]/70 mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vikramaditya Reddy"
                        className="input-bali"
                      >
                      </input>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#F7F3EC]/70 mb-1.5 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="vikram@example.com"
                          className="input-bali"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#F7F3EC]/70 mb-1.5 font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="input-bali"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F7F3EC]/70 mb-1.5 font-medium">
                        Proposed City / Region *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Hyderabad, Bengaluru, Chennai..."
                        className="input-bali"
                      />
                    </div>

                    <div className="pt-3">
                      <GoldButton
                        type="submit"
                        text="Submit Franchise Application"
                        size="md"
                        className="w-full"
                      />
                    </div>
                  </form>
                )}
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORT BENEFITS (6 Interactive 3D Cards) */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#D4A64A]">
              Comprehensive Partner Support
            </h2>
            <GoldDivider />
            <p className="text-xs text-[#F7F3EC]/70 max-w-md mx-auto mt-2">
              From site selection to academy certifications, we stand shoulder to shoulder with franchise operators.
            </p>
          </div>

          <div data-motion-stagger className="compact-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {supportBenefits.map((b, i) => (
              <TiltCard
                key={i}
                maxTilt={6}
                scale={1.02}
                glare={true}
                className="bg-[#0A0A0A] rounded-2xl p-8 border border-[#2C2114] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#FFF0A6] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F3EC]/80 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALLOUT BAR */}
      <section className="w-full bg-[#111111] py-10 border-t border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A64A] flex-1 min-w-0 break-words text-center sm:text-left">
            Have Questions About Franchise Opportunities?
          </h3>
          <a
            href={`tel:${BUSINESS_SETTINGS.phone.replace(/\s+/g, '')}`}
            className="flex-shrink-0"
          >
            <GoldButton text="Call Business Development" size="md" />
          </a>
        </div>
      </section>
    </div>
  );
};
