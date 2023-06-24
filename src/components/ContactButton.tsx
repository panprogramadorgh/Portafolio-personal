import { VscArrowRight } from "react-icons/vsc";
import Button from "./Button";

const ContactButton = () => {
  return (
    <div className="contact-button-container">
      <Button callback={() => {}}>
        Contact through this website
        <VscArrowRight />
      </Button>
    </div>
  );
};

export default ContactButton;
