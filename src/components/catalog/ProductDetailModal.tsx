'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Check, Truck, ShieldCheck, FileCode, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const SIZES = ['P', 'M', 'G', 'GG', 'EGG'];

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [modalIndex, setModalIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('G');
  const [cep, setCep] = useState('');
  const [freightResult, setFreightResult] = useState<string | null>(null);
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false);

  if (!product) return null;

  const handleCalculateFreight = () => {
    if (!cep.trim() || cep.length < 8) return;
    setIsCalculatingFreight(true);
    setTimeout(() => {
      setFreightResult('PAC Reserva INK: R$ 18,90 (5 a 7 dias úteis) | SEDEX: R$ 29,40 (2 a 3 dias úteis)');
      setIsCalculatingFreight(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Overlay Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden shadow-2xl z-10 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: 9:16 Image Gallery Preview */}
          <div className="relative aspect-[9/16] md:h-full w-full bg-zinc-950 overflow-hidden flex flex-col justify-between">
            {/* Main Image */}
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  (product.images && product.images.length > 0
                    ? product.images[modalIndex]
                    : product.image) || product.image
                }
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-md">
                {product.category}
              </div>

              {/* Setas do Modal (se houver mais de 1 imagem) */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setModalIndex((prev) =>
                        prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-colors z-20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setModalIndex((prev) =>
                        prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-colors z-20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots no Rodapé da Imagem do Modal */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === modalIndex ? 'bg-white scale-125' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest block mb-1">
                ARTWORK {product.code}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold font-mono text-white">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm font-mono text-emerald-400 font-medium">
                  R$ {product.pixPrice.toFixed(2).replace('.', ',')} no PIX (-5%)
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Selecione o Tamanho:
                  </span>
                  <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-white transition-colors">
                    Tabela de Medidas (cm)
                  </span>
                </div>
                <div className="flex gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Freight Calculator */}
              <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80 mb-6">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-400" />
                  Calcular Frete (Fábrica Reserva INK):
                </span>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Digite seu CEP (ex: 22000-000)"
                    maxLength={9}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                  />
                  <button
                    onClick={handleCalculateFreight}
                    disabled={isCalculatingFreight}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isCalculatingFreight ? '...' : 'Calcular'}
                  </button>
                </div>
                {freightResult && (
                  <p className="text-[11px] font-mono text-emerald-400 mt-2 leading-relaxed">
                    {freightResult}
                  </p>
                )}
              </div>

              {/* Prompt Schema Badge if available */}
              {product.promptSchemaUrl && (
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
                  <FileCode className="w-4 h-4 text-zinc-400" />
                  <span>Prompt Schema Mestre A3:</span>
                  <a
                    href={product.promptSchemaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 underline hover:text-white"
                  >
                    `prompt_schema_fada.json`
                  </a>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <a
                href={`https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20comprar%20a%20camiseta%20${encodeURIComponent(
                  product.name
                )}%20tamanho%20${selectedSize}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar via Concierge 1-Click
              </a>
              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  Garantia de Troca em 30d
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-zinc-400" />
                  Produção PoD 2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
