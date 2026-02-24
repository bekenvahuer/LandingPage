import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceSelection from '../components/booking/ServiceSelection';
import DateTimeSelection from '../components/booking/DateTimeSelection';
import ContactDetails from '../components/booking/ContactDetails';
import Confirmation from '../components/booking/Confirmation';
import type { BookingData, Service } from '../types/booking';
import { agendarCita } from '../services/eventsService';
import imagenHero from "../assets/ClickCita.png";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    switch (currentStep) {
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
            onNext={handleConfirmBooking}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Confirmation
            bookingData={bookingData}
            onBackToHome={() => {
              resetBooking();
              handleClose();
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleConfirmBooking = async () => {
    if (!bookingData.date || !bookingData.time || !bookingData.service) {
      setError("Faltan datos para agendar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Construir fecha inicio
      const startDate = new Date(bookingData.date);
      const [hours, minutes] = bookingData.time.split(":");

      startDate.setHours(Number(hours));
      startDate.setMinutes(Number(minutes));
      startDate.setSeconds(0);

      // ✅ Usar duración real del servicio
      // Si duration es string tipo "45 min"
      const durationMinutes =
        typeof bookingData.service.duration === "string"
          ? parseInt(bookingData.service.duration)
          : bookingData.service.duration;

      const endDate = new Date(startDate);
      endDate.setMinutes(startDate.getMinutes() + durationMinutes);

      const payload = {
        title: `${bookingData.service.name}/@BarberShop1046/Client:bekenvahuer rey gaona`,
        start: startDate.toISOString().slice(0, 19).replace("T", " "),
        end: endDate.toISOString().slice(0, 19).replace("T", " "),
        employee: `${bookingData.firstName} - ${bookingData.lastName} - ${bookingData.email} - ${bookingData.phone} - ${bookingData.specialRequests}`,
        payrollValue: "9000",
        servicesValue: "20000",
        done: 0,
      };

      await agendarCita(payload);

      setCurrentStep(4);

    } catch (err) {
      console.error(err);
      setError("Error al agendar la cita. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');  // ✅ Volver a la landing page
  };

  return (
    <div className="booking-page-wrapper">
      <div className="booking-container">
        <button className="btn-close" onClick={handleClose} aria-label="Cerrar agendamiento">
          ✕
        </button>

        {loading && (
          <div className="booking-loading">
            Agendando cita...
          </div>
        )}

        {error && (
          <div className="booking-error">
            {error}
          </div>
        )}

        {renderStep()}
        
      </div>
      <div className="booking-logo">
        <img src={imagenHero} alt="Imagen de reserva" className="booking-hero-image" />
      </div>
    </div>
  );
};

export default BookingPage;