import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingForm = ({ selectedSlot, appointmentType, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    reason: '',
    symptoms: '',
    notes: '',
    isFirstVisit: true,
    urgency: 'routine',
    preferredLanguage: 'English',
  });

  const reasonOptions = [
    'General Consultation',
    'Follow-up Visit',
    'Routine Check-up',
    'Specific Symptoms',
    'Prescription Refill',
    'Test Results Review',
    'Second Opinion',
    'Preventive Care',
    'Other',
  ];

  const urgencyLevels = [
    { value: 'routine', label: 'Routine', icon: 'Calendar', color: 'text-text-secondary' },
    { value: 'urgent', label: 'Urgent', icon: 'AlertCircle', color: 'text-warning' },
    { value: 'emergency', label: 'Emergency', icon: 'AlertTriangle', color: 'text-error' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const bookingData = {
      ...formData,
      slot: selectedSlot,
      appointmentType: appointmentType,
      timestamp: new Date().toISOString(),
    };
    onBookingSubmit(bookingData);
  };

  const isFormValid =
    formData.reason && (formData.reason !== 'Specific Symptoms' || formData.symptoms);

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Appointment Details</h3>
        <p className="text-sm text-text-secondary mt-1">
          Please provide information about your visit
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Appointment Summary */}
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="font-medium text-primary">Appointment Summary</span>
          </div>
          <div className="text-sm text-primary-700 space-y-1">
            <p>
              <strong>Date:</strong>{' '}
              {selectedSlot?.date?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>
              <strong>Time:</strong> {selectedSlot?.time}
            </p>
            <p>
              <strong>Type:</strong> {appointmentType?.name}
            </p>
            <p>
              <strong>Duration:</strong> {appointmentType?.duration}
            </p>
          </div>
        </div>

        {/* Reason for Visit */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Reason for Visit *
          </label>
          <select
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
            required
          >
            <option value="">Select reason for visit</option>
            {reasonOptions.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Symptoms (conditional) */}
        {formData.reason === 'Specific Symptoms' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Describe Your Symptoms *
            </label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => handleInputChange('symptoms', e.target.value)}
              placeholder="Please describe your symptoms in detail..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition resize-none"
              required
            />
          </div>
        )}

        {/* Urgency Level */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Urgency Level</label>
          <div className="grid grid-cols-3 gap-2">
            {urgencyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleInputChange('urgency', level.value)}
                className={`p-3 rounded-md border clinical-transition ${
                  formData.urgency === level.value
                    ? 'border-primary bg-primary-50'
                    : 'border-border hover:border-primary-200'
                }`}
              >
                <Icon name={level.icon} size={16} className={`mx-auto mb-1 ${level.color}`} />
                <div className="text-xs font-medium text-text-primary">{level.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* First Visit */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Visit Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleInputChange('isFirstVisit', true)}
              className={`p-3 rounded-md border clinical-transition ${
                formData.isFirstVisit
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-200'
              }`}
            >
              <Icon name="UserPlus" size={16} className="mx-auto mb-1" />
              <div className="text-xs font-medium">First Visit</div>
            </button>
            <button
              onClick={() => handleInputChange('isFirstVisit', false)}
              className={`p-3 rounded-md border clinical-transition ${
                !formData.isFirstVisit
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-200'
              }`}
            >
              <Icon name="RotateCcw" size={16} className="mx-auto mb-1" />
              <div className="text-xs font-medium">Follow-up</div>
            </button>
          </div>
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferred Language
          </label>
          <select
            value={formData.preferredLanguage}
            onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional information you'd like the doctor to know..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Payment
        </Button>

        {/* Disclaimer */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-text-muted flex-shrink-0 mt-0.5" />
            <div className="text-xs text-text-secondary">
              <p className="mb-1">
                By booking this appointment, you agree to our terms of service and privacy policy.
              </p>
              <p>
                You will receive a confirmation email with appointment details and preparation
                instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
