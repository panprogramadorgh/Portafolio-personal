import logoImg from "../../public/imgs/bread.jpg";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import {
  TextContainerContext,
  TextContainerContextValue,
} from "../contexts/TextContainer.context";
import "../stylesheets/UserCard.css";

const UserCard = () => {
  const { showTextContainer } = useContext(
    TextContainerContext
  ) as TextContainerContextValue;

  const [animation, setAnimation] = useState<string>("none");
  const [fadeoutPlayed, setFadeoutPlayed] = useState<boolean>(true);

  useEffect(() => {
    if (showTextContainer) {
      setFadeoutPlayed(false);
      setAnimation(`fadein_usercard 1s ease-in-out`);
      return;
    }
    if (fadeoutPlayed === false) {
      setAnimation(`fadeout_usercard 0.1s ease-in-out`);
      new Promise((resolve) => {
        setTimeout(resolve, 80);
      }).then(() => setFadeoutPlayed(true));
    }
  }, [showTextContainer]);

  if (!showTextContainer && fadeoutPlayed) return;
  return (
    <div
      className="UserCard"
      style={{
        animation,
      }}
    >
      <div className="imagebg"></div>
      <Logo img={logoImg} />
      <b>Alvaro</b>
    </div>
  );
};

export default UserCard;
