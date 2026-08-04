import { NextResponse } from 'next/server';
import { getFinancials, calculateUnitEconomics } from '@/lib/financials';

export async function GET() {
  const financials = getFinancials();
  return NextResponse.json(financials);
}

export async function POST(request: Request) {
  try {
    const { ticketPrice, factoryCost, taxPercent } = await request.json();
    const price = Number(ticketPrice) || 180.0;
    const cost = Number(factoryCost) || 49.0;
    const tax = Number(taxPercent) || 4.0;

    const unitEcon = calculateUnitEconomics(price, cost, tax);
    return NextResponse.json(unitEcon);
  } catch (error) {
    console.error('Erro na rota POST /api/financials/dre:', error);
    return NextResponse.json({ error: 'Erro ao calcular Unit Economics.' }, { status: 500 });
  }
}
