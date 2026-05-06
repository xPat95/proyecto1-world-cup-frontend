import { getStickers } from './api.js';
import {
  clearMessage,
  renderPagination,
  renderStats,
  renderStickers,
  showMessage,
} from './dom.js';

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const sortSelect = document.getElementById('sortSelect');
const orderSelect = document.getElementById('orderSelect');
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const limitSelect = document.getElementById('limitSelect');

const state = {
  q: '',
  status: '',
  sort: 'id',
  order: 'asc',
  page: 1,
  limit: 10,
};

let searchTimeoutId;
let pagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

async function loadStickers() {
  try {
    showMessage('Cargando estampillas...', 'info');

    const response = await getStickers(state);
    const stickers = response.data || [];
    pagination = response.pagination || pagination;

    renderStickers(stickers);
    renderStats(stickers);
    renderPagination(pagination);
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

  prevPageButton.addEventListener('click', () => {
    if (state.page > 1) {
      state.page -= 1;
      loadStickers();
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (state.page < pagination.totalPages) {
      state.page += 1;
      loadStickers();
    }
  });

  limitSelect.addEventListener('change', (event) => {
    state.limit = Number(event.target.value);
    state.page = 1;
    loadStickers();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Frontend del World Cup Sticker Tracker cargado');
  setupEventListeners();
  loadStickers();
});
