import { useCallback } from "react";
import GhLinkButton from "../generic/GhLinkButton";
import HeaderTitle from "./HeaderTitle";
import Card from "../generic/Card";
import Button from "../generic/Button";
import "../../stylesheets/header/Header.css";

const Header = () => {
  const handleButtonClick = useCallback(() => {
    const element = document.querySelector(".Skills");
    window.scrollTo({
      behavior: "smooth",
      top:
        window.scrollY +
        (element as HTMLElement).getBoundingClientRect().top -
        100,
    });
  }, []);

  return (
    <header className="Header">
      <div className="info-container">
        <div className="title-container">
          <HeaderTitle />
          <div className="gh-button-container">
            <GhLinkButton />
          </div>
        </div>
        <Card type="text">
          Hi, I'm Alvaro, and I develop full-stack web applications, although I
          specialize more in the front-end. I am also a content creator, I have
          a YouTube channel of an educational nature in this sector. I really
          like programming, I have about two years of experience in this sector,
          although I don't have work experience at the moment.
          <Button hasArrow callback={handleButtonClick}>
            More about me
          </Button>
        </Card>
      </div>
    </header>
  );
};

export default Header;
