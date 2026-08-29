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

  // Fast Blur & Disintegration physics EXCLUSIVELY for the isolated Cap Layer
  // Reaches maximum blur (36px) and fades out at 50% of Hero height (scrollYProgress = 0.5)
  const capScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.25]);
  const capY = useTransform(scrollYProgress, [0, 0.5], [0, -140]);
  const capOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const capBlur = useTransform(scrollYProgress, [0, 0.45], ['blur(0px)', 'blur(36px)']);

  // Background gradient layer smooth transition
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.95, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full min-h-[70vh] md:min-h-[640px] flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* ========================================================================= */}
      {/* CAMADA 1: FUNDO DEGRADÊ ESTÁTICO (Fundo passa por trás do Header com vidro) */}
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
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* CAMADA 2: BONÉ ISOLADO EM PNG (Com padding pt-20 para ficar abaixo do menu) */}
      {/* ========================================================================= */}

      {/* Desktop Isolated Cap with Antigravity Floating & Fast Scroll Blur (md:block) */}
      <motion.div
        style={{ scale: capScale, y: capY, opacity: capOpacity, filter: capBlur }}
        className="hidden md:block absolute inset-0 z-10 w-full h-full pointer-events-none pt-20"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative"
        >
          <Image
            src="/HERO/PNGs/BoneRecortadoDesktop2.png"
            alt="STAR INK Isolated Cap Desktop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
          />
        </motion.div>
      </motion.div>

      {/* Mobile Isolated Cap with Antigravity Floating & Fast Scroll Blur (block md:hidden) */}
      <motion.div
        style={{ scale: capScale, y: capY, opacity: capOpacity, filter: capBlur }}
        className="block md:hidden absolute inset-0 z-10 w-full h-full pointer-events-none pt-20"
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full relative"
        >
          <Image
            src="/HERO/PNGs/BoneRecortadoCelular2.png"
            alt="STAR INK Isolated Cap Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]"
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
