'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Crown, 
  Scale, 
  Cpu, 
  PackageCheck, 
  SearchCheck, 
  TrendingUp, 
  Palette, 
  Landmark, 
  RefreshCw,
  Zap,
  ChevronRight,
  Bot,
  X,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { AgentFleetOverview, AgentTelemetrySpec } from '@/lib/agents/telemetry';

export default function AdminHubHome() {
  const [telemetry, setTelemetry] = useState<AgentFleetOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentTelemetrySpec | null>(null);

  // Busca dados de telemetria da frota agêntica
  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agents/telemetry');
      if (res.ok) {
        const data: AgentFleetOverview = await res.json();
        setTelemetry(data);
      }
    } catch (err) {
      console.warn('Usando telemetria estática local para os 19 Agentes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const departments = [
    {
      id: '01_DIRETORIA',
      code: '01',
      title: 'Diretoria Executiva & Estratégia',
      subtitle: 'Visão Macro, KPIs Globais, Roadmap Q4 & Governance',
      agents: ['Maestro Lincoln (Orquestrador)', 'Armando (Decisor Soberano)'],
      href: '/admin/dashboard',
      icon: Crown,
      badgeText: 'Orquestração Ativa',
      kpiLabel: 'Meta Comercial Q4',
      kpiValue: '420+ peças / R$ 60k',
      kpiSub: '82% Prontidão para Lançamento'
    },
    {
      id: '02_JURIDICO',
      code: '02',
      title: 'Jurídico, Fiscal & Compliance',
      subtitle: 'Contratos JUCEES, Marca INPI, LGPD & DAS Simples',
      agents: ['Dr. Lex (JusChat)', 'Tax & Fiscal Bot'],
      href: '/admin/dashboard',
      icon: Scale,
      badgeText: 'JUCEES ESP2605453571',
      kpiLabel: 'Marca INPI',
      kpiValue: 'Processo 944841171',
      kpiSub: 'Prioridade Garantida 16/Ago'
    },
    {
      id: '03_ENGENHARIA',
      code: '03',
      title: 'Engenharia de Software & TI',
      subtitle: 'Next.js 15, Prisma/Postgres, VPS Contabo & Rotas GEO',
      agents: ['Minimal Change Engineer', 'Software Architect', 'Backend Architect'],
      href: '/admin/dashboard',
      icon: Cpu,
      badgeText: 'VPS Contabo 99.9% Uptime',
      kpiLabel: 'Rotas GEO AI',
      kpiValue: '/llms.txt Ativo',
      kpiSub: 'Indexador Gemini & Perplexity'
    },
    {
      id: '04_OPERACOES',
      code: '04',
      title: 'Operações & Logística PoD',
      subtitle: 'Esteira Reserva INK, Rastreio Melhor Envio & Unboxing',
      agents: ['PoD Dispatch Agent', 'Logistics Tracker'],
      href: '/admin/producao',
      icon: PackageCheck,
      badgeText: 'Reserva INK 48h SLA',
      kpiLabel: 'Estoque Insumos',
      kpiValue: 'Ziplock Fosco OK',
      kpiSub: 'Roteamento 300 DPI Validador'
    },
    {
      id: '05_SAC',
      code: '05',
      title: 'SAC, Pós-Venda & Discriminador',
      subtitle: 'Triagem de Defeitos, Logística Reversa & WhatsApp 24/7',
      agents: ['Agente Discriminador', 'Concierge IA 24/7'],
      href: '/admin/atendimento',
      icon: SearchCheck,
      badgeText: 'Concierge 24/7 Ativo',
      kpiLabel: 'Portal de Trocas',
      kpiValue: '/trocas Operacional',
      kpiSub: '0 Trocas Pendentes'
    },
    {
      id: '06_MARKETING',
      code: '06',
      title: 'Marketing, Growth & Mídias',
      subtitle: 'Meta Ads R$ 15/dia, Sacolinha Instagram & Vitrine 9:16',
      agents: ['Traffic Manager', 'Feed & Visual Curator', 'Content Creator'],
      href: '/admin/catalogo',
      icon: TrendingUp,
      badgeText: 'Sacolinha IG Sincronizada',
      kpiLabel: 'Mídia Paga Meta',
      kpiValue: 'R$ 15,00 / dia',
      kpiSub: 'Estratégia Dual-Store Active'
    },
    {
      id: '07_ATELIER',
      code: '07',
      title: 'Atelier de Artes & Prompts',
      subtitle: 'Estética da Subtração, JSON Prompts A3 & 300 DPI Matrizes',
      agents: ['ASK Nexus', 'PLAN Narrative', 'Artwork Architect'],
      href: '/admin/catalogo',
      icon: Palette,
      badgeText: '12 Artes Matrizes A3',
      kpiLabel: 'Proof of Concept',
      kpiValue: 'Prompts JSON A3',
      kpiSub: 'Impressão DTG HD 4200x4800px'
    },
    {
      id: '08_FINANCEIRO',
      code: '08',
      title: 'Financeiro, Contabilidade & Unit Econ.',
      subtitle: 'DRE Gerencial, Margem R$ 122/pç, Conciliação & Bling NFe',
      agents: ['CFO Virtual & FP&A', 'Financial Reconciler', 'Unit Economics Engineer'],
      href: '/admin/financeiro',
      icon: Landmark,
      badgeText: 'Bling ERP v3 Conectado',
      kpiLabel: 'Lucro Líquido / Peça',
      kpiValue: 'R$ 122,00 (67.7%)',
      kpiSub: 'Conciliação Pix D+0 & Cartão'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Status (24/7 Cloud Telemetry) */}
      <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 fill-[var(--accent-cyan)]" />
              <span>STAR INK COCKPIT • Arquitetura Descentralizada Orientada a Agente</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Central de Comando dos 8 Departamentos
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🟢 {telemetry ? `${telemetry.totalAgents} AGENTES DE IA ATIVOS` : '19 AGENTES DE IA ATIVOS'} • VPS CONTABO ONLINE</span>
            </div>

            <button
              onClick={fetchTelemetry}
              className={`p-2 rounded-lg border border-zinc-800 bg-[#0d0d0f] text-zinc-400 hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`}
              title="Atualizar Telemetria dos Agentes"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed max-w-4xl font-mono">
          Operação solo-founder alavancada por 19 Agentes de IA em nuvem. Cada um dos 8 departamentos possui sua própria telemetria em tempo real, time de IA dedicado e alça de governança humana.
        </p>
      </div>

      {/* Grid dos 8 Departamentos (2x4 / 4x2 Responsivo) com Fundo Cinza Chumbo Sólido (#131316) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const deptTelemetry = telemetry?.departments.find(d => d.code === dept.code);

          return (
            <div
              key={dept.id}
              className="bg-[#131316] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl shadow-xl"
            >
              {/* Card Top: Number, Icon & Status Badge */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      {dept.code}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[var(--accent-cyan)]" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-amber-500/10 text-amber-300 border-amber-500/30 truncate max-w-[140px]">
                    {dept.badgeText}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[var(--accent-cyan)] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {dept.subtitle}
                  </p>
                </div>
              </div>

              {/* Middle KPI Highlight Box (Fundo Escuro Sólido) */}
              <div className="bg-[#0b0b0d] border border-zinc-800/60 p-3 rounded-xl space-y-1 font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  {dept.kpiLabel}
                </span>
                <span className="text-sm font-bold text-white block">
                  {dept.kpiValue}
                </span>
                <span className="text-[10px] text-zinc-400 block truncate">
                  {dept.kpiSub}
                </span>
              </div>

              {/* Bottom Agents List & Access Button */}
              <div className="pt-3 border-t border-zinc-800/60 space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Agentes de IA Alocados:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {deptTelemetry
                      ? deptTelemetry.agents.map((agent) => (
                          <button
                            key={agent.id}
                            onClick={() => setSelectedAgent(agent)}
                            className="text-[9px] font-mono bg-black/40 hover:bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 transition-colors"
                            title="Clique para inspecionar a telemetria do Agente"
                          >
                            <Bot className="w-3 h-3 text-amber-400" />
                            <span>{agent.name}</span>
                          </button>
                        ))
                      : dept.agents.map((agent, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-black/40 text-zinc-300 px-1.5 py-0.5 rounded border border-white/10">
                            {agent}
                          </span>
                        ))}
                  </div>
                </div>

                <Link
                  href={dept.href}
                  className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-cyan)] pt-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Abrir Painel do Departamento</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Drawer de Inspeção do Agente Selecionado */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131316] border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                  Telemetria Agêntica • Depto {selectedAgent.departmentCode}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedAgent.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {selectedAgent.role}
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-[#0b0b0d] p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400">Status Operacional:</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ONLINE (Ativo em Nuvem)</span>
                </span>
              </div>

              <div className="flex justify-between items-center bg-[#0b0b0d] p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400">Última Execução de Rotina:</span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedAgent.lastRun}</span>
                </span>
              </div>

              <div className="bg-[#0b0b0d] p-3 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block text-[10px] uppercase">Métrica / KPI de Governança:</span>
                <span className="text-white font-bold block">{selectedAgent.kpiHighlight}</span>
              </div>

              <div className="bg-[#0b0b0d] p-3 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-zinc-400 block text-[10px] uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[var(--accent-cyan)]" />
                  <span>Logs de Execução Recentes:</span>
                </span>
                <div className="space-y-1 text-[11px] text-zinc-300">
                  {selectedAgent.recentLogs.map((log, idx) => (
                    <div key={idx} className="bg-black/50 p-2 rounded border border-white/5">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Fechar Inspeção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
