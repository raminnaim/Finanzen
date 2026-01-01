# MGX.dev Prompt - Dimensional Fund Tracker

Erstelle eine moderne React-Web-App "Dimensional Fund Tracker" zur Verfolgung aller Dimensional Fund Advisors Fonds.

## Kernfunktionen

1. **Dashboard-Tabelle** mit allen Fonds: Name, ISIN, WKN, aktueller Kurs, Tagesänderung (%), 30-Tage-Sparkline
2. **Kategorie-Filter**: Alle, Global, Europa, USA, Pazifik, Emerging Markets, Anleihen, Mischfonds, ESG, ETFs
3. **Suchfeld** zum Filtern nach Name, ISIN oder WKN
4. **Vergleichs-Tool**: Bis zu 5 Fonds auswählen und Performance vergleichen (1M, 3M, 6M, 1J, 3J, 5J)
5. **Interaktiver Chart** (Recharts) für Performance-Vergleich
6. **CSV-Export** der aktuellen Kurse
7. **Responsive Design** (Mobile, Tablet, Desktop)

## Tech-Stack

- React 18+ mit Hooks
- Tailwind CSS
- Recharts für Charts
- Lucide Icons
- LocalStorage für Favoriten

## Farbschema

- Primär: #1E3A5F (Dunkelblau)
- Sekundär: #4A90A4 (Hellblau)  
- Positiv: #22C55E (Grün)
- Negativ: #EF4444 (Rot)
- Hintergrund: #F8FAFC

## Datenstruktur

Verwende dieses JSON-Format und generiere realistische Mock-Daten:

```json
{
  "id": "string",
  "name": "Fondsname",
  "isin": "IE00XXXXXXXX",
  "wkn": "AXXXXX",
  "currency": "EUR",
  "category": "global|europe|usa|pacific|emerging|bonds|allocation|esg|etf",
  "currentPrice": 52.60,
  "changePercent": 0.11,
  "priceHistory": [{"date": "2025-12-30", "price": 52.60}]
}
```

## Komplette Fondsliste (77 Fonds)

### Aktien Global
- Dimensional Global Core Equity Fund EUR Acc | IE00B2PC0260 | A0RMKV
- Dimensional Global Core Equity Fund EUR Dis | IE00B3M0BZ05 | A1JJAB
- Dimensional Global Core Equity Fund USD Acc | IE00B2PC0153 | A1C9DS
- Dimensional World Equity Fund EUR Acc | IE00B4MJ5D07 | A1JUY0
- Dimensional World Equity Fund EUR Dis | IE00B53RD369 | A1JUY1
- Dimensional World Equity Fund USD Dis | IE00B458ZH80 | A1JUY5
- Dimensional Global Targeted Value Fund EUR Acc | IE00B2PC0716 | A0RMKW
- Dimensional Global Targeted Value Fund EUR Dis | IE00B6897102 | A1JJAM
- Dimensional Global Targeted Value Fund USD Acc | IE00B2PC0609 | A1C9DP
- Dimensional Global Value Fund EUR Acc | IE00B60LX167 | A1JJAP
- Dimensional Global Value Fund GBP Dist | IE00B67NVM27 | A1JJAS
- Dimensional Global Small Companies Fund EUR Acc | IE00B67WB637 | A1JJAF
- Dimensional Global Small Companies Fund EUR Dis | IE00B3XNN521 | A1JJAG
- Dimensional Global Small Companies Fund USD Acc | IE00B3MRDK01 | A1JJAK

### Aktien Europa
- Dimensional European Small Companies Fund EUR Acc | IE0032769055 | A0YAPT
- Dimensional European Small Companies Fund EUR Dis | IE00B65J1M22 | A1JH97
- Dimensional European Value Fund EUR Acc | IE00B1W6CW87 | A0YAN6
- Dimensional European Value Fund EUR Dis | IE00B3NHP925 | A1JH99

