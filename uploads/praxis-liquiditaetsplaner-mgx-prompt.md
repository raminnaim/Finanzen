# MGX.dev Prompt - HNO-Praxis Liquiditätsplaner

Erstelle eine React-Web-App "HNO-Praxis Liquiditätsplaner" zur Vermögensübersicht, Liquiditätsberechnung und Finanzprognose für eine HNO-Arztpraxis.

---

## Kernfunktionen

### 1. Vermögensübersicht (Dashboard)

**Eingabefelder für Kontostände:**
- Apo-Kontostand 00 (EUR, Eingabefeld)
- Apo-Kontostand 10 (EUR, Eingabefeld)
- Apo-Kontostand 20 (EUR, Eingabefeld)
- SPK Privat (EUR, Eingabefeld)
- SPK Miete (EUR, Eingabefeld)
- SPK Sparkonto (EUR, Eingabefeld)

**Barbestände:**
- Euro bar (EUR, Eingabefeld)
- Dollar bar: Fest 15.700 USD - automatisch in EUR umrechnen mit Live-Wechselkurs (API abrufen)

**Gold:**
- Goldbestand in Unzen (Eingabefeld für Anzahl Unzen)
- Automatisch aktuellen Goldpreis pro Unze abrufen (API)
- Berechnung: Unzen × aktueller Goldpreis = Goldwert in EUR

**Aktienportfolio:**
Tabelle mit folgenden Positionen (Live-Kurse automatisch abrufen):

| Aktie | Symbol | Stück | Kaufkurs |
|-------|--------|-------|----------|
| Apple Inc. | AAPL | 25 | 174,49 € |
| Deutsche Bank AG | DBK.DE | 50 | 9,14 € |
| Porsche AG Vz. | PAH3.DE | 4 | 116,00 € |
| Gazprom ADR | OGZD.L | 190 | 8,12 € |
| Starbucks Corp. | SBUX | 15 | 79,53 € |
| Tesla Inc. | TSLA | 6 | 312,17 € |

Für jede Aktie anzeigen:
- Aktueller Kurs (live)
- Aktueller Gesamtwert (Stück × aktueller Kurs)
- Kaufwert (Stück × Kaufkurs)
- Gewinn/Verlust in EUR und %
- Gesamter Aktienwert (Summe aller Positionen)

---

### 2. Berechnete Werte (automatisch)

**Gesamtvermögen:**
= Apo 00 + Apo 10 + Apo 20 + SPK Privat + SPK Miete + SPK Sparkonto + Euro bar + Dollar bar (in EUR) + Goldwert + Aktienwert

**Bar verfügbar (Liquidität sofort):**
= Apo 00 + Apo 10 + Apo 20 + SPK Privat + SPK Miete + SPK Sparkonto

Beide Werte prominent als große Kacheln anzeigen.

---

### 3. Einnahmen-Erfassung

**Monatliche Einnahmen:**
- Mieteinnahmen (EUR/Monat, Eingabefeld)
- Kassenpatienten Umsatz (EUR/Monat, Eingabefeld)

**Wöchentliche Privatpatienten-Abrechnung:**
Zwei separate Bereiche:

**HNO-Zentrum Bonn:**
- Eingabefelder für Woche 1, 2, 3, 4 (und ggf. 5) des Monats
- Summe HNO-Zentrum Bonn (automatisch)

**Betaklinik:**
- Eingabefelder für Woche 1, 2, 3, 4 (und ggf. 5) des Monats
- Summe Betaklinik (automatisch)

**Gesamte Privatpatienten pro Monat** = Summe HNO-Zentrum + Summe Betaklinik

**KV-Zahlungen (Kassenärztliche Vereinigung):**
- KV Quartalszahlung (EUR, Eingabefeld)
- KV Restzahlung/Sonderzahlung (EUR, Eingabefeld)
- Dropdown: Welches Quartal? (Q1, Q2, Q3, Q4)

---

### 4. Ausgaben-Erfassung

**Monatliche Ausgaben:**
- Fixkosten monatlich (EUR, Eingabefeld, Standardwert: 80.000 €)
- Finanzamt monatlich (EUR, Eingabefeld)
- Variable Kosten monatlich (EUR, Eingabefeld, optional)

**Gesamtausgaben monatlich** = Fixkosten + Finanzamt + Variable Kosten

---

### 5. Liquiditätsprognose

**Zeitraum-Auswahl:**
- Buttons: 1 Monat | 3 Monate | 6 Monate | 12 Monate | 24 Monate

**Urlaubs-/Ausfallzeiten:**
- Kalender-Widget oder Eingabefelder für Urlaubswochen
- Eingabe: "Von [Datum] bis [Datum]"
- Mehrere Urlaubszeiträume hinzufügbar
- Während Urlaub: Praxiseinnahmen (Privat + Kasse) = 0, Mieteinnahmen laufen weiter

**Prognose-Berechnung:**
Für jeden Monat im gewählten Zeitraum:
- Einnahmen (Miete + Privatpatienten + Kassenpatienten + anteilige KV)
- Minus: Urlaubs-Abzug (wenn Urlaubstage im Monat)
- Minus: Ausgaben (Fixkosten + Finanzamt + Variable)
- = Monatlicher Überschuss/Defizit
- Kumulierter Kontostand

