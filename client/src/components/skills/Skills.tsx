import { useState, useEffect } from "react";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import SkillCard, { SkillCardProps } from "./SkillCard";
import ENV from "../../data/env";

import "../../stylesheets/skills/Skills.css";

const Skills = () => {
  const [skillsData, setSkillsData] = useState<SkillCardProps[] | null>(null);

  useEffect(() => {
    fetch(`${ENV.SERVER_DOMAIN}/api/skills`)
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
    <PageSection className="Skills">
      <section className="skills-title-container">
        <Title message="This are some of my skills" relevantWords={["skills"]} />
      </section>
      <section className="skills-cards-container">
        {skillsCardContainerContent}
      </section>
    </PageSection>
  );
};

export default Skills;
