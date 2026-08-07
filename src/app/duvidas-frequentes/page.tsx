import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dúvidas Frequentes (FAQ) | Star INK',
  description: 'Dúvidas Frequentes, Regras de Pagamento, Guia de Tamanhos e Suporte da Star INK.',
};

export default function DuvidasFrequentesPage() {
  const faqs = [
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos PIX com aprovação instantânea (com 5% a 10% de desconto à vista), cartões de crédito em até 6x sem juros (Visa, Mastercard, Elo, Amex) e boleto bancário.',
    },
    {
      q: 'Como funciona o prazo de entrega e envio?',
      a: 'Após a aprovação do pagamento, nosso prazo de separação, embalagem autoral no saco Ziplock e postagem nos Correios é de até 2 dias úteis. O prazo de entrega varia conforme seu CEP.',
    },
    {
      q: 'Como faço para escolher o meu tamanho ideal?',
      a: 'Nossas peças possuem modelagem autoral oversized streetwear. Na página de cada produto, você encontra a tabela de medidas em centímetros (comprimento x largura x manga). Recomendamos conferir com uma peça do seu guarda-roupa.',
    },
    {
      q: 'Posso trocar se a peça não servir?',
      a: 'Com certeza! Você tem até 30 dias corridos para solicitar a troca por tamanho no nosso Portal de Autoatendimento (/trocas). O frete de devolução pelos Correios é 100% gratuito.',
    },
    {
      q: 'As vendas são feitas apenas pelo site?',
      a: 'Sim, todas as vendas são processadas exclusivamente pelo nosso e-commerce oficial (star-ink.com.br) para garantir a segurança fiscal, emissão de nota fiscal Bling ERP e rastreamento oficial.',
    },
    {
      q: 'Como funciona a segurança e o tratamento dos meus dados?',
      a: 'Seus dados são protegidos por criptografia SSL de 256 bits e gerenciados em conformidade com a LGPD. Não vendemos nem compartilhamos informações com terceiros não autorizados.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Schema FAQPage JSON-LD para GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map((f) => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.a,
              },
            })),
          }),
        }}
      />

      <Header />
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-zinc-200 pb-6">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-[0.3em] block font-bold">
              CENTRAL DE AJUDA & PERGUNTAS FREQUENTES
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Dúvidas Frequentes (FAQ)
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Respostas rápidas sobre pagamento, envio, trocas e tamanhos • Star INK
            </p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-50 border border-zinc-200 p-6 space-y-2 hover:border-zinc-300 transition-colors"
              >
                <h3 className="text-zinc-900 font-mono font-bold text-sm md:text-base flex items-center gap-3">
                  <span className="text-emerald-600 font-mono">0{index + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed pl-8 font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
