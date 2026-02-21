import React from 'react';
import type { Service, ServiceSelectionProps } from '../../types/booking';

const services: Service[] = [
  { id: 1, name: 'Classic Manicure', duration: '30 min', price: 25 },
  { id: 2, name: 'Classic Pedicure', duration: '45 min', price: 35 },
  { id: 3, name: 'Gel Manicure', duration: '45 min', price: 40 },
  { id: 4, name: 'Gel Pedicure', duration: '60 min', price: 50 },
];

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onSelectService, onNext }) => {
  return (
    <div className="step-container animate-fade-in">
      <div className="header">
        <h1>Book Appointment</h1>
        <p className="step-indicator">Step 1 of 3: Select Service</p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-item ${selectedService?.id === service.id ? 'selected' : ''}`}
            onClick={() => onSelectService(service)}
          >
            <div className="service-info">
              <h3>{service.name}</h3>
              <span className="duration">{service.duration}</span>
            </div>
            <div className="service-price">${service.price}</div>
            {selectedService?.id === service.id && (
              <div className="checkmark">✓</div>
            )}
          </div>
        ))}
      </div>

      <button
        className="btn-continue"
        onClick={onNext}
        disabled={!selectedService}
      >
        Continue
      </button>
    </div>
  );
};

export default ServiceSelection;