import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { ForecastMonth } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatting';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface ForecastViewProps {
  forecast: ForecastMonth[];
  selectedMonths: number;
  onSelectMonths: (months: number) => void;
}

export default function ForecastView({
  forecast,
  selectedMonths,
  onSelectMonths,
}: ForecastViewProps) {
  const hasNegativeBalance = forecast.some((m) => m.cumulativeBalance < 0);

  const chartData = forecast.map((month) => ({
    name: format(new Date(month.month), 'MMM yy', { locale: de }),
    Einnahmen: month.income,
    Ausgaben: month.expenses,
    Liquidität: month.cumulativeBalance,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prognosezeitraum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[1, 3, 6, 12, 24].map((months) => (
              <Button
                key={months}
                variant={selectedMonths === months ? 'default' : 'outline'}
                onClick={() => onSelectMonths(months)}
              >
                {months} {months === 1 ? 'Monat' : 'Monate'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {hasNegativeBalance && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Warnung: Die Liquidität wird in den kommenden Monaten voraussichtlich negativ!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liquiditätsverlauf</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: '#1F2937' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Liquidität"
                stroke="#1E40AF"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Einnahmen vs. Ausgaben</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: '#1F2937' }}
              />
              <Legend />
              <Bar dataKey="Einnahmen" fill="#16A34A" />
              <Bar dataKey="Ausgaben" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monatliche Aufschlüsselung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Monat</th>
                  <th className="text-right py-3 px-2">Einnahmen</th>
                  <th className="text-right py-3 px-2">Ausgaben</th>
                  <th className="text-right py-3 px-2">Überschuss</th>
                  <th className="text-right py-3 px-2">Kontostand</th>
                  <th className="text-center py-3 px-2">Arbeitstage</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((month, index) => {
                  const isNegative = month.cumulativeBalance < 0;
                  const isSurplusNegative = month.surplus < 0;

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        {format(new Date(month.month), 'MMMM yyyy', { locale: de })}
                      </td>
                      <td className="text-right py-3 px-2 text-green-600">
                        {formatCurrency(month.income)}
                      </td>
                      <td className="text-right py-3 px-2 text-red-600">
                        {formatCurrency(month.expenses)}
                      </td>
                      <td
                        className={`text-right py-3 px-2 font-semibold ${
                          isSurplusNegative ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {formatCurrency(month.surplus)}
                      </td>
                      <td
                        className={`text-right py-3 px-2 font-bold ${
                          isNegative ? 'text-red-600' : 'text-blue-900'
                        }`}
                      >
                        {formatCurrency(month.cumulativeBalance)}
                      </td>
                      <td className="text-center py-3 px-2">
                        {(month.workingRatio * 100).toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}