### Aktien USA
- Dimensional U S Small Companies Fund EUR Acc | IE0032768974 | A0YAPS
- Dimensional U S Small Companies Fund USD Acc | IE0030982171 | A1C9C8
- Dimensional U S Small Companies Fund USD Dis | IE00B68NBZ41 | A1JAPH

### Aktien Pazifik
- Dimensional Pacific Basin Small Companies Fund EUR Acc | IE0034140511 | A0YAPU
- Dimensional Pacific Basin Small Companies Fund EUR Dis | IE00B3NBJR05 | A1JJAZ
- Dimensional Pacific Basin Small Companies Fund USD Acc | IE0034140404 | A1C9C5
- Dimensional Pacific Basin Small Companies Fund USD Dis | IE00B3RKMY14 | A1JJA0

### Emerging Markets
- Dimensional Emerging Markets Value Fund EUR Acc | IE00B0HCGV10 | A0YAPZ
- Dimensional Emerging Markets Value Fund EUR Dis | IE00B42THM37 | A1JH9Z
- Dimensional Emerging Markets Value Fund USD Acc | IE00B0HCGS80 | A1C9CZ
- Dimensional Emerging Markets Targeted Value Fund EUR Acc | IE00B1W6DP85 | A1C5E2
- Dimensional Emerging Markets Targeted Value Fund EUR Dis | IE00B3KXKC14 | A3D7PP
- Dimensional Emerging Markets Large Cap Core Equity EUR Acc | IE00BWGCG836 | A2AF3S
- Dimensional Emerging Markets Large Cap Core Equity EUR Dis | IE00BWGCG943 | A2AF3R

### Anleihen/Fixed Income
- Dimensional Global Short Fixed Income Fund EUR Acc | IE0031719473 | A0YAPN
- Dimensional Global Short Fixed Income Fund EUR Dis | IE00B3QL0Y14 | A1JJAD
- Dimensional Global Short Fixed Income Fund USD Acc | IE0030982627 | A1C9DB
- Dimensional Global Short Fixed Income Fund USD Dis | IE00B3S6T365 | A1JJAE
- Dimensional Global Short Fixed Income Fund CHF Dis | IE00B3WGLP80 | A1C7B5
- Dimensional Global Ultra Short Fixed Income Fund EUR Acc | IE00BKX45X63 | A1136R
- Dimensional Global Ultra Short Fixed Income Fund EUR Dis | IE00BKX45Y70 | A1136Q
- Dimensional Global Short Term Inv Grade Fixed Income EUR A | IE00BFG1R338 | A1XFZN
- Dimensional Global Short Term Inv Grade Fixed Income EUR D | IE00BFG1R445 | A12F75
- Dimensional Global Short Term Inv Grade Fixed Income CHF D | IE00BFG1RB17 | A12F8D
- Dimensional Global Short Term Inv Grade Fixed Income SEK A | IE00BFG1RC24 | A12F8A
- Dimensional Global Short Term Inv Grade Fixed Income USD D | IE00BFG1R114 | A12F73
- Dimensional Global Core Fixed Income Fund EUR Acc | IE00BG85LJ47 | A3E1WR
- Dimensional Global Core Fixed Income Fund EUR Dis | IE00BG85LK51 | A3E1WY
- Dimensional Euro Inflation Link Inter Dur Fix Inc EUR A | IE00B3N38C44 | A1JBQ4
- Dimensional Euro Inflation Link Inter Dur Fix Inc EUR D | IE00B3LNHS53 | A1JKGX

