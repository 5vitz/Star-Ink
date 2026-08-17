import { NextResponse } from 'next/server';
import { 
  getProductsAsync, 
  saveProductAsync, 
  saveProductsListAsync, 
  deleteProductAsync, 
  ExtendedProduct 
} from '@/lib/products';

export async function GET() {
  try {
    const products = await getProductsAsync();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro na rota GET /api/products:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Se o payload for um Array, salvar a lista completa (para reordenação Drag & Drop)
    if (Array.isArray(body)) {
      const success = await saveProductsListAsync(body);
      if (!success) {
        return NextResponse.json({ error: 'Erro ao salvar reordenação.' }, { status: 500 });
      }
      return NextResponse.json({ success: true, count: body.length });
    }

    if (!body.name || !body.code || !body.price) {
      return NextResponse.json(
        { error: 'Nome, código e preço são obrigatórios.' },
        { status: 400 }
      );
    }

    const id = body.id || `product-${Date.now()}`;

    const newProduct: ExtendedProduct = {
      id,
      code: body.code,
      name: body.name,
      price: Number(body.price),
      pixPrice: Number(body.pixPrice) || Number(body.price) * 0.95,
      image: body.image || '',
      category: body.category || 'Geral',
      description: body.description || '',
      promptSchemaUrl: body.promptSchemaUrl || '',
      showImage: Boolean(body.showImage),
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : 0,
      masterSku: body.masterSku || undefined,
      ncmCode: body.ncmCode || '6109.10.00',
      costFactoryPod: body.costFactoryPod ? Number(body.costFactoryPod) : 49.00,
      originCode: body.originCode !== undefined ? Number(body.originCode) : 0,
    };

    const success = await saveProductAsync(newProduct);
    if (!success) {
      return NextResponse.json({ error: 'Erro ao salvar produto.' }, { status: 500 });
    }

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('Erro na rota POST /api/products:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID do produto é obrigatório.' }, { status: 400 });
    }

    const success = await deleteProductAsync(id);
    if (!success) {
      return NextResponse.json({ error: 'Erro ao deletar produto.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na rota DELETE /api/products:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
