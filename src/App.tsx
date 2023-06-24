import Contact from "./components/Contact";
import Title from "./components/Title";
import TextContainer from "./components/TextContainer";
import SkillsTitle from "./components/SkillsTitle";
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
              <Contact />
            </div>
            <TextContainer />
          </TextContainerContextProvider>
        </div>
      </header>
      <main className="main">
        <article className="skills">
          <section className="skills-title-container">
            <SkillsTitle />
          </section>
          <section className="skills-container">
            <Skills />
          </section>
        </article>
      </main>
    </div>
  );
}

export default App;
