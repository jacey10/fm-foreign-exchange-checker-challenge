const state = {
  baseCurrency: 'USD',
  quoteCurrency: 'EUR',
  amount: 1,
  currencies: {},       // { USD: 'US Dollar', ... }
  favorites: [],        // [{ base, quote }, ...]
  conversionLog: [],    // [{ base, quote, amount, result, date }, ...]
  activeView: 'converter',
};

// localStorage keys
const KEYS = { favorites: 'fx_favorites', log: 'fx_log' };

export function getState() { return state; }

export function setState(patch) {
  Object.assign(state, patch);
}

export function loadFromStorage() {
  state.favorites = JSON.parse(localStorage.getItem(KEYS.favorites) || '[]');
  state.conversionLog = JSON.parse(localStorage.getItem(KEYS.log) || '[]');
}

export function saveFavorites() {
  localStorage.setItem(KEYS.favorites, JSON.stringify(state.favorites));
}

export function addToLog(entry) {
  state.conversionLog.unshift({ ...entry, date: new Date().toISOString() });
  if (state.conversionLog.length > 50) state.conversionLog.pop(); // cap at 50
  localStorage.setItem(KEYS.log, JSON.stringify(state.conversionLog));
}

// favorites
[
  { base: 'USD', quote: 'EUR' },
  { base: 'GBP', quote: 'NGN' }
]

// conversionLog (capped at 50)
[
  {
    base: 'USD', quote: 'EUR',
    amount: 100, result: 91.43,
    date: '2026-07-02T14:30:00.000Z'
  }
]