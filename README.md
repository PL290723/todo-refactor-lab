# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

### Análisis del código base (`src/legacy.js`)

1. **¿Dónde almacenarías ahora el estado `completada` de una tarea?**  
   En cada tarea, como una propiedad booleana (por ejemplo, `completada: false`) dentro de un objeto de tarea. Así, el estado pertenece a los datos de esa tarea.
2. **¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?**  
   Con tareas representadas como objetos se pueden agregar esas propiedades sin cambiar la estructura fundamental. Si fueran strings, habría que reemplazar ese formato y adaptar el código que las recorre y muestra.
3. **¿Qué parte del código representa datos y qué parte representa interfaz?**  
   `tareas` y sus textos representan los datos. `mostrarTareas()` representa la interfaz: busca `#task-list` y actualiza su contenido con `innerHTML`. Actualmente ambas responsabilidades están mezcladas en el mismo archivo.
4. **¿Qué comportamiento debemos conservar durante el refactor?**  
   La lista debe mostrar las mismas tareas, en el mismo orden y dentro del elemento `#task-list`, usando un elemento `<li>` para cada tarea. Volver a mostrar la lista debe reemplazar el contenido anterior, no duplicar las tareas.

### Tres comportamientos observables que NO deben cambiar

1. Se muestran las tres tareas iniciales: “Revisar requisitos”, “Diseñar pruebas” y “Refactorizar código”, en ese orden.
2. Cada tarea se representa como un elemento `<li>` dentro de `#task-list`.
3. Cada llamada a mostrar la lista limpia y vuelve a generar su contenido; las llamadas repetidas no acumulan elementos duplicados.

## Misión 1 · Cambiar el modelo: de string a objeto

**Objetivo:** evolucionar la representación de una tarea para que pueda incorporar identidad y estado.

La colección inicial dejó de ser un arreglo de strings y ahora es un arreglo de objetos. Cada tarea tiene este formato:

```js
const tarea = {
  id: 1,
  titulo: "Diseñar pruebas",
  completada: false
};
```

### Cambios realizados

- `src/legacy.js`: `tareas` ahora es un arreglo de objetos `{ id, titulo, completada }` y `mostrarTareas()` muestra `tarea.titulo`.
- `src/app.js`: la colección inicial usa el mismo formato; `render()` muestra `tarea.titulo` y cada tarea nueva se agrega como objeto con un `id` incremental y `completada: false`.

### Comportamiento conservado

- Se siguen mostrando las mismas tres tareas, en el mismo orden, como elementos `<li>` dentro de `#task-list`.
- Volver a renderizar la lista reemplaza su contenido sin duplicar tareas.

## Misión 2 · Crear una tarea con una función pura

**Objetivo:** encapsular la construcción de una tarea en una función de dominio que se pueda probar sin el DOM.

Se implementó `crearTarea(id, titulo)` en `src/taskService.js`. Devuelve un objeto con el formato definido en la Misión 1 y con `completada: false` por defecto:

```js
export function crearTarea(id, titulo) {
  return {
    id: id,
    titulo: titulo,
    completada: false
  };
}
```

### Prueba (`tests/taskService.test.js`)

- **"crea una tarea pendiente con id y título":** `crearTarea(10, "Diseñar pruebas")` debe ser igual (`toEqual`) a `{ id: 10, titulo: "Diseñar pruebas", completada: false }`.

### Ciclo RED → GREEN

- **RED:** la prueba fallaba porque `crearTarea()` lanzaba `Error("Misión 2 pendiente: implementar crearTarea()")`.
- **GREEN:** se reemplazó el `throw` por el `return` del objeto `{ id, titulo, completada: false }`.

## Misión 3 · Agregar sin acoplarse al DOM

**Objetivo:** separar la transformación de datos de la representación visual.

Se implementó `agregarTarea(tareas, nuevaTarea)` en `src/taskService.js`. La función devuelve una **nueva** colección con la tarea agregada al final, sin modificar el arreglo original y sin tocar el DOM:

```js
export function agregarTarea(tareas, nuevaTarea) {
  return [...tareas, nuevaTarea];
}
```

### Pruebas agregadas (`tests/taskService.test.js`)

- **"agrega una nueva tarea a la colección":** a partir de una colección vacía, el resultado contiene `nuevaTarea` (`toContainEqual`).
- **"devuelve una colección con un elemento más":** a partir de una colección con una tarea, el resultado tiene `tareasIniciales.length + 1` elementos.

### Ciclo RED → GREEN

- **RED:** se escribieron las dos pruebas; fallaron porque `agregarTarea()` lanzaba `Error("Misión 3 pendiente: implementar agregarTarea()")`.
- **GREEN:** se reemplazó el `throw` por `return [...tareas, nuevaTarea];`. El operador spread crea un arreglo nuevo, por lo que `tareas` no se modifica (a diferencia de `push()`).

## Misión 4 · find(): buscar una tarea por id

**Objetivo:** localizar una tarea por su identidad sin recorrer la colección manualmente.

