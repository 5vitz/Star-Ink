import { NextResponse } from 'next/server';
import { getInvoices, saveInvoices } from '@/lib/financials';

export async function GET() {
  const invoices = getInvoices();
  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  try {
    const { invoiceId } = await request.json();

    if (!invoiceId) {
      return NextResponse.json({ error: 'invoiceId é obrigatório.' }, { status: 400 });
    }

    const invoices = getInvoices();
    const index = invoices.findIndex((i) => i.id === invoiceId);

    if (index < 0) {
      return NextResponse.json({ error: 'Nota fiscal não encontrada.' }, { status: 404 });
    }

    const nfeNum = Math.floor(100000 + Math.random() * 900000);
    const randomKey = Array.from({ length: 44 }, () => Math.floor(Math.random() * 10)).join('');

    invoices[index].status = 'NFe Emitida';
    invoices[index].nfeNumber = `000.${Math.floor(nfeNum / 1000)}.${nfeNum % 1000}`;
    invoices[index].blingKey = randomKey;
    invoices[index].emittedAt = new Date().toISOString();

    saveInvoices(invoices);
    return NextResponse.json(invoices[index]);
  } catch (error) {
    console.error('Erro na rota POST /api/financials/bling:', error);
    return NextResponse.json({ error: 'Erro ao emitir NFe no Bling ERP.' }, { status: 500 });
  }
}
