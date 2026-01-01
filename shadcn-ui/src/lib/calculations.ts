import { Accounts, Stock, Income, Expenses, Vacation, ForecastMonth } from '@/types';
import { addMonths, differenceInDays, startOfMonth, endOfMonth, isWeekend } from 'date-fns';

/**
 * Calculate total assets (Gesamtvermögen)
 */
export const calculateTotalAssets = (
  accounts: Accounts,
  stocks: Stock[]
): number => {
  const accountsTotal =
    accounts.apo00 +
    accounts.apo10 +
    accounts.apo20 +
    accounts.spkPrivat +
    accounts.spkMiete +
    accounts.spkSparkonto +
    accounts.euroCash;

  const dollarValue = accounts.dollarCash * accounts.dollarRate;
  const goldValue = accounts.goldOunces * accounts.goldPricePerOunce;
  const stocksValue = calculateStockPortfolioValue(stocks);

  return accountsTotal + dollarValue + goldValue + stocksValue;
};

/**
 * Calculate liquid assets (Bar verfügbar)
 */
export const calculateLiquidAssets = (accounts: Accounts): number => {
  return (
    accounts.apo00 +
    accounts.apo10 +
    accounts.apo20 +
    accounts.spkPrivat +
    accounts.spkMiete +
    accounts.spkSparkonto
  );
};

/**
 * Calculate stock portfolio total value
 */
export const calculateStockPortfolioValue = (stocks: Stock[]): number => {
  return stocks.reduce((sum, stock) => {
    return sum + stock.shares * stock.currentPrice;
  }, 0);
};

/**
 * Calculate stock profit/loss
 */
export const calculateStockProfitLoss = (stock: Stock): {
  profitLoss: number;
  profitLossPercent: number;
  currentValue: number;
  buyValue: number;
} => {
  const currentValue = stock.shares * stock.currentPrice;
  const buyValue = stock.shares * stock.buyPrice;
  const profitLoss = currentValue - buyValue;
  const profitLossPercent = buyValue > 0 ? (profitLoss / buyValue) * 100 : 0;

  return { profitLoss, profitLossPercent, currentValue, buyValue };
};

/**
 * Calculate total monthly private patients income
 */
export const calculatePrivatePatients = (income: Income): number => {
  const hnoTotal = income.privatHnoWeekly.reduce((sum, week) => sum + week, 0);
  const betaTotal = income.privatBetaWeekly.reduce((sum, week) => sum + week, 0);
  return hnoTotal + betaTotal;
};

/**
 * Calculate total monthly expenses (base expenses without quarterly tax)
 */
export const calculateTotalExpenses = (expenses: Expenses): number => {
  return expenses.fixkostenMonthly + expenses.variableMonthly;
};

/**
 * Get working days in a month (excluding weekends)
 */
const getWorkingDaysInMonth = (date: Date): number => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  let workingDays = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (!isWeekend(d)) {
      workingDays++;
    }
  }

  return workingDays;
};

/**
 * Get vacation days in a specific month
 */
const getVacationDaysInMonth = (date: Date, vacations: Vacation[]): number => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  let vacationDays = 0;

  vacations.forEach((vacation) => {
    const vacStart = new Date(vacation.from);
    const vacEnd = new Date(vacation.to);

    // Find overlap between vacation and month
    const overlapStart = vacStart > monthStart ? vacStart : monthStart;
    const overlapEnd = vacEnd < monthEnd ? vacEnd : monthEnd;

    if (overlapStart <= overlapEnd) {
      // Count all days in overlap period (including weekends for week calculation)
      const days = differenceInDays(overlapEnd, overlapStart) + 1;
      vacationDays += days;
    }
  });

  return vacationDays;
};

/**
 * Check if month is quarter end (March, June, September, December)
 */
const isQuarterEnd = (date: Date): boolean => {
  const month = date.getMonth(); // 0-11
  return month === 2 || month === 5 || month === 8 || month === 11;
};

/**
 * Calculate liquidity forecast
 */
export const calculateForecast = (
  income: Income,
  expenses: Expenses,
  vacations: Vacation[],
  forecastMonths: number,
  startingBalance: number
): ForecastMonth[] => {
  const forecast: ForecastMonth[] = [];
  let cumulativeBalance = startingBalance;
  const today = new Date();
  const WEEKS_PER_MONTH = 4.33;

  for (let i = 0; i < forecastMonths; i++) {
    const currentMonth = addMonths(today, i);
    const vacationDays = getVacationDaysInMonth(currentMonth, vacations);
    
    // Convert vacation days to weeks
    const vacationWeeks = vacationDays / 7;
    
    // Calculate working weeks factor (how many weeks are actually worked)
    const workingWeeks = Math.max(0, WEEKS_PER_MONTH - vacationWeeks);
    const workingWeeksFactor = workingWeeks / WEEKS_PER_MONTH;
    
    // For display purposes, calculate working ratio based on working days
    const workingDays = getWorkingDaysInMonth(currentMonth);
    const vacationWorkingDays = Math.min(vacationDays, workingDays); // Cap at working days
    const workingRatio = workingDays > 0 ? Math.max(0, (workingDays - vacationWorkingDays) / workingDays) : 0;

    // Calculate practice income (reduced by vacation weeks)
    const privatePatients = calculatePrivatePatients(income);
    const practiceIncome = (privatePatients + income.kassenpatientenMonthly) * workingWeeksFactor;

    // Rent always continues (NOT affected by vacation)
    const rentIncome = income.rentMonthly;

    // KV payment only in quarter-end months, also reduced by vacation
    const isKvMonth = isQuarterEnd(currentMonth);
    const kvPayment = isKvMonth ? (income.kvQuarterly + income.kvSonderzahlung) * workingWeeksFactor : 0;

    const totalIncome = practiceIncome + rentIncome + kvPayment;

    // Base expenses (monthly) - NOT affected by vacation
    const monthlyExpenses = expenses.fixkostenMonthly + expenses.variableMonthly;
    
    // Finanzamt payment only in quarter-end months
    const finanzamtPayment = isQuarterEnd(currentMonth) ? expenses.finanzamtQuarterly : 0;
    
    const totalExpenses = monthlyExpenses + finanzamtPayment;
    const surplus = totalIncome - totalExpenses;
    cumulativeBalance += surplus;

    forecast.push({
      month: currentMonth.toISOString(),
      income: totalIncome,
      expenses: totalExpenses,
      surplus,
      cumulativeBalance,
      workingRatio,
    });
  }

  return forecast;
};