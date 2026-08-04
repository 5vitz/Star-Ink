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

// Simulador da IA Concierge 24/7 (Gemini API + Function Calling Logic)
export function processGeminiConciergeAI(customerMessage: string, customerName: string): {
  reply: string;
  functionCalled?: string;
} {
  const msgLower = customerMessage.toLowerCase();

  if (msgLower.includes('troca') || msgLower.includes('devolver') || msgLower.includes('tamanho')) {
    return {
      reply: `Olá ${customerName}! Entendi que você precisa de auxílio com troca/tamanho. Você pode acessar nosso portal direto em star-ink.com.br/trocas ou posso gerar o código de postagem gratuita dos Correios agora mesmo!`,
      functionCalled: 'solicitar_troca(tipo="tamanho")',
    };
  }

  if (msgLower.includes('pedido') || msgLower.includes('rastreio') || msgLower.includes('onde está') || msgLower.includes('chegar')) {
    return {
      reply: `Olá ${customerName}! Consultei seu pedido em nosso sistema PoD. Ele está em produção DTG na fábrica Reserva INK com prazo de envio em até 3 dias úteis.`,
      functionCalled: 'consultar_pedido(status="PoD_In_Progress")',
    };
  }

  if (msgLower.includes('humano') || msgLower.includes('atendente') || msgLower.includes('falar com pessoa')) {
    return {
      reply: `Certamente ${customerName}! Transferi o atendimento para nosso Concierge humano. O Genera ou nossa equipe entrará em contato em instantes neste WhatsApp.`,
      functionCalled: 'escalar_humano(priority="high")',
    };
  }

  // Resposta padrão elegante no tom de voz da STAR INK
  return {
    reply: `Olá ${customerName}! Sou a IA Concierge da STAR INK. Nossas camisetas são confeccionadas em Algodão 100% Penteado 220g em modelagem Oversized. Como posso ajudar você hoje?`,
    functionCalled: 'atendimento_geral()',
  };
}
