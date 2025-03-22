// Game logic utilities for Tic Tac Toe

// Check if there's a winner
export const checkWinner = (board: (string | null)[]): string | null => {
  // Winning combinations: rows, columns, and diagonals
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

// Check if the game is a draw
export const checkDraw = (board: (string | null)[]): boolean => {
  return board.every((cell) => cell !== null);
};

// Get available moves (empty cells)
export const getAvailableMoves = (board: (string | null)[]): number[] => {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
};

// Simple AI for computer player (random move)
export const getComputerMove = (board: (string | null)[]): number => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return -1;
  }
  
  // Choose a random available move
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

// More advanced AI using minimax algorithm (optional enhancement)
export const getBestMove = (
  board: (string | null)[],
  computerPlayer: string
): number => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return -1;
  }
  
  // If only one move is available, return it
  if (availableMoves.length === 1) {
    return availableMoves[0];
  }
  
  // For the first move, choose a random corner or center
  if (availableMoves.length >= 8) {
    const firstMoves = [0, 2, 4, 6, 8];
    const validFirstMoves = firstMoves.filter(move => board[move] === null);
    const randomIndex = Math.floor(Math.random() * validFirstMoves.length);
    return validFirstMoves[randomIndex];
  }
  
  // Otherwise, use a simple strategy
  // 1. Check if computer can win in the next move
  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = computerPlayer;
    if (checkWinner(newBoard) === computerPlayer) {
      return move;
    }
  }
  
  // 2. Check if player can win in the next move and block
  const humanPlayer = computerPlayer === 'X' ? 'O' : 'X';
  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = humanPlayer;
    if (checkWinner(newBoard) === humanPlayer) {
      return move;
    }
  }
  
  // 3. Try to take the center if available
  if (board[4] === null) {
    return 4;
  }
  
  // 4. Try to take a corner
  const corners = [0, 2, 6, 8].filter(corner => board[corner] === null);
  if (corners.length > 0) {
    const randomCorner = Math.floor(Math.random() * corners.length);
    return corners[randomCorner];
  }
  
  // 5. Take any available side
  const sides = [1, 3, 5, 7].filter(side => board[side] === null);
  if (sides.length > 0) {
    const randomSide = Math.floor(Math.random() * sides.length);
    return sides[randomSide];
  }
  
  // Fallback to random move
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};
