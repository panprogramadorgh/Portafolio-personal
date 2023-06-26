import jsLogo from "../../imgs/skills/js-logo.png";

import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import ProjectsTitle from "./ProjectsTitle";
import ProjectCard from "./ProjectCard";
import "../../stylesheets/projects/Projects.css";

const Projects = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Projects",
    fadeinAnimation: "fadein_projects 1s ease-in-out",
  });
  return (
    <div className="Projects" style={{ animation, opacity: visible ? 1 : 0 }}>
      <ProjectsTitle />
      <div className="projects-container">
        {new Array(10).fill(null).map(() => (
          <ProjectCard
            data={{
              title: "Click Counter",
              description: "A simple click counter react application",
              url: "about:blank",
              img: jsLogo,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
