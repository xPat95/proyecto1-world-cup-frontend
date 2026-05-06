const stickersGrid = document.getElementById('stickersGrid');
const messageContainer = document.getElementById('messageContainer');
const totalCount = document.getElementById('totalCount');
const ownedCount = document.getElementById('ownedCount');
const missingCount = document.getElementById('missingCount');
const duplicateCount = document.getElementById('duplicateCount');
const progressPercent = document.getElementById('progressPercent');
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const paginationInfo = document.getElementById('paginationInfo');

export function getStickerStatus(quantity) {
  if (quantity === 0) {
    return 'Faltante';
  }

  if (quantity === 1) {
    return 'Conseguida';
  }

  return 'Repetida';
}

export function getStickerStatusClass(quantity) {
  if (quantity === 0) {
    return 'missing';
  }

  if (quantity === 1) {
    return 'owned';
  }

  return 'duplicate';
}

function createTextElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;

  return element;
}

export function renderStickers(stickers) {
  stickersGrid.innerHTML = '';

  if (!stickers.length) {
    stickersGrid.innerHTML = '<p class="empty-message">No se encontraron estampillas con esos criterios.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  stickers.forEach((sticker) => {
    const quantity = Number(sticker.quantity);
    const status = getStickerStatus(quantity);
    const statusClass = getStickerStatusClass(quantity);
    const card = document.createElement('article');

    card.className = `sticker-card ${statusClass}`;

    card.appendChild(createTextElement('span', 'status-label', status));
    card.appendChild(createTextElement('span', 'sticker-number', sticker.sticker_number));
    card.appendChild(createTextElement('h3', 'sticker-name', sticker.player_name));
    card.appendChild(createTextElement('p', 'sticker-country', sticker.country));
    card.appendChild(createTextElement('p', 'sticker-position', sticker.position || 'Sin posición'));
    card.appendChild(createTextElement('p', 'sticker-quantity', `Cantidad: ${quantity}`));

    const actions = document.createElement('div');
    actions.className = 'sticker-actions';

    const editButton = document.createElement('button');
    editButton.className = 'sticker-action-button edit-action';
    editButton.type = 'button';
    editButton.dataset.action = 'edit';
    editButton.dataset.id = sticker.id;
    editButton.textContent = 'Editar';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'sticker-action-button delete-action';
    deleteButton.type = 'button';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.id = sticker.id;
    deleteButton.textContent = 'Eliminar';

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    card.appendChild(actions);

    fragment.appendChild(card);
  });

  stickersGrid.appendChild(fragment);
}

export function renderStats(stickers) {
  const total = stickers.length;
  const owned = stickers.filter((sticker) => Number(sticker.quantity) === 1).length;
  const missing = stickers.filter((sticker) => Number(sticker.quantity) === 0).length;
  const duplicate = stickers.filter((sticker) => Number(sticker.quantity) > 1).length;
  const collected = stickers.filter((sticker) => Number(sticker.quantity) >= 1).length;
  const progress = total > 0 ? Math.round((collected / total) * 100) : 0;

  totalCount.textContent = total;
  ownedCount.textContent = owned;
  missingCount.textContent = missing;
  duplicateCount.textContent = duplicate;
  progressPercent.textContent = `${progress}%`;
}

export function renderPagination(pagination) {
  const page = Number(pagination?.page) || 0;
  const limit = Number(pagination?.limit) || 10;
  const total = Number(pagination?.total) || 0;
  const totalPages = Number(pagination?.totalPages) || 0;

  if (total === 0) {
    paginationInfo.textContent = 'Pagina 0 de 0 · 0 resultados';
    prevPageButton.disabled = true;
    nextPageButton.disabled = true;
    return;
  }

  paginationInfo.textContent = `Pagina ${page} de ${totalPages} · ${total} resultados`;
  prevPageButton.disabled = page <= 1;
  nextPageButton.disabled = page >= totalPages || totalPages === 0 || limit <= 0;
}

export function showMessage(message, type = 'info') {
  messageContainer.textContent = message;
  messageContainer.className = `message-container ${type}`;
}

export function clearMessage() {
  messageContainer.textContent = '';
  messageContainer.className = 'message-container';
}
