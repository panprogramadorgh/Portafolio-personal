import { useState, useEffect, MouseEventHandler } from "react";
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

  const [bgVisible, setBgVisible] = useState<boolean>(false);
  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    (target as HTMLElement).classList.remove("unselected");
    (target as HTMLElement).classList.add("selected");
    setBgVisible(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    (target as HTMLElement).classList.remove("selected");
    (target as HTMLElement).classList.add("unselected");
    setBgVisible(false);
  };

  let projectsContainerContent: string | JSX.Element[];
  if (projectsData === null) projectsContainerContent = "fetching projects...";
  else if (projectsData.length === 0) {
    projectsContainerContent = "There is projects yet :[";
  } else {
    projectsContainerContent = projectsData.map(({ data }, index) => (
      <ProjectCard
        key={index}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data={data}
      />
    ));
  }

  return (
    <PageSection className="Projects">
      {bgVisible ? <div className="background"></div> : null}
      <Title message="Here some of my projects" relevantWord="projects" />
      <div className="projects-container">{projectsContainerContent}</div>
    </PageSection>
  );
};

export default Projects;
