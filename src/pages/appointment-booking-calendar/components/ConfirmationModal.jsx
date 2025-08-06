import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, appointmentData, onConfirm, onCancel, onClose }) => {
  const [calendarIntegration, setCalendarIntegration] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calendarOptions = [
    { id: 'google', name: 'Google Calendar', icon: 'Calendar' },
    { id: 'apple', name: 'Apple Calendar', icon: 'Calendar' },
    { id: 'outlook', name: 'Outlook', icon: 'Calendar' },
    { id: 'none', name: 'No Integration', icon: 'X' },
  ];

  const handleConfirm = async () => {
    setIsProcessing(true);

    try {
      await onConfirm({
        ...appointmentData,
        calendarIntegration,
      });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDateTime = () => {
    if (!appointmentData?.date || !appointmentData?.time) return '';

    const date = new Date(appointmentData.date);
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const [hours, minutes] = appointmentData.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeStr = `${displayHour}:${minutes} ${ampm}`;

    return `${dateStr} at ${timeStr}`;
  };

  const getAppointmentTypeColor = (type) => {
    const colors = {
      consultation: 'text-primary bg-primary-50',
      'follow-up': 'text-success bg-success-50',
      procedure: 'text-warning bg-warning-50',
      emergency: 'text-error bg-error-50',
    };
    return colors[type] || 'text-text-secondary bg-muted';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 clinical-transition"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-surface rounded-lg clinical-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Confirm Your Appointment</h2>
              <p className="text-sm text-text-secondary">Review your appointment details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted clinical-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Appointment Summary */}
        <div className="p-6 space-y-6">
          {/* Date & Time */}
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">{formatDateTime()}</h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${getAppointmentTypeColor(appointmentData?.type)}`}
                  >
                    {appointmentData?.type?.charAt(0).toUpperCase() +
                      appointmentData?.type?.slice(1)}
                  </span>
                  <span className="text-sm text-text-secondary">Duration: 30 minutes</span>
                </div>
              </div>
              <Icon name="Clock" size={24} className="text-primary" />
            </div>
          </div>

          {/* Provider Information */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Healthcare Provider</h4>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary-200 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-text-secondary" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Dr. Sarah Johnson</p>
                <p className="text-sm text-text-secondary">Cardiologist</p>
                <p className="text-sm text-text-secondary">HealthCare Center - Room 205</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Appointment Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Reason:</span>
                <span className="text-text-primary">{appointmentData?.reason}</span>
              </div>
              {appointmentData?.symptoms && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Symptoms:</span>
                  <span className="text-text-primary">{appointmentData.symptoms}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Contact Method:</span>
                <span className="text-text-primary capitalize">
                  {appointmentData?.communicationMethod}
                </span>
              </div>
              {appointmentData?.specialAccommodations && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Accommodations:</span>
                  <span className="text-text-primary">{appointmentData.specialAccommodations}</span>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Emergency Contact</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Name:</span>
                <span className="text-text-primary">{appointmentData?.emergencyContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Phone:</span>
                <span className="text-text-primary">{appointmentData?.emergencyPhone}</span>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          {appointmentData?.insuranceProvider && (
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3">Insurance Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Provider:</span>
                  <span className="text-text-primary">{appointmentData.insuranceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Policy:</span>
                  <span className="text-text-primary">{appointmentData.policyNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">Coverage Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Integration */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Add to Calendar</h4>
            <div className="grid grid-cols-2 gap-3">
              {calendarOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCalendarIntegration(option.id)}
                  className={`p-3 rounded-md border clinical-transition ${
                    calendarIntegration === option.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-border hover:border-primary-200'
                  }`}
                >
                  <Icon name={option.icon} size={20} className="mx-auto mb-1" />
                  <div className="text-sm font-medium">{option.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reminder Preferences */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Reminder Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(appointmentData?.reminderPreferences || {}).map(
                ([type, enabled]) =>
                  enabled && (
                    <span
                      key={type}
                      className="px-2 py-1 bg-success-50 text-success text-sm rounded-md"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)} reminders
                    </span>
                  )
              )}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-warning mb-2">Important Notes</h4>
                <ul className="text-sm text-warning-700 space-y-1">
                  <li>• Please arrive 15 minutes early for check-in</li>
                  <li>• Bring a valid ID and insurance card</li>
                  <li>• Cancellations must be made 24 hours in advance</li>
                  <li>• You will receive confirmation via your preferred contact method</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button variant="ghost" onClick={onCancel} disabled={isProcessing}>
            Go Back
          </Button>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={isProcessing}
              loading={isProcessing}
              iconName="CheckCircle"
            >
              Confirm Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
