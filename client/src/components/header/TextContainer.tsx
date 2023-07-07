import { VscArrowRight } from "react-icons/vsc";
import Button from "../generic/Button";
import Card from "../generic/Card";
import "../../stylesheets/header/TextContainer.css";

const TextContainer = () => {
  const message = (
    <p>
      Hi, I'm Alvaro, and I develop full-stack web applications, although I
      specialize more in the front-end. I am also a content creator, I have a
      YouTube channel of an educational nature in this sector. I really like
      programming, I have about two years of experience in this sector, although
      I don't have work experience at the moment.
    </p>
  );

  const handleButtonClick = () => {
    const element = document.querySelector(".Skills");
    if (element !== null) {
      window.scrollTo({
        behavior: "smooth",
        top: window.scrollY + element.getBoundingClientRect().top - 100,
      });
    }
  };
  return (
    <Card type="text" className="TextContainer">
      <div className="content">{message}</div>
      <div className="button-container">
        <Button callback={handleButtonClick}>
          More about me
          <VscArrowRight />
        </Button>
      </div>
    </Card>
  );
};

export default TextContainer;
