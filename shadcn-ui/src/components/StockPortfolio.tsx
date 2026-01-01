import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';
import { Stock } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/formatting';
import { calculateStockProfitLoss, calculateStockPortfolioValue } from '@/lib/calculations';

interface StockPortfolioProps {
  stocks: Stock[];
  onUpdate: (stocks: Stock[]) => void;
  onRefresh: () => void;
  loading?: boolean;
}

export default function StockPortfolio({
  stocks,
  onUpdate,
  onRefresh,
  loading = false,
}: StockPortfolioProps) {
  const totalValue = calculateStockPortfolioValue(stocks);
  const totalBuyValue = stocks.reduce((sum, s) => sum + s.shares * s.buyPrice, 0);
  const totalProfitLoss = totalValue - totalBuyValue;
  const totalProfitLossPercent = totalBuyValue > 0 ? (totalProfitLoss / totalBuyValue) * 100 : 0;

  const handlePriceChange = (index: number, value: string) => {
    const newStocks = [...stocks];
    newStocks[index].currentPrice = parseFloat(value) || 0;
    onUpdate(newStocks);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Aktienportfolio</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Aktualisieren
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Aktie</th>
                <th className="text-right py-3 px-2">Stück</th>
                <th className="text-right py-3 px-2">Kaufkurs</th>
                <th className="text-right py-3 px-2">Akt. Kurs</th>
                <th className="text-right py-3 px-2">Wert</th>
                <th className="text-right py-3 px-2">+/-</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => {
                const { profitLoss, profitLossPercent, currentValue } =
                  calculateStockProfitLoss(stock);
                const isProfit = profitLoss >= 0;

                return (
                  <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-xs text-gray-500">{stock.symbol}</div>
                    </td>
                    <td className="text-right py-3 px-2">{stock.shares}</td>
                    <td className="text-right py-3 px-2">
                      {formatCurrency(stock.buyPrice)}
                    </td>
                    <td className="text-right py-3 px-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={stock.currentPrice}
                        onChange={(e) => handlePriceChange(index, e.target.value)}
                        className="w-24 h-8 text-right text-sm"
                      />
                    </td>
                    <td className="text-right py-3 px-2 font-medium">
                      {formatCurrency(currentValue)}
                    </td>
                    <td
                      className={`text-right py-3 px-2 font-semibold ${
                        isProfit ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatPercentage(profitLossPercent)}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td colSpan={4} className="py-3 px-2">
                  SUMME PORTFOLIO
                </td>
                <td className="text-right py-3 px-2">{formatCurrency(totalValue)}</td>
                <td
                  className={`text-right py-3 px-2 ${
                    totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {formatPercentage(totalProfitLossPercent)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}