import logoImg from "../../public/imgs/bread.jpg";
import Logo from "./Logo";
import "../stylesheets/Discord.css";

const Discord = () => {
  const onClickUrl: string = "https://discord.com/";
  const handleUserCardClick = () => {
    window.open(onClickUrl);
  };
  return (
    <div className="Discord" onClick={handleUserCardClick}>
      <div className="imagebg"></div>
      <Logo img={logoImg} cornerPoint />
      <div className="text-container">
        <section className="module">
          <span className="name">Alvaro</span>
        </section>
        <section className="module">
          <span className="nick">@alvaro</span>
        </section>
      </div>
    </div>
  );
};

export default Discord;
