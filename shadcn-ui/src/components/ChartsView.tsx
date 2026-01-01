import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Accounts, Stock, Income } from '@/types';
import { formatCurrency } from '@/lib/formatting';
import { calculateStockProfitLoss, calculatePrivatePatients } from '@/lib/calculations';

interface ChartsViewProps {
  accounts: Accounts;
  stocks: Stock[];
  income: Income;
}

const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#F59E0B', '#FBBF24'];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

export default function ChartsView({ accounts, stocks, income }: ChartsViewProps) {
  // Asset distribution data
  const accountsTotal =
    accounts.apo00 +
    accounts.apo10 +
    accounts.apo20 +
    accounts.spkPrivat +
    accounts.spkMiete +
    accounts.spkSparkonto;
  const cashTotal = accounts.euroCash + accounts.dollarCash * accounts.dollarRate;
  const goldTotal = accounts.goldOunces * accounts.goldPricePerOunce;
  const stocksTotal = stocks.reduce((sum, s) => sum + s.shares * s.currentPrice, 0);

  const assetData = [
    { name: 'Bankkonten', value: accountsTotal },
    { name: 'Bargeld', value: cashTotal },
    { name: 'Gold', value: goldTotal },
    { name: 'Aktien', value: stocksTotal },
  ].filter((item) => item.value > 0);

  // Income sources data
  const privatePatients = calculatePrivatePatients(income);
  const hnoTotal = income.privatHnoWeekly.reduce((sum, w) => sum + w, 0);
  const betaTotal = income.privatBetaWeekly.reduce((sum, w) => sum + w, 0);

  const incomeData = [
    { name: 'Miete', value: income.rentMonthly },
    { name: 'Privat HNO', value: hnoTotal },
    { name: 'Privat Beta', value: betaTotal },
    { name: 'Kassenpatienten', value: income.kassenpatientenMonthly },
    { name: 'KV-Zahlungen', value: income.kvQuarterly / 3 }, // Monthly average
  ].filter((item) => item.value > 0);

  // Stock portfolio distribution
  const stockPortfolioData = stocks
    .map((stock) => ({
      name: stock.symbol,
      value: stock.shares * stock.currentPrice,
    }))
    .filter((item) => item.value > 0);

  // Stock profit/loss data
  const stockProfitLossData = stocks
    .map((stock) => {
      const { profitLoss } = calculateStockProfitLoss(stock);
      return {
        name: stock.symbol,
        'Gewinn/Verlust': profitLoss,
      };
    })
    .sort((a, b) => b['Gewinn/Verlust'] - a['Gewinn/Verlust']);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-blue-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vermögensverteilung</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Einnahmen nach Quelle</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Bar dataKey="value" fill="#16A34A" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio-Verteilung</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockPortfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockPortfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gewinn/Verlust pro Position</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockProfitLossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Bar dataKey="Gewinn/Verlust">
                  {stockProfitLossData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry['Gewinn/Verlust'] >= 0 ? '#16A34A' : '#DC2626'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}