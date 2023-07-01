import { VscArrowRight } from "react-icons/vsc";
import { MouseEventHandler, ReactNode } from "react";
import "../../stylesheets/generic/Button.css";

interface Props {
  callback: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  hasArrow?: boolean;
}
const Button = ({ callback, children, hasArrow }: Props) => {
  return (
    <button className="Button" onClick={callback}>
      {children}
      {hasArrow ? <VscArrowRight /> : null}
    </button>
  );
};

export default Button;
