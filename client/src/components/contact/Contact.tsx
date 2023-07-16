import {
  useState,
  ChangeEventHandler,
  useCallback,
  createContext,
} from "react";
import {
  ContactContextInterface,
  Inputs,
  ShowWindow,
  UpdateShowWindowState,
} from "../../types/contact.d";
// componentes
import VerificationCodeWindow from "./VerificationCodeWindow";
import Window from "./Window";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import Card from "../generic/Card";
import Button from "../generic/Button";
import ENV from "../../../env";
import "../../stylesheets/contact/Contact.css";

export const ContactContext = createContext<ContactContextInterface | null>(
  null
);

export const enum ShowWindowStates {
  hiddenWindow,
  processingContactRequest,
  contactRequestAccepted,
  contactRequestFailed,
}

const Contact = () => {
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    email: "",
    message: "",
  });

  const [verificationCodeWindow, setVerificationCodeWindow] = useState<
    string | null
  >(null);

  const [showWindow, setShowWindow] = useState<ShowWindow>({
    state: ShowWindowStates.hiddenWindow,
    windowFadeoutAnimation: false,
  });

  const updateShowWindowState = useCallback(
    async ({ state, message }: UpdateShowWindowState) => {
      setShowWindow({
        state,
        windowFadeoutAnimation: false,
        message,
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      setShowWindow({ ...showWindow, windowFadeoutAnimation: true });
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
      setShowWindow({
        state: ShowWindowStates.hiddenWindow,
        windowFadeoutAnimation: false,
      });
    },
    []
  );

  const handleButtonClick = useCallback(async () => {
    if (showWindow.state !== ShowWindowStates.hiddenWindow) return;
    try {
      const response = await fetch(
        `${ENV.SERVER_DOMAIN}/api/contact/verification`,
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
        encryptedVerificationCode?: string;
      }
      const data: Data = await response.json();
      updateShowWindowState({
        state:
          data.status === 200
            ? ShowWindowStates.processingContactRequest
            : ShowWindowStates.contactRequestFailed,
        message: <>{data.message}</>,
      });
      if (data.status === 500 && !data.encryptedVerificationCode) {
        return;
      }
      setVerificationCodeWindow(data.encryptedVerificationCode as string);
    } catch (error) {
      console.error(error);
      updateShowWindowState({
        state: ShowWindowStates.contactRequestFailed,
        message: <>Something went wrong connecting to the server !</>,
      });
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
      <ContactContext.Provider
        value={{
          verificationCodeWindow,
          setVerificationCodeWindow,

          showWindow,
          setShowWindow,

          inputs,
          setInputs,

          updateShowWindowState,
        }}
      >
        {/* Ventana de verificacion de codigo */}
        {verificationCodeWindow !== null ? <VerificationCodeWindow /> : null}
        <Window />
      </ContactContext.Provider>
      <Title message="Here you can contact me" relevantWords={["contact"]} />
      <Card className="form" type="text">
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
