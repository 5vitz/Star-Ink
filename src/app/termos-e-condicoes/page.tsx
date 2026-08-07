import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos e Condições de Compra | Star INK',
  description: 'Termos e Condições de Compra, Frete e Entregas da Star INK.',
};

export default function TermosECondicoesPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-zinc-200 pb-6">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-[0.3em] block font-bold">
              REGRAS & CONTRATO DE COMPRA
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Termos e Condições de Compra
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Condições de Frete, Faturamento e Entregas • Star INK (star-ink.com.br)
            </p>
          </div>

          <div className="space-y-6 text-zinc-700 text-sm leading-relaxed font-sans">
            <p>
              A <strong>Star INK</strong> estabelece detalhadamente nesta política as suas condições oficiais de compra, faturamento, prazo de postagem e transporte de produtos.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              1. Efetivação da Compra
            </h2>
            <p>
              A compra é considerada formalmente realizada após a aprovação e confirmação do pagamento pelo gateway/banco escolhido no checkout. O cliente receberá imediatamente a confirmação do pedido no e-mail cadastrado.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              2. Prazos de Preparação & Frete
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 font-mono text-xs">
              <li>
                <strong>Prazo de Preparação:</strong> O prazo interno para separação, produção DTG sob demanda, controle de qualidade e embalagem é de até 2 (dois) dias úteis após aprovação do pagamento.
              </li>
              <li>
                <strong>Prazo de Transporte:</strong> O prazo final de entrega é calculado no checkout com base no CEP de destino e modalidade de frete selecionada (Correios / Transportadora).
              </li>
              <li>
                <strong>Rastreamento:</strong> Após a postagem, o código de rastreio é enviado automaticamente por e-mail e WhatsApp para acompanhamento em tempo real.
              </li>
            </ul>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              3. Classificação Indicativa & Idade Mínima
            </h2>
            <p>
              Nosso e-commerce possui recomendação de uso para pessoas maiores de 16 anos. Caso o comprador seja menor de idade, a compra deve ser efetuada com a supervisão e autorização dos pais ou responsáveis legais.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
