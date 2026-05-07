# World Cup Sticker Tracker - Frontend

Interfaz web para el tracker de estampillas del Mundial.

Este repositorio contiene el frontend del proyecto, construido con HTML, CSS y JavaScript vanilla.

## Estado actual

El frontend ya consume la API del backend con `fetch()`, renderiza tarjetas de estampillas y permite buscar, filtrar, ordenar, paginar, crear, editar y eliminar registros.

El diseño visual fue actualizado para priorizar codigos de estampilla, con cromos por seleccion, estados visuales para faltantes, conseguidas y repetidas, y colores inspirados en las selecciones del Mundial.

## Logo

El logo del proyecto debe colocarse en:

```text
assets/logo.png
```

## Proximos pasos

No se usa React, Vue, Angular, jQuery, Axios ni dependencias externas.

## Ejecucion local

Puedes abrir `index.html` directamente en el navegador o usar Live Server en VS Code.

## Consumo de API

El frontend consume el backend desde:

```text
http://localhost:3000
```

Se usa `fetch()` con JavaScript vanilla para cargar, crear, editar y eliminar estampillas.

Para probar, el backend debe estar corriendo y la base de datos debe tener datos iniciales.

Pasos de prueba:

1. Levantar el backend.
2. Ejecutar `schema.sql` y `seed.sql` si hace falta.
3. Abrir el frontend con Live Server.
4. Verificar que las estampillas aparezcan en pantalla.

## Busqueda, filtros y ordenamiento

El frontend envia query params al backend para buscar, filtrar y ordenar estampillas usando `fetch()`.

Desde la interfaz se puede:

- Buscar texto por numero, referencia, pais o tipo.
- Filtrar por estado: todos, faltantes, conseguidas o repetidas.
- Ordenar por numero, referencia, pais o cantidad.
- Cambiar el orden entre ascendente y descendente.

El filtro `Conseguidas` envia `status=owned` al backend e incluye estampillas con `quantity >= 1`, por lo que tambien muestra las repetidas.

Ejemplos de uso:

- Escribir `messi` en el campo de busqueda.
- Seleccionar `Faltantes` en el filtro de estado.
- Seleccionar `Referencia` y luego cambiar entre `Ascendente` y `Descendente`.

## Paginacion

El frontend envia `page` y `limit` al backend para controlar la paginacion de estampillas.

El usuario puede cambiar la cantidad de estampillas por pagina usando el selector de limite.

Los botones `Anterior` y `Siguiente` actualizan la pagina actual y cargan los nuevos resultados usando `fetch()`.

Cuando cambia la busqueda o el filtro de estado, la pagina vuelve a `1`.

## Estadisticas globales

Las tarjetas superiores muestran estadisticas globales del album completo usando `GET /stickers/stats`.

La paginacion, busqueda y filtros solo afectan las tarjetas visibles en el grid.

Las repetidas tambien cuentan como conseguidas:

- Conseguidas: `quantity >= 1`
- Faltantes: `quantity = 0`
- Repetidas: `quantity > 1`

## Crear estampillas

El formulario de registro envia datos al backend usando `POST /stickers`.

El frontend aplica validaciones basicas antes de enviar:

- Numero de estampilla obligatorio.
- Nombre o referencia obligatorio.
- Pais o seleccion obligatorio.
- Cantidad como numero entero mayor o igual a `0`.

El campo `Nombre / referencia` se mantiene para describir la estampilla sin enfocarse en jugadores reales. Por ejemplo, puede usarse `Estampilla FWC 02`, `Estampilla ARG 01` o una descripcion breve del cromo.

El backend tambien valida los datos recibidos. Cuando una estampilla se guarda correctamente, el formulario se limpia y la lista se recarga para mostrar el nuevo registro.

## Editar y eliminar estampillas

Cada tarjeta de estampilla tiene acciones para editar y eliminar.

Al editar, el formulario se rellena con la informacion actual de la estampilla seleccionada y cambia a modo edicion.

Al eliminar, la interfaz pide confirmacion antes de borrar el registro.

Estas acciones usan `PUT /stickers/:id` y `DELETE /stickers/:id` con `fetch()`.

## Repositorio

La interfaz incluye un enlace visible al repositorio del frontend en el footer.
