import "../../stylesheets/projects/ProjectCard.css";

interface Props {
  data: {
    title: string;
    description: string;
    img: string;
    url?: string;
  };
}
const ProjectCard = ({ data }: Props) => {
  const handleClick = () => {
    window.open(data.url, "_BLANK");
  };
  return (
    <div className="ProjectCard" onClick={handleClick}>
      <div
        className="image-container"
        style={{ backgroundImage: `url(${data.img})` }}
      ></div>
      <div className="text-container">
        <b className="title">{data.title}</b>
        <p className="description">{data.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
