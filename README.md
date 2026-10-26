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
