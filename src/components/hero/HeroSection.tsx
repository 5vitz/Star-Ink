'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations for the hero cap image
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const capOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0.15]);
  const capBlur = useTransform(scrollYProgress, [0, 0.7, 1], ['blur(0px)', 'blur(4px)', 'blur(12px)']);
  const particleIntensity = useTransform(scrollYProgress, [0, 1], [1, 3.5]);

  // Canvas particle disintegration system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate Particle Swarm
    const particleCount = 85;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.4 ? '#38bdf8' : Math.random() > 0.5 ? '#ffffff' : '#94a3b8',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset particle to bottom when it floats past top
        if (p.y < 0) {
          p.y = height + Math.random() * 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Glow shadow for cyan particles
        if (p.color === '#38bdf8') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[804px] flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* ========================================================================= */}
      {/* OPÇÃO 1: PARTICLE DISINTEGRATION & DISSOLVE (Desintegração em Partículas) */}
      {/* ========================================================================= */}

      {/* 1. Desktop Cap Container (Widescreen md:block) */}
      <motion.div 
        style={{ scale, opacity: capOpacity, filter: capBlur }}
        className="hidden md:block absolute inset-0 z-0 w-full h-full"
      >
        <Image
          src="/HERO/BoneRecortado.png"
          alt="STAR INK Hero Cap Widescreen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />

        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none z-10" />
      </motion.div>

      {/* 2. Mobile Cap Container (9:16 Vertical block md:hidden) */}
      <motion.div 
        style={{ scale, opacity: capOpacity, filter: capBlur }}
        className="block md:hidden absolute inset-0 z-0 w-full h-full"
      >
        <Image
          src="/HERO/HeroVertical.png"
          alt="STAR INK Hero Cap 9:16 Vertical"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />

        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none z-10" />
      </motion.div>

      {/* Full-bleed Canvas Overlay for Floating Micro-Particle Disintegration */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* High-Tech HUD Disintegration Status Badge */}
      <div className="absolute top-24 left-6 z-20 hidden sm:flex flex-col gap-1 text-[10px] font-mono text-cyan-400/80 pointer-events-none drop-shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="tracking-[0.2em] uppercase font-bold text-white">PARTICLE DISINTEGRATION • STARDUST</span>
        </div>
        <span className="text-zinc-400">DISSOLVING ARTWORK INTO VECTOR DUST</span>
      </div>

      {/* Minimal Animated Scroll Indicator at Bottom (SCROLL TO REVEAL) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-700 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-300 font-semibold drop-shadow-md">
            SCROLL TO REVEAL
          </span>
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-[#38bdf8]/60 to-transparent" />
      </motion.div>
    </section>
  );
}
