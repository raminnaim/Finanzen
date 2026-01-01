import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Vacation } from '@/types';
import { formatDate } from '@/lib/formatting';

interface VacationManagerProps {
  vacations: Vacation[];
  onUpdate: (vacations: Vacation[]) => void;
}

export default function VacationManager({ vacations, onUpdate }: VacationManagerProps) {
  const addVacation = () => {
    onUpdate([...vacations, { from: '', to: '' }]);
  };

  const removeVacation = (index: number) => {
    const newVacations = vacations.filter((_, i) => i !== index);
    onUpdate(newVacations);
  };

  const updateVacation = (index: number, field: 'from' | 'to', value: string) => {
    const newVacations = [...vacations];
    newVacations[index][field] = value;
    onUpdate(newVacations);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Urlaubs-/Ausfallzeiten</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {vacations.length === 0 ? (
          <p className="text-sm text-gray-500">Keine Urlaubszeiten eingetragen</p>
        ) : (
          <div className="space-y-3">
            {vacations.map((vacation, index) => (
              <div
                key={index}
                className="flex items-end gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`vacation-from-${index}`} className="text-xs">
                    Von
                  </Label>
                  <Input
                    id={`vacation-from-${index}`}
                    type="date"
                    value={vacation.from}
                    onChange={(e) => updateVacation(index, 'from', e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`vacation-to-${index}`} className="text-xs">
                    Bis
                  </Label>
                  <Input
                    id={`vacation-to-${index}`}
                    type="date"
                    value={vacation.to}
                    onChange={(e) => updateVacation(index, 'to', e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeVacation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button onClick={addVacation} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Urlaubszeit hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
}