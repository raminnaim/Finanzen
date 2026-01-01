# MGX.dev Projekt-Briefing: Dimensional Fund Tracker

## Projektübersicht

Entwickle eine Web-Applikation zur Verfolgung und Analyse aller Dimensional Fund Advisors Fonds und ETFs. Die App soll tägliche Kursdaten abrufen, Performance-Vergleiche ermöglichen und eine übersichtliche Dashboard-Ansicht bieten.

---

## Zielgruppe

- Finanzberater und Vermögensverwalter
- Privatanleger mit Dimensional-Investments
- Versicherungsnehmer mit Helvetia Fondspolicen

---

## Kernfunktionen

### 1. Dashboard (Hauptansicht)
- Übersicht aller 75 Dimensional Fonds in einer Tabelle
- Aktuelle Kurse mit Datum
- Tagesveränderung in % (farbcodiert: grün/rot)
- Sparkline-Charts für 30-Tage-Trend
- Suchfeld zum Filtern nach Fondsname, ISIN oder WKN

### 2. Kategorie-Filter
Filterbare Kategorien:
- Aktien Global
- Aktien Europa
- Aktien USA
- Aktien Pazifik
- Emerging Markets
- Anleihen/Fixed Income
- Mischfonds (Allocation)
- ESG/Low Carbon
- ETFs (neu)

### 3. Performance-Vergleich
- Auswahl von bis zu 5 Fonds zum Vergleich
- Zeiträume: 1M, 3M, 6M, YTD, 1J, 3J, 5J, Max
- Interaktiver Linien-Chart
- Performance-Tabelle mit Renditen

### 4. Einzelfonds-Detailseite
- Vollständige Stammdaten
- Historischer Kursverlauf (Chart)
- Kennzahlen: Volatilität, Sharpe Ratio (wenn verfügbar)
- Link zu offiziellen Dokumenten

### 5. Export-Funktionen
- CSV-Export der aktuellen Kurse
- PDF-Report für ausgewählte Fonds

---

## Technische Anforderungen

### Frontend
- React.js oder Vue.js
- Responsive Design (Mobile-First)
- Chart-Library: Recharts, Chart.js oder ApexCharts
- Tailwind CSS für Styling

### Backend/Daten
- Kursdaten-Abruf via API oder Web Scraping
- Caching der Kursdaten (localStorage oder Backend-Cache)
- Tägliche Aktualisierung

### Datenquellen (Priorität)
1. **Leeway API** (leeway.tech) - 50 kostenlose Anfragen/Tag, Fonds-Support
2. **Yahoo Finance** - Für ETFs gut geeignet
3. **Fallback: Web Scraping** von finanzpartner.de oder finanzen.net

---

## Komplette Fondsliste (75 Fonds + 2 ETFs)

### AKTIEN GLOBAL

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional Global Core Equity Fund EUR Acc | IE00B2PC0260 | A0RMKV | EUR |
| Dimensional Global Core Equity Fund EUR Dis | IE00B3M0BZ05 | A1JJAB | EUR |
| Dimensional Global Core Equity Fund USD Acc | IE00B2PC0153 | A1C9DS | USD |
| Dimensional World Equity Fund EUR Acc | IE00B4MJ5D07 | A1JUY0 | EUR |
| Dimensional World Equity Fund EUR Dis | IE00B53RD369 | A1JUY1 | EUR |
| Dimensional World Equity Fund USD Dis | IE00B458ZH80 | A1JUY5 | USD |
| Dimensional Global Targeted Value Fund EUR Acc | IE00B2PC0716 | A0RMKW | EUR |
| Dimensional Global Targeted Value Fund EUR Dis | IE00B6897102 | A1JJAM | EUR |
| Dimensional Global Targeted Value Fund USD Acc | IE00B2PC0609 | A1C9DP | USD |
| Dimensional Global Value Fund EUR Acc | IE00B60LX167 | A1JJAP | EUR |
| Dimensional Global Value Fund GBP Dist | IE00B67NVM27 | A1JJAS | GBP |
| Dimensional Global Small Companies Fund EUR Acc | IE00B67WB637 | A1JJAF | EUR |
| Dimensional Global Small Companies Fund EUR Dis | IE00B3XNN521 | A1JJAG | EUR |
| Dimensional Global Small Companies Fund USD Acc | IE00B3MRDK01 | A1JJAK | USD |

### AKTIEN EUROPA

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional European Small Companies Fund EUR Acc | IE0032769055 | A0YAPT | EUR |
| Dimensional European Small Companies Fund EUR Dis | IE00B65J1M22 | A1JH97 | EUR |
| Dimensional European Value Fund EUR Acc | IE00B1W6CW87 | A0YAN6 | EUR |
| Dimensional European Value Fund EUR Dis | IE00B3NHP925 | A1JH99 | EUR |

