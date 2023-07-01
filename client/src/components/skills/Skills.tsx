import useComponentFadeinAnimation from "../../hooks/useComponentFadeinAnimation";
import SkillsTitle from "./SkillsTitle";
import SkillCard, { SkillCardProps } from "./SkillCard";
import skillsData from "../../data/skills/skillsData.json";
import "../../stylesheets/skills/Skills.css";

const Skills = () => {
  const { animation, visible } = useComponentFadeinAnimation({
    targetElementQuery: ".Skills",
  });

  return (
    <article className="Skills" style={{ animation, opacity: visible ? 1 : 0 }}>
      <section className="skills-title-container">
        <SkillsTitle />
      </section>
      <section className="skills-cards-container">
        {(skillsData as SkillCardProps[]).map(({ data }, index) => {
          return <SkillCard key={index} data={data} />;
        })}
      </section>
    </article>
  );
};

export default Skills;
