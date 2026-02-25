import React from 'react';
import type { ConfirmationProps } from '../../types/booking';

const Confirmation: React.FC<ConfirmationProps> = ({ bookingData, onBackToHome }) => {
  const { service, date, time } = bookingData;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="step-container confirmation animate-fade-in">
      <div className="header">
        <div className="success-icon">✓</div>
        <h1>¡Reserva Confirmada!</h1>
        <p>Tu cita ha sido programada</p>
      </div>

      <div className="booking-summary">
        <div className="summary-section">
          <h3>SERVICIO</h3>
          <p>{service?.nickname}</p>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="icon">📅</span>
            <div><strong>FECHA</strong><p>{formatDate(bookingData.date)}</p></div>
          </div>
          <div className="summary-item">
            <span className="icon">🕐</span>
            <div><strong>HORA</strong><p>{time}</p></div>
          </div>
        </div>
        {/*<div className="summary-section">
          <h3>LOCATION</h3>
          <p>Luxe Nails & Spa</p>
          <p className="address">123 Main Street, Suite 100</p>
        </div>*/}
      </div>

      <div className="action-buttons">
        <button className="btn-primary" onClick={onBackToHome}>
          Reservar Nueva Cita
        </button>
      </div>
    </div>
  );
};

export default Confirmation;