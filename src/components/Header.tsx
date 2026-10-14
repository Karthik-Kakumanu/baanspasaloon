import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_SETTINGS } from '../config/business';

interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const location = useLocation();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isOpen = openMenuPath === location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenuPath(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.toggle('menu-open', isOpen);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const leftNav = [
    { label: 'About', path: '/about' },
    { label: 'Service', path: '/service' },
    { label: 'Membership', path: '/membership' },
  ];

  const rightNav = [
    { label: 'Franchise', path: '/franchise' },
    { label: 'Virtual Tour', path: '/virtual-tour' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const allNav = [...leftNav, ...rightNav];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement site-announcement min-h-[34px] bg-[#0A0A0A] text-[#F7F3EC] text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-2 leading-tight">
        <Sparkles size={13} className="text-[#D4A95B]" />
        <span>{BUSINESS_SETTINGS.announcement}</span>
        <span className="hidden sm:inline opacity-40">·</span>
        <button
          onClick={onOpenBooking}
          className="underline hover:text-[#D4A95B] transition-colors ml-1 font-medium inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 text-inherit p-0"
        >
          Request an Appointment <ArrowRight size={11} />
        </button>
      </div>

      {/* Main Reference Header */}
      <header
        className={`site-header ${isScrolled ? 'is-scrolled' : ''} sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-md shadow-sm py-2'
          : 'bg-[#000000] py-3 lg:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`nav-shell flex items-center justify-between min-h-[78px] lg:min-h-[92px] ${isScrolled ? 'nav-shell-scrolled' : ''}`}>
            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-end pr-8">
              {leftNav.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/service' && location.pathname.startsWith('/service'));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item text-[15px] font-medium tracking-wide transition-all duration-300 relative py-1 group ${
                      isActive
                        ? 'active text-[#FFF0A6] font-semibold'
                        : 'text-[#F7F3EC] hover:text-[#D4A64A]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] rounded-full transition-all duration-300 origin-left ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Center Brand Logo */}
            <div className="brand-slot flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="nav-logo inline-block group focus:outline-none" aria-label="BAAN Home">
                <img
                  src={BUSINESS_SETTINGS.logo}
                  alt="BAAN Salon, Beauty & Spa"
                  className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(191,160,120,0.18)]"
                  onError={(e) => {
                    // Fallback to text if image fails to render
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.logo-fallback')) {
                      const fb = document.createElement('div');
                      fb.className = 'logo-fallback font-serif text-2xl font-bold tracking-widest text-[#D4A64A] text-center';
                      fb.innerHTML = 'BAAN<br/><span class="text-[10px] tracking-normal font-sans font-normal uppercase">Salon · Beauty · Spa</span>';
                      parent.appendChild(fb);
                    }
                  }}
                />
              </Link>
            </div>

            {/* Desktop Right Nav */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 flex-1 pl-6">
              {rightNav.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item text-[15px] font-medium tracking-wide transition-all duration-300 relative py-1 group ${
                      isActive
                        ? 'active text-[#FFF0A6] font-semibold'
                        : 'text-[#F7F3EC] hover:text-[#D4A64A]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] rounded-full transition-all duration-300 origin-left ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={onOpenBooking}
                className="header-booking-cta group relative ml-2 inline-flex items-center gap-2 overflow-hidden px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span
                  className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[250%]"
                  aria-hidden="true"
                />
                <span className="relative z-10">Book Appointment</span>
                <ArrowRight size={13} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setOpenMenuPath(isOpen ? null : location.pathname)}
                className="menu-button p-2 rounded-lg text-[#F7F3EC] hover:bg-[#111111] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="baan-mobile-navigation"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        <div
          id="baan-mobile-navigation"
          className={`mobile-menu-panel lg:hidden fixed inset-x-0 top-[100%] bg-[#111111] border-t border-[#2C2114] shadow-xl py-6 px-6 max-h-[85vh] overflow-y-auto ${isOpen ? 'is-open' : ''}`}
          inert={!isOpen}
        >
            <nav className="flex flex-col space-y-4">
              {allNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#2C2114] text-[#D4A64A] font-semibold'
                      : 'text-[#F7F3EC] hover:bg-[#2C2114]/50'
                  }`}
                  onClick={() => setOpenMenuPath(null)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#2C2114]/80 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setOpenMenuPath(null);
                    onOpenBooking?.();
                  }}
                  className="btn-bali w-full justify-center bg-[#D4A64A] text-[#000000] hover:bg-[#FFF0A6]"
                >
                  <span>Book Your Escape</span>
                  <span className="text-lg">────→</span>
                </button>
                <div className="text-center text-xs text-[#F7F3EC]/75 pt-2">
                  <p className="font-medium">{BUSINESS_SETTINGS.headerPhone ?? BUSINESS_SETTINGS.phone}</p>
                  <p>{BUSINESS_SETTINGS.hours}</p>
                </div>
              </div>
            </nav>
        </div>
      </header>
    </>
  );
};
