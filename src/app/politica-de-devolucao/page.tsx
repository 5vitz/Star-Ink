import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Devolução & Trocas | Star INK',
  description: 'Política Oficial de Trocas, Devoluções e Direito de Arrependimento da Star INK.',
};

export default function PoliticaDevolucaoPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-zinc-200 pb-6">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-[0.3em] block font-bold">
              DIREITO DO CONSUMIDOR & SATISFAÇÃO
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Política de Devolução e Trocas
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Logística Reversa Gratuita • 30 Dias para Trocas • Star INK (star-ink.com.br)
            </p>
          </div>

          <div className="space-y-6 text-zinc-700 text-sm leading-relaxed font-sans">
            <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
              <h3 className="text-zinc-900 font-mono font-bold text-sm uppercase">
                🚀 Acesso Rápido ao Portal de Trocas 1-Click
              </h3>
              <p className="text-xs text-zinc-600 font-mono">
                Para solicitar a troca de tamanho ou gerar seu código de postagem grátis dos Correios agora mesmo:
              </p>
              <Link
                href="/trocas"
                className="inline-block px-5 py-2.5 bg-zinc-900 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
              >
                Ir para Portal de Autoatendimento (/trocas) →
              </Link>
            </div>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              1. Prazos e Condições para Devolução
            </h2>
            <p>
              O prazo para devolução por arrependimento ou troca de modelo/tamanho é de <strong>30 (trinta) dias corridos</strong> contados a partir da data de recebimento do pedido.
            </p>

            <h3 className="text-sm font-bold text-zinc-900 font-mono pt-2">Condições Obrigatórias:</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 font-mono text-xs">
              <li>O produto deve ser devolvido na sua embalagem original (saco Ziplock Star INK).</li>
              <li>O produto não pode apresentar indícios de uso ou lavagem.</li>
              <li>Todas as etiquetas e tags originais devem estar intactas.</li>
              <li>Acompanhar a Nota Fiscal impressa ou Declaração de Conteúdo.</li>
            </ul>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              2. Procedimento de Postagem (Logística Reversa Grátis)
            </h2>
            <p>
              A solicitação de troca é 100% gratuita. Ao preencher o formulário no nosso portal <code>/trocas</code>, você receberá um <strong>Código de Postagem Pré-Paga dos Correios</strong>. Bastará dirigir-se a qualquer agência dos Correios com o pacote bem acondicionado e apresentar o código.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              3. Produtos Avariados no Transporte
            </h2>
            <p>
              Caso receba a embalagem avariada ou com divergência de transporte, entre em contato em até 48 (quarenta e oito) horas a contar do recebimento para prioridade de substituição imediata.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              4. Reembolso & Estorno
            </h2>
            <p>
              Após o recebimento do produto em nosso centro de distribuição, o controle de qualidade realizará a análise em até 3 dias úteis. Aprovada a devolução, o reembolso integral (via PIX ou estorno no cartão) será processado imediatamente.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
