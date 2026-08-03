'use client';

import { useState } from 'react';
import ProductCard, { Product } from './ProductCard';

export const DROP_01_PRODUCTS: Product[] = [
  {
    id: 'arte-02-fada',
    code: '02.',
    name: 'A FADA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/Arte02/Fada01.jpeg',
    category: 'Drop 01',
    promptSchemaUrl: '/imagens/Arte02/prompt_schema_fada.json',
    description: 'Primeira estampa homologada para a história da STAR INK. Geometria de traço 1px (hairline) sobre o fundo preto profundo, gravada em impressão DTG pura em Algodão Penteado 220g.',
  },
  {
    id: 'arte-01-geometra',
    code: '01.',
    name: 'O GEÔMETRA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/Arte02/Fada02.jpeg',
    category: 'Drop 01',
    promptSchemaUrl: '/imagens/Arte02/prompt_schema_fada.json',
    description: 'Estampa conceitual inspirada na arquitetura da subtração. Proporções euclidianas e traço mínimo minimalista.',
  },
  {
    id: 'arte-03-bailarina',
    code: '03.',
    name: 'A BAILARINA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/APROVADAS/Bailarina.png',
    category: 'Drop 01',
    description: 'Fluidez do movimento congelado em linhas brancas contínuas. Estampa A3 no peito com caimento oversized.',
  },
  {
    id: 'arte-04-movimento',
    code: '04.',
    name: 'O MOVIMENTO',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/APROVADAS/Dancer.png',
    category: 'Drop 01',
    description: 'Silhueta dinâmica sob o rigor da subtração. Impressão DTG macia e de toque zero no Algodão Penteado.',
  },
  {
    id: 'arte-05-fenda',
    code: '05.',
    name: 'A FENDA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/Arte02/Fada03.jpeg',
    category: 'Drop 01',
    description: 'Ruptura espacial em linha vetorizada branca. Edição limitada com apenas 50 unidades produzidas por lote.',
  },
  {
    id: 'arte-06-vacuo',
    code: '06.',
    name: 'O VÁCUO',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/Arte02/Fada04.jpeg',
    category: 'Drop 01',
    description: 'A síntese da filosofia da STAR INK. Minimalismo radical onde o espaço negativo constrói a própria obra.',
  },
];

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ onSelectProduct }: ProductGridProps) {
  const [filter, setFilter] = useState<'all' | 'drop01' | 'oversized'>('all');

  return (
    <section id="catalog" className="py-24 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-2 block">
              COLEÇÃO MESTRE • AGOSTO 2026
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Drop 01 — As 12 Artes
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Obras de arte vetorizadas impressas em DTG puro sobre Algodão Penteado 220g. 
              Grade de 3 colunas em formato editorial 9:16.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-full border border-zinc-800/80">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              TODOS
            </button>
            <button
              onClick={() => setFilter('drop01')}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'drop01'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              DROP 01
            </button>
            <button
              onClick={() => setFilter('oversized')}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'oversized'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              OVERSIZED
            </button>
          </div>
        </div>

        {/* 3 Columns Grid for 9:16 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DROP_01_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
