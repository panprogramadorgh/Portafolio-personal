import { useCallback, useState, ChangeEventHandler, useContext } from "react";
import CryptoJS from "crypto-js";
import useScrollTo from "../../hooks/useScrollTo";
import { VscChromeClose } from "react-icons/vsc";
import {
  ContactContext,
  ShowWindowStates,
  ShowWindow,
  Inputs,
} from "./Contact";
import Card from "../generic/Card";
import Button from "../generic/Button";
import ENV from "../../../env";
import "../../stylesheets/contact/VerificationCodeWindow.css";

const VerificationCodeWindow = () => {
  const {
    updateShowWindowState,
    verificationCodeWindow,
    setVerificationCodeWindow,
    inputs,
    setInputs,
  }: {
    updateShowWindowState: ({
      state,
      message,
    }: Omit<ShowWindow, "windowFadeoutAnimation">) => Promise<void>;
    verificationCodeWindow: string | null;
    setVerificationCodeWindow: (newValue: string | null) => void;
    inputs: Inputs;
    setInputs: (newInputs: Inputs) => void;
  } = useContext(ContactContext) as any;

  const [input, setInput] = useState<string>("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);

  const handleInputChangeEvent: ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      setInput(target.value);
      setInvalidCode(false);
    }, []);

  const handleVerifyButtonClick = async (inputValue: string) => {
    // FIXME: Arreglar sistema des encriptacion

    const verificationCode = CryptoJS.AES.decrypt(
      verificationCodeWindow as string,
      ENV.ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);

    console.log(verificationCode);

    if (inputValue === verificationCode) {
      try {
        await fetch(`${ENV.SERVER_DOMAIN}/api/contact/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
      } catch {
        console.error("Failed to send the contact request !");
        await updateShowWindowState({
          state: ShowWindowStates.contactRequestFailed,
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
        state: ShowWindowStates.contactRequestAccepted,
        message: <>Contact request accepted !</>,
      });

      useScrollTo({
        positionToScroll: 0,
        delay: 500,
      });
      return true;
    }
    return false;
  };

  return (
    <div className="VerificationCodeWindow">
      <Card type="text">
        <div className="close-window-button-container">
          <VscChromeClose
            onClick={async () => {
              setInputs({
                name: "",
                email: "",
                message: "",
              });
              setVerificationCodeWindow(null);
              await updateShowWindowState({
                state: ShowWindowStates.contactRequestFailed,
                message: <>Email verification canceled</>,
              });
            }}
          />
        </div>
        <h2 className="title">Type here the verification code</h2>
        <p className="subtitle">Check your email and paste the code here</p>
        <input
          className={`input ${invalidCode ? "wrong" : ""}`.trim()}
          type="number"
          onChange={handleInputChangeEvent}
          value={input}
          placeholder="Verification code (example: 12345)"
        />
        <Button
          hasArrow
          callback={useCallback(async () => {
            const codeIsCorrect = await handleVerifyButtonClick(input);
            if (!codeIsCorrect) {
              setInput("");
              setInvalidCode(true);
            }
          }, [input])}
        >
          Verify code
        </Button>
      </Card>
    </div>
  );
};

export default VerificationCodeWindow;
