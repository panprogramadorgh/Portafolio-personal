import "../stylesheets/Header.css";

const Header = ({ children }) => {
  return (
    <header className="Header">
      {children}
    </header>
  );
};

export default Header;
