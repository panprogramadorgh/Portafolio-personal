import { useState, useEffect } from "react";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import Card from "../generic/Card";
import ENV from "../../../env";
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
  const [projectsData, setProjectData] = useState<{
    status: number;
    message: ProjectData[] | string;
  } | null>(null);
  const [projectCards, setProjectCards] = useState<
    JSX.Element[] | string | null
  >(null);

  useEffect(() => {
    /* Recuperando los datos y actualizando el estado con ellos */
    fetch(`${ENV.SERVER_DOMAIN}/api/projects`)
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => {
        console.error(error);
        setProjectCards("Something went wrong connecting to the server !");
      });
  }, []);

  useEffect(() => {
    // Configurando el estado de targetas en funcion de los datos obtenidos anteriormente
    if (projectsData === null) setProjectCards("fetching projects...");
    else if (projectsData.status !== 200)
      setProjectCards(projectsData.message as string);
    else if (projectsData.message.length === 0)
      setProjectCards("There is projects yet :[");
    else {
      const jsxArray: JSX.Element[] = (
        projectsData.message as ProjectData[]
      ).map(({ data }, index) => (
        <Card
          key={index}
          type="card"
          className="project-card"
          onClick={() => {
            window.open(data.url, "_BLANK");
          }}
        >
          <div className="image-container">
            <img
              src={`${ENV.SERVER_DOMAIN}/api/imgs/projects/${data.image}`}
              alt={`${data.title}-image`}
            />
          </div>
          <div className="text-container">
            <h4 className="title">{data.title}</h4>
            <p className="description">{data.description}</p>
          </div>
        </Card>
      ));
      setProjectCards(jsxArray);
    }
  }, [projectsData]);

  return (
    <PageSection className="Projects">
      <Title message="Here some of my projects" relevantWords={["projects"]} />
      <div className="project-cards-container">{projectCards}</div>
    </PageSection>
  );
};

export default Projects;
