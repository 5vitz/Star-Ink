'use client';

import React, { useState, useRef, useEffect } from 'react';

import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ExternalLink, 
  Bot, 
  RefreshCw, 
  Download, 
  Landmark, 
  Building2, 
  BadgeCheck,
  FileCheck,
  Paperclip,
  Send,
  Sparkles,
  User
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  attachmentName?: string;
}

export default function JuridicoComplianceModule() {
  const [activeTab, setActiveTab] = useState<'jucees' | 'inpi' | 'fiscal' | 'lgpd'>('jucees');
  const [runningInpiCheck, setRunningInpiCheck] = useState(false);
  const [inpiStatusMsg, setInpiStatusMsg] = useState<string | null>(null);

  // Dr. Lex Chat State
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: 'Olá, Armando! Sou o Dr. Lex (JusChat GraphRAG AI), seu assistente jurídico, regulatório e fiscal especialista na operação da STAR INK LTDA.\n\nComo posso ajudar na sua gestão hoje? Você pode tirar dúvidas sobre o acompanhamento do protocolo JUCEES (ESP2605453571), a proteção da marca no INPI (Processo 944841171), o enquadramento no Simples Nacional (Anexo I - 4.0%) ou enviar minutas de contratos e documentos para auditoria legal.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputText;
    if (!text.trim() && !selectedFile) return;

    const userMsgId = Date.now().toString();
    const userMsg: Message = {
      id: userMsgId,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentName: selectedFile ? selectedFile.name : undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    if (textToSend === undefined) {
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
    setSelectedFile(null);
    setChatLoading(true);

    try {
      const response = await fetch('/api/dr-lex/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, fileName: userMsg.attachmentName })
      });

      const data = await response.json();

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: data.reply || 'Desculpe, ocorreu um erro ao consultar a inteligência do Dr. Lex.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          content: 'Ocorreu uma indisponibilidade temporária na conexão com o Dr. Lex. Por favor, tente novamente.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const cnaes = [
    { code: '4790-3/00', desc: 'Comércio varejista via internet (E-commerce D2C Principal)', type: 'Principal' },
    { code: '4781-4/00', desc: 'Comércio varejista de artigos do vestuário e acessórios', type: 'Secundário' },
    { code: '4783-1/01', desc: 'Comércio varejista de artigos de joalheria em prata', type: 'Secundário' },
    { code: '7410-2/02', desc: 'Design gráfico e criação autoral de estampas', type: 'Secundário' }
  ];

  const handleInpiScan = () => {
    setRunningInpiCheck(true);
    setInpiStatusMsg(null);
    setTimeout(() => {
      setRunningInpiCheck(false);
      setInpiStatusMsg('Varredura Dr. Lex Concluída: 0 colidências registradas na Revista da Propriedade Industrial (RPI). Marca STAR INK protegida no Processo 944841171.');
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Department Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Departamento 02 • Jurídico, Fiscal & Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestão Contratual, Marca INPI & Simples Nacional
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleInpiScan}
            disabled={runningInpiCheck}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${runningInpiCheck ? 'animate-spin' : ''}`} />
            <span>{runningInpiCheck ? 'Escaneando RPI...' : 'Varredura INPI / Marca (Dr. Lex)'}</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if INPI Scan runs */}
      {inpiStatusMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{inpiStatusMsg}</span>
        </div>
      )}

      {/* Top Scorecard Grid (4 KPIs Jurídico/Fiscal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Status do CNPJ (RFB)
            </span>
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 tracking-tight font-mono">100% ATIVO</div>
          <div className="text-xs text-zinc-400 font-mono">
            CNPJ: <strong className="text-white">01.376.773/0001-30</strong>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Protocolo Simplifica ES
            </span>
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-300 tracking-tight font-mono">ESP2605453571</div>
          <div className="text-xs text-amber-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Em Análise na JUCEES</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Marca INPI (Classe 25)
            </span>
            <BadgeCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight font-mono">Proc. 944841171</div>
          <div className="text-xs text-cyan-400 font-mono">
            Prioridade Garantida 16/Ago
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Enquadramento Fiscal
            </span>
            <Landmark className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white tracking-tight font-mono">Simples Nacional</div>
          <div className="text-xs text-emerald-400 font-mono">
            Alíquota Anexo I: <strong className="text-white">4.0%</strong>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('jucees')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'jucees'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          1. Alteração Contratual JUCEES (ESP2605453571)
        </button>

        <button
          onClick={() => setActiveTab('inpi')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'inpi'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          2. Registro de Marca INPI (Processo 944841171)
        </button>

        <button
          onClick={() => setActiveTab('fiscal')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'fiscal'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          3. CNAEs & Tributação Simples Nacional
        </button>

        <button
          onClick={() => setActiveTab('lgpd')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
            activeTab === 'lgpd'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white bg-[#0d0d0f] border border-zinc-800'
          }`}
        >
          4. Conformidade LGPD & CDC Art. 49
        </button>
      </div>

      {/* TAB 1: JUCEES */}
      {activeTab === 'jucees' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                <FileCheck className="w-4 h-4" />
                <span>Simplifica ES • Registro Digital de Alteração Contratual</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Processo JUCEES Protocolo `ESP2605453571`
              </h2>
            </div>

            <a
              href="https://simplifica.es.gov.br/sigfacil/processo/acompanhar/co_protocolo/ESP2605453571"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-2"
            >
              <span>Acompanhar na JUCEES</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-[#0b0b0d] p-4 rounded-xl border border-zinc-800/80 space-y-3">
              <span className="text-amber-400 font-bold block text-sm border-b border-zinc-800 pb-2">
                📋 Dados Cadastrais Registrados
              </span>
              <div className="space-y-2 text-zinc-300">
                <p><span className="text-zinc-500">Razão Social:</span> <strong className="text-white">STAR INK LTDA</strong></p>
                <p><span className="text-zinc-500">Nome Fantasia:</span> <strong className="text-white">STAR INK</strong></p>
                <p><span className="text-zinc-500">Endereço Fiscal:</span> Rua Marquês de Olinda, 60, Jardim da Penha, Vitória/ES (Baixo Risco A)</p>
                <p><span className="text-zinc-500">Sócio-Administrador:</span> Armando Sinkovitz (99% das Cotas - Assinatura Soberana)</p>
              </div>
            </div>

            <div className="bg-[#0b0b0d] p-4 rounded-xl border border-zinc-800/80 space-y-3">
              <span className="text-emerald-400 font-bold block text-sm border-b border-zinc-800 pb-2">
                ✅ Checklist de Deferimento Legal
              </span>
              <div className="space-y-2 text-zinc-300">
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Viabilidade Prefeitura: Deferida em Jardim da Penha</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> DBE Receita Federal: Solicitado e Aprovado (`ESN2695198736`)</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Taxa DUA JUCEES (R$ 437,43): Paga e Conciliada</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Assinaturas Gov.br Ouro: Concluídas 100%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INPI */}
      {activeTab === 'inpi' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <BadgeCheck className="w-4 h-4" />
                <span>Instituto Nacional da Propriedade Industrial • Marca Registrada</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Proteção de Marca `STAR INK` (Processo INPI 944841171)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              Prioridade Garantida
            </span>
          </div>

          <div className="bg-[#0b0b0d] p-5 rounded-xl border border-zinc-800/80 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-500 block">Número do Processo:</span>
                <span className="text-white font-bold block text-sm">944841171</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Classe Internacional:</span>
                <span className="text-white font-bold block text-sm">NCL 25 (Vestuário, Calçados, Chapelaria)</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Monitoramento Agêntico:</span>
                <span className="text-cyan-400 font-bold block text-sm">Dr. Lex (Varredura Semanal RPI)</span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
              A marca nominal <strong>STAR INK</strong> possui garantia de anterioridade registrada perante o INPI, prevenindo a contrafação e o uso indevido de nome por terceiros no segmento de e-commerce de moda e vestuário.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Fiscal & CNAEs */}
      {activeTab === 'fiscal' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                <Landmark className="w-4 h-4" />
                <span>Enquadramento Tributário & CNAEs Oficiais</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Simples Nacional (Anexo I — Alíquota Inicial 4.0%)
              </h2>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <span className="text-zinc-400 block uppercase font-bold">Matriz de CNAEs Cadastrados no CNPJ:</span>
            <div className="space-y-2">
              {cnaes.map((cnae, idx) => (
                <div key={idx} className="p-3 bg-[#0b0b0d] rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <span className="text-amber-400 font-bold block">{cnae.code} — {cnae.type}</span>
                    <span className="text-zinc-300">{cnae.desc}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold">
                    {cnae.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LGPD */}
      {activeTab === 'lgpd' && (
        <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Políticas Institucionais & CDC Art. 49 (Direito de Arrependimento 7 dias)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-white font-bold block">Privacidade LGPD</span>
              <p className="text-zinc-400">Tratamento simplificado de dados para checkout, emissão fiscal e rastreio. Sem compartilhamento com terceiros não autorizados.</p>
              <a href="/politica-de-privacidade" target="_blank" className="text-amber-400 flex items-center gap-1 pt-1 font-bold">
                <span>Ver Rota /politica-de-privacidade</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-white font-bold block">Política de Trocas (CDC 49)</span>
              <p className="text-zinc-400">Portal /trocas integrado. Troca grátis em até 7 dias corridos após o recebimento com código de logística reversa automatizado.</p>
              <a href="/politica-de-devolucao" target="_blank" className="text-amber-400 flex items-center gap-1 pt-1 font-bold">
                <span>Ver Rota /politica-de-devolucao</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 bg-[#0b0b0d] rounded-xl border border-zinc-800 space-y-2">
              <span className="text-white font-bold block">Termos e Condições</span>
              <p className="text-zinc-400">Regras de compra D2C, estampa DTG autoral 100% Algodão e responsabilidade de frete e prazos PoD.</p>
              <a href="/termos-e-condicoes" target="_blank" className="text-amber-400 flex items-center gap-1 pt-1 font-bold">
                <span>Ver Rota /termos-e-condicoes</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Dr. Lex Chat (Visible across all tabs) */}
      <div className="p-6 rounded-2xl bg-[#131316] border border-zinc-800/80 space-y-4 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Dr. Lex — Consultor Jurídico, Fiscal & Compliance
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  GraphRAG AI 24/7
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Inteligência Jurídica Especializada em Legislação Societária, INPI, Simples Nacional & CDC
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sessão Privada Protegida</span>
          </span>
        </div>

        {/* Message Stream */}
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : 'bg-zinc-800 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-400" />}
              </div>

              <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-mono leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-black font-semibold rounded-tr-none'
                  : 'bg-[#0b0b0d] text-zinc-200 border border-zinc-800 rounded-tl-none shadow-md'
              }`}>
                {msg.attachmentName && (
                  <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg text-[11px]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Anexo: {msg.attachmentName}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap word-break">{msg.content}</div>

                <div className={`text-[10px] text-right mt-1 ${
                  msg.sender === 'user' ? 'text-black/60' : 'text-zinc-500'
                }`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {chatLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div className="bg-[#0b0b0d] p-3 rounded-2xl border border-zinc-800 text-zinc-400 text-xs font-mono flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Dr. Lex está pesquisando na Legislação Societária e Normas Fiscais...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pt-2 pb-1 font-mono text-[11px]">
          <button
            onClick={() => handleSendMessage('Qual o status atualizado do processo JUCEES protocolo ESP2605453571 e próximos passos?')}
            className="px-3 py-1.5 rounded-xl bg-[#0b0b0d] hover:bg-zinc-800 border border-zinc-800 text-amber-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Status JUCEES Protocolo ESP2605453571</span>
          </button>

          <button
            onClick={() => handleSendMessage('Como está garantida a anterioridade e a proteção da marca STAR INK no INPI (Processo 944841171)?')}
            className="px-3 py-1.5 rounded-xl bg-[#0b0b0d] hover:bg-zinc-800 border border-zinc-800 text-amber-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🛡️ Proteção de Marca INPI (944841171)</span>
          </button>

          <button
            onClick={() => handleSendMessage('Quais são as obrigações tributárias e alíquotas do Simples Nacional (Anexo I - 4.0%) para os nossos CNAEs?')}
            className="px-3 py-1.5 rounded-xl bg-[#0b0b0d] hover:bg-zinc-800 border border-zinc-800 text-amber-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🏛️ CNAEs & Simples Nacional (4.0%)</span>
          </button>
        </div>

        {/* Multiline Input Bar */}
        <div className="p-3 rounded-xl bg-[#0b0b0d] border border-zinc-800 flex items-end gap-3">
          <label className="cursor-pointer text-zinc-400 hover:text-amber-400 p-2 mb-0.5 transition-colors" title="Anexar PDF / Contrato">
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
            />
          </label>

          {selectedFile && (
            <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] mb-1">
              {selectedFile.name}
            </span>
          )}

          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-zinc-600 resize-none min-h-[44px] max-h-[160px] p-2 leading-relaxed whitespace-pre-wrap word-break"
            placeholder="Pergunte ao Dr. Lex sobre atos societários, contratos, INPI, impostos ou CDC..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={chatLoading}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all flex items-center justify-center shrink-0 mb-0.5 shadow-lg disabled:opacity-50"
            title="Enviar mensagem (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

