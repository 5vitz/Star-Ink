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
  promptSchemaUrl?: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* 9:16 Image Container */}
      <div className="relative aspect-[9/16] w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/80 group-hover:border-zinc-700 transition-colors">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Bottom Gradient for Image Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Product Details Below Card (Subtração Absoluta: Apenas Nome e Preço) */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-zinc-900 tracking-tight group-hover:text-black transition-colors">
            {product.code} {product.name}
          </h3>
          <span className="text-xs font-mono font-bold text-zinc-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
          <span>100% Algodão Penteado • DTG</span>
          <span className="text-emerald-700 font-bold">
            R$ {product.pixPrice.toFixed(2).replace('.', ',')} no PIX
          </span>
        </div>
      </div>
    </motion.div>
  );
}
