import { useState, useEffect, MouseEventHandler, useRef } from "react";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import Card from "../generic/Card";
// import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import "../../stylesheets/projects/Projects.css";

const Projects = () => {
  interface ProjectData {
    data: {
      title: string;
      description: string;
      image: string;
      url?: string;
    };
  }
  const [projectsData, setProjectData] = useState<ProjectData[] | null>(null);
  const [projectCards, setProjectCards] = useState<
    JSX.Element[] | string | null
  >(null);

  useEffect(() => {
    /* Recuperando los datos y actualizando el estado con ellos */
    fetch("http://localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Configurando el estado de targetas en funcion de los datos obtenidos anteriormente
    if (projectsData === null) setProjectCards("fetching projects...");
    else if (projectsData.length === 0)
      setProjectCards("There is projects yet :[");
    else {
      const jsxArray: JSX.Element[] = projectsData.map(({ data }, index) => (
        <Card
          key={index}
          type="card"
          className="project-card"
          onClick={() => {
            window.open("", "_BLANK");
          }}
        >
          <div
            className="div-image"
            style={{
              backgroundImage: `url('http://localhost:3000/api/imgs/projects/${data.image}')`,
            }}
          ></div>
          <div className="text-container">
            <b className="title">{data.title}</b>
            <p className="description">{data.description}</p>
          </div>
        </Card>
      ));
      setProjectCards(jsxArray);
    }
  }, [projectsData]);

  return (
    <PageSection className="Projects">
      <Title message="Here some of my projects" relevantWord="projects" />
      <div className="project-cards-container">{projectCards}</div>
    </PageSection>
  );
};

export default Projects;
