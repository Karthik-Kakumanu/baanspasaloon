import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GoldButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'charcoal';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  text,
  onClick,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'text-xs py-2 px-4 gap-2',
    md: 'text-sm py-3 px-7 gap-3',
    lg: 'text-base py-4 px-9 gap-3.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#D4A64A] text-[#000000] font-semibold border border-[#D4A64A] shadow-[0_4px_20px_rgba(214,180,92,0.25)] hover:bg-[#FFF0A6] hover:border-[#FFF0A6] hover:shadow-[0_6px_28px_rgba(214,180,92,0.45)]',
    outline:
      'bg-transparent text-[#D4A64A] font-medium border border-[#D4A64A]/70 hover:bg-[#D4A64A] hover:text-[#000000] hover:border-[#FFF0A6]',
    charcoal:
      'bg-[#111111] text-[#F7F3EC] font-medium border border-[#D4A64A]/40 hover:bg-[#D4A64A] hover:text-[#000000] hover:border-[#FFF0A6]',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center overflow-hidden uppercase tracking-wider transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {/* Shimmering light beam sweep across button on hover */}
      <span
        className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[250%]"
        aria-hidden="true"
      />

      <span className="relative z-10">{children || text}</span>

      {showArrow && (
        <ArrowRight
          size={size === 'sm' ? 13 : size === 'lg' ? 18 : 15}
          className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        />
      )}
    </button>
  );
};

