import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ appointments, onDateSelect, onViewMonth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getAppointmentsForDate = (date) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return appointments.filter((apt) => apt.date === dateString);
  };

  const getAppointmentTypeColor = (type) => {
    const colors = {
      Consultation: 'bg-primary',
      'Follow-up': 'bg-success',
      'Check-up': 'bg-warning',
      Emergency: 'bg-error',
    };
    return colors[type] || 'bg-secondary';
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    return (
      today.getDate() === date &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isPastDate = (date) => {
    const dateToCheck = new Date(currentYear, currentMonth, date);
    return dateToCheck < today;
  };

  const handleDateClick = (date) => {
    const selectedDate = new Date(currentYear, currentMonth, date);
    onDateSelect(selectedDate);
  };

  // Generate calendar days
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push(date);
  }

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Calendar</h3>
          <Button variant="ghost" size="sm" onClick={onViewMonth} iconName="ExternalLink">
            Full View
          </Button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <h4 className="font-medium text-text-primary">
            {monthNames[currentMonth]} {currentYear}
          </h4>

          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            if (date === null) {
              return <div key={index} className="h-10" />;
            }

            const dayAppointments = getAppointmentsForDate(date);
            const hasAppointments = dayAppointments.length > 0;

            return (
              <button
                key={date}
                onClick={() => handleDateClick(date)}
                className={`h-10 text-sm font-medium rounded-md clinical-transition relative ${
                  isToday(date)
                    ? 'bg-primary text-white'
                    : isPastDate(date)
                      ? 'text-text-muted hover:bg-muted'
                      : hasAppointments
                        ? 'bg-primary-50 text-primary hover:bg-primary-100'
                        : 'text-text-primary hover:bg-muted'
                }`}
              >
                {date}

                {/* Appointment Indicators */}
                {hasAppointments && !isToday(date) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                    {dayAppointments.slice(0, 3).map((apt, idx) => (
                      <div
                        key={idx}
                        className={`w-1 h-1 rounded-full ${getAppointmentTypeColor(apt.type)}`}
                      />
                    ))}
                    {dayAppointments.length > 3 && (
                      <div className="w-1 h-1 rounded-full bg-text-muted" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-text-secondary">Consultation</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-text-secondary">Follow-up</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-text-secondary">Check-up</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-error" />
              <span className="text-text-secondary">Emergency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
