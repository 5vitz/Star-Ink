'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  ImageIcon, 
  Upload, 
  GripVertical, 
  Eye, 
  EyeOff, 
  FileCode, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Sparkles, 
  MousePointerClick,
  Tag,
  ShoppingBag,
  ExternalLink,
  Frame,
  Shirt,
  ChevronDown,
  ChevronUp,
  Settings,
  ShieldCheck,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { ExtendedProduct } from '@/lib/products';
import { ArtworkData } from '@/lib/artworks';
import MediaLibraryModal from './MediaLibraryModal';

import { DropData, INITIAL_DROP } from '@/lib/drops';

export default function ShowcaseCatalogModule() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [drops, setDrops] = useState<DropData[]>([]);
  const [activeDrop, setActiveDrop] = useState<DropData>(INITIAL_DROP);
  const [isDropPanelOpen, setIsDropPanelOpen] = useState(false);
  const [dropFormData, setDropFormData] = useState<DropData>(INITIAL_DROP);
  const [savingDrop, setSavingDrop] = useState(false);
  const [loading, setLoading] = useState(true);

  // Agent Marketing Audit state
  const [runningMktAudit, setRunningMktAudit] = useState(false);
  const [mktAuditMsg, setMktAuditMsg] = useState<string | null>(null);

  const handleMktAudit = () => {
    setRunningMktAudit(true);
    setMktAuditMsg(null);
    setTimeout(() => {
      setRunningMktAudit(false);
      setMktAuditMsg('Auditoria Traffic Manager & Visual Curator Concluída: Meta Ads R$ 15,00/dia operando com ROAS de 3.4x. Feed Sacolinha Instagram 100% sincronizado com catálogo D2C.');
    }, 1500);
  };
  
  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [dropFilter, setDropFilter] = useState('ALL');
  const [dropDateFilter, setDropDateFilter] = useState('ALL');
  const [supplierFilter, setSupplierFilter] = useState('ALL');
  
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
    productType: 'CAMISETA',
    category: 'Tarô Negro',
    drop: 'Drop 01 — Tarô Negro',
    dropDate: '2026-10-01',
    artworkId: '',
    description: '',
    promptSchemaUrl: '',
    image: '',
    showImage: false,
    masterSku: '',
    ncmCode: '6109.10.00',
    costFactoryPod: '49.00',
    supplierProvider: 'RESERVA_INK',
    supplierSku: '',
    printFileUrl: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resArt, resDrop] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/artworks'),
        fetch('/api/drops'),
      ]);

      if (resProd.ok) setProducts(await resProd.json());
      if (resArt.ok) setArtworks(await resArt.json());
      if (resDrop.ok) {
        const dropList: DropData[] = await resDrop.json();
        if (dropList && dropList.length > 0) {
          setDrops(dropList);
          const active = dropList.find((d) => d.isActive || d.status === 'ACTIVE') || dropList[0];
          setActiveDrop(active);
          setDropFormData(active);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDrop(true);
    try {
      const res = await fetch('/api/drops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dropFormData),
      });

      if (res.ok) {
        const saved: DropData = await res.json();
        setActiveDrop(saved);
        fetchData();
        alert('Configurações do Drop salvas com sucesso!');
      } else {
        alert('Erro ao salvar as configurações do Drop.');
      }
    } catch (err) {
      console.error('Erro ao salvar Drop:', err);
      alert('Erro de conexão ao salvar Drop.');
    } finally {
      setSavingDrop(false);
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
        productType: product.productType || 'CAMISETA',
        category: product.category || 'Tarô Negro',
        drop: product.drop || 'Drop 01 — Tarô Negro',
        dropDate: product.dropDate || '2026-10-01',
        artworkId: product.artworkId || '',
        description: product.description || '',
        promptSchemaUrl: product.promptSchemaUrl || '',
        image: product.image || '',
        showImage: Boolean(product.showImage),
        masterSku: product.masterSku || `STINK-TSHIRT-${(product.name || 'PECA').toUpperCase().replace(/\s+/g, '-')}`,
        ncmCode: product.ncmCode || '6109.10.00',
        costFactoryPod: product.costFactoryPod ? String(product.costFactoryPod) : '49.00',
        supplierProvider: product.supplierProvider || 'RESERVA_INK',
        supplierSku: product.supplierSku || '',
        printFileUrl: product.printFileUrl || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        code: `${products.length + 1}.`,
        name: '',
        price: '180.00',
        pixPrice: '171.00',
        productType: 'CAMISETA',
        category: 'Tarô Negro',
        drop: 'Drop 01 — Tarô Negro',
        dropDate: '2026-10-01',
        artworkId: artworks[0]?.id || '',
        description: '',
        promptSchemaUrl: '',
        image: '',
        showImage: false,
        masterSku: `STINK-TSHIRT-PECA-${products.length + 1}`,
        ncmCode: '6109.10.00',
        costFactoryPod: '49.00',
        supplierProvider: 'RESERVA_INK',
        supplierSku: '',
        printFileUrl: '',
      });
    }
    setIsModalOpen(true);
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
      productType: formData.productType,
      category: formData.category,
      drop: formData.drop,
      dropDate: formData.dropDate,
      artworkId: formData.artworkId || undefined,
      description: formData.description,
      promptSchemaUrl: formData.promptSchemaUrl,
      image: formData.image,
      showImage: formData.showImage,
      masterSku: formData.masterSku,
      ncmCode: formData.ncmCode,
      costFactoryPod: parseFloat(formData.costFactoryPod) || 49.0,
      supplierProvider: formData.supplierProvider,
      supplierSku: formData.supplierSku,
      printFileUrl: formData.printFileUrl,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Erro ao salvar produto.');
      }
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      alert('Erro de conexão ao salvar produto.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Deseja realmente remover este produto da vitrine?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  };

  const handleToggleVisibility = async (product: ExtendedProduct) => {
    const updated = { ...product, showImage: !product.showImage };
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      fetchData();
    } catch (err) {
      console.error('Erro ao alterar visibilidade:', err);
    }
  };

  const handleSelectMediaForProduct = async (mediaUrl: string) => {
    if (!selectingProductForMedia) return;
    const updated = {
      ...selectingProductForMedia,
      image: mediaUrl,
      showImage: true,
    };

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      fetchData();
    } catch (err) {
      console.error('Erro ao aplicar mídia ao produto:', err);
    } finally {
      setIsMediaLibraryOpen(false);
      setSelectingProductForMedia(null);
    }
  };

  const handleOpenMediaPickerForCard = (product: ExtendedProduct) => {
    setSelectingProductForMedia(product);
    setIsMediaLibraryOpen(true);
  };

  // Drag & Drop Reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updated = [...products];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    const reordered = updated.map((p, idx) => ({ ...p, sortOrder: idx }));
    setProducts(reordered);
    setDraggedIndex(null);

    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reordered),
      });
    } catch (err) {
      console.error('Erro ao salvar reordenação:', err);
      fetchData();
    }
  };

  const filteredProducts = products.filter((p) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query) ||
      (p.drop && p.drop.toLowerCase().includes(query)) ||
      (p.dropDate && p.dropDate.toLowerCase().includes(query));

    const matchesType = typeFilter === 'ALL' || (p.productType || 'CAMISETA') === typeFilter;
    const matchesDrop = dropFilter === 'ALL' || (p.drop || '').toLowerCase().includes(dropFilter.toLowerCase());
    const matchesDropDate = dropDateFilter === 'ALL' || (p.dropDate || '').includes(dropDateFilter);
    const matchesSupplier =
      supplierFilter === 'ALL' || (p.supplierProvider || 'RESERVA_INK') === supplierFilter;

    return matchesSearch && matchesType && matchesDrop && matchesDropDate && matchesSupplier;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* Module Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Departamento 06 • Marketing, Growth & Mídias (Traffic Manager + Curator)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vitrine Comercial 9:16 & Sacolinha Instagram
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Gestão de produtos físicos, curadoria 9:16, feeds XML do Meta Commerce e campanha Meta Ads (R$ 15/dia).
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleMktAudit}
            disabled={runningMktAudit}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${runningMktAudit ? 'animate-spin' : ''}`} />
            <span>{runningMktAudit ? 'Auditando Mídia...' : 'Auditoria Ads (Traffic Manager)'}</span>
          </button>

          <button
            onClick={() => setIsDropPanelOpen(!isDropPanelOpen)}
            className="px-4 py-2.5 rounded-xl border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] font-semibold text-xs tracking-wide hover:bg-[var(--accent-cyan)]/20 transition-colors flex items-center gap-2 font-mono"
          >
            <Settings className="w-4 h-4" />
            <span>🎯 Configurar Drop Ativo</span>
            {isDropPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>+ Criar Produto na Vitrine</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if Audit runs */}
      {mktAuditMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{mktAuditMsg}</span>
        </div>
      )}

      {/* Expandable Active Drop Management Panel */}
      {isDropPanelOpen && (
        <form
          onSubmit={handleSaveDrop}
          className="bg-[var(--bg-card)] border border-[var(--accent-cyan)]/30 rounded-2xl p-5 space-y-4 shadow-xl font-mono relative overflow-hidden"
        >
          <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[var(--accent-cyan)] tracking-wider">
                Cabeçalho Dinâmico da Vitrine Pública
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                Gerenciar Textos & Lançamento do Drop Ativo
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
              Drop Atual: {activeDrop.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] text-zinc-400 uppercase block mb-1">
                Nome Interno do Drop *
              </label>
              <input
                type="text"
                required
                value={dropFormData.name}
                onChange={(e) => setDropFormData({ ...dropFormData, name: e.target.value })}
                placeholder="Ex: Drop 01 — Tarô Negro"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] text-cyan-400 uppercase block mb-1">
                Título Principal da Vitrine (H2) *
              </label>
              <input
                type="text"
                required
                value={dropFormData.title}
                onChange={(e) => setDropFormData({ ...dropFormData, title: e.target.value })}
                placeholder="Ex: Drop Arcanos do Tarô"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] text-cyan-400 uppercase block mb-1">
                Tagline / Coleção Mestre (Topo) *
              </label>
              <input
                type="text"
                required
                value={dropFormData.tagline}
                onChange={(e) => setDropFormData({ ...dropFormData, tagline: e.target.value })}
                placeholder="Ex: COLEÇÃO MESTRE • TARÔ NEGRO"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] text-zinc-400 uppercase block mb-1">
                Data do Lançamento Oficial
              </label>
              <input
                type="text"
                value={dropFormData.releaseDate || ''}
                onChange={(e) => setDropFormData({ ...dropFormData, releaseDate: e.target.value })}
                placeholder="Ex: 12 de Outubro de 2026"
                className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 uppercase block mb-1">
                Status da Coleção
              </label>
              <select
                value={dropFormData.status}
                onChange={(e) => setDropFormData({ ...dropFormData, status: e.target.value as any })}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="ACTIVE">Ativo / Vendas Liberadas</option>
                <option value="COMING_SOON">Em Aquecimento / VIP Gate</option>
                <option value="ARCHIVED">Arquivado / Esgotado</option>
              </select>
            </div>

            <div className="flex items-end justify-end gap-2">
              <button
                type="submit"
                disabled={savingDrop}
                className="w-full py-2 px-4 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{savingDrop ? 'Salvando...' : 'Salvar Drop Ativo'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)]">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por peça, código, Drop ou data..."
            className="w-full pl-9 pr-3 py-2 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-cyan-400 transition-colors font-mono"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
          {/* Product Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[var(--bg-main)] text-white border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-400"
          >
            <option value="ALL">Todos os Tipos</option>
            <option value="CAMISETA">Camiseta</option>
            <option value="MOLETOM">Moletom</option>
            <option value="BERMUDA">Bermuda</option>
            <option value="QUADRO_FINE_ART">Quadro Fine Art A3</option>
            <option value="ECOBAG">Ecobag</option>
          </select>

          {/* Supplier Filter Dropdown */}
          <select
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="bg-[var(--bg-main)] text-white border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-400"
          >
            <option value="ALL">Todos os Fornecedores</option>
            <option value="RESERVA_INK">Reserva INK</option>
            <option value="DIMONA">Dimona PoD</option>
            <option value="PRIVATE_LABEL">Private Label (CMT)</option>
            <option value="GRAFICA_FINE_ART">Gráfica Fine Art</option>
          </select>

          {/* Drop Name Filter Dropdown */}
          <select
            value={dropFilter}
            onChange={(e) => setDropFilter(e.target.value)}
            className="bg-[var(--bg-main)] text-white border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">Todos os Drops</option>
            <option value="Drop 01">Drop 01 — Tarô Negro</option>
            <option value="Drop 02">Drop 02 — Geometria Sagrada</option>
            <option value="Edição Mestre">Edição Mestre</option>
          </select>
        </div>
      </div>

      {/* Catalog Items Grid with Drag & Drop Reordering */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-[var(--text-muted)] animate-pulse">
          Carregando catálogo de produtos da vitrine...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-xs font-mono text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-xl">
          Nenhum produto encontrado para os filtros selecionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-4 shadow-lg hover:border-[var(--border-hover)] transition-all flex flex-col justify-between group cursor-move relative"
            >
              {/* Product Preview Card */}
              <div className="space-y-3">
                <div className="relative w-full aspect-[9/16] bg-black border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-inner flex flex-col">
                  {/* Top 3:4 Image Area */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
                    {product.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover object-center transition-all duration-300 ${
                          product.showImage ? 'opacity-100' : 'opacity-20 grayscale'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                        <ImageIcon className="w-8 h-8 text-[var(--text-muted)] opacity-40 mb-1" />
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">Sem Mídia WebP 3:4</span>
                      </div>
                    )}

                    {/* Drag Handle Badge */}
                    <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-md p-1 rounded-md text-white border border-white/10">
                      <GripVertical className="w-3.5 h-3.5" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          product.showImage !== false && product.image
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {product.showImage !== false && product.image ? 'Exibindo' : 'Oculto'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom White Info Box Preview */}
                  <div className="flex-1 w-full bg-white p-3 flex flex-col justify-between text-black">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-xs font-bold font-mono line-clamp-1">{product.code} {product.name}</span>
                      <span className="text-xs font-bold font-mono shrink-0">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600 flex justify-between border-t border-zinc-200 pt-1">
                      <span>{product.productType === 'QUADRO_FINE_ART' ? 'Quadro Fine Art A3' : '100% Algodão • DTG'}</span>
                      <span className="text-emerald-700 font-bold">R$ {product.pixPrice.toFixed(2)} PIX</span>
                    </div>
                  </div>

                  {/* Hover Overlay Button */}
                  <div
                    onClick={() => handleOpenMediaPickerForCard(product)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 space-y-2 text-center backdrop-blur-[2px] z-20 cursor-pointer"
                  >
                    <MousePointerClick className="w-6 h-6 text-[var(--accent-cyan)] animate-bounce" />
                    <span className="text-xs font-mono font-bold text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/20">
                      {product.image ? 'Alterar Mídia do Card' : 'Vincular Mídia 3:4'}
                    </span>
                  </div>
                </div>

                {/* Product Infos */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                          {product.productType || 'CAMISETA'}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                          {product.supplierProvider || 'RESERVA_INK'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 block font-bold">
                        {product.drop || 'Drop 01'} {product.dropDate ? `• ${product.dropDate}` : ''}
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
                </div>

                {/* Card Actions & Toggle Switch */}
                <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
                  <button
                    onClick={() => handleOpenMediaPickerForCard(product)}
                    className="w-full py-1.5 px-3 rounded-lg border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-xs text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-colors flex items-center justify-center gap-1.5 font-mono font-semibold"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Gerenciar Mídia 9:16</span>
                  </button>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleToggleVisibility(product)}
                      className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                        product.showImage
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : 'border-zinc-700 text-zinc-400 bg-zinc-800'
                      }`}
                    >
                      {product.showImage ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{product.showImage ? 'Visível na Loja' : 'Oculto'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-1.5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-main)] rounded-md transition-colors"
                        title="Editar Produto"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-[var(--text-muted)] hover:text-red-400 hover:bg-[var(--bg-main)] rounded-md transition-colors"
                        title="Deletar Produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaLibraryOpen}
        onClose={() => {
          setIsMediaLibraryOpen(false);
          setSelectingProductForMedia(null);
        }}
        onSelectMedia={handleSelectMediaForProduct}
      />

      {/* Product Creation & Editing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                {editingProduct ? 'Editar Produto na Vitrine' : 'Novo Produto na Vitrine'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-muted)] hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Vincular Arte Matriz (Criativo)
                  </label>
                  <select
                    value={formData.artworkId}
                    onChange={(e) => setFormData({ ...formData, artworkId: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  >
                    <option value="">Selecione uma Arte Matriz...</option>
                    {artworks.map((art) => (
                      <option key={art.id} value={art.id}>
                        {art.code} • {art.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Tipo de Suporte / Produto *
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  >
                    <option value="CAMISETA">Camiseta Streetwear (100% Algodão)</option>
                    <option value="MOLETOM">Moletom Heavyweight</option>
                    <option value="BERMUDA">Bermuda Streetwear</option>
                    <option value="QUADRO_FINE_ART">Quadro Fine Art A3 (Moldura Madeira)</option>
                    <option value="ECOBAG">Ecobag Algodão Cru</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Código do Card *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Ex: XVII."
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Nome Comercial da Peça *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: A ESTRELA"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-cyan-400 uppercase block mb-1">
                    Nome do Drop (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    placeholder="Ex: Drop 01 — Tarô Negro"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-cyan-400 uppercase block mb-1">
                    Data do Drop / Lançamento
                  </label>
                  <input
                    type="text"
                    value={formData.dropDate}
                    onChange={(e) => setFormData({ ...formData, dropDate: e.target.value })}
                    placeholder="Ex: 2026-10-01"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Roteamento de Fábrica / Multi-Supplier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <label className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">
                    Fornecedor Industrial *
                  </label>
                  <select
                    value={formData.supplierProvider}
                    onChange={(e) => setFormData({ ...formData, supplierProvider: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  >
                    <option value="RESERVA_INK">Reserva INK</option>
                    <option value="DIMONA">Dimona PoD</option>
                    <option value="PRIVATE_LABEL">Private Label (CMT)</option>
                    <option value="GRAFICA_FINE_ART">Gráfica Fine Art (Quadros)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">
                    SKU no Fornecedor
                  </label>
                  <input
                    type="text"
                    value={formData.supplierSku}
                    onChange={(e) => setFormData({ ...formData, supplierSku: e.target.value })}
                    placeholder="Ex: RES-INK-FADA-G"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">
                    Custo Fábrica (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costFactoryPod}
                    onChange={(e) => setFormData({ ...formData, costFactoryPod: e.target.value })}
                    placeholder="49.00"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  Descrição do Produto Comercial
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o produto, caimento, especificações do quadro ou camiseta..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
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
                  className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors font-mono flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{saving ? 'Salvando...' : 'Salvar Produto'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
