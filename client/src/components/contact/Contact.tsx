import {
  useState,
  ChangeEventHandler,
  ReactNode,
  useCallback,
  createContext,
} from "react";
import VerificationCodeWindow from "./VerificationCodeWindow";
import Window from "./Window";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import Card from "../generic/Card";
import Button from "../generic/Button";
import ENV from "../../env";
import "../../stylesheets/contact/Contact.css";

export interface Inputs {
  name: string;
  email: string;
  message: string;
}

export const enum ShowWindowStates {
  contactRequestSended,
  contactRequestAccepted,
  contactRequestFailed,
  hiddenWindow,
}
export interface ShowWindow {
  state: ShowWindowStates;
  windowFadeoutAnimation: boolean;
  message?: ReactNode;
}

export type ContactContextValue = {
  verificationCodeWindow: string | null;
  setVerificationCodeWindow: (newValue: string | null) => void;
  showWindow: ShowWindow;
  setShowWindow: (newValue: ShowWindow) => void;
  inputs: Inputs;
  setInputs: (newInputs: Inputs) => void;
  updateShowWindowState: ({
    state,
    message,
  }: Omit<ShowWindow, "windowFadeoutAnimation">) => Promise<void>;
} | null;

export const ContactContext = createContext<ContactContextValue>(null);

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
    async ({ state, message }: Omit<ShowWindow, "windowFadeoutAnimation">) => {
      setShowWindow({
        state,
        windowFadeoutAnimation: false,
        message,
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      setShowWindow(
        Object.assign(showWindow, { windowFadeoutAnimation: true })
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
      setShowWindow({
        state: ShowWindowStates.hiddenWindow,
        windowFadeoutAnimation: true,
      });
      Object.assign(showWindow, { windowFadeoutAnimation: true });
    },
    []
  );

  const handleButtonClick = useCallback(async () => {
    if (showWindow.state !== ShowWindowStates.hiddenWindow) return;
    try {
      const response = await fetch(
        `${ENV.SERVER_DOMAIN}/api/email-verification`,
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
        verificationCode?: string;
      }
      const data: Data = await response.json();
      updateShowWindowState({
        state:
          data.status === 200
            ? ShowWindowStates.contactRequestSended
            : ShowWindowStates.contactRequestFailed,
        message: <>{data.message}</>,
      });
      if (data.status === 500 && !data.verificationCode) {
        return;
      }
      setVerificationCodeWindow(data.verificationCode as string);
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
        {/* Ventana emergenete */}
        {showWindow.state !== ShowWindowStates.hiddenWindow ? <Window /> : null}
      </ContactContext.Provider>
      <Title message="Here you can contact me" relevantWords={["contact"]} />
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
