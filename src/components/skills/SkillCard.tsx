import Card from "../generic/Card";
import { AiOutlineLine } from "react-icons/ai";
import "../../stylesheets/skills/SkillCarad.css";

interface Props {
  name: string;
  image: string;
  level: "begginer" | "medium" | "advanced";
  onClickUrl?: string;
}

const SkillCard = ({ name, image, level, onClickUrl }: Props) => {
  const possibleLevelColors = {
    advanced: "#f2d40f",
    medium: "#bf4ff7",
    begginer: "#09f",
  };
  const handleClick = () => {
    if (onClickUrl) {
      window.open(onClickUrl, "_BLANK");
      return;
    }
  };
  return (
    <Card
      type="card"
      className={`SkillCard ${level === "advanced" ? "gold" : ""}`.trim()}
      onClick={handleClick}
    >
      <p className="name">
        Name <AiOutlineLine />{" "}
        <div className="name-logo">
          <img className="image" src={image} alt={name} />
          {name}
        </div>
      </p>
      <p className="level">
        Level <AiOutlineLine />{" "}
        <span style={{ color: possibleLevelColors[level] }}>{level}</span>
      </p>
    </Card>
  );
};

export default SkillCard;
