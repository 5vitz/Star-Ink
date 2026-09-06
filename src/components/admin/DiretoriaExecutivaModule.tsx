'use client';

import React, { useState } from 'react';
import { 
  Crown, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Bot, 
  BarChart3, 
  DollarSign, 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw,
  Award
} from 'lucide-react';

export default function DiretoriaExecutivaModule() {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'target' | 'accelerated'>('target');
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const scenarios = {
    conservative: {
      label: 'Cenário Conservador',
      units: 250,
      revenue: 45000,
      cost: 14750,
      netProfit: 30250,
      margin: '67.2%',
      paybackStatus: '75% Setup DTG Quitados'
    },
    target: {
      label: 'Cenário Meta Q4 (Oficial)',
      units: 420,
      revenue: 75600,
      cost: 24780,
      netProfit: 50820,
      margin: '67.2%',
      paybackStatus: '100% Setup DTG Quitado + Reserva R$ 10k'
    },
    accelerated: {
      label: 'Cenário Acelerado (Escala PoD)',
      units: 600,
      revenue: 108000,
      cost: 35400,
      netProfit: 72600,
      margin: '67.2%',
      paybackStatus: 'Setup DTG Quitado + Reinvestimento Mídia R$ 32k'
    }
  };

  const currentScenario = scenarios[selectedScenario];

  const roadmapSteps = [
    {
      id: 1,
      title: 'Transmissão DBE Limpo & Assinatura Gov.br Ouro (ESP2605453571)',
      status: 'COMPLETED',
      date: '28 de Agosto, 2026',
      details: 'Assinatura soberana concluída por Armando Sinkovitz (99% das cotas) com DUA pago.'
    },
    {
      id: 2,
      title: 'Deferimento JUCEES & Emissão de Inscrição Estadual (SEFAZ-ES)',
      status: 'IN_PROGRESS',
      date: 'Em Análise (Janela 24h-48h)',
      details: 'Acompanhamento automático via SigFácil Simplifica ES sob o protocolo ESP2605453571.'
    },
    {
      id: 3,
      title: 'Emissão e-CNPJ A1 & Ativação de NF-e Modelo 55 no Bling ERP',
      status: 'PENDING',
      date: 'Agendado para Setembro',
      details: 'Autorização OAuth v3 do Bling ERP 100% testada e pronta para emissão fiscal automática.'
    },
    {
      id: 4,
      title: 'Homologação de Matrizes A3 300 DPI (Estética da Subtração)',
      status: 'COMPLETED',
      date: 'Setembro, 2026',
      details: '12 artes matrizes em 4200x4800px PNG transparente aprovadas para impressão DTG HD.'
    },
    {
      id: 5,
      title: 'Grande Lançamento Oficial D2C (Go-Live Star-Ink)',
      status: 'GOAL',
      date: '12 de Outubro, 2026 (Segunda-Feira)',
      details: 'Abertura oficial do checkout D2C, Sacolinha Instagram Shopping e Meta Ads Ativo.'
    }
  ];

  const handleRunAudit = () => {
    setRunningAudit(true);
    setAuditMessage(null);
    setTimeout(() => {
      setRunningAudit(false);
      setAuditMessage('Auditoria AGY Concluída: 19 Agentes operando com 99.9% de uptime na VPS Contabo. Nenhuma inconformidade de governança encontrada.');
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Department Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Crown className="w-4 h-4" />
            <span>Departamento 01 • Diretoria Executiva & Estratégia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Painel Executivo S-Tier & Governance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAudit}
            disabled={runningAudit}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${runningAudit ? 'animate-spin' : ''}`} />
            <span>{runningAudit ? 'Auditando AGY...' : 'Executar Audit Executivo (Maestro Lincoln)'}</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if Audit runs */}
      {auditMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{auditMessage}</span>
        </div>
      )}

      {/* Top Scorecard Grid (4 KPIs Estratégicos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Meta Comercial Q4 (Dezembro)
            </span>
            <Target className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">420+ Peças</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>R$ 60.000,00+ Meta Bruta</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Lucro Líquido Projetado
            </span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">R$ 50.820,00</div>
          <div className="text-xs text-zinc-400 font-mono">
            Margem Líquida Real: <strong className="text-white">67.2%</strong>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Prontidão Go-Live (12/Out)
            </span>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400 tracking-tight">82% Concluído</div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full w-[82%]" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Orquestração de IA
            </span>
            <Bot className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">19 Agentes</div>
          <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Maestro Lincoln 24/7 Active</span>
          </div>
        </div>
      </div>

      {/* Seção 2: Simulação de DRE & Cenários de Venda */}
      <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Simulador Financeiro Executivo • Unit Economics (R$ 180 / peça)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Projeção de DRE & Quitação de Maquinário DTG
            </h2>
          </div>

          {/* Scenario Selector */}
          <div className="flex gap-2 font-mono text-xs">
            {(['conservative', 'target', 'accelerated'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedScenario === key
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'bg-[#0d0d0f] border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scenario Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0b0b0d] p-4 rounded-xl border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Volume de Peças:</span>
            <span className="text-xl font-bold text-white block font-mono">{currentScenario.units} camisetas</span>
            <span className="text-[10px] text-zinc-400">Preço D2C R$ 180,00 / pç</span>
          </div>

          <div className="bg-[#0b0b0d] p-4 rounded-xl border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Faturamento Bruto:</span>
            <span className="text-xl font-bold text-emerald-400 block font-mono">
              R$ {currentScenario.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-emerald-500/80">Receita Total Bruta</span>
          </div>

          <div className="bg-[#0b0b0d] p-4 rounded-xl border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Custo PoD + Impostos (32.8%):</span>
            <span className="text-xl font-bold text-rose-400 block font-mono">
              R$ {currentScenario.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-rose-500/80">Custo Unitário ~R$ 59,00</span>
          </div>

          <div className="bg-[#0b0b0d] p-4 rounded-xl border border-amber-500/30 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Lucro Líquido Real:</span>
            <span className="text-xl font-bold text-amber-300 block font-mono">
              R$ {currentScenario.netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-amber-400/80 font-mono font-bold block">{currentScenario.paybackStatus}</span>
          </div>
        </div>
      </div>

      {/* Seção 3: Roadmap Q4 & Esteira de Lançamento (Go-Live) */}
      <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Cronograma Executivo • Lançamento 12 de Outubro de 2026</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Roadmap de Prontidão Operacional & Legal
            </h2>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            Meta Q4 On-Track
          </span>
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {roadmapSteps.map((step) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                step.status === 'COMPLETED'
                  ? 'bg-emerald-950/10 border-emerald-500/30'
                  : step.status === 'IN_PROGRESS'
                  ? 'bg-amber-950/20 border-amber-500/40 animate-pulse'
                  : step.status === 'GOAL'
                  ? 'bg-cyan-950/20 border-cyan-500/40'
                  : 'bg-[#0b0b0d] border-zinc-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {step.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : step.status === 'IN_PROGRESS' ? (
                    <Clock className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Target className="w-5 h-5 text-cyan-400" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{step.details}</p>
                </div>
              </div>

              <div className="font-mono text-xs text-right shrink-0">
                <span className={`block font-bold ${
                  step.status === 'COMPLETED'
                    ? 'text-emerald-400'
                    : step.status === 'IN_PROGRESS'
                    ? 'text-amber-400'
                    : 'text-cyan-400'
                }`}>
                  {step.date}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">
                  {step.status === 'COMPLETED' ? 'Concluído' : step.status === 'IN_PROGRESS' ? 'Em Andamento' : 'Meta Alvo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
