import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const COLORS = [
  '#00DCB9',
  '#FF6B35',
  '#4FC3F7',
  'rgba(255, 255, 255, 0.5)',
];

interface ParticleFieldProps {
  /** If true, canvas is absolute (fills parent). If false (default), fixed (fills viewport). */
  contained?: boolean;
}

export function ParticleField({ contained = false }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const getSize = () => {
      if (contained && containerRef.current) {
        return {
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        };
      }
      return { w: window.innerWidth, h: window.innerHeight };
    };

    const initParticles = () => {
      const { w, h } = getSize();
      canvas.width = w;
      canvas.height = h;
      particles = [];
      const count = Math.min(100, Math.floor((w * h) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.5 + 0.25,
        });
      }
    };

    const draw = () => {
      const { w, h } = getSize();
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.color.startsWith('rgba')) {
          ctx.fillStyle = p.color;
        } else {
          const hex = p.color.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        }
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    const onResize = () => initParticles();
    window.addEventListener('resize', onResize);
    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [contained]);

  if (contained) {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
