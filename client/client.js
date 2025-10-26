import { Get, Post, Put, Delete } from "./requisicoes/requisicoes.js";

const screen = document.getElementById("screen");
const context = screen.getContext("2d");
let aceleracao = 0.1;
let friccao = 0.95;
let speedX = 0;
let speedY = 0;
let playerLocal;
let game = {
  players: {},
};

screen.width = window.innerWidth;
screen.height = window.innerHeight;

window.addEventListener("beforeunload", () => {
  Delete(playerLocal.id);
});

await conectar();

context.clearRect(0, 0, screen.width, screen.height);
context.fillStyle = "#000000";
context.fillRect(0, 0, screen.width, screen.height);

async function conectar() {
  let name = prompt("Digite seu nome para conectar:");
  let res = await Post({ name: name });

  while (!res["player"]) {
    name = prompt("Esse nome já existe, tente outro:");
    res = await Post({ name: name });
  }

  playerLocal = res["player"];
}

function desenharJogo() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, screen.width, screen.height);

  for (const playerName in game.players) {
    const player = game.players[playerName];

    context.beginPath();
    if (player.id != playerLocal.id) {
      context.fillStyle = "rgba(255, 255, 255, 0.05)";
    } else {
      context.fillStyle = "yellow";
    }
    context.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}

window.addEventListener("keydown", setSpeed);

function setSpeed(event) {
  const key = event.code;

  if (key == "ArrowUp") speedY -= aceleracao;

  if (key == "ArrowDown") speedY += aceleracao;

  if (key == "ArrowRight") speedX += aceleracao;

  if (key == "ArrowLeft") speedX -= aceleracao;
}

async function movePlayer() {
  speedX *= friccao;
  speedY *= friccao;

  playerLocal.x += speedX;
  playerLocal.y += speedY;

  await Put(playerLocal.id, {
    x: playerLocal.x,
    y: playerLocal.y,
    size: playerLocal.size,
  });
}

requestAnimationFrame(gameLoop);

async function gameLoop() {
  await movePlayer();
  game.players = await Get();
  desenharJogo();
  requestAnimationFrame(gameLoop);
}
