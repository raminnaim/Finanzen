/**
 * Format number as German currency (1.234.567,89 €)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format number as German number format (1.234.567,89)
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format percentage with sign (+12.5% or -5.3%)
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatNumber(value, 1)}%`;
};

/**
 * Format date as German format (01.01.2026)
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('de-DE').format(d);
};

/**
 * Format datetime as German format (01.01.2026, 10:30 Uhr)
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d) + ' Uhr';
};

/**
 * Parse German number format to number
 */
export const parseGermanNumber = (value: string): number => {
  if (!value) return 0;
  // Remove thousand separators and replace comma with dot
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};