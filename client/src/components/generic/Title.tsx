import "../../stylesheets/generic/Title.css";

interface Props {
  message: string;
  relevantWorld: string;
}

const Title = ({ relevantWorld, message }: Props) => {
  const splitedMessage = message.split(relevantWorld);
  if (splitedMessage.length === 1) {
    return (
      <div className="Title">
        <h1 className="title">{message}</h1>
      </div>
    );
  }
  const matriz = [...splitedMessage]
    .reverse()
    .map((messagePiece, index) => {
      if (index !== 0) {
        if (messagePiece !== "") {
          return [
            <h1 className="title">{messagePiece}</h1>,
            <span className="relevant-word">{relevantWorld}</span>,
          ];
        }
      }
      return <h1 className="title">{messagePiece}</h1>;
    })
    .filter((arr) => arr !== undefined)
    .reverse();
  return <div className="Title">{matriz.flat()}</div>;
};

export default Title;
