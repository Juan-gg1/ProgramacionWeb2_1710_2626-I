// --- Juego del Gato versión con menú interactivo ---

let tableroGato = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let jugador = "X";
let enCurso = true;

// Mostrar el estado actual del tablero
function dibujarTablero() {
  let vista = `
 ${tableroGato[0]} | ${tableroGato[1]} | ${tableroGato[2]}
-----------
 ${tableroGato[3]} | ${tableroGato[4]} | ${tableroGato[5]}
-----------
 ${tableroGato[6]} | ${tableroGato[7]} | ${tableroGato[8]}
`;
  return vista;
}

// Construir el menú textual
function mostrarMenu() {
  return (
    "=== GATO INTERACTIVO ===\n\n" +
    dibujarTablero() +
    "\nTurno actual: " + jugador + "\n\n" +
    "Seleccione una posición (0–8):\n" +
    "0 | 1 | 2\n" +
    "3 | 4 | 5\n" +
    "6 | 7 | 8\n\n" +
    "9. Reiniciar partida\n" +
    "10. Salir del juego"
  );
}

// Verificar si alguien gana
function hayGanador() {
  const lineas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return lineas.some(([a, b, c]) =>
    tableroGato[a] === jugador && tableroGato[b] === jugador && tableroGato[c] === jugador
  );
}

// Ejecutar una jugada
function colocarFicha(posicion) {
  if (tableroGato[posicion] !== " ") {
    alert("Esa casilla ya está ocupada.");
    return;
  }

  tableroGato[posicion] = jugador;

  if (hayGanador()) {
    alert("🎉 ¡El jugador " + jugador + " ha ganado!");
    enCurso = false;
    return;
  }

  if (tableroGato.every(celda => celda !== " ")) {
    alert("🤝 ¡Empate!");
    enCurso = false;
    return;
  }

  // Cambiar de jugador
  jugador = jugador === "X" ? "O" : "X";
}

// Reiniciar todo el juego
function reiniciarPartida() {
  tableroGato = Array(9).fill(" ");
  jugador = "X";
  enCurso = true;
  alert("El tablero se ha reiniciado. ¡Comienza una nueva partida!");
}

// --- Ejecución principal ---
let eleccion;

do {
  eleccion = prompt(mostrarMenu());
  if (eleccion === null) break;

  eleccion = Number(eleccion);

  if (!enCurso && eleccion !== 9 && eleccion !== 10) {
    alert("El juego ha terminado. Reinicia o sal para continuar.");
    continue;
  }

  switch (eleccion) {
    case 0: case 1: case 2:
    case 3: case 4: case 5:
    case 6: case 7: case 8:
      colocarFicha(eleccion);
      break;
    case 9:
      reiniciarPartida();
      break;
    case 10:
      alert("Gracias por jugar :D");
      break;
    default:
      alert("Opción inválida, intenta nuevamente.");
  }
} while (eleccion !== 10);
