import { NextResponse } from 'next/server';
import { getSampleOrders, saveSampleOrders, SampleOrder } from '@/lib/production';

export async function GET() {
  const samples = getSampleOrders();
  return NextResponse.json(samples);
}

export async function POST(request: Request) {
  try {
    const { artworkName, size, supplier, costPrice, notes } = await request.json();

    if (!artworkName || !size) {
      return NextResponse.json({ error: 'Nome da Arte e Tamanho são obrigatórios.' }, { status: 400 });
    }

    const samples = getSampleOrders();
    const newSample: SampleOrder = {
      id: `sample-${Date.now()}`,
      artworkName,
      size: size || 'M',
      supplier: supplier || 'Reserva INK PoD',
      costPrice: Number(costPrice) || 49.00,
      status: 'Em Trânsito (5d)',
      requestedAt: new Date().toISOString(),
      arrivedAt: 'Previsto em 5 dias úteis',
      trackingCode: `BR${Math.floor(100000000 + Math.random() * 900000000)}RES`,
      notes: notes || 'Amostra solicitada a preço de custo no Painel Reserva INK.',
    };

    samples.push(newSample);
    saveSampleOrders(samples);
    return NextResponse.json(newSample);
  } catch (error) {
    console.error('Erro na rota POST /api/production/samples:', error);
    return NextResponse.json({ error: 'Erro ao solicitar amostra física.' }, { status: 500 });
  }
}
