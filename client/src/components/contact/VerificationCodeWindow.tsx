import { VscChromeClose } from "react-icons/vsc";
import { useState, ChangeEventHandler } from "react";
import Card from "../generic/Card";
import Button from "../generic/Button";
import "../../stylesheets/contact/VerificationCodeWindow.css";

interface Props {
  handleButtonClick: (inputValue: string) => Promise<boolean>;
  handleCloseButtonClick: () => void;
}

const VerificationCodeWindow = ({
  handleButtonClick,
  handleCloseButtonClick,
}: Props) => {
  const [input, setInput] = useState<string>("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);

  const handleInputChangeEvent: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setInput(target.value);
    setInvalidCode(false);
  };

  return (
    <div className="VerificationCodeWindow">
      <Card type="text">
        <div className="close-window-button-container">
          <VscChromeClose onClick={handleCloseButtonClick} />
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
          callback={async () => {
            const condition = await handleButtonClick(input);
            if (!condition) {
              setInput("");
              setInvalidCode(true);
            }
          }}
        >
          Verify code
        </Button>
      </Card>
    </div>
  );
};

export default VerificationCodeWindow;
