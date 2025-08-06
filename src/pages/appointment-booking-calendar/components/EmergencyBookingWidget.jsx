import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmergencyBookingWidget = ({ onEmergencyBook, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('high');
  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    painLevel: 5,
    contactPhone: '',
    preferredTime: 'asap',
  });

  const urgencyLevels = [
    {
      id: 'critical',
      name: 'Critical',
      description: 'Life-threatening emergency',
      color: 'error',
      icon: 'AlertTriangle',
    },
    {
      id: 'high',
      name: 'High',
      description: 'Urgent medical attention needed',
      color: 'warning',
      icon: 'AlertCircle',
    },
    {
      id: 'moderate',
      name: 'Moderate',
      description: 'Same-day appointment preferred',
      color: 'primary',
      icon: 'Clock',
    },
  ];

  const timePreferences = [
    { id: 'asap', name: 'As Soon As Possible' },
    { id: 'within-2h', name: 'Within 2 Hours' },
    { id: 'today', name: 'Today' },
    { id: 'tomorrow', name: 'Tomorrow Morning' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emergencyData = {
      urgencyLevel,
      ...formData,
      timestamp: new Date().toISOString(),
    };

    onEmergencyBook(emergencyData);
    setIsOpen(false);

    // Reset form
    setFormData({
      symptoms: '',
      duration: '',
      painLevel: 5,
      contactPhone: '',
      preferredTime: 'asap',
    });
  };

  const getUrgencyConfig = (level) => {
    const config = urgencyLevels.find((u) => u.id === level);
    return config || urgencyLevels[1];
  };

  const currentUrgency = getUrgencyConfig(urgencyLevel);

  return (
    <>
      {/* Emergency Button */}
      <div className={`fixed bottom-6 left-6 z-300 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 bg-error hover:bg-error-600 text-white rounded-full clinical-shadow-md clinical-transition animate-pulse-subtle"
          aria-label="Emergency booking"
        >
          <Icon name="AlertTriangle" size={20} />
          <span className="hidden sm:inline font-medium">Emergency</span>
        </button>
      </div>

      {/* Emergency Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 clinical-transition"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-surface rounded-lg clinical-shadow-lg w-full max-w-lg animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-error-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-error">Emergency Booking</h2>
                  <p className="text-sm text-error-700">For urgent medical situations</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-error hover:text-error-700 hover:bg-error-100 clinical-transition"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Emergency Notice */}
              <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon
                    name="AlertTriangle"
                    size={20}
                    className="text-error flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-medium text-error mb-1">Medical Emergency?</h4>
                    <p className="text-sm text-error-700">
                      If this is a life-threatening emergency, please call 911 immediately or go to
                      the nearest emergency room.
                    </p>
                  </div>
                </div>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Urgency Level
                </label>
                <div className="space-y-2">
                  {urgencyLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setUrgencyLevel(level.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-md border clinical-transition ${
                        urgencyLevel === level.id
                          ? `border-${level.color} bg-${level.color}-50 text-${level.color}`
                          : 'border-border hover:border-primary-200'
                      }`}
                    >
                      <Icon name={level.icon} size={20} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{level.name}</div>
                        <div className="text-sm opacity-75">{level.description}</div>
                      </div>
                      {urgencyLevel === level.id && <Icon name="CheckCircle" size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Describe Your Symptoms
                </label>
                <textarea
                  rows={3}
                  placeholder="Please describe your symptoms and current condition..."
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition resize-none"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  How long have you had these symptoms?
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 2 hours, since yesterday, 3 days"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  required
                />
              </div>

              {/* Pain Level */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Pain Level (1-10)
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-text-secondary">1 (Mild)</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.painLevel}
                    onChange={(e) => handleInputChange('painLevel', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-text-secondary">10 (Severe)</span>
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{formData.painLevel}</span>
                  </div>
                </div>
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Contact Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  required
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  When do you need to be seen?
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary clinical-transition"
                >
                  {timePreferences.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  iconName="AlertTriangle"
                  className="bg-error hover:bg-error-600 text-white"
                >
                  Submit Emergency Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyBookingWidget;
