import { VscArrowRight } from "react-icons/vsc";
import { useContext } from "react";
import Button from "./Button";
import {
  TextContainerContext,
  TextContainerContextValue,
} from "../contexts/TextContainer.context";
import "../stylesheets/TextContainer.css";

const TextContainer = () => {
  const { showTextContainer, setShowTextContainer } = useContext(
    TextContainerContext
  ) as TextContainerContextValue;

  const shortMessage = (
    <p>
      My name is Alvaro Barrero Tanarro, and I am a passionate full-stack web
      developer and content creator on YouTube. While content creation is a
      hobby, my true profession lies in programming. I specialize in a range of
      technologies, including Node.js Express,React, MongoDB, HTML, CSS,
      JavaScript, Next.js and Python
    </p>
  );
  const longMessage = (
    <>
      {shortMessage}
      <p
        style={{
          animation: "deploy_long_text 0.5s ease-in-out",
        }}
      >
        As a self-taught programmer, I have acquired all my knowledge and skills
        through my own efforts. I may not have formal work experience, but I
        bring enthusiasm, dedication, and problem-solving abilities to the
        table. One of my proudest achievements is the completion of my first
        database-driven application. It represents the culmination of two years
        of relentless learning and practical application of my programming
        skills. Looking ahead, my long-term goals revolve around establishing my
        own company and working for myself as my own boss. I have a strong
        entrepreneurial spirit and a deep desire to make a significant impact in
        the industry. With a creative mindset and a knack for problem-solving,
        I, Alvaro Barrero Tanarro, present myself as a talented web developer
        with a solid foundation of knowledge and an entrepreneurial drive.
        Combining technical expertise with a passion for innovation, I am a
        promising candidate in the search for new career opportunities." I hope
        this biography meets your requirements. If you have any further
        adjustments or additional information to include, please let me know.
      </p>
    </>
  );
  const handleButtonClick = () => {
    setShowTextContainer(!showTextContainer);
  };
  return (
    <div className="TextContainer">
      <div className={`content ${showTextContainer ? "deployed" : ""}`.trim()}>
        {showTextContainer ? longMessage : shortMessage}
      </div>
      <div className="button-container">
        <Button callback={handleButtonClick}>
          {showTextContainer ? "All right" : "More about me"}
          <VscArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default TextContainer;
