import { useState, useEffect } from "react";
import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import SkillsTitle from "./SkillsTitle";
import SkillCard, { SkillCardProps } from "./SkillCard";
// import skillsData from "../../data/skills/skillsData.json";
import "../../stylesheets/skills/Skills.css";

const Skills = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Skills",
  });
  const [skillsData, setSkillsData] = useState<SkillCardProps[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/skills")
      .then((response) => response.json())
      .then((data) => setSkillsData(data))
      .catch((error) => console.error(error));
  }, []);

  let skillsCardContainerContent;
  if (skillsData === null) skillsCardContainerContent = "fetching skills...";
  else if (skillsData.length === 0)
    skillsCardContainerContent = "There is no skills :[";
  else {
    skillsCardContainerContent = skillsData.map(({ data }, index) => {
      return <SkillCard key={index} data={data} />;
    });
  }

  return (
    <article className="Skills" style={{ animation, opacity: visible ? 1 : 0 }}>
      <section className="skills-title-container">
        <SkillsTitle />
      </section>
      <section className="skills-cards-container">
        {skillsCardContainerContent}
      </section>
    </article>
  );
};

export default Skills;
