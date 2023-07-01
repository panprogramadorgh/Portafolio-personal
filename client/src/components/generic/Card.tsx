import { ReactNode, MouseEventHandler } from "react";
import "../../stylesheets/generic/Card.css";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  type: "text" | "card";
}
const Card = ({ children, className, onClick, type }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`Card ${className ? className : ""}`.trim()}
      style={{
        cursor: type === "card" ? "pointer" : "default",
        userSelect: type === "card" ? "none" : "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
