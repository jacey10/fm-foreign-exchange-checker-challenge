const BASE = 'https://api.frankfurter.dev/v2';

const cache = new Map();

async function get(endpoint) {
  if (cache.has(endpoint)) return cache.get(endpoint);
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  cache.set(endpoint, data);
  return data;
}

export const getCurrencies = () => get('/currencies');
export const getRate = (base, quote) => get(`/rate/${base}/${quote}`);
export const getRates = (base, quotes) => get(`/rates?base=${base}&quotes=${quotes.join(',')}`);
export const getHistory = (base, quote, from, group) => {
  const g = group ? `&group=${group}` : '';
  return get(`/rates?from=${from}&base=${base}&quotes=${quote}${g}`);
};
export const getRateOnDate = (base, quote, date) =>
  get(`/rates?date=${date}&base=${base}&quotes=${quote}`);
