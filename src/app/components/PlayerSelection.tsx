"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "../utils";
import { Score } from "./GameContainer";

interface PlayerSelectionProps {
  selectedPlayer: string;
  onSelectPlayer: (player: string) => void;
  score: Score;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  selectedPlayer,
  onSelectPlayer,
  score,
}) => {
  return (
    <div className="flex justify-center gap-x-5">
      <motion.button
        onClick={() => onSelectPlayer("X")}
        className={cn(
          `flex flex-col items-center cursor-pointer`,
          selectedPlayer === "X" ? "text-[#1a9e97]" : ""
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl font-bold uppercase whitespace-nowrap">
          Player (x)
        </span>
        <span className="text-2xl">{score.X}</span>
      </motion.button>
      <motion.button
        className={cn(`flex flex-col items-center`)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl font-bold uppercase whitespace-nowrap">
          TIE
        </span>
        <span className="text-2xl">{score.T}</span>
      </motion.button>
      <motion.button
        onClick={() => onSelectPlayer("O")}
        className={cn(
          `flex flex-col items-center cursor-pointer`,
          selectedPlayer === "O" ? "text-[#1a9e97]" : ""
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl font-bold uppercase whitespace-nowrap">
          Player (O)
        </span>
        <span className="text-2xl">{score.O}</span>
      </motion.button>
    </div>
  );
};

export default PlayerSelection;
