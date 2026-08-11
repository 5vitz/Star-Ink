import { NextResponse } from 'next/server';
import { getProducts, saveProducts, ExtendedProduct } from '@/lib/products';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Se o payload for um Array, salvar a lista completa (para reordenação Drag & Drop)
    if (Array.isArray(body)) {
      const success = saveProducts(body);
      if (!success) {
        return NextResponse.json({ error: 'Erro ao salvar reordenação.' }, { status: 500 });
      }
      return NextResponse.json({ success: true, count: body.length });
    }

    const products = getProducts();

    if (!body.name || !body.code || !body.price) {
      return NextResponse.json(
        { error: 'Nome, código e preço são obrigatórios.' },
        { status: 400 }
      );
    }

    const id = body.id || `product-${Date.now()}`;
    const existingIndex = products.findIndex((p) => p.id === id);

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
    };

    if (existingIndex >= 0) {
      products[existingIndex] = newProduct;
    } else {
      products.push(newProduct);
    }

    const success = saveProducts(products);
    if (!success) {
      return NextResponse.json({ error: 'Erro ao salvar no arquivo.' }, { status: 500 });
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

    let products = getProducts();
    products = products.filter((p) => p.id !== id);

    const success = saveProducts(products);
    if (!success) {
      return NextResponse.json({ error: 'Erro ao salvar alteração.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na rota DELETE /api/products:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
