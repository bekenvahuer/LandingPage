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
  const [eventsCache, setEventsCache] = useState<Map<string, any[]>>(new Map());
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
    return selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  // 🔥 Procesar horas ocupadas
  const processBookedHours = (events: any[]) => {
    const hours = events.map(event => {
      const timePart = event.start.split(" ")[1]; // "14:30:00"
      return timePart.substring(0, 5); // "14:30"
    });

    setBookedHours(hours);
  };

  // 🔥 Handler actualizado
  const handleSelectDate = async (day: number) => {

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const formattedDate = date.toISOString().split("T")[0];

    onSelectDate(date);
    onSelectTime("");
    setBookedHours([]);

    // ✅ Si ya está en cache → usarlo
    if (eventsCache.has(formattedDate)) {
      processBookedHours(eventsCache.get(formattedDate)!);
      return;
    }

    try {
      setLoading(true);

      // 🔥 Trae TODOS los eventos
      const allEvents = await obtenerEventosPorFecha();

      // 🔥 Filtrar solo los del día seleccionado
      const filteredEvents = allEvents.filter((event: any) =>
        event.start.startsWith(formattedDate)
      );

      // Guardar SOLO los de esa fecha en cache
      const newCache = new Map(eventsCache);
      newCache.set(formattedDate, filteredEvents);
      setEventsCache(newCache);

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

          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
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

        {loading && <p>Cargando disponibilidad...</p>}

        <div className="time-slots">
          {timeSlots.map((time) => {

            const isBooked = bookedHours.includes(time);

            return (
              <button
                key={time}
                disabled={isBooked}
                className={`time-slot 
                  ${selectedTime === time ? 'selected' : ''} 
                  ${isBooked ? 'disabled' : ''}`}
                onClick={() => !isBooked && onSelectTime(time)}
              >
                {time}
              </button>
            );
          })}
        </div>
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