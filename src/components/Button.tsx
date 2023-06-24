import { MouseEventHandler, ReactNode } from "react";
import "../stylesheets/Button.css";

interface Props {
  callback: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
const Button = ({ callback, children }: Props) => {
  return (
    <button className="Button" onClick={callback}>
      {children}
    </button>
  );
};

export default Button;
