import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  tabIndex?: number;
  role?: string;
  ariaLabel?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
  style = {},
  onClick,
  tabIndex,
  role,
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      const rotateY = normX * maxTilt;
      const rotateX = -normY * maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        transition: 'transform 0.1s cubic-bezier(0.2, 0.8, 0.4, 1)',
      });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          opacity: 0.4,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(214, 180, 92, 0.35) 0%, rgba(191, 160, 120, 0.08) 50%, transparent 80%)`,
          transition: 'opacity 0.2s ease',
        });
      }
    },
    [maxTilt, scale, glare]
  );

  const handleMouseEnter = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.4s ease',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card relative transform-gpu will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...tiltStyle,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] overflow-hidden"
          style={glareStyle}
          aria-hidden="true"
        />
      )}
      {/* Subtle luxury ambient gold border highlight on hover */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-[#D6B45C]/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

