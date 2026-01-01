# Liquiditätsplaner Ramin

Eine umfassende Web-Anwendung zur Liquiditätsplanung und Vermögensverwaltung für eine HNO-Praxis. Die Anwendung ermöglicht eine detaillierte Finanzplanung mit automatischer Urlaubsberücksichtigung, Live-Kursdaten und professionellen PDF-Berichten.

## 🎯 Features

### Vermögensverwaltung
- **Bankkonten-Verwaltung**: Apobank (00, 10, 20), Sparkasse (Privat, Miete, Sparkonto)
- **Bargeld-Verwaltung**: Euro und US-Dollar mit Live-Wechselkursen
- **Gold-Portfolio**: Verwaltung von Goldunzen mit aktuellen Marktpreisen
- **Aktienportfolio**: Verwaltung mehrerer Aktien mit Live-Kursdaten und Gewinn/Verlust-Berechnung

### Einnahmen- und Ausgabenverwaltung
- **Wöchentliche Privatpatienten-Erfassung**: Separate Erfassung für HNO und Beta
- **Kassenpatienten**: Monatliche Einnahmen aus Kassenpatienten
- **KV-Zahlungen**: Quartalsweise KV-Zahlungen mit Sonderzahlungen
- **Mieteinnahmen**: Monatliche Mieteinnahmen (laufen auch während Urlaub)
- **Fixkosten und variable Kosten**: Monatliche Ausgaben
- **Finanzamt**: Quartalsweise Steuerzahlungen (März, Juni, September, Dezember)

### Urlaubsplanung
- **Wochenbasierte Berechnung**: Einnahmen werden proportional basierend auf Urlaubswochen reduziert
- **Intelligente Logik**: 
  - Praxiseinnahmen (Privat + Kasse + KV) werden um Urlaubswochen reduziert
  - Mieteinnahmen laufen unverändert weiter
  - Ausgaben bleiben konstant
- **Beispiel**: 3 Wochen Urlaub = 30,7% Praxiseinnahmen (1,33 von 4,33 Wochen gearbeitet)

### Liquiditätsprognose
- **Flexible Zeiträume**: Prognose für 1-24 Monate
- **Detaillierte Übersicht**: Monatliche Einnahmen, Ausgaben, Überschuss und kumulativer Saldo
- **Quartalsberücksichtigung**: Automatische Berechnung von KV- und Finanzamt-Zahlungen
- **Urlaubsintegration**: Automatische Anpassung der Einnahmen basierend auf Urlaubsplanung

### Visualisierung und Auswertung
- **Interaktive Charts**: 
  - Vermögensverteilung (Pie Chart)
  - Einnahmen vs. Ausgaben (Bar Chart)
  - Liquiditätsentwicklung (Line Chart)
  - Aktienportfolio-Performance
- **PDF-Berichte**: Professionelle Berichte mit wählbarem Zeitraum (3, 6, 12 oder 24 Monate)

## 🛠️ Technologie-Stack

- **Frontend Framework**: React 18 mit TypeScript
- **Build Tool**: Vite
- **UI-Komponenten**: Shadcn-ui (vollständige Komponentenbibliothek)
- **Styling**: Tailwind CSS
- **Charts**: Recharts für interaktive Datenvisualisierung
- **PDF-Generierung**: jsPDF mit html2canvas
- **Icons**: Lucide React
- **Datum-Verwaltung**: date-fns
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)

## 📋 Voraussetzungen

- Node.js (Version 18 oder höher)
- pnpm (empfohlen) oder npm

## 🚀 Installation

1. **Repository klonen oder Projekt-Dateien herunterladen**

2. **Abhängigkeiten installieren**
   ```bash
   pnpm install
   # oder
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   pnpm run dev
   # oder
   npm run dev
   ```

   Die Anwendung ist dann unter `http://localhost:5173` erreichbar.

4. **Produktions-Build erstellen**
   ```bash
   pnpm run build
   # oder
   npm run build
   ```

5. **Produktions-Build lokal testen**
   ```bash
   pnpm run preview
   # oder
   npm run preview
   ```

