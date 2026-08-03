'use client';

import { useState } from 'react';
import ProductCard, { Product } from './ProductCard';

export const DROP_01_PRODUCTS: Product[] = [
  {
    id: 'tarot-xvii-a-estrela',
    code: 'XVII.',
    name: 'A ESTRELA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/tarot/a_estrela.png',
    category: 'Tarô Negro',
    promptSchemaUrl: '/imagens/Arte02/prompt_schema_fada.json',
    description: 'Arcano XVII — A Estrela. O símbolo mestre da STAR INK. Iluminação cósmica e fluidez em traço hairline (1px) vetorial sobre algodão penteado 220g.',
  },
  {
    id: 'tarot-i-o-mago',
    code: 'I.',
    name: 'O MAGO',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/tarot/o_mago.png',
    category: 'Tarô Negro',
    description: 'Arcano I — O Mago. Alquimia entre a ideia e a matéria. Manifestação técnica com o símbolo do infinito em traço fino.',
  },
  {
    id: 'tarot-xviii-a-lua',
    code: 'XVIII.',
    name: 'A LUA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/tarot/a_lua.png',
    category: 'Tarô Negro',
    description: 'Arcano XVIII — A Lua. A profundidade da penumbra e a estética do Dark Mode. Torres arquitetônicas e simetria vetorial.',
  },
  {
    id: 'tarot-0-o-louco',
    code: '0.',
    name: 'O LOUCO',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/tarot/o_louco.png',
    category: 'Tarô Negro',
    description: 'Arcano 0 — O Louco. A audácia de iniciar o Drop 01. O viajante estelar sem excesso de bagagem, puramente conceitual.',
  },
  {
    id: 'tarot-x-a-roda',
    code: 'X.',
    name: 'A RODA DA FORTUNA',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/tarot/a_roda.png',
    category: 'Tarô Negro',
    description: 'Arcano X — A Roda da Fortuna. Astrolábio cósmico e ciclicidade dos drops. Geometria sagrada minimalista.',
  },
  {
    id: 'tarot-arte-02-fada',
    code: '02.',
    name: 'A FADA (ARTE HOMOLOGADA)',
    price: 180.00,
    pixPrice: 171.00,
    image: '/imagens/Arte02/Fada01.jpeg',
    category: 'Edição Mestre',
    promptSchemaUrl: '/imagens/Arte02/prompt_schema_fada.json',
    description: 'A primeira estampa oficial aprovada para o Drop 01. Geometria de traço 1px (hairline) sobre o fundo preto profundo.',
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
