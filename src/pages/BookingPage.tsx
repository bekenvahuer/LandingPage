import React, { useState } from 'react';
import ServiceSelection from '../components/booking/ServiceSelection';
import DateTimeSelection from '../components/booking/DateTimeSelection';
import ContactDetails from '../components/booking/ContactDetails';
import Confirmation from '../components/booking/Confirmation';
import type { BookingData, Service } from '../types/booking';

interface BookingPageProps {
  onClose: () => void;  // ✅ Nueva prop para cerrar
}

const BookingPage: React.FC<BookingPageProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const resetBooking = () => {
    setBookingData({
      service: null, date: null, time: null,
      firstName: '', lastName: '', email: '', phone: '', specialRequests: ''
    });
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedService={bookingData.service}
            onSelectService={(service: Service) => updateBookingData('service', service)}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            onSelectDate={(date: Date) => updateBookingData('date', date)}
            onSelectTime={(time: string) => updateBookingData('time', time)}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <ContactDetails
            formData={{
              firstName: bookingData.firstName,
              lastName: bookingData.lastName,
              email: bookingData.email,
              phone: bookingData.phone,
              specialRequests: bookingData.specialRequests
            }}
            onUpdateField={updateBookingData}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Confirmation
            bookingData={bookingData}
            onBackToHome={() => {
              resetBooking();
              onClose();  // ✅ Volver a LandingPage después de confirmar
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-page-wrapper">
      <div className="booking-container">
        {/* ✅ Botón de cierre en el header */}
        <button className="btn-close" onClick={onClose} aria-label="Cerrar agendamiento">
          ✕
        </button>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingPage;