import { useState, ChangeEventHandler } from "react";
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

  /* Cargar componente de targeta dependiendo de showWindow.states */
  const enum ShowWindowState {
    contactRequestSended,
    contactRequestFailed,
    hiddenWindow,
  }
  interface ShowWindow {
    state: ShowWindowState;
    message?: string;
  }
  const [showWindow, setShowWindow] = useState<ShowWindow>({
    state: ShowWindowState.hiddenWindow,
  });

  const updateShowWindowState = (
    { state, message }: ShowWindow,
    revertStateTime: number
  ) => {
    setShowWindow({
      state,
      message,
    });
    setTimeout(() => {
      setShowWindow({
        state: ShowWindowState.hiddenWindow,
      });
    }, revertStateTime);
  };

  const handleButtonClick = () => {
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
      .then((data) => {
        if (data.status === 500) {
          updateShowWindowState(
            {
              state: ShowWindowState.contactRequestFailed,
              message: "Parece que algo salio mal.",
            },
            2000
          );
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
        updateShowWindowState(
          {
            state: ShowWindowState.contactRequestSended,
            message: "Solicitud de contacto enviada.",
          },
          2000
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const newInputs = { ...inputs };
    newInputs[target.id as "name" | "email" | "message"] = target.value;
    setInputs(newInputs);
  };

  return (
    <PageSection className="Contact">
      <Title message="Here you can contact me" relevantWord="contact" />
      <Card type="text">
        <input
          onChange={handleInputChange}
          id="name"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={handleInputChange}
          id="email"
          type="email"
          placeholder="Email"
        />
        <textarea
          onChange={handleInputChange}
          maxLength={500}
          id="message"
          placeholder="Message (max 500 chars)"
        ></textarea>
        <Button hasArrow callback={handleButtonClick}>
          Send Contact Request
        </Button>
      </Card>
    </PageSection>
  );
};

export default Contact;
