import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'vermoegen', label: 'Vermögen' },
    { id: 'einnahmen', label: 'Einnahmen' },
    { id: 'ausgaben', label: 'Ausgaben' },
    { id: 'prognose', label: 'Prognose' },
    { id: 'charts', label: 'Auswertung' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          onClick={() => onTabChange(tab.id)}
          className="font-semibold"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}