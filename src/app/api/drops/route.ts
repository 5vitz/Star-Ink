import { NextRequest, NextResponse } from 'next/server';
import {
  getDropsAsync,
  getActiveDropAsync,
  saveDropAsync,
  deleteDropAsync,
  DropData,
} from '@/lib/drops';

// GET /api/drops (retorna lista de drops ou o drop ativo)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active');

  try {
    if (activeOnly === 'true') {
      const activeDrop = await getActiveDropAsync();
      return NextResponse.json(activeDrop);
    }

    const drops = await getDropsAsync();
    return NextResponse.json(drops);
  } catch (error) {
    console.error('Erro na rota GET /api/drops:', error);
    return NextResponse.json({ error: 'Erro ao buscar drops' }, { status: 500 });
  }
}

// POST /api/drops (criar ou atualizar drop)
export async function POST(request: NextRequest) {
  try {
    const body: DropData = await request.json();

    if (!body.name || !body.title || !body.tagline) {
      return NextResponse.json(
        { error: 'Campos nome, título e tagline são obrigatórios.' },
        { status: 400 }
      );
    }

    const dropToSave: DropData = {
      id: body.id || `drop-${Date.now()}`,
      code: body.code || `DROP-${Date.now().toString().slice(-4)}`,
      name: body.name,
      title: body.title,
      tagline: body.tagline,
      description: body.description || '',
      releaseDate: body.releaseDate || '',
      status: body.status || 'ACTIVE',
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const success = await saveDropAsync(dropToSave);

    if (success) {
      return NextResponse.json(dropToSave, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Falha ao salvar o Drop.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro na rota POST /api/drops:', error);
    return NextResponse.json({ error: 'Erro interno ao processar o Drop.' }, { status: 500 });
  }
}

// DELETE /api/drops?id=xxx
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID do Drop não informado.' }, { status: 400 });
  }

  try {
    const success = await deleteDropAsync(id);
    if (success) {
      return NextResponse.json({ message: 'Drop removido com sucesso.' });
    }
    return NextResponse.json({ error: 'Erro ao deletar Drop.' }, { status: 500 });
  } catch (error) {
    console.error('Erro na rota DELETE /api/drops:', error);
    return NextResponse.json({ error: 'Erro interno ao remover Drop.' }, { status: 500 });
  }
}
