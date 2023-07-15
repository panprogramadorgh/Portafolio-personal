import { useRef } from "react";
import Card from "../generic/Card";
import { VscArrowRight } from "react-icons/vsc";
import ENV from "../../env";
import "../../stylesheets/skills/SkillCard.css";

export interface SkillCardProps {
  data: {
    skillname: string;
    level: "begginer" | "medium" | "advanced";
    imageLogo: string;
    onClickUrl: string;
  };
}

const SkillCard = ({ data }: SkillCardProps) => {
  interface ComponentInfo {
    imgPath: string;
    possibleLevelColors: {
      advanced: `#${string}`;
      medium: `#${string}`;
      begginer: `#${string}`;
    };
  }
  const componentInfoRef = useRef<ComponentInfo>({
    imgPath: `${ENV.SERVER_DOMAIN}/api/imgs/skills/${data.imageLogo}.png`,
    possibleLevelColors: {
      advanced: "#09f",
      medium: "#bf4ff7",
      begginer: "#ddd",
    },
  });

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
      onClick={() => {
        window.open(data.onClickUrl, "_BLANK");
      }}
    >
      <div className="skillname">
        Name <VscArrowRight />{" "}
        <div className="skillname-logo">
          <img
            style={{
              animation:
                data.imageLogo === "react-logo"
                  ? "react-logo-spin 10s linear infinite"
                  : undefined,
            }}
            src={componentInfoRef.current.imgPath}
            alt="skillname-logo image"
          />
          {data.skillname}
        </div>
      </div>
      <div className="level">
        Level <VscArrowRight />{" "}
        <span
          style={{
            color: componentInfoRef.current.possibleLevelColors[data.level],
          }}
        >
          {data.level}
        </span>
      </div>
    </Card>
  );
};

export default SkillCard;
