import { SiGithub } from "react-icons/si";
import { useState, useEffect } from "react";
import "../stylesheets/Title.css";

const Title = () => {
  const aptitudes = [
    "a full-stack developer",
    "a content creator",
    "thankful to see you",
  ];
  const [currentAptidude, setCurrentAptidude] = useState<string>(aptitudes[0]);
  const [aptitudeAnimation, setAptitudeAnimation] = useState<string>("none");
  const changeAptitude = async () => {
    const index = aptitudes.indexOf(currentAptidude);
    setAptitudeAnimation("fadeout_aptitude 0.17s ease");
    await new Promise((resolve) => {
      setTimeout(() => {
        setCurrentAptidude(
          index < aptitudes.length - 1 ? aptitudes[index + 1] : aptitudes[0]
        );
        setAptitudeAnimation("fadein_aptitude 0.17s ease");
        resolve(null);
      }, 150);
    });
  };
  useEffect(() => {
    setTimeout(changeAptitude, 5000);
  }, [currentAptidude]);

  return (
    <div className="Title">
      <div className="static-message-container">
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
            {currentAptidude}.
          </span>
        </h1>
      </div>
      <div className="gh-container">
        <a href="https://github.com/AlvaroBT7" target="_BLANK">
          <SiGithub /> GitHub
        </a>
      </div>
    </div>
  );
};

export default Title;
