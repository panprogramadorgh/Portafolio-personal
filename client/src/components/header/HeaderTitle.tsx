import { useState, useEffect, useCallback } from "react";
import "../../stylesheets/header/HeaderTitle.css";

const HeaderTitle = () => {
  const timeToChangeAptitude = 3000;
  const aptitudes = [
    "a full-stack developer.",
    "a content creator.",
    "glad to see you !",
  ];
  const [currentAptidude, setCurrentAptidude] = useState<string>(aptitudes[0]);
  const [aptitudeAnimation, setAptitudeAnimation] = useState<string>("none");

  const changeAptitude = useCallback(async () => {
    const index = aptitudes.findIndex(
      (aptitude) => aptitude === currentAptidude
    );
    setAptitudeAnimation("fadeout_aptitude 0.32s ease");
    await new Promise((resolve) => {
      setTimeout(() => {
        setCurrentAptidude(
          index < aptitudes.length - 1 ? aptitudes[index + 1] : aptitudes[0]
        );
        setAptitudeAnimation("fadein_aptitude 0.17s ease");
        resolve(null);
      }, 300);
    });
  }, [currentAptidude]);
  useEffect(() => {
    setTimeout(changeAptitude, timeToChangeAptitude);
  }, [currentAptidude]);

  return (
    <div className="HeaderTitle">
      <div className="static-message-container">
        <h1>Hi there!</h1>
        <h1>
          My name is <span className="name">Alvaro</span>
        </h1>
      </div>
      <div className="dynamic-message-container">
        <h1>
          And i'am{" "}
          <span
            style={{
              animation: aptitudeAnimation,
            }}
            className="aptitude"
          >
            {currentAptidude}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HeaderTitle;
