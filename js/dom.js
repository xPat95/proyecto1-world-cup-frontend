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

const TEAM_THEMES = {
  FWC: ['#D4AF37', '#FFF3C4', '#111827'],
  MEX: ['#15803D', '#FFFFFF', '#DC2626'],
  RSA: ['#16A34A', '#FACC15', '#111827'],
  KOR: ['#FFFFFF', '#DBEAFE', '#DC2626'],
  CZE: ['#2563EB', '#FFFFFF', '#DC2626'],
  CAN: ['#DC2626', '#FFFFFF', '#991B1B'],
  BIH: ['#2563EB', '#FACC15', '#1E3A8A'],
  QAT: ['#7F1D1D', '#FFFFFF', '#FACC15'],
  SUI: ['#DC2626', '#FFFFFF', '#991B1B'],
  BRA: ['#16A34A', '#FACC15', '#1D4ED8'],
  MAR: ['#DC2626', '#15803D', '#FACC15'],
  HAI: ['#1D4ED8', '#DC2626', '#FFFFFF'],
  SCO: ['#2563EB', '#FFFFFF', '#1E40AF'],
  USA: ['#1D4ED8', '#FFFFFF', '#DC2626'],
  PAR: ['#DC2626', '#FFFFFF', '#2563EB'],
  AUS: ['#FACC15', '#166534', '#1D4ED8'],
  TUR: ['#DC2626', '#FFFFFF', '#991B1B'],
  GER: ['#111827', '#F9FAFB', '#DC2626'],
  CUW: ['#2563EB', '#FACC15', '#FFFFFF'],
  CIV: ['#F97316', '#FFFFFF', '#16A34A'],
  ECU: ['#FACC15', '#2563EB', '#DC2626'],
  NED: ['#F97316', '#FFFFFF', '#1D4ED8'],
  JPN: ['#FFFFFF', '#F3F4F6', '#2563EB'],
  SWE: ['#2563EB', '#FACC15', '#1E3A8A'],
  TUN: ['#DC2626', '#FFFFFF', '#991B1B'],
  BEL: ['#111827', '#DC2626', '#FACC15'],
  EGY: ['#DC2626', '#FFFFFF', '#111827'],
  IRN: ['#16A34A', '#FFFFFF', '#DC2626'],
  NZL: ['#111827', '#FFFFFF', '#DC2626'],
  ESP: ['#DC2626', '#FACC15', '#7C2D12'],
  CPV: ['#2563EB', '#FFFFFF', '#DC2626'],
  KSA: ['#15803D', '#FFFFFF', '#065F46'],
  URU: ['#60A5FA', '#FFFFFF', '#FACC15'],
  FRA: ['#2563EB', '#DBEAFE', '#EF4444'],
  SEN: ['#16A34A', '#FACC15', '#DC2626'],
  IRQ: ['#DC2626', '#FFFFFF', '#111827'],
  NOR: ['#DC2626', '#FFFFFF', '#1D4ED8'],
  ARG: ['#7ACBFF', '#FFFFFF', '#F4D35E'],
  ALG: ['#16A34A', '#FFFFFF', '#DC2626'],
  AUT: ['#DC2626', '#FFFFFF', '#991B1B'],
  JOR: ['#111827', '#FFFFFF', '#16A34A'],
  POR: ['#15803D', '#DC2626', '#FACC15'],
  COD: ['#2563EB', '#DC2626', '#FACC15'],
  UZB: ['#60A5FA', '#FFFFFF', '#16A34A'],
  COL: ['#FACC15', '#2563EB', '#DC2626'],
  ENG: ['#FFFFFF', '#DBEAFE', '#DC2626'],
  CRO: ['#FFFFFF', '#DC2626', '#2563EB'],
  GHA: ['#FACC15', '#16A34A', '#DC2626'],
  PAN: ['#DC2626', '#FFFFFF', '#2563EB'],
  FALLBACK: ['#3B82F6', '#EFF6FF', '#1E3A8A'],
};

