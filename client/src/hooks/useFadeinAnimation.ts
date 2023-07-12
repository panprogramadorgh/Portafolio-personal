import { useEffect, useRef } from "react";

interface Props {
  animationTime: number;
}
const useFadeinAnimation = ({ animationTime }: Props) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([IntersectionObserverEntry], IntersectionObserverRef) => {
        if (IntersectionObserverEntry.isIntersecting) {
          IntersectionObserverEntry.target.setAttribute(
            "style",
            `animation: fadein ${animationTime}s ease-in-out; opacity: 1`
          );
          IntersectionObserverRef.unobserve(IntersectionObserverEntry.target);
        }
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return ref;
};

export default useFadeinAnimation;
