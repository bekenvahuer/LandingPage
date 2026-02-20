import imagenHero from "../assets/Ribot.svg";

const Hero: React.FC = () => {
  return (
    <div className="hero-svg">
      <img src={imagenHero} alt="Ribot" />
    </div>
  );
};

export default Hero;