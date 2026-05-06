import { createSticker, getStickers } from './api.js';
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
const stickerForm = document.getElementById('stickerForm');
const stickerNumberInput = document.getElementById('stickerNumberInput');
const playerNameInput = document.getElementById('playerNameInput');
const countryInput = document.getElementById('countryInput');
const positionInput = document.getElementById('positionInput');
const quantityInput = document.getElementById('quantityInput');
const notesInput = document.getElementById('notesInput');
const clearFormButton = document.getElementById('clearFormButton');

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

function clearStickerForm() {
  stickerForm.reset();
  quantityInput.value = '0';
}

function getStickerFormData() {
  const quantityValue = quantityInput.value.trim();
  const quantity = quantityValue === '' ? 0 : Number(quantityValue);

  return {
    sticker_number: stickerNumberInput.value.trim(),
    player_name: playerNameInput.value.trim(),
    country: countryInput.value.trim(),
    position: positionInput.value.trim(),
    quantity,
    notes: notesInput.value.trim(),
  };
}

function validateStickerForm(stickerData) {
  if (!stickerData.sticker_number) {
    return 'El número de estampilla es obligatorio.';
  }

  if (!stickerData.player_name) {
    return 'El nombre del jugador es obligatorio.';
  }

  if (!stickerData.country) {
    return 'La selección o país es obligatorio.';
  }

  if (!Number.isInteger(stickerData.quantity) || stickerData.quantity < 0) {
    return 'La cantidad debe ser un número entero mayor o igual a 0.';
  }

  return null;
}

async function handleStickerFormSubmit(event) {
  event.preventDefault();

  const stickerData = getStickerFormData();
  const validationError = validateStickerForm(stickerData);

  if (validationError) {
    showMessage(validationError, 'error');
    return;
  }

  try {
    await createSticker(stickerData);
    showMessage('Estampilla registrada correctamente.', 'success');
    clearStickerForm();
    state.page = 1;
    await loadStickers();
    showMessage('Estampilla registrada correctamente.', 'success');
  } catch (error) {
    console.error('Error creating sticker:', error);
    showMessage(`No se pudo registrar la estampilla. ${error.message}`, 'error');
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

  stickerForm.addEventListener('submit', handleStickerFormSubmit);

  clearFormButton.addEventListener('click', () => {
    clearStickerForm();
    clearMessage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Frontend del World Cup Sticker Tracker cargado');
  quantityInput.value = '0';
  setupEventListeners();
  loadStickers();
});