### AKTIEN USA

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional U S Small Companies Fund EUR Acc | IE0032768974 | A0YAPS | EUR |
| Dimensional U S Small Companies Fund USD Acc | IE0030982171 | A1C9C8 | USD |
| Dimensional U S Small Companies Fund USD Dis | IE00B68NBZ41 | A1JAPH | USD |

### AKTIEN PAZIFIK

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional Pacific Basin Small Companies Fund EUR Acc | IE0034140511 | A0YAPU | EUR |
| Dimensional Pacific Basin Small Companies Fund EUR Dis | IE00B3NBJR05 | A1JJAZ | EUR |
| Dimensional Pacific Basin Small Companies Fund USD Acc | IE0034140404 | A1C9C5 | USD |
| Dimensional Pacific Basin Small Companies Fund USD Dis | IE00B3RKMY14 | A1JJA0 | USD |

### EMERGING MARKETS

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional Emerging Markets Value Fund EUR Acc | IE00B0HCGV10 | A0YAPZ | EUR |
| Dimensional Emerging Markets Value Fund EUR Dis | IE00B42THM37 | A1JH9Z | EUR |
| Dimensional Emerging Markets Value Fund USD Acc | IE00B0HCGS80 | A1C9CZ | USD |
| Dimensional Emerging Markets Targeted Value Fund EUR Acc | IE00B1W6DP85 | A1C5E2 | EUR |
| Dimensional Emerging Markets Targeted Value Fund EUR Dis | IE00B3KXKC14 | A3D7PP | EUR |
| Dimensional Emerging Markets Large Cap Core Equity EUR Acc | IE00BWGCG836 | A2AF3S | EUR |
| Dimensional Emerging Markets Large Cap Core Equity EUR Dis | IE00BWGCG943 | A2AF3R | EUR |

### ANLEIHEN / FIXED INCOME

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional Global Short Fixed Income Fund EUR Acc | IE0031719473 | A0YAPN | EUR |
| Dimensional Global Short Fixed Income Fund EUR Dis | IE00B3QL0Y14 | A1JJAD | EUR |
| Dimensional Global Short Fixed Income Fund USD Acc | IE0030982627 | A1C9DB | USD |
| Dimensional Global Short Fixed Income Fund USD Dis | IE00B3S6T365 | A1JJAE | USD |
| Dimensional Global Short Fixed Income Fund CHF Dis | IE00B3WGLP80 | A1C7B5 | CHF |
| Dimensional Global Ultra Short Fixed Income Fund EUR Acc | IE00BKX45X63 | A1136R | EUR |
| Dimensional Global Ultra Short Fixed Income Fund EUR Dis | IE00BKX45Y70 | A1136Q | EUR |
| Dimensional Global Short Term Inv Grade Fixed Income EUR A | IE00BFG1R338 | A1XFZN | EUR |
| Dimensional Global Short Term Inv Grade Fixed Income EUR D | IE00BFG1R445 | A12F75 | EUR |
| Dimensional Global Short Term Inv Grade Fixed Income CHF D | IE00BFG1RB17 | A12F8D | CHF |
| Dimensional Global Short Term Inv Grade Fixed Income SEK A | IE00BFG1RC24 | A12F8A | SEK |
| Dimensional Global Short Term Inv Grade Fixed Income USD D | IE00BFG1R114 | A12F73 | USD |
| Dimensional Global Core Fixed Income Fund EUR Acc | IE00BG85LJ47 | A3E1WR | EUR |
| Dimensional Global Core Fixed Income Fund EUR Dis | IE00BG85LK51 | A3E1WY | EUR |
| Dimensional Euro Inflation Link Inter Dur Fix Inc EUR A | IE00B3N38C44 | A1JBQ4 | EUR |
| Dimensional Euro Inflation Link Inter Dur Fix Inc EUR D | IE00B3LNHS53 | A1JKGX | EUR |

### MISCHFONDS (WORLD ALLOCATION)

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional World Allocation 20/80 Fund EUR Acc | IE00BYTYTX63 | A2P5KW | EUR |
| Dimensional World Allocation 20/80 Fund EUR Dis | IE00BYTYTY70 | A2P5KX | EUR |
| Dimensional World Allocation 40/60 Fund EUR Acc | IE00B8Y02V60 | A1W511 | EUR |
| Dimensional World Allocation 40/60 Fund EUR Dis | IE00B9L4LR73 | A1W512 | EUR |
| Dimensional World Allocation 40/60 Fund USD Acc | IE00BFZ0X665 | A2JQ4Z | USD |
| Dimensional World Allocation 60/40 Fund EUR Acc | IE00B9L4YR86 | A1W51Z | EUR |
| Dimensional World Allocation 60/40 Fund EUR Dis | IE00B9MC5R88 | A1W510 | EUR |
| Dimensional World Allocation 80/20 Fund EUR Acc | IE00BYTYV309 | A2P5LD | EUR |
| Dimensional World Allocation 80/20 Fund EUR Dis | IE00BYTYV416 | A2P5LE | EUR |

