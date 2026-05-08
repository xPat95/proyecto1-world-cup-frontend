# World Cup Sticker Tracker - Frontend

## Descripción

Este repositorio contiene la interfaz web de **World Cup Sticker Tracker**, una aplicación full stack para llevar control de estampillas del Mundial usando códigos de álbum.

El frontend consume una API REST usando `fetch()` y permite administrar la colección desde una interfaz visual. Desde el cliente se pueden cargar estampillas, buscar, filtrar, ordenar, paginar, crear, editar y eliminar registros.

La app no usa imágenes reales de jugadores ni de estampillas. Cada estampa se representa como un cromo visual con código, selección o categoría, cantidad y estado.

El cliente no accede directamente a la base de datos. Toda la información se obtiene desde el backend mediante peticiones HTTP.

---

## Links del proyecto

- **Frontend desplegado:**  
  https://xpat95.github.io/proyecto1-world-cup-frontend/

- **Backend desplegado:**  
  https://proyecto1-world-cup-backend.onrender.com

- **Swagger UI del backend:**  
  https://proyecto1-world-cup-backend.onrender.com/docs

- **Repositorio backend:**  
  https://github.com/xPat95/proyecto1-world-cup-backend.git

---

## Tecnologías usadas

- HTML
- CSS
- JavaScript vanilla
- `fetch()`
- Live Server para desarrollo local

Este frontend:

- No usa React.
- No usa Vue.
- No usa Angular.
- No usa jQuery.
- No usa Axios.
- No usa dependencias externas.

---

## Funcionalidades principales

- Visualización de estampillas tipo cromo.
- Colores por selección o categoría.
- Estados visuales:
  - Faltante.
  - Conseguida.
  - Repetida.
- Búsqueda por texto.
- Filtros por estado.
- Ordenamiento.
- Paginación.
- Estadísticas globales del álbum.
- Crear estampilla.
- Editar estampilla.
- Eliminar estampilla.
- Enlace al repositorio desde la interfaz.

---

## Cumplimiento de requisitos

| Requisito | Estado |
|---|---|
| Cliente separado del backend | Cumplido |
| Frontend con HTML, CSS y JavaScript vanilla | Cumplido |
| Sin frameworks ni librerías externas | Cumplido |
| Consumo de API con `fetch()` | Cumplido |
| Cliente no accede directamente a la base de datos | Cumplido |
| Permite ver estampillas | Cumplido |
| Permite crear estampillas | Cumplido |
| Permite editar estampillas | Cumplido |
| Permite eliminar estampillas | Cumplido |
| Búsqueda | Cumplido |
| Filtros | Cumplido |
| Ordenamiento | Cumplido |
| Paginación | Cumplido |
| Estadísticas globales | Cumplido |
| Dos repositorios separados | Cumplido |
| README con link al backend | Cumplido |
| Proyecto publicado en internet | Cumplido |

---

## Lógica de estados

El estado se calcula a partir de `quantity`:

- `quantity = 0` → Faltante
- `quantity = 1` → Conseguida
- `quantity > 1` → Repetida

Una estampilla repetida también cuenta como conseguida.

Para estadísticas:

- Faltantes = `quantity = 0`
- Conseguidas = `quantity >= 1`
- Repetidas = `quantity > 1`
- Progreso = `conseguidas / total * 100`

---

## Estadísticas globales

Las cards superiores muestran estadísticas del álbum completo, no solo de la página visible ni de los filtros actuales.

Las estadísticas se obtienen desde el backend usando:

```http
GET /stickers/stats
```

Significado:

- Total = total de estampillas en la base de datos.
- Conseguidas = estampillas con `quantity >= 1`.
- Faltantes = estampillas con `quantity = 0`.
- Repetidas = estampillas con `quantity > 1`.
- Progreso = conseguidas / total.

---

## Lógica visual de cromos

Cada tarjeta prioriza el código de la estampilla como elemento principal.

Ejemplos de códigos:

- `FWC00`
- `FWC19`
- `MEX17`
- `ARG03`
- `BRA20`

Reglas visuales:

- `FWC` usa color dorado.
- Cada selección tiene colores propios.
- Las faltantes se muestran en gris.
- Las conseguidas usan los colores de la selección o categoría.
- Las repetidas usan acento dorado.
- El código de estampa es el elemento principal de la card.

---

## Configuración de API

La URL base del backend está configurada en:

```text
js/config.js
```

La versión publicada del frontend consume la API publicada del backend:

```text
https://proyecto1-world-cup-backend.onrender.com
```

Para desarrollo local, la URL puede apuntar a:

```text
http://localhost:3000
```

Si se cambia entre entorno local y publicado, se debe actualizar `API_URL` en `js/config.js`.

---

## Cómo correr localmente

Primero se debe levantar el backend y tener PostgreSQL con el schema y seed cargados.

Para el frontend, se recomienda usar VS Code con Live Server porque el proyecto usa módulos JavaScript y llamadas `fetch()`.

Pasos:

1. Abrir el repositorio frontend en VS Code.
2. Abrir `index.html`.
3. Click derecho → `Open with Live Server`.
4. Abrir la URL local indicada por Live Server.

No se recomienda abrir `index.html` directamente desde el sistema de archivos, porque puede causar problemas con módulos JavaScript o llamadas a la API.

---

## Cómo probar

En la versión publicada:

```text
https://xpat95.github.io/proyecto1-world-cup-frontend/
```

Con el backend disponible, probar en la interfaz:

- Verificar que carguen las estampillas.
- Buscar `FWC`.
- Buscar `MEX`.
- Filtrar por faltantes.
- Filtrar por conseguidas.
- Filtrar por repetidas.
- Cambiar la paginación.
- Crear una estampilla.
- Editar una estampilla.
- Eliminar una estampilla.
- Verificar que las estadísticas globales no cambien al cambiar de página o aplicar filtros.

---

## Relación con el backend

Este frontend consume una API REST publicada en Render:

```text
https://proyecto1-world-cup-backend.onrender.com
```

La documentación interactiva del backend está disponible en:

```text
https://proyecto1-world-cup-backend.onrender.com/docs
```

Repositorio del backend:

```text
https://github.com/xPat95/proyecto1-world-cup-backend.git
```

---

## Estructura del proyecto

```text
index.html
css/
  styles.css
js/
  config.js
  api.js
  dom.js
  main.js
assets/
  logo.png
  github.png
screenshots/
README.md
```

---

## Screenshots

Pendiente de agregar capturas después de probar la app.

Capturas sugeridas:

- Vista principal.
- Filtro funcionando.
- Formulario de registro.
- Tarjetas tipo cromo.

---

## Notas de entrega

El frontend está publicado en línea y consume el backend desplegado en Render.

Frontend publicado:

```text
https://xpat95.github.io/proyecto1-world-cup-frontend/
```

Backend publicado:

```text
https://proyecto1-world-cup-backend.onrender.com
```

Swagger UI del backend:

```text
https://proyecto1-world-cup-backend.onrender.com/docs
```

Repositorio backend:

```text
https://github.com/xPat95/proyecto1-world-cup-backend.git
```