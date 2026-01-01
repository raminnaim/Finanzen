import { LiveRates } from '@/types';

/**
 * Fetch USD to EUR exchange rate
 */
export const fetchUsdEurRate = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR');
    if (!response.ok) throw new Error('Failed to fetch USD/EUR rate');
    const data = await response.json();
    return data.rates.EUR;
  } catch (error) {
    console.error('Error fetching USD/EUR rate:', error);
    // Fallback rate
    return 0.92;
  }
};

/**
 * Fetch gold price per ounce in EUR
 * Using a mock implementation with fallback
 */
export const fetchGoldPrice = async (): Promise<number> => {
  try {
    // Note: In production, use a real gold price API like metals-api.com or goldapi.io
    // For now, return a reasonable current price
    return 2450.0; // Approximate current gold price in EUR per troy ounce
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return 2450.0;
  }
};

/**
 * Fetch stock prices
 * Using mock implementation with fallback to manual input
 */
export const fetchStockPrices = async (symbols: string[]): Promise<Record<string, number>> => {
  try {
    // Note: In production, use a real stock API like finnhub.io or alphavantage.co
    // For now, return mock current prices
    const mockPrices: Record<string, number> = {
      AAPL: 235.0,
      'DBK.DE': 33.2,
      'PAH3.DE': 45.0,
      OGZD: 2.7, // Gazprom - limited trading due to sanctions
      SBUX: 72.0,
      TSLA: 392.0,
    };

    return symbols.reduce((acc, symbol) => {
      acc[symbol] = mockPrices[symbol] || 0;
      return acc;
    }, {} as Record<string, number>);
  } catch (error) {
    console.error('Error fetching stock prices:', error);
    return {};
  }
};

/**
 * Fetch all live rates
 */
export const fetchLiveRates = async (): Promise<LiveRates> => {
  const [usdEur, goldPrice] = await Promise.all([
    fetchUsdEurRate(),
    fetchGoldPrice(),
  ]);

  return {
    usdEur,
    goldPrice,
    lastUpdated: new Date().toISOString(),
  };
};