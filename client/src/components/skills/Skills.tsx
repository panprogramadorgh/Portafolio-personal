import { useState, useEffect } from "react";
import Title from "../generic/Title";
import PageSection from "../generic/PageSection";
import SkillCard, { SkillCardProps } from "./SkillCard";
import ENV from "../../../env";

import "../../stylesheets/skills/Skills.css";

const Skills = () => {
  const [skillsData, setSkillsData] = useState<{
    status: number;
    message: SkillCardProps[] | string;
  } | null>(null);
  const [skillCards, setSkillCards] = useState<JSX.Element[] | string | null>(
    null
  );

  useEffect(() => {
    fetch(`${ENV.SERVER_DOMAIN}/api/skills`)
      .then((response) => response.json())
      .then((data) => setSkillsData(data))
      .catch((error) => {
        console.error(error);
        setSkillCards("Something went wrong connecting to the server !");
      });
  }, []);

  useEffect(() => {
    if (skillsData === null) setSkillCards("Fetching skills...");
    else if (skillsData.status !== 200)
      setSkillCards(skillsData.message as string);
    else if (skillsData.message.length === 0)
      setSkillCards("There is no skills :[");
    else {
      const jsxArr: JSX.Element[] = (
        skillsData.message as SkillCardProps[]
      ).map(({ data }, index) => {
        return <SkillCard key={index} data={data} />;
      });
      setSkillCards(jsxArr);
    }
  }, [skillsData]);

  return (
    <PageSection className="Skills">
      <section className="skills-title-container">
        <Title
          message="This are some of my skills"
          relevantWords={["skills"]}
        />
      </section>
      <section className="skills-cards-container">{skillCards}</section>
    </PageSection>
  );
};

export default Skills;
