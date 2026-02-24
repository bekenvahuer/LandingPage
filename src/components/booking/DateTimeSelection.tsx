import React, { useState } from 'react';
import type { DateTimeSelectionProps } from '../../types/booking';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30'
];

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ 
  selectedDate, selectedTime, onSelectDate, onSelectTime, onNext, onBack 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); 
  
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
          <h2>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
          <button onClick={() => changeMonth(1)}>›</button>
        </div>

        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="calendar-day-header">{day}</div>
          ))}
          {blanks.map((_, i) => <div key={`blank-${i}`} className="calendar-day blank"></div>)}
          {days.map((day) => (
            <div
              key={day}
              className={`calendar-day ${isDateSelected(day) ? 'selected' : ''}`}
              onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="available-times">
        <h3>Horarios Disponibles</h3>
        <div className="time-slots">
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => onSelectTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button className="btn-continue" onClick={onNext} disabled={!selectedDate || !selectedTime}>
        Continuar
      </button>
    </div>
  );
};

export default DateTimeSelection;