### Mischfonds (World Allocation)
- Dimensional World Allocation 20/80 Fund EUR Acc | IE00BYTYTX63 | A2P5KW
- Dimensional World Allocation 20/80 Fund EUR Dis | IE00BYTYTY70 | A2P5KX
- Dimensional World Allocation 40/60 Fund EUR Acc | IE00B8Y02V60 | A1W511
- Dimensional World Allocation 40/60 Fund EUR Dis | IE00B9L4LR73 | A1W512
- Dimensional World Allocation 40/60 Fund USD Acc | IE00BFZ0X665 | A2JQ4Z
- Dimensional World Allocation 60/40 Fund EUR Acc | IE00B9L4YR86 | A1W51Z
- Dimensional World Allocation 60/40 Fund EUR Dis | IE00B9MC5R88 | A1W510
- Dimensional World Allocation 80/20 Fund EUR Acc | IE00BYTYV309 | A2P5LD
- Dimensional World Allocation 80/20 Fund EUR Dis | IE00BYTYV416 | A2P5LE

### ESG/Low Carbon
- Dimensional Gbl Core Equity Lower Carbon ESG Scree EUR A | IE00B7T1D258 | A2AF3H
- Dimensional Gbl Core Equity Lower Carbon ESG Scree EUR D | IE00B8N2Z924 | A2AF3J
- Dimensional World Equity Lower Carbon ESG Screened EUR Acc | IE000NI56WV8 | A3D8BK
- Dimensional World Equity Lower Carbon ESG Screened EUR Dis | IE000A2PTTN4 | A3D8BL
- Dimensional Gbl Targeted Value Lower Carbon ESG Scree EUR A | IE000XNKOYM8 | A3EWBL
- Dimensional Gbl Targeted Value Lower Carbon ESG Scree EUR D | IE000QV5QHF2 | A3EWBM
- Dimensional Gbl High Profitability Lower Carbon ESG Scr EURa | IE000X0YGVE5 | A40L9H
- Dimensional Gbl High Profitability Lower Carbon ESG Scr EURd | IE000JH3AOP3 | A40L9J
- Dimensional Gbl Core Fixed Inc Lower Carbon ESG Scree EUR a | IE00BKPWG574 | A2PVZR
- Dimensional Gbl Core Fixed Inc Lower Carbon ESG Scree EUR d | IE00BKPWG681 | A2PVZS
- Dimensional Gbl Short Fixed Income Lower Carbon ESG Scr EURa | IE000JA3S476 | A3C8PQ
- Dimensional Gbl Short Fixed Income Lower Carbon ESG Scr EURd | IE000TIVIXI5 | A3C8PR
- Dimensional Emerging Core Equity Lower Carbon ESG Screened EUR A | IE00BLCGQT35 | A3C531
- Dimensional Emerging Core Equity Lower Carbon ESG Screened EUR D | IE00BLCGQV56 | A3C532

### Neue UCITS ETFs (2025)
- Dimensional Global Core Equity UCITS ETF USD Acc | IE000EGGFVG6 | A41E9T | TER 0.26%
- Dimensional Global Targeted Value UCITS ETF USD Acc | IE000S67ID55 | A41E9V | TER 0.44%

## UI-Komponenten

1. **Header**: Logo, Titel, Suchfeld
2. **FilterBar**: Kategorie-Tabs
3. **FundTable**: Sortierbare Tabelle mit Sparklines
4. **CompareModal**: Fondsauswahl und Vergleichs-Chart
5. **FundDetail**: Detailansicht bei Klick auf Fonds
6. **ExportButton**: CSV-Download

## Zusätzliche Anforderungen

- Lade-Skeleton während Daten geladen werden
- Sortierung nach Name, Kurs, Performance
- Favoriten-Funktion (Stern-Icon, localStorage)
- "Letzte Aktualisierung" Timestamp im Footer
- Tooltips mit vollständigem Fondsnamen bei Hover
- Performance-Badges: grüner/roter Hintergrund je nach Vorzeichen

Generiere realistische Mock-Kursdaten für alle 77 Fonds mit:
- Kurse zwischen 8€ und 60€ (je nach Fondstyp)
- Tägliche Änderungen zwischen -1% und +1%
- 90 Tage historische Daten für Charts
