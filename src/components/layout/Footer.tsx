'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-zinc-900 py-16 border-t border-zinc-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Col 1 & 2: Branding & Bio */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-300">
                <Image
                  src="/LOGO/LOGO_REDONDA.png"
                  alt="STAR INK Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-black">
                STAR INK
              </span>
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-md font-sans">
              STAR INK — Startup D2C de Moda Contemporânea & Print on Demand 2.0. 
              Visualização minimalista 9:16, inteligência de dados e otimização para buscadores por inteligência artificial (GEO).
            </p>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">
              Navegação
            </h4>
            <ul className="space-y-3 font-mono text-xs text-zinc-600">
              <li>
                <a href="#catalog" className="hover:text-black transition-colors">
                  Drop 01 (Tarô Negro)
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-black transition-colors">
                  Estética da Subtração
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-black transition-colors">
                  Stardust Concierge IA
                </a>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-black transition-colors">
                  Painel Admin (/admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional & Legal */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">
              Institucional
            </h4>
            <ul className="space-y-3 font-mono text-xs text-zinc-600">
              <li>
                <a href="https://www.star-ink.com.br" className="hover:text-black transition-colors">
                  www.star-ink.com.br
                </a>
              </li>
              <li>
                <span>Fulfillment: Reserva INK PoD</span>
              </li>
              <li>
                <span>ERP: Bling Cobalto Sync</span>
              </li>
              <li>
                <span>Suporte: WhatsApp Concierge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 font-mono text-[11px]">
          <p>© 2026 STAR INK. Todos os direitos reservados.</p>
          <p className="text-zinc-600 italic">
            "A arte está pronta quando não se pode retirar mais nada."
          </p>
        </div>
      </div>
    </footer>
  );
}