**Ausgabe:**
- Tabelle mit monatlicher Aufschlüsselung
- Liniendiagramm: Liquiditätsverlauf über Zeit
- Balkendiagramm: Einnahmen vs. Ausgaben pro Monat
- Warnhinweis (rot) wenn Liquidität unter 0 droht

---

### 6. Charts & Visualisierung

**Dashboard-Ansicht:**
- Kreisdiagramm: Vermögensverteilung (Konten, Gold, Aktien, Bar)
- Balkendiagramm: Einnahmen nach Quelle (Miete, Privat HNO, Privat Beta, Kasse, KV)
- Liniendiagramm: Liquiditätsprognose

**Aktien-Ansicht:**
- Kreisdiagramm: Portfolio-Verteilung nach Aktie
- Balkendiagramm: Gewinn/Verlust pro Position

---

## Technische Anforderungen

### Tech-Stack
- React 18+ mit Hooks
- Tailwind CSS
- Recharts für Diagramme
- Lucide Icons
- date-fns für Datumsberechnungen

### APIs für Live-Daten

**Wechselkurs USD/EUR:**
```javascript
// Beispiel: exchangerate-api.com oder frankfurter.app (kostenlos)
const fetchUsdEur = async () => {
  const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR');
  const data = await res.json();
  return data.rates.EUR; // z.B. 0.92
};
// Dollar-Wert = 15700 * rate
```

**Goldpreis (pro Unze in EUR):**
```javascript
// Beispiel: goldapi.io oder metals.live
// Alternativ: Yahoo Finance für GC=F (Gold Futures)
const fetchGoldPrice = async () => {
  // Gold spot price in EUR per troy ounce
  // Ca. 2.400-2.600 EUR aktuell
};
```

**Aktienkurse:**
```javascript
// Yahoo Finance API oder Alpha Vantage (kostenlos mit Limit)
// Symbole: AAPL, DBK.DE, PAH3.DE, SBUX, TSLA
// Für Gazprom: Möglicherweise nicht mehr handelbar (Sanktionen), 
// dann Fallback auf letzten bekannten Kurs oder manuellen Wert
```

### Fallback bei API-Fehlern
- Manuelle Eingabefelder für Kurse, falls API nicht erreichbar
- Letzte bekannte Werte cachen
- Hinweis "Kurse manuell eingeben" wenn API fehlschlägt

---

## Datenstruktur (JSON)

```json
{
  "accounts": {
    "apo00": 0,
    "apo10": 0,
    "apo20": 0,
    "spkPrivat": 0,
    "spkMiete": 0,
    "spkSparkonto": 0,
    "euroCash": 0,
    "dollarCash": 15700,
    "dollarRate": 0.92,
    "goldOunces": 0,
    "goldPricePerOunce": 2500
  },
  "stocks": [
    {"symbol": "AAPL", "name": "Apple Inc.", "shares": 25, "buyPrice": 174.49, "currentPrice": 0},
    {"symbol": "DBK.DE", "name": "Deutsche Bank AG", "shares": 50, "buyPrice": 9.14, "currentPrice": 0},
    {"symbol": "PAH3.DE", "name": "Porsche AG Vz.", "shares": 4, "buyPrice": 116.00, "currentPrice": 0},
    {"symbol": "OGZD", "name": "Gazprom ADR", "shares": 190, "buyPrice": 8.12, "currentPrice": 2.70},
    {"symbol": "SBUX", "name": "Starbucks Corp.", "shares": 15, "buyPrice": 79.53, "currentPrice": 0},
    {"symbol": "TSLA", "name": "Tesla Inc.", "shares": 6, "buyPrice": 312.17, "currentPrice": 0}
  ],
  "income": {
    "rentMonthly": 0,
    "kassenpatientenMonthly": 0,
    "privatHnoWeekly": [0, 0, 0, 0, 0],
    "privatBetaWeekly": [0, 0, 0, 0, 0],
    "kvQuarterly": 0,
    "kvSonderzahlung": 0,
    "kvQuarter": "Q1"
  },
  "expenses": {
    "fixkostenMonthly": 80000,
    "finanzamtMonthly": 0,
    "variableMonthly": 0
  },
  "vacations": [
    {"from": "2026-08-01", "to": "2026-08-21"},
    {"from": "2026-12-23", "to": "2027-01-06"}
  ],
  "forecastMonths": 12
}
```

---

