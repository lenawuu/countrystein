import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import { useScreenshot } from "use-screenshot-hook";
import { useNavigate } from "react-router-dom";

function BuildStein() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const myRef = useRef(null);
  const { image, takeScreenshot } = useScreenshot({ ref: myRef });
  const navigate = useNavigate();

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
    try {
      await axios.post("http://localhost:8080/final-image", { image });
    } catch (error) {
      console.error("Error storing image:", error);
    }
    navigate("/end");
  };

  return (
    <div class="w-screen h-screen bg-color flex justify-center items-center">
      <div class="w-3/4 h-3/4 border-4">
        <div
          className="border-b-2 border-gray-300 h-full grid grid-cols-4 py-4 px-4"
          ref={myRef}
        >
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
                    />
                  </button>
                </Draggable>
              ))}
            </div>
          )}
        </div>

        <button class="btn btn-primary" onClick={() => takeScreenshot()}>
          take screenshot
        </button>
        {image && <img src={image} />}
        <button class="btn btn-primary" onClick={() => handleNext()}>
          next
        </button>
      </div>
    </div>
  );
}

export default BuildStein;
