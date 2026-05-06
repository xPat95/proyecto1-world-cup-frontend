import { getStickers } from './api.js';
import {
  clearMessage,
  renderStats,
  renderStickers,
  showMessage,
} from './dom.js';

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const sortSelect = document.getElementById('sortSelect');
const orderSelect = document.getElementById('orderSelect');

const state = {
  q: '',
  status: '',
  sort: 'id',
  order: 'asc',
  page: 1,
  limit: 10,
};

let searchTimeoutId;

async function loadStickers() {
  try {
    showMessage('Cargando estampillas...', 'info');

    const response = await getStickers(state);
    const stickers = response.data || [];

    renderStickers(stickers);
    renderStats(stickers);
    clearMessage();
  } catch (error) {
    console.error('Error loading stickers:', error);
    showMessage('No se pudieron cargar las estampillas. Revisa que el backend esté corriendo.', 'error');
  }
}

function setupEventListeners() {
  searchInput.addEventListener('input', (event) => {
    window.clearTimeout(searchTimeoutId);

    searchTimeoutId = window.setTimeout(() => {
      state.q = event.target.value.trim();
      state.page = 1;
      loadStickers();
    }, 300);
  });

  statusFilter.addEventListener('change', (event) => {
    state.status = event.target.value;
    state.page = 1;
    loadStickers();
  });

  sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    loadStickers();
  });

  orderSelect.addEventListener('change', (event) => {
    state.order = event.target.value;
    loadStickers();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Frontend del World Cup Sticker Tracker cargado');
  setupEventListeners();
  loadStickers();
});
