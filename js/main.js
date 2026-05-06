import { getStickers } from './api.js';
import {
  clearMessage,
  renderStats,
  renderStickers,
  showMessage,
} from './dom.js';

async function loadStickers() {
  try {
    showMessage('Cargando estampillas...', 'info');

    const response = await getStickers({ limit: 50 });
    const stickers = response.data || [];

    renderStickers(stickers);
    renderStats(stickers);
    clearMessage();
  } catch (error) {
    console.error('Error loading stickers:', error);
    showMessage('No se pudieron cargar las estampillas. Revisa que el backend esté corriendo.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Frontend del World Cup Sticker Tracker cargado');
  loadStickers();
});
