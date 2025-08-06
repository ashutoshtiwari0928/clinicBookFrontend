import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BookingCalendar = ({ doctor, onSlotSelect, selectedSlot }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    { time: '09:00 AM', available: true, type: 'consultation' },
    { time: '09:30 AM', available: true, type: 'consultation' },
    { time: '10:00 AM', available: false, type: 'consultation' },
    { time: '10:30 AM', available: true, type: 'consultation' },
    { time: '11:00 AM', available: true, type: 'consultation' },
    { time: '11:30 AM', available: true, type: 'consultation' },
    { time: '02:00 PM', available: true, type: 'consultation' },
    { time: '02:30 PM', available: true, type: 'consultation' },
    { time: '03:00 PM', available: false, type: 'consultation' },
    { time: '03:30 PM', available: true, type: 'consultation' },
    { time: '04:00 PM', available: true, type: 'consultation' },
    { time: '04:30 PM', available: true, type: 'consultation' },
    { time: '05:00 PM', available: true, type: 'consultation' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      onSlotSelect({
        date: selectedDate,
        time: slot.time,
        type: slot.type,
      });
    }
  };

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

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      {/* Calendar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Select Date & Time</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <span className="font-medium text-text-primary min-w-[120px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-muted clinical-transition"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-text-secondary">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && handleDateSelect(date)}
              disabled={!date || !isDateAvailable(date)}
              className={`p-2 text-sm rounded-md clinical-transition ${
                !date
                  ? 'invisible'
                  : isDateSelected(date)
                    ? 'bg-primary text-white'
                    : isDateAvailable(date)
                      ? 'text-text-primary hover:bg-muted'
                      : 'text-text-muted cursor-not-allowed'
              }`}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-text-primary">Available Time Slots</h4>
          <span className="text-sm text-text-secondary">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Morning Slots */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-text-secondary mb-2 flex items-center">
            <Icon name="Sun" size={14} className="mr-1" />
            Morning
          </h5>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots
              .filter((slot) => {
                const hour = parseInt(slot.time.split(':')[0]);
                const isPM = slot.time.includes('PM');
                return !isPM && hour < 12;
              })
              .map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-2 text-xs font-medium rounded-md border clinical-transition ${
                    selectedSlot?.time === slot.time
                      ? 'border-primary bg-primary-50 text-primary'
                      : slot.available
                        ? 'border-border hover:border-primary-200 hover:bg-primary-50'
                        : 'border-border bg-muted text-text-muted cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
          </div>
        </div>

        {/* Afternoon Slots */}
        <div>
          <h5 className="text-sm font-medium text-text-secondary mb-2 flex items-center">
            <Icon name="Sun" size={14} className="mr-1" />
            Afternoon
          </h5>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots
              .filter((slot) => {
                const hour = parseInt(slot.time.split(':')[0]);
                const isPM = slot.time.includes('PM');
                return isPM || hour === 12;
              })
              .map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-2 text-xs font-medium rounded-md border clinical-transition ${
                    selectedSlot?.time === slot.time
                      ? 'border-primary bg-primary-50 text-primary'
                      : slot.available
                        ? 'border-border hover:border-primary-200 hover:bg-primary-50'
                        : 'border-border bg-muted text-text-muted cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary-50 border border-primary rounded"></div>
            <span className="text-xs text-text-secondary">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted border border-border rounded"></div>
            <span className="text-xs text-text-secondary">Unavailable</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary border border-primary rounded"></div>
            <span className="text-xs text-text-secondary">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
