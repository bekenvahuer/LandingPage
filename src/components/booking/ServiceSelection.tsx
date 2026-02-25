import React from 'react';
import type { Service, ServiceSelectionProps } from '../../types/booking';

const services: Service[] = [
  { id: 1, name: 'Telefónica', nickname: 'Reunión de Asesoría Telefónica', duration: '15 min', price: 0 },
  { id: 2, name: 'Presencial', nickname: 'Reunión de Asesoría Presencial', duration: '15 min', price: 0, disabled: true },
  //{ id: 3, name: 'Gel Manicure', duration: '45 min', price: 40 },
  //{ id: 4, name: 'Gel Pedicure', duration: '60 min', price: 50 },
];

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onSelectService, onNext }) => {
  return (
    <div className="step-container animate-fade-in">
      <div className="header">
        <h1>Reservar Cita</h1>
        <p className="step-indicator">Paso 1 de 3: Seleccionar Servicio</p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-item ${selectedService?.id === service.id ? 'selected' : ''} ${service.disabled ? 'disabled' : ''}
`}
            onClick={() => {
              if (!service.disabled) {
                onSelectService(service);
              }
            }}
          >
            <div className="service-info">
              <h3>{service.nickname}</h3>
              <span className="duration">{service.duration}</span>
            </div>
            {/*<div className="service-price">${service.price}</div>*/}
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
        Continuar
      </button>
    </div>
  );
};

export default ServiceSelection;