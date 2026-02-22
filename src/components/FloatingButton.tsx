import React from 'react';
import { useNavigate } from 'react-router-dom';
import agendaImg from "../assets/agendaBtn.png";
import "./FloatingButton.css";

const FloatingButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="floating-wrapper">
      <button className="floating-btn" onClick={() => navigate('/booking')}>
        <img src={agendaImg} alt="Agendar cita" />
      </button>
    </div >
  );
};

export default FloatingButton;