## 📖 Nutzung

### Navigation
Die Anwendung ist in fünf Hauptbereiche unterteilt:

1. **💰 Vermögen**
   - Eingabe aller Kontostände (Apobank, Sparkasse)
   - Verwaltung von Bargeld (Euro und Dollar)
   - Gold-Portfolio mit Live-Preisen
   - Aktienportfolio mit automatischer Gewinn/Verlust-Berechnung
   - Übersicht: Gesamtvermögen und liquide Mittel

2. **📈 Einnahmen**
   - Wöchentliche Privatpatienten (HNO und Beta) - 4 Wochen pro Monat
   - Monatliche Kassenpatienten
   - Quartalsweise KV-Zahlungen mit Sonderzahlungen
   - Monatliche Mieteinnahmen

3. **📉 Ausgaben**
   - Monatliche Fixkosten
   - Monatliche variable Kosten
   - Quartalsweise Finanzamt-Zahlungen (automatisch in März, Juni, September, Dezember)
   - **Urlaubsplanung**: Hinzufügen von Urlaubszeiträumen mit Datum-Auswahl

4. **📊 Prognose**
   - Auswahl des Prognosezeitraums (1-24 Monate)
   - Detaillierte Tabelle mit monatlichen Werten
   - Farbcodierung: Grün (positiv), Rot (negativ)
   - Berücksichtigung von Urlaub und Quartalszahlungen

5. **📈 Auswertung**
   - Vier interaktive Charts:
     - Vermögensverteilung nach Kategorien
     - Einnahmen vs. Ausgaben Vergleich
     - Liquiditätsentwicklung über Zeit
     - Aktienportfolio-Performance
   - **PDF-Bericht**: Download-Button mit Zeitraum-Auswahl (3, 6, 12, 24 Monate)

### Urlaubsplanung

1. Zum Tab **"Ausgaben"** wechseln
2. Im Bereich **"Urlaubsplanung"** auf **"+ Urlaub hinzufügen"** klicken
3. Start- und Enddatum auswählen
4. Urlaub wird automatisch in der Prognose berücksichtigt

**Berechnungslogik**:
- Ein Monat hat durchschnittlich 4,33 Wochen
- Urlaubstage werden in Wochen umgerechnet (Tage ÷ 7)
- Arbeitswochenfaktor = (4,33 - Urlaubswochen) / 4,33
- **Praxiseinnahmen** werden mit diesem Faktor multipliziert
- **Mieteinnahmen** bleiben bei 100% (laufen auch während Urlaub)
- **Ausgaben** bleiben unverändert

**Beispiele**:
- 1 Woche Urlaub → 76,9% Praxiseinnahmen
- 2 Wochen Urlaub → 53,8% Praxiseinnahmen
- 3 Wochen Urlaub → 30,7% Praxiseinnahmen
- 4+ Wochen Urlaub → 7,6% oder weniger Praxiseinnahmen

### PDF-Bericht erstellen

1. Zum Tab **"Auswertung"** wechseln
2. Button **"📄 PDF-Bericht herunterladen"** klicken
3. Zeitraum auswählen (3, 6, 12 oder 24 Monate)
4. PDF wird automatisch generiert und heruntergeladen

**Bericht enthält**:
- Zusammenfassung der aktuellen Vermögenssituation
- Detaillierte Liquiditätsprognose-Tabelle
- Alle vier Visualisierungs-Charts
- Automatisches Datum und professionelles Layout

## 📁 Projektstruktur

