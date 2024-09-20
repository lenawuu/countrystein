import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Results({ score, onClose }) {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setShowAdditionalInfo(true)}
        className={
          "fixed inset-0 flex flex-col items-center justify-center bg-color"
        }
      >
        <p className="text-primary text-4xl font-bold mb-4">
          You collected {score} countries!
        </p>

        <AnimatePresence>
          {showAdditionalInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center justify-center"
            >
              <p className="text-primary text-2xl mb-4">
                Let's turn them into your very own kingdom!
              </p>
              <button
                onClick={onClose}
                className="btn btn-primary text-lg w-2/3"
              >
                Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default Results;
