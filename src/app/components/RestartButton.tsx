"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  return (
    <motion.button
      onClick={onRestart}
      className="mt-4 px-6 py-2 bg-[#f8f9fa] text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      Restart game
    </motion.button>
  );
};

export default RestartButton;
