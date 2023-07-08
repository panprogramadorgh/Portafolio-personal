import { useState, ChangeEventHandler, ReactNode, useCallback } from "react";
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

  const [windowFadeoutAnimation, setWindowFadeoutAnimation] =
    useState<boolean>(false);

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
    const trimmedInputs = Object.fromEntries(
      Object.entries({ ...inputs }).map(([key, value]) => {
        return [key, value.trim()];
      })
    );
    fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trimmedInputs),
    })
      .then((response) => response.json())
      .then((data: { status: number; message: string }) => {
        if (data.status === 500) {
          updateShowWindowState({
            state: ShowWindowState.contactRequestFailed,
            message: (
              <>
                Something seems to be wrong !
                <span>* Invalid email or empty fields</span>
              </>
            ),
          });
          return;
        }
        const { name, email, message } = Object.fromEntries(
          Object.entries({ ...inputs }).map(([key]) => {
            return [key, ""];
          })
        );
        setInputs({
          name,
          email,
          message,
        });
        updateShowWindowState({
          state: ShowWindowState.contactRequestSended,
          message: <>{data.message}</>,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showWindow, inputs]);
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const newInputs = { ...inputs };
    newInputs[target.id as "name" | "email" | "message"] = target.value;
    setInputs(newInputs);
  };

  return (
    <PageSection className="Contact">
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
