import { useState, useEffect, useCallback } from 'react';
import { LiveRates } from '@/types';
import { fetchLiveRates, fetchStockPrices } from '@/lib/api';

export const useLiveRates = () => {
  const [rates, setRates] = useState<LiveRates>({
    usdEur: 0.92,
    goldPrice: 2450,
    lastUpdated: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newRates = await fetchLiveRates();
      setRates(newRates);
    } catch (err) {
      setError('Fehler beim Abrufen der Live-Kurse');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStockPrices = useCallback(async (symbols: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const prices = await fetchStockPrices(symbols);
      return prices;
    } catch (err) {
      setError('Fehler beim Abrufen der Aktienkurse');
      console.error(err);
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    rates,
    loading,
    error,
    refresh,
    refreshStockPrices,
  };
};