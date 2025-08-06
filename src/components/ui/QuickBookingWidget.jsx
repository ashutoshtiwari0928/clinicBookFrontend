import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const QuickBookingWidget = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    specialty: '',
    date: '',
    time: '',
    urgency: 'routine',
  });

  const specialties = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickBook = () => {
    // Handle quick booking logic
    console.log('Quick booking:', formData);
    setIsOpen(false);
    // Reset form
    setFormData({
      specialty: '',
      date: '',
      time: '',
      urgency: 'routine',
    });
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const isFormValid = formData.specialty && formData.date && formData.time;

  return (
    <>
      {/* Floating Action Button */}
      <div className={`fixed bottom-6 right-6 z-300 ${className}`}>
        <button
          onClick={toggleWidget}
          className="w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full clinical-shadow-md clinical-transition flex items-center justify-center group"
          aria-label="Quick book appointment"
        >
          <Icon
            name={isOpen ? 'X' : 'Plus'}
            size={24}
            className="clinical-transition group-hover:scale-110"
          />
        </button>
      </div>

      {/* Quick Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 clinical-transition"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-surface rounded-lg clinical-shadow-lg w-full max-w-md animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Quick Booking</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted clinical-transition"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Urgency Selector */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Appointment Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleInputChange('urgency', 'routine')}
                    className={`p-3 rounded-md border clinical-transition ${
                      formData.urgency === 'routine'
                        ? 'border-primary bg-primary-50 text-primary'
                        : 'border-border hover:border-primary-200'
                    }`}
                  >
                    <Icon name="Calendar" size={16} className="mx-auto mb-1" />
                    <div className="text-xs font-medium">Routine</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('urgency', 'urgent')}
                    className={`p-3 rounded-md border clinical-transition ${
                      formData.urgency === 'urgent'
                        ? 'border-warning bg-warning-50 text-warning'
                        : 'border-border hover:border-warning-200'
                    }`}
                  >
                    <Icon name="AlertCircle" size={16} className="mx-auto mb-1" />
                    <div className="text-xs font-medium">Urgent</div>
                  </button>
                </div>
              </div>

              {/* Specialty Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Specialty
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
                >
                  <option value="">Select specialty...</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preferred Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleInputChange('time', time)}
                      className={`p-2 text-xs font-medium rounded-md border clinical-transition ${
                        formData.time === time
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-border hover:border-primary-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleQuickBook}
                disabled={!isFormValid}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickBookingWidget;
