import { ReactNode } from "react";
import useFadeinAnimation from "../../hooks/useFadeinAnimation";
import "../../stylesheets/generic/PageSection.css";

interface Props {
  className?: string;
  children?: ReactNode;
}

const PageSection = ({ className = "", children }: Props) => {
  const ref = useFadeinAnimation({
    animationTime: 0.5,
  });

  return (
    <article ref={ref} className={`PageSection ${className}`.trim()}>
      {children}
    </article>
  );
};

export default PageSection;
