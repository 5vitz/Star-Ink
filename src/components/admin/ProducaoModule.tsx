'use client';

import React, { useState, useEffect } from 'react';
import { 
  Factory, 
  Layers, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Shirt, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  ShieldCheck, 
  Tag, 
  AlertCircle,
  X,
  Check
} from 'lucide-react';
import { ProductionOrder, SampleOrder, KanbanStage } from '@/lib/production';

const KANBAN_STAGES: KanbanStage[] = [
  'Aguardando',
  'Imprimindo DTG',
  'Embalagem',
  'Em Trânsito',
  'Entregue',
];

export default function ProducaoModule() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [samples, setSamples] = useState<SampleOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'kanban' | 'amostras' | 'suppliers'>('kanban');
  const [supplierFilter, setSupplierFilter] = useState<string>('ALL');

  // Sample Modal state
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [sampleFormData, setSampleFormData] = useState({
    artworkName: 'XVII. A ESTRELA',
    size: 'M',
    supplier: 'Reserva INK PoD',
    costPrice: '49.00',
    notes: 'Amostra física para validação de estampa e tecido 100% Algodão Penteado.',
  });
  const [requestingSample, setRequestingSample] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resOrd, resSamp] = await Promise.all([
        fetch('/api/production/orders'),
        fetch('/api/production/samples'),
      ]);

      if (resOrd.ok) setOrders(await resOrd.json());
      if (resSamp.ok) setSamples(await resSamp.json());
    } catch (err) {
      console.error('Erro ao carregar dados da produção:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMoveStage = async (order: ProductionOrder, direction: 'next' | 'prev') => {
    const currentIndex = KANBAN_STAGES.indexOf(order.stage);
    let newIndex = currentIndex;
    if (direction === 'next' && currentIndex < KANBAN_STAGES.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    const nextStage = KANBAN_STAGES[newIndex];
    if (nextStage === order.stage) return;

    // Optimistic UI Update
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, stage: nextStage } : o))
    );

    try {
      await fetch('/api/production/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, stage: nextStage }),
      });
    } catch (err) {
      console.error('Erro ao mover etapa no Kanban:', err);
      fetchData(); // rollback
    }
  };

  const handleRequestSampleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestingSample(true);

    try {
      const res = await fetch('/api/production/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleFormData),
      });

      if (res.ok) {
        setIsSampleModalOpen(false);
        fetchData();
      } else {
        alert('Erro ao solicitar amostra.');
      }
    } catch (err) {
      console.error('Erro na solicitação de amostra:', err);
      alert('Erro de conexão.');
    } finally {
      setRequestingSample(false);
    }
  };

  const totalInProduction = orders.filter((o) => o.stage !== 'Entregue').length;
  const inDtgStage = orders.filter((o) => o.stage === 'Imprimindo DTG').length;
  const inTransitStage = orders.filter((o) => o.stage === 'Em Trânsito').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-1">
            <Factory className="w-4 h-4" />
            <span>Módulo 2 • Produção PoD, Multi-Supplier & Esteira Kanban</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Esteira de Produção & Amostras
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData()}
            className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-white transition-colors"
            title="Atualizar Esteira"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsSampleModalOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-xs tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Solicitar Amostra (Reserva INK)</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Na Esteira (Ativos)
          </span>
          <span className="text-2xl font-bold text-white block">{totalInProduction}</span>
          <span className="text-[10px] text-zinc-500">Pedidos em andamento</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
            Imprimindo DTG
          </span>
          <span className="text-2xl font-bold text-sky-400 block">{inDtgStage}</span>
          <span className="text-[10px] text-sky-500/80">Fábrica Reserva INK / Dimona</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
            Em Trânsito
          </span>
          <span className="text-2xl font-bold text-amber-400 block">{inTransitStage}</span>
          <span className="text-[10px] text-amber-500/80">Com código de rastreamento</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
            Amostras Drop 01
          </span>
          <span className="text-2xl font-bold text-emerald-400 block">{samples.length}</span>
          <span className="text-[10px] text-emerald-500/80">Homologação a preço custo</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-subtle)] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'kanban'
              ? 'bg-white text-black'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          1. Esteira Kanban PoD (5 Etapas)
        </button>

        <button
          onClick={() => setActiveTab('amostras')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'amostras'
              ? 'bg-white text-black'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          2. Gestão de Amostras Físicas ({samples.length})
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'suppliers'
              ? 'bg-white text-black'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          3. Multi-Supplier Hub (Fornecedores & Margem)
        </button>
      </div>

      {/* TAB 1: Esteira Kanban PoD (5 Etapas) */}
      {activeTab === 'kanban' && (
        <div className="space-y-4">
          {/* Supplier Filter Bar */}
          <div className="flex items-center justify-between bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" />
              Filtrar Pedidos por Fornecedor:
            </span>
            <div className="flex gap-2 font-mono text-xs">
              {[
                { id: 'ALL', label: 'Todos os Fornecedores' },
                { id: 'Reserva INK PoD', label: 'Reserva INK' },
                { id: 'Dimona PoD', label: 'Dimona PoD' },
                { id: 'Private Label CMT', label: 'Private Label' },
              ].map((sup) => (
                <button
                  key={sup.id}
                  onClick={() => setSupplierFilter(sup.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    supplierFilter === sup.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-white'
                  }`}
                >
                  {sup.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto min-w-[1000px] md:min-w-0">
            {KANBAN_STAGES.map((stage) => {
              const stageOrders = orders.filter((o) => {
                const matchesStage = o.stage === stage;
                const matchesSupplier =
                  supplierFilter === 'ALL' || o.supplier.toLowerCase().includes(supplierFilter.toLowerCase());
                return matchesStage && matchesSupplier;
              });

            return (
              <div
                key={stage}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
                  <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                    {stage}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 font-bold">
                    {stageOrders.length}
                  </span>
                </div>

                {/* Stage Cards Column */}
                <div className="flex-1 space-y-3">
                  {stageOrders.length === 0 ? (
                    <div className="py-12 text-center text-[11px] font-mono text-zinc-600 border border-dashed border-[var(--border-subtle)] rounded-lg">
                      Vazio
                    </div>
                  ) : (
                    stageOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-[var(--bg-main)] border border-[var(--border-subtle)] p-3 rounded-lg space-y-2.5 text-xs shadow-sm hover:border-[var(--border-hover)] transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono font-bold text-white">{ord.orderId}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                            {ord.supplier}
                          </span>
                        </div>

                        <div>
                          <span className="font-bold text-white block">{ord.item}</span>
                          <span className="text-[10px] text-[var(--text-muted)] block">
                            Tamanho: {ord.size} • {ord.customerName}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-1 border-t border-[var(--border-subtle)]">
                          <span>Custo: R$ {ord.costPrice.toFixed(2)}</span>
                          <span className="truncate max-w-[100px]" title={ord.trackingCode}>
                            {ord.trackingCode}
                          </span>
                        </div>

                        {/* Kanban Transition Controls */}
                        <div className="flex justify-between gap-1 pt-1">
                          <button
                            onClick={() => handleMoveStage(ord, 'prev')}
                            disabled={ord.stage === 'Aguardando'}
                            className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                            title="Voltar Etapa"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleMoveStage(ord, 'next')}
                            disabled={ord.stage === 'Entregue'}
                            className="p-1 rounded bg-white text-black font-bold hover:bg-zinc-200 disabled:opacity-30 transition-colors flex items-center gap-1 text-[10px] px-2 font-mono"
                            title="Avançar Etapa"
                          >
                            <span>Avançar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* TAB 2: Gestão de Amostras Físicas */}
      {activeTab === 'amostras' && (
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Amostras Físicas do Drop 01 (Preço de Custo)</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Validação de tecido (Algodão 100% Penteado), corte, costura e vibração da impressão DTG direto no Painel Reserva INK.
              </p>
            </div>

            <button
              onClick={() => setIsSampleModalOpen(true)}
              className="px-4 py-2 bg-white text-black font-mono font-bold text-xs rounded-lg hover:bg-zinc-200 transition-colors"
            >
              + Encomendar Amostra (~R$ 49)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {samples.map((samp) => (
              <div
                key={samp.id}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 rounded-xl space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                      {samp.supplier}
                    </span>
                    <h4 className="text-base font-bold text-white">{samp.artworkName}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    {samp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)]">
                  <div>
                    <span className="text-zinc-500 block">Tamanho:</span>
                    <span className="text-white font-bold">{samp.size}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Custo Amostra:</span>
                    <span className="text-emerald-400 font-bold">R$ {samp.costPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Rastreamento:</span>
                    <span className="text-white truncate block">{samp.trackingCode}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Previsão Chegada:</span>
                    <span className="text-white block">{samp.arrivedAt}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] italic">
                  "{samp.notes}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Multi-Supplier Hub */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fornecedor 1: Reserva INK */}
            <div className="bg-[var(--bg-card)] border-2 border-emerald-500/50 p-6 rounded-xl space-y-4 relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                PRINCIPAL ATIVO
              </div>
              <h3 className="text-lg font-bold text-white">Reserva INK PoD</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Integração nativa de Print on Demand com estoque zero, impressão DTG pura e envio rápido.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Custo Peça Pronta:</span>
                  <span className="text-white font-bold">R$ 49,00 a R$ 59,00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Margem Média:</span>
                  <span className="text-emerald-400 font-bold">~50% a 55% (R$ 122/pç)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Prazo de Impressão:</span>
                  <span className="text-white">3 a 5 dias úteis</span>
                </div>
              </div>
            </div>

            {/* Fornecedor 2: Dimona */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Dimona PoD</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Opção secundária para lote emergencial e alta variedade de cores e tecidos.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Custo Peça Pronta:</span>
                  <span className="text-white font-bold">R$ 47,50 a R$ 55,00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Margem Média:</span>
                  <span className="text-emerald-400 font-bold">~55%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Prazo de Impressão:</span>
                  <span className="text-white">4 a 6 dias úteis</span>
                </div>
              </div>
            </div>

            {/* Fornecedor 3: Private Label CMT */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Private Label CMT (Fase 2)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Blanks autorais STAR INK com facção de impressão DTG terceirizada.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Custo Peça Pronta:</span>
                  <span className="text-white font-bold">R$ 38,00 a R$ 42,00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Margem Média:</span>
                  <span className="text-cyan-400 font-bold">~65% a 70%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span>Prazo de Impressão:</span>
                  <span className="text-white">Lote Físico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solicitação de Amostra Reserva INK */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shirt className="w-5 h-5 text-emerald-400" />
                Solicitar Amostra Física (Preço de Custo)
              </h2>
              <button
                onClick={() => setIsSampleModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSampleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  Nome da Arte / Estampa *
                </label>
                <input
                  type="text"
                  required
                  value={sampleFormData.artworkName}
                  onChange={(e) => setSampleFormData({ ...sampleFormData, artworkName: e.target.value })}
                  placeholder="Ex: XVII. A ESTRELA"
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Tamanho *
                  </label>
                  <select
                    value={sampleFormData.size}
                    onChange={(e) => setSampleFormData({ ...sampleFormData, size: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  >
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                    Custo Estimado (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={sampleFormData.costPrice}
                    onChange={(e) => setSampleFormData({ ...sampleFormData, costPrice: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                  Observações / Objetivo do Teste
                </label>
                <textarea
                  rows={2}
                  value={sampleFormData.notes}
                  onChange={(e) => setSampleFormData({ ...sampleFormData, notes: e.target.value })}
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setIsSampleModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-white font-mono"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={requestingSample}
                  className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors font-mono flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{requestingSample ? 'Solicitando...' : 'Confirmar Pedido Amostra'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
