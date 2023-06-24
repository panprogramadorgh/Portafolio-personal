import ContactButton from "../components/ContactButton";
import Discord from "./Discord";
import { useContext, useState, useEffect } from "react";
import {
  TextContainerContext,
  TextContainerContextValue,
} from "../contexts/TextContainer.context";
import "../stylesheets/Contact.css";

const Contact = () => {
  const { showTextContainer } = useContext(
    TextContainerContext
  ) as TextContainerContextValue;

  const [animation, setAnimation] = useState<string>("none");
  const [fadeoutPlayed, setFadeoutPlayed] = useState<boolean>(true);

  useEffect(() => {
    if (showTextContainer) {
      setFadeoutPlayed(false);
      setAnimation(`fadein_contact 1s ease-in-out`);
      return;
    }
    if (fadeoutPlayed === false) {
      setAnimation(`fadeout_contact 0.1s ease-in-out`);
      new Promise((resolve) => {
        setTimeout(resolve, 80);
      }).then(() => setFadeoutPlayed(true));
    }
  }, [showTextContainer]);

  if (!showTextContainer && fadeoutPlayed) return;
  return (
    <div
      className="Contact"
      style={{
        animation,
      }}
    >
      <h1>Ways to contact me</h1>
      <Discord />
      <ContactButton />
    </div>
  );
};

export default Contact;
