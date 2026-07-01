import { loadFromStorage } from './store.js';
import { getCurrencies } from './api.js';
import { setState } from './store.js';
import { initConverter } from './components/converter.js';
import { initTicker } from './components/ticker.js';
import { initNav } from './router.js';

async function init() {
  loadFromStorage();
  const currencies = await getCurrencies();
  setState({ currencies });

  initNav();
  initConverter();
  initTicker();
}

init();