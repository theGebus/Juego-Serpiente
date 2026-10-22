// Capturamos el canvas y su contexto de dibujo.
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

// Primera pintura del juego al cargar la página.
dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
}

function dibujarTablero() {
  ctx.strokeStyle = "#57D9AD";
  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.lineTo(25, canvas.height);
  ctx.stroke();
}
