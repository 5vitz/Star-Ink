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

  // Smooth scroll transformations for the hero image
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.4]);
  const cyanGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[804px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Widescreen Image Container for Desktop (md:block) with Scroll Parallax & Cyan Hairline Glow */}
      <motion.div 
        style={{ scale, opacity }}
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

        {/* High-Tech Cyan Hairline Glow overlay on Scroll */}
        <motion.div 
          style={{ opacity: cyanGlowOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#38bdf8]/15 via-transparent to-transparent pointer-events-none"
        />

        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none" />
      </motion.div>

      {/* 9:16 Vertical Image Container for Mobile ONLY (block md:hidden) with Scroll Parallax */}
      <motion.div 
        style={{ scale, opacity }}
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

        {/* High-Tech Cyan Hairline Glow overlay on Scroll */}
        <motion.div 
          style={{ opacity: cyanGlowOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#38bdf8]/15 via-transparent to-transparent pointer-events-none"
        />

        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none" />
      </motion.div>

      {/* Minimal Animated Scroll Indicator at Bottom (SCROLL TO REVEAL) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-700 z-10 flex flex-col items-center gap-2 pointer-events-none"
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
