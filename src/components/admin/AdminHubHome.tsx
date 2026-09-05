'use client';

import React from 'react';
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
  ArrowRight, 
  ShieldCheck, 
  Server, 
  Sparkles, 
  RefreshCw,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

export default function AdminHubHome() {
  const departments = [
    {
      id: '01_DIRETORIA',
      code: '01',
      title: 'Diretoria Executiva & Estratégia',
      subtitle: 'Visão Macro, KPIs Globais, Roadmap Q4 & Governance',
      agents: ['Maestro Lincoln (Orquestrador)', 'Armando (Decisor Soberano)'],
      href: '/admin/dashboard',
      icon: Crown,
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      badgeText: 'Bling ERP v3 Conectado',
      kpiLabel: 'Lucro Líquido / Peça',
      kpiValue: 'R$ 122,00 (67.7%)',
      kpiSub: 'Conciliação Pix D+0 & Cartão'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Status (24/7 Cloud Telemetry) */}
      <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 fill-[var(--accent-cyan)]" />
              <span>STAR INK COCKPIT • Sistema de Governança Agêntica 1:1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Central de Comando dos 8 Departamentos
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🟢 19 AGENTES DE IA ATIVOS • VPS CONTABO ONLINE</span>
            </div>

            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-zinc-400 hover:text-white transition-colors"
              title="Atualizar Telemetria"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-4xl font-mono">
          Operação solo-founder alavancada por 19 Agentes de IA em nuvem. Cada um dos 8 departamentos possui sua própria telemetria em tempo real, time de IA dedicado e alça de governança humana.
        </p>
      </div>

      {/* Grid dos 8 Departamentos (2x4 / 4x2 Responsivo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => {
          const Icon = dept.icon;
          return (
            <Link
              key={dept.id}
              href={dept.href}
              className={`bg-[var(--bg-card)] border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-b ${dept.color} ${dept.borderColor}`}
            >
              {/* Card Top: Number, Icon & Status Badge */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {dept.code}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[var(--accent-cyan)]" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${dept.badgeColor} truncate max-w-[140px]`}>
                    {dept.badgeText}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[var(--accent-cyan)] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {dept.subtitle}
                  </p>
                </div>
              </div>

              {/* Middle KPI Highlight Box */}
              <div className="bg-[var(--bg-main)] border border-[var(--border-subtle)] p-3 rounded-xl space-y-1 font-mono">
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  {dept.kpiLabel}
                </span>
                <span className="text-sm font-bold text-white block">
                  {dept.kpiValue}
                </span>
                <span className="text-[10px] text-zinc-500 block truncate">
                  {dept.kpiSub}
                </span>
              </div>

              {/* Bottom Agents List & Access Button */}
              <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Agentes Alocados:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dept.agents.map((agent, idx) => (
                      <span key={idx} className="text-[9px] font-mono bg-white/5 text-zinc-300 px-1.5 py-0.5 rounded border border-white/10">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-cyan)] pt-1 group-hover:translate-x-1 transition-transform">
                  <span>Abrir Painel do Departamento</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
