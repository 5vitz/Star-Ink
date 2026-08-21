import fs from 'fs';
import path from 'path';
import { prisma } from './db';

export interface ArtworkData {
  id: string;
  code: string;           // ex: STINK-ART-017
  title: string;          // ex: XVII. A ESTRELA
  concept?: string;       // Conceito filosófico / Estética da Subtração
  promptSchemaUrl?: string;// JSON Schema A3
  masterPrintUrl?: string; // Caminho PNG 4200x4800 300DPI (/FORNECEDORES/Reserva INK/Artes/...)
  defaultSupplier?: string;// RESERVA_INK, DIMONA, etc.
  createdAt?: string;
  updatedAt?: string;
}

const ARTWORKS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'artworks.json');

const DEFAULT_INITIAL_ARTWORKS: ArtworkData[] = [
  {
    id: 'art-001',
    code: 'STINK-ART-001',
    title: 'I. O MAGO',
    concept: 'O ponto de partida do manifesto. O poder de manifestação a partir do caos primordial.',
    promptSchemaUrl: '/data/prompts/I_O_MAGO.json',
    masterPrintUrl: '/FORNECEDORES/Reserva INK/Artes/01_O_MAGO_4200x4800_300DPI.png',
    defaultSupplier: 'RESERVA_INK',
  },
  {
    id: 'art-017',
    code: 'STINK-ART-017',
    title: 'XVII. A ESTRELA',
    concept: 'Esperança transcendental, luz geométrica no breu do algodão preto.',
    promptSchemaUrl: '/data/prompts/XVII_A_ESTRELA.json',
    masterPrintUrl: '/FORNECEDORES/Reserva INK/Artes/17_A_ESTRELA_4200x4800_300DPI.png',
    defaultSupplier: 'RESERVA_INK',
  },
  {
    id: 'art-019',
    code: 'STINK-ART-019',
    title: 'XIX. O SOL',
    concept: 'Radiância vitalista. Geometria de traço fino sobre fundo escuro.',
    promptSchemaUrl: '/data/prompts/XIX_O_SOL.json',
    masterPrintUrl: '/FORNECEDORES/Reserva INK/Artes/19_O_SOL_4200x4800_300DPI.png',
    defaultSupplier: 'RESERVA_INK',
  },
];

function getFallbackArtworks(): ArtworkData[] {
  try {
    if (!fs.existsSync(ARTWORKS_FILE_PATH)) {
      saveFallbackArtworks(DEFAULT_INITIAL_ARTWORKS);
      return DEFAULT_INITIAL_ARTWORKS;
    }
    const fileData = fs.readFileSync(ARTWORKS_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Erro ao ler artworks.json:', error);
    return DEFAULT_INITIAL_ARTWORKS;
  }
}

function saveFallbackArtworks(artworks: ArtworkData[]): boolean {
  try {
    const dirPath = path.dirname(ARTWORKS_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(ARTWORKS_FILE_PATH, JSON.stringify(artworks, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar artworks.json:', error);
    return false;
  }
}

export async function getArtworksAsync(): Promise<ArtworkData[]> {
  if (prisma) {
    try {
      const dbArtworks = await prisma.artwork.findMany({
        orderBy: { code: 'asc' },
      });
      if (dbArtworks && dbArtworks.length > 0) {
        return dbArtworks.map((a: any) => ({
          id: a.id,
          code: a.code,
          title: a.title,
          concept: a.concept || '',
          promptSchemaUrl: a.promptSchemaUrl || '',
          masterPrintUrl: a.masterPrintUrl || '',
          defaultSupplier: a.defaultSupplier || 'RESERVA_INK',
        }));
      }
    } catch (err) {
      console.warn('PostgreSQL indisponível para Artworks. Usando fallback JSON.', err);
    }
  }
  return getFallbackArtworks();
}

export async function saveArtworkAsync(artwork: ArtworkData): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.artwork.upsert({
        where: { id: artwork.id || 'new-art' },
        update: {
          code: artwork.code,
          title: artwork.title,
          concept: artwork.concept,
          promptSchemaUrl: artwork.promptSchemaUrl,
          masterPrintUrl: artwork.masterPrintUrl,
          defaultSupplier: artwork.defaultSupplier || 'RESERVA_INK',
        },
        create: {
          id: artwork.id || undefined,
          code: artwork.code,
          title: artwork.title,
          concept: artwork.concept,
          promptSchemaUrl: artwork.promptSchemaUrl,
          masterPrintUrl: artwork.masterPrintUrl,
          defaultSupplier: artwork.defaultSupplier || 'RESERVA_INK',
        },
      });
    } catch (err) {
      console.warn('Erro ao salvar Artwork no PostgreSQL. Gravando no fallback JSON.', err);
    }
  }

  const currentList = getFallbackArtworks();
  const index = currentList.findIndex((a) => a.id === artwork.id);
  if (index >= 0) {
    currentList[index] = artwork;
  } else {
    currentList.push(artwork);
  }
  saveFallbackArtworks(currentList);
  return true;
}

export async function deleteArtworkAsync(id: string): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.artwork.delete({ where: { id } });
    } catch (err) {
      console.warn('Erro ao deletar Artwork no PostgreSQL:', err);
    }
  }
  const currentList = getFallbackArtworks().filter((a) => a.id !== id);
  return saveFallbackArtworks(currentList);
}
