'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll transformations for the hero cap image
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.4]);

  // Laser beam position driven directly by scroll (0% at top to 100% at bottom)
  const laserBeamY = useTransform(scrollYProgress, [0, 1], ['5%', '95%']);
  const laserGlowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[804px] flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* 1. Desktop Cap Container (Widescreen md:block) */}
      <motion.div 
        style={{ scale, opacity }}
        className="hidden md:block absolute inset-0 z-0 w-full h-full"
      >
        {/* Base Cap Image */}
        <Image
          src="/HERO/BoneRecortado.png"
          alt="STAR INK Hero Cap Widescreen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />

        {/* Soft blend overlay at bottom to transition to Off-White catalog */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none z-10" />
      </motion.div>

      {/* 2. Mobile Cap Container (9:16 Vertical block md:hidden) */}
      <motion.div 
        style={{ scale, opacity }}
        className="block md:hidden absolute inset-0 z-0 w-full h-full"
      >
        {/* Base Cap Image Mobile */}
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

      {/* ========================================================================= */}
      {/* OPÇÃO 2: SCANNING LIGHT BEAM / LASER SWEEP (Efeito Laser de Varredura 1px) */}
      {/* ========================================================================= */}

      {/* Laser Scan Line & Glowing Aura (Driven by Scroll) */}
      <motion.div
        style={{ top: laserBeamY, opacity: laserGlowOpacity }}
        className="absolute inset-x-0 z-20 pointer-events-none flex flex-col items-center"
      >
        {/* Glowing Illumination Field behind Laser Beam */}
        <div className="w-full h-24 -mt-12 bg-gradient-to-b from-transparent via-[#38bdf8]/15 to-transparent blur-sm" />

        {/* Surgical 1px Cyan Laser Hairline Beam */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_15px_#38bdf8,0_0_30px_#38bdf8,0_0_50px_#00f0ff]" />

        {/* Pulsing Central Laser Target Bead */}
        <div className="relative -mt-1.5 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#38bdf8] shadow-[0_0_20px_#38bdf8] animate-ping" />
          <div className="w-2 h-2 rounded-full bg-white absolute" />
        </div>
      </motion.div>

      {/* Ambient Continuous Laser Sweep Beam (Auto-Loop para quem não está rodando o scroll) */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 z-10 pointer-events-none opacity-40"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#38bdf8]" />
      </motion.div>

      {/* High-Tech HUD Scan Status Badges */}
      <div className="absolute top-24 left-6 z-20 hidden sm:flex flex-col gap-1 text-[10px] font-mono text-cyan-400/80 pointer-events-none drop-shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="tracking-[0.2em] uppercase font-bold text-white">LASER SCANNER • 1PX HAIRLINE</span>
        </div>
        <span className="text-zinc-400">INSPECTING CAP TEXTURE & EMBROIDERY</span>
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
