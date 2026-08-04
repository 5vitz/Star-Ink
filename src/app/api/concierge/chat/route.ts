import { NextResponse } from 'next/server';
import { getCustomers, saveCustomers, processGeminiConciergeAI } from '@/lib/concierge';

export async function POST(request: Request) {
  try {
    const { customerId, message, sender = 'customer' } = await request.json();

    if (!customerId || !message) {
      return NextResponse.json({ error: 'customerId e mensagem são obrigatórios.' }, { status: 400 });
    }

    const customers = getCustomers();
    const customer = customers.find((c) => c.id === customerId);

    if (!customer) {
      return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
    }

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    // Add user message
    customer.chatHistory.push({
      sender: sender as 'customer' | 'human',
      text: message,
      time: timeStr,
    });
    customer.lastInteraction = `Hoje às ${timeStr}`;

    let aiResult = null;

    // If message comes from customer, simulate Gemini AI response
    if (sender === 'customer') {
      aiResult = processGeminiConciergeAI(message, customer.name);
      customer.chatHistory.push({
        sender: 'ai',
        text: aiResult.reply,
        time: timeStr,
      });
    }

    saveCustomers(customers);

    return NextResponse.json({
      customer,
      aiResponse: aiResult ? aiResult.reply : null,
      functionCalled: aiResult ? aiResult.functionCalled : null,
    });
  } catch (error) {
    console.error('Erro na rota POST /api/concierge/chat:', error);
    return NextResponse.json({ error: 'Erro ao processar mensagem do chat.' }, { status: 500 });
  }
}
