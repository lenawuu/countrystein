import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Feedback({ isCorrect, onClose, correctAnswer, correctSVG }) {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setShowAdditionalInfo(true)}
        className={`fixed inset-0 flex flex-col items-center justify-center ${
          isCorrect ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <p className="text-white text-4xl font-bold mb-4">
          {isCorrect ? "Correct!" : "Incorrect!"}
        </p>

        <div className="h-1/2">
          <AnimatePresence>
            {showAdditionalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-center justify-center"
              >
                <p className="text-white text-2xl mb-4">
                  The correct answer is {correctAnswer}
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  class="flex justify-center items-center w-full"
                >
                  <img
                    src={correctSVG}
                    className="w-3/12 h-auto mt-6"
                    style={{
                      filter:
                        "invert(100%) sepia(81%) saturate(404%) hue-rotate(196deg) brightness(117%) contrast(100%)",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onClose}
          className="absolute inset-x-0 bottom-0 btn justify-self-center w-48 mb-10"
        >
          Next
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Feedback;
