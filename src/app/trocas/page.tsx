'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RotateCcw, ShieldCheck, Check, ArrowRight, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export default function TrocasPage() {
  const [orderId, setOrderId] = useState('');
  const [cpf, setCpf] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [item, setItem] = useState('');
  const [reason, setReason] = useState('Troca de Tamanho');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ postageCode: string; orderId: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !cpf || !item) return;

    setLoading(true);

    try {
      const res = await fetch('/api/trocas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName,
          cpf,
          phone,
          item,
          reason,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult({
          postageCode: data.postageCode,
          orderId: data.orderId,
        });
      } else {
        alert('Erro ao solicitar código de logística reversa.');
      }
    } catch (err) {
      console.error('Erro na solicitação de troca:', err);
      alert('Erro de conexão ao solicitar troca.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Schema JSON-LD de Política de Devolução (GEO & Google Shopping) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MerchantReturnPolicy',
            'name': 'Política de Trocas e Devoluções Star INK',
            'merchantReturnDays': 30,
            'returnMethod': 'https://schema.org/ReturnByMail',
            'returnFees': 'https://schema.org/FreeReturn',
            'applicableCountry': 'BR',
            'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
            'url': 'https://www.star-ink.com.br/trocas',
          }),
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-3xl">
        <div className="space-y-8">
          {/* Title Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-[0.3em] block">
              LOGÍSTICA REVERSA GRATUITA • 30 DIAS
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Portal de Autoatendimento de Trocas
            </h1>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-xl mx-auto font-sans">
              Troque de tamanho ou solicite a devolução sem complicações. Digite o número do seu pedido e CPF para gerar seu código de postagem pré-paga nos Correios.
            </p>
          </div>

          {/* Main Card Container */}
          <div className="bg-zinc-50 border border-zinc-200 p-6 md:p-8 rounded-none shadow-sm">
            {result ? (
              /* Success Result Box */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
                  <PackageCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                    Solicitação Homologada com Sucesso!
                  </span>
                  <h2 className="text-2xl font-bold text-zinc-900">
                    Código de Postagem Grátis Correios:
                  </h2>
                  <div className="inline-block bg-white border border-emerald-500/50 px-6 py-3 rounded-none text-2xl font-mono font-bold text-emerald-600 tracking-wider shadow-sm">
                    {result.postageCode}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-white p-4 border border-zinc-200 text-left text-xs font-mono space-y-2 text-zinc-700">
                  <span className="text-zinc-900 font-bold block uppercase tracking-wider">
                    Próximos Passos:
                  </span>
                  <p>1. Embalar a peça na embalagem original STAR INK (ou caixa parda simples).</p>
                  <p>2. Apresentar o código <strong className="text-emerald-600">{result.postageCode}</strong> em qualquer agência dos Correios do Brasil.</p>
                  <p>3. O envio é 100% gratuito. Assim que for postado, enviaremos a nova peça pelo WhatsApp!</p>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="px-6 py-3 bg-zinc-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-none hover:bg-black transition-colors"
                >
                  Fazer Nova Solicitação
                </button>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                      Número do Pedido *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Ex: #1001 ou #0998"
                      className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                      CPF do Comprador *
                    </label>
                    <input
                      type="text"
                      required
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Ex: 123.456.789-00"
                      className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Beatriz Mendes"
                      className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                      WhatsApp para Notificações
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: (11) 98888-7777"
                      className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                    Nome da Peça / Item a Trocar *
                  </label>
                  <input
                    type="text"
                    required
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Ex: XVII. A ESTRELA (Tamanho M para G)"
                    className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block mb-1 font-bold">
                    Motivo da Troca *
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-none px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-800 font-mono"
                  >
                    <option value="Troca de Tamanho">Troca de Tamanho (Ex: M por G)</option>
                    <option value="Troca de Modelo">Troca por Outra Arte do Drop 01</option>
                    <option value="Devolução 7 Dias">Devolução / Direito de Arrependimento 7d</option>
                    <option value="Avarias / Defeito">Avaria de Transporte ou Impressão</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 text-white py-4 rounded-none font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-sm"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{loading ? 'Gerando Código...' : 'Gerar Código Correios Grátis 1-Click'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
