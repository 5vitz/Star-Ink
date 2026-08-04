import fs from 'fs';
import path from 'path';

export type KanbanStage = 'Aguardando' | 'Imprimindo DTG' | 'Embalagem' | 'Em Trânsito' | 'Entregue';

export interface ProductionOrder {
  id: string;
  orderId: string;
  customerName: string;
  item: string;
  size: string;
  color: string;
  supplier: 'Reserva INK PoD' | 'Dimona PoD' | 'Estoque Físico' | 'Private Label CMT';
  supplierSku: string;
  costPrice: number;
  stage: KanbanStage;
  trackingCode: string;
  createdAt: string;
}

export interface SampleOrder {
  id: string;
  artworkName: string;
  size: string;
  supplier: string;
  costPrice: number;
  status: string;
  requestedAt: string;
  arrivedAt: string;
  trackingCode: string;
  notes: string;
}

const ORDERS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'production_orders.json');
const SAMPLES_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'samples.json');

export function getProductionOrders(): ProductionOrder[] {
  try {
    if (!fs.existsSync(ORDERS_FILE_PATH)) return [];
    const data = fs.readFileSync(ORDERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler production_orders.json:', error);
    return [];
  }
}

export function saveProductionOrders(orders: ProductionOrder[]): boolean {
  try {
    const dirPath = path.dirname(ORDERS_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar production_orders.json:', error);
    return false;
  }
}

export function getSampleOrders(): SampleOrder[] {
  try {
    if (!fs.existsSync(SAMPLES_FILE_PATH)) return [];
    const data = fs.readFileSync(SAMPLES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler samples.json:', error);
    return [];
  }
}

export function saveSampleOrders(samples: SampleOrder[]): boolean {
  try {
    const dirPath = path.dirname(SAMPLES_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(SAMPLES_FILE_PATH, JSON.stringify(samples, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar samples.json:', error);
    return false;
  }
}
