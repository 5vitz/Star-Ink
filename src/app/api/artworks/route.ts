import { NextResponse } from 'next/server';
import { getArtworksAsync, saveArtworkAsync, deleteArtworkAsync } from '@/lib/artworks';

export async function GET() {
  try {
    const artworks = await getArtworksAsync();
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Erro na API de Artworks GET:', error);
    return NextResponse.json({ error: 'Erro ao buscar artes master.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.code || !body.title) {
      return NextResponse.json({ error: 'Código e Título são obrigatórios.' }, { status: 400 });
    }

    const success = await saveArtworkAsync(body);
    if (success) {
      return NextResponse.json({ success: true, artwork: body });
    } else {
      return NextResponse.json({ error: 'Falha ao salvar arte.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro na API de Artworks POST:', error);
    return NextResponse.json({ error: 'Erro ao processar requisição.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID da arte não fornecido.' }, { status: 400 });
    }

    const success = await deleteArtworkAsync(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Erro na API de Artworks DELETE:', error);
    return NextResponse.json({ error: 'Erro ao deletar arte.' }, { status: 500 });
  }
}
