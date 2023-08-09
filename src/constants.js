// Declaration of all the constants
export const BASE_VIEWBOX = "0 0 2000 857";
export const ANIMATION_DURATION = 0.5; // in seconds

export const steps = {
  continentSelection: 0,
  continentConfirmation: 1,
  messageDrawing: 2,
  messagePlacing: 3,
};

export const CONTINENT_NAMES = {
  africa: "Africa",
  asia: "Asia",
  australasia: "Australasia",
  europe: "Europe",
  "middle-east": "Middle-East",
  "north-america": "North-America",
  "latin-america": "Latin-America",
};

// X Y WIDTH HEIGHT
export const VIEWBOXES = {
  africa: "840 330 500 400",
  asia: "1000 0 800 600",
  australasia: "1500 400 550 450",
  europe: "850 10 360 275",
  "middle-east": "890 150 600 300",
  "north-america": "170 0 780 400",
  "latin-america": "350 280 440 580",
};

export const START_POSITIONS = {
  africa: ["1080", "500"],
  asia: ["1400", "160"],
  australasia: ["1650", "620"],
  europe: ["1000", "100"],
  "middle-east": ["1080", "300"],
  "north-america": ["380", "120"],
  "latin-america": ["550", "500"],
};

export const svgNS = "http://www.w3.org/2000/svg";
