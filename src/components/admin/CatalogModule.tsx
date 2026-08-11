'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Upload, 
  Image as ImageIcon, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  FileCode, 
  Check, 
  X,
  Layers,
  Sparkles,
  RefreshCw,
  GripVertical,
  MousePointerClick
} from 'lucide-react';
import { ExtendedProduct } from '@/lib/products';
import MediaLibraryModal from './MediaLibraryModal';

export default function CatalogModule() {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Media Library Modal state
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [selectingProductForMedia, setSelectingProductForMedia] = useState<ExtendedProduct | null>(null);

  // Edit / Add Product Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ExtendedProduct | null>(null);
  
  // Drag & Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    price: '180.00',
    pixPrice: '171.00',
    category: 'Tarô Negro',
    description: '',
    promptSchemaUrl: '',
    image: '',
    showImage: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleShowImage = async (product: ExtendedProduct) => {
    const updatedProduct = { ...product, showImage: !product.showImage };
    
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? updatedProduct : p))
    );

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
    } catch (err) {
      console.error('Erro ao alternar visibilidade da imagem:', err);
      fetchProducts(); // rollback
    }
  };

  // Open Media Library to select image for a specific card
  const handleOpenMediaPickerForCard = (product: ExtendedProduct) => {
    setSelectingProductForMedia(product);
    setIsMediaLibraryOpen(true);
  };

  // Callback when an image is selected from MediaLibraryModal
  const handleSelectMediaForProduct = async (mediaUrl: string) => {
    if (selectingProductForMedia) {
      const updatedProduct = {
        ...selectingProductForMedia,
        image: mediaUrl,
        showImage: true,
      };

      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === selectingProductForMedia.id ? updatedProduct : p))
      );

      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
      } catch (err) {
        console.error('Erro ao vincular imagem ao produto:', err);
        fetchProducts();
      }

      setSelectingProductForMedia(null);
      setIsMediaLibraryOpen(false);
    } else {
      // If modal was opened from Form
      setFormData((prev) => ({ ...prev, image: mediaUrl, showImage: true }));
      setIsMediaLibraryOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta peça do catálogo?')) return;
    
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      fetchProducts();
    }
  };

  const handleOpenModal = (product?: ExtendedProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        code: product.code || '',
        name: product.name || '',
        price: product.price ? String(product.price) : '180.00',
        pixPrice: product.pixPrice ? String(product.pixPrice) : '171.00',
        category: product.category || 'Tarô Negro',
        description: product.description || '',
        promptSchemaUrl: product.promptSchemaUrl || '',
        image: product.image || '',
        showImage: Boolean(product.showImage),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        code: `${products.length + 1}.`,
        name: '',
        price: '180.00',
        pixPrice: '171.00',
        category: 'Tarô Negro',
        description: '',
        promptSchemaUrl: '',
        image: '',
        showImage: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUploadInForm = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const result = await res.json();
        setFormData((prev) => ({ ...prev, image: result.url, showImage: true }));
      } else {
        alert('Erro ao fazer upload da imagem.');
      }
    } catch (err) {
      console.error('Erro no upload:', err);
      alert('Erro de conexão ao fazer upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: editingProduct ? editingProduct.id : undefined,
      code: formData.code,
      name: formData.name,
      price: parseFloat(formData.price) || 180.0,
      pixPrice: parseFloat(formData.pixPrice) || 171.0,
      category: formData.category,
      description: formData.description,
      promptSchemaUrl: formData.promptSchemaUrl,
      image: formData.image,
      showImage: formData.showImage,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert('Erro ao salvar produto.');
      }
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      alert('Erro de rede ao salvar produto.');
    } finally {
      setSaving(false);
    }
  };

  // Drag & Drop Reordering handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updated = [...products];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, movedItem);

    setProducts(updated);
    setDraggedIndex(null);

    // Save entire reordered list to backend
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error('Erro ao salvar reordenação:', err);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalProducts = products.length;
  const activeImageProducts = products.filter((p) => p.showImage).length;
  const hiddenImageProducts = products.filter((p) => !p.showImage).length;
  const jsonSchemaProducts = products.filter((p) => p.promptSchemaUrl).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Module Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Módulo 3 • Controle de Catálogo, Vitrine & Mídias 9:16</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gestão de Peças & Vitrine Pública
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              setSelectingProductForMedia(null);
              setIsMediaLibraryOpen(true);
            }}
            className="px-4 py-2.5 rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 font-semibold text-xs tracking-wide transition-all flex items-center gap-2 shadow-sm font-mono"
          >
            <ImageIcon className="w-4 h-4" />
            <span>📷 Biblioteca de Mídias 9:16</span>
          </button>

          <button
            onClick={() => fetchProducts()}
            className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-colors"
            title="Atualizar Catálogo"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Peça</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Total no Catálogo
          </span>
          <span className="text-2xl font-bold text-white block">{totalProducts}</span>
          <span className="text-[10px] text-zinc-500">Peças cadastradas</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
            Imagem Ativa na Vitrine
          </span>
          <span className="text-2xl font-bold text-emerald-400 block">{activeImageProducts}</span>
          <span className="text-[10px] text-emerald-500/80">Exibindo arte no site</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
            Fundo Preto (90º Reto)
          </span>
          <span className="text-2xl font-bold text-amber-400 block">{hiddenImageProducts}</span>
          <span className="text-[10px] text-amber-500/80">Imagens ocultas na vitrine</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
            Schemas JSON A3
          </span>
          <span className="text-2xl font-bold text-cyan-400 block">{jsonSchemaProducts}</span>
          <span className="text-[10px] text-cyan-500/80">Engenharia de Prompt Mestre</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código ou nome..."
            className="w-full pl-9 pr-3 py-2 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[var(--text-muted)] hidden lg:inline-block">
            💡 Dica: Arraste os cards para reordenar a vitrine em tempo real
          </span>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            {['ALL', 'Tarô Negro', 'Oversized', 'Edição Mestre'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Items Grid with Drag & Drop Reordering */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-[var(--text-muted)] animate-pulse">
          Carregando catálogo de peças...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 border border-dashed border-[var(--border-subtle)] rounded-2xl text-center space-y-3">
          <ImageIcon className="w-8 h-8 text-[var(--text-muted)] mx-auto opacity-50" />
          <p className="text-xs font-mono text-[var(--text-muted)]">
            Nenhuma peça encontrada para os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden p-4 space-y-4 flex flex-col justify-between transition-all ${
                draggedIndex === index
                  ? 'opacity-40 border-[var(--accent-cyan)] scale-95'
                  : 'border-[var(--border-subtle)] hover:border-white/30'
              }`}
            >
              {/* Media Preview Box 9:16 (Interactive Click to Open Media Picker) */}
              <div
                onClick={() => handleOpenMediaPickerForCard(product)}
                className="relative aspect-[9/16] w-full bg-black rounded-lg border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center group cursor-pointer"
                title="Clique para abrir a Biblioteca de Mídias e selecionar a foto deste card"
              >
                {product.showImage && product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center p-4 space-y-3">
                    <span className="text-xs font-mono text-amber-400 font-bold block">
                      CARD SEM MÍDIA / FUNDO PRETO
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 group-hover:border-[var(--accent-cyan)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      👈 Clique aqui para abrir a Biblioteca de Mídias
                    </span>
                  </div>
                )}

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 space-y-2 text-center backdrop-blur-[2px]">
                  <MousePointerClick className="w-6 h-6 text-[var(--accent-cyan)] animate-bounce" />
                  <span className="text-xs font-mono font-bold text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/20">
                    {product.image ? 'Alterar Mídia do Card' : 'Vincular Mídia 9:16'}
                  </span>
                </div>

                {/* Status Badges Overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                  <span className="cursor-grab active:cursor-grabbing p-1 rounded bg-black/80 text-zinc-400 hover:text-white border border-white/20">
                    <GripVertical className="w-3.5 h-3.5" />
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white border border-white/20">
                    {product.code}
                  </span>
                </div>

                <div className="absolute top-2 right-2 z-10">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      product.showImage && product.image
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {product.showImage && product.image ? 'Exibindo na Vitrine' : 'Fundo Preto'}
                  </span>
                </div>
              </div>

              {/* Product Infos */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-white block">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      R$ {product.pixPrice.toFixed(2).replace('.', ',')} PIX
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {product.description || 'Sem descrição cadastrada.'}
                </p>

                {product.promptSchemaUrl && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 pt-1">
                    <FileCode className="w-3.5 h-3.5" />
                    <span className="truncate">JSON Schema A3 Vinculado</span>
                  </div>
                )}
              </div>

              {/* Card Actions & Toggle Switch */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
                {/* Button to Open Media Picker Directly */}
                <button
                  onClick={() => handleOpenMediaPickerForCard(product)}
                  className="w-full py-1.5 px-3 rounded-lg border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-xs text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-colors flex items-center justify-center gap-1.5 font-mono font-semibold"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Selecionar da Biblioteca</span>
                </button>

                {/* Toggle Visibility Switch */}
                <div className="flex items-center justify-between bg-[var(--bg-main)] p-2 rounded-lg border border-[var(--border-subtle)]">
                  <span className="text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                    {product.showImage ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    Exibir Imagem na Vitrine
                  </span>
                  <button
                    onClick={() => handleToggleShowImage(product)}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                      product.showImage ? 'bg-emerald-500' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        product.showImage ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 py-1.5 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-xs text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 font-mono"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar Dados</span>
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-1.5 px-3 rounded-lg border border-rose-500/20 bg-rose-500/10 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors font-mono"
                    title="Excluir Peça"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Media Library Modal Component */}
      <MediaLibraryModal
        isOpen={isMediaLibraryOpen}
        onClose={() => {
          setIsMediaLibraryOpen(false);
          setSelectingProductForMedia(null);
        }}
        onSelectMedia={handleSelectMediaForProduct}
        title={
          selectingProductForMedia
            ? `Selecionar Mídia para: ${selectingProductForMedia.code} ${selectingProductForMedia.name}`
            : 'Biblioteca de Mídias 9:16'
        }
        subtitle={
          selectingProductForMedia
            ? 'Clique na imagem desejada para vinculá-la instantaneamente a este card da Vitrine'
            : 'Gerencie e visualize todas as mídias cinematográficas cadastradas'
        }
      />

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-cyan)]" />
                {editingProduct ? 'Editar Peça do Catálogo' : 'Cadastrar Nova Peça'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Código (ex: XVII.) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Nome da Peça *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: A ESTRELA"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Preço Cheio (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => {
                      const val = e.target.value;
                      const num = parseFloat(val) || 0;
                      setFormData({
                        ...formData,
                        price: val,
                        pixPrice: (num * 0.95).toFixed(2),
                      });
                    }}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Preço PIX (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.pixPrice}
                    onChange={(e) => setFormData({ ...formData, pixPrice: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Categoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  >
                    <option value="Tarô Negro">Tarô Negro</option>
                    <option value="Oversized">Oversized</option>
                    <option value="Edição Mestre">Edição Mestre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  Descrição da Peça & Conceito
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o conceito sob a ótica da Estética da Subtração..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  JSON Schema A3 (Caminho ou URL)
                </label>
                <input
                  type="text"
                  value={formData.promptSchemaUrl}
                  onChange={(e) => setFormData({ ...formData, promptSchemaUrl: e.target.value })}
                  placeholder="Ex: /imagens/Arte02/prompt_schema_fada.json"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                />
              </div>

              {/* 9:16 Image Selection Zone */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block">
                  Mídia Vertical 9:16 (Vitrine)
                </label>

                <div className="flex gap-4 items-center">
                  <div className="relative w-20 aspect-[9/16] bg-black border border-[var(--border-subtle)] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.image ? (
                      <Image src={formData.image} alt="Preview" fill unoptimized className="object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[var(--text-muted)] opacity-50" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectingProductForMedia(null);
                          setIsMediaLibraryOpen(true);
                        }}
                        className="px-3 py-2 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/40 text-xs text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-colors font-mono flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Abrir Biblioteca de Mídias</span>
                      </button>

                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs text-white cursor-pointer hover:bg-white/10 transition-colors font-mono">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? 'Enviando...' : 'Upload Direto'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUploadInForm}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Ou cole a URL direta da imagem (ex: /uploads/...)"
                      className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[var(--text-muted)] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle Show Image in Form */}
              <div className="flex items-center justify-between bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)] pt-2">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Exibir Imagem na Vitrine Pública
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] block">
                    Se desativado, o card exibirá o fundo preto sólido com corte 90º reto.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, showImage: !formData.showImage })}
                  className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    formData.showImage ? 'bg-emerald-500' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      formData.showImage ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-white font-mono"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 font-mono"
                >
                  <Check className="w-4 h-4" />
                  <span>{saving ? 'Salvando...' : 'Salvar Peça'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
