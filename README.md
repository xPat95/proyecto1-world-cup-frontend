# World Cup Sticker Tracker - Frontend

Interfaz web para el tracker de estampillas del Mundial.

Este repositorio contiene el frontend del proyecto, construido con HTML, CSS y JavaScript vanilla.

## Estado actual

Este commit agrega la estructura visual base de la aplicacion: header, estadisticas, controles, contenedor de estampillas y formulario.

Todavia no hay consumo del backend con `fetch()`, render dinamico ni logica de CRUD en el frontend.

## Logo

El logo del proyecto debe colocarse en:

```text
assets/logo.png
```

## Proximos pasos

Mas adelante este frontend consumira la API REST del backend usando `fetch()`.

No se usa React, Vue, Angular, jQuery, Axios ni dependencias externas.

## Consumo de API

El frontend consume el backend desde:

```text
http://localhost:3000
```

Se usa `fetch()` con JavaScript vanilla. En este commit se consume `GET /stickers` para cargar y renderizar las tarjetas de estampillas.

Para probar, el backend debe estar corriendo y la base de datos debe tener datos iniciales.

Pasos de prueba:

1. Levantar el backend.
2. Ejecutar `schema.sql` y `seed.sql` si hace falta.
3. Abrir el frontend con Live Server.
4. Verificar que las estampillas aparezcan en pantalla.

## Busqueda, filtros y ordenamiento

El frontend envia query params al backend para buscar, filtrar y ordenar estampillas usando `fetch()`.

Desde la interfaz se puede:

- Buscar texto por numero, jugador, pais o posicion.
- Filtrar por estado: todos, faltantes, conseguidas o repetidas.
- Ordenar por numero, jugador, pais o cantidad.
- Cambiar el orden entre ascendente y descendente.

Ejemplos de uso:

- Escribir `messi` en el campo de busqueda.
- Seleccionar `Faltantes` en el filtro de estado.
- Seleccionar `Jugador` y luego cambiar entre `Ascendente` y `Descendente`.
