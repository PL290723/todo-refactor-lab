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

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

let tareas = [
  crearTarea(1, "Revisar requisitos"),
  crearTarea(2, "Diseñar pruebas"),
  crearTarea(3, "Refactorizar código")
];
let siguienteId = 4;
let filtroActivo = "todas";

function obtenerTareasVisibles() {
  if (filtroActivo === "pendientes") return obtenerPendientes(tareas);
  if (filtroActivo === "terminadas") return obtenerTerminadas(tareas);
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

function renderTareas() {
  taskList.replaceChildren(...obtenerTareasVisibles().map(crearElementoTarea));
}

function renderResumen() {
  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  summary.textContent = `Total: ${total} | Pendientes: ${pendientes} | Terminadas: ${terminadas}`;
}

function render() {
  renderTareas();
  renderResumen();
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const titulo = taskInput.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId++, titulo));
  taskInput.value = "";
  message.textContent = "";
  render();
});

taskList.addEventListener("click", event => {
  const { toggle, delete: idTareaEliminar } = event.target.dataset;
  if (toggle !== undefined) {
    tareas = cambiarEstado(tareas, Number(toggle));
    render();
  } else if (idTareaEliminar !== undefined) {
    tareas = eliminarTarea(tareas, Number(idTareaEliminar));
    render();
  }
});

filterButtons.forEach(button => button.addEventListener("click", () => {
  filtroActivo = button.dataset.filter;
  filterButtons.forEach(filterButton => filterButton.classList.toggle("active", filterButton === button));
  render();
}));

render();
