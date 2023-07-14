import { useState, useEffect } from "react";
import "../../stylesheets/generic/Title.css";

interface Props {
  message: string;
  relevantWords?: string[];
}

const Title = ({ relevantWords, message }: Props) => {
  const [titleContent, setTitleContent] = useState<
    JSX.Element[] | JSX.Element | null
  >(null);

  useEffect(() => {
    const splitedMessage = message.split(" ");
    if (splitedMessage.length === 1 || !relevantWords)
      setTitleContent(<div className="Title">{message}</div>);
    else {
      const formattedMessage: JSX.Element[] = splitedMessage.map(
        (word, index) => {
          const coincidencesWithRelevantWords: number | undefined =
            relevantWords.find((relevantWord) => relevantWord === word)?.length;

          if (coincidencesWithRelevantWords) {
            return (
              <span key={index} className="relevant-word">
                {index !== 0 ? " " : null}
                {word}
              </span>
            );
          } else {
            return (
              <span key={index}>
                {index !== 0 ? " " : null}
                {word}
              </span>
            );
          }
        }
      );

      setTitleContent(formattedMessage);
    }
  }, [message, relevantWords]);

  return <h1 className="Title">{titleContent}</h1>;
};

export default Title;
