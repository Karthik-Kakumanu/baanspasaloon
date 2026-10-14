import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { BUSINESS_SETTINGS } from '../config/business';

export const FloatingWhatsApp: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-72 bg-[#181614] text-[#F6F0E7] rounded-2xl shadow-2xl border border-[#352B20] overflow-hidden animate-fadeIn">
          <div className="bg-[#050505] text-[#F6F0E7] p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">BAAN Concierge Desk</p>
              <p className="text-[11px] text-[#BFA078]">Typically replies within 10 minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close concierge popup"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4 bg-[#0C0B0A] space-y-3 text-xs text-[#F6F0E7]">
            <p className="bg-[#181614] p-3 rounded-xl shadow-xs border border-[#352B20]">
              Welcome to BAAN Salon, Beauty &amp; Spa! How may we curate your relaxation today?
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={`${BUSINESS_SETTINGS.whatsappUrl ?? 'https://wa.me/917993425252'}?text=Hello%20BAAN%20Concierge,%20I%20would%20like%20to%20enquire%20about%20an%20appointment`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#BFA078] text-[#050505] rounded-xl font-medium hover:bg-[#D6B45C] transition-colors"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${BUSINESS_SETTINGS.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#181614] text-[#F6F0E7] rounded-xl font-medium hover:bg-[#352B20] transition-colors border border-[#352B20]"
              >
                <Phone size={15} />
                <span>Call BAAN Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#BFA078] text-[#050505] flex items-center justify-center shadow-lg hover:bg-[#D6B45C] hover:scale-105 transition-all focus:outline-none cursor-pointer"
        aria-label="Contact via WhatsApp or Phone"
      >
        <MessageCircle size={30} fill="currentColor" />
      </button>
    </div>
  );
};
