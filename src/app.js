/*
 * MISIÓN 9 · ADAPTADOR DE INTERFAZ
 *
 * El DOM solo lee eventos, delega las reglas a taskService.js y renderiza
 * resultados. Toda transformación de datos ocurre en funciones probadas.
 */

import {
  crearTarea,
  agregarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "./taskService.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

let tareas = [
  crearTarea(1, "Revisar requisitos"),
  crearTarea(2, "Diseñar pruebas"),
  crearTarea(3, "Refactorizar código")
];
let siguienteId = 4;
let filtro = "todas";

function tareasVisibles() {
  if (filtro === "pendientes") return obtenerPendientes(tareas);
  if (filtro === "terminadas") return obtenerTerminadas(tareas);
  return tareas;
}

function crearElementoTarea(tarea) {
  const li = document.createElement("li");
  li.className = "task";
  li.classList.toggle("done", tarea.completada);

  const etiqueta = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarea.completada;
  checkbox.dataset.toggle = tarea.id;

  // textContent evita que un título con HTML se interprete como marcado.
  const titulo = document.createElement("span");
  titulo.className = "title";
  titulo.textContent = tarea.titulo;
  etiqueta.append(checkbox, " ", titulo);

  const acciones = document.createElement("span");
  acciones.className = "task-actions";
  const eliminar = document.createElement("button");
  eliminar.textContent = "Eliminar";
  eliminar.dataset.delete = tarea.id;
  acciones.append(eliminar);

  li.append(etiqueta, acciones);
  return li;
}

function render() {
  list.replaceChildren(...tareasVisibles().map(crearElementoTarea));

  const resumen = obtenerResumen(tareas);
  summary.textContent = `Total: ${resumen.total} | Pendientes: ${resumen.pendientes} | Terminadas: ${resumen.terminadas}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId++, titulo));
  input.value = "";
  message.textContent = "";
  render();
});

list.addEventListener("click", (event) => {
  const { toggle, delete: eliminar } = event.target.dataset;
  if (toggle !== undefined) {
    tareas = cambiarEstado(tareas, Number(toggle));
    render();
  } else if (eliminar !== undefined) {
    tareas = eliminarTarea(tareas, Number(eliminar));
    render();
  }
});

filters.forEach(button => button.addEventListener("click", () => {
  filtro = button.dataset.filter;
  filters.forEach(b => b.classList.toggle("active", b === button));
  render();
}));

render();
