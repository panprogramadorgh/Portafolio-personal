import Button from "./Button.jsx";
import "../stylesheets/Nav.css";

const Nav = ({ buttonsContent }) => {
  return (
    <nav className="Nav">
      Nav component
      {buttonsContent.map((buttonContent, index) => (
        <Button
          key={index}
          className="Nav-button"
          action={() => alert("hello world")}
        >
          {buttonContent}
        </Button>
      ))}
    </nav>
  );
};

export default Nav;
