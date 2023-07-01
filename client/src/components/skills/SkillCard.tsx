import skillImages from "../../data/skills/skillImages";
import Card from "../generic/Card";
import { AiOutlineLine } from "react-icons/ai";
import "../../stylesheets/skills/SkillCard.css";

export interface SkillCardProps {
  data: {
    skillname: string;
    level: "begginer" | "medium" | "advanced";
    imageLogo: string;
    onClickUrl?: string;
  };
}

const SkillCard = ({ data }: SkillCardProps) => {
  const possibleLevelColors = {
    advanced: "#f2d40f",
    medium: "#bf4ff7",
    begginer: "#09f",
  };
  const handleClick = () => {
    if (data.onClickUrl) {
      window.open(data.onClickUrl, "_BLANK");
      return;
    }
  };
  return (
    <Card
      type="card"
      className={`SkillCard ${data.level === "advanced" ? "gold" : ""}`.trim()}
      onClick={handleClick}
    >
      <p className="skillname">
        Name <AiOutlineLine />{" "}
        <div className="skillname-logo">
          <img
            src={skillImages[data.imageLogo]}
            alt="skillname-logo image"
          />
          {data.skillname}
        </div>
      </p>
      <p className="level">
        Level <AiOutlineLine />{" "}
        <span style={{ color: possibleLevelColors[data.level] }}>
          {data.level}
        </span>
      </p>
    </Card>
  );
};

export default SkillCard;
