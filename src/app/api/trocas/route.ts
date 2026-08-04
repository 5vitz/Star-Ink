import { NextResponse } from 'next/server';
import { getReturnRequests, saveReturnRequests, ReturnRequest } from '@/lib/concierge';

export async function GET() {
  const returns = getReturnRequests();
  return NextResponse.json(returns);
}

export async function POST(request: Request) {
  try {
    const { orderId, customerName, cpf, phone, item, reason } = await request.json();

    if (!orderId || !cpf || !item) {
      return NextResponse.json({ error: 'Pedido, CPF e Item são obrigatórios.' }, { status: 400 });
    }

    const returns = getReturnRequests();
    const codeNum = Math.floor(100000 + Math.random() * 900000);
    const postageCode = `LOG-REV-${codeNum}`;

    const newReturn: ReturnRequest = {
      id: `ret-${Date.now()}`,
      orderId,
      customerName: customerName || 'Cliente STAR INK',
      cpf,
      phone: phone || '',
      item,
      reason: reason || 'Troca de Tamanho',
      status: 'Código Gerado',
      postageCode,
      createdAt: new Date().toISOString(),
    };

    returns.push(newReturn);
    saveReturnRequests(returns);

    return NextResponse.json(newReturn);
  } catch (error) {
    console.error('Erro na rota POST /api/trocas:', error);
    return NextResponse.json({ error: 'Erro ao registrar solicitação de troca.' }, { status: 500 });
  }
}
