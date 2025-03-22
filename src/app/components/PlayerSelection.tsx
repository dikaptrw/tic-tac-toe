"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface PlayerSelectionProps {
  selectedPlayer: string;
  onSelectPlayer: (player: string) => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  selectedPlayer,
  onSelectPlayer,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <motion.button
        onClick={() => onSelectPlayer("X")}
        className={cn(
          `px-6 py-2 rounded-md flex items-center justify-center`,
          selectedPlayer === "X"
            ? "bg-[#e8f5f4] text-gray-800 border border-gray-300"
            : "bg-white text-gray-500 border border-gray-300"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl font-bold">✕</span>
        <span className="ml-2">-</span>
      </motion.button>
      <motion.button
        onClick={() => onSelectPlayer("O")}
        className={`px-6 py-2 rounded-md flex items-center justify-center ${
          selectedPlayer === "O"
            ? "bg-[#ffebee] text-gray-800 border border-gray-300"
            : "bg-white text-gray-500 border border-gray-300"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="text-xl font-bold">○</span>
        <span className="ml-2">-</span>
      </motion.button>
    </div>
  );
};

export default PlayerSelection;
