import { ReactNode } from "react";
import "../../stylesheets/generic/PageSection.css";

interface Props {
  className?: string;
  children?: ReactNode;
}

const PageSection = ({ className = "", children }: Props) => {
  /* TODO: Crear hook para intersection observer */
  return (
    <article className={`PageSection ${className}`.trim()}>{children}</article>
  );
};

export default PageSection;
