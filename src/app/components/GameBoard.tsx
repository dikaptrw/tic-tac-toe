"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  currentPlayer: string; // Used by parent component
  winningLine?: number[] | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, winningLine = null }) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-[#20b2aa] p-4 rounded-md">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <motion.div
              key={index}
              onClick={() => cell === null && onCellClick(index)}
              className={`aspect-square flex items-center justify-center bg-[#20b2aa] border-2 border-[#1a9e97] rounded-sm cursor-pointer ${
                winningLine && winningLine.includes(index) ? 'bg-[#1a9e97]' : ''
              }`}
              whileHover={cell === null ? { scale: 1.05 } : {}}
              whileTap={cell === null ? { scale: 0.95 } : {}}
              animate={
                winningLine && winningLine.includes(index)
                  ? { scale: [1, 1.1, 1], transition: { repeat: 2 } }
                  : {}
              }
            >
              {cell === 'X' && (
                <motion.div 
                  className="text-gray-800 text-5xl font-bold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  X
                </motion.div>
              )}
              {cell === 'O' && (
                <motion.div 
                  className="text-white text-5xl font-bold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 border-4 border-white rounded-full"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
