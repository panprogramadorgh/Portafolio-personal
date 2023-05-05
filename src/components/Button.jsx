import "../stylesheets/Button.css";

const Button = ({
  children = "new Button",
  className = null,
  action = null,
  linkButton = null,
}) => {
  return linkButton ? (
    <a
      className={`Button ${className ? className : ""}`.trim()}
      href={linkButton}
    >
      {children}
    </a>
  ) : (
    <button
      className={`Button ${className ? className : ""}`.trim()}
      onClick={action}
    >
      {children}
    </button>
  );
};

export default Button;
