# World Cup Sticker Tracker - Frontend

## Descripcion

Este repositorio contiene la interfaz web de **World Cup Sticker Tracker**, una aplicacion full stack para llevar control de estampillas del Mundial usando codigos de album.

El frontend consume una API REST usando `fetch()` y permite administrar la coleccion desde una interfaz visual: cargar estampillas, buscar, filtrar, ordenar, paginar, crear, editar y eliminar registros.

La app no usa imagenes reales de jugadores ni de estampillas. Cada estampa se representa como un cromo visual con codigo, seleccion o categoria, cantidad y estado.

## Repositorios relacionados

- Backend: https://github.com/xPat95/proyecto1-world-cup-backend.git

## Links del proyecto

- Frontend desplegado: https://xpat95.github.io/proyecto1-world-cup-frontend/
- Backend desplegado: https://proyecto1-world-cup-backend.onrender.com
- Swagger UI del backend: https://proyecto1-world-cup-backend.onrender.com/docs

## Tecnologias usadas

- HTML
- CSS
- JavaScript vanilla
- fetch()
- Live Server para desarrollo local

Este frontend:

- No usa React.
- No usa Vue.
- No usa Angular.
- No usa jQuery.
- No usa Axios.
- No usa dependencias externas.

## Funcionalidades principales

- Visualizacion de estampillas tipo cromo.
- Colores por seleccion o categoria.
- Estados visuales:
  - Faltante.
  - Conseguida.
  - Repetida.
- Busqueda.
- Filtros.
- Ordenamiento.
- Paginacion.
- Estadisticas globales del album.
- Crear estampilla.
- Editar estampilla.
- Eliminar estampilla.
- Enlace al repositorio desde la interfaz.

## Logica de estados

El estado se calcula a partir de `quantity`:

- `quantity = 0` -> Faltante
- `quantity = 1` -> Conseguida
- `quantity > 1` -> Repetida

Una estampilla repetida tambien cuenta como conseguida.

Para estadisticas:

- Faltantes = `quantity = 0`
- Conseguidas = `quantity >= 1`
- Repetidas = `quantity > 1`
- Progreso = `conseguidas / total * 100`

## Estadisticas globales

Las cards superiores muestran estadisticas del album completo, no solo de la pagina visible ni de los filtros actuales.

Las estadisticas se obtienen desde el backend usando:

```http
GET /stickers/stats
```

Significado:

- Total = total de estampillas en la base de datos.
- Conseguidas = estampillas con `quantity >= 1`.
- Faltantes = estampillas con `quantity = 0`.
- Repetidas = estampillas con `quantity > 1`.
- Progreso = conseguidas / total.

## Logica visual de cromos

Cada tarjeta prioriza el codigo de la estampilla como elemento principal.

Ejemplos de codigos:

- `FWC00`
- `FWC19`
- `MEX17`
- `ARG03`
- `BRA20`

Reglas visuales:

- `FWC` usa color dorado.
- Cada seleccion tiene colores propios.
- Las faltantes se muestran en gris.
- Las repetidas usan acento dorado.
- El codigo de estampa es el elemento principal de la card.

## Configuracion de API

La URL base del backend esta configurada en:

```text
js/config.js
```

La version publicada del frontend consume la API publicada del backend:

```text
https://proyecto1-world-cup-backend.onrender.com
```

Para desarrollo local, la URL puede apuntar a:

```text
http://localhost:3000
```

Si se cambia entre entorno local y publicado, se debe actualizar `API_URL` en `js/config.js`.

## Como correr localmente

Primero se debe levantar el backend y tener PostgreSQL con el schema y seed cargados.

Para el frontend, se recomienda usar VS Code con Live Server porque el proyecto usa modulos JavaScript y llamadas `fetch()`.

Pasos:

1. Abrir el repositorio frontend en VS Code.
2. Abrir `index.html`.
3. Click derecho -> `Open with Live Server`.
4. Abrir la URL local indicada por Live Server.

No se recomienda abrir `index.html` directamente desde el sistema de archivos, porque puede causar problemas con modulos JavaScript o llamadas a la API.

## Como probar

En la version publicada:

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
- Cambiar la paginacion.
- Crear una estampilla.
- Editar una estampilla.
- Eliminar una estampilla.
- Verificar que las estadisticas globales no cambien al cambiar de pagina o aplicar filtros.

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
```

## Screenshots

Pendiente de agregar capturas despues de probar la app.

Capturas sugeridas:

- Vista principal.
- Filtro funcionando.
- Formulario de registro.
- Tarjetas tipo cromo.

## Notas de entrega

El frontend esta publicado en linea y consume el backend desplegado en Render.

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