### ESG / LOW CARBON SCREENED

| Fondsname | ISIN | WKN | Währung |
|-----------|------|-----|---------|
| Dimensional Gbl Core Equity Lower Carbon ESG Scree EUR A | IE00B7T1D258 | A2AF3H | EUR |
| Dimensional Gbl Core Equity Lower Carbon ESG Scree EUR D | IE00B8N2Z924 | A2AF3J | EUR |
| Dimensional World Equity Lower Carbon ESG Screened EUR Acc | IE000NI56WV8 | A3D8BK | EUR |
| Dimensional World Equity Lower Carbon ESG Screened EUR Dis | IE000A2PTTN4 | A3D8BL | EUR |
| Dimensional Gbl Targeted Value Lower Carbon ESG Scree EUR A | IE000XNKOYM8 | A3EWBL | EUR |
| Dimensional Gbl Targeted Value Lower Carbon ESG Scree EUR D | IE000QV5QHF2 | A3EWBM | EUR |
| Dimensional Gbl High Profitability Lower Carbon ESG Scr EURa | IE000X0YGVE5 | A40L9H | EUR |
| Dimensional Gbl High Profitability Lower Carbon ESG Scr EURd | IE000JH3AOP3 | A40L9J | EUR |
| Dimensional Gbl Core Fixed Inc Lower Carbon ESG Scree EUR a | IE00BKPWG574 | A2PVZR | EUR |
| Dimensional Gbl Core Fixed Inc Lower Carbon ESG Scree EUR d | IE00BKPWG681 | A2PVZS | EUR |
| Dimensional Gbl Short Fixed Income Lower Carbon ESG Scr EURa | IE000JA3S476 | A3C8PQ | EUR |
| Dimensional Gbl Short Fixed Income Lower Carbon ESG Scr EURd | IE000TIVIXI5 | A3C8PR | EUR |
| Dimensional Emerging Core Equity Lower Carbon ESG Screened EUR A | IE00BLCGQT35 | A3C531 | EUR |
| Dimensional Emerging Core Equity Lower Carbon ESG Screened EUR D | IE00BLCGQV56 | A3C532 | EUR |

### NEUE UCITS ETFs (Ende 2025 gelistet)

| Fondsname | ISIN | WKN | TER | Börse |
|-----------|------|-----|-----|-------|
| Dimensional Global Core Equity UCITS ETF USD Acc | IE000EGGFVG6 | A41E9T | 0.26% | Xetra Frankfurt, LSE |
| Dimensional Global Targeted Value UCITS ETF USD Acc | IE000S67ID55 | A41E9V | 0.44% | Xetra Frankfurt, LSE |

---

## UI/UX Design-Anforderungen

### Farbschema
- Primärfarbe: #1E3A5F (Dunkelblau - Dimensional Corporate)
- Sekundärfarbe: #4A90A4 (Hellblau)
- Akzent Positiv: #22C55E (Grün für positive Performance)
- Akzent Negativ: #EF4444 (Rot für negative Performance)
- Hintergrund: #F8FAFC (Hellgrau)
- Text: #1F2937 (Dunkelgrau)

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  LOGO    Dimensional Fund Tracker    [Suche] [Filter]   │
├─────────────────────────────────────────────────────────┤
│  [Dashboard] [Vergleich] [Favoriten] [Export]           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Kategorie-Tabs: [Alle] [Global] [Europa] [USA] ...     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Fondsname          | Kurs   | Änd.  | 30T-Chart │    │
│  │─────────────────────────────────────────────────│    │
│  │ Global Core Equity | 52.60€ | +0.11%| ~~~~/~~~  │    │
│  │ World Equity       | 40.81€ | +0.12%| ~~~~~/~~  │    │
│  │ ...                | ...    | ...   | ...       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  Letzte Aktualisierung: 31.12.2025 15:21               │
└─────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- Mobile: < 640px (Karten-Layout)
- Tablet: 640px - 1024px (Kompakte Tabelle)
- Desktop: > 1024px (Volle Tabelle mit Charts)

---

## Datenstruktur (JSON)

