import { ReactNode, MouseEventHandler } from "react";
import "../../stylesheets/generic/Card.css";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  type: "text" | "card";
  animation?: `${string} ${number}s ${string}`;
}
const Card = ({
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type,
  animation,
}: Props) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`Card ${className ? className : ""}`.trim()}
      style={{
        cursor: type === "card" ? "pointer" : "default",
        userSelect: type === "card" ? "none" : "auto",
        animation: animation ? animation : "",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
