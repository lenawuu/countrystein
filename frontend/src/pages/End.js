import React, { useState, useEffect } from "react";
import axios from "axios";

function End() {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      the end!
      {isLoading ? <span></span> : <img src={imageSrc} />}
    </div>
  );
}

export default End;
