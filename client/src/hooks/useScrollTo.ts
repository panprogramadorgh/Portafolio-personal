interface UseScrollToParams {
  positionToScroll: number;
  delay: number;
}

const useScrollTo = async ({ positionToScroll, delay }: UseScrollToParams) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.addEventListener("wheel", () => {
        resolve(false);
      });
      window.scrollTo({
        behavior: "smooth",
        top: positionToScroll,
      });
      setInterval(() => {
        const currentPosition: number =
          -document.body.getBoundingClientRect().top;
        if (currentPosition === positionToScroll) resolve(true);
      }, 100);
    }, delay);
  });
};

export default useScrollTo;
