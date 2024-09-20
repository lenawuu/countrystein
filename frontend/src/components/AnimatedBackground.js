import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("./countries.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((country) => {
          setCountries((prevCountries) => [
            ...prevCountries,
            `/mapsicon/all/${country.iso}/vector.svg`,
          ]);
        });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const columnVariants = {
    animate: {
      y: [100, -100, 100],
      transition: {
        y: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };
  const columns = 5; // Number of columns

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="flex h-[200%]">
        {[...Array(columns)].map((_, columnIndex) => (
          <motion.div
            key={columnIndex}
            className="flex-1 flex flex-col mx-3 justify-center items-center"
            variants={columnVariants}
            animate="animate"
            custom={columnIndex}
            style={{
              animationDuration: `${20 + columnIndex * 5}s`,
              animationDirection: columnIndex % 2 === 0 ? "normal" : "reverse",
            }}
          >
            {countries.map((country, index) => (
              <img
                key={index}
                src={countries[Math.floor(Math.random() * countries.length)]}
                alt={`Country ${index + 1}`}
                className="size-3/4 opacity-20 py-4"
                style={{
                  filter:
                    "invert(28%) sepia(85%) saturate(427%) hue-rotate(44deg) brightness(97%) contrast(91%)",
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
