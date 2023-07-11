import { useMemo } from "react";
import "../../stylesheets/generic/Title.css";

interface Props {
  message: string;
  relevantWord?: string;
}

const Title = ({
  relevantWord = "relevant-word-unassigned",
  message,
}: Props) => {
  const splitedMessage = message.split(relevantWord);
  if (splitedMessage.length === 1) {
    return <div className="Title">message</div>;
  }
  const formattedTitleContent = useMemo(() => {
    return [...splitedMessage]
      .reverse()
      .map((messagePiece, index) => {
        if (index !== 0) {
          if (messagePiece !== "") {
            return (
              <>
                {messagePiece}
                <span className="relevant-word">{relevantWord}</span>
              </>
            );
          }
        }
        return messagePiece;
      })
      .filter((arr) => arr !== undefined)
      .reverse();
  }, []);
  return <h1 className="Title">{formattedTitleContent}</h1>;
};

export default Title;
