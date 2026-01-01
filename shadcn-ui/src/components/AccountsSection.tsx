import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accounts } from '@/types';

interface AccountsSectionProps {
  accounts: Accounts;
  onUpdate: (updates: Partial<Accounts>) => void;
}

export default function AccountsSection({ accounts, onUpdate }: AccountsSectionProps) {
  const handleChange = (field: keyof Accounts, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate({ [field]: numValue });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Konten</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="apo00">Apo-Kontostand 00</Label>
            <Input
              id="apo00"
              type="number"
              value={accounts.apo00}
              onChange={(e) => handleChange('apo00', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apo10">Apo-Kontostand 10</Label>
            <Input
              id="apo10"
              type="number"
              value={accounts.apo10}
              onChange={(e) => handleChange('apo10', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apo20">Apo-Kontostand 20</Label>
            <Input
              id="apo20"
              type="number"
              value={accounts.apo20}
              onChange={(e) => handleChange('apo20', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spkPrivat">SPK Privat</Label>
            <Input
              id="spkPrivat"
              type="number"
              value={accounts.spkPrivat}
              onChange={(e) => handleChange('spkPrivat', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spkMiete">SPK Miete</Label>
            <Input
              id="spkMiete"
              type="number"
              value={accounts.spkMiete}
              onChange={(e) => handleChange('spkMiete', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spkSparkonto">SPK Sparkonto</Label>
            <Input
              id="spkSparkonto"
              type="number"
              value={accounts.spkSparkonto}
              onChange={(e) => handleChange('spkSparkonto', e.target.value)}
              placeholder="0,00 €"
              className="text-right"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}