import React, { useState, useRef, useEffect } from "react";

const WIDTH_VW_FACTOR = 50;
const HEIGHT_VH_FACTOR = 50;
const DEFAULT_BG = "rgba(100, 2, 14,1)";
const CONTRAST_BG = "rgba(255,255,255,1)";
const DEFAULT_COLOR = "white";
const CONTRAST_COLOR = "rgba(128, 0, 32)";

const Canvas = ({ width, height }) => {
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("white"); // State for selected color
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BG);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width =
      document.body.getBoundingClientRect().width * (WIDTH_VW_FACTOR / 100);
    canvas.height =
      document.body.getBoundingClientRect().height * (HEIGHT_VH_FACTOR / 100);

    canvas.style.width = `${WIDTH_VW_FACTOR}vw`;
    canvas.style.height = `${HEIGHT_VH_FACTOR}vh`;

    // Setting the context to enable us draw
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.strokeStyle = color; // Set the stroke color
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, [color]); // Re-render the canvas when the color changes

  // Start drawing
  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // const { offsetX, offsetY } = getEventCoordinates(nativeEvent);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  // Stop drawing
  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  // Draw on the canvas
  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    // const { offsetX, offsetY } = getEventCoordinates(nativeEvent);
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  // Get coordinates from mouse or touch event
  // const getEventCoordinates = (event) => {
  //   let offsetX, offsetY;

  //   if (event.type === "mousedown" || event.type === "mousemove") {
  //     offsetX = event.nativeEvent.offsetX;
  //     offsetY = event.nativeEvent.offsetY;
  //   } else if (event.type === "touchstart" || event.type === "touchmove") {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const touch = event.touches[0] || event.changedTouches[0];
  //     offsetX = touch.clientX - rect.left;
  //     offsetY = touch.clientY - rect.top;
  //   }

  //   return { offsetX, offsetY };
  // };

  // Clear the canvas
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const handleColorChange = (newColor) => {
    if (newColor === DEFAULT_COLOR) {
      setBackgroundColor(DEFAULT_BG);
    } else {
      setBackgroundColor(CONTRAST_BG);
    }
    setColor(newColor);
  };

  return (
    <div style={canvasContainerStyle}>
      <canvas
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        onMouseMove={draw}
        onTouchStart={startDraw}
        onTouchEnd={stopDraw}
        onTouchMove={draw}
        ref={canvasRef}
        style={{ ...canvasStyle, backgroundColor: backgroundColor }}
        id={"canvas"}
      />
      <div style={colorSelectionStyle}>
        <ColorOption
          color={DEFAULT_COLOR}
          onClick={handleColorChange}
          selectedColor={color}
        />
        <ColorOption
          color={CONTRAST_COLOR}
          onClick={handleColorChange}
          selectedColor={color}
        />
      </div>
    </div>
  );
};

const canvasContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const canvasStyle = {
  border: "1 px solid black",
  backgroundColor: "rgba(128, 0, 32,0.8)",
  borderRadius: "10px", // Add round border
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add shadow effect
  width: `${WIDTH_VW_FACTOR}vw`,
  height: `${HEIGHT_VH_FACTOR}vh`,
  marginLeft: "70px"
};

const colorSelectionStyle = {
  width: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
};

const ColorOption = ({ color, onClick, selectedColor }) => {
  const handleClick = () => {
    onClick(color);
  };

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: color,
        borderRadius: "50%",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "30px",
        cursor: "pointer",
        border: selectedColor === color ? "3px solid #d6cfd1" : "none",
        boxShadow: selectedColor === color ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
      }}
      onClick={handleClick}
    />
  );
};

export default Canvas;
