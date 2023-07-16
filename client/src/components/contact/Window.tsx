import { useContext, useEffect, useRef, useState } from "react";
// components
import Card from "../generic/Card";
import { ContactContext, ShowWindowStates } from "./Contact";
import "../../stylesheets/contact/Window.css";

const Window = () => {
  const { showWindow } = useContext(ContactContext)!;
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(showWindow.message);
  const classNames = useRef<string[]>([
    "hidden-window",
    "processing-contact-request",
    "contact-request-accepted",
    "contact-request-failed",
  ]);

  useEffect(() => {
    if (showWindow.state === ShowWindowStates.hiddenWindow) {
      setTimeout(() => {
        setVisible(false);
      }, 180);
    } else setVisible(true);
  }, [showWindow.state]);

  useEffect(() => {
    if (showWindow.message) {
      setMessage(showWindow.message);
    }
  }, [showWindow.message]);

  if (visible === false) return;

  return (
    <Card
      animation={
        showWindow.windowFadeoutAnimation
          ? "fadeout-window 0.2s ease-in-out"
          : undefined
      }
      type="card"
      className={`Window ${classNames.current[showWindow.state]}`.trim()}
    >
      {message}
    </Card>
  );
};

export default Window;
