import { ReactNode } from "react";
import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import "../../stylesheets/generic/PageSection.css";

interface Props {
  className?: string;
  children?: ReactNode;
}

const PageSection = ({ className = "", children }: Props) => {
  // hook bugeado, los HTMLElement se quedan invisibles
  // const { animation, visible } = useComponentFadeinAnimation({
  //   targetElementQuery: ".PageSection",
  // });
  return (
    <article
      className={`PageSection ${className}`.trim()}
      // style={{ animation, opacity: visible ? 1 : 0 }}
    >
      {children}
    </article>
  );
};

export default PageSection;
