import React, { useState } from "react";
import FinalScreen from "../components/FinalScreen";
import BuildStein from "../components/BuildStein";
import Naming from "./Naming";

function End() {
  const [finalImage, setFinalImage] = useState("");
  const [name, setName] = useState("");

  const [showBuild, setShowBuild] = useState(true);
  const [showNaming, setShowNaming] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleTransition = () => {
    if (showBuild) {
      setShowBuild(false);
      setShowNaming(true);
    } else if (showNaming) {
      setShowNaming(false);
      setShowFinal(true);
    }
  };

  return (
    <div>
      {showBuild && (
        <BuildStein
          setFinalImage={setFinalImage}
          handleTransition={handleTransition}
        />
      )}
      {showNaming && (
        <Naming
          finalImage={finalImage}
          handleTransition={handleTransition}
          setName={setName}
          name={name}
        />
      )}
      {showFinal && <FinalScreen name={name} finalImage={finalImage} />}
    </div>
  );
}

export default End;
