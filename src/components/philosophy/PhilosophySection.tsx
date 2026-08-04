'use client';

import { Sparkles, Zap, Layers } from 'lucide-react';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 bg-[#f1f5f9] text-zinc-900 border-t border-zinc-200">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-3 block">
            MANIFESTO DE DESIGN
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
            A Estética da Subtração
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-normal">
            Rejeitamos o ruído visual, os excessos estéticos e os emborrachados sintéticos. 
            Nossas peças são desenhadas com o rigor da geometria, linhas finas de 1px e impressão DTG pura diretamente no algodão.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Pillar 1 */}
          <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl flex flex-col items-start hover:border-zinc-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
              Traço Hairline (1px)
            </h3>
            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
              Ilustrações criadas via Engenharia de Prompts Estruturados em JSON Schema A3 (300x400mm), parametrizadas para máxima definição vetorial.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl flex flex-col items-start hover:border-zinc-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
              DTG em Algodão 100%
            </h3>
            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
              Toque zero (*soft-hand*) direto na fibra do Algodão Penteado 220g. Zero pelotas de plastisol e alta respirabilidade na pele.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl flex flex-col items-start hover:border-zinc-300 transition-all shadow-sm">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
              Produção Sob Demanda (PoD 2.0)
            </h3>
            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
              Sem desperdício de insumos ou estoques parados. Cada camiseta é produzida individualmente sob demanda via fábrica parceira Reserva INK.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
