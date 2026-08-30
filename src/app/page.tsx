'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/hero/HeroSection';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductDetailModal from '@/components/catalog/ProductDetailModal';
import PhilosophySection from '@/components/philosophy/PhilosophySection';
import SalesChannelsSection from '@/components/channels/SalesChannelsSection';
import AIAssistantSection from '@/components/ai/AIAssistantSection';
import Footer from '@/components/layout/Footer';
import { Product } from '@/components/catalog/ProductCard';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('G');

  const handleSelectProduct = (product: Product, size?: string) => {
    setSelectedProduct(product);
    if (size) setSelectedSize(size);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-zinc-900 selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navigation Bar with Backdrop Blur */}
      <Header />

      {/* Hero Section 16:9 Widescreen with Penumbra Vertical Gradient */}
      <HeroSection />

      {/* Catalog Grid Section (3 Columns, 9:16 Cards, Subtração Absoluta) */}
      <ProductGrid onSelectProduct={handleSelectProduct} />

      {/* Sales Channels & Multichannel Marketplace Section (ONDE ENCONTRAR) */}
      <SalesChannelsSection />

      {/* Philosophy & Design Manifesto Section (MANIFESTO DE DESIGN - A ESTÉTICA DA SUBTRAÇÃO) */}
      <PhilosophySection />

      {/* Concierge Stardust AI Section */}
      <AIAssistantSection />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        initialSize={selectedSize}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
