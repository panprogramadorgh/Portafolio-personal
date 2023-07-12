import { useState, ChangeEventHandler, ReactNode, useCallback } from "react";
import useScrollTo from "../../hooks/useScrollTo";
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
    contactRequestAccepted,
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

  const handleButtonClick = useCallback(async () => {
    if (showWindow.state !== ShowWindowState.hiddenWindow) return;
    try {
      const response = await fetch(
        "http://localhost:3000/api/email-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );
      interface Data {
        status: number;
        message: string;
        verificationCode?: number;
      }
      const data: Data = await response.json();
      updateShowWindowState({
        state:
          data.status === 200
            ? ShowWindowState.contactRequestSended
            : ShowWindowState.contactRequestFailed,
        message: <>{data.message}</>,
      });
      if (data.status === 500 && !data.verificationCode) {
        return;
      }
      setVerificationCodeWindow(data.verificationCode as number);
    } catch (error) {
      console.log(error);
    }
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
          handleCloseButtonClick={() => {
            setInputs({
              name: "",
              email: "",
              message: "",
            });
            setVerificationCodeWindow(null);
            updateShowWindowState({
              state: ShowWindowState.contactRequestFailed,
              message: <>Email verification canceled</>,
            });
          }}
          handleVerfyButtonClick={async (inputValue: string) => {
            const inputValueParsed: number = Number(inputValue);
            if (inputValueParsed === verificationCodeWindow) {
              try {
                await fetch("http://localhost:3000/api/contact-request", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(inputs),
                });
              } catch {
                console.error("Failed to send the contact request !");
                updateShowWindowState({
                  state: ShowWindowState.contactRequestFailed,
                  message: <>Failed to send the contact request !</>,
                });
              }

              setInputs({
                name: "",
                email: "",
                message: "",
              });
              setVerificationCodeWindow(null);
              updateShowWindowState({
                state: ShowWindowState.contactRequestAccepted,
                message: <>Contact request accepted !</>,
              });

              useScrollTo({
                positionToScroll: 0,
                delay: 500,
              });

              // lo que retorna la funcion solamente tiene un proposito informativo para el usuario (muestra una targeta)
              return true;
            }
            return false;
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
              : showWindow.state === ShowWindowState.contactRequestAccepted
              ? "contact-request-accepted"
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