const COUNTRY_TO_CODE = {
  mexico: 'MEX',
  sudafrica: 'RSA',
  'corea del sur': 'KOR',
  'republica checa': 'CZE',
  canada: 'CAN',
  'bosnia y herzegovina': 'BIH',
  qatar: 'QAT',
  suiza: 'SUI',
  brasil: 'BRA',
  marruecos: 'MAR',
  haiti: 'HAI',
  escocia: 'SCO',
  'estados unidos': 'USA',
  paraguay: 'PAR',
  australia: 'AUS',
  turquia: 'TUR',
  alemania: 'GER',
  curazao: 'CUW',
  'costa de marfil': 'CIV',
  ecuador: 'ECU',
  'paises bajos': 'NED',
  japon: 'JPN',
  suecia: 'SWE',
  tunez: 'TUN',
  belgica: 'BEL',
  egipto: 'EGY',
  iran: 'IRN',
  'nueva zelanda': 'NZL',
  espana: 'ESP',
  'cabo verde': 'CPV',
  'arabia saudita': 'KSA',
  uruguay: 'URU',
  francia: 'FRA',
  senegal: 'SEN',
  irak: 'IRQ',
  noruega: 'NOR',
  argentina: 'ARG',
  argelia: 'ALG',
  austria: 'AUT',
  jordania: 'JOR',
  portugal: 'POR',
  'rd congo': 'COD',
  uzbekistan: 'UZB',
  colombia: 'COL',
  inglaterra: 'ENG',
  croacia: 'CRO',
  ghana: 'GHA',
  panama: 'PAN',
};

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

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getCodeFromSticker(sticker) {
  const stickerCode = String(sticker.sticker_number || '').trim().toUpperCase();
  const codeMatch = stickerCode.match(/^[A-Z]{3}/);

  if (codeMatch) {
    return codeMatch[0];
  }

  const countryText = String(sticker.country || '').trim().toUpperCase();

  if (TEAM_THEMES[countryText]) {
    return countryText;
  }

  return COUNTRY_TO_CODE[normalizeText(sticker.country)] || 'FALLBACK';
}

function getCountryTheme(sticker) {
  const code = getCodeFromSticker(sticker);
  const [primary, secondary, accent] = TEAM_THEMES[code] || TEAM_THEMES.FALLBACK;

  return {
    code,
    primary,
    secondary,
    accent,
  };
}

function createTextElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;

  return element;
}

function applyStickerTheme(card, sticker, quantity) {
  const theme = getCountryTheme(sticker);

  if (quantity === 0) {
    return;
  }

  card.style.setProperty('--team-primary', theme.primary);
  card.style.setProperty('--team-secondary', theme.secondary);
  card.style.setProperty('--team-accent', quantity > 1 ? '#D4AF37' : theme.accent);

  if (theme.code === 'FWC') {
    card.classList.add('fwc');
  }
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
    const theme = getCountryTheme(sticker);
    const stickerCode = String(sticker.sticker_number || 'SIN-CODIGO').toUpperCase();

    card.className = `sticker-card ${statusClass}`;
    applyStickerTheme(card, sticker, quantity);

    card.appendChild(createTextElement('span', 'sticker-code-bubble', theme.code === 'FALLBACK' ? '?' : theme.code));

    if (quantity > 1) {
      card.appendChild(createTextElement('span', 'duplicate-ribbon', 'REPETIDA'));
    }

    card.appendChild(createTextElement('strong', 'sticker-number', stickerCode));
    card.appendChild(createTextElement('p', 'sticker-country', sticker.country || theme.code));
    card.appendChild(createTextElement('p', 'sticker-name', sticker.player_name || 'Referencia sin nombre'));
    card.appendChild(createTextElement('p', 'sticker-position', sticker.position || 'Sin posicion'));

    const quantityRow = document.createElement('div');
    quantityRow.className = 'sticker-quantity-row';
    quantityRow.appendChild(createTextElement('span', 'sticker-quantity-label', 'Cantidad'));
    quantityRow.appendChild(createTextElement('span', 'sticker-quantity', quantity));
    card.appendChild(quantityRow);

    card.appendChild(createTextElement('span', 'status-label', status.toUpperCase()));

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
    deleteButton.textContent = 'X';
    deleteButton.setAttribute('aria-label', `Eliminar ${stickerCode}`);

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
    paginationInfo.textContent = 'Pagina 0 de 0 - 0 resultados';
    prevPageButton.disabled = true;
    nextPageButton.disabled = true;
    return;
  }

  paginationInfo.textContent = `Pagina ${page} de ${totalPages} - ${total} resultados`;
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
