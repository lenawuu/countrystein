import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";

function FinalScreen({ name, finalImage }) {
  const [countries, setCountries] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const navigate = useNavigate();

  const explosionProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 250,
    width: 1600,
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/winnings");
        setCountries(response.data);
      } catch (error) {}
    };
    fetchCountries();
    setIsExploding(true);
  }, []);

  return (
    <div>
      <>{isExploding && <ConfettiExplosion props={explosionProps} />}</>
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
          <p className="text-primary text-4xl font-bold mb-4 text-center font-bowlby">
            Congratulations!
            <br /> You are the fine ruler of {name}!
          </p>
          <div class="h-1/3">
            <img
              src={finalImage}
              class="w-auto h-full border-4 border-primary rounded-lg"
            />
          </div>

          <AnimatePresence>
            {showAdditionalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center justify-center w-full"
              >
                <h2 className="text-primary text-2xl mt-4 mb-4 text-center">
                  {name} is made up of...
                </h2>
                <div class="grid grid-rows-4 grid-flow-col gap-4 w-1/3 mb-8 justify-items-center">
                  {countries.map((c) => (
                    <p class="text-primary font-semibold">{c.country}</p>
                  ))}
                </div>

                <div class="flex flex-row gap-4 justfy-center">
                  <button
                    className="btn btn-primary text-lg"
                    onClick={() => {
                      navigate("/start");
                    }}
                  >
                    Play Again
                  </button>
                  <button
                    className="btn btn-primary text-lg"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Back Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      <>{isExploding && <ConfettiExplosion props={explosionProps} />}</>
    </div>
  );
}

export default FinalScreen;
