import Title from "./components/generic/Title";
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
      {/* <Title messsage="hello world que tal" relevantWorld="world" /> */}
    </div>
  );
}

export default App;
