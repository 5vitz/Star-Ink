'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  pixPrice: number;
  image: string;
  category: string;
  drop?: string;
  promptSchemaUrl?: string;
  description: string;
  showImage?: boolean;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer relative aspect-[9/16] w-full flex flex-col bg-white border border-black rounded-none overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* 3:4 Image Container (Alinhado ao topo, ocupando 75% da altura vertical do card 9:16) */}
      <div className="relative aspect-[3/4] w-full bg-zinc-950 border-b border-black overflow-hidden shrink-0">
        {product.showImage !== false && product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4 text-center">
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              {product.code} {product.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 mt-1">
              Fundo Neutro • Estampa 100% DTG
            </span>
          </div>
        )}
      </div>

      {/* Área de Informações em Texto (Fundo Branco, Texto Preto, alinhado ao rodapé do card 9:16) */}
      <div className="flex-1 w-full bg-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm sm:text-base font-bold text-black tracking-tight group-hover:text-zinc-700 transition-colors line-clamp-1">
            {product.code} {product.name}
          </h3>
          <span className="text-xs sm:text-sm font-mono font-bold text-black shrink-0">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-700 pt-1.5 border-t border-zinc-200">
          <span className="text-[10px] sm:text-[11px] truncate">100% Algodão • DTG</span>
          <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold shrink-0">
            R$ {product.pixPrice.toFixed(2).replace('.', ',')} PIX
          </span>
        </div>
      </div>
    </motion.div>
  );
}
