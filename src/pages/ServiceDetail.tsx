import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../config/business';
import { Clock, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { RotatingBadge } from '../components/RotatingBadge';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { GoldButton } from '../components/GoldButton';
import { GoldDivider } from '../components/GoldDivider';

interface ServiceDetailProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#D4A64A]">
          Ritual Not Found
        </h2>
        <p className="text-sm text-[#F7F3EC]/70 mt-2">
          The requested service could not be located in our treatment directory.
        </p>
        <Link to="/service" className="mt-6 inline-block">
          <GoldButton text="Browse All Services" size="sm" />
        </Link>
      </div>
    );
  }

  const related = SERVICES.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);

  return (
    <div className="page-service-detail w-full">
      {/* Detail Hero Banner */}
      <section className="relative bg-[#000000] py-12 lg:py-16 border-b border-[#2C2114] overflow-hidden">
        <Hero3DCanvas className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-[#F7F3EC]/60 mb-4">
            <Link to="/service" className="hover:text-[#FFF0A6] flex items-center gap-1 transition-colors">
              <ArrowLeft size={13} />
              All Services
            </Link>
            <span>/</span>
            <span className="text-[#FFF0A6]">{service.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#111111] text-[#FFF0A6] text-xs font-semibold uppercase tracking-wider border border-[#D4A64A]/30">
                {service.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#D4A64A] font-bold">
                {service.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-[#F7F3EC] font-medium pt-1">
                <span className="flex items-center gap-1.5 text-[#F7F3EC]/80">
                  <Clock size={16} className="text-[#FFF0A6]" />
                  {service.duration}
                </span>
                <span className="font-serif text-2xl font-bold text-[#FFF0A6]">
                  {service.price}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <GoldButton
                text="Book This Service"
                onClick={() => onOpenBooking(service.slug)}
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-[#0A0A0A] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Image & Rotating Badge with 3D Tilt */}
            <div className="lg:col-span-6 relative">
              <TiltCard
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3] bg-[#111111] border border-[#D4A64A]/40"
              >
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fallbackText={service.title}
                />
              </TiltCard>

              <div className="absolute -bottom-8 -right-6 pointer-events-none opacity-80 hidden sm:block z-20">
                <RotatingBadge
                  text="AUTHENTIC CARE · BAAN SALON & SPA · "
                  size={170}
                />
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#D4A64A] mb-3">
                  About This Experience
                </h2>
                <p className="text-base text-[#F7F3EC]/85 leading-relaxed">
                  {service.description}
                </p>
                <p className="text-sm text-[#F7F3EC]/70 mt-3 leading-relaxed">
                  Every appointment at BAAN is delivered with quiet unhurried grace. Our master therapists utilize cold-pressed botanical oils, sterile linens, and traditional techniques honoring Balinese tranquility and modern wellness standards.
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-[#111111] rounded-3xl p-6 sm:p-8 border border-[#2C2114]">
                <h3 className="font-serif text-xl font-bold text-[#D4A64A] mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#FFF0A6]" />
                  What Is Included
                </h3>
                <ul className="space-y-3">
                  {service.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#F7F3EC]/90">
                      <span className="w-5 h-5 rounded-full bg-[#2C2114] text-[#FFF0A6] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold border border-[#FFF0A6]/40">
                        ✓
                      </span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <GoldButton
                  text="Reserve Your Session"
                  onClick={() => onOpenBooking(service.slug)}
                  size="md"
                  className="flex-1"
                />
                <Link to="/service" className="flex-1">
                  <GoldButton
                    text="Back to Menu"
                    variant="outline"
                    size="md"
                    className="w-full"
                    showArrow={false}
                  />
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#F7F3EC]/60 pt-2 border-t border-[#2C2114]">
                <ShieldCheck size={16} className="text-[#FFF0A6]" />
                <span>100% Certified Organic Botanicals · Complimentary Refreshments · Private Steam Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments (With 3D Tilt) */}
      {related.length > 0 && (
        <section className="bg-[#111111] py-16 border-t border-[#2C2114]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl font-bold text-[#D4A64A] mb-8 text-center">
              Complementary Rituals
            </h3>
            <GoldDivider />
            <div className="related-service-grid grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <TiltCard
                  key={rel.slug}
                  maxTilt={6}
                  scale={1.02}
                  glare={true}
                  className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#2C2114] group"
                >
                  <Link to={`/service/${rel.slug}`} className="aspect-[16/10] block overflow-hidden">
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      fallbackText={rel.title}
                    />
                  </Link>
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#D4A64A] group-hover:text-[#FFF0A6] transition-colors">
                        <Link to={`/service/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="text-xs text-[#F7F3EC]/70 mt-1 line-clamp-2">
                        {rel.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#2C2114] flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#FFF0A6]">{rel.price}</span>
                      <button
                        onClick={() => onOpenBooking(rel.slug)}
                        className="text-[#D4A64A] hover:text-[#FFF0A6] font-semibold cursor-pointer"
                      >
                        Book →
                      </button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
