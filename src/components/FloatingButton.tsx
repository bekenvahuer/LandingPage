import React from 'react';
import agendaImg from "../assets/agendaBtn.png";
import "./FloatingButton.css";

interface FloatingButtonProps {
  onBookNow: () => void;  // ✅ Cambiar onClick → onBookNow
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onBookNow }) => {
  return (
    <div className="floating-wrapper">
      <button className="floating-btn" onClick={onBookNow}>
        <img src={agendaImg} alt="Agendar cita" />
      </button>
    </div >
  );
};

export default FloatingButton;