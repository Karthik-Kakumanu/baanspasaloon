import React, { useEffect, useRef } from 'react';

interface Hero3DCanvasProps {
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse tracking with smooth lerp
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.45 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#D4A64A' : '#FFF0A6',
    }));

    // Orbital 3D luxury rings state
    let rotationAngle = 0;

    const render = () => {
      // Smooth lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Mouse influence normalized (-1 to 1)
      const normX = (mouseX / width - 0.5) * 2;
      const normY = (mouseY / height - 0.5) * 2;

      // Draw 3D luxury orbital rings centered on the hero right side or middle
      const centerX = width * (width >= 1024 ? 0.68 : 0.5) + normX * 25;
      const centerY = height * 0.48 + normY * 18;

      if (!prefersReducedMotion) {
        rotationAngle += 0.003;
      }

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. Outer celestial gold ellipse
      ctx.save();
      ctx.rotate(rotationAngle * 0.6 + normX * 0.15);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width * 0.32, 280), Math.min(height * 0.38, 140), 0.35 + normY * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(191, 160, 120, 0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 14]);
      ctx.stroke();
      ctx.restore();

      // 2. Middle counter-rotating orbital ring
      ctx.save();
      ctx.rotate(-rotationAngle * 0.8 - normY * 0.12);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width * 0.24, 210), Math.min(height * 0.28, 95), -0.45 + normX * 0.08, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(214, 180, 92, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([12, 18]);
      ctx.stroke();
      ctx.restore();

      // 3. Inner shimmering halo
      ctx.save();
      ctx.rotate(rotationAngle * 1.2);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width * 0.15, 130), Math.min(height * 0.18, 60), 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(191, 160, 120, 0.24)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // Render floating gold particles with depth & mouse repulsion/attraction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX + normX * 0.3;
          p.y += p.speedY + normY * 0.2;
          p.pulse += p.pulseSpeed;

          // Wrap around canvas edges
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.25);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = '#FFF0A6';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

