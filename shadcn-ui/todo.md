# HNO-Praxis Liquiditätsplaner - Development Plan

## Design Guidelines

### Design References
- **Stripe Dashboard**: Clean financial data presentation with clear hierarchy
- **Plaid Dashboard**: Professional banking interface with excellent data visualization
- **Style**: Modern Financial Dashboard + Medical Professional Aesthetic

### Color Palette
- Primary: #1E40AF (Deep Blue - Medical/Trust)
- Secondary: #3B82F6 (Light Blue)
- Success/Profit: #16A34A (Green)
- Danger/Loss: #DC2626 (Red)
- Warning: #F59E0B (Orange)
- Background: #F8FAFC (Light Gray)
- Cards: #FFFFFF (White)
- Text: #1F2937 (Dark Gray)
- Border: #E5E7EB (Light Border)

### Typography
- Heading1: Inter font-weight 700 (32px) - Main dashboard title
- Heading2: Inter font-weight 600 (24px) - Section headers
- Heading3: Inter font-weight 600 (18px) - Card titles
- Body/Normal: Inter font-weight 400 (14px)
- Body/Emphasis: Inter font-weight 600 (14px)
- Numbers/Financial: Inter font-weight 700 (16-24px) - Monospace feel for clarity

### Key Component Styles
- **Cards**: White background, subtle shadow (shadow-sm), 8px rounded corners
- **Input Fields**: Border bottom style, focus state with blue accent
- **Buttons**: Primary blue (#1E40AF), hover state brightens 10%
- **Tables**: Alternating row colors for readability, hover highlights
- **Charts**: Use Recharts with color palette, responsive sizing

### Layout & Spacing
- Dashboard grid: Responsive columns (1-2-3 based on screen size)
- Card padding: 24px
- Section spacing: 32px vertical gaps
- Input spacing: 16px between fields
- Table row height: 48px minimum

### Images to Generate
1. **financial-dashboard-hero.jpg** - Professional medical office with financial charts on screen (Style: photorealistic, bright office)
2. **medical-finance-icon.png** - Modern icon combining medical cross and financial graph (Style: minimalist, blue tones)

---

## Development Tasks

### 1. Project Setup & Structure
- Initialize shadcn-ui template
- Install dependencies: recharts, date-fns, lucide-react
- Set up TypeScript types for data structures
- Create folder structure: components/, lib/, hooks/, types/

### 2. Core Data Types & State Management
- Create TypeScript interfaces for:
  - Accounts (bank accounts, cash, gold)
  - Stocks (portfolio data)
  - Income (monthly, weekly, quarterly)
  - Expenses (fixed, variable)
  - Vacations (date ranges)
  - Forecast data
- Set up React state management with useState/useReducer
- Create utility functions for calculations

### 3. API Integration Layer
- Create API service for live data:
  - USD/EUR exchange rate (frankfurter.app)
  - Gold price per ounce
  - Stock prices (Yahoo Finance alternative or fallback)
- Implement error handling and fallback mechanisms
- Add manual input override when API fails
- Cache last known values in localStorage

### 4. Dashboard Components
- **Summary Cards Component**:
  - Total assets (Gesamtvermögen)
  - Liquid assets (Bar verfügbar)
  - Display with large numbers, trend indicators
- **Accounts Section**:
  - Input fields for all bank accounts (Apo 00/10/20, SPK accounts)
  - Real-time sum calculation
- **Cash & Gold Section**:
  - Euro cash input
  - Dollar cash (fixed 15,700 USD with live conversion)
  - Gold ounces input with live price calculation

### 5. Stock Portfolio Component
- Table displaying all 6 stock positions
- Columns: Name, Symbol, Shares, Buy Price, Current Price, Current Value, Profit/Loss (€ and %)
- Live price fetching with refresh button
- Manual override inputs for failed API calls
- Portfolio summary row (total value, total profit/loss)
- Color coding: green for profit, red for loss

### 6. Income Input Components
- **Monthly Income**:
  - Rent income input
  - Kassenpatienten revenue input
- **Weekly Private Patients**:
  - Two sections: HNO-Zentrum Bonn and Betaklinik
  - 5 week inputs each (Week 1-5)
  - Auto-sum for each section
  - Combined total
- **KV Payments**:
  - Quarterly payment input
  - Special payment input
  - Quarter selector dropdown (Q1-Q4)

### 7. Expenses Input Components
- Fixed costs monthly (default: 80,000 €)
- Tax office monthly (Finanzamt)
- Variable costs monthly
- Auto-calculate total expenses

### 8. Vacation/Downtime Manager
- Date range picker for vacation periods
- Multiple vacation periods support
- Add/remove vacation entries
- Visual calendar representation
- Calculate working days vs. vacation days per month

### 9. Liquidity Forecast Engine
- Time period selector buttons (1/3/6/12/24 months)
- Monthly calculation logic:
  - Income (rent + private + kassen + proportional KV)
  - Subtract vacation impact on practice income
  - Subtract expenses
  - Calculate monthly surplus/deficit
  - Running cumulative balance
- Warning system for negative liquidity
- Export forecast data

### 10. Charts & Visualizations (Recharts)
- **Dashboard View**:
  - Pie chart: Asset distribution (accounts, gold, stocks, cash)
  - Bar chart: Income by source (rent, private HNO, private Beta, kassen, KV)
  - Line chart: Liquidity forecast over time
- **Stock View**:
  - Pie chart: Portfolio distribution by stock
  - Bar chart: Profit/loss per position
- Responsive chart sizing
- Tooltips with detailed information
- Color-coded based on palette

### 11. Navigation & Layout
- Tab navigation: [Vermögen] [Einnahmen] [Ausgaben] [Prognose] [Aktien]
- Sticky header with app title and refresh button
- Responsive layout (mobile, tablet, desktop)
- Print-friendly CSS

### 12. Utility Functions
- Currency formatting (German format: 1.234.567,89 €)
- Percentage formatting
- Date calculations (working days, vacation days)
- Quarter detection for KV payments
- Validation functions for inputs

### 13. Data Persistence
- localStorage integration for all user inputs
- Auto-save on input change
- Load saved data on app initialization
- Export/import JSON functionality

### 14. Additional Features
- Refresh button to update all live data
- Last update timestamp display
- Tooltips for field explanations
- Input validation with error messages
- Responsive design for all screen sizes
- Print stylesheet for PDF generation

### 15. Testing & Polish
- Test all calculations with sample data
- Verify API integrations and fallbacks
- Test responsive behavior
- Verify German number formatting
- Check color contrast for accessibility
- Run lint and build checks

---

## File Structure

```
src/
├── components/
│   ├── ui/ (shadcn components)
│   ├── Dashboard.tsx
│   ├── SummaryCards.tsx
│   ├── AccountsSection.tsx
│   ├── CashGoldSection.tsx
│   ├── StockPortfolio.tsx
│   ├── IncomeInputs.tsx
│   ├── ExpensesInputs.tsx
│   ├── VacationManager.tsx
│   ├── ForecastView.tsx
│   ├── ChartsView.tsx
│   └── Navigation.tsx
├── lib/
│   ├── api.ts (API service layer)
│   ├── calculations.ts (calculation logic)
│   ├── formatting.ts (currency, date formatting)
│   └── storage.ts (localStorage utilities)
├── hooks/
│   ├── useFinancialData.ts
│   ├── useLiveRates.ts
│   └── useForecast.ts
├── types/
│   └── index.ts (TypeScript interfaces)
├── App.tsx
└── main.tsx
```

---

## API Endpoints

### Exchange Rate (USD/EUR)
```
GET https://api.frankfurter.app/latest?from=USD&to=EUR
Response: { "rates": { "EUR": 0.92 } }
```

### Gold Price (Fallback to manual if needed)
```
Multiple options:
- metals-api.com
- goldapi.io
- Manual input as fallback
```

### Stock Prices
```
Yahoo Finance alternatives:
- finnhub.io (free tier)
- alphavantage.co (free tier)
- Manual input as fallback for all stocks
```

---

## Calculation Formulas

### Total Assets
```
Gesamtvermögen = 
  Apo00 + Apo10 + Apo20 + 
  SPKPrivat + SPKMiete + SPKSparkonto + 
  EuroCash + (DollarCash * UsdEurRate) + 
  (GoldOunces * GoldPricePerOunce) + 
  StockPortfolioValue
```

### Liquid Assets
```
Bar verfügbar = 
  Apo00 + Apo10 + Apo20 + 
  SPKPrivat + SPKMiete + SPKSparkonto
```

### Monthly Forecast
```
For each month:
  WorkingRatio = (WorkingDays - VacationDays) / WorkingDays
  PracticeIncome = (PrivatePatients + Kassenpatienten) * WorkingRatio
  TotalIncome = PracticeIncome + Rent + (KV if quarter-end)
  TotalExpenses = FixedCosts + Tax + Variable
  MonthlySurplus = TotalIncome - TotalExpenses
  CumulativeBalance = PreviousBalance + MonthlySurplus
```

### Stock Calculations
```
CurrentValue = Shares * CurrentPrice
BuyValue = Shares * BuyPrice
ProfitLoss = CurrentValue - BuyValue
ProfitLossPercent = (ProfitLoss / BuyValue) * 100
```

---

## Implementation Priority

1. ✅ Setup project structure and types
2. ✅ Create basic layout and navigation
3. ✅ Implement accounts and cash/gold sections
4. ✅ Build stock portfolio with live prices
5. ✅ Create income input components
6. ✅ Create expense input components
7. ✅ Implement vacation manager
8. ✅ Build forecast calculation engine
9. ✅ Add all charts and visualizations
10. ✅ Implement data persistence
11. ✅ Polish UI and add responsive design
12. ✅ Test and fix issues