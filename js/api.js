import { API_URL } from './config.js';

export async function getStickers(params = {}) {
  const url = new URL(`${API_URL}/stickers`);
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });

  url.search = searchParams.toString();

  const response = await fetch(url);

  if (!response.ok) {
    let message = 'No se pudieron cargar las estampillas';

    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch (error) {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response.json();
}

export async function createSticker(stickerData) {
  const response = await fetch(`${API_URL}/stickers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stickerData),
  });

  if (!response.ok) {
    let message = 'No se pudo registrar la estampilla';

    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch (error) {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response.json();
}
