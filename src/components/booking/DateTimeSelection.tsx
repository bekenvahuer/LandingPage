import React, { useState } from 'react';
import type { DateTimeSelectionProps } from '../../types/booking';
import { obtenerEventosPorFecha } from '../../services/eventsService';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30',
  '14:00', '14:30', '15:00', '15:30'
];

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate, selectedTime, onSelectDate, onSelectTime, onNext, onBack
}) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [bookedHours, setBookedHours] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const changeMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;

    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");

    const dateToCompare = `${year}-${month}-${dayStr}`;

    return selectedDate === dateToCompare;
  };

  // 🔥 Procesar horas ocupadas
  const processBookedHours = (events: any[]) => {
    const hours = events.map(event => {
      const timePart = event.start.split(" ")[1]; // "14:30:00"
      return timePart.substring(0, 5); // "14:30"
    });

    setBookedHours(hours);
  };

  const handleSelectDate = async (day: number) => {

    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");

    const formattedDate = `${year}-${month}-${dayStr}`;

    onSelectDate(formattedDate); // 🔥 solo string
    onSelectTime(""); // reset hora
    setBookedHours([]);

    try {
      setLoading(true);

      let events: any[];

      if (allEvents.length === 0) {
        const response = await obtenerEventosPorFecha();
        setAllEvents(response);
        events = response;
      } else {
        events = allEvents;
      }

      const filteredEvents = events.filter((event) =>
        event.start.startsWith(formattedDate)
      );

      processBookedHours(filteredEvents);

    } catch (error) {
      console.error("Error consultando disponibilidad:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDayDisabled = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    date.setHours(0, 0, 0, 0);

    if (date <= today) return true;

    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;

    let validDaysCount = 0;
    const tempDate = new Date(today);

    while (validDaysCount < 7) {
      tempDate.setDate(tempDate.getDate() + 1);
      const tempDay = tempDate.getDay();
      if (tempDay !== 0 && tempDay !== 6) {
        validDaysCount++;
      }
    }

    if (date > tempDate) return true;

    return false;
  };

  return (
    <div className="step-container animate-fade-in">

      <div className="header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <h1>Seleccionar Fecha y Hora</h1>
        <p className="step-indicator">Paso 2 de 3: Elige tu Horario</p>
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>‹</button>
          <h2>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)}>›</button>
        </div>

        <div className="calendar-grid">

          {['D', 'L', 'M', 'Mi', 'J', 'V', 'S'].map((day, i) => (
            <div key={i} className="calendar-day-header">{day}</div>
          ))}

          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="calendar-day blank"></div>
          ))}

          {days.map((day) => {
            const disabled = isDayDisabled(day);

            return (
              <div
                key={day}
                className={`calendar-day 
                  ${isDateSelected(day) ? 'selected' : ''} 
                  ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && handleSelectDate(day)}
              >
                {day}
              </div>
            );
          })}

        </div>
      </div>

      <div className="available-times">
        <h3>Horarios Disponibles</h3>

        {/* 🔹 Si no hay fecha seleccionada */}
        {!selectedDate && (
          <p className="info-text">Selecciona una fecha para ver horarios disponibles</p>
        )}

        {/* 🔹 Loading */}
        {selectedDate && loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Consultando disponibilidad...</p>
          </div>
        )}

        {/* 🔹 Mostrar horarios solo cuando termine loading */}
        {selectedDate && !loading && (
          <>
            {timeSlots.filter(time => !bookedHours.includes(time)).length === 0 ? (
              <p className="no-slots">No hay horarios disponibles para este día</p>
            ) : (
              <div className="time-slots animate-fade-in">
                {timeSlots
                  .filter(time => !bookedHours.includes(time)) // 👈 FILTRAMOS AQUÍ
                  .map((time) => {

                    return (
                      <button
                        key={time}
                        className={`time-slot 
                          ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => onSelectTime(time)}
                      >
                        {time}
                      </button>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>

      <button
        className="btn-continue"
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
      >
        Continuar
      </button>

    </div>
  );
};

export default DateTimeSelection;