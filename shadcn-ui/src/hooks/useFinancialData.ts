import { useState, useEffect, useCallback } from 'react';
import { FinancialData } from '@/types';
import { loadData, saveData } from '@/lib/storage';

export const useFinancialData = () => {
  const [data, setData] = useState<FinancialData>(loadData());

  // Auto-save whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const updateAccounts = useCallback((updates: Partial<FinancialData['accounts']>) => {
    setData((prev) => ({
      ...prev,
      accounts: { ...prev.accounts, ...updates },
    }));
  }, []);

  const updateStocks = useCallback((stocks: FinancialData['stocks']) => {
    setData((prev) => ({ ...prev, stocks }));
  }, []);

  const updateIncome = useCallback((updates: Partial<FinancialData['income']>) => {
    setData((prev) => ({
      ...prev,
      income: { ...prev.income, ...updates },
    }));
  }, []);

  const updateExpenses = useCallback((updates: Partial<FinancialData['expenses']>) => {
    setData((prev) => ({
      ...prev,
      expenses: { ...prev.expenses, ...updates },
    }));
  }, []);

  const updateVacations = useCallback((vacations: FinancialData['vacations']) => {
    setData((prev) => ({ ...prev, vacations }));
  }, []);

  const updateForecastMonths = useCallback((months: number) => {
    setData((prev) => ({ ...prev, forecastMonths: months }));
  }, []);

  return {
    data,
    updateAccounts,
    updateStocks,
    updateIncome,
    updateExpenses,
    updateVacations,
    updateForecastMonths,
  };
};