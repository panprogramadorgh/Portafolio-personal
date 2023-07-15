import { useContext } from "react";
import Card from "../generic/Card";
import { ContactContext, ShowWindowStates, ShowWindow } from "./Contact";

const Window = () => {
  const {
    showWindow,
    windowFadeoutAnimation,
  }: {
    showWindow: ShowWindow;
    windowFadeoutAnimation: boolean;
  } = useContext(ContactContext) as any;

  // TODO: Implementar de nuevo la logica para animacion fadeout del comonente
  return (
    <Card
      animation={
        windowFadeoutAnimation ? "fadeout-card 0.2s ease-in-out" : undefined
      }
      type="card"
      className={`window ${
        showWindow.state === ShowWindowStates.contactRequestSended
          ? "contact-request-sended"
          : showWindow.state === ShowWindowStates.contactRequestAccepted
          ? "contact-request-accepted"
          : "contact-request-failed"
      }`.trim()}
    >
      {showWindow.message}
    </Card>
  );
};

export default Window;
