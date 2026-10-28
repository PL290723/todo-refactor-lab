/*
 * MISIÓN 0 · CÓDIGO LEGACY PARA ANALIZAR
 *
 * Este ejemplo funciona, pero representa las tareas como strings y mezcla
 * datos con manipulación del DOM. NO lo refactorices todavía: primero explica
 * qué responsabilidades están mezcladas y qué comportamientos deben conservarse.
 */

// MISIÓN 1: cada tarea es un objeto con identidad (id) y estado (completada).
let tareas = [
  { id: 1, titulo: "Revisar requisitos", completada: false },
  { id: 2, titulo: "Diseñar pruebas", completada: false },
  { id: 3, titulo: "Refactorizar código", completada: false }
];

function mostrarTareas() {
  const lista = document.querySelector("#task-list");
  lista.innerHTML = "";

  for (let i = 0; i < tareas.length; i++) {
    lista.innerHTML += `<li>${tareas[i].titulo}</li>`;
  }
}

// mostrarTareas();
