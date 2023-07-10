import { useState, ChangeEventHandler, ReactNode, useCallback } from "react";
import VerificationCodeWindow from "../contact/VerificationCodeWindow";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import Card from "../generic/Card";
import Button from "../generic/Button";
import "../../stylesheets/contact/Contact.css";

const Contact = () => {
  type Inputs = {
    name: string;
    email: string;
    message: string;
  };
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    email: "",
    message: "",
  });

  const [verificationCodeWindow, setVerificationCodeWindow] = useState<
    number | null
  >(null);

  const enum ShowWindowState {
    contactRequestSended,
    contactRequestFailed,
    hiddenWindow,
  }
  interface ShowWindow {
    state: ShowWindowState;
    message?: ReactNode;
  }
  const [showWindow, setShowWindow] = useState<ShowWindow>({
    state: ShowWindowState.hiddenWindow,
  });

  const [windowFadeoutAnimation, setWindowFadeoutAnimation] =
    useState<boolean>(false);

  const updateShowWindowState = useCallback(
    async ({ state, message }: ShowWindow) => {
      setShowWindow({
        state,
        message,
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      setWindowFadeoutAnimation(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
      setShowWindow({
        state: ShowWindowState.hiddenWindow,
      });
      setWindowFadeoutAnimation(false);
    },
    []
  );

  const handleButtonClick = useCallback(() => {
    if (showWindow.state !== ShowWindowState.hiddenWindow) return;
    fetch("http://localhost:3000/api/email-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then(
        (data: {
          status: number;
          message: string;
          verificationCode?: number;
        }) => {
          if (data.status === 500) {
            updateShowWindowState({
              state: ShowWindowState.contactRequestFailed,
              message: <>{data.message}</>,
            });
            return;
          }

          /* TODO: Activar estado para mostrar ventana de verificacion de codigo y en el caso de ser correcto, limpiar estado inputs */

          updateShowWindowState({
            state: ShowWindowState.contactRequestSended,
            message: <>{data.message}</>,
          });
          setVerificationCodeWindow(data.verificationCode as number);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, [showWindow, inputs]);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    ({ target }) => {
      const newInputs = { ...inputs };
      newInputs[target.id as "name" | "email" | "message"] = target.value;
      setInputs(newInputs);
    },
    [inputs]
  );

  return (
    <PageSection className="Contact">
      {verificationCodeWindow !== null ? (
        <VerificationCodeWindow
          handleButtonClick={(inputValue) => {
            const inputValueParsed: number = Number(inputValue);
            if (inputValueParsed === verificationCodeWindow) {
              /* Si coincide */
              window.alert("El numero conincide");
              setInputs({
                name: "",
                email: "",
                message: "",
              });
              setVerificationCodeWindow(null);
              /* TODO: Hacer fetching a endpoint para postear en la base de datos contact request */
              return;
            }
            /* Si no coincide el numero */
            window.alert("El numero no coincide");
          }}
        />
      ) : null}
      {showWindow.state !== ShowWindowState.hiddenWindow ? (
        <Card
          animation={
            windowFadeoutAnimation ? "fadeout-card 0.2s ease-in-out" : undefined
          }
          type="card"
          className={`window ${
            showWindow.state === ShowWindowState.contactRequestSended
              ? "contact-request-sended"
              : "contact-request-failed"
          }`.trim()}
        >
          {showWindow.message}
        </Card>
      ) : null}
      <Title message="Here you can contact me" relevantWord="contact" />
      <Card type="text">
        <input
          onChange={handleInputChange}
          value={inputs["name"]}
          id="name"
          type="text"
          placeholder="What's your name ?"
        />
        <input
          onChange={handleInputChange}
          value={inputs["email"]}
          id="email"
          type="email"
          placeholder="What about your email ?"
        />
        <textarea
          onChange={handleInputChange}
          value={inputs["message"]}
          maxLength={1000}
          id="message"
          placeholder="Here write a message (max 1000 chars)"
        ></textarea>
        <Button hasArrow callback={handleButtonClick}>
          Send Contact Request
        </Button>
      </Card>
    </PageSection>
  );
};

export default Contact;
