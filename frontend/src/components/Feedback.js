import React from "react";
import { motion } from "framer-motion";

function Feedback({ isCorrect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 flex items-center justify-center ${
        isCorrect ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-white text-4xl font-bold">
        {isCorrect ? "Correct!" : "Incorrect!"}
      </p>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        Close
      </button>
    </motion.div>
  );
}

export default Feedback;
