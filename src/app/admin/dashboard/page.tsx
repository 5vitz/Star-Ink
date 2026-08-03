'use client';

import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Shirt, 
  AlertCircle, 
  MessageSquare, 
  ArrowRight, 
  Headphones, 
  Factory, 
  FolderKanban, 
  Receipt,
  CheckCircle2,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Header */}
      <AdminHeader />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        
        {/* Page Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] tracking-wide text-white">
              Painel de Controle — Cockpit Executivo
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Visão geral da operação em tempo real, vendas, esteira PoD e saúde financeira da STAR INK.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono text-[var(--text-muted)]">Última sync:</span>
            <span className="text-xs font-mono text-[var(--accent-cyan)] flex items-center gap-1 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
              <RefreshCw className="w-3 h-3 animate-spin" /> Agora mesmo
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOCO 1: KPIs Executivos do Dia (Cards de Topo) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* KPI 1: Vendas Hoje */}
          <div className="glass-panel p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Vendas Hoje</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-[var(--font-heading)] tracking-tight">R$ 1.800,00</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
              <span>+15% em relação a ontem</span>
              <span className="text-[var(--text-muted)]">(10 camisetas)</span>
            </div>
          </div>

          {/* KPI 2: Lucro Líquido Real */}
          <div className="glass-panel p-5 relative overflow-hidden group border-[var(--border-accent)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Lucro Líquido Real</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[var(--accent-cyan)]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-[var(--font-heading)] tracking-tight">R$ 1.250,00</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--accent-cyan)] font-medium">
              <span className="px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">69.4% Margem Líquida</span>
            </div>
          </div>

          {/* KPI 3: Pedidos PIX */}
          <div className="glass-panel p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Conversão PIX</span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-[var(--font-heading)] tracking-tight">80%</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--text-secondary)]">
              <span>8 de 10 compras via PIX com desconto</span>
            </div>
          </div>

          {/* KPI 4: Peças em Produção */}
          <div className="glass-panel p-5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Peças em Produção</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Shirt className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white font-[var(--font-heading)] tracking-tight">12 un</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-medium">
              <span>Esteira Reserva INK ativa</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BLOCO 2 & BLOCO 3: Alertas de Ação + Cards de Navegação entre Módulos */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* BLOCO 2: Alertas de Ação Imediata (Esquerda - 6 Cols) */}
          <div className="lg:col-span-6 glass-panel p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-rose)] animate-ping"></div>
                <h2 className="text-lg font-bold font-[var(--font-heading)] text-white">Alertas de Ação Imediata</h2>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono">2 pendências</span>
            </div>

            <div className="space-y-4">
              
              {/* Alerta 1: Pedidos PIX Pendentes */}
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">2 Pedidos PIX aguardando confirmação</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Pedido #1002 e #1003 aguardando validação de comprovante.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link 
                    href="/admin/atendimento" 
                    className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors shadow-sm text-center"
                    id="btn-aprovar-pix"
                  >
                    Aprovar Pedido
                  </Link>
                </div>
              </div>

              {/* Alerta 2: Dúvida de Tamanho WhatsApp */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">1 Dúvida de Tamanho no WhatsApp</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Cliente Ana Silva perguntou sobre caimento da Camiseta A Fada G.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link 
                    href="/admin/atendimento" 
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors text-center"
                    id="btn-responder-wa"
                  >
                    Responder no WhatsApp
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* BLOCO 3: Cards de Acesso Rápido aos Módulos (Direita - 6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card Módulo 1 */}
              <Link 
                href="/admin/atendimento" 
                className="glass-panel p-5 flex flex-col justify-between hover:bg-[var(--bg-card-hover)] transition-all group"
                id="card-modulo-1"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-[var(--font-heading)] text-white">1. Atendimento Concierge</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    CRM de clientes, WhatsApp 1-click, IA 24h e logístico.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-4">
                  <span>Acessar Módulo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card Módulo 2 */}
              <Link 
                href="/admin/producao" 
                className="glass-panel p-5 flex flex-col justify-between hover:bg-[var(--bg-card-hover)] transition-all group"
                id="card-modulo-2"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[var(--accent-cyan)] mb-3 group-hover:scale-110 transition-transform">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-[var(--font-heading)] text-white">2. Produção PoD</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    Esteira Kanban 5 etapas, Reserva INK e amostras.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-cyan)] mt-4">
                  <span>Acessar Módulo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card Módulo 3 */}
              <Link 
                href="/admin/catalogo" 
                className="glass-panel p-5 flex flex-col justify-between hover:bg-[var(--bg-card-hover)] transition-all group"
                id="card-modulo-3"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-[var(--font-heading)] text-white">3. Catálogo & Mídias</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    Prompts JSON A3, mídias 9:16 e Feed Meta XML.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 mt-4">
                  <span>Acessar Módulo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card Módulo 4 */}
              <Link 
                href="/admin/financeiro" 
                className="glass-panel p-5 flex flex-col justify-between hover:bg-[var(--bg-card-hover)] transition-all group"
                id="card-modulo-4"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-[var(--font-heading)] text-white">4. Financeiro & Bling</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    Margem real (R$ 122/peça), DRE e NFe Bling ERP.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 mt-4">
                  <span>Acessar Módulo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BLOCO 4: Feed de Atividades do Ecossistema em Tempo Real (Timeline) */}
        {/* ========================================================================= */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold font-[var(--font-heading)] text-white">Feed de Atividades do Ecossistema</h2>
            <span className="text-xs text-[var(--text-muted)] font-mono">Atualizações em tempo real</span>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[var(--border-subtle)]">
            
            {/* Log Item 1 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 z-10">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Novo pedido #1002 recebido via PIX</span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">15:39</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Cliente de São Paulo/SP comprou 1x Camiseta A Fada Oversized (Tamanho G). Valor: R$ 180,00.
                </p>
              </div>
            </div>

            {/* Log Item 2 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-[var(--accent-cyan)] shrink-0 z-10">
                <Shirt className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Peça 'Arte 02 - A Fada' enviada para impressão DTG</span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">15:38</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Ordem de produção disparada via API para a esteira da Reserva INK (Algodão 100% Penteado).
                </p>
              </div>
            </div>

            {/* Log Item 3 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 z-10">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-[var(--bg-main)] p-3 rounded-lg border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Feed XML sincronizado com o Instagram Shopping</span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">15:34</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Catálogo Meta Commerce Manager atualizado com os 12 produtos homologados do Drop 01.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
