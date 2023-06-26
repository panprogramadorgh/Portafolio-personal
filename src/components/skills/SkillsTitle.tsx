import "../../stylesheets/skills/SkillsTitle.css";

const SkillsTitle = () => {
  return (
    <div className="SkillsTitle">
      <h1 className="title">
        This are some of my{" "}
        <span
          className="skill-word"
          style={{
            animation: "skills_word 5s ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          skills
        </span>
      </h1>
    </div>
  );
};

export default SkillsTitle;
