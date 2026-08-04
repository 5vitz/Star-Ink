import { NextResponse } from 'next/server';
import { getProductionOrders, saveProductionOrders, ProductionOrder, KanbanStage } from '@/lib/production';

export async function GET() {
  const orders = getProductionOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orders = getProductionOrders();

    if (body.id && body.stage) {
      // Update existing order stage or supplier
      const index = orders.findIndex((o) => o.id === body.id);
      if (index >= 0) {
        orders[index].stage = body.stage as KanbanStage;
        if (body.supplier) orders[index].supplier = body.supplier;
        if (body.trackingCode) orders[index].trackingCode = body.trackingCode;
        saveProductionOrders(orders);
        return NextResponse.json(orders[index]);
      }
    }

    // Create new production order
    const newOrder: ProductionOrder = {
      id: `po-${Date.now()}`,
      orderId: body.orderId || `#${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName || 'Cliente STAR INK',
      item: body.item || 'XVII. A ESTRELA',
      size: body.size || 'M',
      color: body.color || 'Preto Grafite',
      supplier: body.supplier || 'Reserva INK PoD',
      supplierSku: body.supplierSku || 'INK-POD-GENERIC-M',
      costPrice: Number(body.costPrice) || 49.00,
      stage: (body.stage as KanbanStage) || 'Aguardando',
      trackingCode: body.trackingCode || 'Aguardando Postagem',
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    saveProductionOrders(orders);
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Erro na rota POST /api/production/orders:', error);
    return NextResponse.json({ error: 'Erro ao atualizar ordem de produção.' }, { status: 500 });
  }
}