## UI-Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  💼 HNO-Praxis Liquiditätsplaner              [Aktualisieren] 🔄    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────┐  ┌─────────────────────┐                   │
│  │ GESAMTVERMÖGEN      │  │ BAR VERFÜGBAR       │                   │
│  │ € 1.234.567,00      │  │ € 456.789,00        │                   │
│  │ ▲ +2,3% vs. Vormonat│  │                     │                   │
│  └─────────────────────┘  └─────────────────────┘                   │
│                                                                     │
│  [Vermögen] [Einnahmen] [Ausgaben] [Prognose] [Aktien]              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  KONTEN                           │  BARBESTÄNDE & GOLD             │
│  ┌──────────────┬──────────────┐  │  ┌──────────────┬────────────┐  │
│  │ Apo 00       │ [________] € │  │  │ Euro bar     │ [______] € │  │
│  │ Apo 10       │ [________] € │  │  │ Dollar (USD) │ 15.700 $   │  │
│  │ Apo 20       │ [________] € │  │  │ = EUR        │ 14.444 €   │  │
│  │ SPK Privat   │ [________] € │  │  │ Gold (oz)    │ [______]   │  │
│  │ SPK Miete    │ [________] € │  │  │ Goldpreis/oz │ 2.456 €    │  │
│  │ SPK Sparkonto│ [________] € │  │  │ = Goldwert   │ 12.280 €   │  │
│  └──────────────┴──────────────┘  │  └──────────────┴────────────┘  │
│                                                                     │
│  AKTIENPORTFOLIO                                                    │
│  ┌────────────┬───────┬─────────┬───────────┬───────────┬────────┐  │
│  │ Aktie      │ Stück │ Kaufkurs│ Akt. Kurs │ Wert      │ +/-    │  │
│  ├────────────┼───────┼─────────┼───────────┼───────────┼────────┤  │
│  │ Apple      │ 25    │ 174,49€ │ 235,00€   │ 5.875,00€ │ +34,7% │  │
│  │ Dt. Bank   │ 50    │ 9,14€   │ 33,20€    │ 1.660,00€ │+263,2% │  │
│  │ Porsche Vz.│ 4     │ 116,00€ │ 45,00€    │ 180,00€   │ -61,2% │  │
│  │ Gazprom    │ 190   │ 8,12€   │ 2,70€     │ 513,00€   │ -66,7% │  │
│  │ Starbucks  │ 15    │ 79,53€  │ 72,00€    │ 1.080,00€ │ -9,5%  │  │
│  │ Tesla      │ 6     │ 312,17€ │ 392,00€   │ 2.352,00€ │ +25,6% │  │
│  ├────────────┴───────┴─────────┴───────────┼───────────┼────────┤  │
│  │ SUMME PORTFOLIO                          │11.660,00€ │ +15,2% │  │
│  └──────────────────────────────────────────┴───────────┴────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Farbschema

- Primär: #1E40AF (Dunkelblau - Medizin/Vertrauen)
- Sekundär: #3B82F6 (Hellblau)
- Positiv/Gewinn: #16A34A (Grün)
- Negativ/Verlust: #DC2626 (Rot)
- Warnung: #F59E0B (Orange)
- Hintergrund: #F8FAFC (Hellgrau)
- Karten: #FFFFFF (Weiß)
- Text: #1F2937 (Dunkelgrau)

---

## Zusätzliche Features

1. **Währungsformatierung:** Alle EUR-Beträge mit Tausendertrennpunkt und 2 Dezimalstellen (z.B. 80.000,00 €)
2. **Automatische Neuberechnung:** Bei jeder Eingabeänderung sofort neu berechnen
3. **Responsive Design:** Mobile-optimiert für Tablet/Smartphone
4. **Druck-Funktion:** Übersicht als PDF drucken können
5. **Datum der letzten Aktualisierung:** "Kurse vom: 01.01.2026, 10:30 Uhr"
6. **Tooltips:** Erklärungen bei Hover über Feldnamen

---

## Wichtige Berechnungslogik

### Liquiditätsprognose mit Urlaub:

```javascript
const calculateMonthlyForecast = (month, vacations, income, expenses) => {
  const workingDaysInMonth = getWorkingDays(month);
  const vacationDaysInMonth = getVacationDays(month, vacations);
  const workingRatio = (workingDaysInMonth - vacationDaysInMonth) / workingDaysInMonth;
  
  // Praxiseinnahmen reduziert um Urlaubsanteil
  const praxisEinnahmen = (income.privatMonthly + income.kassenMonthly) * workingRatio;
  
  // Mieteinnahmen laufen immer
  const miete = income.rentMonthly;
  
  // KV-Zahlung nur in Quartalsmonaten (März, Juni, September, Dezember)
  const kvZahlung = isQuartalEnde(month) ? income.kvQuarterly + income.kvSonderzahlung : 0;
  
  const gesamtEinnahmen = praxisEinnahmen + miete + kvZahlung;
  const gesamtAusgaben = expenses.fixkosten + expenses.finanzamt + expenses.variable;
  
  return gesamtEinnahmen - gesamtAusgaben;
};
```

---

## Validierung

- Alle Zahlenfelder: Nur positive Zahlen oder 0
- Datumsfelder: Gültiges Datum, "Von" muss vor "Bis" liegen
- Pflichtfelder markieren
- Bei ungültiger Eingabe: Rote Umrandung + Fehlermeldung

---

*Erstelle eine vollständig funktionsfähige App mit allen genannten Features. Verwende Mock-Daten für die API-Aufrufe, falls keine echten APIs verfügbar sind. Die App soll ohne Backend funktionieren (rein clientseitig).*
