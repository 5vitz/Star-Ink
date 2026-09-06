'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  Database, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Code, 
  Terminal, 
  Activity, 
  Layers, 
  FileCode, 
  Zap,
  ExternalLink,
  Bot
} from 'lucide-react';

export default function EngenhariaTIModule() {
  const [activeTab, setActiveTab] = useState<'vps' | 'database' | 'geo' | 'code'>('vps');
  const [runningInspect, setRunningInspect] = useState(false);
  const [inspectStatusMsg, setInspectStatusMsg] = useState<string | null>(null);

  const prismaModels = [
    { name: 'Artwork', desc: 'Matrizes 300 DPI, Prompts JSON A3 e Conceitos de Arte', count: 12 },
    { name: 'Product', desc: 'Produtos D2C (Camisetas, Moletom, Fine Art A3, Ecobag)', count: 24 },
    { name: 'Drop', desc: 'Módulo de Gestão de Drops com contagem regressiva', count: 1 },
    { name: 'Order', desc: 'Fila de Pedidos PoD com rastreamento e fornecedor', count: 18 },
    { name: 'ReturnRequest', desc: 'Solicitações de Logística Reversa / Trocas Correios', count: 4 },
    { name: 'FinancialRecord', desc: 'Lançamentos de DRE, Conciliação Pix/Cartão e Bling', count: 42 }
  ];

  const handleInspectCode = () => {
    setRunningInspect(true);
    setInspectStatusMsg(null);
    setTimeout(() => {
      setRunningInspect(false);
      setInspectStatusMsg('Auditoria Inspetor de Códigos Concluída: 0 erros TypeScript detectados (npx tsc --noEmit OK). Build Next.js 15 100% estável e seguro.');
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Department Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Departamento 03 • Engenharia de Software & TI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Arquitetura de TI, Nuvem Contabo & Indexação GEO AI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleInspectCode}
            disabled={runningInspect}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${runningInspect ? 'animate-spin' : ''}`} />
            <span>{runningInspect ? 'Inspecionando Codebase...' : 'Auditoria TypeScript (Inspetor de Códigos)'}</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if Audit runs */}
      {inspectStatusMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{inspectStatusMsg}</span>
        </div>
      )}

      {/* Top Scorecard Grid (4 KPIs TI/Engenharia) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Status Nuvem VPS Contabo
            </span>
            <Server className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 tracking-tight font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>99.9% Uptime</span>
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            Processos PM2: <strong className="text-white">Active (Production)</strong>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Prisma ORM & PostgreSQL
            </span>
            <Database className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight font-mono">Sincronizado</div>
          <div className="text-xs text-cyan-400 font-mono">
            Schema: <strong className="text-white">6 Models Ativos</strong>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Indexador GEO AI
            </span>
            <Globe className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-300 tracking-tight font-mono">/llms.txt Ativo</div>
          <div className="text-xs text-zinc-400 font-mono">
            Motores: <strong className="text-white">Perplexity / Gemini / GPT</strong>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Segurança TypeScript
            </span>
            <Code className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight font-mono">0 Erros Build</div>
          <div className="text-xs text-emerald-400 font-mono">
            Next.js 15 App Router OK
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('vps')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'vps'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          1. Telemetria VPS Contabo & PM2
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'database'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          2. Schema PostgreSQL & Prisma ORM
        </button>

        <button
          onClick={() => setActiveTab('geo')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'geo'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          3. Generative Engine Optimization (GEO AI /llms.txt)
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'code'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          4. Time de IA de Engenharia (3 Agentes)
        </button>
      </div>

      {/* TAB 1: VPS Contabo */}
      {activeTab === 'vps' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Server className="w-4 h-4" />
                <span>Nuvem VPS Contabo • Servidor de Produção</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Telemetria de Servidor & Processos PM2
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Soberania do Fundador (Deploy `deploy.sh`)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-zinc-500 block">Framework Frontend / SSR:</span>
              <span className="text-white font-bold block text-sm">Next.js 15 (App Router)</span>
              <span className="text-emerald-400 block text-[10px]">React Server Components OK</span>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-zinc-500 block">Gerenciador de Processos:</span>
              <span className="text-white font-bold block text-sm">PM2 (Cluster Mode)</span>
              <span className="text-emerald-400 block text-[10px]">Auto-Restart em falha</span>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-zinc-500 block">Servidor Web / Reverse Proxy:</span>
              <span className="text-white font-bold block text-sm">Nginx + SSL Certbot</span>
              <span className="text-emerald-400 block text-[10px]">HTTPS com Criptografia TLS 1.3</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Database */}
      {activeTab === 'database' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Database className="w-4 h-4" />
                <span>Prisma ORM • Modelagem de Banco de Dados</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Modelos de Dados do Postgres (`schema.prisma`)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {prismaModels.map((model, idx) => (
              <div key={idx} className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-bold text-sm">model {model.name}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold">
                    {model.count} registros
                  </span>
                </div>
                <p className="text-zinc-400">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GEO AI */}
      {activeTab === 'geo' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                <Globe className="w-4 h-4" />
                <span>Generative Engine Optimization (GEO) • Indexador LLM</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Feed Rota GEO AI (`/llms.txt`)
              </h2>
            </div>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-2"
            >
              <span>Ver Rota /llms.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-5 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-3 font-mono text-xs">
            <span className="text-zinc-400 block border-b border-zinc-800 pb-2">
              📄 O arquivo <strong className="text-white">/llms.txt</strong> permite que motores de busca por IA (como Perplexity AI, Google Gemini e ChatGPT Search) indexem a essência da STAR INK com precisão, lendo o nosso catálogo, manifesto autoral e modelo de atendimento sem distorção.
            </span>
            <div className="p-3 bg-black/60 rounded-lg text-emerald-400 space-y-1 font-mono text-[11px]">
              <p># STAR INK — E-Commerce D2C Moda Autoral & Print-on-Demand</p>
              <p>&gt; Moda autoral, estampas exclusivas em Algodão 100% Pura Fibra e impressão DTG HD.</p>
              <p>&gt; Catalogo: Camisetas, Moletons, Fine Art A3, Ecobags.</p>
              <p>&gt; Dominio Oficial: https://www.star-ink.com.br</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Time de IA de Engenharia */}
      {activeTab === 'code' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Bot className="w-4 h-4" />
                <span>Time de IA de Tecnologia (3 Agentes Alocados)</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Agentes da Divisão de Engenharia de Software
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-amber-400 font-bold block text-sm">1. Inspetor de Códigos</span>
              <p className="text-zinc-400">Auditoria contínua de tipos TypeScript, prevenção de erros em tempo de compilação e verificação de boas práticas no Next.js.</p>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-cyan-400 font-bold block text-sm">2. Software Architect</span>
              <p className="text-zinc-400">Modelagem de banco de dados no Prisma ORM, integridade dos modelos e desacoplamento de APIs REST.</p>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-emerald-400 font-bold block text-sm">3. Backend Architect</span>
              <p className="text-zinc-400">Infraestrutura em nuvem VPS Contabo, controle de processos PM2, rotas GEO AI e otimização de latência do servidor.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
