import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
  currentMonth,
  onMonthChange,
  viewMode = 'month',
  onViewModeChange,
}) => {
  const [calendarDates, setCalendarDates] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const months = [
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

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    generateCalendarDates();
  }, [currentMonth, availableDates]);

  const generateCalendarDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split('T')[0];
      const isCurrentMonth = current.getMonth() === month;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const isSelected = dateStr === selectedDate;
      const isAvailable = availableDates.includes(dateStr);
      const isPast = current < new Date().setHours(0, 0, 0, 0);

      dates.push({
        date: new Date(current),
        dateStr,
        day: current.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        isAvailable,
        isPast,
      });

      current.setDate(current.getDate() + 1);
    }

    setCalendarDates(dates);
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextMonth();
    }
    if (isRightSwipe) {
      handlePrevMonth();
    }
  };

  const getDateClassName = (dateInfo) => {
    let baseClass =
      'w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg clinical-transition cursor-pointer';

    if (!dateInfo.isCurrentMonth) {
      baseClass += ' text-text-muted opacity-50';
    } else if (dateInfo.isPast) {
      baseClass += ' text-text-muted cursor-not-allowed';
    } else if (dateInfo.isSelected) {
      baseClass += ' bg-primary text-white';
    } else if (dateInfo.isAvailable) {
      baseClass += ' text-primary bg-primary-50 hover:bg-primary-100 border border-primary-200';
    } else if (dateInfo.isToday) {
      baseClass += ' text-primary border border-primary';
    } else {
      baseClass += ' text-text-secondary hover:bg-muted';
    }

    return baseClass;
  };

  const handleDateClick = (dateInfo) => {
    if (dateInfo.isPast || !dateInfo.isCurrentMonth) return;
    onDateSelect(dateInfo.dateStr);
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="hidden sm:flex items-center space-x-1">
            <Button
              variant={viewMode === 'month' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('week')}
            >
              Week
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handlePrevMonth} iconName="ChevronLeft" />
          <Button variant="ghost" size="sm" onClick={handleNextMonth} iconName="ChevronRight" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        className="p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDates.map((dateInfo, index) => (
            <div
              key={index}
              className={getDateClassName(dateInfo)}
              onClick={() => handleDateClick(dateInfo)}
            >
              {dateInfo.day}
              {dateInfo.isAvailable && dateInfo.isCurrentMonth && !dateInfo.isPast && (
                <div className="absolute w-2 h-2 bg-success rounded-full -mt-1 -mr-1 top-0 right-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-text-secondary">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-50 border border-primary-200 rounded-full" />
            <span className="text-text-secondary">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-text-secondary">Has Slots</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted border border-border rounded-full" />
            <span className="text-text-secondary">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