```json
{
  "funds": [
    {
      "id": "dimensional-global-core-equity-eur-acc",
      "name": "Dimensional Global Core Equity Fund EUR Acc",
      "shortName": "Global Core Equity",
      "isin": "IE00B2PC0260",
      "wkn": "A0RMKV",
      "currency": "EUR",
      "category": "global",
      "type": "fund",
      "isESG": false,
      "isETF": false,
      "ter": 0.0035,
      "currentPrice": 52.60,
      "previousPrice": 52.54,
      "changePercent": 0.11,
      "changeAbsolute": 0.06,
      "priceDate": "2025-12-30",
      "historicalPrices": [
        {"date": "2025-12-30", "price": 52.60},
        {"date": "2025-12-29", "price": 52.54}
      ],
      "performance": {
        "1m": 2.5,
        "3m": 5.2,
        "6m": 8.1,
        "ytd": 12.3,
        "1y": 15.4,
        "3y": 28.7,
        "5y": 45.2
      }
    }
  ],
  "categories": [
    {"id": "global", "name": "Aktien Global", "icon": "globe"},
    {"id": "europe", "name": "Aktien Europa", "icon": "eu"},
    {"id": "usa", "name": "Aktien USA", "icon": "flag-us"},
    {"id": "pacific", "name": "Aktien Pazifik", "icon": "sunrise"},
    {"id": "emerging", "name": "Emerging Markets", "icon": "trending-up"},
    {"id": "bonds", "name": "Anleihen", "icon": "banknote"},
    {"id": "allocation", "name": "Mischfonds", "icon": "pie-chart"},
    {"id": "esg", "name": "ESG/Low Carbon", "icon": "leaf"},
    {"id": "etf", "name": "ETFs", "icon": "bar-chart"}
  ],
  "lastUpdate": "2025-12-31T15:21:00Z"
}
```

---

## API-Integration Code-Beispiele

### Option 1: Leeway API (empfohlen)

```javascript
// Kurs abrufen via ISIN
const fetchFundPrice = async (isin) => {
  const response = await fetch(
    `https://api.leeway.tech/api/v1/public/general/isin/${isin}?apitoken=YOUR_TOKEN`
  );
  return response.json();
};

// Historische Kurse
const fetchHistoricalPrices = async (symbol, exchange) => {
  const response = await fetch(
    `https://api.leeway.tech/api/v1/public/historicalquotes/${symbol}.${exchange}?apitoken=YOUR_TOKEN`
  );
  return response.json();
};
```

### Option 2: Web Scraping Fallback (finanzpartner.de)

```javascript
// Scraping-Logik für finanzpartner.de
// URL-Muster: https://www.finanzpartner.de/fonds/[fondsname]-[isin].htm
// Kursdaten sind im HTML als Text verfügbar
```

---

## Deployment-Optionen

1. **Vercel** (empfohlen für React/Next.js)
2. **Netlify** (einfaches Deployment)
3. **GitHub Pages** (kostenlos, statisch)
4. **Firebase Hosting** (mit Firestore für Daten-Caching)

---

## Zusätzliche Features (Nice-to-have)

1. **Push-Benachrichtigungen** bei signifikanten Kursänderungen (>2%)
2. **Portfolio-Simulator** mit Gewichtung
3. **Korrelationsmatrix** zwischen Fonds
4. **Historischer Drawdown-Chart**
5. **Währungsumrechnung** EUR/USD/CHF
6. **Dark Mode**
7. **PWA-Support** für Offline-Nutzung

---

## Prompt für MGX.dev

Kopieren Sie diesen Text direkt in MGX.dev:

---

**Erstelle eine React-Web-App "Dimensional Fund Tracker" mit folgenden Features:**

1. Dashboard mit Tabelle aller 77 Dimensional Fonds (Liste siehe unten)
2. Kategorie-Filter (Global, Europa, USA, Pazifik, Emerging Markets, Anleihen, Mischfonds, ESG, ETFs)
3. Suchfunktion nach Fondsname, ISIN oder WKN
4. Performance-Vergleich mit interaktivem Chart (bis zu 5 Fonds)
5. Tagesveränderung farbcodiert (grün/rot)
6. 30-Tage-Sparkline für jeden Fonds
7. CSV-Export
8. Responsive Design mit Tailwind CSS
9. Verwende Recharts für Charts

Datenquelle: Erstelle zunächst Mock-Daten basierend auf der Fondsliste. Die echten Kurse können später via API (Leeway oder Yahoo Finance) integriert werden.

Farbschema: Dunkelblau (#1E3A5F), Hellblau (#4A90A4), Grün (#22C55E), Rot (#EF4444)

**Fondsliste (ISIN als eindeutige ID verwenden):**
[Hier die komplette Tabelle aus dem Dokument einfügen]

---

## Kontakt & Support

Bei Fragen zur Dimensional-Produktpalette:
- **Alan Horovitz**, Regional Director & VP
- Email: alan.horovitz@dimensional.com
- Tel: +49 (89) 5419 909 23
- Web: www.dimensional.com

---

*Dokument erstellt am: 31.12.2025*
*Version: 1.0*
