import './style.css'

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const cells = document.querySelectorAll('.cell');

let board = Array(9).fill(null);
let gameActive = true;
const HUMAN = 'X';
const AI = 'O';

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Game
function init() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  resetBtn.addEventListener('click', resetGame);
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  makeMove(index, HUMAN);

  if (gameActive) {
    statusElement.innerText = "Computer is thinking...";
    setTimeout(() => {
      const aiMove = getBestMove();
      makeMove(aiMove, AI);
    }, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = cells[index];
  cell.innerText = player;
  cell.classList.add(player.toLowerCase());

  if (checkWin(board, player)) {
    endGame(player);
  } else if (board.every(cell => cell !== null)) {
    endGame('tie');
  } else {
    statusElement.innerText = player === HUMAN ? "Computer's turn (O)" : "Your turn (X)";
  }
}

function checkWin(currentBoard, player) {
  return winConditions.some(condition => {
    return condition.every(index => currentBoard[index] === player);
  });
}

function getWinningIndices(currentBoard, player) {
  return winConditions.find(condition => {
    return condition.every(index => currentBoard[index] === player);
  });
}

function endGame(result) {
  gameActive = false;
  if (result === 'tie') {
    statusElement.innerText = "It's a tie!";
  } else {
    statusElement.innerText = result === HUMAN ? "You won! 🎉" : "Computer wins!";
    const winningIndices = getWinningIndices(board, result);
    winningIndices.forEach(idx => cells[idx].classList.add('winner'));
  }
}

function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
  statusElement.innerText = "Your turn (X)";
  cells.forEach(cell => {
    cell.innerText = '';
    cell.className = 'cell';
  });
}

// MINIMAX ALGORITHM
function getBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = AI;
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

const scores = { O: 10, X: -10, tie: 0 };

function minimax(currentBoard, depth, isMaximizing) {
  if (checkWin(currentBoard, AI)) return scores.O;
  if (checkWin(currentBoard, HUMAN)) return scores.X;
  if (currentBoard.every(cell => cell !== null)) return scores.tie;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = AI;
        let score = minimax(currentBoard, depth + 1, false);
        currentBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = HUMAN;
        let score = minimax(currentBoard, depth + 1, true);
        currentBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

init();
