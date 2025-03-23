"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  handlePlayAgain: () => void;
  currentPlayer: string; // Used by parent component
  winningLine?: number[] | null;
  gameEnd: boolean; // Used by parent component
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  handlePlayAgain,
  winningLine = null,
  gameEnd,
}) => {
  return (
    <div className="relative w-full py-10">
      {/* play again button overlay */}
      <div>
        {(winningLine || gameEnd) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute z-[10] inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm bg-opacity-70"
          >
            <motion.button
              onClick={handlePlayAgain}
              className="cursor-pointer uppercase text-3xl 2sm:text-4xl font-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </div>

      <div className="p-4 rounded-md">
        <div className="grid grid-cols-3 w-fit mx-auto">
          {board.map((cell, index) => (
            <motion.div
              key={index}
              onClick={() => cell === null && onCellClick(index)}
              className={cn(
                "w-24 h-24 2sm:w-40 2sm:h-40 aspect-square flex items-center justify-center cursor-pointer border-white",
                winningLine && winningLine.includes(index)
                  ? "[&_.marker]:!text-[#1a9e97] [&_.marker]:!border-[#1a9e97]"
                  : "",
                index < 6 ? "border-b-[5px]" : "",
                index % 3 !== 2 ? "border-r-[5px]" : ""
              )}
            >
              {cell === "X" && (
                <motion.div
                  className="font-bold w-12 h-12 2sm:w-20 2sm:h-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    winningLine && winningLine.includes(index)
                      ? {
                          scale: [1, 1.1, 1],
                          opacity: 1,
                          transition: { repeat: 2 },
                        }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="2.79 2.79 18.42 18.42"
                    fill="currentColor"
                    className="marker w-full h-full"
                  >
                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                  </svg>
                </motion.div>
              )}
              {cell === "O" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    winningLine && winningLine.includes(index)
                      ? {
                          scale: [1, 1.1, 1],
                          opacity: 1,
                          transition: { repeat: 2 },
                        }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <div className="marker w-12 h-12 2sm:w-20 2sm:h-20 border-[8px] border-white rounded-full"></div>
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
