import React from 'react';
import type { ConfirmationProps } from '../../types/booking';

const Confirmation: React.FC<ConfirmationProps> = ({ bookingData, onBackToHome }) => {
  const { service, date, time } = bookingData;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="step-container confirmation animate-fade-in">
      <div className="header">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your appointment is scheduled</p>
      </div>

      <div className="booking-summary">
        <div className="summary-section">
          <h3>SERVICE</h3>
          <p>{service?.name}</p>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="icon">📅</span>
            <div><strong>DATE</strong><p>{formatDate(date)}</p></div>
          </div>
          <div className="summary-item">
            <span className="icon">🕐</span>
            <div><strong>TIME</strong><p>{time}</p></div>
          </div>
        </div>
        <div className="summary-section">
          <h3>LOCATION</h3>
          <p>Luxe Nails & Spa</p>
          <p className="address">123 Main Street, Suite 100</p>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-primary" onClick={onBackToHome}>
          Book Another Appointment
        </button>
      </div>
    </div>
  );
};

export default Confirmation;