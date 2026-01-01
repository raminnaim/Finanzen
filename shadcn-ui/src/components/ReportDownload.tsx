import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileDown } from 'lucide-react';
import { FinancialData, ForecastMonth } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatting';
import {
  calculateTotalAssets,
  calculateLiquidAssets,
  calculateStockPortfolioValue,
  calculateStockProfitLoss,
  calculatePrivatePatients,
  calculateTotalExpenses,
} from '@/lib/calculations';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportDownloadProps {
  data: FinancialData;
  forecast: ForecastMonth[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

export default function ReportDownload({ data, forecast }: ReportDownloadProps) {
  const [open, setOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState('12');
  const [generating, setGenerating] = useState(false);

  const generatePDF = () => {
    setGenerating(true);

    try {
      const doc = new jsPDF() as JsPDFWithAutoTable;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 14;
      let yPos = 20;

      // Helper function to add section title
      const addSectionTitle = (title: string) => {
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 64, 175); // Blue-900
        doc.text(title, margin, yPos);
        yPos += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
      };

      // Header
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 64, 175);
      doc.text('💼 Liquiditätsplaner Ramin', margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Bericht vom ${formatDate(new Date())}`, margin, yPos);
      doc.text(`Prognosezeitraum: ${selectedMonths} Monate`, pageWidth - margin - 60, yPos);
      yPos += 5;

      // Line separator
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      // 1. Vermögensübersicht
      addSectionTitle('1. Vermögensübersicht');

      const totalAssets = calculateTotalAssets(data.accounts, data.stocks);
      const liquidAssets = calculateLiquidAssets(data.accounts);
      const stocksValue = calculateStockPortfolioValue(data.stocks);
      const goldValue = data.accounts.goldOunces * data.accounts.goldPricePerOunce;
      const cashValue = data.accounts.euroCash + data.accounts.dollarCash * data.accounts.dollarRate;

      autoTable(doc, {
        startY: yPos,
        head: [['Kategorie', 'Betrag']],
        body: [
          ['Gesamtvermögen', formatCurrency(totalAssets)],
          ['Bar verfügbar (Konten)', formatCurrency(liquidAssets)],
          ['Bargeld & Dollar', formatCurrency(cashValue)],
          ['Gold', formatCurrency(goldValue)],
          ['Aktienportfolio', formatCurrency(stocksValue)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      // 2. Bankkonten Details
      addSectionTitle('2. Bankkonten');

      autoTable(doc, {
        startY: yPos,
        head: [['Konto', 'Saldo']],
        body: [
          ['Apo 00', formatCurrency(data.accounts.apo00)],
          ['Apo 10', formatCurrency(data.accounts.apo10)],
          ['Apo 20', formatCurrency(data.accounts.apo20)],
          ['SPK Privat', formatCurrency(data.accounts.spkPrivat)],
          ['SPK Miete', formatCurrency(data.accounts.spkMiete)],
          ['SPK Sparkonto', formatCurrency(data.accounts.spkSparkonto)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      // Check if new page needed
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      // 3. Aktienportfolio
      addSectionTitle('3. Aktienportfolio');

      const stockRows = data.stocks.map((stock) => {
        const { profitLoss, profitLossPercent, currentValue } = calculateStockProfitLoss(stock);
        return [
          stock.symbol,
          stock.shares.toString(),
          formatCurrency(stock.currentPrice),
          formatCurrency(currentValue),
          formatCurrency(profitLoss),
          `${profitLossPercent.toFixed(2)}%`,
        ];
      });

      autoTable(doc, {
        startY: yPos,
        head: [['Symbol', 'Stück', 'Kurs', 'Wert', 'Gewinn/Verlust', '%']],
        body: stockRows,
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 8 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      // Check if new page needed
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      // 4. Einnahmen
      addSectionTitle('4. Monatliche Einnahmen');

      const privatePatients = calculatePrivatePatients(data.income);
      const hnoTotal = data.income.privatHnoWeekly.reduce((sum, w) => sum + w, 0);
      const betaTotal = data.income.privatBetaWeekly.reduce((sum, w) => sum + w, 0);

      autoTable(doc, {
        startY: yPos,
        head: [['Quelle', 'Betrag']],
        body: [
          ['Miete', formatCurrency(data.income.rentMonthly)],
          ['Kassenpatienten', formatCurrency(data.income.kassenpatientenMonthly)],
          ['Privat HNO (monatlich)', formatCurrency(hnoTotal)],
          ['Privat Beta (monatlich)', formatCurrency(betaTotal)],
          ['KV-Zahlung (quartalsweise)', formatCurrency(data.income.kvQuarterly)],
          ['KV-Sonderzahlung', formatCurrency(data.income.kvSonderzahlung)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      // 5. Ausgaben
      addSectionTitle('5. Monatliche Ausgaben');

      const monthlyExpenses = calculateTotalExpenses(data.expenses);

      autoTable(doc, {
        startY: yPos,
        head: [['Kategorie', 'Betrag']],
        body: [
          ['Fixkosten (monatlich)', formatCurrency(data.expenses.fixkostenMonthly)],
          ['Variable Kosten (monatlich)', formatCurrency(data.expenses.variableMonthly)],
          ['Finanzamt (quartalsweise)', formatCurrency(data.expenses.finanzamtQuarterly)],
          ['Gesamt monatlich (ohne FA)', formatCurrency(monthlyExpenses)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      // Check if new page needed
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      // 6. Urlaubszeiten
      if (data.vacations.length > 0) {
        addSectionTitle('6. Geplante Urlaubszeiten');

        const vacationRows = data.vacations.map((vac) => [
          formatDate(new Date(vac.from)),
          formatDate(new Date(vac.to)),
        ]);

        autoTable(doc, {
          startY: yPos,
          head: [['Von', 'Bis']],
          body: vacationRows,
          theme: 'striped',
          headStyles: { fillColor: [30, 64, 175], textColor: 255 },
          margin: { left: margin, right: margin },
          styles: { fontSize: 9 },
        });

        yPos = doc.lastAutoTable.finalY + 5;
      }

      // 7. Liquiditätsprognose
      doc.addPage();
      yPos = 20;
      addSectionTitle(`7. Liquiditätsprognose (${selectedMonths} Monate)`);

      const forecastRows = forecast.slice(0, parseInt(selectedMonths)).map((month) => [
        formatDate(new Date(month.month)),
        formatCurrency(month.income),
        formatCurrency(month.expenses),
        formatCurrency(month.surplus),
        formatCurrency(month.cumulativeBalance),
        `${(month.workingRatio * 100).toFixed(0)}%`,
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Monat', 'Einnahmen', 'Ausgaben', 'Überschuss', 'Saldo', 'Arbeit %']],
        body: forecastRows,
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 28 },
          2: { cellWidth: 28 },
          3: { cellWidth: 28 },
          4: { cellWidth: 32 },
          5: { cellWidth: 20 },
        },
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Seite ${i} von ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
        doc.text(
          `Erstellt am ${formatDate(new Date())} um ${new Date().toLocaleTimeString('de-DE')}`,
          margin,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      // Save PDF
      const fileName = `Liquiditaetsplaner_Ramin_${selectedMonths}Monate_${
        new Date().toISOString().split('T')[0]
      }.pdf`;
      doc.save(fileName);

      setOpen(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Erstellen des Berichts');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2 bg-blue-900 hover:bg-blue-800">
          <FileDown className="h-4 w-4" />
          Bericht herunterladen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bericht erstellen</DialogTitle>
          <DialogDescription>
            Wählen Sie den Zeitraum für Ihren Liquiditätsbericht aus.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>Prognosezeitraum</Label>
            <RadioGroup value={selectedMonths} onValueChange={setSelectedMonths}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1" className="font-normal cursor-pointer">
                  1 Monat
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r3" />
                <Label htmlFor="r3" className="font-normal cursor-pointer">
                  3 Monate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" id="r6" />
                <Label htmlFor="r6" className="font-normal cursor-pointer">
                  6 Monate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12" id="r12" />
                <Label htmlFor="r12" className="font-normal cursor-pointer">
                  12 Monate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24" id="r24" />
                <Label htmlFor="r24" className="font-normal cursor-pointer">
                  24 Monate
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-4">
              Der Bericht enthält:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Vermögensübersicht</li>
              <li>Aktienportfolio mit Gewinn/Verlust</li>
              <li>Einnahmen- und Ausgaben-Zusammenfassung</li>
              <li>Liquiditätsprognose für {selectedMonths} Monate</li>
              <li>Urlaubszeiten</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button onClick={generatePDF} disabled={generating}>
            {generating ? 'Erstelle...' : 'PDF herunterladen'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}