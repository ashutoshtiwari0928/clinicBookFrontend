import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingForm = ({
  selectedDate,
  selectedTime,
  appointmentType,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    reason: '',
    symptoms: '',
    communicationMethod: 'email',
    specialAccommodations: '',
    emergencyContact: '',
    emergencyPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    reminderPreferences: {
      email: true,
      sms: false,
      call: false,
    },
    consentToTreatment: false,
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState({});
  const [insuranceStatus, setInsuranceStatus] = useState('pending');

  const communicationOptions = [
    { id: 'email', name: 'Email', icon: 'Mail' },
    { id: 'sms', name: 'SMS', icon: 'MessageSquare' },
    { id: 'phone', name: 'Phone Call', icon: 'Phone' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleReminderChange = (type, checked) => {
    setFormData((prev) => ({
      ...prev,
      reminderPreferences: {
        ...prev.reminderPreferences,
        [type]: checked,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for your appointment';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact name is required';
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required';
    }

    if (!formData.consentToTreatment) {
      newErrors.consentToTreatment = 'Consent to treatment is required';
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = 'Privacy policy acceptance is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        ...formData,
      };
      onSubmit(appointmentData);
    }
  };

  const verifyInsurance = () => {
    setInsuranceStatus('verifying');
    // Mock insurance verification
    setTimeout(() => {
      setInsuranceStatus(Math.random() > 0.3 ? 'verified' : 'failed');
    }, 2000);
  };

  const formatDateTime = () => {
    if (!selectedDate || !selectedTime) return '';

    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const [hours, minutes] = selectedTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeStr = `${displayHour}:${minutes} ${ampm}`;

    return `${dateStr} at ${timeStr}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Book Your Appointment</h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>{formatDateTime()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Appointment Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Appointment Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Reason for Visit *
            </label>
            <Input
              type="text"
              placeholder="Brief description of your concern..."
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className={errors.reason ? 'border-error' : ''}
            />
            {errors.reason && <p className="mt-1 text-sm text-error">{errors.reason}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Symptoms (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Describe any symptoms you're experiencing..."
              value={formData.symptoms}
              onChange={(e) => handleInputChange('symptoms', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Special Accommodations
            </label>
            <Input
              type="text"
              placeholder="Wheelchair access, interpreter, etc."
              value={formData.specialAccommodations}
              onChange={(e) => handleInputChange('specialAccommodations', e.target.value)}
            />
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Communication Preferences</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {communicationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleInputChange('communicationMethod', option.id)}
                  className={`p-3 rounded-md border clinical-transition ${
                    formData.communicationMethod === option.id
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

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Reminder Preferences
            </label>
            <div className="space-y-2">
              {Object.entries(formData.reminderPreferences).map(([type, checked]) => (
                <label key={type} className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleReminderChange(type, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary capitalize">
                    {type === 'sms' ? 'SMS' : type} reminders
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Emergency Contact</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contact Name *
              </label>
              <Input
                type="text"
                placeholder="Full name"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className={errors.emergencyContact ? 'border-error' : ''}
              />
              {errors.emergencyContact && (
                <p className="mt-1 text-sm text-error">{errors.emergencyContact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                className={errors.emergencyPhone ? 'border-error' : ''}
              />
              {errors.emergencyPhone && (
                <p className="mt-1 text-sm text-error">{errors.emergencyPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Insurance Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Insurance Provider
              </label>
              <Input
                type="text"
                placeholder="e.g., Blue Cross Blue Shield"
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Policy Number
              </label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Policy number"
                  value={formData.policyNumber}
                  onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={verifyInsurance}
                  disabled={!formData.policyNumber || insuranceStatus === 'verifying'}
                  iconName={insuranceStatus === 'verifying' ? 'Loader' : 'Shield'}
                >
                  Verify
                </Button>
              </div>

              {insuranceStatus === 'verified' && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Insurance verified - Coverage confirmed</span>
                </div>
              )}

              {insuranceStatus === 'failed' && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-error">
                  <Icon name="XCircle" size={16} />
                  <span>Unable to verify insurance - Please check details</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Consent and Privacy */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Consent & Privacy</h3>

          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <Input
                type="checkbox"
                checked={formData.consentToTreatment}
                onChange={(e) => handleInputChange('consentToTreatment', e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <div className="flex-1">
                <span className="text-sm text-text-primary">
                  I consent to medical treatment and understand the risks and benefits *
                </span>
                {errors.consentToTreatment && (
                  <p className="mt-1 text-sm text-error">{errors.consentToTreatment}</p>
                )}
              </div>
            </label>

            <label className="flex items-start space-x-3">
              <Input
                type="checkbox"
                checked={formData.privacyPolicy}
                onChange={(e) => handleInputChange('privacyPolicy', e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <div className="flex-1">
                <span className="text-sm text-text-primary">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  *
                </span>
                {errors.privacyPolicy && (
                  <p className="mt-1 text-sm text-error">{errors.privacyPolicy}</p>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>

          <div className="flex items-center space-x-3">
            <Button type="button" variant="outline" iconName="Save" disabled={isLoading}>
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Calendar"
              disabled={isLoading}
              loading={isLoading}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
