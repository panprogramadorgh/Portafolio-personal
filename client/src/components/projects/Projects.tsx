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
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("click", projectCardUnfocus);
    fetch("http://localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => console.error(error));

    /* */

    if (projectsData === null) setProjectCards("fetching projects...");
    else if (projectsData instanceof Array && projectsData.length === 0) {
      setProjectCards("There is projects yet :[");
    } else if (projectsData instanceof Array && projectsData.length > 0) {
      const jsxArray = projectsData.map(({ data }, index) => (
        <Card
          key={index}
          type="card"
          className="projectCard"
          onMouseEnter={handleMouseEnter}
          onClick={() => {
            window.open("", "_BLANK");
          }}
        >
          <div
            className="image-container"
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
  }, []);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    if (bgRef.current) {
      bgRef.current.style.animation = "fadein 0.35s ease";
      bgRef.current.style.display = "block";
    }
  };

  const projectCardUnfocus = () => {
    if (bgRef.current) {
      bgRef.current.style.animation = "fadeout 0.2s ease";
    }
    setTimeout(() => {
      if (bgRef.current) {
        bgRef.current.style.display = "none";
      }
    }, 180);
  };

  return (
    <PageSection className="Projects">
      <div className="background" ref={bgRef}></div>
      <Title message="Here some of my projects" relevantWord="projects" />
      <div className="projects-container">{projectCards}</div>
    </PageSection>
  );
};

export default Projects;
