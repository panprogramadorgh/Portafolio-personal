import { useState, ChangeEventHandler } from "react";
import Card from "../generic/Card";
import Button from "../generic/Button";
import "../../stylesheets/contact/VerificationCodeWindow.css";

interface Props {
  handleButtonClick: (inputValue: string) => void;
}

const VerificationCodeWindow = ({ handleButtonClick }: Props) => {
  const [input, setInput] = useState<string>("");
  const handleInputChangeEvent: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setInput(target.value);
  };

  return (
    <div className="VerificationCodeWindow">
      <Card type="text">
        <h2 className="title">Type here the verification code</h2>
        <p className="subtitle">Check your email and paste the code here</p>
        <input
          type="number"
          onChange={handleInputChangeEvent}
          value={input}
          placeholder="Verification code (example: 12345)"
        />
        <Button
          hasArrow
          callback={() => {
            handleButtonClick(input);
          }}
        >
          Verify code
        </Button>
      </Card>
    </div>
  );
};

export default VerificationCodeWindow;
