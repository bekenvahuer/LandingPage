import { useState } from "react";
import agendaImg from "../assets/agendaBtn.png";
import "./FloatingButton.css";

const FloatingButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="floating-wrapper">
      <button
        className={`floating-btn ${isActive ? "rotated" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <img src={agendaImg} alt="Agendar cita" />
      </button>
    </div>
  );
};

export default FloatingButton;