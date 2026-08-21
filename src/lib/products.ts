import fs from 'fs';
import path from 'path';
import { Product } from '@/components/catalog/ProductCard';
import { prisma } from './db';

export interface ExtendedProduct extends Product {
  drop?: string;
  showImage?: boolean;
  sortOrder?: number;
  masterSku?: string;
  ncmCode?: string;
  costFactoryPod?: number;
  originCode?: number;
  supplierProvider?: string;
  supplierSku?: string;
  printFileUrl?: string;
}

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');

// Helper to read fallback JSON
function getFallbackProducts(): ExtendedProduct[] {
  try {
    if (!fs.existsSync(PRODUCTS_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
    const parsed: ExtendedProduct[] = JSON.parse(fileData);
    return parsed.map((p, idx) => ({
      ...p,
      drop: p.drop || 'Drop 01',
      showImage: p.showImage !== false && Boolean(p.image),
      sortOrder: p.sortOrder !== undefined ? p.sortOrder : idx,
    }));
  } catch (error) {
    console.error('Erro ao ler products.json:', error);
    return [];
  }
}

// Helper to save fallback JSON
function saveFallbackProducts(products: ExtendedProduct[]): boolean {
  try {
    const dirPath = path.dirname(PRODUCTS_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar products.json:', error);
    return false;
  }
}

// Async API: Try PostgreSQL Prisma first, fallback to JSON
export async function getProductsAsync(): Promise<ExtendedProduct[]> {
  if (prisma) {
    try {
      const dbProducts = await prisma.product.findMany({
        orderBy: { sortOrder: 'asc' },
      });

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts.map((p: any) => ({
          id: p.id,
          code: p.code,
          name: p.name,
          price: p.price,
          pixPrice: p.pixPrice,
          category: p.category,
          drop: p.drop || 'Drop 01',
          description: p.description || '',
          promptSchemaUrl: p.promptSchemaUrl || '',
          image: p.image || '',
          showImage: p.showImage,
          sortOrder: p.sortOrder,
          masterSku: p.masterSku || undefined,
          ncmCode: p.ncmCode || undefined,
          costFactoryPod: p.costFactoryPod || undefined,
          originCode: p.originCode || undefined,
          supplierProvider: p.supplierProvider || 'RESERVA_INK',
          supplierSku: p.supplierSku || undefined,
          printFileUrl: p.printFileUrl || undefined,
        }));
      }
    } catch (err) {
      console.warn('PostgreSQL indisponível no momento. Usando fallback products.json.', err);
    }
  }

  return getFallbackProducts();
}

// Async API: Save to PostgreSQL and Sync Fallback JSON
export async function saveProductAsync(product: ExtendedProduct): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {
          code: product.code,
          name: product.name,
          price: product.price,
          pixPrice: product.pixPrice,
          category: product.category,
          drop: product.drop || 'Drop 01',
          description: product.description,
          promptSchemaUrl: product.promptSchemaUrl,
          image: product.image,
          showImage: product.showImage,
          sortOrder: product.sortOrder || 0,
          masterSku: product.masterSku,
          ncmCode: product.ncmCode,
          costFactoryPod: product.costFactoryPod,
          originCode: product.originCode,
          supplierProvider: product.supplierProvider || 'RESERVA_INK',
          supplierSku: product.supplierSku,
          printFileUrl: product.printFileUrl,
        },
        create: {
          id: product.id,
          code: product.code,
          name: product.name,
          price: product.price,
          pixPrice: product.pixPrice,
          category: product.category,
          drop: product.drop || 'Drop 01',
          description: product.description,
          promptSchemaUrl: product.promptSchemaUrl,
          image: product.image,
          showImage: product.showImage,
          sortOrder: product.sortOrder || 0,
          masterSku: product.masterSku,
          ncmCode: product.ncmCode,
          costFactoryPod: product.costFactoryPod,
          originCode: product.originCode,
          supplierProvider: product.supplierProvider || 'RESERVA_INK',
          supplierSku: product.supplierSku,
          printFileUrl: product.printFileUrl,
        },
      });
    } catch (err) {
      console.warn('Erro ao salvar no PostgreSQL. Gravando no fallback JSON.', err);
    }
  }

  // Always keep fallback JSON updated
  const currentList = getFallbackProducts();
  const index = currentList.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    currentList[index] = product;
  } else {
    currentList.push(product);
  }
  saveFallbackProducts(currentList);

  return true;
}

// Async API: Reorder whole list
export async function saveProductsListAsync(products: ExtendedProduct[]): Promise<boolean> {
  try {
    // Update sortOrder for all items
    const updated = products.map((p, idx) => ({ ...p, sortOrder: idx }));

    for (const p of updated) {
      await saveProductAsync(p);
    }
    return true;
  } catch (err) {
    console.error('Erro ao reordenar lista de produtos:', err);
    return saveFallbackProducts(products);
  }
}

// Async API: Delete product
export async function deleteProductAsync(id: string): Promise<boolean> {
  if (prisma) {
    try {
      await prisma.product.delete({ where: { id } });
    } catch (err) {
      console.warn('Erro ao deletar no DB PostgreSQL:', err);
    }
  }

  const currentList = getFallbackProducts().filter((p) => p.id !== id);
  return saveFallbackProducts(currentList);
}

// Synchronous Sync API for server components rendering
export function getProducts(): ExtendedProduct[] {
  return getFallbackProducts();
}

export function saveProducts(products: ExtendedProduct[]): boolean {
  return saveFallbackProducts(products);
}
