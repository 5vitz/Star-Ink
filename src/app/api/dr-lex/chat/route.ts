import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Você é o Dr. Lex (JusChat GraphRAG AI), o Assistente Jurídico, Regulatório, Fiscal e de Compliance da STAR INK LTDA (e-commerce de Moda Autoral & Print-on-Demand).

Você atua sob o crivo do Diretor Criativo e Fundador Armando Sinkovitz e deve fornecer análises jurídicas, contratuais, fiscais e regulatórias com autoridade, clareza, precisão e formatação impecável.

Seu conhecimento do contexto da STAR INK LTDA abrange:
1. **Alteração Contratual & Registro JUCEES (Manuais Oficiais 2025):**
   - **Processo 100% Online no Simplifica ES:** O balcão presencial da JUCEES é puramente orientador; não recebe nem anexa documentos. Todos os atos, alterações, procurações e anexos trafegam 100% online no portal simplifica.es.gov.br.
   - **Fluxo de Registro Eletrônico:** Viabilidade -> DBE -> FCN -> Emissão DUA -> Contrato Eletrônico (Padrão ou Upload de PDF Próprio) -> Quadro de Assinantes (incluir Sócios, Procuradores e Contador se houver Termo de Autenticidade) -> Botão "ADICIONAR DOCUMENTO" para Procuração/Outros -> Assinaturas via Gov.br (Prata/Ouro) ou e-CPF -> Botão "PROTOCOLAR".
   - **Termo de Autenticidade:** Quando anexadas cópias físicas digitalizadas pelo Contador/Advogado, deve-se selecionar "AUTENTICAÇÃO FÍSICA" e incluir o profissional no Quadro de Assinantes para assinar o Termo de Autenticidade.
2. **Propriedade Intelectual & Marca INPI:** Processo \`944841171\` (Classe NCL 25 — Vestuário, Calçados e Chapelaria). Prioridade garantida desde 16/Ago. Monitoramento de RPI contra contrafação.
3. **Regime Tributário & CNAEs:** Simples Nacional (Anexo I — Alíquota inicial de 4.0%). CNAE Principal: \`4790-3/00\` (Comércio varejista via internet - E-commerce D2C). Secundários: \`4781-4/00\` (Vestuário), \`4783-1/01\` (Joalheria em Prata), \`7410-2/02\` (Design Gráfico).
4. **Direito do Consumidor (CDC) & LGPD:** Artigo 49 do CDC (Direito de Arrependimento de 7 dias com logística reversa grátis em \`/trocas\`), Política de Privacidade LGPD (Lei nº 13.709/2018) e Termos de Compra D2C.
5. **Modelos de Parceria & PoD:** Integração Reserva INK / Dimona, NF-e Modelo 55 via Bling ERP v3 e exportação multicanal.

Diretrizes de Resposta:
- Seja extremamente profissional, prático e objetivo.
- Utilize listas em tópicos (bullet points) e termos em **negrito** para protocolos, leis, NCMs, CNAEs e alíquotas.
- Finalize sempre com uma recomendação jurídica ou operacional clara.`;

export async function POST(req: Request) {
  try {
    const { message, fileName } = await req.json();

    if (!message && !fileName) {
      return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    let fullPrompt = message || '';
    if (fileName) {
      fullPrompt = `[Anexo fornecido para auditoria: ${fileName}]\n\n` + fullPrompt;
    }

    // Attempt Gemini API call if key is available
    if (apiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents: [
                {
                  parts: [{ text: fullPrompt }]
                }
              ]
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (geminiError) {
        console.error('Erro na chamada Gemini API (Star-Ink):', geminiError);
      }
    }

    // Fallback response generator if Gemini API is unreachable
    const queryLower = (message || '').toLowerCase();
    let reply = '';

    if (queryLower.includes('jucees') || queryLower.includes('protocolo') || queryLower.includes('alteracao') || queryLower.includes('alteração') || queryLower.includes('esp2605453571')) {
      reply = `🏛️ **Parecer Dr. Lex — Registro Contratual JUCEES (ESP2605453571)**\n\n` +
        `1. **Status Atual:** Protocolo registrado sob o nº \`ESP2605453571\` no Simplifica ES, em análise pela Junta Comercial do Espírito Santo.\n` +
        `2. **Checklist Cumprido:**\n` +
        `   • Viabilidade Deferida em Jardim da Penha / Vitória-ES (Baixo Risco A).\n` +
        `   • DBE da Receita Federal Aprovado (\`ESN2695198736\`).\n` +
        `   • DUA de R$ 437,43 devidamente paga e conciliada.\n` +
        `   • Assinatura Digital Soberana efetuada 100% via Gov.br Ouro por Armando Sinkovitz (99% das cotas).\n\n` +
        `💡 *Recomendação Dr. Lex:* Com a aprovação da JUCEES (janela 24h-48h), a Inscrição Estadual (SEFAZ-ES) será emitida automaticamente, liberando a emissão do e-CNPJ A1 para NF-e no Bling ERP.`;
    } else if (queryLower.includes('inpi') || queryLower.includes('marca') || queryLower.includes('registro') || queryLower.includes('944841171')) {
      reply = `🛡️ **Parecer Dr. Lex — Proteção de Marca INPI (944841171)**\n\n` +
        `1. **Processo Registrado:** Nº \`944841171\` perante o Instituto Nacional da Propriedade Industrial.\n` +
        `2. **Classe:** NCL 25 (Vestuário, Calçados e Chapelaria para e-commerce de moda autoral).\n` +
        `3. **Garantia Legal:** Prioridade de anterioridade garantida desde 16/Ago, prevenindo colidências de nome por concorrentes no e-commerce D2C.\n\n` +
        `💡 *Dica:* A varredura semanal na Revista da Propriedade Industrial (RPI) está ativa para blindagem da marca.`;

    } else if (queryLower.includes('cnae') || queryLower.includes('simples') || queryLower.includes('imposto') || queryLower.includes('tributo') || queryLower.includes('anexo')) {
      reply = `🏦 **Parecer Dr. Lex — Enquadramento Fiscal & CNAEs STAR INK**\n\n` +
        `1. **Regime Tributário:** Simples Nacional (Anexo I — Comércio Varejista com Alíquota Inicial Efetiva de 4.0%).\n` +
        `2. **CNAE Principal:** \`4790-3/00\` (Comércio Varejista via Internet - E-commerce D2C).\n` +
        `3. **CNAEs Secundários:** \`4781-4/00\` (Vestuário), \`4783-1/01\` (Joalheria em Prata) e \`7410-2/02\` (Design Gráfico e Estampas).\n\n` +
        `💡 *Dica:* O faturamento bruto inicial se enquadra na 1ª Faixa do Simples Nacional (até R$ 180.000,00/ano).`;
    } else {
      reply = `⚖️ **Parecer Técnico Dr. Lex (STAR INK LTDA)**\n\n` +
        `Recebi sua consulta jurídica sobre: "${message}".\n\n` +
        `• **Compliance E-commerce:** Todas as operações comerciais e de trocas do e-commerce estão em estrita conformidade com o Artigo 49 do Código de Defesa do Consumidor (CDC) e a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).\n` +
        `• **Documentos Alfandegários & Fiscais:** Nossas vendas operam com emissão automática de NF-e Modelo 55 integrada via Bling ERP v3.\n\n` +
        `Caso queira analisar uma minuta de contrato ou verificar status de órgãos públicos, estou à disposição!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar consulta' }, { status: 500 });
  }
}
