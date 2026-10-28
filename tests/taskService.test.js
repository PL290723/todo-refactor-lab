import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen,
  filtrarPorPrioridad,
  buscarPorTexto,
  calcularAvance,
  esTituloDuplicado
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
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false, prioridad: "baja" });
  });

  it("asigna la prioridad indicada como tercer parámetro", () => {
    // Act
    const tarea = crearTarea(11, "Preparar demo", "alta");

    // Assert
    expect(tarea.prioridad).toBe("alta");
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

describe("buscarTarea", () => {
  it("encuentra y devuelve la tarea con un id existente", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Diseñar pruebas", completada: false },
      { id: 2, titulo: "Refactorizar", completada: true }
    ];

    // Act
    const resultado = buscarTarea(tareas, 2);

    // Assert
    expect(resultado).toEqual({ id: 2, titulo: "Refactorizar", completada: true });
  });

  it("devuelve undefined si el id no existe", () => {
    // Arrange
    const tareas = [{ id: 1, titulo: "Diseñar pruebas", completada: false }];

    // Act
    const resultado = buscarTarea(tareas, 99);

    // Assert
    expect(resultado).toBeUndefined();
  });
});

describe("obtenerPendientes y obtenerTerminadas", () => {
  const tareasMixtas = [
    { id: 1, titulo: "Tarea 1", completada: false },
    { id: 2, titulo: "Tarea 2", completada: true },
    { id: 3, titulo: "Tarea 3", completada: false }
  ];

  it("filtra correctamente las tareas pendientes en una colección mixta", () => {
    // Act
    const pendientes = obtenerPendientes(tareasMixtas);

    // Assert
    expect(pendientes.length).toBe(2);
    expect(pendientes[0].id).toBe(1);
    expect(pendientes[1].id).toBe(3);
  });

  it("devuelve un arreglo vacío si no hay coincidencias (ninguna pendiente)", () => {
    // Arrange
    const todasTerminadas = [{ id: 1, titulo: "Tarea 1", completada: true }];

    // Act
    const pendientes = obtenerPendientes(todasTerminadas);

    // Assert
    expect(pendientes).toEqual([]);
  });

  it("devuelve un arreglo vacío si la colección inicial está vacía", () => {
    // Act
    const pendientes = obtenerPendientes([]);

    // Assert
    expect(pendientes).toEqual([]);
  });

  it("filtra correctamente las tareas terminadas", () => {
    // Act
    const terminadas = obtenerTerminadas(tareasMixtas);

    // Assert
    expect(terminadas.length).toBe(1);
    expect(terminadas[0].id).toBe(2);
  });
});

// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.

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

describe("eliminarTarea", () => {
  const tareasIniciales = [
    { id: 1, titulo: "Tarea 1", completada: false },
    { id: 2, titulo: "Tarea 2", completada: true }
  ];

  it("elimina una tarea con un id existente", () => {
    // Act
    const resultado = eliminarTarea(tareasIniciales, 1);

    // Assert
    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(2);
  });

  it("conserva la colección intacta si el id es inexistente", () => {
    // Act
    const resultado = eliminarTarea(tareasIniciales, 99);

    // Assert
    expect(resultado).toEqual(tareasIniciales);
  });

  it("devuelve un arreglo vacío si la colección inicial está vacía", () => {
    // Act
    const resultado = eliminarTarea([], 1);

    // Assert
    expect(resultado).toEqual([]);
  });
});

describe("obtenerResumen", () => {
  it("devuelve el conteo correcto de total, pendientes y terminadas", () => {
    const tareas = [
      { id: 1, titulo: "Tarea 1", completada: false },
      { id: 2, titulo: "Tarea 2", completada: true },
      { id: 3, titulo: "Tarea 3", completada: false }
    ];

    const resultado = obtenerResumen(tareas);

    expect(resultado).toEqual({
      total: 3,
      pendientes: 2,
      terminadas: 1
    });
  });

  it("devuelve ceros si la colección está vacía", () => {
    const resultado = obtenerResumen([]);

    expect(resultado).toEqual({
      total: 0,
      pendientes: 0,
      terminadas: 0
    });
  });
});

// MISIÓN 11 · Nuevo requerimiento

// --- A) Prioridad ---
describe("filtrarPorPrioridad", () => {
  it("filtra tareas por prioridad específica (baja/media/alta)", () => {
    const tareas = [
      { id: 1, titulo: "T1", prioridad: "alta" },
      { id: 2, titulo: "T2", prioridad: "baja" }
    ];

    const resultado = filtrarPorPrioridad(tareas, "alta");

    expect(resultado.length).toBe(1);
    expect(resultado[0].titulo).toBe("T1");
  });
});

// --- B) Buscar por texto ---
describe("buscarPorTexto", () => {
  it("encuentra tareas ignorando mayúsculas y minúsculas", () => {
    const tareas = [{ id: 1, titulo: "Comprar LECHE" }, { id: 2, titulo: "Lavar auto" }];

    const resultado = buscarPorTexto(tareas, "leche");

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(1);
  });
});

// --- C) Porcentaje de avance ---
describe("calcularAvance", () => {
  it("calcula el porcentaje correcto de tareas terminadas", () => {
    const tareas = [
      { id: 1, completada: true },
      { id: 2, completada: true },
      { id: 3, completada: false },
      { id: 4, completada: false }
    ];

    expect(calcularAvance(tareas)).toBe(50);
  });

  it("devuelve 0 si la colección está vacía", () => {
    expect(calcularAvance([])).toBe(0);
  });
});

// --- D) Evitar duplicados ---
describe("esTituloDuplicado", () => {
  it("detecta títulos duplicados normalizando espacios y mayúsculas", () => {
    const tareas = [{ id: 1, titulo: "Aprender Vitest" }];

    expect(esTituloDuplicado(tareas, " aprender vitest ")).toBe(true);
    expect(esTituloDuplicado(tareas, "aprender react")).toBe(false);
  });
});
