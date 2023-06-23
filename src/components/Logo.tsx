import "../stylesheets/Logo.css";

interface Props {
  className?: string;
  img: string;
}
const Logo = ({ className = "", img }: Props) => {
  return (
    <div className={`Logo ${className}`}>
      <img src={img} />
    </div>
  );
};

export default Logo;
