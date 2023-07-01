import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import GhLinkButton from "../generic/GhLinkButton";
import Title from "./Title";
import TextContainer from "./TextContainer";
import "../../stylesheets/header/Header.css";

const Header = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Header",
  });
  return (
    <header className="Header" style={{ animation, opacity: visible ? 1 : 0 }}>
      <div className="info-container">
        <div className="title-container">
          <Title />
          <div className="gh-button-container">
            <GhLinkButton />
          </div>
        </div>
        <TextContainer />
      </div>
    </header>
  );
};

export default Header;
