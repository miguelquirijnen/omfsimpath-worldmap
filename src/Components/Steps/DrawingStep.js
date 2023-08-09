import React from "react";
import Canvas from "../Canvas";
import { START_POSITIONS, svgNS } from "../../constants";

function getBoundingBox(canvas) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha !== 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  return {
    x: minX,
    y: minY,
    width,
    height,
  };
}

function DrawingStep({
  handleReturnClick,
  nextStep,
  setCurrentMessage,
  currentContinent,
  setDataUrl,
}) {

  // Confirm the sketched message
  const handleConfirmMessageClick = async (e) => {
    const canvas = document.getElementById("canvas");

    // Get the bounding box of the drawn portion
    const boundingBox = getBoundingBox(canvas);

    // Create a new canvas with the dimensions of the drawn portion
    const drawnCanvas = document.createElement("canvas");
    drawnCanvas.width = boundingBox.width;
    drawnCanvas.height = boundingBox.height;
    const drawnCtx = drawnCanvas.getContext("2d");

    // Copy the drawn portion onto the new canvas
    drawnCtx.drawImage(
      canvas,
      boundingBox.x,
      boundingBox.y,
      boundingBox.width,
      boundingBox.height,
      0,
      0,
      boundingBox.width,
      boundingBox.height
    );

    const dataURL = drawnCanvas.toDataURL("image/png");
    setDataUrl(dataURL);

    // Create the <image> element
    var imageElement = document.createElementNS(svgNS, "image");

    // Set the necessary attributes
    imageElement.style.zIndex = "1999";
    imageElement.style.width = (boundingBox.width > boundingBox.height ? "100" : "auto");
    imageElement.style.height = (boundingBox.width > boundingBox.height ? "auto" : "100");
    imageElement.style.x = START_POSITIONS[currentContinent][0];
    imageElement.style.y = START_POSITIONS[currentContinent][1];

    imageElement.key = "newMessage";

    // Set the href attribute to the Data URL
    imageElement.setAttribute("href", dataURL);

    // Get a reference to the group element
    var contElement = document.getElementById(currentContinent);
    contElement.appendChild(imageElement);

    // Get a reference to the root <svg> element
    var svgElement = document.getElementById("worldmap");

    // Append the <image> element to the root <svg> element to bring it to the front
    svgElement.appendChild(imageElement);

    setCurrentMessage(imageElement);

    nextStep();
  };

  const handleClearClick = async (e) => {
    const myCanvas = document.getElementById("canvas");
    const ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  };

  const instructionText = `Write your name here!`;
  const confirmText = `Continue to placement!`;
  const clearText = `Clear`;
  const returnText = `Return to main view`;

  return (
    <div style={drawingContainerStyle}>
      <h2 style={textStyle}>{instructionText}</h2>
      <Canvas />
      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleConfirmMessageClick(e)}
        >
          {confirmText}
        </button>
        <button className="button" onClick={(e) => handleClearClick(e)}>
          {clearText}
        </button>
        <button className="button" onClick={(e) => handleReturnClick(e)}>
          {returnText}
        </button>
      </div>
    </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */

const drawingContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "60%",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const textStyle = {
  cursor: "default",
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  marginBottom: "30px",
};

export default DrawingStep;
