import fs from 'fs';
import path from 'path';

export interface DreItem {
  category: string;
  amount: number;
  percent: number;
}

export interface UnitEconomics {
  ticketPrice: number;
  simplesNacionalTaxPercent: number;
  simplesNacionalTaxAmount: number;
  podFactoryCost: number;
  gatewayFeeAverage: number;
  netProfitPerPiece: number;
  netMarginPercent: number;
}

export interface FinancialData {
  grossRevenue: number;
  netRevenue: number;
  totalOrders: number;
  pixOrders: number;
  creditCardOrders: number;
  pixDiscountTotal: number;
  unitEconomics: UnitEconomics;
  dreBreakdown: DreItem[];
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  cpf: string;
  amount: number;
  paymentMethod: string;
  status: string;
  nfeNumber: string;
  blingKey: string;
  emittedAt: string;
}

const FINANCIALS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'financials.json');
const INVOICES_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'invoices.json');

export function getFinancials(): FinancialData {
  try {
    if (!fs.existsSync(FINANCIALS_FILE_PATH)) {
      return {
        grossRevenue: 1800.0,
        netRevenue: 1728.0,
        totalOrders: 10,
        pixOrders: 8,
        creditCardOrders: 2,
        pixDiscountTotal: 72.0,
        unitEconomics: {
          ticketPrice: 180.0,
          simplesNacionalTaxPercent: 4.0,
          simplesNacionalTaxAmount: 7.2,
          podFactoryCost: 49.0,
          gatewayFeeAverage: 1.8,
          netProfitPerPiece: 122.0,
          netMarginPercent: 67.7,
        },
        dreBreakdown: [],
      };
    }
    const data = fs.readFileSync(FINANCIALS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler financials.json:', error);
    throw error;
  }
}

export function saveFinancials(data: FinancialData): boolean {
  try {
    const dirPath = path.dirname(FINANCIALS_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(FINANCIALS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar financials.json:', error);
    return false;
  }
}

export function getInvoices(): Invoice[] {
  try {
    if (!fs.existsSync(INVOICES_FILE_PATH)) return [];
    const data = fs.readFileSync(INVOICES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler invoices.json:', error);
    return [];
  }
}

export function saveInvoices(invoices: Invoice[]): boolean {
  try {
    const dirPath = path.dirname(INVOICES_FILE_PATH);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(INVOICES_FILE_PATH, JSON.stringify(invoices, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar invoices.json:', error);
    return false;
  }
}

// Calculador dinâmico de Unit Economics
export function calculateUnitEconomics(
  price: number,
  factoryCost: number = 49.0,
  taxPercent: number = 4.0
): UnitEconomics {
  const taxAmount = price * (taxPercent / 100);
  const gatewayFee = price * 0.01; // ~1% average PIX fee
  const netProfit = price - taxAmount - factoryCost - gatewayFee;
  const marginPercent = price > 0 ? (netProfit / price) * 100 : 0;

  return {
    ticketPrice: price,
    simplesNacionalTaxPercent: taxPercent,
    simplesNacionalTaxAmount: Number(taxAmount.toFixed(2)),
    podFactoryCost: factoryCost,
    gatewayFeeAverage: Number(gatewayFee.toFixed(2)),
    netProfitPerPiece: Number(netProfit.toFixed(2)),
    netMarginPercent: Number(marginPercent.toFixed(1)),
  };
}
