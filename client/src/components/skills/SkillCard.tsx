import Card from "../generic/Card";
import { AiOutlineLine } from "react-icons/ai";
import { VscArrowRight } from "react-icons/vsc";

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
  const imgPath = `http://localhost:3000/api/imgs/skills/${data.imageLogo}.png`;
  const possibleLevelColors = {
    advanced: "#09f",
    medium: "#bf4ff7",
    begginer: "#ddd",
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
      className={`SkillCard ${
        data.level === "advanced"
          ? "gold"
          : data.level === "medium"
          ? "medium"
          : ""
      }`.trim()}
      onClick={handleClick}
    >
      <div className="skillname">
        Name <VscArrowRight />{" "}
        <div className="skillname-logo">
          <img src={imgPath} alt="skillname-logo image" />
          {data.skillname}
        </div>
      </div>
      <div className="level">
        Level <VscArrowRight />{" "}
        <span style={{ color: possibleLevelColors[data.level] }}>
          {data.level}
        </span>
      </div>
    </Card>
  );
};

export default SkillCard;
