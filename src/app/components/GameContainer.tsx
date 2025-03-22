"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameBoard from "./GameBoard";
import PlayerSelection from "./PlayerSelection";
import RestartButton from "./RestartButton";
import { checkWinner, checkDraw, getBestMove } from "../utils/gameLogic";

const GameContainer: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [selectedPlayer, setSelectedPlayer] = useState<string>("X");
  const [computerPlayer, setComputerPlayer] = useState<string>("O");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isComputerThinking, setIsComputerThinking] = useState<boolean>(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Check for winner or draw after each move
  useEffect(() => {
    const winnerResult = checkWinner(board);
    if (winnerResult) {
      setWinner(winnerResult);

      // Find the winning line
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinningLine(lines[i]);
          break;
        }
      }

      return;
    }

    if (checkDraw(board)) {
      setIsDraw(true);
      return;
    }

    // Computer's turn
    if (gameStarted && currentPlayer === computerPlayer && !winner && !isDraw) {
      setIsComputerThinking(true);

      // Add a small delay to simulate thinking
      const timer = setTimeout(() => {
        const computerMove = getBestMove(board, computerPlayer);

        if (computerMove !== -1) {
          const newBoard = [...board];
          newBoard[computerMove] = computerPlayer;
          setBoard(newBoard);
          setCurrentPlayer(selectedPlayer);
        }

        setIsComputerThinking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    board,
    currentPlayer,
    computerPlayer,
    winner,
    isDraw,
    gameStarted,
    selectedPlayer,
  ]);

  // Reset the game
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(selectedPlayer);
    setWinner(null);
    setIsDraw(false);
    setGameStarted(false);
    setIsComputerThinking(false);
    setWinningLine(null);
  };

  // Handle player selection
  const handleSelectPlayer = (player: string) => {
    if (!gameStarted) {
      setSelectedPlayer(player);
      setCurrentPlayer(player);
      setComputerPlayer(player === "X" ? "O" : "X");
    }
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Prevent clicks during computer's turn or when game is over
    if (
      isComputerThinking ||
      winner ||
      isDraw ||
      currentPlayer !== selectedPlayer
    ) {
      return;
    }

    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(computerPlayer);
      setGameStarted(true);
    }
  };

  // Game status message
  const getGameStatus = () => {
    if (winner) {
      return `${winner} wins!`;
    } else if (isDraw) {
      return "It's a draw!";
    } else if (isComputerThinking) {
      return "Computer is thinking...";
    } else {
      return `${currentPlayer} Turn`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-black"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tic-tac-toe
      </motion.h1>

      <PlayerSelection
        selectedPlayer={selectedPlayer}
        onSelectPlayer={handleSelectPlayer}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={getGameStatus()}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-4"
        >
          <div className="inline-block px-4 py-2">
            <span className="text-gray-700 font-medium">{getGameStatus()}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        currentPlayer={currentPlayer}
        winningLine={winningLine}
      />

      <RestartButton onRestart={handleRestart} />
    </div>
  );
};

export default GameContainer;
