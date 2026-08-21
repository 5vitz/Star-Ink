'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ArtworksProductionModule from '@/components/admin/ArtworksProductionModule';
import ShowcaseCatalogModule from '@/components/admin/ShowcaseCatalogModule';
import { Palette, ShoppingBag } from 'lucide-react';

export default function AdminCatalogPage() {
  const [activeTab, setActiveTab] = useState<'artworks' | 'showcase'>('showcase');

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Admin Navigation Header */}
      <AdminHeader />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
        {/* Navigation Tabs between Division 1 (Artworks) & Division 2 (Showcase) */}
        <div className="flex gap-3 border-b border-[var(--border-subtle)] pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'showcase'
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <span>Divisão 2 • Produtos Comerciais & Vitrine 9:16 (Compradores)</span>
          </button>

          <button
            onClick={() => setActiveTab('artworks')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === 'artworks'
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Divisão 1 • Acervo de Artes Matrizes & 300 DPI (Fábrica / Fornecedores)</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'showcase' ? (
          <ShowcaseCatalogModule />
        ) : (
          <ArtworksProductionModule />
        )}
      </main>
    </div>
  );
}
