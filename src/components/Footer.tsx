import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import { BUSINESS_SETTINGS, SERVICES, LOCATION_BRANCHES } from '../config/business';
import type { Appointment } from '../types';

interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  void onOpenBooking;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const selectedServiceObj = SERVICES.find((s) => s.slug === service);
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      service: service || SERVICES[0].slug,
      serviceName: selectedServiceObj?.title || 'General Consultation',
      location: location || LOCATION_BRANCHES[0].name,
      date: date || today,
      time: time || '12:00 PM',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('baan_appointments') || '[]');
      localStorage.setItem('baan_appointments', JSON.stringify([newAppointment, ...existing]));
    } catch {
      // fallback
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
    }, 5000);
  };

  return (
    <footer id="bykFooter" className="w-full bg-[#000000] text-[#F7F3EC]">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src={BUSINESS_SETTINGS.logo}
                alt={BUSINESS_SETTINGS.brandFullName}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-xs uppercase tracking-widest text-[#D4A64A] font-semibold">
              A unit of BAAN Wellness & Aesthetics
            </p>
            <p className="text-sm text-[#F7F3EC]/80 leading-relaxed max-w-sm">
              Step into a calm BAAN setting for considered beauty, couture hair and restorative spa treatments. Designed around quiet luxury and thoughtful personal care.
            </p>
            
            <div className="space-y-2 text-xs text-[#F7F3EC]/75 pt-2">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4A64A]" />
                <span>{BUSINESS_SETTINGS.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4A64A]" />
                <span>{BUSINESS_SETTINGS.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A64A] mt-0.5 flex-shrink-0" />
                <span>{BUSINESS_SETTINGS.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#111111] hover:bg-[#D4A64A] hover:text-[#000000] text-[#F7F3EC] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-[#111111] hover:bg-[#D4A64A] hover:text-[#000000] text-[#F7F3EC] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Facebook"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-[#111111] hover:bg-[#D4A64A] hover:text-[#000000] text-[#F7F3EC] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Youtube"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#D4A64A] tracking-wide">
              Quick Links
            </h4>
            <div className="h-0.5 w-10 bg-[#D4A64A]/40 mb-4" />
            <ul className="space-y-2.5 text-sm font-normal">
              <li>
                <Link to="/about" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  About BAAN
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  Treatment Services
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  BAAN Memberships
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  Franchise Partnerships
                </Link>
              </li>
              <li>
                <Link to="/virtual-tour" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  Virtual Premises Tour
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#FFF0A6] hover:underline transition-colors">
                  Contact & Locations
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-xs text-[#F7F3EC]/55 hover:text-[#FFF0A6] transition-colors">
                  Admin Demo Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Book Your Appointment Form (Embedded in Footer matching reference) */}
          <div className="lg:col-span-5 bg-[#111111] rounded-3xl p-6 sm:p-7 border border-[#2C2114] shadow-md">
            <h4 className="font-serif text-xl font-bold text-[#D4A64A] tracking-wide mb-1">
              Book Your Appointment
            </h4>
            <p className="text-xs text-[#F7F3EC]/70 mb-4">
              Schedule your calm session today.
            </p>

            {submitted ? (
              <div className="py-8 text-center text-[#F7F3EC] space-y-2">
                <span className="w-10 h-10 rounded-full bg-[#D4A64A] text-[#000000] inline-flex items-center justify-center mb-1">
                  <Check size={20} />
                </span>
                <p className="font-medium text-sm">Demo Request Received!</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Your appointment has been saved locally.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Phone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  >
                    <option value="">Select Service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  >
                    <option value="">Select Location</option>
                    {LOCATION_BRANCHES.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2C2114] rounded-lg px-3 py-2 text-xs text-[#F7F3EC] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] hover:opacity-95 text-[#000000] text-xs font-bold uppercase tracking-wider transition-opacity cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Book Appointment</span>
                  <span>────→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Deep Forest Green Bottom Bar */}
      <div className="bg-[#000000] text-[#F7F3EC]/70 text-xs py-5 px-4 sm:px-6 lg:px-8 border-t border-[#2C2114]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>
            A unit of BAAN Wellness &amp; Aesthetics | &copy; {new Date().getFullYear()} BAAN | All Rights Reserved
          </p>
          <div className="flex items-center gap-6 text-[#D4A64A]">
            <Link to="/contact-us" className="hover:underline">
              Terms and Conditions
            </Link>
            <Link to="/contact-us" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact-us" className="hover:underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
