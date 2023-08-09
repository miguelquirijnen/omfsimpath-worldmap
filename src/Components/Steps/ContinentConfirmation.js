import { CONTINENT_NAMES, steps } from "../../constants";

function ContinentConfirmationStep({
  currentContinent,
  handleReturnClick,
  setCurrentStep,
}) {
  const handleConfirmContinentClick = (e) => {
    setCurrentStep(steps.messageDrawing);
  };

  const questionText1 = `Leave a message from `;
  const questionText2 = `${CONTINENT_NAMES[currentContinent]}`;
  const questionText3 = `?`;
  const confirmText = `Yes, continue!`;
  const returnText = `No, return`;

  return (
    <div style={confirmationContainerStyle}>
      <h2 style={textStyle}>{questionText1}<i>{questionText2}</i>{questionText3}</h2>
      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleConfirmContinentClick(e)}
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
const confirmationContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",

  height: "auto",
  width: "auto",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const textStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default",
};

export default ContinentConfirmationStep;
