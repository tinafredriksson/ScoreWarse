//As a player I want to

// Click a button or object to earn points so that I can increase my score.
// See my current score during the game so that I know how well I am doing.
// See a countdown timer so that I know how much time is left.
// Have the game to end automatically when the time is over (60s) so that the rules are clear and fair.
// See my final score when the game ends so that I know my result.
// Enter my name so that my result can be connected to me
// Submit my score so that it can be saved to the shared scoreboard.
// Get a message that tells me if my score was saved successfully or not so that I understand what happened.
// Code is readable and has no major bugs.

// TODO: implementera en box som är klickbar

// Variabler
let score = 0;
let timeleft = 3; // Ändra till 60 sek
let gameStarted = false;
let gameEnded = false;
let interval = null;

// HTML DOM
const box = document.getElementById("clickBox");
const scoreDisplay = document.getElementById("scoreDisplay");
const button2 = document.getElementById("button2");
const timerDisplay = document.getElementById("timerDisplay");
const label1 = document.getElementById("label1");
const input1 = document.getElementById("name");
const finalScore = document.getElementById("finalScore");
const message = document.getElementById("message");

// Event listeners
box.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  }

  if (!gameEnded) {
    increaseScore();
  }
});

button2.addEventListener("click", () => {
  submitHighScore();
});

// döljer elementen
input1.style.display = "none";
label1.style.display = "none";
button2.style.display = "none";

// Function
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
}

function endGame() {
  if (gameEnded) return;

  gameEnded = true;
  clearInterval(interval);
  finalScore.innerText = "Game over! Final score: " + score;
  input1.style.display = "block";
  label1.style.display = "block";
  box.style.display = "none";
  button2.style.display = "block";
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

