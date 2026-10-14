import React from 'react';

interface GoldDividerProps {
  className?: string;
  width?: string;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = '',
  width = 'w-32',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
      <span className={`h-[1px] bg-gradient-to-r from-transparent to-[#D4A64A] ${width}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#FFF0A6] shadow-[0_0_8px_rgba(214,180,92,0.6)]" />
      <span className={`h-[1px] bg-gradient-to-l from-transparent to-[#D4A64A] ${width}`} />
    </div>
  );
};

