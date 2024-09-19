import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import { useScreenshot } from "use-screenshot-hook";

function BuildStein() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const myRef = useRef(null);
  const { image, takeScreenshot } = useScreenshot({ ref: myRef });

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

  return (
    <div class="w-screen h-screen bg-color flex justify-center items-center">
      <div class="w-3/4 h-3/4 grid grid-cols-4 border-4">
        <div className="border-b-2 border-gray-300 h-full col-span-2 py-4 px-4">
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
        <div
          className="flex-1 border-dashed border-2 border-gray-400 col-span-2 p-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const country = e.dataTransfer.getData("text/plain");
            console.log("Dropped country:", country);
            // Handle the dropped country
          }}
          ref={myRef}
        >
          <h3 className="font-bold">Drop Area</h3>
          <p>Drop countries here</p>
        </div>
        <button class="btn btn-primary" onClick={() => takeScreenshot()}>
          take screenshot
        </button>
        {image && <img src={image} />}
      </div>
    </div>
  );
}

export default BuildStein;
