import fs from 'fs';
import path from 'path';

export interface OrderItem {
  orderId: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}

export interface ChatMessage {
  sender: 'customer' | 'ai' | 'human';
  text: string;
  time: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  totalOrders: number;
  ltv: number;
  preferredSize: string;
  status: string;
  lastInteraction: string;
  notes: string;
  orders: OrderItem[];
  chatHistory: ChatMessage[];
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  cpf: string;
  phone: string;
  item: string;
  reason: string;
  status: string;
  postageCode: string;
  createdAt: string;
}

const CUSTOMERS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'customers.json');
const RETURNS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'returns.json');

export function getCustomers(): Customer[] {
  try {
    if (!fs.existsSync(CUSTOMERS_FILE_PATH)) return [];
    const data = fs.readFileSync(CUSTOMERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler customers.json:', error);
    return [];
  }
}

export function saveCustomers(customers: Customer[]): boolean {
  try {
    const dirPath = path.dirname(CUSTOMERS_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(CUSTOMERS_FILE_PATH, JSON.stringify(customers, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar customers.json:', error);
    return false;
  }
}

export function getReturnRequests(): ReturnRequest[] {
  try {
    if (!fs.existsSync(RETURNS_FILE_PATH)) return [];
    const data = fs.readFileSync(RETURNS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler returns.json:', error);
    return [];
  }
}

export function saveReturnRequests(returns: ReturnRequest[]): boolean {
  try {
    const dirPath = path.dirname(RETURNS_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(RETURNS_FILE_PATH, JSON.stringify(returns, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar returns.json:', error);
    return false;
  }
}

const CONCIERGE_SYSTEM_PROMPT = `Você é a IA Concierge 24/7 e o Agente Discriminador da STAR INK LTDA, marca de e-commerce de moda autoral de alto padrão e Print-on-Demand (PoD 2.0 Multi-Supplier).

Você atua sob os princípios e diretrizes da Base de Conhecimento Oficial da STAR INK:

1. **PRODUTO & TECIDO:**
   - Composição: 100% Algodão Pura Fibra Penteado (Fio 26.1, 220g/m² Heavyweight).
   - Impressão: DTG (Direct-to-Garment) ecológica à base d'água 300 DPI (sem borracha, sem rachadura).
   - Tabela de Medidas (cm):
     • P: Largura 52cm | Comprimento 72cm | Manga 21cm
     • M: Largura 55cm | Comprimento 75cm | Manga 22cm
     • G: Largura 58cm | Comprimento 78cm | Manga 23cm
     • GG: Largura 61cm | Comprimento 81cm | Manga 24cm
     • XGG: Largura 65cm | Comprimento 84cm | Manga 25cm

2. **LOGÍSTICA PoD 2.0 & MULTI-FORNECEDOR:**
   - Confecção DTG sob demanda em 1 a 3 dias úteis.
   - Fornecedor Principal: Reserva INK (Rio de Janeiro / São Paulo).
   - Fornecedor Secundário: Hotprinti.
   - Rastreamento enviado por e-mail e WhatsApp.

3. **TROCAS, DEVOLUÇÕES (CDC ART. 49) & GARANTIA:**
   - Desistência/Arrependimento (CDC 49): Até 7 dias corridos após o recebimento com frete reverso grátis via portal star-ink.com.br/trocas.
   - Troca por tamanho: Até 30 dias via portal /trocas com geração de cupom.
   - DEFEITO DE FABRICAÇÃO / AVARIA (Estampa desbotada, rasgo, costura desfeita):
     • Exige 2 fotos do produto.
     • Se a compra for da Reserva INK: Aciona a garantia Reserva INK (reprint R$ 0 para a Star-Ink).
     • Se a compra for da Hotprinti: Aciona a garantia Hotprinti (reprint R$ 0 para a Star-Ink).

4. **TRANSBORDO HUMANO (ALERTA VERMELHO):**
   - Se o cliente solicitar falar com atendente humano ("falar com humano", "atendente", "falar com o Armando") ou demonstrar forte insatisfação, responda com polidez informando a transferência com prioridade.

5. **TOM DE VOZ (BRAND VOICE):**
   - Poético, elegante, sofisticado, acolhedor e resolutivo.`;

export async function processGeminiConciergeAI(customerMessage: string, customerName: string): Promise<{
  reply: string;
  functionCalled?: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  const msgLower = customerMessage.toLowerCase();

  const isHumanRequested = msgLower.includes('humano') || msgLower.includes('atendente') || msgLower.includes('falar com pessoa') || msgLower.includes('falar com gente') || msgLower.includes('armando');

  if (apiKey) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: CONCIERGE_SYSTEM_PROMPT }]
            },
            contents: [
              {
                parts: [{ text: `Cliente: ${customerName}\nMensagem: ${customerMessage}` }]
              }
            ]
          })
        }
      );

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          let fnCalled = 'atendimento_geral()';
          if (isHumanRequested) fnCalled = 'escalar_humano(priority="high")';
          else if (msgLower.includes('defeito') || msgLower.includes('mancha') || msgLower.includes('rasg')) fnCalled = 'triagem_defeito(supplier="Reserva INK / Hotprinti")';
          else if (msgLower.includes('troca') || msgLower.includes('tamanho')) fnCalled = 'solicitar_troca(tipo="tamanho")';

          return { reply: replyText, functionCalled: fnCalled };
        }
      }
    } catch (err) {
      console.error('Erro na API Gemini Concierge:', err);
    }
  }

  // Fallback if API key unavailable
  if (isHumanRequested) {
    return {
      reply: `Certamente ${customerName}! Transferi o atendimento para nosso Concierge humano. O Genera ou nossa equipe de atendimento entrará em contato em instantes com prioridade máxima.`,
      functionCalled: 'escalar_humano(priority="high")',
    };
  }

  if (msgLower.includes('defeito') || msgLower.includes('rasgo') || msgLower.includes('mancha') || msgLower.includes('avaria')) {
    return {
      reply: `Olá ${customerName}! Lamento pelo ocorrido. Para acionarmos a garantia de reimpressão com custo R$ 0 junto à nossa fábrica parceira (Reserva INK / Hotprinti), por gentileza envie 2 fotos nítidas da peça (uma geral e outra aproximada do defeito).`,
      functionCalled: 'triagem_defeito(supplier="Reserva INK / Hotprinti")',
    };
  }

  if (msgLower.includes('troca') || msgLower.includes('devolver') || msgLower.includes('tamanho')) {
    return {
      reply: `Olá ${customerName}! Entendi que você precisa de auxílio com troca por tamanho ou devolução. Você pode acessar nosso portal de autoatendimento em star-ink.com.br/trocas (conforme CDC Art. 49) com frete reverso gratuito!`,
      functionCalled: 'solicitar_troca(tipo="tamanho")',
    };
  }

  return {
    reply: `Olá ${customerName}! Sou a IA Concierge da STAR INK. Nossas camisetas são confeccionadas em Algodão 100% Pura Fibra Penteado 220g (Heavyweight) em modelagem Oversized. Como posso auxiliar você hoje?`,
    functionCalled: 'atendimento_geral()',
  };
}

