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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col h-full bg-white border border-black p-4 rounded-none transition-shadow hover:shadow-md"
    >
      {/* 9:16 Solid Black Frame (Reto 90º, apenas fundo preto sem imagem) */}
      <div className="relative aspect-[9/16] w-full bg-black border border-black rounded-none" />

      {/* Product Details (Contidos dentro do mesmo card com borda preta de 1px) */}
      <div className="pt-4 flex flex-col gap-1.5 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-black tracking-tight group-hover:text-zinc-700 transition-colors">
            {product.code} {product.name}
          </h3>
          <span className="text-xs font-mono font-bold text-black shrink-0">
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
