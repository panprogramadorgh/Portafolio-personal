import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import ProjectsTitle from "./ProjectsTitle";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import projectsData from "../../data/projects/projectsData.json";
import "../../stylesheets/projects/Projects.css";

const Projects = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Projects",
  });
  return (
    <div className="Projects" style={{ animation, opacity: visible ? 1 : 0 }}>
      <ProjectsTitle />
      <div className="projects-container">
        {(projectsData as ProjectCardProps[]).map(({ data }, index) => (
          <ProjectCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
