import Header from "./components/header/Header";
import Projects from "./components/projects/Projects";
import Skills from "./components/skills/Skills";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Skills />
        <Projects />
      </main>
    </div>
  );
}

export default App;
