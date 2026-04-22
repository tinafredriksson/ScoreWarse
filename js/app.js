// As a player I want to

// Variabler
let score = 0;
let timeleft = 60; // Ändra till 60 sek senare
let gameStarted = false;
let gameEnded = false;
let interval = null;

// HTML DOM
const box = document.getElementById("clickBox");
const scoreDisplay = document.getElementById("scoreDisplay");
const button2 = document.getElementById("button2");
const timerDisplay = document.getElementById("timerDisplay");
const input1 = document.getElementById("name");
const finalScore = document.getElementById("finalScore");
const message = document.getElementById("message");
const gameOverPanel = document.getElementById("gameOverPanel");
const restartButton = document.getElementById("restartButton");
const fakeBoxes = document.querySelectorAll(".fakeBox");
// Dölj game over-panelen från början
gameOverPanel.style.display = "none";

// Event listeners
 box.addEventListener("click", () => {
    if (!gameStarted) {
      startGame();
    }

    if (!gameEnded) {
      increaseScore();
      moveBoxRandomly();
      moveFakeBoxes();
    }
  });

button2.addEventListener("click", () => {
  submitHighScore();
});

restartButton.addEventListener("click", () => {
  location.reload();
});

// Funktioner
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function countdown() {
  timeleft--;
  timerDisplay.innerText = timeleft;

  if (timeleft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}
function startGame() {
  interval = setInterval(countdown, 1000);
  gameStarted = true;
  moveBoxRandomly();
  moveFakeBoxes();
}

function moveBoxRandomly() {
  const gameArea = document.getElementById("gameArea");
  const maxX = gameArea.clientWidth - box.offsetWidth;
  const maxY = gameArea.clientHeight - box.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  box.style.left = randomX + "px";
  box.style.top = randomY + "px";
}

function endGame() {
  if (gameEnded) return;

  gameEnded = true;
  clearInterval(interval);
  finalScore.innerText = "Game over! Final score: " + score;
  box.style.display = "none";
  gameOverPanel.style.display = "block";
}

async function submitHighScore() {
  const playerName = input1.value.trim();

  if (playerName === "") {
    message.innerText = "Please enter your name.";
    return;
  }

  try {
    await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name: playerName,
        score: score
      })
    });

    message.innerText = "Score saved successfully!";
  } catch (error) {
    message.innerText = "Network error.";
    console.error(error);
  }
}
function moveFakeBoxes() {
  const gameArea = document.getElementById("gameArea");

  fakeBoxes.forEach((fakeBox) => {
    const maxX = gameArea.clientWidth - fakeBox.offsetWidth;
    const maxY = gameArea.clientHeight - fakeBox.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    fakeBox.style.left = randomX + "px";
    fakeBox.style.top = randomY + "px";
  });
}
