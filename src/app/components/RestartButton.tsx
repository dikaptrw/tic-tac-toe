"use client";

import React from "react";
import { motion } from "framer-motion";

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  return (
    <motion.button
      onClick={onRestart}
      className="w-full px-6 py-2 2sm:h-[60px] bg-[#f8f9fa] text-xl text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer uppercase font-black"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Restart
    </motion.button>
  );
};

export default RestartButton;
