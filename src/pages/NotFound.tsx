import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] bg-[#050505] text-[#F6F0E7] flex items-center justify-center py-20 px-4">
      <div className="max-w-md text-center space-y-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#BFA078]">
          Page 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#BFA078] font-bold">
          Quiet BAAN Detour
        </h1>
        <p className="text-sm text-[#F6F0E7] leading-relaxed">
          The path you are looking for has taken a gentle pause. Let us guide you back to our treatments and serene spaces.
        </p>
        <div className="pt-4">
          <Link to="/" className="btn-bali">
            <span>Return to BAAN</span>
            <span>────→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
