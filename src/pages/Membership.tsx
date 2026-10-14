import React, { useState } from 'react';
import { MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS, BUSINESS_SETTINGS } from '../config/business';
import { IMAGES } from '../assets/images';
import { RotatingBadge } from '../components/RotatingBadge';
import { MembershipModal } from '../components/MembershipModal';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';
import type { MembershipTier } from '../types';

interface MembershipProps {
  onOpenBooking: () => void;
}

export const Membership: React.FC<MembershipProps> = ({ onOpenBooking }) => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectTier = (tier: MembershipTier) => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <div className="page-membership w-full">
      {/* 1. Membership hero */}
      <section className="relative w-full bg-[#000000] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#2C2114] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#FFF0A6]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#FFF0A6] uppercase">
                  EXCLUSIVE WELLNESS PRIVILEGES
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#D4A64A] font-bold uppercase tracking-tight">
                Membership
              </h1>
              <p className="text-base text-[#F7F3EC]/85 max-w-sm leading-relaxed">
                Unlock preferred hourly wellness rates, exclusive bonus therapies, and priority bookings across all Hyderabad sanctuaries.
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
                  text="EXCLUSIVE WELLNESS CIRCLE · BAAN SPA & SALON · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#D4A64A]/40 bg-[#111111]"
              >
                <ImageWithFallback
                  src={IMAGES.membershipHero}
                  alt="BAAN Membership Privileges"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN membership"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MEMBERSHIP CARDS (2 Columns with Interactive 3D Tilt) */}
      <section className="w-full bg-[#111111] py-16 lg:py-24 border-b border-[#2C2114]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FFF0A6]">
              Curated Wellness Programs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#D4A64A] font-bold mt-1 tracking-tight">
              Select Your Membership Tier
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="membership-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {MEMBERSHIP_TIERS.map((tier) => (
              <TiltCard
                key={tier.id}
                maxTilt={7}
                scale={1.02}
                glare={true}
                className="bg-[#0A0A0A] rounded-[36px] p-4 sm:p-5 shadow-xl flex flex-col justify-between border border-[#2C2114] hover:border-[#FFF0A6]/50 transition-colors"
              >
                {/* Inner Gold Accent Container */}
                <div className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] rounded-[28px] p-6 sm:p-8 text-[#F7F3EC] flex flex-col justify-between flex-1 relative overflow-hidden border border-[#D4A64A]/20">
                  
                  {/* Top Pill Badge */}
                  <div className="text-center mb-4">
                    <span className="inline-block px-5 py-1 rounded-full bg-[#2C2114] text-[#FFF0A6] text-xs font-bold tracking-wider uppercase border border-[#FFF0A6]/40">
                      {tier.bbh}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="text-center space-y-2 mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A64A]">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#F7F3EC]/80 max-w-sm mx-auto leading-relaxed">
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* 3 Stats Columns */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#D4A64A]/25 text-center mb-6">
                    <div>
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#FFF0A6]">
                        {tier.bbhCount}
                      </p>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-[#F7F3EC]/70">
                        BBH Hours
                      </p>
                    </div>
                    <div className="border-x border-[#D4A64A]/25">
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#FFF0A6]">
                        {tier.perSessionCost}
                      </p>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-[#F7F3EC]/70">
                        Per Session
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-xl sm:text-2xl font-bold text-[#FFF0A6]">
                        {tier.validityMonths}
                      </p>
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-[#F7F3EC]/70">
                        Months Valid
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D4A64A] tracking-tight">
                      {tier.price}
                    </span>
                  </div>

                  {/* Discounts & Perks */}
                  <div className="mb-6 bg-[#000000]/70 rounded-xl p-3 text-xs text-[#F7F3EC]/85 space-y-1 border border-[#D4A64A]/15">
                    <p className="font-semibold text-[11px] uppercase tracking-wider text-[#FFF0A6]">
                      Discount Offered:
                    </p>
                    {tier.discounts.map((d, i) => (
                      <p key={i} className="flex items-start gap-1">
                        <span className="text-[#FFF0A6]">•</span>
                        <span>{d}</span>
                      </p>
                    ))}
                  </div>

                  {/* Select / Enquiry Button */}
                  <div className="text-center pt-2">
                    <GoldButton
                      text="Inquire Now"
                      onClick={() => handleSelectTier(tier)}
                      size="sm"
                      className="w-full"
                    />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-[#F7F3EC]/60">
            ℹ️ BBH denotes BAAN Beauty &amp; Spa Hours · Packages are demonstration models with sample values.
          </div>
        </div>
      </section>

      {/* 3. CALLOUT BAR */}
      <section className="w-full bg-[#000000] py-10 border-b border-[#2C2114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A64A] flex-1 min-w-0 break-words text-center sm:text-left">
            Experience BAAN Monthly — Join Our Membership!
          </h3>
          <a
            href={`tel:${BUSINESS_SETTINGS.phone.replace(/\s+/g, '')}`}
            className="flex-shrink-0"
          >
            <GoldButton text="Call Concierge" size="md" />
          </a>
        </div>
      </section>

      {/* 4. MEMBERSHIP BENEFITS SECTION */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#111111]">
        {/* Background Ocean Waves */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={IMAGES.oceanWaveBanner}
            alt="Ocean Background"
            className="w-full h-full object-cover"
            loading="lazy"
            fallbackText="A calm coastal atmosphere"
          />
          <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#D4A64A]">
              Membership Benefits
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {MEMBERSHIP_BENEFITS.map((benefit, i) => (
              <TiltCard
                key={i}
                maxTilt={8}
                scale={1.03}
                glare={true}
                className="bg-[#0A0A0A]/95 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-[#2C2114] flex flex-col justify-center min-h-[140px]"
              >
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#D4A64A]">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#F7F3EC]/80 mt-1 leading-snug">
                  {benefit.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 Clean Numbered Steps) */}
      <section className="w-full bg-[#F7F3EC] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] font-bold tracking-tight">
              How it Works
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <TiltCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className="border border-[#E7DED0] rounded-2xl p-8 relative pt-10 min-h-[260px] flex flex-col justify-between bg-white shadow-xs"
            >
              <span className="absolute -top-6 left-6 font-serif text-5xl font-bold text-[#FFF0A6] bg-[#111111] rounded-lg px-3 py-1 shadow-md">
                01
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#000000] mb-3">
                  Choose Your Membership
                </h3>
                <p className="text-xs sm:text-sm text-[#5f574e] leading-relaxed">
                  Select the package that aligns with your self-care schedule, from 7 BBH refreshers to 70 BBH comprehensive annual wellness plans.
                </p>
              </div>
            </TiltCard>

            {/* Step 2 */}
            <TiltCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className="border border-[#E7DED0] rounded-2xl p-8 relative pt-10 min-h-[260px] flex flex-col justify-between bg-white shadow-xs"
            >
              <span className="absolute -top-6 left-6 font-serif text-5xl font-bold text-[#FFF0A6] bg-[#111111] rounded-lg px-3 py-1 shadow-md">
                02
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#000000] mb-3">
                  Sign Up Easily
                </h3>
                <p className="text-xs sm:text-sm text-[#5f574e] leading-relaxed">
                  Enroll online or visit our BAAN desks in Miyapur, Nallagandla, Jubilee Hills or Gachibowli. Our team coordinates onboarding seamlessly.
                </p>
              </div>
            </TiltCard>

            {/* Step 3 */}
            <TiltCard
              maxTilt={6}
              scale={1.02}
              glare={true}
              className="border border-[#E7DED0] rounded-2xl p-8 relative pt-10 min-h-[260px] flex flex-col justify-between bg-white shadow-xs"
            >
              <span className="absolute -top-6 left-6 font-serif text-5xl font-bold text-[#FFF0A6] bg-[#111111] rounded-lg px-3 py-1 shadow-md">
                03
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#000000] mb-3">
                  Start Enjoying Benefits
                </h3>
                <p className="text-xs sm:text-sm text-[#5f574e] leading-relaxed">
                  Redeem sessions for hair styling, skin facials, steam baths and deep bodywork whenever your routine calls for calm.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Membership Enquiry Modal */}
      <MembershipModal
        tier={selectedTier}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
