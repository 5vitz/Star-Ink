import fs from 'fs';
import path from 'path';
import { prisma } from './db';

export interface DropData {
  id: string;
  code: string;
  name: string;
  title: string;
  tagline: string;
  description?: string;
  releaseDate?: string;
  status: 'ACTIVE' | 'COMING_SOON' | 'ARCHIVED';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const INITIAL_DROP: DropData = {
  id: 'drop-01-taro-negro',
  code: 'DROP-01',
  name: 'Drop 01 — Tarô Negro',
  title: 'Drop Arcanos do Tarô',
  tagline: 'COLEÇÃO MESTRE • TARÔ NEGRO',
  description: 'Coleção autoral mestre da STAR INK. 12 Arcanos em traço hairline 1px sobre Algodão 100% Pura Fibra.',
  releaseDate: '2026-10-12',
  status: 'ACTIVE',
  isActive: true,
};

const DROPS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'drops.json');

// Read Fallback JSON
function getFallbackDrops(): DropData[] {
  try {
    if (!fs.existsSync(DROPS_FILE_PATH)) {
      saveFallbackDrops([INITIAL_DROP]);
      return [INITIAL_DROP];
    }
    const fileData = fs.readFileSync(DROPS_FILE_PATH, 'utf-8');
    const parsed: DropData[] = JSON.parse(fileData);
    return parsed.length > 0 ? parsed : [INITIAL_DROP];
  } catch (err) {
    console.error('Erro ao ler drops.json:', err);
    return [INITIAL_DROP];
  }
}

// Save Fallback JSON
function saveFallbackDrops(drops: DropData[]): boolean {
  try {
    const dirPath = path.dirname(DROPS_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DROPS_FILE_PATH, JSON.stringify(drops, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Erro ao salvar drops.json:', err);
    return false;
  }
}

// Get All Drops
export async function getDropsAsync(): Promise<DropData[]> {
  if (prisma) {
    try {
      const dbDrops = await prisma.drop.findMany({
        orderBy: { createdAt: 'desc' },
      });

      if (dbDrops && dbDrops.length > 0) {
        return dbDrops.map((d: any) => ({
          id: d.id,
          code: d.code,
          name: d.name,
          title: d.title,
          tagline: d.tagline,
          description: d.description || '',
          releaseDate: d.releaseDate || '',
          status: (d.status as any) || 'ACTIVE',
          isActive: d.isActive,
          createdAt: d.createdAt ? d.createdAt.toISOString() : undefined,
          updatedAt: d.updatedAt ? d.updatedAt.toISOString() : undefined,
        }));
      }
    } catch (err) {
      console.warn('PostgreSQL indisponível no momento. Usando fallback drops.json.', err);
    }
  }

  return getFallbackDrops();
}

// Get Active Drop
export async function getActiveDropAsync(): Promise<DropData> {
  const drops = await getDropsAsync();
  const active = drops.find((d) => d.isActive || d.status === 'ACTIVE');
  return active || drops[0] || INITIAL_DROP;
}

// Save Drop
export async function saveDropAsync(drop: DropData): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.drop.upsert({
        where: { id: drop.id },
        update: {
          code: drop.code,
          name: drop.name,
          title: drop.title,
          tagline: drop.tagline,
          description: drop.description,
          releaseDate: drop.releaseDate,
          status: drop.status,
          isActive: drop.isActive,
        },
        create: {
          id: drop.id,
          code: drop.code,
          name: drop.name,
          title: drop.title,
          tagline: drop.tagline,
          description: drop.description,
          releaseDate: drop.releaseDate,
          status: drop.status,
          isActive: drop.isActive,
        },
      });
    } catch (err) {
      console.warn('Erro ao salvar Drop no DB. Gravando no fallback JSON.', err);
    }
  }

  const currentList = getFallbackDrops();
  const index = currentList.findIndex((d) => d.id === drop.id);

  // If set to active, deactivate others in fallback list
  let updatedList = currentList.map((d) =>
    drop.isActive && d.id !== drop.id ? { ...d, isActive: false } : d
  );

  if (index >= 0) {
    updatedList[index] = drop;
  } else {
    updatedList.push(drop);
  }

  return saveFallbackDrops(updatedList);
}

// Delete Drop
export async function deleteDropAsync(id: string): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.drop.delete({ where: { id } });
    } catch (err) {
      console.warn('Erro ao deletar Drop no DB:', err);
    }
  }

  const currentList = getFallbackDrops().filter((d) => d.id !== id);
  return saveFallbackDrops(currentList);
}
