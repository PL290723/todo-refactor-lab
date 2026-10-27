/*
 * TODO REFACTOR LAB · LÓGICA DE DOMINIO
 *
 * Completa estas funciones misión por misión. Favorece funciones que reciben
 * datos y devuelven datos, sin acceder al DOM. Ejecuta la suite después de
 * cada cambio.
 */

// MISIÓN 2
export function crearTarea(id, titulo, prioridad = "baja") {
  return {
    id,
    titulo,
    completada: false,
    prioridad
  };
}

// MISIÓN 3
export function agregarTarea(tareas, nuevaTarea) {
  return [...tareas, nuevaTarea];
}

// MISIÓN 4
export function buscarTarea(tareas, id) {
  return tareas.find(tarea => tarea.id === id);
}

// MISIÓN 5
export function obtenerPendientes(tareas) {
  return tareas.filter(tarea => !tarea.completada);
}

export function obtenerTerminadas(tareas) {
  return tareas.filter(tarea => tarea.completada);
}

// MISIÓN 6
export function cambiarEstado(tareas, id) {
  return tareas.map(tarea =>
    tarea.id === id
      ? { ...tarea, completada: !tarea.completada }
      : tarea
  );
}

// MISIÓN 7
export function eliminarTarea(tareas, id) {
  return tareas.filter(tarea => tarea.id !== id);
}

// MISIÓN 8
export function obtenerResumen(tareas) {
  return {
    total: tareas.length,
    pendientes: obtenerPendientes(tareas).length,
    terminadas: obtenerTerminadas(tareas).length
  };
}

// MISIÓN 11 · A) Prioridad
export function filtrarPorPrioridad(tareas, prioridad) {
  return tareas.filter(tarea => tarea.prioridad === prioridad);
}

// MISIÓN 11 · B) Buscar por texto (ignorando mayúsculas y minúsculas)
export function buscarPorTexto(tareas, texto) {
  const busqueda = texto.toLowerCase();
  return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(busqueda));
}

// MISIÓN 11 · C) Porcentaje de avance
export function calcularAvance(tareas) {
  if (tareas.length === 0) return 0;
  return Math.round((obtenerTerminadas(tareas).length / tareas.length) * 100);
}

// MISIÓN 11 · D) Evitar duplicados (normalizado)
function normalizarTitulo(titulo) {
  return titulo.trim().toLowerCase();
}

export function esTituloDuplicado(tareas, nuevoTitulo) {
  const tituloNormalizado = normalizarTitulo(nuevoTitulo);
  return tareas.some(tarea => normalizarTitulo(tarea.titulo) === tituloNormalizado);
}
