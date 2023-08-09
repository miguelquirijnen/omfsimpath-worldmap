import React, { useState } from "react";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import gsap from "gsap";
import { BASE_VIEWBOX, VIEWBOXES } from "../constants";

const N_LATIN_AMERICA = "400 350 200 200";
const C_LATIN_AMERICA = "600 500 200 150";
const S_LATIN_AMERICA = "550 550 200 200";

const N_EUROPE = "950 55 220 100";
const C_EUROPE = "920 130 190 100";
const SE_EUROPE = "880 190 180 100";
const SW_EUROPE = "1010 180 180 100";

const MIDDLE_EAST_1 = "1100 265 130 80";
const MIDDLE_EAST_2 = "1170 230 140 80";

const AFRICA_1 = "955 415 160 80";
const AFRICA_2 = "980 640 260 80";

const ASIA_1 = "1410 240 400 80";
const ASIA_2 = "1410 350 300 80";
const ASIA_3 = "1420 480 350 80";

const AUSTRALASIA_ZOOM = "1570 580 320 180";

const DELAY_TRAVEL = 2;
const ANIMATION_DURATION = 3;

const VidMode = ({ playing, setPlaying, svgRef, setCurrentContinent }) => {
  // VISIT 1: LATIN AMERICA
  const handlePlayClick = () => {
    setPlaying(true);
    toLatinAmerica();
    // toEurope();
    // toMiddleEast();
    // toAfrica();
    // toAustralasia();
    // toAsia()
    // gsap.to(svgRef.current, {
    //     attr: { viewBox: ASIA_3 },
    // })
  };

  const toLatinAmerica = () => {
    const currentContinent = "latin-america";

    gsap.to(svgRef.current, {
      duration: 1.5,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: 3,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelLatinAmerica();
      },
    });
  };

  const travelLatinAmerica = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: N_LATIN_AMERICA },
      delay: 0.5,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: C_LATIN_AMERICA },
          delay: DELAY_TRAVEL,
          onComplete: () => {
            gsap.to(svgRef.current, {
              duration: ANIMATION_DURATION,
              attr: { viewBox: S_LATIN_AMERICA },
              delay: DELAY_TRAVEL,
              onComplete: () => {
                toNorthAmerica();
              },
            });
          },
        });
      },
    });
  };

  // VISIT 2: NORTH AMERICA
  const toNorthAmerica = () => {
    const currentContinent = "north-america";

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelNorthAmerica();
      },
    });
  };

  const travelNorthAmerica = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: "300 150 250 100" },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: "450 180 250 100" },
          delay: DELAY_TRAVEL,
          onComplete: () => {
            toEurope();
          },
        });
      },
    });
  };

  // VISIT 3: NORTH AMERICA
  const toEurope = () => {
    const currentContinent = "europe";

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelEurope();
      },
    });
  };

  const travelEurope = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: N_EUROPE },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: C_EUROPE },
          delay: DELAY_TRAVEL,
          onComplete: () => {
            gsap.to(svgRef.current, {
              duration: ANIMATION_DURATION,
              attr: { viewBox: SE_EUROPE },
              delay: DELAY_TRAVEL,
              onComplete: () => {
                gsap.to(svgRef.current, {
                  duration: ANIMATION_DURATION,
                  attr: { viewBox: SW_EUROPE },
                  delay: DELAY_TRAVEL,
                  onComplete: () => {
                    toMiddleEast();
                  },
                });
              },
            });
          },
        });
      },
    });
  };

  // VISIT 4: MIDDLE-EAST
  const toMiddleEast = () => {
    const currentContinent = "middle-east";

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelMiddleEast();
      },
    });
  };

  const travelMiddleEast = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: MIDDLE_EAST_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: MIDDLE_EAST_2 },
          delay: 1,
          onComplete: () => {
            toAfrica();
          },
        });
      },
    });
  };

  // VISIT 5: AFRICA
  const toAfrica = () => {
    const currentContinent = "africa";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        travelAfrica();
      },
    });
  };

  const travelAfrica = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: AFRICA_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: AFRICA_2 },
          delay: 1,
          onComplete: () => {
            toAsia();
          },
        });
      },
    });
  };

  // VISIT 6: ASIA
  const toAsia = () => {
    const currentContinent = "asia";

    gsap.to(svgRef.current, {
      duration: 2,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        travelAsia();
      },
    });
  };

  const travelAsia = () => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: ASIA_1 },
      delay: 1,
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: ASIA_2 },
          delay: DELAY_TRAVEL,
          onComplete: () => {
            gsap.to(svgRef.current, {
              duration: ANIMATION_DURATION,
              attr: { viewBox: ASIA_3 },
              delay: DELAY_TRAVEL,
              onComplete: () => {
                toAustralasia();
              },
            });
          },
        });
      },
    });
  };

  // VISIT 7: AUSTRALASIA
  const toAustralasia = () => {
    const currentContinent = "australasia";

    setCurrentContinent(currentContinent);

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[currentContinent] },
      onComplete: () => {
        gsap.to(svgRef.current, {
          duration: ANIMATION_DURATION,
          attr: { viewBox: AUSTRALASIA_ZOOM },
          onComplete: () => {
            finalize();
          },
        });
      },
    });
  };

  // ZOOM OUT AGAIN
  const finalize = () => {
    const currentContinent = "";

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
      delay: DELAY_TRAVEL,
      onComplete: () => {
        setCurrentContinent(currentContinent);
        return;
      },
    });
  };

  return (
    <div>
      {!playing && (
        <div style={iconContainterStyle}>
          <PlayCircleIcon onClick={handlePlayClick} />
        </div>
      )}
    </div>
  );
};

const iconContainterStyle = {
  display: "flex",
  position: "absolute",
  top: "10px",
  left: "40px",
  width: "auto",
};

export default VidMode;
