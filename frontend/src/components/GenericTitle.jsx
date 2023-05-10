import "../stylesheets/GenericTitle.css";
import { relevance } from "../js/utils.js";

/* metrics for relevance
    low: Symbol(), // p
    lowMedium: Symbol(), // h4
    medium: Symbol(), // h3
    mediumHigh: Symbol(), // h2
    high: Symbol(), // h1
*/

const GenericTitle = ({
  text = "text",
  className = null,
  textRelevance = relevance.low,
}) => {
  const defaultElement = (
    <p className={`GenericTitle ${className ? className : ""}`.trim()}>
      {text}
    </p>
  );
  switch (textRelevance) {
    case relevance.low:
      return defaultElement;
    case relevance.lowMedium:
      return (
        <h4 className={`GenericTitle ${className ? className : ""}`.trim()}>
          {text}
        </h4>
      );
    case relevance.medium:
      return (
        <h3 className={`GenericTitle ${className ? className : ""}`.trim()}>
          {text}
        </h3>
      );
    case relevance.mediumHigh:
      return (
        <h2 className={`GenericTitle ${className ? className : ""}`.trim()}>
          {text}
        </h2>
      );
    case relevance.high:
      return (
        <h1 className={`GenericTitle ${className ? className : ""}`.trim()}>
          {text}
        </h1>
      );

    default:
      return defaultElement;
  }
};

export default GenericTitle;
