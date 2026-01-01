export interface Accounts {
  apo00: number;
  apo10: number;
  apo20: number;
  spkPrivat: number;
  spkMiete: number;
  spkSparkonto: number;
  euroCash: number;
  dollarCash: number;
  dollarRate: number;
  goldOunces: number;
  goldPricePerOunce: number;
}

export interface Stock {
  symbol: string;
  name: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
}

export interface Income {
  rentMonthly: number;
  kassenpatientenMonthly: number;
  privatHnoWeekly: number[];
  privatBetaWeekly: number[];
  kvQuarterly: number;
  kvSonderzahlung: number;
  kvQuarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

export interface Expenses {
  fixkostenMonthly: number;
  finanzamtQuarterly: number;
  variableMonthly: number;
}

export interface Vacation {
  from: string;
  to: string;
}

export interface FinancialData {
  accounts: Accounts;
  stocks: Stock[];
  income: Income;
  expenses: Expenses;
  vacations: Vacation[];
  forecastMonths: number;
}

export interface ForecastMonth {
  month: string;
  income: number;
  expenses: number;
  surplus: number;
  cumulativeBalance: number;
  workingRatio: number;
}

export interface LiveRates {
  usdEur: number;
  goldPrice: number;
  lastUpdated: string;
}