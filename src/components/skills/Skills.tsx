// skills images
import jsLogo from "../../imgs/skills/js-logo.png";
import tsLogo from "../../imgs/skills/ts-logo.png";
import HTMLLogo from "../../imgs/skills/html-logo.png";
import CSSLogo from "../../imgs/skills/css-logo.png";
import nodeLogo from "../../imgs/skills/node-logo.png";
import expressLogo from "../../imgs/skills/express-logo.png";
import reactLogo from "../../imgs/skills/react-logo.png";
import nextLogo from "../../imgs/skills/next-logo.png";
import mongoLogo from "../../imgs/skills/mongo-logo.ico";
import csharpLogo from "../../imgs/skills/csharp-logo.png";
import pythonLogo from "../../imgs/skills/py-logo.png";
import gitLogo from "../../imgs/skills/git-logo.png";
import cLogo from "../../imgs/skills/c-logo.png";
import vscLogo from "../../imgs/skills/vsc-logo.png";
//
import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import SkillsTitle from "./SkillsTitle";
import SkillCard from "./SkillCard";
import "../../stylesheets/skills/Skills.css";

const Skills = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Skills",
    fadeinAnimation: "fadein_skills 0.5s ease-in-out",
  });
  return (
    <article className="Skills" style={{ animation, opacity: visible ? 1 : 0 }}>
      <section className="skills-title-container">
        <SkillsTitle />
      </section>
      <section className="skills-cards-container">
        <SkillCard
          name="JavaScript"
          image={jsLogo}
          level="advanced"
          onClickUrl="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        />
        <SkillCard
          name="TypeScript"
          image={tsLogo}
          level="advanced"
          onClickUrl="https://www.typescriptlang.org"
        />
        <SkillCard
          name="HTML"
          image={HTMLLogo}
          level="advanced"
          onClickUrl="https://developer.mozilla.org/en-US/docs/Web/HTML"
        />
        <SkillCard name="CSS" image={CSSLogo} level="medium" onClickUrl="https://developer.mozilla.org/en-US/docs/Web/CSS" />
        <SkillCard
          name="Node.JS"
          image={nodeLogo}
          level="advanced"
          onClickUrl="https://nodejs.org/en/docs"
        />
        <SkillCard
          name="Express.JS"
          image={expressLogo}
          level="medium"
          onClickUrl="https://expressjs.com/es/"
        />
        <SkillCard
          name="React.JS"
          image={reactLogo}
          level="medium"
          onClickUrl="https://react.dev/"
        />
        <SkillCard
          name="Next.JS"
          image={nextLogo}
          level="begginer"
          onClickUrl="https://nextjs.org/"
        />
        <SkillCard
          name="MongoDB"
          image={mongoLogo}
          level="begginer"
          onClickUrl="https://www.mongodb.com/"
        />
        <SkillCard
          name="C-Sharp"
          image={csharpLogo}
          level="begginer"
          onClickUrl="https://learn.microsoft.com/en-us/dotnet/csharp/"
        />
        <SkillCard
          name="Python"
          image={pythonLogo}
          level="advanced"
          onClickUrl="https://www.python.org"
        />
        <SkillCard
          name="Git"
          image={gitLogo}
          level="medium"
          onClickUrl="https://git-scm.com/doc"
        />
        <SkillCard
          name="C (1972)"
          image={cLogo}
          level="begginer"
          onClickUrl="https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)"
        />
        <SkillCard
          name="VSCode"
          image={vscLogo}
          level="advanced"
          onClickUrl="https://code.visualstudio.com/"
        />
      </section>
    </article>
  );
};

export default Skills;
