'use client';

import React from 'react';
import { Globe, Building2, CheckCircle2, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  category: string;
  status: string;
  description: string;
  badgeColor: string;
  logoSvg?: React.ReactNode;
}

const channels: Channel[] = [
  {
    id: 'mercadolivre',
    name: 'Mercado Livre',
    category: 'Loja Oficial Full',
    status: 'Sincronizado API v3',
    description: 'Entrega rápida e presença oficial no maior marketplace da América Latina.',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  },
  {
    id: 'amazon',
    name: 'Amazon Brasil',
    category: 'Prime & Marketplace',
    status: 'Integração Ativa',
    description: 'Catálogo sincronizado com a infraestrutura global da Amazon.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'shopee',
    name: 'Shopee Brasil',
    category: 'Loja Oficial Brand',
    status: 'Integração Ativa',
    description: 'Presença autoral com envio direto da fábrica PoD para todo o país.',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  {
    id: 'shein',
    name: 'Shein Marketplace',
    category: 'Fashion Hub',
    status: 'Catálogo Conectado',
    description: 'Distribuição na plataforma de alta frequência e tendência jovem.',
    badgeColor: 'bg-zinc-100 text-black font-bold border-white',
  },
  {
    id: 'dafiti',
    name: 'Dafiti Group',
    category: 'Moda & LifeStyle',
    status: 'Estoque Unificado',
    description: 'Presença no maior e-commerce especializado em moda da América Latina.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'zattini',
    name: 'Zattini (Netshoes)',
    category: 'Fashion & Urban',
    status: 'Estoque Unificado',
    description: 'Canal especializado em moda urbana, calçados e vestuário autoral.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'magalu',
    name: 'Magalu (Luiza)',
    category: 'Marketplace Nacional',
    status: 'Integração Ativa',
    description: 'Integração via ecossistema Magalu com logística integrada.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: 'instagram',
    name: 'Instagram Shopping',
    category: 'Social Commerce',
    status: 'Tags Dinâmicas',
    description: 'Compras diretas no feed e nos stories com a estética original da marca.',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
  },
  {
    id: 'facebook',
    name: 'Facebook (Meta Commerce)',
    category: 'Catalog Feed API',
    status: 'Feed Automatizado',
    description: 'Sincronização do catálogo nativo com a suíte de anúncios Meta.',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
];

export default function SalesChannelsSection() {
  return (
    <section id="channels" className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-semibold uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Ecossistema Multicanal & Presença Oficial</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-mono">
            Canais de Venda <span className="text-red-500">Oficiais</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-mono leading-relaxed">
            A <strong>STAR INK</strong> expande seu catálogo autoral para as maiores plataformas de e-commerce do Brasil e do mundo. Estoque unificado e produção automatizada via arquitetura de integração <strong>Bling ERP & PoD 2.0</strong>.
          </p>
        </div>

        {/* 9 Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-[#0e0e11] border border-zinc-800/80 hover:border-zinc-600 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${channel.badgeColor}`}>
                    {channel.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{channel.status}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{channel.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-2 leading-relaxed">
                    {channel.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Sincronização Direct-to-Garment</span>
                </span>
                <span className="text-zinc-600 group-hover:text-zinc-300 transition-colors">Bling ERP API</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Guarantee Footer */}
        <div className="bg-[#111116] border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-mono">
                Arquitetura de Alta Frequência & Estoque Garantido
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                Independente de onde o cliente compre, a produção é acionada instantaneamente pela nossa fábrica parceira com rastreio em tempo real.
              </p>
            </div>
          </div>

          <a
            href="#catalog"
            className="px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shrink-0"
          >
            Explorar Vitrine Oficial
          </a>
        </div>
      </div>
    </section>
  );
}
