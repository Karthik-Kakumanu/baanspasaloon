import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { SERVICES, LOCATION_BRANCHES } from '../config/business';
import type { Appointment } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onSuccess?: (appointment: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService);
  const [location, setLocation] = useState(LOCATION_BRANCHES[0].name);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<Appointment | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setError('Please provide your name, phone number, and a date.');
      return;
    }
    if (date < today) {
      setError('Please choose a future date for your visit.');
      return;
    }

    const selectedServiceObj = SERVICES.find((s) => s.slug === service);
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      service: service || SERVICES[0].slug,
      serviceName: selectedServiceObj?.title || 'Bespoke Experience',
      location,
      date,
      time,
      notes,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('baan_appointments') || '[]');
      localStorage.setItem('baan_appointments', JSON.stringify([newAppointment, ...existing]));
    } catch {
      // fallback
    }

    setSubmitted(newAppointment);
    setError('');
    onSuccess?.(newAppointment);
  };

  const handleReset = () => {
    setSubmitted(null);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '08:00 PM',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="baan-booking-modal relative w-full max-w-xl bg-[#181614] text-[#F6F0E7] rounded-3xl border border-[#352B20] shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0C0B0A] text-[#F6F0E7] hover:bg-[#BFA078] hover:text-[#050505] border border-[#352B20] transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Close booking modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#BFA078]/20 text-[#D6B45C] mx-auto flex items-center justify-center mb-4 border border-[#D6B45C]/40">
              <Check size={32} />
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#D6B45C] uppercase">
              Demonstration Booking Saved
            </span>
            <h3 className="font-serif text-2xl text-[#BFA078] font-bold mt-2">
              Thank You, {submitted.name}
            </h3>
            <p className="text-sm text-[#F6F0E7]/80 mt-2 max-w-md mx-auto leading-relaxed">
              Your request for <strong className="text-[#D6B45C]">{submitted.serviceName}</strong> on <strong>{submitted.date}</strong> at <strong>{submitted.time}</strong> at our <strong>{submitted.location}</strong> branch has been saved locally.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#0C0B0A] border border-[#352B20] text-xs text-[#F6F0E7]/70 text-left">
              <p className="font-medium text-[#D6B45C] mb-1">
                ℹ️ Demonstration Mode Note:
              </p>
              <p>
                This website is an interactive frontend demonstration. No real financial transaction was conducted, and no actual therapist time slot has been locked in a production booking system.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="btn-bali bg-[#BFA078] text-[#050505] hover:bg-[#D6B45C]"
              >
                <span>Done</span>
                <span>────→</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-widest text-[#D6B45C] uppercase flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#D6B45C]" />
                BAAN Private Appointment
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#BFA078] font-bold mt-1">
                Reserve Your Escape
              </h2>
              <p className="text-sm text-[#F6F0E7]/75 mt-1">
                Share your preferred details. Your booking will be saved locally for demonstration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Shreya Sharma"
                    className="input-bali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
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
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-bali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                    Selected Ritual *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="input-bali"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                    BAAN Location *
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-bali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="input-bali"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F6F0E7]/80 uppercase tracking-wider mb-1">
                  Special Notes or Health Preferences <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Focus areas (shoulders, lower back), therapist gender preference, etc."
                  className="input-bali resize-none"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-bali w-full justify-center bg-gradient-to-r from-[#BFA078] via-[#D6B45C] to-[#BFA078] text-[#050505] font-bold py-3 text-base shadow-md cursor-pointer hover:opacity-95"
                >
                  <span>Confirm Appointment Request</span>
                  <span className="text-lg">────→</span>
                </button>
                <p className="text-[11px] text-center text-gray-500 mt-2">
                  🔒 Demonstration booking form · Requests are stored in browser local storage.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
