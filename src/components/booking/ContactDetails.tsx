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
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h1>Your Information</h1>
        <p className="step-indicator">Step 3 of 3: Contact Details</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => onUpdateField('firstName', e.target.value)}
            required
          />
        </div>
        {/* Repite para Last Name, Email, Phone... */}
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => onUpdateField('lastName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => onUpdateField('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => onUpdateField('phone', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Special Requests (Optional)</label>
          <textarea
            placeholder="Any preferences?"
            value={specialRequests}
            onChange={(e) => onUpdateField('specialRequests', e.target.value)}
            rows={3}
          />
        </div>

        <button type="submit" className="btn-continue" disabled={!canContinue}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;