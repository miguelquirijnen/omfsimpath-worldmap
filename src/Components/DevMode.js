import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import interact from "interactjs";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { VIEWBOXES } from "../constants";
import { updateMessage, removeMessage } from "../Database/requests";

const DevMode = ({
  devMode,
  setDevMode,
  currentContinent,
  handleReturnClick,
  messages,
  svgRef,
}) => {
  const [selectedMessage, setSelectedMessage] = useState();

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

  // ZOOM IN
  const zoomObjectIn = () => {
    if (!selectedMessage) return;
    const initX = parseFloat(selectedMessage.style.x);
    const initY = parseFloat(selectedMessage.style.y);

    const boundingRect = selectedMessage.getBBox();
    const initWidth = boundingRect.width;
    const initHeight = boundingRect.height;

    const newWidth = initWidth * 1.1;
    const newHeight = initHeight * 1.1;

    const moveToLeft = Math.abs(initWidth - newWidth) / 2;
    const moveUp = Math.abs(initHeight - newHeight) / 2;

    selectedMessage.style.width = newWidth;
    selectedMessage.style.height = newHeight;
    selectedMessage.style.x = initX - moveToLeft;
    selectedMessage.style.y = initY - moveUp;
  };

  // ZOOM OUT
  const zoomObjectOut = () => {
    if (!selectedMessage) return;
    const initX = parseFloat(selectedMessage.style.x);
    const initY = parseFloat(selectedMessage.style.y);

    const boundingRect = selectedMessage.getBBox();
    const initWidth = boundingRect.width;
    const initHeight = boundingRect.height;

    const newWidth = initWidth / 1.1;
    const newHeight = initHeight / 1.1;

    const moveToRight = Math.abs(initWidth - newWidth) / 2;
    const moveDown = Math.abs(initHeight - newHeight) / 2;

    selectedMessage.style.width = newWidth;
    selectedMessage.style.height = newHeight;
    selectedMessage.style.x = initX + moveToRight;
    selectedMessage.style.y = initY + moveDown;
  };

  const handleSelectedMessageClick = (newMessage) => {
    // Unset previous if any
    if (selectedMessage) {
      interact(selectedMessage).unset();
      updateMessage({
        dataURL: selectedMessage.href.baseVal,
        xcoord: selectedMessage.getBBox().x,
        ycoord: selectedMessage.getBBox().y,
        width: selectedMessage.getBBox().width,
        height: selectedMessage.getBBox().height,
      });
    }

    setSelectedMessage(newMessage);
    interact(newMessage).draggable({
      listeners: {
        move: dragMoveListener,
      },
    });
  };

  useEffect(() => {
    const group = document.getElementById(currentContinent);
    if (currentContinent && messages) {
      // Make them draggable
      messages
        .filter((msg) => msg.continent === currentContinent)
        .forEach((msg) => {
          console.log("click");
          const query = `image[href="${msg.dataURL}"]`;
          const msgElement = group.querySelector(query);
          msgElement.setAttribute("class", "message-selectable");
          msgElement.addEventListener("click", () =>
            handleSelectedMessageClick(msgElement)
          );
        });
    } else {
      // Restore to original
      messages
        .filter((msg) => msg.continent === currentContinent)
        .forEach((msg) => {
          const query = `image[href="${msg.dataURL}"]`;
          const msgElement = group.querySelector(query);
          msgElement.setAttribute("class", "message-selectable");
          interact(selectedMessage).unset();
        });
    }
  }, [
    devMode,
    currentContinent,
    messages,
    selectedMessage,
    handleSelectedMessageClick,
  ]);

  // Function to handle the download
  const handleDownloadImages = () => {
    const zip = new JSZip();
    if (messages) {
      messages.forEach((msg) => {
        const imageBlob = dataURLToBlob(msg.dataURL);
        zip.file(
          `message_${msg.xcoord}_${msg.ycoord}_${msg.width}_${msg.height}.png`,
          imageBlob
        );
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "messages.zip");
      });
    }
  };

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const handleDownloadSVG = () => {
    const svgElement = svgRef.current;

    // Clone the original SVG element
    const clonedSvgElement = svgElement.cloneNode(true);

    // Create a temporary container and append the cloned SVG element
    const container = document.createElement("div");
    container.appendChild(clonedSvgElement);

    // Get computed styles of the continent elements
    const computedStyles = window.getComputedStyle(
      container.querySelector("svg")
    );

    // Update the continent elements' fill and stroke attributes
    const continentElements = clonedSvgElement.querySelectorAll(".continent");
    if (messages) {
      continentElements.forEach((element) => {
        const continentName = element.getAttribute("id");
        const continentColor = computedStyles.getPropertyValue(
          `--${continentName}-color`
        );
        element.setAttribute("fill", continentColor);
        element.setAttribute("stroke", continentColor);
      });
    } else return;

    // Serialize the updated SVG element to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvgElement);

    // Create and trigger the download link
    const downloadLink = document.createElement("a");
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "worldmap.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const returnText = `Return to main view`;
  const deleteText = `Delete selected message`;
  const headerText = `World Map Editor: ${currentContinent.toUpperCase()}`;
  const zoomIn = `+`;
  const zoomOut = `-`;

  const deleteSelectedMessage = () => {
    if (!selectedMessage) return;
    // Unset previous if any
    if (selectedMessage) {
      interact(selectedMessage).unset();
      removeMessage({
        dataURL: selectedMessage.href.baseVal,
        xcoord: selectedMessage.getBBox().x,
        ycoord: selectedMessage.getBBox().y,
        width: selectedMessage.getBBox().width,
        height: selectedMessage.getBBox().height,
      });
    }
    setSelectedMessage()
    return 
  }

  return (
    <div>
      {currentContinent && (
        <>
          <div style={headerContainerStyle}>
            <>
              <h2 style={headerTextStyle}>
                <i>{headerText}</i>
              </h2>
            </>
          </div>
          <div style={buttonContainerStyle}>
            <button
              className="button"
              onClick={(e) => {
                setSelectedMessage();
                handleReturnClick(e);
              }}
            >
              {returnText}
            </button>
            {selectedMessage && (
              <button
                className="button"
                onClick={(e) => {
                  setSelectedMessage();
                  deleteSelectedMessage();
                  handleReturnClick(e);
                }}
              >
                {deleteText}
              </button>
            )}
          </div>
        </>
      )}
      {selectedMessage && (
        <div style={zoomContainerStyle}>
          <button
            className="button"
            style={zoomButtonStyle}
            onClick={(e) => zoomObjectIn(e)}
          >
            {zoomIn}
          </button>
          <button
            className="button"
            style={zoomButtonStyle}
            onClick={(e) => zoomObjectOut(e)}
          >
            {zoomOut}
          </button>
        </div>
      )}
    </div>
  );
};

const buttonContainerStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "2%",
  width: "auto",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
  background: "rgb(255,255,255,0.3)",
  borderRadius: "12px",
};

const headerContainerStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  top: "5%",
  width: "auto",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const headerTextStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default",
};

const zoomButtonStyle = {
  width: "50px",
};

export default DevMode;
