'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[804px] flex items-center justify-center overflow-hidden bg-black">
      {/* 1920x804 Full-bleed Widescreen Image for Desktop (md:block) */}
      <div className="hidden md:block absolute inset-0 z-0 w-full h-full">
        <Image
          src="/HERO/BoneRecortado.png"
          alt="STAR INK Hero Cap Widescreen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none" />
      </div>

      {/* 9:16 Vertical Image for Mobile ONLY (block md:hidden) */}
      <div className="block md:hidden absolute inset-0 z-0 w-full h-full">
        <Image
          src="/HERO/HeroVertical.png"
          alt="STAR INK Hero Cap 9:16 Vertical"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
        {/* Soft blend overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none" />
      </div>

      {/* Minimal Animated Scroll Indicator at Bottom */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-700 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-semibold drop-shadow-sm">
          SCROLL TO EXPLODE
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-800 to-transparent" />
      </motion.div>
    </section>
  );
}
