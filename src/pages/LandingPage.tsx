import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Importar useNavigate
import Hero from "../components/Hero";
import ImageBlock from "../components/ImageBlock";
import TextBlock from "../components/TextBlock";
import ChatBlock from "../components/ChatBlock";
import CTASection from "../components/CTASection";
import imagenHero from "../assets/Ribot.png";
import imagenHero2 from "../assets/Ribot2.png";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();  // ✅ Hook para navegar

  const handleBookNow = () => {
    navigate('/booking');  // ✅ Navegar a /booking
  };
  return (
    <div className="landing-container">

      <div className="sectionTitle">
        <Hero />
      </div>

      <div className="section">
        <ImageBlock
          src={imagenHero}
          alt="Imagen 1"
        />
      </div>

      <div className="sectionChat">
        <ChatBlock />
      </div>

      <div className="sectionInfo">
        <TextBlock
          titles={[
            ["Transforma", "tu Eficiencia", "con IA Local"],
            ["Con Ribot", "Automatiza", "las reservas", "de", "Citas"],
            ["Administra", "Tareas", "24/7", "a un", "bajo Costo"],
            ["Con Ribot", "Transforma", "tus flujos", "de", "trabajo", "eficientemente"],
            ["Con Ribot", "Automatiza", "la revision", "de", "Comprobantes", "de Pago"],
            ["Con Ribot", "Almacena", "el historial", "de tus", "Clientes", "de forma", "Local "],
          ]}
          text=""
        />
      </div>

      <div className="section">
        <ImageBlock
          src={imagenHero2}
          alt="Imagen 2"
        />
      </div>

      {/* ✅ Ahora onBookNow sí existe */}
      <div className="sectionFooter">
        <CTASection onBookNow={handleBookNow} />
      </div>

    </div>
  );
};

export default LandingPage;