import { useCallback, MouseEventHandler } from "react";
import Card from "../generic/Card";
import "../../stylesheets/projects/ProjectCard.css";

export interface ProjectCardProps {
  data: {
    title: string;
    description: string;
    image: string;
    url?: string;
  };
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}
const ProjectCard = ({
  data,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) => {
  const handleClick = useCallback(() => {
    window.open(data.url, "_BLANK");
  }, []);
  return (
    <Card
      type="card"
      className="ProjectCard"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
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
  );
};

export default ProjectCard;
