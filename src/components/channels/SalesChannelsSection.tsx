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
    name: 'Shopee',
    logo: (
      <div className="flex items-center gap-2 text-[#EE4D2D] font-bold font-sans text-xl sm:text-2xl tracking-tight">
        <svg className="w-7 h-7 fill-[#EE4D2D]" viewBox="0 0 24 24">
          <path d="M19 6h-3.2A4.98 4.98 0 0012 2c-2.3 0-4.3 1.6-4.8 4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.4 0 2.6.9 2.9 2.2H9.1C9.4 4.9 10.6 4 12 4zm2.5 10.5c0 .8-.7 1.5-1.5 1.5h-2c-.8 0-1.5-.7-1.5-1.5v-.5h-2v.5c0 1.9 1.6 3.5 3.5 3.5v1h2v-1c1.9 0 3.5-1.6 3.5-3.5v-1c0-1.7-1.3-3-3-3.3l-1.5-.3c-.6-.1-1-.6-1-1.2 0-.6.4-1 1-1h1.5c.6 0 1 .4 1 1h2c0-1.7-1.3-3-3-3.3V8h-2v1.2c-1.7.3-3 1.6-3 3.3v1c0 1.7 1.3 3 3 3.3l1.5.3c.6.1 1 .6 1 1.2v.5z" />
        </svg>
        <span>Shopee</span>
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
    name: 'Zattini',
    logo: (
      <div className="flex items-center gap-2 font-sans font-bold text-2xl tracking-widest text-zinc-900 uppercase">
        <span className="text-red-600 font-serif text-3xl">Z</span>
        <span>ZATTINI</span>
      </div>
    ),
  },
  {
    name: 'Magalu',
    logo: (
      <div className="flex items-center gap-1.5 font-sans font-bold text-2xl tracking-tight text-[#0086FF]">
        <span>Magalu</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF007A] inline-block" />
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
