import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accounts } from '@/types';
import { formatCurrency } from '@/lib/formatting';

interface CashGoldSectionProps {
  accounts: Accounts;
  onUpdate: (updates: Partial<Accounts>) => void;
}

export default function CashGoldSection({ accounts, onUpdate }: CashGoldSectionProps) {
  const dollarInEur = accounts.dollarCash * accounts.dollarRate;
  const goldValue = accounts.goldOunces * accounts.goldPricePerOunce;

  const handleChange = (field: keyof Accounts, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({ [field]: numValue });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Barbestände & Gold</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="euroCash">Euro bar (Reserve)</Label>
            <Input
              id="euroCash"
              type="number"
              value={accounts.euroCash}
              onChange={(e) => handleChange('euroCash', e.target.value)}
              placeholder="15.000,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label>Dollar bar (fest)</Label>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">15.700 USD</div>
              <div className="text-sm font-semibold text-blue-700">
                = {formatCurrency(dollarInEur)}
              </div>
              <div className="text-xs text-gray-500">
                Kurs: {accounts.dollarRate.toFixed(4)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goldOunces">Gold (Unzen)</Label>
            <Input
              id="goldOunces"
              type="number"
              step="0.01"
              value={accounts.goldOunces}
              onChange={(e) => handleChange('goldOunces', e.target.value)}
              placeholder="0,00"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label>Goldwert</Label>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">
                Preis/Unze: {formatCurrency(accounts.goldPricePerOunce)}
              </div>
              <div className="text-sm font-semibold text-yellow-700">
                = {formatCurrency(goldValue)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}