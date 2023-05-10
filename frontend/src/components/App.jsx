import { relevance } from "../js/utils.js";
import Header from "./Header.jsx";
import Nav from "./Nav.jsx";
import GenericTitle from "./GenericTitle.jsx";
import Image from "./Image.jsx";
import "../stylesheets/App.css";

const App = () => {
  return (
    <div className="app">
      <Header>
        <Nav buttonsContent={["button1", "button2", "button3", "button4"]} />
        <h1 className="Header-title">Header component</h1>
        s
        <Image url="/api/imgs/bread.jpg" alt="bread component" />
        {/* <img className="Header-img" src={} alt="logo" /> */}
      </Header>
      <GenericTitle text="Hello world 123" textRelevance="hight" />
    </div>
  );
};

export default App;
