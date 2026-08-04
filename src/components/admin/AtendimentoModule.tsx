'use client';

import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Search, 
  MessageCircle, 
  Bot, 
  UserCheck, 
  RefreshCw, 
  Send, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Phone,
  Mail,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Customer, ReturnRequest } from '@/lib/concierge';

export default function AtendimentoModule() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'crm' | 'trocas'>('crm');

  // Slide-over drawer state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatRole, setChatRole] = useState<'customer' | 'human'>('customer');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [lastFunctionCalled, setLastFunctionCalled] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resCust, resRet] = await Promise.all([
        fetch('/api/concierge/customers'),
        fetch('/api/trocas'),
      ]);

      if (resCust.ok) {
        const custData = await resCust.json();
        setCustomers(custData);
      }
      if (resRet.ok) {
        const retData = await resRet.json();
        setReturnRequests(retData);
      }
    } catch (err) {
      console.error('Erro ao carregar dados do atendimento:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedCustomer) return;

    setSendingMsg(true);
    const msgText = chatInput;
    setChatInput('');

    try {
      const res = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: selectedCustomer.id,
          message: msgText,
          sender: chatRole,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSelectedCustomer(data.customer);
        if (data.functionCalled) {
          setLastFunctionCalled(data.functionCalled);
        }
        // Update main list
        setCustomers((prev) =>
          prev.map((c) => (c.id === data.customer.id ? data.customer : c))
        );
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem no chat:', err);
    } finally {
      setSendingMsg(false);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalLtv = customers.reduce((sum, c) => sum + c.ltv, 0);
  const totalTrocas = returnRequests.length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <Headphones className="w-4 h-4" />
            <span>Módulo 1 • SAC Concierge & IA 24/7 (Gemini API)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Atendimento Concierge & Trocas
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData()}
            className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-white transition-colors"
            title="Atualizar Dados"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/trocas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold hover:bg-emerald-500/20 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Portal /trocas</span>
          </a>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
            Clientes no CRM
          </span>
          <span className="text-2xl font-bold text-white block">{customers.length}</span>
          <span className="text-[10px] text-zinc-500">Cadastrados com histórico</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
            IA Concierge 24/7 (Gemini)
          </span>
          <span className="text-2xl font-bold text-emerald-400 block">Ativa 24h</span>
          <span className="text-[10px] text-emerald-500/80">Function Calling Habilitado</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
            Trocas / Reversa
          </span>
          <span className="text-2xl font-bold text-amber-400 block">{totalTrocas}</span>
          <span className="text-[10px] text-amber-500/80">Códigos Correios gerados</span>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
            LTV Acumulado CRM
          </span>
          <span className="text-2xl font-bold text-cyan-400 block">
            R$ {totalLtv.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-[10px] text-cyan-500/80">Valor de vida dos clientes</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-subtle)] pb-2">
        <button
          onClick={() => setActiveTab('crm')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'crm'
              ? 'bg-white text-black'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          1. CRM Clientes & Atendimento 1-Click ({customers.length})
        </button>

        <button
          onClick={() => setActiveTab('trocas')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'trocas'
              ? 'bg-white text-black'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          2. Central de Trocas & Devoluções ({totalTrocas})
        </button>
      </div>

      {/* TAB 1: CRM Clientes */}
      {activeTab === 'crm' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, telefone ou e-mail..."
              className="w-full pl-9 pr-3 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
            />
          </div>

          {/* Customer Table List */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-4">Contato / CPF</th>
                    <th className="py-3 px-4">Tamanho Pref.</th>
                    <th className="py-3 px-4">LTV / Pedidos</th>
                    <th className="py-3 px-4">Última Interação</th>
                    <th className="py-3 px-4 text-right">Ações Concierge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                            {cust.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block">{cust.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              {cust.status}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[var(--text-secondary)]">
                        <span className="block text-white">{cust.phone}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{cust.email}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-white font-bold">
                          {cust.preferredSize}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="block font-bold text-white">
                          R$ {cust.ltv.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {cust.totalOrders} pedido(s)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[var(--text-muted)]">
                        {cust.lastInteraction}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* WhatsApp 1-Click Direct Link */}
                          <a
                            href={`https://wa.me/${cust.phone}?text=${encodeURIComponent(
                              `Olá ${cust.name}! Aqui é o Concierge da STAR INK. Como posso te ajudar com o seu pedido?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp 1-Click</span>
                          </a>

                          {/* Open Drawer / IA Simulator */}
                          <button
                            onClick={() => setSelectedCustomer(cust)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white font-mono text-[11px] transition-colors flex items-center gap-1.5"
                          >
                            <Bot className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Simular IA & Histórico</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Central de Trocas */}
      {activeTab === 'trocas' && (
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Central de Logística Reversa Correios</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Solicitações feitas pelos clientes no portal <span className="font-mono text-emerald-400">star-ink.com.br/trocas</span>.
              </p>
            </div>

            <a
              href="/trocas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white text-black text-xs font-mono font-bold hover:bg-zinc-200 transition-colors"
            >
              Testar Portal /trocas ➔
            </a>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <th className="py-3 px-4">Código Correios</th>
                    <th className="py-3 px-4">Pedido / Cliente</th>
                    <th className="py-3 px-4">Item a Trocar</th>
                    <th className="py-3 px-4">Motivo</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {returnRequests.map((ret) => (
                    <tr key={ret.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        {ret.postageCode}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="block text-white font-bold">{ret.orderId}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{ret.customerName}</span>
                      </td>

                      <td className="py-3.5 px-4 text-white">
                        {ret.item}
                      </td>

                      <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                        {ret.reason}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                          {ret.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Drawer (Histórico + Simulador Gemini IA 24/7) */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[var(--bg-card)] border-l border-[var(--border-subtle)] h-full flex flex-col shadow-2xl animate-fade-in">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-main)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{selectedCustomer.name}</h2>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {selectedCustomer.phone} • LTV: R$ {selectedCustomer.ltv.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-[var(--text-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Customer Infos & Orders + Chat Simulator */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Customer Private Notes & Sizes */}
              <div className="p-3 bg-[var(--bg-main)] rounded-xl border border-[var(--border-subtle)] space-y-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Notas Privadas & Preferências
                </span>
                <p className="text-xs text-[var(--text-secondary)]">{selectedCustomer.notes}</p>
                <div className="flex gap-4 pt-1 text-xs font-mono">
                  <span>Tamanho Pref: <strong className="text-white">{selectedCustomer.preferredSize}</strong></span>
                  <span>CPF: <strong className="text-white">{selectedCustomer.cpf}</strong></span>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  Histórico de Pedidos
                </span>
                <div className="space-y-2">
                  {selectedCustomer.orders.map((ord, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[var(--bg-main)] rounded-xl border border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <span className="text-white font-bold block">{ord.orderId}</span>
                        <span className="text-[10px] text-zinc-400">{ord.items.join(', ')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold block">R$ {ord.total.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Concierge Chat Simulator Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Simulador Webhook WhatsApp + Gemini IA 24/7
                  </span>

                  {lastFunctionCalled && (
                    <span className="text-[10px] font-mono bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded">
                      Function: {lastFunctionCalled}
                    </span>
                  )}
                </div>

                {/* Chat History Messages Box */}
                <div className="bg-black/60 border border-[var(--border-subtle)] rounded-xl p-4 h-64 overflow-y-auto space-y-3 font-sans">
                  {selectedCustomer.chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === 'customer'
                          ? 'items-start'
                          : msg.sender === 'ai'
                          ? 'items-end'
                          : 'items-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                          msg.sender === 'customer'
                            ? 'bg-zinc-800 text-white rounded-tl-none'
                            : msg.sender === 'ai'
                            ? 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                            : 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-100 rounded-tr-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono opacity-60">
                          <span>
                            {msg.sender === 'customer'
                              ? selectedCustomer.name
                              : msg.sender === 'ai'
                              ? 'Gemini IA 24/7'
                              : 'Genera (Humano)'}
                          </span>
                          <span>{msg.time}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Role Switcher & Send Form */}
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">Enviar mensagem como:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setChatRole('customer')}
                        className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                          chatRole === 'customer'
                            ? 'bg-white text-black font-bold'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        Simular Cliente
                      </button>
                      <button
                        type="button"
                        onClick={() => setChatRole('human')}
                        className={`px-2.5 py-1 rounded text-[10px] transition-colors ${
                          chatRole === 'human'
                            ? 'bg-emerald-500 text-white font-bold'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        Atendente Humano
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={
                        chatRole === 'customer'
                          ? 'Digite como cliente (ex: Gostaria de trocar por tamanho G...)'
                          : 'Digite como atendente humano...'
                      }
                      className="flex-1 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] font-mono"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg}
                      className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-zinc-200 transition-colors font-mono flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingMsg ? '...' : 'Enviar'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
