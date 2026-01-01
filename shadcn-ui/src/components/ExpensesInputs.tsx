import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Expenses } from '@/types';
import { formatCurrency } from '@/lib/formatting';
import { calculateTotalExpenses } from '@/lib/calculations';

interface ExpensesInputsProps {
  expenses: Expenses;
  onUpdate: (updates: Partial<Expenses>) => void;
}

export default function ExpensesInputs({ expenses, onUpdate }: ExpensesInputsProps) {
  const monthlyExpenses = calculateTotalExpenses(expenses);
  const totalWithQuarterlyTax = monthlyExpenses + expenses.finanzamtQuarterly / 3;

  const handleChange = (field: keyof Expenses, value: string) => {
    onUpdate({ [field]: parseFloat(value) || 0 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ausgaben</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="fixkostenMonthly">Fixkosten (monatlich)</Label>
            <Input
              id="fixkostenMonthly"
              type="number"
              value={expenses.fixkostenMonthly}
              onChange={(e) => handleChange('fixkostenMonthly', e.target.value)}
              placeholder="80.000,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finanzamtQuarterly">Finanzamt (quartalsweise)</Label>
            <Input
              id="finanzamtQuarterly"
              type="number"
              value={expenses.finanzamtQuarterly}
              onChange={(e) => handleChange('finanzamtQuarterly', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
            <p className="text-xs text-gray-500">
              Zahlung in März, Juni, September, Dezember
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variableMonthly">Variable Kosten (monatlich)</Label>
            <Input
              id="variableMonthly"
              type="number"
              value={expenses.variableMonthly}
              onChange={(e) => handleChange('variableMonthly', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monatliche Ausgaben (ohne Finanzamt):</span>
            <span className="font-semibold">{formatCurrency(monthlyExpenses)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Finanzamt (Ø pro Monat):</span>
            <span className="font-semibold">{formatCurrency(expenses.finanzamtQuarterly / 3)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
            <span>Durchschnittliche Ausgaben pro Monat:</span>
            <span>{formatCurrency(totalWithQuarterlyTax)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}