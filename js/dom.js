const stickersGrid = document.getElementById('stickersGrid');
const messageContainer = document.getElementById('messageContainer');
const totalCount = document.getElementById('totalCount');
const ownedCount = document.getElementById('ownedCount');
const missingCount = document.getElementById('missingCount');
const duplicateCount = document.getElementById('duplicateCount');
const progressPercent = document.getElementById('progressPercent');

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

export function showMessage(message, type = 'info') {
  messageContainer.textContent = message;
  messageContainer.className = `message-container ${type}`;
}

export function clearMessage() {
  messageContainer.textContent = '';
  messageContainer.className = 'message-container';
}
