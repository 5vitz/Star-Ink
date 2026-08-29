'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  pixPrice: number;
  image: string;
  images?: string[];
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisibleInViewport, setIsVisibleInViewport] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Lista de imagens do carrossel (se p.images existir e tiver dados, usa ela; caso contrário usa p.image)
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setIsVisibleInViewport(true);
          } else {
            setIsVisibleInViewport(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setCurrentIndex(0); // Retorna automaticamente para a 1ª imagem (capa da frente)
  };

  const currentImgUrl = imageList[currentIndex] || product.image;

  return (
    <motion.article
      ref={cardRef}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onSelect(product)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative aspect-[9/16] w-full flex flex-col bg-white border border-black rounded-none overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* 3:4 Image Container (Alinhado ao topo, ocupando 75% da altura vertical do card 9:16) */}
      <div className="relative aspect-[3/4] w-full bg-zinc-950 border-b border-black overflow-hidden shrink-0">
        {product.showImage !== false && currentImgUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={currentImgUrl}
            alt={`${product.name} - Imagem ${currentIndex + 1}`}
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

        {/* Setas de Navegação Lateral do Carrossel (Visíveis no Hover no Desktop e no Viewport no Mobile) */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Imagem anterior"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 ${
                isVisibleInViewport
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima imagem"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 ${
                isVisibleInViewport
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Indicadores em Bolinhas (Dots estilo Instagram) */}
        {imageList.length > 1 && (
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-all duration-200 ${
              isVisibleInViewport
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
            }`}
          >
            {imageList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Ir para imagem ${idx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
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
    </motion.article>
  );
}
