const statusDisplay = document.querySelector("#status");
const cells = document.querySelectorAll("[data-cell]");
const guestSignInButton = document.getElementById("guestSignIn");
const playAgainButton = document.getElementById("playAgain");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const difficultyButtons = document.querySelector(".difficulty-buttons");

let currentPlayer = "X";
let gameActive = false;
let board = Array(9).fill("");
let difficulty = "easy"; // Default difficulty
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle user click on a cell
const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== "" || !gameActive) return;

  // Place X for the human
  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkResult()) return;

  currentPlayer = "O"; // Computer plays as "O"
  statusDisplay.textContent = "Computer's Turn";
  setTimeout(computerMove, 500); // Simulate computer's delay
};

// Computer randomly picks an empty cell (Easy level)
const computerMoveEasy = () => {
  let availableCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((cell) => cell !== null);

  if (availableCells.length === 0) return;

  let randomIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];

  board[randomIndex] = currentPlayer;
  cells[randomIndex].textContent = currentPlayer;

  if (checkResult()) return;

  currentPlayer = "X";
  statusDisplay.textContent = "Your Turn";
};

// Computer plays with some strategy (Medium level)
const computerMoveMedium = () => {
  // Check for a winning move or block a losing move
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === "") {
      board[c] = currentPlayer;
      cells[c].textContent = currentPlayer;
      if (checkResult()) return;
      currentPlayer = "X";
      statusDisplay.textContent = "Your Turn";
      return;
    }
    if (board[a] === currentPlayer && board[c] === currentPlayer && board[b] === "") {
      board[b] = currentPlayer;
      cells[b].textContent = currentPlayer;
      if (checkResult()) return;
      currentPlayer = "X";
      statusDisplay.textContent = "Your Turn";
      return;
    }
    if (board[b] === currentPlayer && board[c] === currentPlayer && board[a] === "") {
      board[a] = currentPlayer;
      cells[a].textContent = currentPlayer;
      if (checkResult()) return;
      currentPlayer = "X";
      statusDisplay.textContent = "Your Turn";
      return;
    }
  }

  // Default to random move if no strategic move found
  computerMoveEasy();
};

// Computer plays optimally (Hard level)
const computerMoveHard = () => {
  // Implement a simple AI strategy (e.g., minimax algorithm)
  // For simplicity, here we'll use a basic approach
  let availableCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((cell) => cell !== null);

  if (availableCells.length === 0) return;

  // Implement a basic AI that prefers corners and center
  const preferredMoves = [0, 2, 6, 8, 4];
  for (let move of preferredMoves) {
    if (availableCells.includes(move)) {
      board[move] = currentPlayer;
      cells[move].textContent = currentPlayer;
      if (checkResult()) return;
