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
    return (
      <div className="Title">
        <h1 className="title">{message}</h1>
      </div>
    );
  }
  return (
    <h1 className="Title">
      {[...splitedMessage]
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
        .reverse()}
    </h1>
  );
};

export default Title;
