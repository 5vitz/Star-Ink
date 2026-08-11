import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface MediaItem {
  url: string;
  name: string;
  size?: number;
  mtime?: number;
  folder: string;
}

export async function GET() {
  try {
    const mediaList: MediaItem[] = [];

    // 1. Scan public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        if (/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file)) {
          const filePath = path.join(uploadsDir, file);
          const stat = fs.statSync(filePath);
          mediaList.push({
            url: `/uploads/${file}`,
            name: file,
            size: stat.size,
            mtime: stat.mtimeMs,
            folder: 'uploads',
          });
        }
      }
    }

    // 2. Scan public/imagens
    const imagensDir = path.join(process.cwd(), 'public', 'imagens');
    if (fs.existsSync(imagensDir)) {
      const scanFolder = (dir: string, relPath: string) => {
        const items = fs.readdirSync(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            scanFolder(fullPath, `${relPath}/${item}`);
          } else if (/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(item)) {
            mediaList.push({
              url: `/imagens${relPath}/${item}`,
              name: item,
              size: stat.size,
              mtime: stat.mtimeMs,
              folder: 'imagens',
            });
          }
        }
      };
      scanFolder(imagensDir, '');
    }

    // Sort newest first
    mediaList.sort((a, b) => (b.mtime || 0) - (a.mtime || 0));

    return NextResponse.json(mediaList);
  } catch (error) {
    console.error('Erro ao buscar mídias:', error);
    return NextResponse.json({ error: 'Erro ao listar mídias.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
      return NextResponse.json({ error: 'URL da mídia é obrigatória.' }, { status: 400 });
    }

    // Only allow deleting files in public/uploads for security
    if (!fileUrl.startsWith('/uploads/')) {
      return NextResponse.json(
        { error: 'Apenas mídias da pasta de uploads podem ser excluídas.' },
        { status: 403 }
      );
    }

    const filename = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Arquivo não encontrado.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao deletar mídia:', error);
    return NextResponse.json({ error: 'Erro ao deletar arquivo.' }, { status: 500 });
  }
}
