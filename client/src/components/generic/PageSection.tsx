import { ReactNode } from "react";
import useFadeinAnimation from "../../hooks/useFadeinAnimation";
import "../../stylesheets/generic/PageSection.css";

interface Props {
  className?: string;
  children?: ReactNode;
}

const PageSection = ({ className = "", children }: Props) => {
  const useFadeinAnimationRef = useFadeinAnimation({
    animationTime: 1.5,
  });

  return (
    <article
      ref={useFadeinAnimationRef}
      className={`PageSection ${className}`.trim()}
    >
      {children}
    </article>
  );
};

export default PageSection;
