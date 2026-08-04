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

  // Scroll physics EXCLUSIVELY for the isolated Cap Layer (Desintegração no Scroll)
  const capScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const capY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const capOpacity = useTransform(scrollYProgress, [0, 0.4, 0.95], [1, 0.5, 0]);
  const capBlur = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(0px)', 'blur(8px)', 'blur(28px)']);
  const capRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  // Background gradient layer smooth transition
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.7]);

  // Particle Canvas System (Surges as user scrolls)
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

    // Particle Swarm
    const particleCount = 110;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 1.2,
      alpha: Math.random() * 0.9 + 0.1,
      color: Math.random() > 0.3 ? '#38bdf8' : Math.random() > 0.5 ? '#ffffff' : '#cbd5e1',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + Math.random() * 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.color === '#38bdf8') {
          ctx.shadowBlur = 12;
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
      {/* CAMADA 1: FUNDO DEGRADÊ ESTÁTICO (Permanecer imóvel no fundo) */}
      {/* ========================================================================= */}
      
      {/* Desktop Background Layer (md:block) */}
      <motion.div style={{ opacity: bgOpacity }} className="hidden md:block absolute inset-0 z-0 w-full h-full">
        <Image
          src="/HERO/PNGs/FundoDegradeDesktop.png"
          alt="STAR INK Background Desktop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </motion.div>

      {/* Mobile Background Layer (block md:hidden) */}
      <motion.div style={{ opacity: bgOpacity }} className="block md:hidden absolute inset-0 z-0 w-full h-full">
        <Image
          src="/HERO/PNGs/FundoDegradeCelular.png"
          alt="STAR INK Background Mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </motion.div>

      {/* Soft blend overlay at bottom to transition seamlessly to Off-White catalog */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* CAMADA 2: BONÉ ISOLADO EM PNG (DESINTEGRAÇÃO NO SCROLL DRAMÁTICA EXCLUSIVA) */}
      {/* ========================================================================= */}

      {/* Desktop Isolated Cap with Antigravity Floating & Scroll Disintegration (md:block) */}
      <motion.div
        style={{ scale: capScale, y: capY, rotate: capRotate, opacity: capOpacity, filter: capBlur }}
        className="hidden md:block absolute inset-0 z-10 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative"
        >
          <Image
            src="/HERO/PNGs/BoneRecortadoDesktop.png"
            alt="STAR INK Isolated Cap Desktop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full drop-shadow-[0_0_45px_rgba(56,189,248,0.35)]"
          />
        </motion.div>
      </motion.div>

      {/* Mobile Isolated Cap with Antigravity Floating & Scroll Disintegration (block md:hidden) */}
      <motion.div
        style={{ scale: capScale, y: capY, rotate: capRotate, opacity: capOpacity, filter: capBlur }}
        className="block md:hidden absolute inset-0 z-10 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative"
        >
          <Image
            src="/HERO/PNGs/BoneRecortadoCelular.png"
            alt="STAR INK Isolated Cap Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]"
          />
        </motion.div>
      </motion.div>

      {/* Particle Canvas Overlay for Floating Micro-Stardust */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* High-Tech HUD Disintegration Status Badge */}
      <div className="absolute top-24 left-6 z-30 hidden sm:flex flex-col gap-1 text-[10px] font-mono text-cyan-400/80 pointer-events-none drop-shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="tracking-[0.2em] uppercase font-bold text-white">DESINTEGRAÇÃO NO SCROLL • ACTIVE</span>
        </div>
        <span className="text-zinc-400">ISOLATED CAP DISSOLVING INTO DUST</span>
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
