import React, { useState } from 'react';
import { IMAGES } from '../assets/images';
import { LOCATION_BRANCHES, SERVICES, BUSINESS_SETTINGS } from '../config/business';
import { RotatingBadge } from '../components/RotatingBadge';
import { MapPin, Mail, Phone, Clock, Check, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';

interface ContactProps {
  onOpenBooking: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [location, setLocation] = useState(LOCATION_BRANCHES[0].name);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('baan_contact_messages') || '[]');
      const item = {
        id: crypto.randomUUID(),
        name,
        phone,
        email,
        service,
        location,
        message,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('baan_contact_messages', JSON.stringify([item, ...existing]));
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="page-contact w-full">
      {/* 1. Contact hero */}
      <section className="relative w-full bg-[#050505] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#352B20] overflow-hidden">
        <Hero3DCanvas className="opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#D6B45C]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D6B45C] uppercase">
                  CONCIERGE & APPOINTMENTS
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#BFA078] font-bold uppercase tracking-tight">
                Contact Us
              </h1>
              <p className="text-base text-[#F6F0E7]/85 max-w-sm leading-relaxed">
                Connect with our concierge to book bespoke appointments, corporate retreats or ask questions about our rituals.
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
                  text="CONCIERGE & RESERVATIONS · BAAN SALON & SPA · "
                  size={200}
                />
              </div>

              <TiltCard
                maxTilt={6}
                scale={1.015}
                className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-[#BFA078]/40 bg-[#181614]"
              >
                <ImageWithFallback
                  src={IMAGES.contactHero}
                  alt="BAAN Concierge Desk"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText="BAAN concierge"
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR LOCATIONS SECTION (With Interactive 3D Tilt on each Branch card) */}
      <section className="relative w-full bg-[#181614] py-16 lg:py-24 overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <img
            src={BUSINESS_SETTINGS.logo}
            alt=""
            className="w-[600px] h-auto object-contain"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#BFA078] font-bold tracking-tight">
              Our Locations
            </h2>
            <GoldDivider />
          </div>

          <div data-motion-stagger className="compact-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATION_BRANCHES.map((b) => (
              <TiltCard
                key={b.id}
                maxTilt={7}
                scale={1.02}
                glare={true}
                className="bg-[#0C0B0A] rounded-3xl p-6 sm:p-7 text-[#F6F0E7] flex flex-col justify-between shadow-xl relative border border-[#352B20] hover:border-[#D6B45C]/50 transition-colors"
              >
                {/* Branch Header Tab */}
                <div className="bg-[#181614] rounded-full py-1.5 px-4 text-center shadow-xs mb-6 border border-[#BFA078]/25">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#D6B45C]">
                    {b.name.replace(' Studio', '').replace(' Retreat', '').replace(' Flagship', '').replace(' Financial District', '')}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-4 text-xs sm:text-[13px] text-[#F6F0E7]/85 leading-relaxed flex-1">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#BFA078] mt-0.5 flex-shrink-0" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-[#BFA078] flex-shrink-0" />
                    <a href={`mailto:${b.email}`} className="hover:text-[#D6B45C] transition-colors">
                      {b.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 font-medium">
                    <Phone size={16} className="text-[#BFA078] flex-shrink-0" />
                    <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="hover:text-[#D6B45C] transition-colors">
                      {b.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px] text-[#F6F0E7]/65 pt-1 border-t border-[#BFA078]/20">
                    <Clock size={14} className="text-[#BFA078] flex-shrink-0" />
                    <span>{b.hours}</span>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#BFA078] to-[#D6B45C] hover:opacity-90 text-[#050505] text-xs font-bold tracking-wide transition-opacity cursor-pointer shadow-sm"
                  >
                    Reserve Here →
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Rotating "Get in touch" badge with down arrow */}
          <div className="flex justify-center mt-16 mb-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <RotatingBadge
                text="GET IN TOUCH · GET IN TOUCH · GET IN TOUCH · "
                size={160}
                className="opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center text-[#D6B45C]">
                <ArrowDown size={28} strokeWidth={1.5} className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GET IN TOUCH WITH US SPLIT SECTION */}
      <section className="w-full bg-[#0C0B0A] py-16 lg:py-24 border-t border-[#352B20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Photo with 3D Tilt */}
            <div className="lg:col-span-6">
              <TiltCard
                maxTilt={5}
                scale={1.01}
                className="rounded-[32px] overflow-hidden shadow-2xl aspect-[4/5] bg-[#111] border border-[#BFA078]/35"
              >
                <ImageWithFallback
                  src={IMAGES.contactOilPour}
                  alt="Aromatherapy Essential Oil Pouring"
                  data-reveal="left"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  fallbackText="Aromatherapy oils"
                />
              </TiltCard>
            </div>

            {/* Right Form Card */}
            <div data-motion-reveal className="lg:col-span-6 bg-[#181614] rounded-[32px] p-8 sm:p-12 border border-[#352B20] shadow-sm">
              <div className="mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#BFA078] font-bold">
                  Get in touch with us
                </h2>
                <p className="text-xs sm:text-sm text-[#F6F0E7]/70 mt-2">
                  Leave a note and our front-desk concierge will connect with you.
                </p>
              </div>

              {submitted ? (
                <div data-motion-reveal className="text-center py-10 space-y-3">
                  <span className="w-12 h-12 rounded-full bg-[#BFA078]/15 text-[#D6B45C] inline-flex items-center justify-center">
                    <Check size={24} />
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#BFA078]">
                    Message Saved Locally
                  </h3>
                  <p className="text-sm text-[#F6F0E7]/75 max-w-sm mx-auto">
                    Thank you {name}. Your inquiry has been recorded in the local store.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="btn-bali text-xs mt-4"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Rao"
                      className="input-bali"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="input-bali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className="input-bali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                        Preferred Branch
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-bali"
                      >
                        {LOCATION_BRANCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                        Ritual of Interest
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="input-bali"
                      >
                        <option value="">General Wellness Inquiry</option>
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F6F0E7]/70 mb-1.5 font-medium">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let us know about desired timing, couple suites or preferred pressure..."
                      className="input-bali resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <GoldButton
                      type="submit"
                      text="Send Inquiry"
                      size="md"
                      className="w-full"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
