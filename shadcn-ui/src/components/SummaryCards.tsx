import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/formatting';

interface SummaryCardsProps {
  totalAssets: number;
  liquidAssets: number;
}

export default function SummaryCards({ totalAssets, liquidAssets }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Gesamtvermögen
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900">
            {formatCurrency(totalAssets)}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Bar verfügbar
          </CardTitle>
          <Wallet className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900">
            {formatCurrency(liquidAssets)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}