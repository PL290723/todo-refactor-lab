import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

describe("agregarTarea", () => {
  it("agrega una nueva tarea a la colección", () => {
    // Arrange
    const tareas = [];
    const nuevaTarea = { id: 1, titulo: "Aprender Vitest", completada: false };

    // Act
    const resultado = agregarTarea(tareas, nuevaTarea);

    // Assert
    expect(resultado).toContainEqual(nuevaTarea);
  });

  it("devuelve una colección con un elemento más", () => {
    // Arrange
    const tareasIniciales = [{ id: 1, titulo: "Tarea 1", completada: false }];
    const nuevaTarea = { id: 2, titulo: "Tarea 2", completada: false };

    // Act
    const resultado = agregarTarea(tareasIniciales, nuevaTarea);

    // Assert
    expect(resultado.length).toBe(tareasIniciales.length + 1);
  });
});

// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void eliminarTarea;
void obtenerResumen;

describe("cambiarEstado", () => {
  const tareasIniciales = [
    { id: 1, titulo: "Tarea 1", completada: false },
    { id: 2, titulo: "Tarea 2", completada: false }
  ];

  it("cambia el estado de completada de la tarea indicada", () => {
    const resultado = cambiarEstado(tareasIniciales, 1);

    expect(resultado[0].completada).toBe(true);
  });

  it("no altera el estado de las otras tareas", () => {
    const resultado = cambiarEstado(tareasIniciales, 1);

    expect(resultado[1].completada).toBe(false);
    expect(resultado[1]).toEqual(tareasIniciales[1]);
  });

  it("conserva el contenido original si el id es inexistente", () => {
    const resultado = cambiarEstado(tareasIniciales, 99);

    expect(resultado).toEqual(tareasIniciales);
  });
});
