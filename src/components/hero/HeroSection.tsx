'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with 16:9 Aspect & Penumbra Light-to-Dark Vertical Gradient */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-b from-zinc-700/30 via-zinc-950/70 to-black">
        <div className="relative w-full h-[75vh] max-w-5xl px-8">
          <Image
            src="/imagens/hero_cap_blank.png"
            alt="STAR INK Hero Cap"
            fill
            priority
            className="object-contain object-center opacity-80"
          />
        </div>
        {/* Soft Vertical Light-to-Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-300/10 via-transparent to-black pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mono Badge */}
          <span className="text-zinc-400 font-mono text-xs md:text-sm tracking-[0.35em] uppercase mb-6 block">
            STAR INK — LUXURY STREETWEAR D2C
          </span>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter mb-4 leading-none">
            Estética da <span className="text-zinc-400 font-light italic">Subtração</span>
          </h1>

          {/* Subtitle / Philosophical Quote */}
          <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            "A arte está pronta quando não se pode retirar mais nada."
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('catalog')}
              className="px-9 py-4 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl"
            >
              Explorar Drop 01
            </button>
            <button
              onClick={() => scrollTo('ai-assistant')}
              className="px-9 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs uppercase tracking-widest font-medium rounded-full backdrop-blur-md transition-all"
            >
              Consultor IA
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
          SCROLL
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
