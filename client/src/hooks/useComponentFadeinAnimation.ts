import { useState, useEffect } from "react";

interface Props {
  targetElementQuery: string;
}
const useComponentFadeinAnimation = ({
  targetElementQuery,
}: Props) => {
  const [animation, setAnimation] = useState<string>("none");
  const [visible, setVisible] = useState<boolean>(false);
  const fadeinAnimation = 'fadein 0.5s ease-in-out';
  const animationTime =
    Number(
      fadeinAnimation
        .split(" ")[1]
        .substring(0, fadeinAnimation.split(" ")[1].length - 1)
    ) * 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(async ([stuff]) => {
      const { isIntersecting } = stuff;
      if (isIntersecting) setAnimation(fadeinAnimation);
      await new Promise((resolve) => {
        setTimeout(() => {
          if (isIntersecting) setVisible(true);
          resolve(null);
        }, animationTime);
      });
    }, {});
    observer.observe(document.querySelector(targetElementQuery) as Element);
  }, []);

  return {
    animation,
    visible,
  };
};

export default useComponentFadeinAnimation;
