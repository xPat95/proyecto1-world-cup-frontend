import {
  createSticker,
  deleteSticker,
  getStickers,
  updateSticker,
} from './api.js';
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
const stickersGrid = document.getElementById('stickersGrid');
const formPanel = document.getElementById('formPanel');
const formTitle = document.getElementById('formTitle');
const stickerForm = document.getElementById('stickerForm');
const stickerNumberInput = document.getElementById('stickerNumberInput');
const playerNameInput = document.getElementById('playerNameInput');
const countryInput = document.getElementById('countryInput');
const positionInput = document.getElementById('positionInput');
const quantityInput = document.getElementById('quantityInput');
const notesInput = document.getElementById('notesInput');
const clearFormButton = document.getElementById('clearFormButton');
const submitFormButton = document.getElementById('submitFormButton');

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
let currentStickers = [];
let editingStickerId = null;

async function loadStickers() {
  try {
    showMessage('Cargando estampillas...', 'info');

    const response = await getStickers(state);
    const stickers = response.data || [];
    currentStickers = stickers;
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

function exitEditMode() {
  editingStickerId = null;
  formPanel.classList.remove('editing');
  formTitle.textContent = 'Registrar estampilla';
  submitFormButton.textContent = 'Guardar estampilla';
  clearStickerForm();
}

function enterEditMode(sticker) {
  editingStickerId = sticker.id;
  formPanel.classList.add('editing');
  formTitle.textContent = 'Editar estampilla';
  submitFormButton.textContent = 'Actualizar estampilla';

  stickerNumberInput.value = sticker.sticker_number || '';
  playerNameInput.value = sticker.player_name || '';
  countryInput.value = sticker.country || '';
  positionInput.value = sticker.position || '';
  quantityInput.value = Number(sticker.quantity) || 0;
  notesInput.value = sticker.notes || '';

  showMessage('Editando estampilla seleccionada.', 'info');
  formPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (editingStickerId) {
      await updateSticker(editingStickerId, stickerData);
      exitEditMode();
      await loadStickers();
      showMessage('Estampilla actualizada correctamente.', 'success');
      return;
    }

    await createSticker(stickerData);
    clearStickerForm();
    state.page = 1;
    await loadStickers();
    showMessage('Estampilla registrada correctamente.', 'success');
  } catch (error) {
    console.error('Error creating sticker:', error);
    const actionMessage = editingStickerId
      ? 'No se pudo actualizar la estampilla.'
      : 'No se pudo registrar la estampilla.';

    showMessage(`${actionMessage} ${error.message}`, 'error');
  }
}

async function handleStickerActionClick(event) {
  const actionButton = event.target.closest('[data-action]');

  if (!actionButton) {
    return;
  }

  const id = Number(actionButton.dataset.id);
  const action = actionButton.dataset.action;

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  if (action === 'edit') {
    const sticker = currentStickers.find((item) => Number(item.id) === id);

    if (!sticker) {
      showMessage('No se encontró la estampilla seleccionada.', 'error');
      return;
    }

    enterEditMode(sticker);
    return;
  }

  if (action === 'delete') {
    const confirmed = window.confirm('¿Seguro que quieres eliminar esta estampilla?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteSticker(id);

      if (editingStickerId === id) {
        exitEditMode();
      }

      await loadStickers();
      showMessage('Estampilla eliminada correctamente.', 'success');
    } catch (error) {
      console.error('Error deleting sticker:', error);
      showMessage(`No se pudo eliminar la estampilla. ${error.message}`, 'error');
    }
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

  stickersGrid.addEventListener('click', handleStickerActionClick);

  stickerForm.addEventListener('submit', handleStickerFormSubmit);

  clearFormButton.addEventListener('click', () => {
    exitEditMode();
    clearMessage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Frontend del World Cup Sticker Tracker cargado');
  quantityInput.value = '0';
  setupEventListeners();
  loadStickers();
});
