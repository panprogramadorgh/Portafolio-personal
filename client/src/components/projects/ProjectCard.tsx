import Card from "../generic/Card";
import "../../stylesheets/projects/ProjectCard.css";

export interface ProjectCardProps {
  data: {
    title: string;
    description: string;
    image: string;
    url?: string;
  };
}
const ProjectCard = ({ data }: ProjectCardProps) => {
  const handleClick = () => {
    window.open(data.url, "_BLANK");
  };
  return (
    <Card type="card" className="ProjectCard" onClick={handleClick}>
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
