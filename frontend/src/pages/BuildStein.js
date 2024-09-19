import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";

function BuildStein() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //FIXME: change to image path
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
      <div class="w-3/4 h-3/4 grid grid-cols-4">
        <div
          id="countryStore"
          class="border-2 border-primary rounded overflow-y-auto p-2"
        >
          {isLoading ? (
            <p>Loading winnings ...</p>
          ) : (
            countries.map((c) => (
              <Draggable key={c.country}>
                <button class="">
                  <img src={c.path} draggable="false" />
                </button>
              </Draggable>
            ))
          )}
        </div>
        <div class="col-span-3 ml-10 border-2 border-primary rounded"></div>
      </div>
    </div>
  );
}

export default BuildStein;
