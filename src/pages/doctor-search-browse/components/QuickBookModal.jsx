import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickBookModal = ({ isOpen, onClose, doctor, onBookAppointment }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const availableDates = [
    { date: '2024-01-15', label: 'Today', slots: 3 },
    { date: '2024-01-16', label: 'Tomorrow', slots: 5 },
    { date: '2024-01-17', label: 'Wed, Jan 17', slots: 8 },
    { date: '2024-01-18', label: 'Thu, Jan 18', slots: 6 },
    { date: '2024-01-19', label: 'Fri, Jan 19', slots: 4 },
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  const appointmentTypes = [
    {
      value: 'consultation',
      label: 'Consultation',
      duration: '30 min',
      fee: doctor?.consultationFee || 150,
    },
    {
      value: 'follow-up',
      label: 'Follow-up',
      duration: '15 min',
      fee: (doctor?.consultationFee || 150) * 0.7,
    },
    {
      value: 'check-up',
      label: 'Check-up',
      duration: '45 min',
      fee: (doctor?.consultationFee || 150) * 1.2,
    },
    {
      value: 'telemedicine',
      label: 'Telemedicine',
      duration: '30 min',
      fee: (doctor?.consultationFee || 150) * 0.8,
    },
  ];

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const appointmentData = {
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      notes,
      fee: appointmentTypes.find((type) => type.value === appointmentType)?.fee,
    };

    onBookAppointment(appointmentData);
    setIsLoading(false);
    onClose();
  };

  const selectedAppointmentType = appointmentTypes.find((type) => type.value === appointmentType);
  const isFormValid = selectedDate && selectedTime;

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 clinical-transition"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface rounded-lg clinical-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex-shrink-0"></div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Book with Dr. {doctor.name}
              </h2>
              <p className="text-sm text-text-secondary">{doctor.specialty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted clinical-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Appointment Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setAppointmentType(type.value)}
                    className={`p-4 border rounded-lg clinical-transition text-left ${
                      appointmentType === type.value
                        ? 'border-primary bg-primary-50'
                        : 'border-border hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{type.label}</span>
                      <span className="text-sm text-text-secondary">{type.duration}</span>
                    </div>
                    <div className="text-lg font-semibold text-primary">${type.fee}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Select Date
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {availableDates.map((dateOption) => (
                  <button
                    key={dateOption.date}
                    onClick={() => setSelectedDate(dateOption.date)}
                    className={`p-3 border rounded-lg clinical-transition text-center ${
                      selectedDate === dateOption.date
                        ? 'border-primary bg-primary-50 text-primary'
                        : 'border-border hover:border-primary-200'
                    }`}
                  >
                    <div className="font-medium">{dateOption.label}</div>
                    <div className="text-xs text-text-muted mt-1">{dateOption.slots} slots</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 border rounded-md clinical-transition text-sm font-medium ${
                        selectedTime === time
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-border hover:border-primary-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your symptoms or reason for visit..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            {/* Appointment Summary */}
            {isFormValid && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Appointment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Doctor:</span>
                    <span className="text-text-primary">Dr. {doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Type:</span>
                    <span className="text-text-primary">{selectedAppointmentType?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Date & Time:</span>
                    <span className="text-text-primary">
                      {availableDates.find((d) => d.date === selectedDate)?.label} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Duration:</span>
                    <span className="text-text-primary">{selectedAppointmentType?.duration}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-text-primary">Total Fee:</span>
                    <span className="text-primary">${selectedAppointmentType?.fee}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleBookAppointment}
            disabled={!isFormValid || isLoading}
            loading={isLoading}
            iconName="Calendar"
          >
            {isLoading ? 'Booking...' : 'Book Appointment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickBookModal;
