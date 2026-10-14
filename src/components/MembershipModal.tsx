import React, { useState } from 'react';
import { X, Check, Award } from 'lucide-react';
import type { MembershipTier } from '../types';
import { LOCATION_BRANCHES } from '../config/business';

interface MembershipModalProps {
  tier: MembershipTier | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  tier,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState(LOCATION_BRANCHES[0].name);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !tier) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save membership enquiry
    try {
      const existing = JSON.parse(localStorage.getItem('baan_membership_enquiries') || '[]');
      const item = {
        id: crypto.randomUUID(),
        tierId: tier.id,
        tierName: tier.name,
        price: tier.price,
        name,
        phone,
        email,
        branch,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('baan_membership_enquiries', JSON.stringify([item, ...existing]));
    } catch {
      // fallback
    }
    setSubmitted(true);
  };

  const handleDone = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="baan-booking-modal relative w-full max-w-lg bg-[#111111] text-[#F7F3EC] rounded-3xl border border-[#2C2114] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F7F3EC] hover:bg-[#D4A64A] hover:text-[#000000] border border-[#2C2114] transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#D4A64A]/20 text-[#FFF0A6] mx-auto flex items-center justify-center mb-4 border border-[#FFF0A6]/40">
              <Check size={32} />
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#FFF0A6] uppercase">
              Membership Request Logged
            </span>
            <h3 className="font-serif text-2xl text-[#D4A64A] font-bold mt-2">
              Welcome to the BAAN Circle
            </h3>
            <p className="text-sm text-[#F7F3EC]/80 mt-2 max-w-md mx-auto leading-relaxed">
              Thank you {name}, your expression of interest in the <strong className="text-[#FFF0A6]">{tier.name} ({tier.price})</strong> package has been recorded in the local demo database.
            </p>
            <div className="mt-5 p-4 rounded-xl bg-[#0A0A0A] border border-[#2C2114] text-xs text-[#F7F3EC]/70 text-left">
              <p className="font-medium text-[#FFF0A6] mb-1">
                ℹ️ Demonstration Mode:
              </p>
              <p>
                No payment was processed. Our concierge would contact members upon official production rollout.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleDone}
                className="btn-bali bg-[#D4A64A] text-[#000000] hover:bg-[#FFF0A6]"
              >
                <span>Close</span>
                <span>────→</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] text-[#FFF0A6] text-xs font-semibold mb-2 border border-[#D4A64A]/30">
                <Award size={13} />
                {tier.bbh} · {tier.price}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#D4A64A] font-bold">
                {tier.name}
              </h2>
              <p className="text-sm text-[#F7F3EC]/75 mt-1">
                {tier.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#2C2114] mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-[#FFF0A6] font-semibold border-b border-[#2C2114] pb-2">
                <span>Total BAAN Hours:</span>
                <span>{tier.bbhCount} Hours</span>
              </div>
              <div className="flex justify-between text-[#F7F3EC]/80">
                <span>Effective Rate:</span>
                <span className="text-[#FFF0A6]">{tier.perSessionCost} / session</span>
              </div>
              <div className="flex justify-between text-[#F7F3EC]/80">
                <span>Validity:</span>
                <span>{tier.validityMonths} Months</span>
              </div>
              <div className="pt-2 text-[#F7F3EC]/70">
                <strong className="block text-[#FFF0A6] mb-1">Included Privileges:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {tier.discounts.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#F7F3EC]/70 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="input-bali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F7F3EC]/70 uppercase tracking-wider mb-1">
                    Phone *
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
                  <label className="block text-xs font-medium text-[#F7F3EC]/70 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-bali"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F7F3EC]/70 uppercase tracking-wider mb-1">
                  Home Branch *
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="input-bali"
                >
                  {LOCATION_BRANCHES.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-bali w-full justify-center bg-gradient-to-r from-[#D4A64A] via-[#FFF0A6] to-[#D4A64A] text-[#000000] font-bold py-3 text-base shadow-md cursor-pointer hover:opacity-95"
                >
                  <span>Submit Membership Enquiry</span>
                  <span className="text-lg">────→</span>
                </button>
                <p className="text-[11px] text-center text-[#F7F3EC]/60 mt-2">
                  No payment collected · Demonstration request recorded locally.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
