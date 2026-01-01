import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Upload } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useLiveRates } from '@/hooks/useLiveRates';
import SummaryCards from '@/components/SummaryCards';
import AccountsSection from '@/components/AccountsSection';
import CashGoldSection from '@/components/CashGoldSection';
import StockPortfolio from '@/components/StockPortfolio';
import IncomeInputs from '@/components/IncomeInputs';
import ExpensesInputs from '@/components/ExpensesInputs';
import VacationManager from '@/components/VacationManager';
import ForecastView from '@/components/ForecastView';
import ChartsView from '@/components/ChartsView';
import Navigation from '@/components/Navigation';
import ReportDownload from '@/components/ReportDownload';
import {
  calculateTotalAssets,
  calculateLiquidAssets,
  calculateForecast,
} from '@/lib/calculations';
import { formatDateTime } from '@/lib/formatting';
import { exportData, importData } from '@/lib/storage';
import { toast } from 'sonner';

export default function Index() {
  const [activeTab, setActiveTab] = useState('vermoegen');
  const { data, updateAccounts, updateStocks, updateIncome, updateExpenses, updateVacations, updateForecastMonths } = useFinancialData();
  const { rates, loading, refresh, refreshStockPrices } = useLiveRates();

  // Update accounts with live rates
  useEffect(() => {
    updateAccounts({
      dollarRate: rates.usdEur,
      goldPricePerOunce: rates.goldPrice,
    });
  }, [rates.usdEur, rates.goldPrice]);

  const handleRefreshAll = async () => {
    await refresh();
    const symbols = data.stocks.map((s) => s.symbol);
    const prices = await refreshStockPrices(symbols);
    
    const updatedStocks = data.stocks.map((stock) => ({
      ...stock,
      currentPrice: prices[stock.symbol] || stock.currentPrice,
    }));
    updateStocks(updatedStocks);
    
    toast.success('Kurse aktualisiert');
  };

  const handleRefreshStocks = async () => {
    const symbols = data.stocks.map((s) => s.symbol);
    const prices = await refreshStockPrices(symbols);
    
    const updatedStocks = data.stocks.map((stock) => ({
      ...stock,
      currentPrice: prices[stock.symbol] || stock.currentPrice,
    }));
    updateStocks(updatedStocks);
    
    toast.success('Aktienkurse aktualisiert');
  };

  const handleExport = () => {
    exportData(data);
    toast.success('Daten exportiert');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importData(file);
      // Update all data sections
      updateAccounts(importedData.accounts);
      updateStocks(importedData.stocks);
      updateIncome(importedData.income);
      updateExpenses(importedData.expenses);
      updateVacations(importedData.vacations);
      updateForecastMonths(importedData.forecastMonths);
      toast.success('Daten importiert');
    } catch (error) {
      toast.error('Fehler beim Importieren der Daten');
    }
  };

  const totalAssets = calculateTotalAssets(data.accounts, data.stocks);
  const liquidAssets = calculateLiquidAssets(data.accounts);
  const forecast = calculateForecast(
    data.income,
    data.expenses,
    data.vacations,
    data.forecastMonths,
    liquidAssets
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              💼 Liquiditätsplaner Ramin
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Kurse vom: {formatDateTime(rates.lastUpdated)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ReportDownload data={data} forecast={forecast} />
            <Button
              onClick={handleRefreshAll}
              disabled={loading}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Aktualisieren
            </Button>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <label>
              <Button variant="outline" className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards totalAssets={totalAssets} liquidAssets={liquidAssets} />

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === 'vermoegen' && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <AccountsSection
                  accounts={data.accounts}
                  onUpdate={updateAccounts}
                />
                <CashGoldSection
                  accounts={data.accounts}
                  onUpdate={updateAccounts}
                />
              </div>
              <StockPortfolio
                stocks={data.stocks}
                onUpdate={updateStocks}
                onRefresh={handleRefreshStocks}
                loading={loading}
              />
            </>
          )}

          {activeTab === 'einnahmen' && (
            <IncomeInputs income={data.income} onUpdate={updateIncome} />
          )}

          {activeTab === 'ausgaben' && (
            <>
              <ExpensesInputs expenses={data.expenses} onUpdate={updateExpenses} />
              <VacationManager
                vacations={data.vacations}
                onUpdate={updateVacations}
              />
            </>
          )}

          {activeTab === 'prognose' && (
            <ForecastView
              forecast={forecast}
              selectedMonths={data.forecastMonths}
              onSelectMonths={updateForecastMonths}
            />
          )}

          {activeTab === 'charts' && (
            <ChartsView
              accounts={data.accounts}
              stocks={data.stocks}
              income={data.income}
            />
          )}
        </div>
      </div>
    </div>
  );
}