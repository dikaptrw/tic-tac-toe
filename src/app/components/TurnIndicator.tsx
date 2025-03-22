"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TurnIndicatorProps {
  currentPlayer: string;
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ currentPlayer }) => {
  return (
    <motion.div 
      className="text-center mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="inline-block px-4 py-2"
        key={currentPlayer} // This forces re-animation when player changes
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="text-gray-700 font-medium">
          {currentPlayer === 'X' ? 'X' : 'O'} Turn
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TurnIndicator;
