import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Star INK',
  description: 'Política de Privacidade, tratamento de dados e conformidade LGPD da Star INK.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3 border-b border-zinc-200 pb-6">
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-[0.3em] block font-bold">
              GOVERNANÇA & SEGURANÇA DE DADOS
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Política de Privacidade
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Última atualização: Agosto de 2026 • Star INK (star-ink.com.br)
            </p>
          </div>

          <div className="space-y-6 text-zinc-700 text-sm leading-relaxed font-sans">
            <p>
              A <strong>Star INK</strong> está profundamente comprometida com a segurança, transparência e sigilo das informações e dados pessoais fornecidos por nossos clientes e visitantes em nossa plataforma.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              1. Dos Seus Dados & Coleta
            </h2>
            <p>
              A Star INK coleta e armazena informações essenciais para processar seus pedidos, administrar seu registro de usuário, acompanhar entregas de produtos e implementar melhorias contínuas na sua experiência de compra.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              2. Finalidade da Utilização dos Dados
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 font-mono text-xs">
              <li>Processar e gerenciar suas compras de produtos e serviços.</li>
              <li>Emitir notas fiscais e códigos de rastreamento de entregas.</li>
              <li>Responder a dúvidas de atendimento e suporte via Concierge.</li>
              <li>Enviar comunicações de lançamentos e edições limitadas (com sua autorização).</li>
            </ul>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              3. Compartilhamento de Informações
            </h2>
            <p>
              Compartilhamos dados exclusivamente com parceiros tecnológicos essenciais para a operação (como plataformas de pagamento seguras, ERP de gestão fiscal e operadores de transporte/Correios). Não vendemos nem compartilhamos dados para terceiros não autorizados.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              4. Cookies & Tecnologias de Navegação
            </h2>
            <p>
              Utilizamos cookies temporários e tecnologias de análise estrita para compreender padrões de navegação e melhorar nosso e-commerce. Você pode ajustar as permissões de cookies diretamente nas configurações do seu navegador.
            </p>

            <h2 className="text-lg font-bold text-zinc-900 font-mono pt-4 border-b border-zinc-200 pb-2">
              5. Seus Direitos (LGPD)
            </h2>
            <p>
              Você possui o direito de acessar, retificar, solicitar a portabilidade ou a eliminação dos seus dados pessoais armazenados em nossos sistemas. Para exercer seus direitos, entre em contato através do e-mail oficial <code>starink.oficial@gmail.com</code>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
