import { VscArrowRight } from "react-icons/vsc";
import { SiGithub } from "react-icons/si";
import "../../stylesheets/generic/GhLinkButton.css";

interface Props {
  hasArrow?: boolean;
}
const GhLinkButton = ({ hasArrow }: Props) => {
  return (
    <a
      className="GhLinkButton"
      href="https://github.com/AlvaroBT7"
      target="_BLANK"
    >
      <SiGithub /> GitHub{" "}
      {hasArrow ? <VscArrowRight className="arrow" /> : null}
    </a>
  );
};

export default GhLinkButton;
