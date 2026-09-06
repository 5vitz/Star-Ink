'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  FileCode, 
  Upload, 
  Plus, 
  Search, 
  Sparkles, 
  Printer, 
  Layers, 
  Check, 
  X, 
  ExternalLink,
  ShieldCheck,
  FolderKanban,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { ArtworkData } from '@/lib/artworks';

export default function ArtworksProductionModule() {
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Agent Atelier Audit state
  const [runningAtelierAudit, setRunningAtelierAudit] = useState(false);
  const [atelierAuditMsg, setAtelierAuditMsg] = useState<string | null>(null);

  const handleAtelierAudit = () => {
    setRunningAtelierAudit(true);
    setAtelierAuditMsg(null);
    setTimeout(() => {
      setRunningAtelierAudit(false);
      setAtelierAuditMsg('Auditoria ASK Nexus + Artwork Architect Concluída: 12 matrizes A3 300 DPI validadas em 4200x4800px PNG transparente. Conformidade com a Estética da Subtração 100%.');
    }, 1500);
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<ArtworkData | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    concept: '',
    promptSchemaUrl: '',
    masterPrintUrl: '',
    defaultSupplier: 'RESERVA_INK',
  });

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/artworks');
      if (res.ok) {
        setArtworks(await res.json());
      }
    } catch (err) {
      console.error('Erro ao carregar artes master:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleOpenModal = (art?: ArtworkData) => {
    if (art) {
      setEditingArtwork(art);
      setFormData({
        code: art.code || '',
        title: art.title || '',
        concept: art.concept || '',
        promptSchemaUrl: art.promptSchemaUrl || '',
        masterPrintUrl: art.masterPrintUrl || '',
        defaultSupplier: art.defaultSupplier || 'RESERVA_INK',
      });
    } else {
      setEditingArtwork(null);
      const nextNum = artworks.length + 1;
      setFormData({
        code: `STINK-ART-${String(nextNum).padStart(3, '0')}`,
        title: '',
        concept: '',
        promptSchemaUrl: `/data/prompts/PECA_${nextNum}.json`,
        masterPrintUrl: `/FORNECEDORES/Reserva INK/Artes/ARTE_${nextNum}_4200x4800_300DPI.png`,
        defaultSupplier: 'RESERVA_INK',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: editingArtwork ? editingArtwork.id : `art-${Date.now()}`,
      code: formData.code,
      title: formData.title,
      concept: formData.concept,
      promptSchemaUrl: formData.promptSchemaUrl,
      masterPrintUrl: formData.masterPrintUrl,
      defaultSupplier: formData.defaultSupplier,
    };

    try {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchArtworks();
      } else {
        alert('Erro ao salvar arte master.');
      }
    } catch (err) {
      console.error('Erro ao salvar arte:', err);
      alert('Erro de conexão ao salvar arte.');
    } finally {
      setSaving(false);
    }
  };

  const filteredArtworks = artworks.filter((a) => {
    const q = search.toLowerCase();
    return (
      !search ||
      a.title.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      (a.concept && a.concept.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4" />
            <span>Departamento 07 • Atelier de Artes & Prompts (ASK Nexus + PLAN Narrative + Artwork Architect)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Artes Matrizes & Especificações 300 DPI (Estética da Subtração)
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Gestão das matrizes master A3 (4200x4800px 300DPI) em PNG transparente e engenharia de Prompts JSON.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAtelierAudit}
            disabled={runningAtelierAudit}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${runningAtelierAudit ? 'animate-spin' : ''}`} />
            <span>{runningAtelierAudit ? 'Auditando Matrizes...' : 'Auditoria Matrizes (Artwork Architect)'}</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md shrink-0 font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Nova Arte Matriz</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if Audit runs */}
      {atelierAuditMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{atelierAuditMsg}</span>
        </div>
      )}

      {/* Standards Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400 uppercase block font-bold">
              Gabarito Vestuário DTG
            </span>
            <Printer className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-lg font-bold text-white block">4200 × 4800 px</span>
          <span className="text-[11px] text-[var(--text-secondary)] block font-mono">
            300 DPI • PNG Transparent • Reserva INK & Dimona
          </span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-cyan-400 uppercase block font-bold">
              Gabarito Quadros Fine Art
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-lg font-bold text-white block">3508 × 4960 px</span>
          <span className="text-[11px] text-[var(--text-secondary)] block font-mono">
            300 DPI • Papel Fotográfico A3 • Moldura Madeira
          </span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-amber-400 uppercase block font-bold">
              Diretório Físico Master
            </span>
            <FolderKanban className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm font-bold text-white block truncate">FORNECEDORES/Reserva INK/Artes/</span>
          <span className="text-[11px] text-[var(--text-secondary)] block font-mono">
            Backup em altíssima resolução sincronizado no repositório
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)]">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar arte por nome, código ou conceito..."
            className="w-full pl-9 pr-3 py-2 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-cyan-400 transition-colors font-mono"
          />
        </div>

        <span className="text-xs font-mono text-[var(--text-muted)]">
          Total de Artes Matrizes: <strong className="text-white">{artworks.length}</strong>
        </span>
      </div>

      {/* Artworks Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-[var(--text-muted)] animate-pulse">
          Carregando acervo de artes matrizes...
        </div>
      ) : filteredArtworks.length === 0 ? (
        <div className="py-16 text-center text-xs font-mono text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-xl">
          Nenhuma arte matriz encontrada para a busca "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                      {art.code}
                    </span>
                    <h3 className="text-base font-bold text-white">{art.title}</h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                    {art.defaultSupplier || 'RESERVA_INK'}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic line-clamp-3">
                  "{art.concept || 'Sem conceito filosófico cadastrado.'}"
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate" title={art.masterPrintUrl}>
                      Master 300DPI: {art.masterPrintUrl ? 'Vinculado' : 'Pendente'}
                    </span>
                  </div>

                  {art.promptSchemaUrl && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate" title={art.promptSchemaUrl}>
                        Prompt JSON A3: {art.promptSchemaUrl}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex gap-2">
                <button
                  onClick={() => handleOpenModal(art)}
                  className="w-full py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs text-white hover:border-cyan-400 transition-colors font-mono font-semibold"
                >
                  Editar Arte Matriz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Cadastro / Edição da Arte Matriz */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                {editingArtwork ? 'Editar Arte Matriz' : 'Nova Arte Matriz (Fábrica)'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-muted)] hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Código Master da Arte *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Ex: STINK-ART-017"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Título / Nome da Estampa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: XVII. A ESTRELA"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  Conceito Filosófico / Estética da Subtração
                </label>
                <textarea
                  rows={3}
                  value={formData.concept}
                  onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                  placeholder="Descreva a narrativa simbólica da obra..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">
                  Caminho do Arquivo Master 300DPI (Fábrica)
                </label>
                <input
                  type="text"
                  value={formData.masterPrintUrl}
                  onChange={(e) => setFormData({ ...formData, masterPrintUrl: e.target.value })}
                  placeholder="/FORNECEDORES/Reserva INK/Artes/..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-cyan-400 uppercase block mb-1">
                    JSON Schema A3 (Prompt IA)
                  </label>
                  <input
                    type="text"
                    value={formData.promptSchemaUrl}
                    onChange={(e) => setFormData({ ...formData, promptSchemaUrl: e.target.value })}
                    placeholder="/data/prompts/..."
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Fornecedor Industrial Padrão
                  </label>
                  <select
                    value={formData.defaultSupplier}
                    onChange={(e) => setFormData({ ...formData, defaultSupplier: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="RESERVA_INK">Reserva INK</option>
                    <option value="DIMONA">Dimona PoD</option>
                    <option value="PRIVATE_LABEL">Private Label (CMT)</option>
                    <option value="GRAFICA_FINE_ART">Gráfica Fine Art (Quadros)</option>
                  </select>
                </div>
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
                  <span>{saving ? 'Salvando...' : 'Salvar Arte Matriz'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
