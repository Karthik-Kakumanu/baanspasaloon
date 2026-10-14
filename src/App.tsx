import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AppointmentModal } from './components/AppointmentModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Membership } from './pages/Membership';
import { Franchise } from './pages/Franchise';
import { VirtualTour } from './pages/VirtualTour';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MotionPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    page.classList.remove('motion-ready');
    page.classList.remove('motion-observer-ready');
    const targetSelector = '[data-motion-reveal]';
    const targets = Array.from(page.querySelectorAll<HTMLElement>(targetSelector));
    const parallaxImages = Array.from(page.querySelectorAll<HTMLImageElement>('img.scroll-parallax'));
    targets.forEach((target) => {
      target.classList.add('motion-target');
      target.classList.remove('motion-visible');
      const staggerParent = target.parentElement?.closest<HTMLElement>('[data-motion-stagger]');
      const explicitDelay = Number(target.dataset.motionDelay);
      const siblingIndex = staggerParent
        ? Array.from(staggerParent.children).filter((child) => child.hasAttribute('data-motion-reveal')).indexOf(target)
        : -1;
      const delay = Number.isFinite(explicitDelay) && target.dataset.motionDelay !== undefined
        ? explicitDelay
        : siblingIndex >= 0 ? Math.min(siblingIndex * 65, 195) : 0;
      target.style.setProperty('--motion-delay', `${delay}ms`);
    });

    page.classList.add('motion-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('motion-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('motion-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      page.classList.add('motion-observer-ready');
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -6% 0px' });

    const observedTargets = new Set(targets);
    targets.forEach((target) => observer.observe(target));
    let revealFrame = 0;
    const revealVisibleTargets = () => {
      revealFrame = 0;
      let revealedAny = false;
      observedTargets.forEach((target) => {
        if (target.classList.contains('motion-visible')) return;
        const rect = target.getBoundingClientRect();
        if (rect.height > 0 && rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          target.classList.add('motion-visible');
          observer.unobserve(target);
          revealedAny = true;
        }
      });
      if (revealedAny) page.classList.add('motion-observer-ready');
    };
    const scheduleVisibleCheck = () => {
      if (!revealFrame) revealFrame = window.requestAnimationFrame(revealVisibleTargets);
    };
    window.addEventListener('scroll', scheduleVisibleCheck, { passive: true });
    scheduleVisibleCheck();
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const addedTargets = [
            ...(node.matches(targetSelector) ? [node] : []),
            ...Array.from(node.querySelectorAll<HTMLElement>(targetSelector)),
          ].filter((target) => (
            target.hasAttribute('data-motion-reveal') || !target.parentElement?.closest('[data-motion-reveal]')
          ));
          addedTargets.forEach((target) => {
            target.classList.add('motion-target');
            observedTargets.add(target);
            const staggerParent = target.parentElement?.closest<HTMLElement>('[data-motion-stagger]');
            const siblingIndex = staggerParent
              ? Array.from(staggerParent.children).filter((child) => child.hasAttribute('data-motion-reveal')).indexOf(target)
              : -1;
            target.style.setProperty('--motion-delay', `${siblingIndex >= 0 ? Math.min(siblingIndex * 65, 195) : 0}ms`);
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              target.classList.add('motion-visible');
            } else {
              observer.observe(target);
            }
          });
        });
      });
      scheduleVisibleCheck();
    });
    mutationObserver.observe(page, { childList: true, subtree: true });
    let parallaxFrame = 0;
    const updateParallax = () => {
      if (parallaxFrame) return;
      parallaxFrame = window.requestAnimationFrame(() => {
        parallaxFrame = 0;
        const viewportCenter = window.innerHeight / 2;
        parallaxImages.forEach((image) => {
          const rect = image.getBoundingClientRect();
          const shift = Math.max(-14, Math.min(14, (viewportCenter - (rect.top + rect.height / 2)) * 0.018));
          image.style.setProperty('--scroll-shift', `${shift.toFixed(2)}px`);
        });
      });
    };
    const canParallax = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (parallaxImages.length && canParallax) {
      window.addEventListener('scroll', updateParallax, { passive: true });
      updateParallax();
    }
    return () => {
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      window.removeEventListener('scroll', scheduleVisibleCheck);
      window.removeEventListener('scroll', updateParallax);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return <div ref={pageRef} className="route-motion">{children}</div>;
};

