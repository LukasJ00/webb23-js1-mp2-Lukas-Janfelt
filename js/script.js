let playerScore = 0;
let computerScore = 0;
let playerName = "";

// Hämta alla Html-element
const playerNameInput = document.getElementById("player-name");
const rockButton = document.getElementById("rockBtn");
const scissorsButton = document.getElementById("scissorsBtn");
const paperButton = document.getElementById("paperBtn");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const restartButton = document.getElementById("restart");
const winnerDisplay = document.getElementById("winner");

// Lyssna på namninput
playerNameInput.addEventListener("input", (event) => {
    playerName = event.target.value;
  });

// Lyssna på knappklick
rockButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("sten");
});
scissorsButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("sax");
});
paperButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("påse");
});

// Lyssna på starta om-knappen
restartButton.addEventListener("click", () => restartGame());

function playGame(playerChoice) {
  const choices = ["sten", "sax", "påse"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Visa spelarens och datorns val
  document.getElementById("choices").innerText = `${playerName}: ${playerChoice} | Dator: ${computerChoice}`;

  // Uppdatera poängen baserat på vinnare
  const winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // Visa poängen
  playerScoreDisplay.innerText = `Spelare: ${playerScore}`;
  computerScoreDisplay.innerText = `Dator: ${computerScore}`;

  // Kolla om någon har vunnit
  if (playerScore === 3) {
    showWinner(playerName);
    setTimeout(() => {
      restartGame();
    }, 3000); 
  } else if (computerScore === 3) {
    showWinner("Dator");
    setTimeout(() => {
      restartGame();
    }, 3000); 
    return;
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === "sten" && computerChoice === "sax") ||
    (playerChoice === "sax" && computerChoice === "påse") ||
    (playerChoice === "påse" && computerChoice === "sten")
  ) {
    return "player";
  } else if (
    (playerChoice === "sax" && computerChoice === "sten") ||
    (playerChoice === "påse" && computerChoice === "sax") ||
    (playerChoice === "sten" && computerChoice === "påse")
  ) {
    return "computer";
  } else {
    return "tie";
  }
}

function showWinner(winnerName) {
  winnerDisplay.innerText = `${winnerName} vann!`;
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  winnerDisplay.innerText = "";
  playerScoreDisplay.innerText = "Spelare: 0";
  computerScoreDisplay.innerText = "Dator: 0";
}
