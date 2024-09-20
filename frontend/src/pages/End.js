import React, { useState, useEffect } from "react";
import axios from "axios";
import FinalScreen from "../components/FinalScreen";

function End() {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/final-image");
        if (response.data.image != "") setImageSrc(response.data.image);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchImage();
  }, []);

  return (
    <div class="w-screen h-screen bg-color flex justify-center">
      <div class="w-1/2 content-center">
        {!showFinal && (
          <div>
            <h2 class="mb-6">
              What a beautiful nation! What shall we name it?
            </h2>
            <div class="border-2 border-primary rounded-md mb-6">
              {isLoading ? <span></span> : <img src={imageSrc} />}
            </div>

            <div class="border-b-2 border-primary w-full mb-6">
              <input
                type="text"
                placeholder="Type here"
                class="focus:outline-none focus:ring-0 focus:border-focus:border-primary border-2 border-transparent bg-transparent text-primary text-lg w-full font-semibold"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <button
              class="btn btn-primary w-2/3"
              onClick={() => {
                setShowFinal(true);
              }}
            >
              Next
            </button>
          </div>
        )}

        {showFinal && <FinalScreen nationName={name} nationImg={imageSrc} />}
      </div>
    </div>
  );
}

export default End;
