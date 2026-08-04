import { NextResponse } from 'next/server';
import { getCustomers, saveCustomers, Customer } from '@/lib/concierge';

export async function GET() {
  const customers = getCustomers();
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customers = getCustomers();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Nome e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    const id = body.id || `cust-${Date.now()}`;
    const existingIndex = customers.findIndex((c) => c.id === id);

    const newCustomer: Customer = {
      id,
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      cpf: body.cpf || '',
      totalOrders: body.totalOrders || 0,
      ltv: body.ltv || 0,
      preferredSize: body.preferredSize || 'M',
      status: body.status || 'Novo Cliente',
      lastInteraction: body.lastInteraction || 'Agora mesmo',
      notes: body.notes || '',
      orders: body.orders || [],
      chatHistory: body.chatHistory || [],
    };

    if (existingIndex >= 0) {
      customers[existingIndex] = newCustomer;
    } else {
      customers.push(newCustomer);
    }

    saveCustomers(customers);
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('Erro na rota POST /api/concierge/customers:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
