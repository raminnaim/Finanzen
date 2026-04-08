// Vercel Serverless Function: /api/rates
// Ruft Wechselkurs, Goldpreis und Aktienkurse ab (serverseitig, kein CORS-Problem)

export default async function handler(req, res) {
  // CORS-Header setzen
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const result = {
    dollarRate: null,
    goldPriceEUR: null,
    stocks: {},
    errors: [],
    updated: 0,
    failed: 0
  };

  // 1) USD/EUR Wechselkurs via Frankfurter API (neue URL)
  try {
    const r = await fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=EUR', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (r.ok) {
      const d = await r.json();
      result.dollarRate = d.rates.EUR;
      result.updated++;
    } else {
      result.errors.push(`Frankfurter API: Status ${r.status}`);
      result.failed++;
    }
  } catch (e) {
    result.errors.push(`Frankfurter API: ${e.message}`);
    result.failed++;
  }

  // 2) Goldpreis via Yahoo Finance GC=F (serverseitig kein CORS-Problem)
  try {
    const r = await fetch(
      'https://query2.finance.yahoo.com/v8/finance/chart/GC=F?range=1d&interval=1d',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (r.ok) {
      const d = await r.json();
      const goldUSD = d.chart.result[0].meta.regularMarketPrice;
      if (goldUSD && result.dollarRate) {
        result.goldPriceEUR = Math.round(goldUSD * result.dollarRate);
        result.updated++;
      } else if (goldUSD) {
        result.goldPriceEUR = Math.round(goldUSD * 0.85);
        result.updated++;
      }
    } else {
      result.errors.push(`Yahoo Gold: Status ${r.status}`);
      result.failed++;
    }
  } catch (e) {
    result.errors.push(`Yahoo Gold: ${e.message}`);
    result.failed++;
  }

  // 3) Aktienkurse - Symbole aus Query-Parameter lesen
  const symbols = req.query.symbols ? req.query.symbols.split(',') : [];
  for (const symbol of symbols) {
    try {
      const r = await fetch(
        `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      if (r.ok) {
        const d = await r.json();
        const price = d.chart.result[0].meta.regularMarketPrice;
        if (price !== null && price !== undefined) {
          result.stocks[symbol] = price;
          result.updated++;
        } else {
          result.errors.push(`Yahoo ${symbol}: Kein Preis`);
          result.failed++;
        }
      } else {
        result.errors.push(`Yahoo ${symbol}: Status ${r.status}`);
        result.failed++;
      }
    } catch (e) {
      result.errors.push(`Yahoo ${symbol}: ${e.message}`);
      result.failed++;
    }
  }

  return res.status(200).json(result);
}
