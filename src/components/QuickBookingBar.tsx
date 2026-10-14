import React, { useState } from 'react';
import { SERVICES, LOCATION_BRANCHES } from '../config/business';
import type { Appointment } from '../types';
import { Check } from 'lucide-react';

interface QuickBookingBarProps {
  onSuccess?: (appointment: Appointment) => void;
  onOpenBooking?: () => void;
  className?: string;
  defaultService?: string;
}

export const QuickBookingBar: React.FC<QuickBookingBarProps> = ({
  onSuccess,
  onOpenBooking,
  className = '',
  defaultService = '',
}) => {
  void onOpenBooking;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setError('Please provide your name, phone number, and preferred date.');
      return;
    }
    if (date < today) {
      setError('Please select a future date for your appointment.');
      return;
    }

    const selectedServiceObj = SERVICES.find((s) => s.slug === service);
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name,
      phone,
      service: service || SERVICES[0].slug,
      serviceName: selectedServiceObj?.title || 'General Consultation',
      location: location || LOCATION_BRANCHES[0].name,
      date,
      time: 'Preferred Slot',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing: Appointment[] = JSON.parse(
        localStorage.getItem('baan_appointments') || '[]'
      );
      localStorage.setItem(
        'baan_appointments',
        JSON.stringify([newAppointment, ...existing])
      );
    } catch {
      // fallback
    }

    setSubmitted(true);
    setError('');
    onSuccess?.(newAppointment);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setDate('');
    }, 4500);
  };

  return (
    <div className={`quick-booking-bar w-full bg-[#111111] border-y border-[#2C2114] py-4 px-4 sm:px-6 lg:px-8 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto">
        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-[#F7F3EC] py-2 animate-fadeIn">
            <span className="w-7 h-7 rounded-full bg-[#D4A64A] text-[#000000] flex items-center justify-center">
              <Check size={16} />
            </span>
            <p className="text-sm md:text-base font-medium">
              Demo Request Saved Locally! We look forward to welcoming you to BAAN. (No live booking slot charged)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-3 xl:gap-4">
            {/* Name */}
            <div className="w-full lg:flex-1">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#D4A64A] text-[#F7F3EC] placeholder-[#B9AD9D] text-sm py-2 px-1 focus:outline-none focus:border-[#D4A64A] transition-colors"
                aria-label="Your Name"
              />
            </div>

            {/* Phone */}
            <div className="w-full lg:flex-1">
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#D4A64A] text-[#F7F3EC] placeholder-[#B9AD9D] text-sm py-2 px-1 focus:outline-none focus:border-[#D4A64A] transition-colors"
                aria-label="Phone Number"
              />
            </div>

            {/* Service */}
            <div className="w-full lg:flex-1">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-transparent border-b border-[#D4A64A] text-[#F7F3EC] text-sm py-2 px-1 focus:outline-none focus:border-[#D4A64A] transition-colors cursor-pointer"
                aria-label="Select Treatment"
              >
                <option value="">Select Service</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="w-full lg:flex-1">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent border-b border-[#D4A64A] text-[#F7F3EC] text-sm py-2 px-1 focus:outline-none focus:border-[#D4A64A] transition-colors cursor-pointer"
                aria-label="Select Location Branch"
              >
                <option value="">Select Location</option>
                {LOCATION_BRANCHES.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="w-full lg:flex-1 relative">
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#D4A64A] text-[#F7F3EC] text-sm py-2 px-1 focus:outline-none focus:border-[#D4A64A] transition-colors cursor-pointer"
                aria-label="Preferred Date"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full lg:w-auto flex-shrink-0 pt-2 lg:pt-0">
              <button
                type="submit"
                className="w-full lg:w-auto px-7 py-2 rounded-full bg-gradient-to-r from-[#D4A64A] to-[#FFF0A6] text-[#000000] font-bold hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <span>Submit</span>
                <span className="transition-transform group-hover:translate-x-1">────→</span>
              </button>
            </div>
          </form>
        )}
        {error && <p className="text-xs text-red-700 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};
