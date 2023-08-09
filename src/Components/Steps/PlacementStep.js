import React from "react";
import { START_POSITIONS, VIEWBOXES } from "../../constants";
import interact from "interactjs";
import { pushToDb } from "../../Database/requests";

function PlacementStep({
  handleReturnClick,
  nextStep,
  currentMessage,
  dataUrl,
  currentContinent,
}) {
  // Drag move event listener
  function dragMoveListener(event) {
    const target = event.target;

    const [_vbX, _vbY, vbWidth, vbHeight] =
      VIEWBOXES[currentContinent].split(" ");

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const viewBoxRatio = vbWidth / vbHeight;
    const screenRatio = screenWidth / screenHeight;

    let svgVisibleWidth;
    let svgVisibleHeight;

    // Width stays constant (Viewbox x and width are applicable)
    if (screenRatio < viewBoxRatio) {
      svgVisibleWidth = vbWidth;
      svgVisibleHeight = vbWidth / screenRatio;
    }
    // Height stays constant (Viewbox y and height are applicable)
    else if (screenRatio > viewBoxRatio) {
      svgVisibleWidth = screenRatio * vbHeight;
      svgVisibleHeight = vbHeight;
    }

    const factorX = svgVisibleWidth / screenWidth;
    const factorY = svgVisibleHeight / screenHeight;

    // Store the object's position
    target.style.x = (parseFloat(target.style.x) || 0) + event.dx * factorX;
    target.style.y = (parseFloat(target.style.y) || 0) + event.dy * factorY;
  }

  // Enable draggability on the draggable object
  interact(currentMessage).draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  // Confirm the placement of the object
  const handleConfirmPlacementClick = async (e) => {
    const widthString = currentMessage.style.width;
    const heightString = currentMessage.style.height;

    pushToDb(
      dataUrl,
      currentMessage.style.x,
      currentMessage.style.y,
      widthString.substr(0, widthString.length - 2),
      heightString.substr(0, heightString.length - 2),
      currentContinent
    );

    nextStep();

    currentMessage.remove();
    handleReturnClick();
  };

  // ZOOM IN
  const zoomObjectIn = () => {
    const initX = parseFloat(currentMessage.style.x);
    const initY = parseFloat(currentMessage.style.y);

    const boundingRect = currentMessage.getBBox();
    const initWidth = boundingRect.width;
    const initHeight = boundingRect.height;

    const newWidth = initWidth * 1.1;
    const newHeight = initHeight * 1.1;

    const moveToLeft = Math.abs(initWidth - newWidth) / 2;
    const moveUp = Math.abs(initHeight - newHeight) / 2;

    currentMessage.style.width = newWidth;
    currentMessage.style.height = newHeight;
    currentMessage.style.x = initX - moveToLeft;
    currentMessage.style.y = initY - moveUp;
  };

  // ZOOM OUT
  const zoomObjectOut = () => {
    const initX = parseFloat(currentMessage.style.x);
    const initY = parseFloat(currentMessage.style.y);

    const boundingRect = currentMessage.getBBox();
    const initWidth = boundingRect.width;
    const initHeight = boundingRect.height;

    const newWidth = initWidth / 1.1;
    const newHeight = initHeight / 1.1;

    const moveToRight = Math.abs(initWidth - newWidth) / 2;
    const moveDown = Math.abs(initHeight - newHeight) / 2;

    currentMessage.style.width = newWidth;
    currentMessage.style.height = newHeight;
    currentMessage.style.x = initX + moveToRight;
    currentMessage.style.y = initY + moveDown;
  };

  const instructionText = `Place your message on the continent.`;
  const confirmText = `Confirm message!`;
  const returnText = `Return to main view`;

  const zoomIn = `+`;
  const zoomOut = `-`;

  return (
    <div>
      <image
        x={START_POSITIONS[currentContinent][0]}
        y={START_POSITIONS[currentContinent][1]}
        width={150}
        height={80}
        href={dataUrl}
      />
      <h2 style={textStyle}>{instructionText}</h2>

      <div style={zoomContainerStyle}>
        <button className="button" onClick={(e) => zoomObjectIn(e)}>
          {zoomIn}
        </button>
        <button className="button" onClick={(e) => zoomObjectOut(e)}>
          {zoomOut}
        </button>
      </div>

      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleConfirmPlacementClick(e)}
        >
          {confirmText}
        </button>
        <button className="button" onClick={(e) => handleReturnClick(e)}>
          {returnText}
        </button>
      </div>
    </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */
const textStyle = {
  position: "absolute",
  top: "10%",
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default",
  width: "auto",
  transform: "translate(-50%, -50%)", 
  left: "50%"
};

const zoomContainerStyle = {
  width: "auto",
  top: "50%",
  right: "1%",
  transform: "translate(-50%, -50%)",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  background: "rgb(255,255,255,0.6)",
  padding: "10px",
  borderRadius: "10px",
};

const buttonContainerStyle = {
  bottom: "5%",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  width: "auto",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

export default PlacementStep;
