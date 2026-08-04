'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 flex items-center justify-center">
              <Image
                src="/LOGO/LOGO_BRANCA_VAZADA.png"
                alt="STAR INK Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white group-hover:text-zinc-200 transition-colors">
              StarINK
            </span>
          </Link>

          {/* Desktop Navigation Links (SHOP | MANIFESTO | RELACIONAMENTO - IA) */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.15em] uppercase text-zinc-400">
            <a href="#catalog" className="hover:text-white transition-colors">
              SHOP
            </a>
            <a href="#philosophy" className="hover:text-white transition-colors">
              MANIFESTO
            </a>
            <a href="#ai-assistant" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              RELACIONAMENTO - IA
            </a>
            <Link
              href="/admin/dashboard"
              className="hover:text-white transition-colors text-zinc-500 hover:text-zinc-300"
            >
              /admin
            </Link>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20atendimento%20Concierge%20STAR%20INK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-xs font-mono font-medium tracking-wider px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Concierge
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-28 px-8 flex flex-col gap-8 md:hidden"
          >
            <a
              href="#catalog"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light text-white tracking-tight"
            >
              01. SHOP
            </a>
            <a
              href="#philosophy"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light text-white tracking-tight"
            >
              02. MANIFESTO
            </a>
            <a
              href="#ai-assistant"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light text-white tracking-tight flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-white" />
              03. RELACIONAMENTO - IA
            </a>
            <Link
              href="/admin/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light text-zinc-500 tracking-tight"
            >
              04. Painel Executivo (/admin)
            </Link>

            <div className="mt-auto pb-12">
              <a
                href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20atendimento%20Concierge%20STAR%20INK"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black py-4 rounded-full text-center font-mono text-xs uppercase tracking-widest block font-bold"
              >
                WhatsApp 1-Click Concierge
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
