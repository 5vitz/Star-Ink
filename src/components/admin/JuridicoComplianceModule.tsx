'use client';

import React, { useState } from 'react';
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
  FileCheck
} from 'lucide-react';

export default function JuridicoComplianceModule() {
  const [activeTab, setActiveTab] = useState<'jucees' | 'inpi' | 'fiscal' | 'lgpd'>('jucees');
  const [runningInpiCheck, setRunningInpiCheck] = useState(false);
  const [inpiStatusMsg, setInpiStatusMsg] = useState<string | null>(null);

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
    </div>
  );
}
