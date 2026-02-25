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

  const updateBookingData = (
    field: keyof BookingData,
    value: string | Service | null
  ) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
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
            onSelectDate={(date: string) => updateBookingData('date', date)}
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

      // 🔥 Obtener duración en minutos (ej: "15 min" → 15)
      const durationMinutes = parseInt(
        bookingData.service.duration.replace(/\D/g, "")
      );

      // 🔥 Separar hora seleccionada
      const [hourStr, minuteStr] = bookingData.time.split(":");

      let hour = parseInt(hourStr);
      let minute = parseInt(minuteStr);

      // 🔥 Sumar duración
      minute += durationMinutes;

      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }

      // 🔥 Construir fechas SIN usar Date()
      const start = `${bookingData.date} ${bookingData.time}:00`;

      const end = `${bookingData.date} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;

      const payload = {
        title: `${bookingData.service.name}/@BarberShop1046/Client:bekenvahuer rey gaona`,
        start: start,
        end: end,
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