'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen md:min-h-[804px] flex items-center justify-center overflow-hidden bg-black">
      {/* 1920x804 Full-bleed Widescreen Image with Inverted Gradient (Black Top -> Off-White Bottom) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/HERO/BoneRecortado.png"
          alt="STAR INK Hero Cap Widescreen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
        {/* Soft blend overlay at bottom to transition seamlessly into the off-white catalog */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mono Badge (Dark Area at Top) */}
          <span className="text-zinc-300 font-mono text-xs md:text-sm tracking-[0.35em] uppercase mb-4 block drop-shadow-md">
            STAR INK — LUXURY STREETWEAR D2C
          </span>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-black tracking-tighter mb-4 leading-none drop-shadow-sm">
            Estética da <span className="text-zinc-800 font-light italic">Subtração</span>
          </h1>

          {/* Subtitle / Philosophical Quote */}
          <p className="text-lg md:text-2xl text-zinc-900 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            "A arte está pronta quando não se pode retirar mais nada."
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('catalog')}
              className="px-9 py-4 bg-black text-white hover:bg-zinc-800 font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl"
            >
              Explorar Drop 01
            </button>
            <button
              onClick={() => scrollTo('ai-assistant')}
              className="px-9 py-4 bg-white/80 hover:bg-white text-black border border-black/20 font-mono text-xs uppercase tracking-widest font-bold rounded-full backdrop-blur-md transition-all shadow-md"
            >
              Consultor IA
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-700 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-semibold">
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-800 to-transparent" />
      </motion.div>
    </section>
  );
}
