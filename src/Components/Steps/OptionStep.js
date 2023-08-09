import { CONTINENT_NAMES, steps } from "../../constants";

function OptionStep({ currentContinent, handleReturnClick, setCurrentStep }) {
  const handleAddButton = (e) => {
    setCurrentStep(steps.messageDrawing);
  };

  const handleEditButton = (e) => {
    setCurrentStep(steps.messageEditing);
    console.log(steps.messageEditing)
  };


  const headerText = `Selected continent: ${CONTINENT_NAMES[currentContinent]}`;
  const addText = `Leave a message`;
  const editText = `Edit messages`;
  const returnText = `Return`;

  return (
    <div>
      <div style={headerContainerStyle}>
        <h2 style={textStyle}>
          <i>{headerText}</i>
        </h2>
      </div>

      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleAddButton(e)}
        >
          {addText}
        </button>
        <button
          className="button"
          onClick={(e) => handleEditButton(e)}
        >
          {editText}
        </button>
        <button className="button" onClick={(e) => handleReturnClick(e)}>
          {returnText}
        </button>
      </div>
    </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */
const headerContainerStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  top: "5%",
  width: "auto",
  left: "50%",
  transform: "translate(-50%, -50%)",
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

const textStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default",
};

export default OptionStep;