```
shadcn-ui/
├── src/
│   ├── components/           # React-Komponenten
│   │   ├── ui/              # Shadcn-ui Basis-Komponenten
│   │   ├── AccountsSection.tsx
│   │   ├── CashGoldSection.tsx
│   │   ├── StocksSection.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── IncomeInputs.tsx
│   │   ├── ExpensesInputs.tsx
│   │   ├── VacationManager.tsx
│   │   ├── ForecastView.tsx
│   │   ├── ChartsView.tsx
│   │   ├── ReportDownload.tsx
│   │   └── Navigation.tsx
│   ├── lib/                 # Utilities und Berechnungslogik
│   │   ├── calculations.ts  # Kern-Berechnungen (Vermögen, Prognose)
│   │   ├── formatting.ts    # Formatierungs-Funktionen
│   │   ├── storage.ts       # LocalStorage-Verwaltung
│   │   ├── api.ts          # API-Aufrufe für Live-Daten
│   │   └── utils.ts        # Allgemeine Hilfsfunktionen
│   ├── hooks/              # Custom React Hooks
│   │   ├── useFinancialData.ts  # Finanz-Daten State Management
│   │   └── useLiveRates.ts      # Live-Kursdaten Fetching
│   ├── types/              # TypeScript Typdefinitionen
│   │   └── index.ts
│   ├── pages/              # Seiten-Komponenten
│   │   ├── Index.tsx       # Hauptseite
│   │   └── NotFound.tsx
│   ├── App.tsx             # Root-Komponente
│   ├── main.tsx            # Einstiegspunkt
│   └── index.css           # Globale Styles
├── public/                 # Statische Assets
├── index.html             # HTML-Template
├── package.json           # Projekt-Abhängigkeiten
├── vite.config.ts         # Vite-Konfiguration
├── tailwind.config.ts     # Tailwind-Konfiguration
└── tsconfig.json          # TypeScript-Konfiguration
```

## 🔑 Besonderheiten

### Wochenbasierte Urlaubsberechnung
Die Anwendung verwendet eine präzise wochenbasierte Berechnung für Urlaubszeiträume:
- Durchschnittlich 4,33 Wochen pro Monat
- Proportionale Reduzierung der Praxiseinnahmen
- Mieteinnahmen bleiben unberührt
- Realistische Liquiditätsplanung

### Quartalsweise Zahlungen
- **KV-Zahlungen**: Automatisch in Quartalsendmonaten (März, Juni, September, Dezember)
- **Finanzamt**: Automatisch in denselben Quartalsendmonaten
- Keine manuelle Eingabe erforderlich

### Live-Kursdaten
- **Aktien**: Automatisches Fetching aktueller Kurse
- **Gold**: Live-Goldpreis pro Unze
- **Währungen**: Aktueller USD/EUR-Wechselkurs
- Fallback auf gespeicherte Werte bei Verbindungsproblemen

### Datenpersistenz
- Alle Eingaben werden automatisch im Browser gespeichert (LocalStorage)
- Daten bleiben auch nach Browser-Neustart erhalten
- Keine Server-Verbindung erforderlich

## 🎨 Anpassungen

### Farben und Styling
Die Anwendung verwendet Tailwind CSS. Farben können in `tailwind.config.ts` angepasst werden.

### Berechnungslogik
Alle Berechnungen befinden sich in `src/lib/calculations.ts` und können dort angepasst werden:
- `calculateTotalAssets()` - Gesamtvermögen
- `calculateLiquidAssets()` - Liquide Mittel
- `calculateForecast()` - Liquiditätsprognose mit Urlaubslogik
- `calculatePrivatePatients()` - Privatpatienten-Summe

### Komponenten
Alle UI-Komponenten befinden sich in `src/components/` und können individuell angepasst werden.

## 📝 Lizenz

Dieses Projekt wurde für die private Nutzung entwickelt.

## 👨‍💻 Entwickelt mit

- MetaGPT Platform (MGX)
- React + TypeScript
- Shadcn-ui Komponenten-Bibliothek

## 🐛 Bekannte Einschränkungen

- Live-Kursdaten erfordern eine Internetverbindung
- PDF-Generierung funktioniert am besten in Chrome/Edge
- Daten werden nur lokal gespeichert (kein Cloud-Backup)

## 📞 Support

Bei Fragen oder Problemen können Sie:
1. Die Anwendung in einem neuen Browser-Tab öffnen
2. Den Browser-Cache leeren und neu laden
3. Die Entwickler-Konsole (F12) auf Fehlermeldungen überprüfen

---

**Version**: 1.0.0  
**Letztes Update**: Januar 2026