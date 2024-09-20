import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import { useScreenshot } from "use-screenshot-hook";

function BuildStein({ setFinalImage, handleTransition }) {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const myRef = useRef(null);
  const { takeScreenshot } = useScreenshot({ ref: myRef });

  useEffect(() => {
    const fetchWinnings = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/winnings");
        setCountries(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching winnings:", error);
        setIsLoading(false);
      }
    };

    fetchWinnings();
  }, []);

  const handleNext = async () => {
    const screenshot = await takeScreenshot();

    setFinalImage(screenshot);
    handleTransition();
  };

  return (
    <div class="vw-screen vh-screen bg-color flex flex-col justify-center items-center py-4">
      <h1 class="mb-6">Drag the countries together to build your nation!</h1>
      <div class="w-3/4 h-full border-4 border-primary rounded-lg">
        <div className="h-full grid grid-cols-4 py-4 px-4" ref={myRef}>
          {isLoading ? (
            <p>Loading winnings ...</p>
          ) : (
            <div className="grid gap-1 auto-rows-max grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
              {countries.map((c) => (
                <Draggable key={c.country}>
                  <button className="w-full">
                    <img
                      src={c.path}
                      draggable="false"
                      className="w-full h-auto"
                      style={{
                        filter:
                          "invert(28%) sepia(85%) saturate(427%) hue-rotate(44deg) brightness(97%) contrast(91%)",
                      }}
                    />
                  </button>
                </Draggable>
              ))}
            </div>
          )}
        </div>
      </div>
      <button class="mt-6 btn btn-primary" onClick={() => handleNext()}>
        Next
      </button>
    </div>
  );
}

export default BuildStein;
