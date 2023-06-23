import Title from "./components/Title";
import UserCard from "./components/UserCard";
import TextContainer from "./components/TextContainer";
import Skills from "./components/Skills";
import TextContainerContextProvider from "./contexts/TextContainer.context";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="info-container">
          <TextContainerContextProvider>
            <div className="title-container">
              <Title />
              <UserCard />
            </div>
            <TextContainer />
          </TextContainerContextProvider>
        </div>
        <div className="skills-container">
          <Skills />
        </div>
      </header>
    </div>
  );
}

export default App;
