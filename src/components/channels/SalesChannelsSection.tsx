'use client';

import React from 'react';

interface ChannelBrand {
  name: string;
  logo: React.ReactNode;
}

const brands: ChannelBrand[] = [
  {
    name: 'Mercado Livre',
    logo: (
      <div className="flex items-center gap-2 text-[#2D3277] font-bold font-sans text-xl sm:text-2xl tracking-tight">
        <svg className="w-8 h-8 fill-[#FFE600] stroke-[#2D3277] stroke-2 shrink-0" viewBox="0 0 24 24">
          <path d="M7 11v8a1 1 0 001 1h8a1 1 0 001-1v-8M5 11l7-7 7 7M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>mercado<br className="sm:hidden" /> livre</span>
      </div>
    ),
  },
  {
    name: 'Amazon Brasil',
    logo: (
      <div className="flex flex-col items-center text-zinc-900 font-bold font-sans text-2xl tracking-tighter">
        <span className="leading-none">amazon</span>
        <svg className="w-16 h-3 text-[#FF9900]" viewBox="0 0 60 15" fill="currentColor">
          <path d="M3 5c12 7 32 7 45-2M43 1.5l5 2.5-3.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Google Shopping',
    logo: (
      <div className="flex items-center gap-2 text-zinc-900 font-bold font-sans text-xl sm:text-2xl tracking-tight">
        <svg className="w-7 h-7" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        <span>Google Shopping</span>
      </div>
    ),
  },
  {
    name: 'Shein',
    logo: (
      <span className="font-serif font-black text-2xl sm:text-3xl tracking-[0.2em] text-zinc-900 uppercase">
        SHEIN
      </span>
    ),
  },
  {
    name: 'Dafiti',
    logo: (
      <div className="flex items-center gap-2 text-zinc-900 font-sans font-extrabold text-2xl tracking-tighter">
        <span className="text-zinc-900">dafiti</span>
      </div>
    ),
  },
  {
    name: 'TikTok Shop',
    logo: (
      <div className="flex items-center gap-2 text-zinc-900 font-bold font-sans text-xl sm:text-2xl tracking-tight">
        <svg className="w-7 h-7 fill-zinc-900" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.05.82.13V9.4a6.84 6.84 0 00-1-.07A6.33 6.33 0 003 15.66 6.33 6.33 0 009.33 22a6.33 6.33 0 006.33-6.33V9.05a8.16 8.16 0 004.93 1.61V7.22a4.84 4.84 0 01-1-.53z" />
        </svg>
        <span>TikTok Shop</span>
      </div>
    ),
  },
  {
    name: 'Reserva',
    logo: (
      <div className="flex items-center gap-2 font-sans font-extrabold text-xl sm:text-2xl tracking-tighter text-zinc-900 uppercase">
        <svg className="w-7 h-7 text-red-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
        </svg>
        <span>RESERVA</span>
      </div>
    ),
  },
  {
    name: 'Instagram Shopping',
    logo: (
      <div className="flex items-center gap-2 text-zinc-900 font-sans font-bold text-xl sm:text-2xl tracking-tight">
        <svg className="w-7 h-7 text-[#E4405F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span>Instagram</span>
      </div>
    ),
  },
  {
    name: 'Facebook Meta',
    logo: (
      <div className="flex items-center gap-2 text-[#0668E1] font-sans font-bold text-xl sm:text-2xl tracking-tight">
        <svg className="w-7 h-7 fill-[#0668E1]" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span>Meta Commerce</span>
      </div>
    ),
  },
];

export default function SalesChannelsSection() {
  return (
    <section id="channels" className="py-20 bg-[#f8fafc] text-zinc-900 border-t border-zinc-200">
      <div className="container mx-auto px-6 space-y-12">
        {/* Minimalist Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-400 block">
            CANAIS DE VENDA OFICIAIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 uppercase font-mono">
            ONDE ENCONTRAR
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-mono">
            Encontre o catálogo autoral da STAR INK nas principais plataformas.
          </p>
        </div>

        {/* Pure Clean Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white border border-zinc-200/80 hover:border-zinc-400 rounded-2xl p-8 flex items-center justify-center min-h-[110px] sm:min-h-[130px] shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
                {brand.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
