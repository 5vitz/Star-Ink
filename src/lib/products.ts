import fs from 'fs';
import path from 'path';
import { Product } from '@/components/catalog/ProductCard';

export interface ExtendedProduct extends Product {
  showImage?: boolean;
}

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');

export function getProducts(): ExtendedProduct[] {
  try {
    if (!fs.existsSync(PRODUCTS_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
    const parsed: ExtendedProduct[] = JSON.parse(fileData);
    return parsed.map((p) => ({
      ...p,
      showImage: p.showImage !== false && Boolean(p.image),
    }));
  } catch (error) {
    console.error('Erro ao ler products.json:', error);
    return [];
  }
}

export function saveProducts(products: ExtendedProduct[]): boolean {
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