// Main App Wrapper
export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [isAdminAuth, setIsAdminAuth] = useState(
    () => localStorage.getItem('baan_admin_auth') === 'true'
  );

  const openBooking = (serviceSlug?: string) => {
    if (serviceSlug) {
      setPreselectedService(serviceSlug);
    } else {
      setPreselectedService('');
    }
    setBookingModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes
        bookingModalOpen={bookingModalOpen}
        setBookingModalOpen={setBookingModalOpen}
        preselectedService={preselectedService}
        openBooking={openBooking}
        isAdminAuth={isAdminAuth}
        setIsAdminAuth={setIsAdminAuth}
      />
    </BrowserRouter>
  );
};

interface AppRoutesProps {
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  preselectedService: string;
  openBooking: (slug?: string) => void;
  isAdminAuth: boolean;
  setIsAdminAuth: (auth: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  bookingModalOpen,
  setBookingModalOpen,
  preselectedService,
  openBooking,
  isAdminAuth,
  setIsAdminAuth,
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000]">
      {/* Customer Header */}
      {!isAdminRoute && <Header onOpenBooking={() => openBooking()} />}

      {/* Main Page Routes */}
      <main className="flex-1">
        <MotionPage>
        <Routes>
          {/* Public Website Routes (both canonical and trailing slash versions supported) */}
          <Route path="/" element={<Home onOpenBooking={openBooking} />} />
          
          <Route path="/about" element={<About onOpenBooking={() => openBooking()} />} />
          <Route path="/about/" element={<About onOpenBooking={() => openBooking()} />} />
          
          <Route path="/service" element={<Services onOpenBooking={openBooking} />} />
          <Route path="/service/" element={<Services onOpenBooking={openBooking} />} />
          <Route path="/services" element={<Services onOpenBooking={openBooking} />} />
          <Route path="/services/" element={<Services onOpenBooking={openBooking} />} />
          
          <Route path="/service/:slug" element={<ServiceDetail onOpenBooking={openBooking} />} />
          <Route path="/services/:slug" element={<ServiceDetail onOpenBooking={openBooking} />} />
          
          <Route path="/membership" element={<Membership onOpenBooking={() => openBooking()} />} />
          <Route path="/membership/" element={<Membership onOpenBooking={() => openBooking()} />} />
          
          <Route path="/franchise" element={<Franchise onOpenBooking={() => openBooking()} />} />
          <Route path="/franchise/" element={<Franchise onOpenBooking={() => openBooking()} />} />
          
          <Route path="/virtual-tour" element={<VirtualTour onOpenBooking={() => openBooking()} />} />
          <Route path="/virtual-tour/" element={<VirtualTour onOpenBooking={() => openBooking()} />} />
          
          <Route path="/contact-us" element={<Contact onOpenBooking={() => openBooking()} />} />
          <Route path="/contact-us/" element={<Contact onOpenBooking={() => openBooking()} />} />
          <Route path="/contact" element={<Contact onOpenBooking={() => openBooking()} />} />
          <Route path="/contact/" element={<Contact onOpenBooking={() => openBooking()} />} />

          {/* Book Shortcut Route */}
          <Route
            path="/book"
            element={
              <div className="py-20 text-center">
                <button
                  onClick={() => openBooking()}
                  className="btn-bali text-lg py-4 px-10"
                >
                  Click to Open Booking Modal
                </button>
              </div>
            }
          />

          {/* Admin Demonstration Routes */}
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => setIsAdminAuth(true)} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              isAdminAuth ? (
                <AdminDashboard onLogout={() => setIsAdminAuth(false)} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/appointments"
            element={
              isAdminAuth ? (
                <AdminDashboard onLogout={() => setIsAdminAuth(false)} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/services"
            element={
              isAdminAuth ? (
                <AdminDashboard onLogout={() => setIsAdminAuth(false)} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="/admin/settings"
            element={
              isAdminAuth ? (
                <AdminDashboard onLogout={() => setIsAdminAuth(false)} />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </MotionPage>
      </main>

      {/* Customer Footer & Floating Helpers */}
      {!isAdminRoute && (
        <>
          <Footer onOpenBooking={() => openBooking()} />
          <FloatingWhatsApp />
        </>
      )}

      {/* Global Interactive Booking Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
};

export default App;
