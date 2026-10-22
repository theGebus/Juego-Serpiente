// Capturamos el canvas y su contexto de dibujo.
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

const serpiente = [
  {x: 0, y: 15},
  {x: 0, y: 16},
  {x: 0, y: 17},
  {x: 0, y: 18},
  {x: 0, y: 19}
];

let intervaloSerpiente = null;
let direccionActual = "derecha";
let comida = null;

// Primera pintura del juego al cargar la página.
dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

function dibujarTablero() {
  ctx.strokeStyle = "#57D9AD";

  // Líneas verticales: recorren todo el alto del canvas.
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Líneas horizontales: recorren todo el ancho del canvas.
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#F5F5F5";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "#FFD54F";
    } else {
      ctx.fillStyle = "#57D9AD";
    }
    pintarParte(serpiente[i].x, serpiente[i].y);
  }
}

function moverDerecha() {
  const cabeza = serpiente[0];
  const nuevaCabeza = {x: cabeza.x + (1), y: cabeza.y + (0)};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(direccion) {
  if (direccion === "derecha" || direccion === "izquierda" ||
      direccion === "arriba" || direccion === "abajo") {
    direccionActual = direccion;
  }
}

function moverIzquierda() {
  const cabeza = serpiente[0];
  const nuevaCabeza = {x: cabeza.x + (-1), y: cabeza.y + (0)};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  const cabeza = serpiente[0];
  const nuevaCabeza = {x: cabeza.x + (0), y: cabeza.y + (-1)};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  const cabeza = serpiente[0];
  const nuevaCabeza = {x: cabeza.x + (0), y: cabeza.y + (1)};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function iniciarJuego() {
  if (intervaloSerpiente !== null) {
    return;
  }
  intervaloSerpiente = setInterval(moverSerpiente, 1000);
  document.getElementById("estado").textContent = "Jugando";
  document.getElementById("mensaje").textContent = "Usa los botones para cambiar de dirección.";
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  document.getElementById("estado").textContent = "Pausado";
  document.getElementById("mensaje").textContent = "Presiona Iniciar para continuar.";
}

function moverSerpiente() {
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }
  dibujarTodo();
}

function pintarComida() {
  if (comida === null) {
    const columnas = canvas.width / TAMANIO_CELDA;
    const filas = canvas.height / TAMANIO_CELDA;
    const posicionesLibres = [];
    for (let y = 0; y < filas; y++) {
      for (let x = 0; x < columnas; x++) {
        let ocupada = false;
        for (let i = 0; i < serpiente.length; i++) {
          if (serpiente[i].x === x && serpiente[i].y === y) {
            ocupada = true;
            break;
          }
        }
        if (!ocupada) {
          posicionesLibres.push({x: x, y: y});
        }
      }
    }
    if (posicionesLibres.length === 0) {
      pausarJuego();
      document.getElementById("estado").textContent = "Tablero completo";
      return;
    }
    let posicionValida = false;
    while (!posicionValida) {
      const x = Math.floor(Math.random() * columnas);
      const y = Math.floor(Math.random() * filas);
      for (let i = 0; i < posicionesLibres.length; i++) {
        if (posicionesLibres[i].x === x && posicionesLibres[i].y === y) {
          comida = {x: x, y: y};
          posicionValida = true;
          break;
        }
      }
    }
  }
  ctx.fillStyle = "#FF6B6B";
  pintarParte(comida.x, comida.y);
}

function atrapaComida() {
  return comida !== null &&
    serpiente[0].x === comida.x && serpiente[0].y === comida.y;
}
