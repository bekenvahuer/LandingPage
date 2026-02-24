import React from 'react';
import type { ContactDetailsProps } from '../../types/booking';

const ContactDetails: React.FC<ContactDetailsProps> = ({ formData, onUpdateField, onNext, onBack }) => {
  const { firstName, lastName, email, phone, specialRequests } = formData;
  const canContinue = firstName && lastName && email && phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) onNext();
  };

  return (
    <div className="step-container animate-fade-in">
      <div className="header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <h1>Tus Datos</h1>
        <p className="step-indicator">Paso 3 de 3: Datos de Contacto</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Nombre *</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={firstName}
            onChange={(e) => onUpdateField('firstName', e.target.value)}
            required
          />
        </div>
        {/* Repite para Last Name, Email, Phone... */}
        <div className="form-group">
          <label>Apellido *</label>
          <input
            type="text"
            placeholder="Ingresa tu apellido"
            value={lastName}
            onChange={(e) => onUpdateField('lastName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico *</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => onUpdateField('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Teléfono *</label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => onUpdateField('phone', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Solicitudes Especiales (Opcional)</label>
          <textarea
            placeholder="¿Tienes alguna preferencia?"
            value={specialRequests}
            onChange={(e) => onUpdateField('specialRequests', e.target.value)}
            rows={3}
          />
        </div>

        <button type="submit" className="btn-continue" disabled={!canContinue}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;