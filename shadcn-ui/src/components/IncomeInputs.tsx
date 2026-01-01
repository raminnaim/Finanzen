import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Income } from '@/types';
import { formatCurrency } from '@/lib/formatting';

interface IncomeInputsProps {
  income: Income;
  onUpdate: (updates: Partial<Income>) => void;
}

export default function IncomeInputs({ income, onUpdate }: IncomeInputsProps) {
  const hnoTotal = income.privatHnoWeekly.reduce((sum, week) => sum + week, 0);
  const betaTotal = income.privatBetaWeekly.reduce((sum, week) => sum + week, 0);
  const privateTotal = hnoTotal + betaTotal;

  const handleChange = (field: keyof Income, value: string | number) => {
    if (typeof value === 'string' && field !== 'kvQuarter') {
      onUpdate({ [field]: parseFloat(value) || 0 });
    } else {
      onUpdate({ [field]: value });
    }
  };

  const handleWeeklyChange = (
    field: 'privatHnoWeekly' | 'privatBetaWeekly',
    index: number,
    value: string
  ) => {
    const newWeekly = [...income[field]];
    newWeekly[index] = parseFloat(value) || 0;
    onUpdate({ [field]: newWeekly });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monatliche Einnahmen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rentMonthly">Mieteinnahmen</Label>
              <Input
                id="rentMonthly"
                type="number"
                value={income.rentMonthly}
                onChange={(e) => handleChange('rentMonthly', e.target.value)}
                placeholder="0,00 €"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kassenpatientenMonthly">Kassenpatienten Umsatz</Label>
              <Input
                id="kassenpatientenMonthly"
                type="number"
                value={income.kassenpatientenMonthly}
                onChange={(e) => handleChange('kassenpatientenMonthly', e.target.value)}
                placeholder="0,00 €"
                className="text-right"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Privatpatienten (wöchentlich)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-blue-700">HNO-Zentrum Bonn</h4>
            <div className="grid gap-3 md:grid-cols-5">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-1">
                  <Label htmlFor={`hno-week-${index + 1}`} className="text-xs">
                    Woche {index + 1}
                  </Label>
                  <Input
                    id={`hno-week-${index + 1}`}
                    type="number"
                    value={income.privatHnoWeekly[index]}
                    onChange={(e) =>
                      handleWeeklyChange('privatHnoWeekly', index, e.target.value)
                    }
                    placeholder="0 €"
                    className="text-right"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold text-blue-700">
              Summe HNO: {formatCurrency(hnoTotal)}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-green-700">Betaklinik</h4>
            <div className="grid gap-3 md:grid-cols-5">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-1">
                  <Label htmlFor={`beta-week-${index + 1}`} className="text-xs">
                    Woche {index + 1}
                  </Label>
                  <Input
                    id={`beta-week-${index + 1}`}
                    type="number"
                    value={income.privatBetaWeekly[index]}
                    onChange={(e) =>
                      handleWeeklyChange('privatBetaWeekly', index, e.target.value)
                    }
                    placeholder="0 €"
                    className="text-right"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold text-green-700">
              Summe Beta: {formatCurrency(betaTotal)}
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="text-base font-bold text-gray-900">
              Gesamt Privatpatienten: {formatCurrency(privateTotal)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">KV-Zahlungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="kvQuarterly">KV Quartalszahlung</Label>
              <Input
                id="kvQuarterly"
                type="number"
                value={income.kvQuarterly}
                onChange={(e) => handleChange('kvQuarterly', e.target.value)}
                placeholder="0,00 €"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kvSonderzahlung">KV Restzahlung/Sonderzahlung</Label>
              <Input
                id="kvSonderzahlung"
                type="number"
                value={income.kvSonderzahlung}
                onChange={(e) => handleChange('kvSonderzahlung', e.target.value)}
                placeholder="0,00 €"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kvQuarter">Quartal</Label>
              <Select
                value={income.kvQuarter}
                onValueChange={(value) => handleChange('kvQuarter', value)}
              >
                <SelectTrigger id="kvQuarter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1 (März)</SelectItem>
                  <SelectItem value="Q2">Q2 (Juni)</SelectItem>
                  <SelectItem value="Q3">Q3 (September)</SelectItem>
                  <SelectItem value="Q4">Q4 (Dezember)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}