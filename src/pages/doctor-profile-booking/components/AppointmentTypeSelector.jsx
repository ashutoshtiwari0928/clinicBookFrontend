import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentTypeSelector = ({ selectedType, onTypeSelect, doctor }) => {
  const appointmentTypes = [
    {
      id: 'in-person',
      name: 'In-Person Consultation',
      icon: 'Building',
      duration: '30 minutes',
      price: doctor.consultationFee,
      description: 'Visit the clinic for a comprehensive examination and consultation.',
      features: ['Physical examination', 'Diagnostic tests', 'Prescription', 'Medical reports'],
    },
    {
      id: 'telemedicine',
      name: 'Video Consultation',
      icon: 'Video',
      duration: '20 minutes',
      price: doctor.consultationFee * 0.8,
      description: 'Secure video call consultation from the comfort of your home.',
      features: [
        'Video consultation',
        'Digital prescription',
        'Follow-up support',
        'Medical advice',
      ],
    },
    {
      id: 'phone',
      name: 'Phone Consultation',
      icon: 'Phone',
      duration: '15 minutes',
      price: doctor.consultationFee * 0.6,
      description: 'Quick consultation over phone for follow-ups and general queries.',
      features: ['Voice consultation', 'Medical advice', 'Prescription refill', 'Quick queries'],
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg clinical-shadow">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Select Appointment Type</h3>
        <p className="text-sm text-text-secondary mt-1">
          Choose the type of consultation that best suits your needs
        </p>
      </div>

      <div className="p-4 space-y-3">
        {appointmentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type)}
            className={`w-full text-left p-4 rounded-lg border clinical-transition ${
              selectedType?.id === type.id
                ? 'border-primary bg-primary-50'
                : 'border-border hover:border-primary-200 hover:bg-muted'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selectedType?.id === type.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                <Icon name={type.icon} size={20} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{type.name}</h4>
                  <div className="text-right">
                    <div className="font-data font-semibold text-primary">${type.price}</div>
                    <div className="text-xs text-text-secondary">{type.duration}</div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-3">{type.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                      <span className="text-xs text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Information */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p className="mb-1">
              <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before
              appointment.
            </p>
            <p>
              <strong>Rescheduling:</strong> You can reschedule your appointment up to 1 hour before
              the scheduled time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTypeSelector;
