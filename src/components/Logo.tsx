import "../stylesheets/Logo.css";

interface Props {
  className?: string;
  img: string;
  cornerPoint?: boolean;
}
const Logo = ({ className = "", img, cornerPoint }: Props) => {
  return (
    <div className={`Logo ${className}`}>
      {cornerPoint ? <div className="corner-point"></div> : null}
      <img src={img} />
    </div>
  );
};

export default Logo;
