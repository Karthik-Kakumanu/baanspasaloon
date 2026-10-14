import React from 'react';

interface RotatingBadgeProps {
  text?: string;
  className?: string;
  size?: number;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = 'YOUR BAAN BEAUTY RITUAL · BAAN SALON BEAUTY & SPA · ',
  className = '',
  size = 210,
}) => {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-spin-slow"
        style={{ animationDuration: '28s' }}
      >
        <path
          id="circlePath"
          d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          fill="none"
        />
        <text className="text-[10px] tracking-[0.24em] uppercase fill-[#D4A64A] font-medium">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
