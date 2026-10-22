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

// Primera pintura del juego al cargar la página.
dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
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

  ctx.fillStyle = "#57D9AD";
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#F5F5F5";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    pintarParte(serpiente[i].x, serpiente[i].y);
  }
}
