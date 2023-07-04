import { useState, useEffect } from "react";
import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import ProjectsTitle from "./ProjectsTitle";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import "../../stylesheets/projects/Projects.css";

const Projects = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Projects",
  });
  const [projectsData, setProjectData] = useState<ProjectCardProps[] | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => console.error(error));
  }, []);

  let projectsContainerContent;
  if (projectsData === null) projectsContainerContent = "fetching projects...";
  else if (projectsData.length === 0) {
    projectsContainerContent = "There is projects yet :[";
  } else {
    projectsContainerContent = projectsData.map(({ data }, index) => (
      <ProjectCard key={index} data={data} />
    ));
  }

  return (
    <div className="Projects" style={{ animation, opacity: visible ? 1 : 0 }}>
      <ProjectsTitle />
      <div className="projects-container">{projectsContainerContent}</div>
    </div>
  );
};

export default Projects;
