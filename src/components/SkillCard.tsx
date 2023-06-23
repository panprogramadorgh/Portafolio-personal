interface Props {
  skillName: string;
  level: "basic" | "medium" | "advanced";
  img: typeof Image;
}

const SkillCard = ({ skillName, level, img }: Props) => {
  return <div>SkillCard</div>;
};

export default SkillCard;
