import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const SlotDetailsModal = ({ slot, onClose }) => {
  if (!slot) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-surface rounded-lg p-6 border border-border shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-primary flex items-center space-x-2">
          <span>Booked Slot Details</span>
        </h2>
        <div className="mb-2">
          <span className="font-medium text-text-primary">Patient Name:</span> {slot.patientName}
        </div>
        <div className="mb-2">
          <span className="font-medium text-text-primary">Reason:</span> {slot.notes || slot.type}
        </div>
        <div className="mb-2">
          <span className="font-medium text-text-primary">Time:</span> {slot.time}
        </div>
        <Button variant="primary" onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

const ScheduleTab = ({ appointments, onAppointmentAction, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day'); // day, week, month
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]); // doctor-created available slots

  const timeSlots = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  const getAppointmentForSlot = (time) => {
    return appointments.find((apt) => apt.time === time && apt.date === selectedDate);
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success-100 border-success-300 text-success-800',
      pending: 'bg-warning-100 border-warning-300 text-warning-800',
      cancelled: 'bg-error-100 border-error-300 text-error-800',
      completed: 'bg-secondary-100 border-secondary-300 text-secondary-800',
    };
    return colors[status] || 'bg-muted border-border text-text-secondary';
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const handleAddSlot = () => {
    // Add a new available slot at the first empty time
    const firstEmpty = timeSlots.find(
      (time) =>
        !getAppointmentForSlot(time) &&
        !slots.some((slot) => slot.time === time && slot.date === selectedDate)
    );
    if (firstEmpty) {
      setSlots([...slots, { time: firstEmpty, date: selectedDate }]);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSlot(null);
  };

  const handleDragStart = (e, appointment) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(appointment));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newTime) => {
    e.preventDefault();
    const appointmentData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onAppointmentAction('reschedule', appointmentData.id, { newTime });
  };

  return (
    <div className="space-y-6">
      {/* Schedule Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'day' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Plus" onClick={handleAddSlot}>
            Add Available Slot
          </Button>
          <Button variant="outline" size="sm" iconName="Clock">
            Set Break
          </Button>
        </div>
      </div>
      {/* Calendar View */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="font-semibold text-text-primary">
            Schedule for{' '}
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time) => {
            const appointment = getAppointmentForSlot(time);
            const availableSlot = slots.find(
              (slot) => slot.time === time && slot.date === selectedDate
            );
            return (
              <div
                key={time}
                className="flex items-center border-b border-border hover:bg-muted/50 clinical-transition"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, time)}
              >
                <div className="w-20 p-3 text-sm font-data text-text-secondary border-r border-border">
                  {time}
                </div>
                <div className="flex-1 p-3">
                  {appointment ? (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, appointment)}
                      className={`p-3 rounded-md border cursor-pointer ${getStatusColor(appointment.status)}`}
                      onClick={() => handleSlotClick(appointment)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-sm opacity-80">{appointment.type}</div>
                          <div className="text-xs opacity-70">{appointment.duration} minutes</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAppointmentAction('edit', appointment.id);
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="MessageSquare"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAppointmentAction('message', appointment.id);
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="MoreVertical"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAppointmentAction('menu', appointment.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : availableSlot ? (
                    <div className="p-3 text-success text-sm border-2 border-dashed border-success rounded-md bg-success-50">
                      Available slot
                    </div>
                  ) : (
                    <div className="p-3 text-text-muted text-sm border-2 border-dashed border-border rounded-md">
                      No slot
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showModal && <SlotDetailsModal slot={selectedSlot} onClose={handleModalClose} />}
    </div>
  );
};

export default ScheduleTab;
