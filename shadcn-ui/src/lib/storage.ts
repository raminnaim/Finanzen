import { FinancialData } from '@/types';

const STORAGE_KEY = 'hno-praxis-financial-data';

/**
 * Get initial/default financial data
 */
export const getDefaultData = (): FinancialData => ({
  accounts: {
    apo00: 0,
    apo10: 0,
    apo20: 0,
    spkPrivat: 0,
    spkMiete: 0,
    spkSparkonto: 0,
    euroCash: 15000,
    dollarCash: 15700,
    dollarRate: 0.92,
    goldOunces: 0,
    goldPricePerOunce: 2450,
  },
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 25, buyPrice: 174.49, currentPrice: 235.0 },
    { symbol: 'DBK.DE', name: 'Deutsche Bank AG', shares: 50, buyPrice: 9.14, currentPrice: 33.2 },
    { symbol: 'PAH3.DE', name: 'Porsche AG Vz.', shares: 4, buyPrice: 116.0, currentPrice: 45.0 },
    { symbol: 'OGZD', name: 'Gazprom ADR', shares: 190, buyPrice: 8.12, currentPrice: 2.7 },
    { symbol: 'SBUX', name: 'Starbucks Corp.', shares: 15, buyPrice: 79.53, currentPrice: 72.0 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 6, buyPrice: 312.17, currentPrice: 392.0 },
  ],
  income: {
    rentMonthly: 0,
    kassenpatientenMonthly: 0,
    privatHnoWeekly: [0, 0, 0, 0, 0],
    privatBetaWeekly: [0, 0, 0, 0, 0],
    kvQuarterly: 0,
    kvSonderzahlung: 0,
    kvQuarter: 'Q1',
  },
  expenses: {
    fixkostenMonthly: 80000,
    finanzamtMonthly: 0,
    variableMonthly: 0,
  },
  vacations: [],
  forecastMonths: 12,
});

/**
 * Load financial data from localStorage
 */
export const loadData = (): FinancialData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      return { ...getDefaultData(), ...parsed };
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return getDefaultData();
};

/**
 * Save financial data to localStorage
 */
export const saveData = (data: FinancialData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

/**
 * Export data as JSON file
 */
export const exportData = (data: FinancialData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `liquiditaetsplaner-ramin-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Import data from JSON file
 */
export const importData = (file: File): Promise<FinancialData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};