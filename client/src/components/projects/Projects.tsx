import { useState, useEffect } from "react";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import "../../stylesheets/projects/Projects.css";

const Projects = () => {
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
    <PageSection className="Projects">
      <Title message="Here some of my projects" relevantWord="projects" />
      <div className="projects-container">{projectsContainerContent}</div>
    </PageSection>
  );
};

export default Projects;