Se implementó `buscarTarea(tareas, id)` en `src/taskService.js` usando `find()`. Devuelve la primera tarea cuyo `id` coincide, o `undefined` si no existe:

```js
export function buscarTarea(tareas, id) {
  return tareas.find(tarea => tarea.id === id);
}
```

### Pruebas (`tests/taskService.test.js`)

- **"encuentra y devuelve la tarea con un id existente":** buscar el id `2` devuelve `{ id: 2, titulo: "Refactorizar", completada: true }`.
- **"devuelve undefined si el id no existe":** buscar el id `99` devuelve `undefined`.

### Ciclo RED → GREEN

- **RED:** las pruebas fallaban porque `buscarTarea()` lanzaba `Error("Misión 4 pendiente: implementar buscarTarea()")`.
- **GREEN:** se reemplazó el `throw` por `return tareas.find(tarea => tarea.id === id);`.

## Misión 5 · filter(): seleccionar subconjuntos

**Objetivo:** construir subconjuntos de tareas sin alterar la colección original.

Se implementaron `obtenerPendientes(tareas)` y `obtenerTerminadas(tareas)` en `src/taskService.js` usando `filter()`, que siempre devuelve un arreglo **nuevo** y no modifica el original:

```js
export function obtenerPendientes(tareas) {
  return tareas.filter(t => !t.completada);
}

export function obtenerTerminadas(tareas) {
  return tareas.filter(t => t.completada);
}
```

### Pruebas (`tests/taskService.test.js`)

Sobre una colección mixta (ids `1` y `3` pendientes, id `2` terminada):

- **"filtra correctamente las tareas pendientes en una colección mixta":** devuelve 2 tareas, con ids `1` y `3` en ese orden.
- **"devuelve un arreglo vacío si no hay coincidencias (ninguna pendiente)":** si todas están terminadas, devuelve `[]`.
- **"devuelve un arreglo vacío si la colección inicial está vacía":** `obtenerPendientes([])` devuelve `[]`.
- **"filtra correctamente las tareas terminadas":** devuelve 1 tarea, con id `2`.

### Ciclo RED → GREEN

- **RED:** las 4 pruebas fallaron porque ambas funciones lanzaban `Error("Misión 5 pendiente: ...")`.
- **GREEN:** se reemplazaron los `throw` por `tareas.filter(...)` con la condición `!t.completada` (pendientes) y `t.completada` (terminadas).

## Misión 8 · Resumen y composición

**Objetivo:** resumir el estado de una colección reutilizando las reglas ya implementadas.

Se implementó `obtenerResumen(tareas)` en `src/taskService.js`. Devuelve el total de tareas y los conteos de pendientes y terminadas, usando `obtenerPendientes()` y `obtenerTerminadas()`:

```js
export function obtenerResumen(tareas) {
  return {
    total: tareas.length,
    pendientes: obtenerPendientes(tareas).length,
    terminadas: obtenerTerminadas(tareas).length
  };
}
```

### Pruebas (`tests/taskService.test.js`)

- **"devuelve el conteo correcto de total, pendientes y terminadas":** verifica el resumen de una colección mixta de tres tareas.
- **"devuelve ceros si la colección está vacía":** verifica que una colección vacía produzca `{ total: 0, pendientes: 0, terminadas: 0 }`.

## Misión 10 · Refactor final protegido por pruebas

**Objetivo:** mejorar la legibilidad y la separación de responsabilidades sin cambiar el comportamiento.

### Refactors realizados

- `src/taskService.js`: se usó la forma abreviada de propiedades al crear una tarea y se reemplazaron los parámetros `t` por `tarea` en los filtros para expresar mejor su intención.
- `src/app.js`: se renombraron referencias del DOM y del filtro con nombres más descriptivos. La actualización de la lista y del resumen se separó en `renderTareas()` y `renderResumen()`, coordinadas por `render()`.
- La lógica de dominio continúa en `taskService.js`; `app.js` conserva la responsabilidad de conectar eventos del DOM y mostrar los resultados.

### Verificación

Se ejecutó `npm test` después de cada refactor. Las 17 pruebas pasaron en ambas ejecuciones.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

- **RED:** ¿qué prueba escribiste y por qué falló?
- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

## Pair Programming

Registra por misión quién fue **Driver** y quién **Navigator**. Intercambien roles con frecuencia y no hagan commit hasta que ambos puedan explicar el código y la prueba.

| Misión | Navigator | Driver |
|---|---|---|
| Misión 0 | Paulo | Jairo |
| Misión 1 | Jairo | Paulo |
| Misión 2 | Paulo | Jairo |
| Misión 3 | Jairo | Paulo |
| Misión 4 | Paulo | Jairo |
| Misión 5 | Jairo | Paulo |
| Misión 6 | Paulo | Jairo |
| Misión 7 | Jairo | Paulo |
| Misión 8 | Paulo | Jairo |
| Misión 9 | Jairo | Paulo |
